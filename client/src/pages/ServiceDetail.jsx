import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, Clock, Package,
  ExternalLink, ChevronRight, MessageCircle
} from 'lucide-react'
import GlowButton from '@components/ui/GlowButton'
import ServiceCard from '@components/ui/ServiceCard'
import CTASection from '@components/sections/CTASection'
import { getServiceBySlug, SERVICES, SERVICE_CATEGORIES } from '@utils/servicesData'
import { SOCIAL_LINKS } from '@utils/emailConfig'

const PRICING_PLACEHOLDER = [
  {
    tier: 'Basic',
    price: '$--',
    description: 'Perfect for creators just starting out',
    features: ['1 concept', 'PNG export', '2 revisions', '5 day delivery'],
    highlighted: false,
  },
  {
    tier: 'Standard',
    price: '$--',
    description: 'Best value for growing channels',
    features: ['3 concepts', 'PNG + SVG export', 'Unlimited revisions', '3 day delivery', 'Source files'],
    highlighted: true,
  },
  {
    tier: 'Premium',
    price: '$--',
    description: 'Full package for established creators',
    features: ['5 concepts', 'All file formats', 'Unlimited revisions', '24h delivery', 'Source files', 'Brand guide'],
    highlighted: false,
  },
]

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <Navigate to="/services" replace />

  const Icon = service.icon
  const isGamer = service.category === SERVICE_CATEGORIES.GAMERS_STREAMERS
  const related = SERVICES
    .filter(s => s.category === service.category && s.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{service.title} | thestreamingdesign</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

          <div className="section-container relative z-10">
            {/* Breadcrumb */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-10 font-mono text-xs text-white/30">
              <Link to="/" className="hover:text-neon-green transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/services" className="hover:text-neon-green transition-colors">Services</Link>
              <ChevronRight size={12} />
              <span className="text-neon-green">{service.title}</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Info */}
              <div>
                {/* Category badge */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/5 font-mono text-neon-green text-xs tracking-widest uppercase">
                    <Icon size={12} />
                    {isGamer ? 'Gamers & Streamers' : 'YouTubers'}
                  </span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
                  {service.title}
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-body text-neon-green text-lg mb-6 italic">
                  "{service.tagline}"
                </motion.p>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-white/60 text-lg leading-relaxed mb-8">
                  {service.description}
                </motion.p>

                {/* Meta pills */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-wrap gap-3 mb-10">
                  <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-400 border border-white/10 font-mono text-xs text-white/50">
                    <Clock size={12} className="text-neon-green" />
                    {service.turnaround}
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-400 border border-white/10 font-mono text-xs text-white/50">
                    <Package size={12} className="text-neon-green" />
                    {service.deliverables.length} deliverables
                  </span>
                </motion.div>

                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
                  <GlowButton as="link" to="/contact" size="lg" iconRight={<ArrowRight size={16} />}>
                    Order Now
                  </GlowButton>
                  <GlowButton as="a" href={SOCIAL_LINKS.whatsapp} variant="outline" size="lg" icon={<MessageCircle size={16} />}>
                    Ask on WhatsApp
                  </GlowButton>
                </motion.div>
              </div>

              {/* Right: Placeholder image */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-dark-400 to-dark-300 border border-neon-green/20 overflow-hidden flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                      <Icon size={36} className="text-neon-green" />
                    </div>
                    <p className="font-display font-bold text-white/30 text-sm tracking-wide uppercase">
                      {service.title}
                    </p>
                    <p className="font-mono text-white/20 text-xs mt-2">Sample image coming soon</p>
                  </div>
                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-green/40 rounded-tl" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-green/40 rounded-br" />
                </div>
                {/* Glow shadow */}
                <div className="absolute -inset-4 bg-neon-green/5 rounded-3xl blur-xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Features + Deliverables ── */}
        <section className="py-20 bg-dark-200/30">
          <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Features */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="font-display font-black text-2xl text-white mb-8 flex items-center gap-3">
                  <span className="w-1 h-7 bg-neon-green rounded-full inline-block" />
                  What's Included
                </h2>
                <ul className="space-y-4">
                  {service.features.map((feature, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-neon-green" />
                      </div>
                      <span className="font-body text-white/70 text-base">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Deliverables */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="font-display font-black text-2xl text-white mb-8 flex items-center gap-3">
                  <span className="w-1 h-7 bg-neon-green rounded-full inline-block" />
                  Deliverables
                </h2>
                <div className="space-y-3 mb-10">
                  {service.deliverables.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 p-4 rounded-lg bg-dark-400/60 border border-white/5 hover:border-neon-green/20 transition-colors">
                      <ExternalLink size={14} className="text-neon-green flex-shrink-0" />
                      <span className="font-mono text-sm text-white/60">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Turnaround highlight */}
                <div className="p-6 rounded-xl bg-neon-green/5 border border-neon-green/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={18} className="text-neon-green" />
                    <span className="font-display font-bold text-white text-sm tracking-wide uppercase">Turnaround Time</span>
                  </div>
                  <p className="font-display font-black text-2xl text-neon-green">{service.turnaround}</p>
                  <p className="font-body text-white/40 text-sm mt-1">From order confirmation to delivery</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Pricing Cards ── */}
        <section className="py-20">
          <div className="section-container">
            <div className="text-center mb-14">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Investment</span>
              <h2 className="font-display font-black text-4xl text-white mt-3 mb-4">
                Choose Your <span className="text-neon-green">Plan</span>
              </h2>
              <p className="font-body text-white/50 max-w-xl mx-auto">
                Pricing is updated regularly. Contact us for the latest rates and custom quotes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {PRICING_PLACEHOLDER.map((plan, i) => (
                <motion.div
                  key={plan.tier}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl p-8 flex flex-col border transition-all duration-300
                    ${plan.highlighted
                      ? 'bg-neon-green/8 border-neon-green/50 shadow-neon-md scale-105'
                      : 'bg-dark-300/60 border-white/10 hover:border-neon-green/20'
                    }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-neon-green text-black font-display font-black text-xs px-4 py-1.5 rounded-full tracking-widest uppercase shadow-neon">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display font-black text-xl text-white tracking-wide mb-1">{plan.tier}</h3>
                    <p className="font-body text-white/40 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <span className="font-display font-black text-4xl text-neon-green">{plan.price}</span>
                    <p className="font-mono text-white/30 text-xs mt-2">Contact for current pricing</p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3">
                        <Check size={14} className="text-neon-green flex-shrink-0" />
                        <span className="font-body text-white/60 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <GlowButton
                    as="link"
                    to="/contact"
                    variant={plan.highlighted ? 'solid' : 'outline'}
                    className="w-full justify-center"
                  >
                    Order {plan.tier}
                  </GlowButton>
                </motion.div>
              ))}
            </div>

            <p className="text-center font-mono text-white/25 text-xs mt-8">
              Need a custom quote? <Link to="/contact" className="text-neon-green hover:underline">Contact us directly</Link>
            </p>
          </div>
        </section>

        {/* ── Sample Work ── */}
        <section className="py-16 bg-dark-200/20">
          <div className="section-container">
            <h2 className="font-display font-black text-2xl text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-7 bg-neon-green rounded-full" />
              Sample Work
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="aspect-square rounded-xl bg-gradient-to-br from-dark-400 to-dark-300 border border-white/5 hover:border-neon-green/30 transition-colors flex items-center justify-center group cursor-pointer">
                  <div className="text-center">
                    <ExternalLink size={18} className="text-white/20 group-hover:text-neon-green/60 mx-auto transition-colors" />
                    <p className="font-mono text-white/15 text-xs mt-2">Sample {n}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <GlowButton as="link" to="/portfolio" variant="ghost" iconRight={<ArrowRight size={14} />}>
                See Full Portfolio
              </GlowButton>
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        {related.length > 0 && (
          <section className="py-20">
            <div className="section-container">
              <h2 className="font-display font-black text-2xl text-white mb-10 flex items-center gap-3">
                <span className="w-1 h-7 bg-neon-green rounded-full" />
                Related Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </motion.div>
    </>
  )
}
