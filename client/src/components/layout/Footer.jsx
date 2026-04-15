import { Link } from 'react-router-dom'
import { Mail, MessageCircle, Zap } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaDiscord, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { SiThreads } from 'react-icons/si'
import { SOCIAL_LINKS, CONTACT_INFO } from '@utils/emailConfig'

// ── Same flag as Navbar: flip to true once logo.png is in /public
const LOGO_EXISTS = true

const FOOTER_LINKS = {
  Services: [
    { label: 'Logo Design',      path: '/services/logo-design' },
    { label: 'Stream Overlays',  path: '/services/stream-overlays' },
    { label: 'Stream Banners',   path: '/services/stream-banners' },
    { label: 'Twitch Emotes',    path: '/services/twitch-emotes' },
    { label: 'Thumbnail Design', path: '/services/thumbnail-design' },
    { label: 'Video Editing',    path: '/services/video-editing' },
  ],
  Company: [
    { label: 'Home',      path: '/' },
    { label: 'About',     path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing',   path: '/pricing' },
    { label: 'Contact',   path: '/contact' },
  ],
}

const SOCIAL_ICONS = [
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook,  label: 'Facebook'  },
  { icon: FaTwitter,   href: SOCIAL_LINKS.twitter,   label: 'Twitter'   },
  { icon: FaTiktok,    href: SOCIAL_LINKS.tiktok,    label: 'TikTok'    },
  { icon: SiThreads,   href: SOCIAL_LINKS.threads,   label: 'Threads'   },
  { icon: FaDiscord,   href: SOCIAL_LINKS.discord,   label: 'Discord'   },
  { icon: FaYoutube,   href: SOCIAL_LINKS.youtube,   label: 'YouTube'   },
  { icon: FaWhatsapp,  href: SOCIAL_LINKS.whatsapp,  label: 'WhatsApp'  },
]

export default function Footer() {
  return (
    <footer className="relative mt-20" style={{ background: '#060606', borderTop: '1px solid rgba(44,255,5,0.1)' }}>
      {/* Top neon line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg,transparent,rgba(44,255,5,0.5),transparent)' }} />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <div className="flex items-center gap-2.5">
                {LOGO_EXISTS && (
                  <img src="/logo.png" alt="TheStreamDesign" className="h-9 w-auto object-contain"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(44,255,5,0.5))' }} />
                )}
                <span className="font-display font-black text-sm tracking-wider select-none">
                  <span className="text-white">THE</span>
                  <span style={{ color: '#2cff05', textShadow: '0 0 12px rgba(44,255,5,0.7)' }}>STREAM</span>
                  <span className="text-white">DESIGN</span>
                </span>
              </div>
            </Link>
            <p className="font-body text-white/40 text-sm leading-relaxed mb-6">
              Premium gaming & digital services for Gamers, Streamers, and YouTubers. Level up your brand today.
            </p>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-white/40 hover:text-neon-green text-sm transition-colors duration-200">
                <Mail size={13} className="text-neon-green/60" />
                {CONTACT_INFO.email}
              </a>
              <a href={SOCIAL_LINKS.whatsapp}
                className="flex items-center gap-2 text-white/40 hover:text-neon-green text-sm transition-colors duration-200">
                <MessageCircle size={13} className="text-neon-green/60" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display text-xs tracking-[0.25em] uppercase mb-5"
                style={{ color: '#2cff05', textShadow: '0 0 8px rgba(44,255,5,0.4)' }}>
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path}
                      className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200
                                 hover:translate-x-1 inline-block transition-transform">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h4 className="font-display text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: '#2cff05', textShadow: '0 0 8px rgba(44,255,5,0.4)' }}>
              Follow Us
            </h4>
            <div className="grid grid-cols-4 gap-2.5">
              {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/35
                             transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(44,255,5,0.5)'
                    e.currentTarget.style.color = '#2cff05'
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(44,255,5,0.25)'
                    e.currentTarget.style.background = 'rgba(44,255,5,0.07)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-white/20 text-xs">
            © {new Date().getFullYear()} TheStreamDesign. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: 'rgba(44,255,5,0.25)' }}>
            Crafted for Gamers. Built to Convert.
          </p>
        </div>
      </div>
    </footer>
  )
}
