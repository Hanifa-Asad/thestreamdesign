import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Youtube, ArrowRight } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'
import ServiceCard from '@components/ui/ServiceCard'
import GlowButton from '@components/ui/GlowButton'
import CTASection from '@components/sections/CTASection'
import { SERVICES, SERVICE_CATEGORIES } from '@utils/servicesData'

const TABS = [
  { id: 'all',                               label: 'All Services',       icon: null },
  { id: SERVICE_CATEGORIES.GAMERS_STREAMERS, label: 'Gamers & Streamers', icon: Gamepad2 },
  { id: SERVICE_CATEGORIES.YOUTUBERS,        label: 'YouTubers',           icon: Youtube },
]

function CategoryBlock({ icon: Icon, title, description, services }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center flex-shrink-0">
            <Icon size={22} className="text-neon-green" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl text-white tracking-wide">{title}</h2>
            <p className="font-body text-white/40 text-sm mt-1">{description}</p>
          </div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-neon-green/30 to-transparent hidden sm:block mb-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeTab)

  const gamerServices = SERVICES.filter(s => s.category === SERVICE_CATEGORIES.GAMERS_STREAMERS)
  const ytServices    = SERVICES.filter(s => s.category === SERVICE_CATEGORIES.YOUTUBERS)

  return (
    <>
      <Helmet>
        <title>Services | thestreamingdesign</title>
        <meta name="description" content="Stream overlays, logos, Twitch emotes, YouTube thumbnails, video editing and more." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* Page Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
          <div className="section-container relative z-10 text-center">
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-4">
              // What We Offer
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              Our <span className="text-neon-green">Services</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-white/50 text-lg max-w-2xl mx-auto mb-10">
              Every service is built specifically for gaming culture. No generic work, no cookie-cutter templates — just premium assets that make your brand unforgettable.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-8">
              {[{ n: '11', label: 'Services' }, { n: '2', label: 'Categories' }, { n: '500+', label: 'Projects Done' }].map(({ n, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="font-display font-black text-2xl text-neon-green">{n}</span>
                  <span className="font-body text-white/40 text-sm uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-16 md:top-20 z-30 bg-dark-100/95 backdrop-blur-md border-b border-glass-border py-4">
          <div className="section-container">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {TABS.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                const count = tab.id === 'all' ? SERVICES.length : SERVICES.filter(s => s.category === tab.id).length
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-display text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-200 flex-shrink-0 ${isActive ? 'bg-neon-green text-black shadow-neon' : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'}`}
                  >
                    {Icon && <Icon size={14} />}
                    {tab.label}
                    <span className={`ml-1 text-xs px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-black/20 text-black/70' : 'bg-white/10 text-white/40'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="section-container">
            <AnimatePresence mode="wait">
              {activeTab === 'all' ? (
                <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <CategoryBlock icon={Gamepad2} title="Gamers & Streamers" description="Level up your stream with professional branding that commands attention." services={gamerServices} />
                  <div className="my-16 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
                  <CategoryBlock icon={Youtube} title="YouTubers" description="Grow your channel with designs and management that convert viewers into subscribers." services={ytServices} />
                </motion.div>
              ) : (
                <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((service, i) => (
                      <ServiceCard key={service.id} service={service} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Pricing CTA Banner */}
        <section className="py-16">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="font-mono text-neon-green text-xs tracking-widest uppercase mb-2">// Transparent Pricing</p>
                <h3 className="font-display font-black text-3xl text-white mb-3">See All Packages & Pricing</h3>
                <p className="font-body text-white/50 max-w-lg">Basic, Standard, and Premium plans for every service. No hidden fees, no surprises.</p>
              </div>
              <div className="flex-shrink-0">
                <GlowButton as="link" to="/pricing" size="lg" iconRight={<ArrowRight size={16} />}>View Pricing</GlowButton>
              </div>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </motion.div>
    </>
  )
}
