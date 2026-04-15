import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from 'lucide-react'
import GlowButton from '@components/ui/GlowButton'
import CTASection from '@components/sections/CTASection'

const PORTFOLIO_ITEMS = [
  { id: 1,  title: 'NeonStrike Gaming',    client: 'NeonStrike_TV',   category: 'Logo',      tags: ['Twitch', 'Esports'],    gradient: 'from-green-900 to-black'   },
  { id: 2,  title: 'PhantomX Overlay',     client: 'PhantomXGG',      category: 'Overlay',   tags: ['Twitch', 'OBS'],        gradient: 'from-purple-900 to-black'  },
  { id: 3,  title: 'VoidTV Channel Art',   client: 'VoidTV',          category: 'Banner',    tags: ['YouTube', 'Gaming'],    gradient: 'from-blue-900 to-black'    },
  { id: 4,  title: 'GhostRider CTR Pack',  client: 'GhostRider',      category: 'Thumbnail', tags: ['YouTube', 'FPS'],       gradient: 'from-red-900 to-black'     },
  { id: 5,  title: 'ShadowStream Kit',     client: 'ShadowStream',    category: 'Overlay',   tags: ['Twitch', 'Alerts'],     gradient: 'from-cyan-900 to-black'    },
  { id: 6,  title: 'PixelKing Emotes',     client: 'PixelKingTV',     category: 'Emote',     tags: ['Twitch', 'Community'],  gradient: 'from-yellow-900 to-black'  },
  { id: 7,  title: 'NightOwl Brand Kit',   client: 'NightOwlStreams', category: 'Logo',      tags: ['Twitch', 'Branding'],   gradient: 'from-indigo-900 to-black'  },
  { id: 8,  title: 'TacticalAce Thumbs',   client: 'TacticalAceGG',  category: 'Thumbnail', tags: ['YouTube', 'FPS'],       gradient: 'from-orange-900 to-black'  },
  { id: 9,  title: 'QueenRealm Overlays',  client: 'PixelQueenTV',   category: 'Overlay',   tags: ['Twitch', 'Fantasy'],    gradient: 'from-pink-900 to-black'    },
  { id: 10, title: 'VortexGG Identity',    client: 'VortexGG',       category: 'Logo',      tags: ['Esports', 'Team'],      gradient: 'from-teal-900 to-black'    },
  { id: 11, title: 'CryptoGamer Reels',    client: 'CryptoGamer',    category: 'Thumbnail', tags: ['YouTube', 'Shorts'],    gradient: 'from-violet-900 to-black'  },
  { id: 12, title: 'IronFist Emote Pack',  client: 'IronFist_Twitch',category: 'Emote',     tags: ['Twitch', 'Sub badges'], gradient: 'from-slate-800 to-black'   },
]

const CATEGORIES = ['All', 'Logo', 'Overlay', 'Banner', 'Thumbnail', 'Emote']

const CATEGORY_COLORS = {
  Logo:      'bg-green-500/15 text-green-400 border-green-500/30',
  Overlay:   'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Banner:    'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Thumbnail: 'bg-red-500/15 text-red-400 border-red-500/30',
  Emote:     'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
}

const STATS = [
  { n: '500+', label: 'Projects Completed' },
  { n: '200+', label: 'Happy Clients'      },
  { n: '5',    label: 'Categories'         },
  { n: '4.9★', label: 'Average Rating'     },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox,     setLightbox]     = useState(null)

  const filtered = useMemo(() =>
    activeFilter === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  const closeLightbox = () => setLightbox(null)
  const prevItem = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const nextItem = () => setLightbox(i => (i + 1) % filtered.length)
  const current  = lightbox !== null ? filtered[lightbox] : null

  return (
    <>
      <Helmet>
        <title>Portfolio | TheStreamDesign</title>
        <meta name="description" content="Browse our portfolio of gaming logos, stream overlays, Twitch emotes, YouTube thumbnails and more." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >

        {/* ── Page Hero ── */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

          <div className="section-container relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-4"
            >
              // Our Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
            >
              The <span className="text-neon-green">Portfolio</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-white/50 text-lg max-w-2xl mx-auto mb-12"
            >
              Every project here was built to make a real creator's brand unforgettable.
              Replace placeholders with your real work as the agency grows.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-10"
            >
              {STATS.map(({ n, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-black text-3xl text-neon-green">{n}</div>
                  <div className="font-body text-white/40 text-xs uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Filter Bar ── */}
        <div className="sticky top-16 md:top-20 z-30 bg-dark-100/95 backdrop-blur-md border-b border-glass-border py-4">
          <div className="section-container">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map(cat => {
                const count   = cat === 'All' ? PORTFOLIO_ITEMS.length : PORTFOLIO_ITEMS.filter(p => p.category === cat).length
                const isActive = activeFilter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={[
                      'flex items-center gap-2 px-5 py-2 rounded-lg font-display text-xs font-bold',
                      'tracking-widest uppercase whitespace-nowrap transition-all duration-200 flex-shrink-0',
                      isActive
                        ? 'bg-neon-green text-black shadow-neon'
                        : 'text-white/50 border border-white/10 hover:text-white hover:border-white/30',
                    ].join(' ')}
                  >
                    {cat}
                    <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${isActive ? 'bg-black/20 text-black/70' : 'bg-white/10 text-white/40'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Portfolio Grid ── */}
        <section className="py-16">
          <div className="section-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    onClick={() => setLightbox(idx)}
                    className="group relative rounded-xl overflow-hidden cursor-pointer
                               border border-white/5 hover:border-neon-green/40
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    {/* Placeholder image area */}
                    <div className={`aspect-video bg-gradient-to-br ${item.gradient} relative flex items-center justify-center`}>
                      <div className="text-center p-6 z-10 relative">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <ZoomIn size={18} className="text-white/25" />
                        </div>
                        <span className="font-mono text-white/20 text-xs">Placeholder</span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100
                                      transition-opacity duration-300 flex items-center justify-center z-20">
                        <div className="text-center translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full
                                          bg-neon-green/20 border border-neon-green/60
                                          flex items-center justify-center">
                            <ExternalLink size={18} className="text-neon-green" />
                          </div>
                          <p className="font-display font-bold text-sm text-white">View Project</p>
                        </div>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="p-4 bg-dark-300">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-sm text-white tracking-wide leading-tight">
                          {item.title}
                        </h3>
                        <span className={`flex-shrink-0 text-xs font-mono px-2 py-0.5 rounded border ${CATEGORY_COLORS[item.category]}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="font-mono text-white/30 text-xs mb-2">@{item.client}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map(tag => (
                          <span key={tag} className="font-mono text-white/25 text-xs bg-white/5 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="font-display text-white/30 text-xl">No items in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {current && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-neon-green/20 bg-dark-300"
                onClick={e => e.stopPropagation()}
              >
                {/* Image */}
                <div className={`aspect-video bg-gradient-to-br ${current.gradient} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ZoomIn size={28} className="text-white/20" />
                    </div>
                    <p className="font-display font-bold text-white/30">{current.title}</p>
                    <p className="font-mono text-white/15 text-xs mt-1">Placeholder image</p>
                  </div>
                </div>

                {/* Info bar */}
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-white">{current.title}</h3>
                    <p className="font-mono text-white/40 text-xs mt-0.5">@{current.client} · {current.category}</p>
                  </div>
                  <GlowButton as="link" to="/contact" size="sm" onClick={closeLightbox}>
                    Order Similar
                  </GlowButton>
                </div>

                {/* Prev / Next */}
                <button
                  onClick={e => { e.stopPropagation(); prevItem() }}
                  className="absolute left-3 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full
                             bg-black/60 border border-white/10 flex items-center justify-center
                             text-white hover:border-neon-green/50 hover:text-neon-green transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); nextItem() }}
                  className="absolute right-3 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full
                             bg-black/60 border border-white/10 flex items-center justify-center
                             text-white hover:border-neon-green/50 hover:text-neon-green transition-all"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Close */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/10
                             flex items-center justify-center text-white/60 hover:text-white hover:border-neon-green/40 transition-all"
                >
                  <X size={16} />
                </button>

                {/* Counter */}
                <div className="absolute top-3 left-3 font-mono text-white/40 text-xs bg-black/60 px-3 py-1 rounded-full">
                  {lightbox + 1} / {filtered.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mid-page CTA card ── */}
        <section className="py-12">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 sm:p-12 text-center"
            >
              <p className="font-mono text-neon-green text-xs tracking-widest uppercase mb-3">
                // Want Results Like These?
              </p>
              <h3 className="font-display font-black text-3xl text-white mb-4">
                Let's Build Your Brand
              </h3>
              <p className="font-body text-white/50 max-w-lg mx-auto mb-8">
                Every project in this portfolio started with a simple message. Yours could be next.
              </p>
              <GlowButton as="link" to="/contact" size="lg" iconRight={<ArrowRight size={16} />}>
                Start Your Project
              </GlowButton>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </motion.div>
    </>
  )
}
