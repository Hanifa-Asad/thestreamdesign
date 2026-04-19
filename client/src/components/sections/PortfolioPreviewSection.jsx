import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'
import GlowButton from '@components/ui/GlowButton'

// Placeholder portfolio items — replace src with real images
const PORTFOLIO_ITEMS = [
  { id: 1, title: 'NeonStrike Logo',      category: 'Logo',     bg: 'from-green-900 to-black' },
  { id: 2, title: 'PhantomX Overlay',     category: 'Overlay',  bg: 'from-purple-900 to-black' },
  { id: 3, title: 'VoidTV Banner',         category: 'Banner',   bg: 'from-blue-900 to-black' },
  { id: 4, title: 'GhostRider Thumbnail', category: 'Thumbnail',bg: 'from-red-900 to-black' },
  { id: 5, title: 'ShadowStream Kit',     category: 'Overlay',  bg: 'from-cyan-900 to-black' },
  { id: 6, title: 'PixelKing Emotes',     category: 'Emote',    bg: 'from-yellow-900 to-black' },
]

const CATEGORY_COLORS = {
  Logo:      'bg-neon-green/20 text-neon-green',
  Overlay:   'bg-purple-500/20 text-purple-400',
  Banner:    'bg-blue-500/20 text-blue-400',
  Thumbnail: 'bg-red-500/20 text-red-400',
  Emote:     'bg-yellow-500/20 text-yellow-400',
}

export default function PortfolioPreviewSection() {
  return (
    <section className="py-24 relative">
      {/* Subtle gaming character - top right corner */}
      <div className="absolute -top-20 -right-10 w-48 h-64 pointer-events-none hidden lg:block opacity-30">
        <img 
          src="/characters/gaming-character-1.svg" 
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.2))' }}
        />
      </div>

      <div className="section-container relative z-10">
        <SectionHeader
          label="Our Work"
          title="Portfolio"
          titleHighlight="Highlights"
          subtitle="A glimpse of what we create. Every project is built to make your brand unforgettable."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer
                         border border-white/5 hover:border-neon-green/40
                         transition-all duration-300"
            >
              {/* Placeholder image area */}
              <div className={`aspect-video bg-gradient-to-br ${item.bg}
                               flex items-center justify-center`}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-white/5
                                  border border-white/10 flex items-center justify-center">
                    <ExternalLink size={20} className="text-white/30" />
                  </div>
                  <span className="font-mono text-white/20 text-xs">Placeholder Image</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark-100/80 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0
                                  transition-transform duration-300">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full
                                    bg-neon-green/20 border border-neon-green/50
                                    flex items-center justify-center">
                      <ExternalLink size={18} className="text-neon-green" />
                    </div>
                    <p className="font-display text-sm font-bold text-white tracking-wide">
                      View Project
                    </p>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-4 bg-dark-300/80 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white tracking-wide">
                    {item.title}
                  </h4>
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full ${CATEGORY_COLORS[item.category]}`}>
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <GlowButton as="link" to="/portfolio" variant="outline" iconRight={<ArrowRight size={16} />}>
            View All Our Work
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
