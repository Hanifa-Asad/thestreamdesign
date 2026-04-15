import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Gamepad2, Twitch, Youtube, Layers, Video } from 'lucide-react'
import { Link } from 'react-router-dom'

const SLIDES = [
  {
    id: 1,
    Icon: Gamepad2,
    tag: 'Gamers & Streamers',
    headline: ['Level Up', 'Your Stream'],
    sub: 'Fully animated OBS-ready overlay packs that keep viewers hooked.',
    cta: { label: 'View Overlays', to: '/services/stream-overlays' },
    accent: '#2cff05',
    glow: 'rgba(44,255,5,',
    bg: '#000d00',
    gradFrom: 'rgba(44,255,5,0.22)',
    gradTo: 'rgba(44,255,5,0.03)',
  },
  {
    id: 2,
    Icon: Layers,
    tag: 'Logo Design',
    headline: ['Your Brand.', 'Dominant.'],
    sub: 'Custom gaming logos built to own every platform you play on.',
    cta: { label: 'Get Your Logo', to: '/services/logo-design' },
    accent: '#a855f7',
    glow: 'rgba(168,85,247,',
    bg: '#0d0018',
    gradFrom: 'rgba(168,85,247,0.22)',
    gradTo: 'rgba(168,85,247,0.03)',
  },
  {
    id: 3,
    Icon: Youtube,
    tag: 'Thumbnail Design',
    headline: ['Thumbnails', 'That Get Clicked'],
    sub: 'Data-driven designs that push your click-through rate to 9%+.',
    cta: { label: 'Order Thumbnails', to: '/services/thumbnail-design' },
    accent: '#ef4444',
    glow: 'rgba(239,68,68,',
    bg: '#180000',
    gradFrom: 'rgba(239,68,68,0.22)',
    gradTo: 'rgba(239,68,68,0.03)',
  },
  {
    id: 4,
    Icon: Twitch,
    tag: 'Twitch Emotes',
    headline: ['Give Your', 'Community a Voice'],
    sub: 'Custom emotes and sub badges that make subscribers feel exclusive.',
    cta: { label: 'Get Emotes', to: '/services/twitch-emotes' },
    accent: '#3b82f6',
    glow: 'rgba(59,130,246,',
    bg: '#000d18',
    gradFrom: 'rgba(59,130,246,0.22)',
    gradTo: 'rgba(59,130,246,0.03)',
  },
  {
    id: 5,
    Icon: Video,
    tag: 'Video Editing',
    headline: ['Pro Edits.', 'Max Watch Time.'],
    sub: 'YouTube video editing that hooks viewers from the first second.',
    cta: { label: 'Start Editing', to: '/services/video-editing' },
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,',
    bg: '#180d00',
    gradFrom: 'rgba(245,158,11,0.22)',
    gradTo: 'rgba(245,158,11,0.03)',
  },
]

const AUTO_MS = 4800

export default function BannerCarousel() {
  const [cur,    setCur]    = useState(0)
  const [dir,    setDir]    = useState(1)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const go = useCallback((idx, d) => {
    setDir(d)
    setCur((idx + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => go(cur + 1,  1), [cur, go])
  const prev = useCallback(() => go(cur - 1, -1), [cur, go])

  useEffect(() => {
    if (paused) return
    timer.current = setTimeout(next, AUTO_MS)
    return () => clearTimeout(timer.current)
  }, [cur, paused, next])

  const slide = SLIDES[cur]

  const textVariants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  return (
    <section
      className="relative overflow-hidden select-none"
      style={{ height: 'clamp(260px, 36vw, 480px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Animated background ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id + 'bg'}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{ background: slide.bg }}
        >
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${slide.gradTo.replace('0.03','0.05')} 1px,transparent 1px),linear-gradient(90deg,${slide.gradTo.replace('0.03','0.05')} 1px,transparent 1px)`,
            backgroundSize: '44px 44px',
          }} />
          {/* Left radial glow */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse 52% 80% at 5% 50%,${slide.gradFrom} 0%,transparent 68%)`,
          }} />
          {/* Subtle right glow */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse 32% 55% at 95% 50%,${slide.gradTo.replace('0.03','0.10')} 0%,transparent 70%)`,
          }} />
          {/* Scanline shimmer */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.15) 0px,rgba(255,255,255,0.15) 1px,transparent 1px,transparent 4px)',
          }} />
          {/* Bottom fade to page */}
          <div className="absolute bottom-0 left-0 right-0 h-28"
            style={{ background: 'linear-gradient(to top,#0a0a0a,transparent)' }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide content ── */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide.id}
              custom={dir}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              {/* Tag badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                style={{
                  border: `1px solid ${slide.accent}40`,
                  background: `${slide.accent}0e`,
                }}
              >
                <slide.Icon size={12} style={{ color: slide.accent }} />
                <span className="font-mono text-xs tracking-[0.22em] uppercase" style={{ color: slide.accent }}>
                  {slide.tag}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.19 }}>
                <h2 className="font-display font-black leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.8rem)' }}>
                  <span className="block text-white">{slide.headline[0]}</span>
                  <span className="block" style={{
                    color: slide.accent,
                    textShadow: `0 0 24px ${slide.glow}0.7), 0 0 60px ${slide.glow}0.25)`,
                  }}>
                    {slide.headline[1]}
                  </span>
                </h2>
              </motion.div>

              {/* Sub text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27 }}
                className="font-body text-white/50 mt-3 mb-6 leading-relaxed"
                style={{ fontSize: 'clamp(0.82rem, 1.4vw, 1rem)', maxWidth: '38ch' }}
              >
                {slide.sub}
              </motion.p>

              {/* CTA button */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
                <Link
                  to={slide.cta.to}
                  className="inline-flex items-center gap-2.5 font-display font-black text-xs tracking-[0.18em] uppercase px-6 py-3 transition-all duration-300 group"
                  style={{
                    background: slide.accent,
                    color: slide.accent === '#2cff05' ? '#000' : '#000',
                    clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                    boxShadow: `0 0 22px ${slide.glow}0.55)`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${slide.glow}0.85), 0 0 80px ${slide.glow}0.3)` }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 22px ${slide.glow}0.55)` }}
                >
                  {slide.cta.label}
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── HUD counter (desktop) ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2.5"
           style={{ opacity: 0.35 }}>
        <div className="w-px h-12" style={{ background: `linear-gradient(to bottom,transparent,${slide.accent})` }} />
        <span className="font-mono text-xs" style={{ writingMode: 'vertical-rl', color: slide.accent, letterSpacing: '0.15em' }}>
          {String(cur + 1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
        </span>
        <div className="w-px h-12" style={{ background: `linear-gradient(to bottom,${slide.accent},transparent)` }} />
      </div>

      {/* ── Prev / Next ── */}
      {[{ fn: prev, side: 'left-3 sm:left-5', Icon: ChevronLeft },
        { fn: next, side: 'right-3 sm:right-5 lg:right-20', Icon: ChevronRight }]
        .map(({ fn, side, Icon: Ic }) => (
          <button key={side} onClick={fn}
            className={`absolute ${side} top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center
                        text-white/50 hover:text-white transition-all duration-200 z-10`}
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${slide.accent}60`; e.currentTarget.style.color = slide.accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
          >
            <Ic size={16} />
          </button>
        ))}

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i, i > cur ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-350"
            style={{
              width: i === cur ? 26 : 6, height: 6,
              background: i === cur ? slide.accent : 'rgba(255,255,255,0.2)',
              boxShadow: i === cur ? `0 0 10px ${slide.glow}0.8)` : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
        {!paused && (
          <motion.div
            key={cur}
            className="h-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
            style={{ background: slide.accent, boxShadow: `0 0 6px ${slide.glow}0.7)` }}
          />
        )}
      </div>
    </section>
  )
}
