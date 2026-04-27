import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'
import GlowButton from '@components/ui/GlowButton'

const PILLARS = [
  {
    title: 'Stream & Twitch Design',
    description: 'Overlays, alerts, panels & more built to make every broadcast look premium and polished.',
  },
  {
    title: 'Gaming Logo & Esports Design',
    description: 'Logos that mean business — brand marks crafted for teams, streamers, and competitive creators.',
  },
  {
    title: 'YouTube Growth & Management',
    description: 'Strategy, SEO, editing, and thumbnails that help your channel attract views and subscribers.',
  },
  {
    title: 'Twitch Channel Setup & Optimization',
    description: 'Ready-to-go live channel assets, panels, and optimization that keep your stream looking sharp.',
  },
]

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
          title="Everything You Need to Grow —"
          titleHighlight="One Agency."
          subtitle="We handle the design, strategy, and content so you can focus on streaming. From custom stream overlays and gaming logo design to YouTube channel management and Twitch growth service — we've got you covered."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-3xl p-8 border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.25)]"
            >
              <h3 className="font-display font-black text-xl text-white mb-4">
                {pillar.title}
              </h3>
              <p className="font-body text-white/60 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <GlowButton as="link" to="/services" variant="outline" iconRight={<ArrowRight size={16} />}>
            View All Services
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
