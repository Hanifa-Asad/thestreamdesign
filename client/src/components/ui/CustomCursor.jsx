import { useEffect, useRef, useState } from 'react'

// ── Custom pointer image cursor ────────────────────────────────────────
// Uses a local public asset for the pointer image so the cursor loads reliably.
// Replace client/public/cursor.png with your custom pointer file.
const CURSOR_IMAGE_URL = '/cursor.png'
const CURSOR_SIZE = 46

export default function CustomCursor() {
  const cursorRef  = useRef(null)
  const ringRef    = useRef(null)
  const mouse      = useRef({ x: -200, y: -200 })
  const lagged     = useRef({ x: -200, y: -200 })
  const raf        = useRef(null)
  const hoveredRef = useRef(false)
  const [hovered, setHovered]  = useState(false)
  const [visible, setVisible]  = useState(false)
  const [isTouch, setIsTouch]  = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer:coarse)').matches) { setIsTouch(true); return }

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }
    const onOver = (e) => {
      if (e.target.closest('a,button,[role="button"],input,select,textarea')) {
        hoveredRef.current = true; setHovered(true)
      }
    }
    const onOut = (e) => {
      if (!e.relatedTarget?.closest('a,button,[role="button"],input,select,textarea')) {
        hoveredRef.current = false; setHovered(false)
      }
    }

    const tick = () => {
      const elapsed = performance.now() / 700
      const floatX = Math.sin(elapsed) * 1.2
      const floatY = Math.cos(elapsed * 1.1) * 1.4
      const twist  = hoveredRef.current ? 3 : 0

      lagged.current.x += (mouse.current.x - lagged.current.x) * 0.12
      lagged.current.y += (mouse.current.y - lagged.current.y) * 0.12
      const ringR = hoveredRef.current ? 22 : 16

      if (cursorRef.current) {
        const pointerX = mouse.current.x - CURSOR_SIZE / 2 + floatX
        const pointerY = mouse.current.y + floatY
        cursorRef.current.style.transform = `translate3d(${pointerX}px,${pointerY}px,0) rotate(${twist + Math.sin(elapsed * 1.3) * 2}deg)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${lagged.current.x - ringR}px,${lagged.current.y - ringR}px,0)`
      }

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    document.documentElement.style.cursor = 'none'

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    return () => {
      document.documentElement.style.cursor = ''
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [visible])

  if (isTouch) return null

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99999, pointerEvents: 'none', willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          backgroundImage: `url("${CURSOR_IMAGE_URL}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'none',
        }}
      />

      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99998, pointerEvents: 'none', willChange: 'transform',
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
    </>
  )
}
