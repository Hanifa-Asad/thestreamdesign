import { motion } from 'framer-motion'
import { useScrollAnimation } from '@hooks/useScrollAnimation'

export default function SectionWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',   // 'up' | 'left' | 'right' | 'none'
  id,
}) {
  const { ref, inView } = useScrollAnimation(0.1)

  const variants = {
    up:    { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
    none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  }

  return (
    <motion.div
      id={id}
      ref={ref}
      variants={variants[direction]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
