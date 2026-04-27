import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'

const TESTIMONIALS = [
  {
    id: 1,
    name: '@DarkHunterGG',
    role: 'Twitch Partner',
    avatar: 'DH',
    color: 'bg-purple-500',
    rating: 5,
    text: 'My Twitch channel looked completely professional after working with them. New overlay, logo, alert package — all in one week!',
    service: 'Twitch Branding',
  },
  {
    id: 2,
    name: '@PixelRageYT',
    role: 'Gaming YouTuber',
    avatar: 'PR',
    color: 'bg-red-500',
    rating: 5,
    text: 'They handled my entire YouTube strategy. Thumbnails, SEO, editing. I went from 800 to 25K subs in 6 months.',
    service: 'YouTube Growth',
  },
  {
    id: 3,
    name: '@VortexEsports',
    role: 'Esports Team',
    avatar: 'VE',
    color: 'bg-cyan-600',
    rating: 5,
    text: 'Best esports logo design I\'ve ever seen. Fast, clean, and exactly what our team needed.',
    service: 'Logo Design',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative bg-dark-200/20 overflow-hidden">
      {/* Gaming character accent - top left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 -left-24 w-64 h-64 pointer-events-none hidden lg:block"
      >
        <img 
          src="/characters/gaming-character-1.svg" 
          alt=""
          className="w-full h-full object-contain opacity-30"
          style={{ filter: 'drop-shadow(0 0 15px rgba(57,255,20,0.2))' }}
        />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeader
          label="Testimonials"
          title="Real Streamers."
          titleHighlight="Real Results."
          subtitle="Hear from streamers and creators who leveled up their brand, growth, and content with our team."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="glass-card p-6 flex flex-col gap-4 hover:border-neon-green/30 hover:shadow-card-hover transition-all duration-300"
            >
              <Quote size={20} className="text-neon-green/30 flex-shrink-0" />

              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} className="text-neon-green fill-neon-green" />
                ))}
              </div>

              <p className="font-body text-white/60 text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>

              <span className="inline-block font-mono text-xs text-neon-green/60 border border-neon-green/20 px-3 py-1 rounded-full w-fit">
                {t.service}
              </span>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-display font-bold text-xs text-white flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white tracking-wide">
                    {t.name}
                  </div>
                  <div className="font-body text-white/40 text-xs">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
    </section>
  )
}
