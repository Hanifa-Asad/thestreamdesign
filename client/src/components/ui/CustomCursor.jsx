import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef     = useRef(null)
  const ringRef    = useRef(null)
  const mouse      = useRef({ x: -300, y: -300 })
  const lagged     = useRef({ x: -300, y: -300 })
  const raf        = useRef(null)
  const hoveredRef = useRef(false)
  const [hovered,  setHovered]  = useState(false)
  const [pressed,  setPressed]  = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [isTouch,  setIsTouch]  = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer:coarse)').matches) { setIsTouch(true); return }

    const onMove  = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; if (!visible) setVisible(true) }
    const onDown  = () => setPressed(true)
    const onUp    = () => setPressed(false)
    const onOver  = (e) => {
      if (e.target.closest('a,button,[role="button"],input,select,textarea,label')) {
        hoveredRef.current = true; setHovered(true)
      }
    }
    const onOut = (e) => {
      if (!e.relatedTarget?.closest('a,button,[role="button"],input,select,textarea,label')) {
        hoveredRef.current = false; setHovered(false)
      }
    }

    const tick = () => {
      // lerp ring toward dot
      lagged.current.x += (mouse.current.x - lagged.current.x) * 0.14
      lagged.current.y += (mouse.current.y - lagged.current.y) * 0.14
      const h = hoveredRef.current
      const r = h ? 30 : 20   // ring offset = half of ring size
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 5}px,${mouse.current.y - 5}px,0)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${lagged.current.x - r}px,${lagged.current.y - r}px,0)`
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    document.documentElement.style.cursor = 'none'

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout',  onOut)

    return () => {
      document.documentElement.style.cursor = ''
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout',  onOut)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Inner neon dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99999, pointerEvents: 'none', willChange: 'transform',
          opacity: visible ? 1 : 0,
          width: pressed ? 5 : 10,
          height: pressed ? 5 : 10,
          borderRadius: '50%',
          background: '#2cff05',
          transition: 'width 0.1s, height 0.1s, opacity 0.3s',
          boxShadow: '0 0 8px 2px rgba(44,255,5,1), 0 0 22px 4px rgba(44,255,5,0.45)',
        }}
      />

      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99998, pointerEvents: 'none', willChange: 'transform',
          opacity: visible ? 1 : 0,
          width:  hovered ? 60 : 40,
          height: hovered ? 60 : 40,
          borderRadius: '50%',
          border: `1.5px solid rgba(44,255,5,${hovered ? 0.85 : 0.4})`,
          background: hovered ? 'rgba(44,255,5,0.07)' : 'transparent',
          transition: 'width 0.22s ease, height 0.22s ease, border-color 0.22s, background 0.22s, opacity 0.3s',
          boxShadow: hovered
            ? '0 0 18px rgba(44,255,5,0.4), inset 0 0 12px rgba(44,255,5,0.08)'
            : '0 0 6px rgba(44,255,5,0.12)',
        }}
      />
    </>
  )
}
