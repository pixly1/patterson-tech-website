import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const IMG_FILL = 0.82 // logo occupies 82% of the SVG square

// Exact positions measured from the real logo PNG (2000×2000px)
// fx/fy = fraction of SVG size after the 82%-fill centering
const NODES = [
  { id: 'lead-generation', label: 'Lead Generation', anchor: '#lead-generation', fx: 0.513, fy: 0.165 },
  { id: 'branding',        label: 'Branding',        anchor: '#branding',        fx: 0.204, fy: 0.283 },
  { id: 'website',         label: 'Website',         anchor: '#website',         fx: 0.176, fy: 0.566 },
  { id: 'automation',      label: 'Automation',      anchor: '#automation',      fx: 0.449, fy: 0.807 },
  { id: 'media',           label: 'Media',           anchor: '#media',           fx: 0.752, fy: 0.630 },
  { id: 'advertisement',   label: 'Advertisement',   anchor: '#advertisement',   fx: 0.814, fy: 0.440 },
]

const SEAFOAM = '#00FFA3'
const SEAFOAM_DIM = 'rgba(0, 255, 163, 0.18)'
const CENTER_DEPTH = 0.25
const NODE_DEPTH   = 0.55


export default function LogoNav({ logoSrc }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState(700)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hoveredId, setHoveredId] = useState(null)
  const [magnetOffsets, setMagnetOffsets] = useState({})

  // Smooth mouse spring for parallax
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const smX = useSpring(rawX, { stiffness: 55, damping: 22 })
  const smY = useSpring(rawY, { stiffness: 55, damping: 22 })

  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) setSize(Math.min(e.contentRect.width, 820))
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
      rawX.set(nx)
      rawY.set(ny)
      setMouse({ x: nx, y: ny })

      // Magnetic pull for each node
      const offsets = {}
      NODES.forEach((node) => {
        const baseX = node.fx * size
        const baseY = node.fy * size
        const dx = e.clientX - (rect.left + baseX)
        const dy = e.clientY - (rect.top  + baseY)
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = size * 0.12
        if (dist < maxDist) {
          const pull = (1 - dist / maxDist) * 0.35
          offsets[node.id] = { x: dx * pull, y: dy * pull }
        } else {
          offsets[node.id] = { x: 0, y: 0 }
        }
      })
      setMagnetOffsets(offsets)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [size, rawX, rawY])

  const scrollTo = useCallback((anchor) => {
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Zoom-toward-hover: nudge the whole SVG slightly toward the hovered node
  const hoveredNode = NODES.find((n) => n.id === hoveredId)
  const zoomX = hoveredNode ? (hoveredNode.fx - 0.5) * 28 : 0
  const zoomY = hoveredNode ? (hoveredNode.fy - 0.5) * 28 : 0
  const zoomScale = hoveredId ? 1.055 : 1

  // Logo image bounds
  const logoOffset = size * (0.5 - IMG_FILL / 2)
  const logoSize   = size * IMG_FILL
  const cx = size / 2
  const cy = size / 2

  // Logo parallax (center layer)
  const logoX = mouse.x * CENTER_DEPTH * size * 0.04
  const logoY = mouse.y * CENTER_DEPTH * size * 0.04

  return (
    <div ref={containerRef} className="relative w-full max-w-[820px] mx-auto select-none">
      <motion.div
        animate={{
          x: -zoomX,
          y: -zoomY,
          scale: zoomScale,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 28 }}
        style={{ transformOrigin: hoveredNode ? `${hoveredNode.fx * 100}% ${hoveredNode.fy * 100}%` : 'center' }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-auto overflow-visible"
        >
          {/* Logo PNG — mix-blend-mode:screen makes the dark fills invisible on black bg */}
          <image
            href={logoSrc}
            x={logoOffset + logoX}
            y={logoOffset + logoY}
            width={logoSize}
            height={logoSize}
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Interactive nodes — positioned exactly on the real logo dots */}
          {NODES.map((node) => {
            const baseX  = node.fx * size
            const baseY  = node.fy * size
            const mag    = magnetOffsets[node.id] ?? { x: 0, y: 0 }
            const isHov  = hoveredId === node.id

            // Node layer moves more than logo layer (creates 3D depth separation)
            const px = mouse.x * NODE_DEPTH * size * 0.04 + mag.x
            const py = mouse.y * NODE_DEPTH * size * 0.04 + mag.y

            const nx = baseX + px
            const ny = baseY + py

            return (
              <g
                key={node.id}
                transform={`translate(${nx}, ${ny})`}
                onClick={() => scrollTo(node.anchor)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Seafoam glow halo */}
                <circle
                  r={isHov ? 26 : 0}
                  fill={SEAFOAM_DIM}
                  style={{ transition: 'r 0.35s ease' }}
                />
                {/* Outer ring */}
                <circle
                  r={isHov ? 14 : 9}
                  fill="none"
                  stroke={isHov ? SEAFOAM : 'rgba(255,255,255,0.3)'}
                  strokeWidth="1.2"
                  style={{ transition: 'r 0.3s ease, stroke 0.3s ease' }}
                />
                {/* Inner dot */}
                <circle
                  r={isHov ? 7 : 4.5}
                  fill={isHov ? SEAFOAM : 'rgba(255,255,255,0.65)'}
                  style={{ transition: 'r 0.3s ease, fill 0.3s ease' }}
                />
                {/* No labels — dots only */}
              </g>
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}
