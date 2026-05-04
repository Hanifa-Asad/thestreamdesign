import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'              // ← modern package (not emailjs-com)
import {
  Send, CheckCircle, AlertCircle, Loader,
  Mail, MessageCircle, Phone, MapPin, Clock, ChevronDown,
} from 'lucide-react'
import {
  FaFacebookF, FaInstagram, FaTwitter, FaTiktok,
  FaYoutube, FaLinkedinIn, FaTwitch, FaPatreon,
  FaBehance, FaDribbble, FaPinterest,
} from 'react-icons/fa'
import { SiThreads, SiTrustpilot, SiKick } from 'react-icons/si'
import GlowButton from '@components/ui/GlowButton'
import FAQSection from '@components/sections/FAQSection'
import {
  EMAILJS_CONFIG,
  SOCIAL_LINKS,
  CONTACT_INFO,
  validateEmailJSConfig,
} from '@utils/emailConfig'

const SERVICE_OPTIONS = [
  'Logo Design',
  'Stream Banners',
  'Stream Overlays',
  'Ultimate Streamer Pack',
  'Twitch Emotes',
  'Logo & Banner (YouTube)',
  'Thumbnail Design',
  'Video Editing',
  'Reels Editing',
  'YouTube Management',
  'Channel Management',
  'Other / Custom Package',
]

const PLATFORM_OPTIONS = ['Twitch', 'YouTube', 'Both', 'Other']

const SOCIAL_ICONS = [
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: SiThreads,   href: SOCIAL_LINKS.threads,   label: 'Threads'   },
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook,  label: 'Facebook'  },
  { icon: FaTiktok,    href: SOCIAL_LINKS.tiktok,    label: 'TikTok'    },
  { icon: FaTwitter,   href: SOCIAL_LINKS.twitter,   label: 'Twitter / X' },
  { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin,  label: 'LinkedIn' },
  { icon: SiTrustpilot, href: SOCIAL_LINKS.trustpilot, label: 'Trustpilot' },
  { icon: FaYoutube,   href: SOCIAL_LINKS.youtube,   label: 'YouTube'   },
  { icon: SiKick,      href: SOCIAL_LINKS.kick,      label: 'Kick'      },
  { icon: FaTwitch,    href: SOCIAL_LINKS.twitch,    label: 'Twitch'    },
  { icon: FaPatreon,   href: SOCIAL_LINKS.patreon,   label: 'Patreon'   },
  { icon: FaBehance,   href: SOCIAL_LINKS.behance,   label: 'Behance'   },
  { icon: FaDribbble,  href: SOCIAL_LINKS.dribbble,  label: 'Dribbble'  },
  { icon: FaPinterest, href: SOCIAL_LINKS.pinterest, label: 'Pinterest' },
]

const CONTACT_CARDS = [
  { icon: Mail,          label: 'Email Us',      value: CONTACT_INFO.email,    href: `mailto:${CONTACT_INFO.email}`, desc: 'We reply within 24 hours' },
  { icon: Phone,         label: 'Call Us',       value: CONTACT_INFO.phone,    href: `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`, desc: 'Available Mon–Sat, 9 AM – 11 PM' },
  { icon: MapPin,        label: 'Location',      value: CONTACT_INFO.location, href: null,                           desc: 'Serving creators globally' },
  { icon: Clock,         label: 'Response Time', value: '< 24 hours',          href: null,                           desc: 'Mon–Sat, 9 AM – 11 PM' },
]

const INIT = { name: '', email: '', platform: '', service: '', message: '' }

export default function Contact() {
  const [form,    setForm]    = useState(INIT)
  const [status,  setStatus]  = useState('idle')  // idle | loading | success | error
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [errMsg,  setErrMsg]  = useState('')
  const formRef = useRef()

  // ── Initialise EmailJS once on mount ─────────────────────────────────────
  useEffect(() => {
    // Init with public key — required by @emailjs/browser v4+
    emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY })
    console.log('[EmailJS] Initialised with public key:', EMAILJS_CONFIG.PUBLIC_KEY)

    // Warn in dev if IDs are still placeholder
    validateEmailJSConfig()
  }, [])

  // ── Pre-fill from Pricing page URL params ─────────────────────────────────
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

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (data) => {
    const e = {}
    if (!data.name.trim())                       e.name    = 'Name is required'
    if (!data.email.trim())                      e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(data.email))  e.email   = 'Enter a valid email'
    if (!data.platform)                          e.platform = 'Please select your platform'
    if (!data.service)                           e.service = 'Please select a service'
    if (!data.message.trim())                    e.message = 'Message is required'
    else if (data.message.trim().length < 10)    e.message = 'Message must be at least 10 characters'
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

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, service: true, message: true })
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    // Guard: warn if IDs still placeholder
    if (!validateEmailJSConfig()) {
      setStatus('error')
      setErrMsg('EmailJS is not configured yet. Add your Service ID and Template ID to emailConfig.js.')
      return
    }

    setStatus('loading')
    setErrMsg('')

    // Template params — must match {{variable}} names in your EmailJS template.
    // Use a verified sender address for the From header and send the visitor address as reply_to.
    const templateParams = {
      from_name:  form.name,
      from_email: 'info@thestreamingdesign.com',
      reply_to:   form.email,
      platform:   form.platform,
      service:    form.service,
      message:    form.message,
      to_name:    'thestreamingdesign',
    }

    console.log('[EmailJS] Sending with params:', templateParams)
    console.log('[EmailJS] SERVICE_ID:',  EMAILJS_CONFIG.SERVICE_ID)
    console.log('[EmailJS] TEMPLATE_ID:', EMAILJS_CONFIG.TEMPLATE_ID)

    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
        // Note: public key handled by init() above — do NOT pass it as 4th arg in v4+
      )

      console.log('[EmailJS] ✅ Success:', result.status, result.text)
      setStatus('success')
      setForm(INIT)
      setTouched({})

    } catch (err) {
      console.error('[EmailJS] ❌ Error:', err)

      // Provide a helpful error message based on the error type
      let msg = 'Something went wrong. Please try again.'
      if (err?.status === 400) msg = 'Invalid template or service ID. Check your EmailJS dashboard.'
      else if (err?.status === 401) msg = 'Invalid public key. Check EMAILJS_CONFIG.PUBLIC_KEY.'
      else if (err?.status === 402) msg = 'EmailJS free tier limit reached (200 emails/month).'
      else if (err?.status === 404) msg = 'Service or Template not found. Check your IDs.'
      else if (err?.text)           msg = `EmailJS error: ${err.text}`

      setErrMsg(msg)
      setStatus('error')
    }
  }

  // ── Styles ────────────────────────────────────────────────────────────────
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
        <title>Contact | thestreamingdesign</title>
        <meta name="description" content="Get in touch with thestreamingdesign. Start your project, ask a question, or request a custom quote." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Page Hero ── */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          {/* Gaming character - right side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -right-20 top-1/4 w-80 h-96 pointer-events-none hidden lg:block"
          >
            <img 
              src="/characters/gaming-character-4.svg" 
              alt=""
              className="w-full h-full object-contain opacity-40"
              style={{ filter: 'drop-shadow(0 0 25px rgba(57,255,20,0.3))' }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
          <div className="section-container relative z-10 text-center">
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-4">
              // Contact Us
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              Let&apos;s Build Your <span className="text-neon-green">Brand.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-body text-white/50 text-lg max-w-2xl mx-auto">
              Have a question or ready to get started? We&apos;d love to hear from you.
            </motion.p>
          </div>
        </section>

        {/* ── Contact Info Block ── */}
        <section className="pb-12">
          <div className="section-container">
            <div className="glass-card p-8">
              <p className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-3">// Contact Info</p>
              <p className="font-body text-white/50 text-base leading-relaxed">
                📧 Email: <a href="mailto:info@thestreamingdesign.com" className="text-neon-green hover:underline">info@thestreamingdesign.com</a>
                &nbsp; 💬 Discord: <a href="https://discord.gg/thestreamingdesign" target="_blank" rel="noreferrer" className="text-neon-green hover:underline">Join Our Server</a>
                &nbsp; 📱 Social: <span className="text-neon-green">@thestreamingdesign</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── Form + Sidebar ── */}
        <section className="py-12">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* ── Contact Form ── */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }} className="lg:col-span-3">
                <div className="glass-card p-8">
                  <div className="mb-8">
                    <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Send a Message</span>
                    <h2 className="font-display font-black text-2xl text-white mt-2">Let&apos;s Build Your Brand</h2>
                    <p className="font-body text-white/40 text-sm mt-2">
                      Whether you need a custom stream overlay, a gaming logo design, help with your YouTube channel management, or just want to chat about your streaming goals — we&apos;re here. Fill out the form below and we&apos;ll get back to you within 24 hours.
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* ── Success state ── */}
                    {status === 'success' ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center">
                          <CheckCircle size={36} className="text-neon-green" />
                        </div>
                        <h3 className="font-display font-black text-2xl text-white mb-3">Message Sent! 🎮</h3>
                        <p className="font-body text-white/50 mb-8">
                          We received your inquiry and will reply within 24 hours. Check your email for a confirmation.
                        </p>
                        <button
                          onClick={() => { setStatus('idle'); setErrMsg('') }}
                          className="btn-outline-neon text-xs px-6 py-2.5"
                        >
                          Send Another
                        </button>
                      </motion.div>

                    ) : (
                      /* ── Form ── */
                      <motion.form key="form" ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">
                              Your Name *
                            </label>
                            <input type="text" name="name" value={form.name}
                              onChange={handleChange} onBlur={handleBlur}
                              placeholder="xX_YourName_Xx" className={inputCls('name')} />
                            {errors.name && touched.name &&
                              <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">
                              Email Address *
                            </label>
                            <input type="email" name="email" value={form.email}
                              onChange={handleChange} onBlur={handleBlur}
                              placeholder="you@example.com" className={inputCls('email')} />
                            {errors.email && touched.email &&
                              <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.email}</p>}
                          </div>
                        </div>

                        {/* Platform select */}
                        <div>
                          <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">
                            Platform *
                          </label>
                          <div className="relative">
                            <select name="platform" value={form.platform}
                              onChange={handleChange} onBlur={handleBlur}
                              className={`${inputCls('platform')} appearance-none pr-10 cursor-pointer`}>
                              <option value="" disabled>Select your platform...</option>
                              {PLATFORM_OPTIONS.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                          </div>
                          {errors.platform && touched.platform &&
                            <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.platform}</p>}
                        </div>

                        {/* Service select */}
                        <div>
                          <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">
                            Service You&apos;re Interested In *
                          </label>
                          <div className="relative">
                            <select name="service" value={form.service}
                              onChange={handleChange} onBlur={handleBlur}
                              className={`${inputCls('service')} appearance-none pr-10 cursor-pointer`}>
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
                          {errors.service && touched.service &&
                            <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.service}</p>}
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block font-mono text-white/40 text-xs uppercase tracking-widest mb-2">
                            Tell Us About Your Channel / Brand *
                          </label>
                          <textarea name="message" value={form.message}
                            onChange={handleChange} onBlur={handleBlur}
                            rows={5}
                            placeholder="Tell us about your channel, brand, goals, and what you want to build."
                            className={`${inputCls('message')} resize-none`} />
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
                          <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                          >
                            <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-body text-red-300 text-sm">{errMsg}</p>
                              <p className="font-mono text-red-400/60 text-xs mt-1">
                                Check browser console for details (F12 → Console)
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Submit + Contact Options */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                          <GlowButton
                            type="submit"
                            size="lg"
                            disabled={status === 'loading'}
                            icon={status === 'loading'
                              ? <Loader size={16} className="animate-spin" />
                              : <Send size={16} />
                            }
                            className="flex-1 justify-center"
                          >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                          </GlowButton>
                          <div className="flex flex-col gap-2">
                          <GlowButton
                            as="a" href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                            variant="outline" size="lg"
                            icon={<Phone size={16} />}
                          >
                            Call Us
                          </GlowButton>
                          <span className="text-[11px] text-white/30 tracking-[0.22em] uppercase">
                            {CONTACT_INFO.phone}
                          </span>
                        </div>
                      </div>

                        <p className="font-mono text-white/20 text-xs text-center pt-1">
                          Your data is never shared with third parties.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ── Sidebar ── */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }} className="lg:col-span-2 flex flex-col gap-8">

                {/* Social icons */}
                <div className="glass-card p-7">
                  <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Find Us Online</span>
                  <h3 className="font-display font-black text-xl text-white mt-2 mb-6">Follow The Stream</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        className="aspect-square glass-card flex items-center justify-center text-white/40
                                   hover:text-neon-green hover:border-neon-green/40 transition-all duration-200 hover:scale-110">
                        <Icon size={17} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="glass-card p-7 border-neon-green/25 bg-neon-green/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <Phone size={20} className="text-neon-green" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Need a Fast Answer?</h4>
                      <p className="font-body text-white/40 text-xs">Call or email us today</p>
                    </div>
                  </div>
                  <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
                    Reach out by phone or email for the quickest response.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="btn-neon w-full text-center block text-xs py-3">
                      Call Now
                    </a>
                    <span className="text-[11px] text-white/30 tracking-[0.22em] uppercase">
                      {CONTACT_INFO.phone}
                    </span>
                  </div>
                </div>

                {/* Process steps */}
                <div className="glass-card p-7">
                  <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// How It Works</span>
                  <h3 className="font-display font-black text-xl text-white mt-2 mb-6">Our Process</h3>
                  <ol className="space-y-5">
                    {[
                      { step: '01', title: 'You reach out',  desc: 'Fill the form or contact us by email or phone.' },
                      { step: '02', title: 'We brief you',   desc: 'Quick questionnaire to nail your style.' },
                      { step: '03', title: 'We design',      desc: 'Our team works — you get updates.' },
                      { step: '04', title: 'You approve',    desc: 'Review, revise, approve. Files delivered instantly.' },
                    ].map(({ step, title, desc }) => (
                      <li key={step} className="flex items-start gap-4">
                        <span className="font-display font-black text-neon-green/40 text-2xl leading-none w-8 flex-shrink-0">
                          {step}
                        </span>
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

        {/* ── FAQ Section ── */}
        <FAQSection />

      </motion.div>
    </>
  )
}
