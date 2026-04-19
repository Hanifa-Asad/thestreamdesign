import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'
import ServiceCard from '@components/ui/ServiceCard'
import GlowButton from '@components/ui/GlowButton'
import { SERVICES, SERVICE_CATEGORIES } from '@utils/servicesData'

// Show only 4 from each category on home page
const GAMER_PREVIEW  = SERVICES.filter(s => s.category === SERVICE_CATEGORIES.GAMERS_STREAMERS).slice(0, 4)
const YT_PREVIEW     = SERVICES.filter(s => s.category === SERVICE_CATEGORIES.YOUTUBERS).slice(0, 4)

export default function ServicesPreviewSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gaming character - subtle decoration bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute -bottom-10 -left-20 w-56 h-72 pointer-events-none hidden lg:block"
      >
        <img 
          src="/characters/gaming-character-3.svg" 
          alt=""
          className="w-full h-full object-contain opacity-40"
          style={{ filter: 'drop-shadow(0 0 25px rgba(57,255,20,0.3))' }}
        />
      </motion.div>

      <div className="section-container relative z-10">

        <SectionHeader
          label="What We Do"
          title="Services Built For"
          titleHighlight="Creators"
          subtitle="From stream overlays to full YouTube channel management — every service is designed specifically for gaming and content creator audiences."
        />

        {/* ── Gamers & Streamers ── */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-neon-green rounded-full shadow-neon" />
              <h3 className="font-display font-bold text-xl text-white tracking-wide">
                Gamers & Streamers
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-green/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GAMER_PREVIEW.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* ── YouTubers ── */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-neon-green rounded-full shadow-neon" />
              <h3 className="font-display font-bold text-xl text-white tracking-wide">
                YouTubers
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-green/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {YT_PREVIEW.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <GlowButton as="link" to="/services" variant="outline" iconRight={<ArrowRight size={16} />}>
            View All Services
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
