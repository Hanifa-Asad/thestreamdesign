import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    id: 1,
    q: 'How much do your services cost?',
    a: 'Pricing varies by service and plan tier (Basic, Standard, Premium). We keep all pricing transparent on our Pricing page. Basic plans start from affordable rates for smaller creators, while Premium plans include full brand packages with unlimited revisions. Contact us for a custom quote if you have specific requirements.',
  },
  {
    id: 2,
    q: 'How long does delivery take?',
    a: 'Turnaround depends on the service: logos and thumbnails are typically delivered in 1–3 business days, stream overlay packs in 3–5 business days, and video editing in 2–5 business days per video. Premium plans include priority delivery. Rush orders (24h) are available on request.',
  },
  {
    id: 3,
    q: 'How many revisions do I get?',
    a: 'Basic plans include 2 free revisions. Standard and Premium plans include unlimited revisions — we work with you until you\'re 100% satisfied. We take your feedback seriously and don\'t close a project until you\'re happy with the result.',
  },
  {
    id: 4,
    q: 'Which platforms are supported?',
    a: 'We design for all major creator platforms: Twitch, YouTube, Instagram, TikTok, Twitter/X, Discord, and Facebook. All assets are delivered in platform-specific sizes. OBS and Streamlabs overlay packages include scene collection files for instant import.',
  },
  {
    id: 5,
    q: 'Do I own the files after delivery?',
    a: 'Yes — 100%. You receive full commercial usage rights to everything we create. Standard and Premium plans include source files (PSD, AI, or project files). You are free to use the assets commercially, modify them, or hand them off to other editors without any licensing restrictions.',
  },
  {
    id: 6,
    q: 'How do I start a project?',
    a: 'Fill out our contact form or message us on WhatsApp with your project idea. We\'ll send you a short brief questionnaire to understand your brand, style preferences, and requirements. Once confirmed, we start immediately and keep you updated throughout the process.',
  },
]

export default function FAQSection({ limit }) {
  const [openId, setOpenId] = useState(null)
  const items = limit ? FAQS.slice(0, limit) : FAQS

  return (
    <section className="py-20 relative">
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(57,255,20,0.2),transparent)' }} />

      <div className="section-container max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'rgba(57,255,20,0.8)' }}>
            // Common Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="font-display font-black text-3xl sm:text-4xl text-white">
            Frequently Asked <span style={{ color: '#39FF14', textShadow: '0 0 20px rgba(57,255,20,0.5)' }}>Questions</span>
          </motion.h2>
        </div>

        {/* Accordion items */}
        <div className="space-y-2.5">
          {items.map((item, i) => {
            const isOpen = openId === item.id
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-xl overflow-hidden"
                style={{
                  border: `1px solid ${isOpen ? 'rgba(57,255,20,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  background: isOpen ? 'rgba(57,255,20,0.04)' : 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.25s, background 0.25s',
                  boxShadow: isOpen ? '0 0 24px rgba(57,255,20,0.08)' : 'none',
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm tracking-wide text-white leading-snug">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 0 : 0 }}
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-250"
                    style={{
                      background: isOpen ? 'rgba(57,255,20,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isOpen ? 'rgba(57,255,20,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    {isOpen
                      ? <Minus size={13} style={{ color: '#39FF14' }} />
                      : <Plus size={13} className="text-white/50" />
                    }
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <p className="font-body text-white/55 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
