import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Gamepad2, Youtube, ArrowRight } from 'lucide-react'
import { SERVICES, SERVICE_CATEGORIES } from '@utils/servicesData'

// ── Logo config ─────────────────────────────────────────────────────────────
const LOGO_SRC = '/logo.png'   // set to null to always use text logo
const LOGO_EXISTS = true   

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Services',  path: '/services', hasDropdown: true },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Pricing',   path: '/pricing' },
  { label: 'Blog',      path: '/blog' },
  { label: 'Contact',   path: '/contact' },
]

const GAMER_SERVICES = SERVICES.filter(s => s.category === SERVICE_CATEGORIES.GAMERS_STREAMERS)
const YT_SERVICES    = SERVICES.filter(s => s.category === SERVICE_CATEGORIES.YOUTUBERS)

function Logo() {
  return (
    <div className="flex items-center gap-2">
      {LOGO_EXISTS && (
        <img
          src={LOGO_SRC}
          alt="thestreamingdesign"
          className="h-8 md:h-9 w-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,204,0,0.5))' }}
        />
      )}
      <span className="font-display font-black text-xs sm:text-sm tracking-wider select-none">
        <span className="text-white">THE</span>
        <span style={{ color: '#00cc00', textShadow: '0 0 12px rgba(0,204,0,0.7)' }}>STREAMING</span>
        <span className="text-white">DESIGN</span>
      </span>
    </div>
  )
}


// ── Services Mega Dropdown ───────────────────────────────────────────────────
function ServicesDropdown({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] max-w-[95vw] rounded-2xl overflow-hidden z-50 shadow-2xl"
      style={{
        background: 'rgba(5,5,5,0.97)',
        border: '1px solid rgba(57,255,20,0.2)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(57,255,20,0.08)',
      }}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: 'rgba(57,255,20,0.7)' }}>// All Services</span>
        <Link to="/services" onClick={onClose}
          className="inline-flex items-center gap-1.5 font-display font-bold text-xs tracking-widest uppercase text-white/40 hover:text-neon-green transition-colors">
          View All <ArrowRight size={11} />
        </Link>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {/* Column 1: Gamers & Streamers */}
        <div>
          <div className="flex items-center gap-2 px-3 pb-2 mb-1">
            <Gamepad2 size={13} style={{ color: '#39FF14' }} />
            <span className="font-display font-bold text-xs tracking-widest uppercase"
              style={{ color: 'rgba(57,255,20,0.8)' }}>Gamers & Streamers</span>
          </div>
          {GAMER_SERVICES.map(svc => (
            <DropdownItem key={svc.id} service={svc} onClose={onClose} />
          ))}
        </div>

        {/* Column 2: YouTubers */}
        <div>
          <div className="flex items-center gap-2 px-3 pb-2 mb-1">
            <Youtube size={13} style={{ color: '#39FF14' }} />
            <span className="font-display font-bold text-xs tracking-widest uppercase"
              style={{ color: 'rgba(57,255,20,0.8)' }}>YouTubers</span>
          </div>
          {YT_SERVICES.map(svc => (
            <DropdownItem key={svc.id} service={svc} onClose={onClose} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 py-3 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(57,255,20,0.03)' }}>
        <span className="font-body text-white/30 text-xs">Need something custom?</span>
        <Link to="/contact" onClick={onClose}
          className="font-display font-black text-xs tracking-widest uppercase px-4 py-1.5 text-black transition-all"
          style={{ background: '#39FF14', clipPath: 'polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)',
            boxShadow: '0 0 14px rgba(57,255,20,0.5)' }}>
          Get a Quote
        </Link>
      </div>
    </motion.div>
  )
}

function DropdownItem({ service, onClose }) {
  const Icon = service.icon
  return (
    <Link
      to={`/services/${service.slug}`}
      onClick={onClose}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg group transition-all duration-150"
      style={{ border: '1px solid transparent' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(57,255,20,0.06)'
        e.currentTarget.style.borderColor = 'rgba(57,255,20,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'transparent'
      }}
    >
      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.15)' }}>
        <Icon size={13} style={{ color: '#39FF14' }} />
      </div>
      <span className="font-body text-white/65 text-sm group-hover:text-white transition-colors leading-tight">
        {service.title}
      </span>
    </Link>
  )
}

// ── Mobile accordion services list ──────────────────────────────────────────
function MobileServicesAccordion({ onClose }) {
  const [openCat, setOpenCat] = useState(null)

  const categories = [
    { key: 'gamers', label: 'Gamers & Streamers', Icon: Gamepad2, items: GAMER_SERVICES },
    { key: 'yt',     label: 'YouTubers',           Icon: Youtube,  items: YT_SERVICES    },
  ]

  return (
    <div className="pl-4 mt-1 space-y-1">
      {categories.map(({ key, label, Icon, items }) => (
        <div key={key}>
          <button
            onClick={() => setOpenCat(openCat === key ? null : key)}
            className="flex items-center justify-between w-full px-4 py-2.5 font-display font-bold text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Icon size={12} style={{ color: '#39FF14' }} />
              {label}
            </span>
            <motion.div animate={{ rotate: openCat === key ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={12} />
            </motion.div>
          </button>
          <AnimatePresence>
            {openCat === key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden pl-2"
              >
                {items.map(svc => {
                  const SvcIcon = svc.icon
                  return (
                    <Link key={svc.id} to={`/services/${svc.slug}`} onClick={onClose}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/55 hover:text-neon-green transition-colors text-sm font-body">
                      <SvcIcon size={12} style={{ color: '#39FF14', flexShrink: 0 }} />
                      {svc.title}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false)
  const [scrolled,      setScrolled]      = useState(false)
  const [servicesOpen,  setServicesOpen]  = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { pathname }  = useLocation()

  useEffect(() => { setIsOpen(false); setServicesOpen(false) }, [pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setServicesOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(57,255,20,0.1)' : '1px solid transparent',
      }}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(57,255,20,0.5),transparent)' }} />

      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" aria-label="thestreamingdesign home">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Logo />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map(({ label, path, hasDropdown }) => {
              if (hasDropdown) {
                return (
                  <li key={path} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setServicesOpen(v => !v)}
                      className="flex items-center gap-1 px-3.5 py-2 font-display text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200"
                      style={{ color: servicesOpen || pathname.startsWith('/services') ? '#39FF14' : 'rgba(255,255,255,0.55)' }}
                    >
                      {label}
                      <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={12} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <ServicesDropdown onClose={() => setServicesOpen(false)} />
                      )}
                    </AnimatePresence>
                  </li>
                )
              }
              return (
                <li key={path}>
                  <NavLink to={path}
                    className={({ isActive }) =>
                      `relative px-3.5 py-2 font-display text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 block
                       ${isActive ? '' : 'text-white/55 hover:text-white'}`
                    }
                    style={({ isActive }) => isActive ? { color: '#39FF14' } : {}}
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        {isActive && (
                          <motion.span layoutId="nav-underline" className="absolute bottom-0 left-2 right-2 h-px"
                            style={{ background: '#39FF14', boxShadow: '0 0 8px rgba(57,255,20,0.9)' }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 font-display font-black text-xs tracking-[0.2em] uppercase text-black transition-all duration-300"
              style={{ background: '#39FF14', clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)', boxShadow: '0 0 18px rgba(57,255,20,0.55)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(57,255,20,0.9)'; e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(57,255,20,0.55)'; e.currentTarget.style.transform = '' }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black/70" />
              </span>
              Start Project
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu">
            <AnimatePresence mode="wait">
              {isOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={22} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, path, hasDropdown }, i) => (
                <motion.div key={path} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.035 }}>
                  {hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileServicesOpen(v => !v)}
                        className="flex items-center justify-between w-full px-4 py-3 font-display font-bold text-xs tracking-[0.2em] uppercase border-l-2 transition-all duration-200 text-white/50 border-transparent hover:text-white hover:border-white/20"
                      >
                        {label}
                        <motion.div animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={14} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                            <MobileServicesAccordion onClose={() => { setIsOpen(false); setMobileServicesOpen(false) }} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink to={path}
                      className={({ isActive }) =>
                        `block px-4 py-3 font-display font-bold text-xs tracking-[0.2em] uppercase border-l-2 transition-all duration-200
                         ${isActive ? 'bg-green-950/30' : 'text-white/50 border-transparent hover:text-white hover:border-white/20'}`
                      }
                      style={({ isActive }) => isActive ? { color: '#39FF14', borderColor: '#39FF14' } : {}}
                    >
                      {label}
                    </NavLink>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="mt-3 px-4">
                <Link to="/contact" onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 font-display font-black text-xs tracking-[0.2em] uppercase text-black"
                  style={{ background: '#39FF14', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)', boxShadow: '0 0 22px rgba(57,255,20,0.55)' }}>
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
