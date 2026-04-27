import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, X } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaLinkedinIn, FaTwitch, FaPatreon, FaBehance, FaDribbble, FaPinterest } from 'react-icons/fa'
import { SiThreads, SiTrustpilot, SiKick } from 'react-icons/si'
import { SOCIAL_LINKS, CONTACT_INFO } from '@utils/emailConfig'
import { motion, AnimatePresence } from 'framer-motion'

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
    { label: 'Our Work', path: '/portfolio' },
    { label: 'Pricing',   path: '/pricing' },
    { label: 'Blog',      path: '/blog' },
    { label: 'Contact',   path: '/contact' },
  ],
}

const SOCIAL_ICONS = [
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: SiThreads,   href: SOCIAL_LINKS.threads,   label: 'Threads'   },
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook,  label: 'Facebook'  },
  { icon: FaTiktok,    href: SOCIAL_LINKS.tiktok,    label: 'TikTok'    },
  { icon: FaTwitter,   href: SOCIAL_LINKS.twitter,   label: 'Twitter / X' },
  { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin,  label: 'LinkedIn' },
  { icon: SiTrustpilot, href: SOCIAL_LINKS.trustpilot, label: 'Trustpilot' },
  { icon: FaYoutube,   href: SOCIAL_LINKS.youtube,   label: 'YouTube'   },
  { icon: SiKick,      href: SOCIAL_LINKS.kick,      label: 'Kick'      },
  { icon: FaTwitch,    href: SOCIAL_LINKS.twitch,    label: 'Twitch'    },
  { icon: FaPatreon,   href: SOCIAL_LINKS.patreon,   label: 'Patreon'   },
  { icon: FaBehance,   href: SOCIAL_LINKS.behance,   label: 'Behance'   },
  { icon: FaDribbble,  href: SOCIAL_LINKS.dribbble,  label: 'Dribbble'  },
  { icon: FaPinterest, href: SOCIAL_LINKS.pinterest, label: 'Pinterest' },
]

// ── Inline Modal for Privacy Policy / Terms ──────────────────────────────────
function LegalModal({ type, onClose }) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: January 2025',
      sections: [
        {
          heading: 'Information We Collect',
          body: 'We collect information you provide directly to us when you fill out our contact form, including your name, email address, and message content. We do not collect any sensitive personal data.',
        },
        {
          heading: 'How We Use Your Information',
          body: 'Your information is used solely to respond to your project inquiries and deliver our services. We never sell, trade, or share your personal information with third parties for marketing purposes.',
        },
        {
          heading: 'Data Storage',
          body: 'Contact form submissions may be stored in our secure database (MongoDB Atlas) to maintain project communication history. All data is encrypted at rest and in transit.',
        },
        {
          heading: 'Cookies',
          body: 'This website does not use tracking cookies. We may use essential session cookies only to maintain site functionality.',
        },
        {
          heading: 'Third-Party Services',
          body: 'We use EmailJS to process contact form submissions. Please refer to their privacy policy for details on how they handle data.',
        },
        {
          heading: 'Your Rights',
          body: 'You may request deletion of your data at any time by contacting us at hello@thestreamingdesign.com. We will comply within 30 days.',
        },
        {
          heading: 'Contact',
          body: 'For privacy-related concerns, please email hello@thestreamingdesign.com.',
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      updated: 'Last updated: January 2025',
      sections: [
        {
          heading: 'Acceptance of Terms',
          body: 'By using our website or purchasing our services, you agree to these Terms & Conditions. If you do not agree, please do not use our services.',
        },
        {
          heading: 'Services',
          body: 'thestreamingdesign provides digital design services including logos, stream overlays, Twitch emotes, YouTube thumbnails, video editing, and related services exclusively for gaming creators.',
        },
        {
          heading: 'Payment & Delivery',
          body: 'Payment is required upfront or as a 50% deposit depending on the plan. Delivery timelines are estimates and may vary. Rush delivery is available on Premium plans.',
        },
        {
          heading: 'Revisions',
          body: 'Basic plans include 2 revisions. Standard and Premium plans include unlimited revisions until satisfaction. Additional revisions beyond the plan limit are billed separately.',
        },
        {
          heading: 'Intellectual Property',
          body: 'Upon full payment, you receive full commercial usage rights to all delivered assets. Source files are included in Standard and Premium plans. We retain the right to display work in our portfolio.',
        },
        {
          heading: 'Refund Policy',
          body: 'Refunds are available before work begins. Once design work has started, refunds are evaluated case-by-case. If you are unsatisfied after all revision rounds are exhausted, a partial refund may be issued.',
        },
        {
          heading: 'Limitation of Liability',
          body: 'thestreamingdesign is not liable for any indirect, incidental, or consequential damages arising from use of our services. Our total liability is limited to the amount paid for the specific service.',
        },
        {
          heading: 'Contact',
          body: 'For questions about these terms, contact hello@thestreamingdesign.com.',
        },
      ],
    },
  }

  const doc = content[type]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#080808', border: '1px solid rgba(57,255,20,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(57,255,20,0.7)' }}>
              // Legal
            </span>
            <h2 className="font-display font-black text-xl text-white mt-1">{doc.title}</h2>
            <p className="font-mono text-white/25 text-xs mt-0.5">{doc.updated}</p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {doc.sections.map(({ heading, body }) => (
            <div key={heading}>
              <h3 className="font-display font-bold text-sm tracking-wide uppercase mb-1.5"
                style={{ color: '#39FF14' }}>{heading}</h3>
              <p className="font-body text-white/55 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={onClose}
            className="w-full py-2.5 font-display font-black text-xs tracking-widest uppercase text-black"
            style={{ background: '#39FF14', clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)', boxShadow: '0 0 16px rgba(57,255,20,0.4)' }}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Footer() {
  const [legalModal, setLegalModal] = useState(null) // null | 'privacy' | 'terms'

  return (
    <>
      {/* Legal modals */}
      <AnimatePresence>
        {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
      </AnimatePresence>

      <footer className="relative mt-20" style={{ background: '#060606', borderTop: '1px solid rgba(57,255,20,0.1)' }}>
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg,transparent,rgba(57,255,20,0.5),transparent)' }} />

        <div className="section-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <div className="flex items-center gap-2.5">
                {LOGO_EXISTS && (
                  <img src="/logo.png" alt="thestreamingdesign" className="h-9 w-auto object-contain"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0,204,0,0.5))' }} />
                )}
                <span className="font-display font-black text-sm tracking-wider select-none">
                  <span className="text-white">THE</span>
                  <span style={{ color: '#00cc00', textShadow: '0 0 12px rgba(0,204,0,0.7)' }}>STREAMING</span>
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
              <a href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 text-white/40 hover:text-neon-green text-sm transition-colors duration-200">
                <Phone size={13} className="text-neon-green/60" />
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="font-display text-xs tracking-[0.25em] uppercase mb-5"
                  style={{ color: '#39FF14', textShadow: '0 0 8px rgba(57,255,20,0.4)' }}>
                  {heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, path }) => (
                    <li key={path}>
                      <Link to={path}
                        className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transition-transform">
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
                style={{ color: '#39FF14', textShadow: '0 0 8px rgba(57,255,20,0.4)' }}>
                Follow Us
              </h4>
              <div className="grid grid-cols-4 gap-2.5">
                {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white/35 transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(57,255,20,0.5)'; e.currentTarget.style.color = '#39FF14'; e.currentTarget.style.boxShadow = '0 0 12px rgba(57,255,20,0.25)'; e.currentTarget.style.background = 'rgba(57,255,20,0.07)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with inline copyright and legal links */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="font-mono text-white/50 text-xs text-center">
              © The Stream Design — All content is original and SEO-optimized for gaming & streaming audiences.
              {' '}
              <span className="text-white/40">|</span>
              {' '}
              <button
                onClick={() => setLegalModal('privacy')}
                className="font-mono text-white/25 text-xs hover:text-neon-green transition-colors duration-200 underline underline-offset-2 decoration-white/15 hover:decoration-neon-green"
              >
                Privacy Policy
              </button>
              {' '}
              <span className="text-white/40">|</span>
              {' '}
              <button
                onClick={() => setLegalModal('terms')}
                className="font-mono text-white/25 text-xs hover:text-neon-green transition-colors duration-200 underline underline-offset-2 decoration-white/15 hover:decoration-neon-green"
              >
                Terms & Conditions
              </button>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
