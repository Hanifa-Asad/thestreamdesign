import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import GlowButton from '@components/ui/GlowButton'

const FAQS = [
  {
    id: 1,
    q: 'How long does delivery take?',
    a: 'Most design projects are done in 5–10 business days. Rush options available.',
  },
  {
    id: 2,
    q: 'Do you work with beginners?',
    a: '100%. We love helping new streamers build their brand from day one.',
  },
  {
    id: 3,
    q: 'Can I buy a premade overlay instead of custom?',
    a: 'Yes! We offer premade twitch overlays that are ready to use in OBS instantly.',
  },
  {
    id: 4,
    q: 'Do you offer ongoing YouTube management?',
    a: 'Absolutely — our YouTube channel management service for gamers runs on a monthly basis.',
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
            Quick Answers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="font-display font-black text-3xl sm:text-4xl text-white">
            Quick Answers
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

        <div className="mt-14 text-center">
          <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-4 inline-block">// Ready to Stand Out?</span>
          <h3 className="font-display font-black text-3xl text-white mt-3 mb-5">Ready to Stand Out?</h3>
          <GlowButton as="link" to="/contact" size="lg" iconRight={<Plus size={16} />}>
            Get Started Today
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
