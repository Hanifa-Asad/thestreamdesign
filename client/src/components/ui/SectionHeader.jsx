import SectionWrapper from './SectionWrapper'

export default function SectionHeader({ label, title, titleHighlight, subtitle, center = true }) {
  return (
    <SectionWrapper className={`mb-14 ${center ? 'text-center' : ''}`}>
      {label && (
        <span className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-3">
          // {label}
        </span>
      )}
      <h2 className="section-title mb-4">
        {title}{' '}
        {titleHighlight && <span className="text-neon-green">{titleHighlight}</span>}
      </h2>
      {subtitle && (
        <p className={`font-body text-white/50 text-lg leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px w-24 bg-gradient-to-r from-neon-green to-transparent ${center ? 'mx-auto' : ''}`} />
    </SectionWrapper>
  )
}
