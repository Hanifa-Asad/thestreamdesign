import { motion } from 'framer-motion'
import { Target, Zap, Trophy, Shield, Headphones, Clock } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'

const REASONS = [
  { icon: Target,      title: 'Gaming-First Only',      desc: 'We exclusively serve gamers, streamers, and creators. Every design speaks the gaming language natively.' },
  { icon: Zap,         title: 'Fast Turnaround',         desc: 'Most projects delivered in 24–72 hours. Your stream needs to go live — not wait weeks for assets.' },
  { icon: Trophy,      title: 'Premium Quality',         desc: 'Production-grade assets used by professional streamers and YouTubers with millions of followers.' },
  { icon: Shield,      title: 'Unlimited Revisions',     desc: 'Not happy? We revise until you are. Satisfaction is non-negotiable on all Standard and Premium plans.' },
  { icon: Headphones,  title: '24/7 Support',            desc: 'Direct communication via Discord and WhatsApp. Always available for queries and updates.' },
  { icon: Clock,       title: 'You Own Everything',      desc: 'Full commercial usage rights included. All source files yours. No recurring licensing fees ever.' },
]

export default function WhyUsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gaming character - accent on right side */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="absolute -top-20 -right-32 w-72 h-80 pointer-events-none hidden xl:block"
      >
        <img 
          src="/characters/gaming-character-1.svg" 
          alt=""
          className="w-full h-full object-contain opacity-35"
          style={{ filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.25))', transform: 'scaleX(-1)' }}
        />
      </motion.div>

      {/* Top + bottom neon lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(44,255,5,0.25),transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(44,255,5,0.15),transparent)' }} />

      {/* Subtle bg tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(44,255,5,0.012)' }} />

      <div className="section-container relative z-10">
        <SectionHeader
          label="Why Choose Us"
          title="The Unfair"
          titleHighlight="Advantage"
          subtitle="We're not a generic design agency. We live and breathe gaming culture — and it shows in every pixel."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group relative p-6 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(44,255,5,0.35)'
                e.currentTarget.style.background  = 'rgba(44,255,5,0.04)'
                e.currentTarget.style.boxShadow   = '0 8px 32px rgba(44,255,5,0.1)'
                e.currentTarget.style.transform   = 'translateY(-5px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background  = 'rgba(255,255,255,0.025)'
                e.currentTarget.style.boxShadow   = 'none'
                e.currentTarget.style.transform   = 'translateY(0)'
              }}
            >
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100
                              transition-transform duration-500 origin-left"
                style={{ background: 'linear-gradient(90deg,rgba(44,255,5,0.6),transparent)' }} />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center relative"
                style={{ background: 'rgba(44,255,5,0.08)', border: '1px solid rgba(44,255,5,0.15)' }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(44,255,5,0.15)', boxShadow: '0 0 14px rgba(44,255,5,0.3)' }} />
                <Icon
                  size={20}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: '#00cc00', filter: 'drop-shadow(0 0 5px rgba(44,255,5,0.5))' }}
                />
              </div>

              <h3 className="font-display font-bold text-white text-xs tracking-[0.15em] uppercase mb-2.5">
                {title}
              </h3>
              <p className="font-body text-white/45 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
