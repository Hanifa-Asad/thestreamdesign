import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronDown, Zap } from 'lucide-react'
import ParticleBackground from '@components/ui/ParticleBackground'
import GlowButton from '@components/ui/GlowButton'

const STATS = [
  { value: '500+', label: 'Streamers Served' },
  { value: '10M+', label: 'Views Generated' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5★', label: 'Rated Agency' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Backgrounds ── */}
      <ParticleBackground count={50} />
      <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

      {/* Decorative horizontal lines */}
      <div className="absolute top-[22%] left-0 w-1/3 h-px pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to right,rgba(44,255,5,0.3),transparent)' }} />
      <div className="absolute top-[22%] right-0 w-1/4 h-px pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to left,rgba(44,255,5,0.15),transparent)' }} />

      {/* Vertical side lines */}
      <div className="absolute left-8 top-36 w-px h-28 pointer-events-none hidden xl:block"
        style={{ background: 'linear-gradient(to bottom,rgba(44,255,5,0.35),transparent)' }} />
      <div className="absolute right-8 top-36 w-px h-20 pointer-events-none hidden xl:block"
        style={{ background: 'linear-gradient(to bottom,rgba(44,255,5,0.15),transparent)' }} />

      {/* Corner bracket top-left */}
      <div className="absolute top-20 left-6 w-8 h-8 pointer-events-none hidden lg:block"
        style={{ borderTop: '1px solid rgba(44,255,5,0.35)', borderLeft: '1px solid rgba(44,255,5,0.35)' }} />
      {/* Corner bracket bottom-right */}
      <div className="absolute bottom-24 right-6 w-8 h-8 pointer-events-none hidden lg:block"
        style={{ borderBottom: '1px solid rgba(44,255,5,0.2)', borderRight: '1px solid rgba(44,255,5,0.2)' }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{ background: 'linear-gradient(to top,#0a0a0a,transparent)' }} />

      {/* Gaming Characters - Left side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: -20 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-80 pointer-events-none hidden lg:block"
      >
        <img 
          src="/characters/gaming-character-2.svg" 
          alt="Gaming character"
          className="w-full h-full object-contain opacity-60"
          style={{ filter: 'drop-shadow(0 0 30px rgba(57,255,20,0.4))' }}
        />
      </motion.div>

      {/* Gaming Characters - Right side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 20 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-80 pointer-events-none hidden lg:block"
      >
        <img 
          src="/characters/gaming-character-4.svg" 
          alt="Gaming character"
          className="w-full h-full object-contain opacity-60"
          style={{ filter: 'drop-shadow(0 0 30px rgba(57,255,20,0.4))', transform: 'scaleX(-1)' }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="section-container relative z-10 pt-28 pb-24">
        <div className="max-w-5xl mx-auto text-center">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 mb-9 px-5 py-2.5 rounded-full"
            style={{
              border: '1px solid rgba(44,255,5,0.28)',
              background: 'rgba(44,255,5,0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Ping dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-55" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
            </span>
            <span className="font-mono text-neon-green text-xs tracking-[0.25em] uppercase">
              Premium Gaming Agency
            </span>
            <Zap size={11} className="text-neon-green/50" />
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14 }}
          >
            <h1
              className="font-display font-black leading-[0.91] tracking-tight mb-0"
              style={{ fontSize: 'clamp(3.4rem,8.5vw,5.2rem)' }}
            >
              <span className="block text-white">Your Stream.</span>
              <span className="block text-white">Your Brand.</span>
              <span
                className="block"
                style={{
                  color: '#00cc00',
                  textShadow: '0 0 30px rgba(44,255,5,0.65), 0 0 80px rgba(44,255,5,0.22)',
                  animation: 'textGlow 2.2s ease-in-out infinite alternate',
                }}
              >
                Built to Win.
              </span>
            </h1>
          </motion.div>

          {/* Neon divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="w-40 h-px mx-auto my-7 origin-center"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(44,255,5,0.7),transparent)' }}
          />

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="font-body text-white/55 leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ fontSize: 'clamp(1rem,1.6vw,1.2rem)' }}
          >
            We help streamers and gaming creators grow with pro-level design, YouTube management, and stream branding — all in one place.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <GlowButton as="link" to="/contact" size="lg" iconRight={<ArrowRight size={18} />}>
              Get Started
            </GlowButton>
            <GlowButton as="link" to="/portfolio" variant="outline" size="lg" icon={<Play size={15} />}>
              See Our Work
            </GlowButton>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="grid grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto rounded-xl overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                whileHover={{ background: 'rgba(44,255,5,0.07)' }}
                className="group px-5 py-5 text-center relative"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'default',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-center"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(44,255,5,0.6),transparent)' }} />
                <div
                  className="font-display font-black text-xl sm:text-2xl mb-0.5"
                  style={{ color: '#00cc00', textShadow: '0 0 10px rgba(44,255,5,0.4)' }}
                >
                  {value}
                </div>
                <div className="font-mono text-white/30 text-[10px] tracking-widest uppercase">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-white/20 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={15} style={{ color: 'rgba(44,255,5,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
