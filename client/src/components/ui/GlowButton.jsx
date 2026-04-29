import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function GlowButton({
  children, variant = 'solid', as = 'button',
  to, href, className = '', icon, iconRight,
  size = 'md', disabled = false, onClick, type, ...props
}) {
  const pad = { sm: 'px-5 py-2 text-xs', md: 'px-8 py-3 text-sm', lg: 'px-10 py-4 text-base' }

  const base = `inline-flex items-center justify-center gap-2 font-display font-black
                tracking-[0.18em] uppercase transition-none select-none
                ${pad[size]} ${className}
                ${disabled ? 'opacity-40 pointer-events-none' : ''}`

  // Solid
  const solidStyle = {
    background: '#00cc00', color: '#000',
    clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
    boxShadow: '0 0 16px rgba(44,255,5,0.5)',
  }
  const solidHover = {
    scale: 1.04,
    boxShadow: '0 0 32px rgba(44,255,5,0.85), 0 0 70px rgba(44,255,5,0.3)',
    y: -2,
  }

  // Outline
  const outlineStyle = {
    background: 'transparent', color: '#00cc00',
    border: '1px solid rgba(44,255,5,0.65)',
    clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
    boxShadow: '0 0 8px rgba(44,255,5,0.12)',
  }
  const outlineHover = {
    scale: 1.04,
    boxShadow: '0 0 22px rgba(44,255,5,0.55)',
    background: 'rgba(44,255,5,0.08)',
    y: -2,
  }

  // Ghost
  const ghostHover = { scale: 1.02, x: 2 }

  const tap = { scale: 0.96, y: 0 }

  const inner = (
    <>
      {icon      && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  )

  if (variant === 'ghost') {
    const El = as === 'link' ? Link : as === 'a' ? 'a' : 'button'
    const isExternal = href ? /^https?:\/\//.test(href) : false
    const ep = El === Link
      ? { to }
      : El === 'a'
        ? { href, target: isExternal ? '_blank' : undefined, rel: isExternal ? 'noopener noreferrer' : undefined }
        : { type, onClick }
    return (
      <motion.div whileHover={ghostHover} whileTap={tap} className="inline-block">
        <El className={`${base} text-neon-green hover:text-white`} {...ep} {...props}>{inner}</El>
      </motion.div>
    )
  }

  const isSolid = variant === 'solid'
  const style   = isSolid ? solidStyle   : outlineStyle
  const hover   = isSolid ? solidHover   : outlineHover
  const cls     = `${base} ${isSolid ? 'text-black' : 'text-neon-green'}`

  if (as === 'link' && to) {
    return (
      <motion.div whileHover={hover} whileTap={tap} style={style} className="inline-block">
        <Link to={to} className={cls} {...props}>{inner}</Link>
      </motion.div>
    )
  }
  if (as === 'a' && href) {
    const isExternal = /^https?:\/\//.test(href)
    const anchorProps = {
      href,
      target: isExternal ? '_blank' : undefined,
      rel: isExternal ? 'noopener noreferrer' : undefined,
    }
    return (
      <motion.div whileHover={hover} whileTap={tap} style={style} className="inline-block">
        <a {...anchorProps} className={cls} {...props}>{inner}</a>
      </motion.div>
    )
  }
  return (
    <motion.button
      whileHover={hover} whileTap={tap}
      style={style} className={cls}
      onClick={onClick} disabled={disabled} type={type || 'button'}
      {...props}
    >
      {inner}
    </motion.button>
  )
}
