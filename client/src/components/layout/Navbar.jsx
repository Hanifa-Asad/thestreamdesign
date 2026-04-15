import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

// ── Drop your real logo file at: client/public/logo.png  (or .svg / .webp)
// ── It will replace the text logo automatically
const LOGO_SRC = '/logo.png'   // set to null to always use text logo
const LOGO_EXISTS = true     // ← flip to true once you've placed logo.png in /public

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Services',  path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Pricing',   path: '/pricing' },
  { label: 'Contact',   path: '/contact' },
]

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      {LOGO_EXISTS && (
        <img
          src={LOGO_SRC}
          alt="TheStreamDesign"
          className="h-9 md:h-10 w-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 8px rgba(44,255,5,0.5))' }}
        />
      )}
      <span className="font-display font-black text-sm md:text-base tracking-wider select-none">
        <span className="text-white">THE</span>
        <span style={{ color: '#2cff05', textShadow: '0 0 12px rgba(44,255,5,0.7)' }}>STREAM</span>
        <span className="text-white">DESIGN</span>
      </span>
    </div>
  )
}

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(44,255,5,0.12)' : '1px solid transparent',
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(44,255,5,0.55),transparent)' }} />

      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Logo />
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 font-display text-xs font-bold tracking-[0.15em] uppercase
                     transition-colors duration-200 block group
                     ${isActive ? 'text-neon-green' : 'text-white/55 hover:text-white'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-2 right-2 h-px"
                          style={{ background: '#2cff05', boxShadow: '0 0 8px rgba(44,255,5,0.9)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-6 py-2.5 font-display
                         font-black text-xs tracking-[0.2em] uppercase text-black
                         transition-all duration-300 group"
              style={{
                background: '#2cff05',
                clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                boxShadow: '0 0 16px rgba(44,255,5,0.5)',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(44,255,5,0.85), 0 0 60px rgba(44,255,5,0.3)'; e.currentTarget.style.background = '#3dff1a' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 16px rgba(44,255,5,0.5)'; e.currentTarget.style.background = '#2cff05' }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black/70" />
              </span>
              Start Project
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-neon-green transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}><X size={22} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}><Menu size={22} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
            style={{
              background: 'rgba(0,0,0,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(44,255,5,0.12)',
            }}
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, path }, i) => (
                <motion.div key={path} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `block px-4 py-3 font-display font-bold text-xs tracking-[0.2em] uppercase
                       border-l-2 transition-all duration-200
                       ${isActive ? 'text-neon-green border-neon-green bg-neon-green/5' : 'text-white/50 border-transparent hover:text-white hover:border-white/20'}`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-3 px-4">
                <Link
                  to="/contact"
                  className="block w-full text-center py-3 font-display font-black text-xs tracking-[0.2em] uppercase text-black"
                  style={{
                    background: '#2cff05',
                    clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                    boxShadow: '0 0 20px rgba(44,255,5,0.5)',
                  }}
                >
                  Start Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
