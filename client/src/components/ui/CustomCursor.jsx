import { useEffect, useRef, useState } from 'react'

// ── Minecraft pixel sword cursor ────────────────────────────────────────────
// SVG encoded as a data URI — no external image needed, works offline.
// The sword is pixel-art style, 24×24 units, rendered at 28px for sharpness.
// It's rotated 45° (tip top-right) which is the classic Minecraft sword stance.
const SWORD_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges">
  <!-- blade -->
  <rect x="14" y="0"  width="2" height="2" fill="#e0e0e0"/>
  <rect x="12" y="2"  width="2" height="2" fill="#e0e0e0"/>
  <rect x="10" y="4"  width="2" height="2" fill="#e0e0e0"/>
  <rect x="8"  y="6"  width="2" height="2" fill="#e0e0e0"/>
  <rect x="6"  y="8"  width="2" height="2" fill="#e0e0e0"/>
  <rect x="4"  y="10" width="2" height="2" fill="#e0e0e0"/>
  <!-- blade shine -->
  <rect x="15" y="1"  width="1" height="1" fill="#ffffff"/>
  <rect x="13" y="3"  width="1" height="1" fill="#ffffff"/>
  <rect x="11" y="5"  width="1" height="1" fill="#ffffff"/>
  <!-- blade shadow -->
  <rect x="13" y="1"  width="1" height="1" fill="#b0b0b0"/>
  <rect x="11" y="3"  width="1" height="1" fill="#b0b0b0"/>
  <rect x="9"  y="5"  width="1" height="1" fill="#b0b0b0"/>
  <!-- guard -->
  <rect x="2"  y="10" width="2" height="2" fill="#8B6914"/>
  <rect x="4"  y="8"  width="2" height="2" fill="#8B6914"/>
  <rect x="4"  y="12" width="2" height="2" fill="#8B6914"/>
  <rect x="6"  y="10" width="2" height="2" fill="#6B4F10"/>
  <!-- handle -->
  <rect x="2"  y="12" width="2" height="2" fill="#7B3F00"/>
  <rect x="0"  y="14" width="2" height="2" fill="#7B3F00"/>
  <rect x="2"  y="14" width="2" height="2" fill="#5C2E00"/>
  <!-- pommel -->
  <rect x="0"  y="16" width="2" height="2" fill="#8B6914"/>
  <!-- neon glow accent on blade tip -->
  <rect x="14" y="0"  width="2" height="2" fill="#39FF14" opacity="0.5"/>
</svg>
`

const SWORD_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SWORD_SVG)}`

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
      // Ring lerps behind sword
      lagged.current.x += (mouse.current.x - lagged.current.x) * 0.12
      lagged.current.y += (mouse.current.y - lagged.current.y) * 0.12
      const h = hoveredRef.current
      const ringR = h ? 22 : 16

      if (cursorRef.current)
        // Offset so sword tip = cursor hotspot (top-left of SVG)
        cursorRef.current.style.transform = `translate3d(${mouse.current.x - 2}px,${mouse.current.y - 2}px,0)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${lagged.current.x - ringR}px,${lagged.current.y - ringR}px,0)`

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
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Pixel sword cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99999, pointerEvents: 'none', willChange: 'transform',
          opacity: visible ? 1 : 0, transition: 'opacity 0.3s',
          width: 28, height: 28,
          backgroundImage: `url("${SWORD_DATA_URI}")`,
          backgroundSize: '28px 28px',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          filter: hovered
            ? 'drop-shadow(0 0 6px rgba(57,255,20,0.9)) drop-shadow(0 0 12px rgba(57,255,20,0.5)) brightness(1.2)'
            : 'drop-shadow(0 0 4px rgba(57,255,20,0.5)) drop-shadow(0 0 8px rgba(57,255,20,0.2))',
          transition: 'filter 0.2s, opacity 0.3s',
        }}
      />

      {/* Subtle neon ring that lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99998, pointerEvents: 'none', willChange: 'transform',
          opacity: visible ? (hovered ? 0.7 : 0.35) : 0,
          width: hovered ? 44 : 32,
          height: hovered ? 44 : 32,
          borderRadius: '50%',
          border: `1px solid rgba(57,255,20,${hovered ? 0.8 : 0.4})`,
          background: hovered ? 'rgba(57,255,20,0.05)' : 'transparent',
          transition: 'width 0.2s, height 0.2s, opacity 0.25s, border-color 0.2s',
          boxShadow: hovered ? '0 0 12px rgba(57,255,20,0.3)' : 'none',
        }}
      />
    </>
  )
}
