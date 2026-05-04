import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const DISPLAY_DELAY_MS = 1400

export default function PromoPopup({ imageSrc = '/promo-popup.png' }) {
  const [isVisible, setIsVisible] = useState(false)
  const overlayRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true)
    }, DISPLAY_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [])

  const closePopup = () => {
    setIsVisible(false)
  }

  const onOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      closePopup()
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Promotional offer"
          onClick={onOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-[#050505]/95 shadow-[0_28px_80px_rgba(0,204,0,0.22)]"
          >
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#00ff00]/10 via-transparent to-[#00ff00]/05 blur-3xl" />
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white transition hover:border-[#00cc00] hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-[#00cc00] focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Close promotional popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080808]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00cc00]/90 via-[#8cff7f]/80 to-[#00cc00]/90" />

              <div className="flex flex-col gap-6 p-5 sm:p-6 lg:p-8">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <div className="space-y-4 text-center lg:text-left">
                    <span className="inline-flex rounded-full bg-[#00cc00]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#00ff00]/90 shadow-[0_0_20px_rgba(0,204,0,0.16)]">
                      Exclusive drop
                    </span>
                    <h2 className="font-display text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                      Power up your stream with premium esports branding.
                    </h2>
                    <p className="text-sm leading-7 text-white/70 sm:text-base">
                      A limited-time offer for creators who want next-level visuals, a neon-ready layout, and custom channel assets that feel cinematic.
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/80 p-2 shadow-[inset_0_0_18px_rgba(0,204,0,0.1)]">
                    <img
                      src={imageSrc}
                      alt="Promotional offer"
                      className="h-full w-full min-h-[220px] rounded-[20px] object-cover transition duration-500 hover:scale-[1.01]"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="btn-neon w-full rounded-[18px] px-5 py-3 text-sm sm:text-base"
                  >
                    Claim the offer
                  </button>
                  <button
                    type="button"
                    onClick={closePopup}
                    className="btn-outline-neon w-full rounded-[18px] px-5 py-3 text-sm sm:text-base"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
