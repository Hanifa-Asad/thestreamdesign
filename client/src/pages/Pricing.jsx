import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ArrowRight, Zap, HelpCircle } from 'lucide-react'
import GlowButton from '@components/ui/GlowButton'
import CTASection from '@components/sections/CTASection'
import { SERVICES, SERVICE_CATEGORIES, PRICING_DATA } from '@utils/servicesData'

const CATEGORY_TABS = [
  { id: SERVICE_CATEGORIES.GAMERS_STREAMERS, label: 'Gamers & Streamers' },
  { id: SERVICE_CATEGORIES.YOUTUBERS,        label: 'YouTubers' },
  { id: SERVICE_CATEGORIES.DEVELOPMENT,      label: 'Development' },
]

const TIER_COLORS = {
  Basic:    { border: 'border-white/10',         badge: 'bg-white/10 text-white/60',        btn: 'outline' },
  Standard: { border: 'border-neon-green/50',    badge: 'bg-neon-green text-black',          btn: 'solid'   },
  Premium:  { border: 'border-neon-green/20',    badge: 'bg-neon-green/20 text-neon-green',  btn: 'outline' },
}

const FAQ = [
  { q: 'Do you offer custom pricing for bulk orders?', a: 'Yes! We offer significant discounts for bulk orders. Contact us with your requirements and we will put together a custom package deal.' },
  { q: 'How do I pay?', a: 'We accept PayPal, bank transfer, and most major payment methods. Full payment or a 50% deposit is required before work begins, depending on the plan.' },
  { q: 'What if I am not happy with the result?', a: 'Standard and Premium plans include unlimited revisions until you are 100% satisfied. Basic plans include 2 free revisions with additional revisions available at a small fee.' },
  { q: 'How do I share my brand details?', a: 'After ordering via the contact form, we send you a detailed brand questionnaire to gather your style preferences, colors, references, and any assets we need.' },
  { q: 'Do I own the final files?', a: 'Yes — you receive full commercial usage rights to all delivered files. You own everything we create for you, no licensing fees ever.' },
  { q: 'Can I upgrade my plan later?', a: 'Absolutely. You can upgrade from Basic to Standard or Premium at any time. We will credit your initial payment toward the higher plan.' },
]

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES.GAMERS_STREAMERS)
  const [openFaq, setOpenFaq] = useState(null)

  const categoryServices = SERVICES.filter(s => s.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>Pricing | thestreamingdesign</title>
        <meta name="description" content="Transparent pricing for all gaming design services. Basic, Standard, and Premium plans for stream overlays, logos, thumbnails and more." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Page Hero ── */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          {/* Gaming character - left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -left-20 top-1/3 w-80 h-96 pointer-events-none hidden lg:block"
          >
            <img 
              src="/characters/gaming-character-2.svg" 
              alt=""
              className="w-full h-full object-contain opacity-45"
              style={{ filter: 'drop-shadow(0 0 25px rgba(57,255,20,0.3))' }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
          <div className="section-container relative z-10 text-center">
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-4">
              // Simple, Honest Pricing
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              Simple, Honest <span className="text-neon-green">Pricing</span>.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-white/50 text-lg max-w-2xl mx-auto">
              No hidden fees. No confusing packages. Just great work at fair prices.
            </motion.p>
          </div>
        </section>

        {/* ── Category Tabs ── */}
        <div className="sticky top-16 md:top-20 z-30 bg-dark-100/95 backdrop-blur-md border-b border-glass-border py-4">
          <div className="section-container flex flex-wrap items-center gap-3 overflow-x-auto pb-1">
            {CATEGORY_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`min-w-max px-6 py-2.5 rounded-lg font-display text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                  activeCategory === tab.id
                    ? 'bg-neon-green text-black shadow-neon'
                    : 'text-white/50 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Pricing Tables ── */}
        <section className="py-20">
          <div className="section-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-20"
              >
                {categoryServices.map((service, si) => {
                  const pricingKey = service.slug
                  const data = PRICING_DATA[pricingKey]
                  if (!data) return null

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: si * 0.05 }}
                    >
                      {/* Service heading */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center flex-shrink-0">
                          <service.icon size={18} className="text-neon-green" />
                        </div>
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <h2 className="font-display font-black text-xl text-white tracking-wide truncate">
                            {data.label}
                          </h2>
                          <div className="flex-1 h-px bg-gradient-to-r from-neon-green/30 to-transparent" />
                        </div>
                      </div>

                      {/* Three tier cards */}
                      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        {data.tiers.map((tier, ti) => {
                          const style = TIER_COLORS[tier.name]
                          const isPopular = tier.name === 'Standard'
                          return (
                            <motion.div
                              key={tier.name}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: ti * 0.1 }}
                              className={`relative rounded-2xl p-7 border flex flex-col
                                ${style.border}
                                ${isPopular ? 'bg-neon-green/5 shadow-neon' : 'bg-dark-300/60'}
                                ${isPopular ? 'md:scale-105 md:-translate-y-2' : ''}
                                transition-all duration-300 hover:border-neon-green/40`}
                            >
                              {isPopular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                  <span className="flex items-center gap-1.5 bg-neon-green text-black font-display font-black text-xs px-4 py-1 rounded-full shadow-neon tracking-widest uppercase">
                                    <Zap size={10} /> Recommended
                                  </span>
                                </div>
                              )}

                              {/* Tier badge + price */}
                              <div className="mb-6">
                                <span className={`inline-block font-mono text-xs px-3 py-1 rounded-full mb-3 ${style.badge}`}>
                                  {tier.name}
                                </span>
                                <div className="flex items-baseline gap-2">
                                  <span className="font-display font-black text-4xl text-neon-green">
                                    {tier.price}
                                  </span>
                                </div>
                                <p className="font-mono text-white/25 text-xs mt-1">
                                  Contact us for current pricing
                                </p>
                              </div>

                              {/* Meta */}
                              <div className="flex gap-4 mb-6 pb-6 border-b border-white/5">
                                <div>
                                  <p className="font-mono text-white/30 text-xs uppercase mb-0.5">Delivery</p>
                                  <p className="font-display font-bold text-white text-sm">{tier.delivery}</p>
                                </div>
                                <div>
                                  <p className="font-mono text-white/30 text-xs uppercase mb-0.5">Revisions</p>
                                  <p className="font-display font-bold text-white text-sm">{tier.revisions}</p>
                                </div>
                              </div>

                              {/* Features */}
                              <ul className="space-y-2.5 flex-1 mb-7">
                                {tier.features.map(f => (
                                  <li key={f} className="flex items-center gap-2.5">
                                    <Check size={13} className="text-neon-green flex-shrink-0" />
                                    <span className="font-body text-white/60 text-sm">{f}</span>
                                  </li>
                                ))}
                              </ul>

                              <GlowButton
                                as="link"
                                to={`/contact?service=${encodeURIComponent(data.label)}&plan=${tier.name}`}
                                variant={style.btn}
                                className="w-full justify-center text-xs"
                                iconRight={<ArrowRight size={13} />}
                              >
                                Order {tier.name}
                              </GlowButton>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── Add-Ons ── */}
        <section className="py-16">
          <div className="section-container">
            <div className="text-center mb-10">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Add-Ons</span>
              <h2 className="font-display font-black text-3xl text-white mt-3">Design Add-Ons for Every Channel</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                'Extra thumbnail',
                'Twitch mascot logo',
                'Extra video edit',
                'Rush delivery',
                'Premade twitch overlays',
              ].map(item => (
                <div key={item} className="rounded-2xl border border-white/10 bg-dark-300/60 p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-display font-black text-lg text-white mb-3">{item}</h3>
                    <p className="font-body text-white/50 text-sm leading-relaxed">Contact us to add this extra service to your project and keep your channel growing without the stress.</p>
                  </div>
                  <GlowButton as="link" to="/contact" variant="outline" className="mt-6 justify-center text-xs">
                    Contact
                  </GlowButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Compare All Features table ── */}
        <section className="py-16 bg-dark-200/30">
          <div className="section-container">
            <div className="text-center mb-12">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Plan Comparison</span>
              <h2 className="font-display font-black text-3xl text-white mt-3">What's In Each Plan</h2>
            </div>
            <div className="max-w-3xl mx-auto overflow-x-auto -mx-4 px-4 sm:-mx-0 sm:px-0">
              <table className="min-w-[680px] w-full">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 font-mono text-white/30 text-xs uppercase tracking-widest w-1/2">Feature</th>
                    {['Basic', 'Standard', 'Premium'].map(t => (
                      <th key={t} className={`py-4 px-4 font-display font-black text-sm text-center ${t === 'Standard' ? 'text-neon-green' : 'text-white/60'}`}>{t}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Commercial license',    true,  true,  true ],
                    ['PNG export',            true,  true,  true ],
                    ['Source files',          false, true,  true ],
                    ['Unlimited revisions',   false, true,  true ],
                    ['Priority delivery',     false, false, true ],
                    ['Brand guide included',  false, false, true ],
                    ['Dedicated support',     false, false, true ],
                  ].map(([feature, basic, standard, premium]) => (
                    <tr key={feature} className="hover:bg-white/2 transition-colors">
                      <td className="py-3.5 px-4 font-body text-white/50 text-sm">{feature}</td>
                      {[basic, standard, premium].map((has, i) => (
                        <td key={i} className="py-3.5 px-4 text-center">
                          {has
                            ? <Check size={16} className="text-neon-green mx-auto" />
                            : <X size={16} className="text-white/20 mx-auto" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20">
          <div className="section-container max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Common Questions</span>
              <h2 className="font-display font-black text-3xl text-white mt-3">FAQ</h2>
            </div>
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-display font-bold text-white text-sm tracking-wide">{item.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                      <HelpCircle size={18} className={openFaq === i ? 'text-neon-green' : 'text-white/30'} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-5 pb-5 font-body text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          label="// Custom Quote"
          heading="Not Sure Which Plan Fits You?"
          body="Every channel is different. Let's talk and find the right fit."
          primaryText="Get a Custom Quote"
          primaryLink="/contact"
        />
      </motion.div>
    </>
  )
}
