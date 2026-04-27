import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useScrollAnimation } from '@hooks/useScrollAnimation'
import GlowButton from '@components/ui/GlowButton'
import { SOCIAL_LINKS } from '@utils/emailConfig'

export default function CTASection({
  label = '// Ready to Level Up Your Brand?',
  heading = 'Ready to Level Up Your Brand?',
  body = 'Stop blending in. Start standing out.',
  primaryText = 'Start Your Project',
  primaryLink = '/contact',
  secondaryText = 'Book Free Consultation',
  secondaryHref = 'mailto:info@thestreamingdesign.com',
}) {
  const { ref, inView } = useScrollAnimation(0.2)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gaming character silhouette in background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/2 -right-40 -translate-y-1/2 w-96 h-96 pointer-events-none hidden lg:block"
      >
        <img 
          src="/characters/gaming-character-2.svg" 
          alt=""
          className="w-full h-full object-contain opacity-20"
          style={{ filter: 'drop-shadow(0 0 15px rgba(57,255,20,0.15))' }}
        />
      </motion.div>

      {/* BG glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[400px] rounded-full
                      bg-neon-green/5 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Label */}
          <span className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-5">
            // Ready to Level Up Your Brand?
          </span>

          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {heading}
          </h2>

          <p className="font-body text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {body}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <GlowButton as="link" to={primaryLink} size="lg" iconRight={<ArrowRight size={18} />}>
              {primaryText}
            </GlowButton>
            {secondaryText && (
              <GlowButton
                as="a"
                href={secondaryHref}
                variant="outline"
                size="lg"
                icon={<MessageCircle size={16} />}
              >
                {secondaryText}
              </GlowButton>
            )}
          </div>

          {/* Trust line */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6
                          font-mono text-white/30 text-xs">
            {['No upfront payment', '24–48h response time', 'Satisfaction guaranteed'].map(t => (
              <span key={t} className="flex items-center gap-2">
                <span className="text-neon-green">✓</span> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
