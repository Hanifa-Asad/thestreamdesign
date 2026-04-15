import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  Send, CheckCircle, AlertCircle, Loader,
  Mail, MessageCircle, MapPin, Clock,
  ChevronDown
} from 'lucide-react'
import {
  FaFacebookF, FaInstagram, FaTwitter, FaTiktok,
  FaDiscord, FaWhatsapp, FaYoutube,
} from 'react-icons/fa'
import { SiThreads } from 'react-icons/si'
import GlowButton from '@components/ui/GlowButton'
import { EMAILJS_CONFIG, SOCIAL_LINKS, CONTACT_INFO } from '@utils/emailConfig'
import { SERVICES } from '@utils/servicesData'

const SERVICE_OPTIONS = [
  'Logo Design',
  'Stream Banners',
  'Stream Overlays',
  'Twitch Emotes',
  'Logo & Banner (YouTube)',
  'Thumbnail Design',
  'Reels Thumbnails',
  'Video Editing',
  'Reels Editing',
  'YouTube Management',
  'Channel Management',
  'Other / Custom Package',
]

const SOCIAL_ICONS = [
  { icon: FaInstagram,  href: SOCIAL_LINKS.instagram, label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: FaFacebookF,  href: SOCIAL_LINKS.facebook,  label: 'Facebook',  color: 'hover:text-blue-400' },
  { icon: FaTwitter,    href: SOCIAL_LINKS.twitter,   label: 'Twitter',   color: 'hover:text-sky-400'  },
  { icon: FaTiktok,     href: SOCIAL_LINKS.tiktok,    label: 'TikTok',    color: 'hover:text-white'    },
  { icon: SiThreads,    href: SOCIAL_LINKS.threads,   label: 'Threads',   color: 'hover:text-white'    },
  { icon: FaDiscord,    href: SOCIAL_LINKS.discord,   label: 'Discord',   color: 'hover:text-indigo-400'},
  { icon: FaYoutube,    href: SOCIAL_LINKS.youtube,   label: 'YouTube',   color: 'hover:text-red-400'  },
  { icon: FaWhatsapp,   href: SOCIAL_LINKS.whatsapp,  label: 'WhatsApp',  color: 'hover:text-neon-green'},
]

const CONTACT_CARDS = [
  { icon: Mail,           label: 'Email Us',        value: CONTACT_INFO.email,    href: `mailto:${CONTACT_INFO.email}`,   desc: 'We reply within 24 hours' },
  { icon: MessageCircle,  label: 'WhatsApp',        value: 'Chat with us',        href: SOCIAL_LINKS.whatsapp,            desc: 'Fastest response channel' },
  { icon: MapPin,         label: 'Location',        value: CONTACT_INFO.location, href: null,                             desc: 'Serving creators globally' },
  { icon: Clock,          label: 'Response Time',   value: '< 24 hours',          href: null,                             desc: 'Mon–Sat, 9 AM – 11 PM' },
]

const INIT = { name: '', email: '', service: '', message: '' }

export default function Contact() {
  const [form,    setForm]    = useState(INIT)
  const [status,  setStatus]  = useState('idle') // idle | loading | success | error
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const formRef = useRef()

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }, [])

  // Pre-fill service from URL query param (linked from pricing page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const svc  = params.get('service')
    const plan = params.get('plan')
    if (svc) {
      setForm(f => ({
        ...f,
        service: SERVICE_OPTIONS.includes(svc) ? svc : '',
        message: plan ? `Hi, I'm interested in the ${plan} plan for ${svc}.` : '',
      }))
    }
  }, [])

  /* ── Validation ── */
  const validate = (data) => {
    const e = {}
    if (!data.name.trim())                      e.name    = 'Name is required'
    if (!data.email.trim())                     e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email   = 'Enter a valid email'
    if (!data.service)                          e.service = 'Please select a service'
    if (!data.message.trim())                   e.message = 'Message is required'
    else if (data.message.trim().length < 10)   e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value })
      setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    const errs = validate(form)
    setErrors(prev => ({ ...prev, [name]: errs[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, service: true, message: true })
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          name:    form.name,
          email:   form.email,
          message: `Service: ${form.service}\n\n${form.message}`,
        }
      )
      setStatus('success')
      setForm(INIT)
      setTouched({})
    } catch (err) {
      console.error('EmailJS error details:', err)
      setStatus('error')
    }
  }

  const inputCls = (field) =>
    `w-full bg-dark-400/60 border rounded-lg px-4 py-3 font-body text-white text-base
     placeholder-white/20 focus:outline-none transition-all duration-200
     ${errors[field] && touched[field]
       ? 'border-red-500/60 focus:border-red-500'
       : 'border-white/10 focus:border-neon-green/60 focus:bg-dark-400/80'
     }`

  return (
    <>
      <Helmet>
        <title>Contact | TheStreamDesign</title>
        <meta name="description" content="Get in touch with TheStreamDesign. Start your project, ask a question, or request a custom quote." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Page Hero ── */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
          <div className="section-container relative z-10 text-center">
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-4">
              // Let's Work Together
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              Get In <span className="text-neon-green">Touch</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-white/50 text-lg max-w-2xl mx-auto">
              Tell us about your project. We respond within 24 hours and will put together the perfect plan for your brand.
            </motion.p>
          </div>
        </section>

        {/* ── Contact Cards ── */}
        <section className="pb-12">
          <div className="section-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTACT_CARDS.map(({ icon: Icon, label, value, href, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="glass-card p-5 hover:border-neon-green/40 hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                    <Icon size={18} className="text-neon-green" />
                  </div>
                  <p className="font-mono text-white/40 text-xs uppercase tracking-widest mb-1">{label}</p>
                  {href
                    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-display font-bold text-white text-sm hover:text-neon-green transition-colors block mb-1">{value}</a>
                    : <p className="font-display font-bold text-white text-sm mb-1">{value}</p>
                  }
                  <p className="font-body text-white/30 text-xs">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form + Social ── */}
        <section className="py-12">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* ── Contact Form ── */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
                <div className="glass-card p-8">
                  <div className="mb-8">
                    <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Send a Message</span>
                    <h2 className="font-display font-black text-2xl text-white mt-2">Start Your Project</h2>
                    <p className="font-body text-white/40 text-sm mt-2">Fill in your details and we will get back to you within 24 hours.</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      /* Success state */
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center">
                          <CheckCircle size={36} className="text-neon-green" />
                        </div>
                        <h3 className="font-display font-black text-2xl text-white mb-3">Message Sent!</h3>
                        <p className="font-body text-white/50 mb-8">We received your inquiry and will reply within 24 hours. Check your email for a confirmation.</p>
                        <button onClick={() => setStatus('idle')} className="btn-outline-neon text-xs px-6 py-2.5">Send Another</button>
                      </motion.div>
                    ) : (
                      /* Form */
                      <motion.form key="form" ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

                        {/* Name + Email row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">Your Name *</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder="xX_YourName_Xx" className={inputCls('name')} />
                            {errors.name && touched.name && <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">Email Address *</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@example.com" className={inputCls('email')} />
                            {errors.email && touched.email && <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.email}</p>}
                          </div>
                        </div>

                        {/* Service select */}
                        <div>
                          <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">Service Interested In *</label>
                          <div className="relative">
                            <select name="service" value={form.service} onChange={handleChange} onBlur={handleBlur} className={`${inputCls('service')} appearance-none pr-10 cursor-pointer`}>
                              <option value="" disabled>Select a service...</option>
                              <optgroup label="── Gamers & Streamers ──">
                                {SERVICE_OPTIONS.slice(0, 4).map(s => <option key={s} value={s}>{s}</option>)}
                              </optgroup>
                              <optgroup label="── YouTubers ──">
                                {SERVICE_OPTIONS.slice(4, 11).map(s => <option key={s} value={s}>{s}</option>)}
                              </optgroup>
                              <optgroup label="── Other ──">
                                <option value="Other / Custom Package">Other / Custom Package</option>
                              </optgroup>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                          </div>
                          {errors.service && touched.service && <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.service}</p>}
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">Your Message *</label>
                          <textarea name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} rows={5} placeholder="Tell us about your project, style preferences, references, deadline..." className={`${inputCls('message')} resize-none`} />
                          <div className="flex items-center justify-between mt-1.5">
                            {errors.message && touched.message
                              ? <p className="font-mono text-red-400 text-xs">{errors.message}</p>
                              : <span />
                            }
                            <span className={`font-mono text-xs ml-auto ${form.message.length > 1800 ? 'text-red-400' : 'text-white/20'}`}>
                              {form.message.length}/2000
                            </span>
                          </div>
                        </div>

                        {/* Error banner */}
                        {status === 'error' && (
                          <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                            <p className="font-body text-red-300 text-sm">Something went wrong. Please try again or contact us on WhatsApp.</p>
                          </div>
                        )}

                        {/* Submit */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                          <GlowButton
                            type="submit"
                            size="lg"
                            disabled={status === 'loading'}
                            icon={status === 'loading' ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
                            className="flex-1 justify-center"
                          >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                          </GlowButton>
                          <GlowButton as="a" href={SOCIAL_LINKS.whatsapp} variant="outline" size="lg" icon={<MessageCircle size={16} />}>
                            WhatsApp
                          </GlowButton>
                        </div>

                        <p className="font-mono text-white/20 text-xs text-center pt-1">
                          Your data is never shared with third parties.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ── Right sidebar ── */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 flex flex-col gap-8">

                {/* Social Links */}
                <div className="glass-card p-7">
                  <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Find Us Online</span>
                  <h3 className="font-display font-black text-xl text-white mt-2 mb-6">Follow The Stream</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {SOCIAL_ICONS.map(({ icon: Icon, href, label, color }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        className={`aspect-square glass-card flex items-center justify-center text-white/40 transition-all duration-200 ${color} hover:scale-110 hover:shadow-neon`}>
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="glass-card p-7 border-neon-green/30 bg-neon-green/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <FaWhatsapp size={20} className="text-neon-green" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Need a Fast Answer?</h4>
                      <p className="font-body text-white/40 text-xs">Chat directly on WhatsApp</p>
                    </div>
                  </div>
                  <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
                    WhatsApp is our fastest channel — typical response under 2 hours.
                    Send us a voice note, share your references, or just say hi.
                  </p>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-neon w-full text-center block text-xs py-3">
                    Open WhatsApp Chat
                  </a>
                </div>

                {/* Process steps */}
                <div className="glass-card p-7">
                  <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// How It Works</span>
                  <h3 className="font-display font-black text-xl text-white mt-2 mb-6">Our Process</h3>
                  <ol className="space-y-5">
                    {[
                      { step: '01', title: 'You reach out',    desc: 'Fill the form or message us on WhatsApp with your project idea.' },
                      { step: '02', title: 'We brief you',     desc: 'We send a quick questionnaire to nail your style and requirements.' },
                      { step: '03', title: 'We design',        desc: 'Our team gets to work — you get updates and previews.' },
                      { step: '04', title: 'You approve',      desc: 'Review, request revisions, and approve. Files delivered instantly.' },
                    ].map(({ step, title, desc }) => (
                      <li key={step} className="flex items-start gap-4">
                        <span className="font-display font-black text-neon-green/40 text-2xl leading-none w-8 flex-shrink-0">{step}</span>
                        <div>
                          <p className="font-display font-bold text-white text-sm mb-1">{title}</p>
                          <p className="font-body text-white/40 text-xs leading-relaxed">{desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}
