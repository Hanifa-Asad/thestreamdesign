import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ service, index = 0 }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      className="group relative h-full rounded-xl overflow-hidden cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
      }}
      onHoverStart={e => {}}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(44,255,5,0.45)'
        e.currentTarget.style.background  = 'rgba(44,255,5,0.04)'
        e.currentTarget.style.boxShadow   = '0 16px 48px rgba(44,255,5,0.12), 0 0 0 1px rgba(44,255,5,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.background  = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* Animated scan line on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(44,255,5,0.5),transparent)' }}
          animate={{ top: ['-2%', '102%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
      </div>

      {/* Corner bracket top-left */}
      <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none"
        style={{ borderTop: '2px solid rgba(44,255,5,0)', borderLeft: '2px solid rgba(44,255,5,0)', transition: 'border-color 0.3s 0.05s' }}
        ref={el => el && el.closest('.group:hover') && (el.style.borderColor = 'rgba(44,255,5,0.7)')}
      />
      {/* Corner bracket bottom-right */}
      <div className="absolute bottom-3 right-3 w-4 h-4 pointer-events-none"
        style={{ borderBottom: '2px solid rgba(44,255,5,0)', borderRight: '2px solid rgba(44,255,5,0)', transition: 'border-color 0.3s 0.05s' }}
      />

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Icon box */}
        <div className="relative w-12 h-12 rounded-xl mb-5 flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(44,255,5,0.08)', border: '1px solid rgba(44,255,5,0.15)' }}>
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(44,255,5,0.15)', boxShadow: '0 0 18px rgba(44,255,5,0.35)' }} />
          <Icon
            size={22}
            className="text-neon-green relative z-10 transition-transform duration-300 group-hover:scale-110"
            style={{ filter: 'drop-shadow(0 0 6px rgba(44,255,5,0.6))' }}
          />
        </div>

        <h3 className="font-display font-bold text-sm text-white tracking-wide uppercase mb-2">
          {service.title}
        </h3>
        <p className="font-body text-white/45 text-sm leading-relaxed flex-1 mb-5">
          {service.description}
        </p>

        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-widest uppercase text-neon-green/55 group-hover:text-neon-green transition-colors duration-200"
        >
          View Details
          <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-250" />
        </Link>
      </div>
    </motion.div>
  )
}
