import { useEffect, useRef } from 'react'
import { useMotionValue, useVelocity, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SceneLeadGen     from './galaxy/SceneLeadGen'
import SceneWebsite     from './galaxy/SceneWebsite'
import SceneBranding    from './galaxy/SceneBranding'
import SceneMedia       from './galaxy/SceneMedia'
import SceneAutomation  from './galaxy/SceneAutomation'
import SceneAdvertising from './galaxy/SceneAdvertising'

const SF = '#00FFA3'

const NODES = [
  { id: 'lead-generation', fx: 0.513, fy: 0.165 },
  { id: 'branding',        fx: 0.204, fy: 0.283 },
  { id: 'website',         fx: 0.176, fy: 0.566 },
  { id: 'automation',      fx: 0.449, fy: 0.807 },
  { id: 'media',           fx: 0.752, fy: 0.630 },
  { id: 'advertisement',   fx: 0.814, fy: 0.440 },
]

const P = {
  LAND_END: 0.12, DESC_END: 0.22,
  L1S: 0.22, L1E: 0.37,
  L2S: 0.37, L2E: 0.50,
  L3S: 0.50, L3E: 0.62,
  L4S: 0.62, L4E: 0.73,
  L5S: 0.73, L5E: 0.83,
  L6S: 0.83, L6E: 0.93,
  SS:  0.93, SE:  1.00,
}

const lerp       = (a, b, t)         => a + (b - a) * t
const clamp      = (v, lo, hi)       => Math.max(lo, Math.min(hi, v))
const smoothstep = (e0, e1, x)       => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t) }
const easeInOut  = (t)               => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
const nodePos    = (n, cx, cy, size) => ({ x: cx + (n.fx - 0.5) * size, y: cy + (n.fy - 0.5) * size })

// ─── Particle / dot factories ──────────────────────────────────────────────

function makeRingDots() {
  // Modeled after the actual logo mark: 3 clean concentric rings, evenly spaced
  const dots = []

  // Outer ring: 40 evenly-spaced dots (largest, most spread)
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2
    dots.push({
      baseAngle: a,
      baseRadius: 155 + (Math.random() - 0.5) * 10,
      size: 1.7 + Math.random() * 0.9,
      baseAlpha: 0.52 + Math.random() * 0.32,
      pulseOffset: Math.random() * Math.PI * 2,
      driftAngle: a,
      driftSpeed: 0.45 + Math.random() * 0.65,
    })
  }

  // Middle ring: 28 dots, offset by half step so they don't line up with outer
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2 + Math.PI / 28
    dots.push({
      baseAngle: a,
      baseRadius: 105 + (Math.random() - 0.5) * 9,
      size: 1.3 + Math.random() * 0.8,
      baseAlpha: 0.44 + Math.random() * 0.28,
      pulseOffset: Math.random() * Math.PI * 2,
      driftAngle: a,
      driftSpeed: 0.5 + Math.random() * 0.65,
    })
  }

  // Inner ring: 18 dots
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2
    dots.push({
      baseAngle: a,
      baseRadius: 64 + (Math.random() - 0.5) * 8,
      size: 1.0 + Math.random() * 0.7,
      baseAlpha: 0.36 + Math.random() * 0.26,
      pulseOffset: Math.random() * Math.PI * 2,
      driftAngle: a,
      driftSpeed: 0.55 + Math.random() * 0.6,
    })
  }

  // Center cluster: 14 small dots
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2
    dots.push({
      baseAngle: a,
      baseRadius: Math.random() * 30,
      size: 0.75 + Math.random() * 0.55,
      baseAlpha: 0.26 + Math.random() * 0.22,
      pulseOffset: Math.random() * Math.PI * 2,
      driftAngle: a,
      driftSpeed: 0.65 + Math.random() * 0.6,
    })
  }

  return dots
}

function makeStars(w, h) {
  return Array.from({ length: 130 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    size: 0.3 + Math.random() * 0.8,
    baseAlpha: 0.18 + Math.random() * 0.48,
    twinkleOffset: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.45 + Math.random() * 1.1,
  }))
}

function makeOrbiters(w, h) {
  const hm = Math.min(w, h) / 2
  return Array.from({ length: 26 }, () => {
    const cw = Math.random() < 0.5 ? 1 : -1
    return {
      angle: Math.random() * Math.PI * 2,
      speed: cw * (0.04 + Math.random() * 0.06),
      rx: hm * (0.54 + Math.random() * 0.26),
      ry: hm * (0.51 + Math.random() * 0.26),
      size: 1.1 + Math.random() * 1.6,
      pulseOffset: Math.random() * Math.PI * 2,
      baseAlpha: 0.35 + Math.random() * 0.45,
    }
  })
}

function makeFlow() {
  return Array.from({ length: 72 }, () => ({
    angle: Math.random() * Math.PI * 2,
    cycleOffset: Math.random(),
    speed: 0.09 + Math.random() * 0.13,
    size: 0.7 + Math.random() * 1.5,
    startR: 0.025 + Math.random() * 0.045,
  }))
}

function makeParticles(w, h) {
  return Array.from({ length: 320 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.4 + 0.3,
    opacity: Math.random() * 0.2 + 0.05,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.5 + 0.3,
  }))
}

function makeAutoPaths(w, h) {
  const cx = w / 2, cy = h / 2
  return Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2
    const sx = cx + Math.cos(a) * w * 0.42, sy = cy + Math.sin(a) * h * 0.42
    const pts = [{ x: sx, y: sy }]
    for (let s = 1; s <= 5; s++) {
      const f = s / 5
      pts.push({ x: lerp(sx, cx, f) + (Math.random() - 0.5) * 90, y: lerp(sy, cy, f) + (Math.random() - 0.5) * 90 })
    }
    return pts
  })
}

// ─── Component ────────────────────────────────────────────────────────────

export default function GalaxyHero() {
  const spacerRef   = useRef(null)
  const canvasRef   = useRef(null)
  const progressRef = useRef(0)
  const velocityRef = useRef(0)
  const mouseRef    = useRef({ x: -9999, y: -9999 })
  const stateRef    = useRef({
    ringDots: [], stars: [], orbiters: [], flow: [],
    particles: [], autoPaths: [], pulseRings: [],
    flowTime: 0, lastPulse: 0, t: 0,
  })

  // MotionValue passed to scene components + velocity for flow particles
  const progressMV = useMotionValue(0)
  const rawVelocity = useVelocity(progressMV)
  const smoothVelocity = useSpring(rawVelocity, { damping: 40, stiffness: 280, mass: 0.5 })

  useEffect(() => {
    const unsub = smoothVelocity.on('change', (v) => { velocityRef.current = Math.abs(v) })
    return unsub
  }, [smoothVelocity])

  // ─── Scroll tracking ────────────────────────────────────────────────────
  useEffect(() => {
    const spacer = spacerRef.current

    function onScroll() {
      if (!spacer) return
      const rect  = spacer.getBoundingClientRect()
      const total = spacer.offsetHeight - window.innerHeight
      if (total <= 0) return
      const sp = clamp(-rect.top / total, 0, 1)
      progressRef.current = sp
      progressMV.set(sp)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const st = ScrollTrigger.create({
      trigger: spacer, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => { progressRef.current = self.progress; progressMV.set(self.progress) },
    })

    return () => { window.removeEventListener('scroll', onScroll); st.kill() }
  }, [progressMV])

  // ─── Canvas ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const S      = stateRef.current

    document.fonts.load('700 48px "Barlow Condensed"').catch(() => {})

    S.ringDots = makeRingDots()
    S.flow     = makeFlow()

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      S.stars     = makeStars(canvas.width, canvas.height)
      S.orbiters  = makeOrbiters(canvas.width, canvas.height)
      S.particles = makeParticles(canvas.width, canvas.height)
      S.autoPaths = makeAutoPaths(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } })

    let rafId
    function draw(ts) {
      rafId = requestAnimationFrame(draw)
      const dt  = Math.min((ts - S.t) / 1000, 0.05)
      S.t = ts
      const t   = ts / 1000
      const sp  = progressRef.current
      const vel = velocityRef.current
      const w   = canvas.width, h = canvas.height
      const cx  = w / 2, cy = h / 2
      const mx  = mouseRef.current.x, my = mouseRef.current.y
      const sc  = Math.min(w, h) / 800
      const size = Math.min(w * 0.88, h * 0.88, 820)

      // Phase calculations
      const zoomT     = clamp(sp / 0.18, 0, 1)
      const ez        = zoomT * zoomT
      const ringFade  = clamp((sp - 0.12) / 0.08, 0, 1)
      const ringA     = 1 - ringFade
      const orbA      = clamp((sp - 0.08) / 0.14, 0, 1)
      const flowA     = clamp((sp - 0.18) / 0.12, 0, 1)
      const singFade  = 1 - smoothstep(P.SS, P.SE - 0.02, sp)

      const flowRate  = 0.15 + Math.min(0.85, vel * 1.4)
      S.flowTime += dt * flowRate
      S.orbiters.forEach((o) => { o.angle += o.speed * dt })

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#050508'
      ctx.fillRect(0, 0, w, h)

      const inLand = sp < P.DESC_END
      const inL1   = sp >= P.L1S && sp < P.L2S
      const inL2   = sp >= P.L2S && sp < P.L3S
      const inL3   = sp >= P.L3S && sp < P.L4S
      const inL4   = sp >= P.L4S && sp < P.L5S
      const inL5   = sp >= P.L5S && sp < P.L6S
      const inL6   = sp >= P.L6S && sp < P.SS
      const inSing = sp >= P.SS

      // Camera zoom on background layers
      const zoom = lerp(1, 3.0, easeInOut(smoothstep(P.LAND_END, P.L6E, sp)))
                 * lerp(1, 0.55, smoothstep(P.SS, P.SE, sp))
      ctx.save()
      ctx.translate(cx, cy); ctx.scale(zoom, zoom); ctx.translate(-cx, -cy)

      // ── Stars ──────────────────────────────────────────────────────────
      S.stars.forEach((s) => {
        const tw = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset)) * singFade
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232,234,240,${tw.toFixed(3)})`
        ctx.fill()
      })

      // ── Ambient layer particles ─────────────────────────────────────────
      S.particles.forEach((p, i) => {
        if (inLand) {
          p.vx += (mx - p.x) * 0.000009; p.vy += (my - p.y) * 0.000009
          p.vx *= 0.982; p.vy *= 0.982
          p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h
          const tw = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase)
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${(p.opacity * tw * 0.55).toFixed(3)})`; ctx.fill()

        } else if (inL1) {
          const org = smoothstep(P.L1S + 0.02, P.L1E - 0.04, sp)
          const angle = Math.atan2(p.y - cy, p.x - cx)
          const dist  = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2)
          p.x = lerp(p.x, cx + Math.cos(angle) * dist * (1 - org) * 0.15, 0.035 + org * 0.025)
          p.y = lerp(p.y, cy + Math.sin(angle) * dist * (1 - org) * 0.15, 0.035 + org * 0.025)
          const mdx = mx - p.x, mdy = my - p.y, md = Math.sqrt(mdx*mdx+mdy*mdy)
          if (md < 80) { p.x += mdx*(1-md/80)*0.006; p.y += mdy*(1-md/80)*0.006 }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * lerp(1, 1.5, org), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${lerp(0.07, 0.38, org).toFixed(3)})`; ctx.fill()

        } else if (inL2) {
          const cols = 14, rows = Math.ceil(320 / cols)
          const col = i % cols, row = Math.floor(i / cols) % rows
          const snap = smoothstep(P.L2S + 0.02, P.L2E - 0.03, sp)
          p.x = lerp(p.x, lerp(w * 0.22, w * 0.78, col / (cols - 1)), 0.05 * snap + 0.007)
          p.y = lerp(p.y, lerp(h * 0.22, h * 0.78, row / (rows - 1)), 0.05 * snap + 0.007)
          const tw = 0.4 + 0.6 * Math.sin(t * 1.1 + p.phase)
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.5 + snap * 0.55), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${((0.05 + snap * 0.24) * tw).toFixed(3)})`; ctx.fill()

        } else if (inL3) {
          const sync = smoothstep(P.L3S + 0.04, P.L3E, sp)
          const r0 = 80+(i*37)%175, g0 = 60+(i*53)%160, b0 = 100+(i*29)%155
          p.x += Math.sin(t * p.speed + p.phase) * 0.3 * (1 - sync)
          p.y += Math.cos(t * p.speed * 0.7 + p.phase) * 0.3 * (1 - sync)
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + 0.2 * (1 - sync)), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${Math.round(lerp(r0,0,sync))},${Math.round(lerp(g0,255,sync))},${Math.round(lerp(b0,163,sync))},${(0.1+sync*0.28).toFixed(3)})`; ctx.fill()

        } else if (inL4) {
          const expand = smoothstep(P.L4S, P.L4E, sp)
          const np = nodePos(NODES[i % NODES.length], cx, cy, size)
          const orbitR = (28 + (i % 28) * 3.1) * expand, orbitSpd = 0.2 + (i % 7) * 0.06
          p.x = lerp(p.x, np.x + Math.cos(t * orbitSpd + p.phase) * orbitR, 0.05)
          p.y = lerp(p.y, np.y + Math.sin(t * orbitSpd + p.phase) * orbitR, 0.05)
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,255,163,${(0.18 * expand).toFixed(3)})`; ctx.fill()

        } else if (inL5) {
          const path = S.autoPaths[i % S.autoPaths.length]
          const tOff = ((t * 0.28 + p.phase) % 1)
          const seg  = Math.floor(tOff * (path.length - 1))
          const frac = tOff * (path.length - 1) - seg
          if (seg < path.length - 1) {
            p.x = lerp(path[seg].x, path[seg+1].x, frac)
            p.y = lerp(path[seg].y, path[seg+1].y, frac)
          }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.fill()

        } else if (inL6 || inSing) {
          const conv = inSing
            ? smoothstep(P.SS, P.SE - 0.02, sp)
            : smoothstep(P.L6S + 0.05, P.L6E, sp) * 0.45
          p.x = lerp(p.x, cx + Math.cos(p.phase) * 14 * (1 - conv), 0.04 + conv * 0.1)
          p.y = lerp(p.y, cy + Math.sin(p.phase) * 14 * (1 - conv), 0.04 + conv * 0.1)
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * lerp(1.2, 0.18, conv), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,255,163,${(inSing ? lerp(0.4,0,conv) : 0.2+conv*0.2).toFixed(3)})`; ctx.fill()
        }
      })

      // Automation path lines
      if (inL5) {
        const la = smoothstep(P.L5S, P.L5S + 0.04, sp) * 0.07
        S.autoPaths.forEach((path) => {
          ctx.beginPath()
          path.forEach((pt, j) => j === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y))
          ctx.strokeStyle = `rgba(0,255,163,${la.toFixed(3)})`; ctx.lineWidth = 0.5; ctx.stroke()
        })
      }

      // Media pulse rings
      if (inL4) {
        if (t - S.lastPulse > 0.55) {
          const np = nodePos(NODES[Math.floor(Math.random() * NODES.length)], cx, cy, size)
          S.pulseRings.push({ x: np.x, y: np.y, r: 0, born: t, maxR: 65 + Math.random() * 95 })
          S.lastPulse = t
        }
        const pa = smoothstep(P.L4S, P.L4S + 0.05, sp)
        S.pulseRings = S.pulseRings.filter((ring) => {
          const age = (t - ring.born) / 2.8; ring.r = age * ring.maxR
          const a = (1 - age) * pa * 0.22
          if (a <= 0.005) return false
          ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(0,255,163,${a.toFixed(3)})`; ctx.lineWidth = 0.85; ctx.stroke()
          return age < 1
        })
      } else { S.pulseRings = [] }

      // ── Flow particles ──────────────────────────────────────────────────
      if (flowA > 0.01) {
        const maxR = Math.hypot(w, h) * 0.6
        S.flow.forEach((fp) => {
          const cyc = (S.flowTime * fp.speed + fp.cycleOffset) % 1
          const r   = maxR * fp.startR + (maxR * (1 - fp.startR)) * cyc * cyc
          const x = cx + Math.cos(fp.angle) * r, y = cy + Math.sin(fp.angle) * r
          if (x < -60 || x > w + 60 || y < -60 || y > h + 60) return
          const tailLen = 10 + flowRate * 52
          const tx = x - Math.cos(fp.angle) * tailLen, ty = y - Math.sin(fp.angle) * tailLen
          const fi = Math.min(1, cyc / 0.08), fo = 1 - Math.max(0, (cyc - 0.86) / 0.14)
          const alpha = flowA * fi * fo * 0.68
          if (alpha < 0.01) return
          const grad = ctx.createLinearGradient(tx, ty, x, y)
          grad.addColorStop(0, 'rgba(100,200,255,0)')
          grad.addColorStop(1, `rgba(232,234,240,${alpha.toFixed(3)})`)
          ctx.strokeStyle = grad; ctx.lineWidth = fp.size * 0.55
          ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke()
        })
      }

      // ── Edge orbiters ───────────────────────────────────────────────────
      if (orbA > 0.01) {
        S.orbiters.forEach((o) => {
          const x = cx + Math.cos(o.angle) * o.rx, y = cy + Math.sin(o.angle) * o.ry
          if (x < -40 || x > w + 40 || y < -40 || y > h + 40) return
          const pulse = 0.66 + 0.34 * Math.sin(t * 1.3 + o.pulseOffset)
          const alpha = o.baseAlpha * orbA * pulse
          ctx.beginPath(); ctx.arc(x, y, o.size * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(232,234,240,${alpha.toFixed(3)})`; ctx.fill()
        })
      }

      ctx.restore() // end camera zoom

      // ── Ring galaxy dots (outside zoom — have own hyperspace drift) ─────
      if (ringA > 0.004) {
        const orbitAngle = t * 0.065
        S.ringDots.forEach((dot) => {
          const angle  = dot.baseAngle + orbitAngle
          const radius = dot.baseRadius * sc
          const pulse  = 0.72 + 0.28 * Math.sin(t * 1.55 + dot.pulseOffset)

          const driftMag = ez * 1220 * dot.driftSpeed
          const x = cx + Math.cos(angle) * radius + Math.cos(dot.driftAngle) * driftMag
          const y = cy + Math.sin(angle) * radius + Math.sin(dot.driftAngle) * driftMag
          if (x < -80 || x > w + 80 || y < -80 || y > h + 80) return

          const zs    = 1 + ez * 5.5
          const alpha = ringA * dot.baseAlpha * pulse

          ctx.beginPath(); ctx.arc(x, y, dot.size * pulse * zs, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(247,247,248,${alpha.toFixed(3)})`; ctx.fill()

          if (ez > 0.04) {
            const tailLen = ez * 60 * dot.driftSpeed
            ctx.beginPath(); ctx.moveTo(x, y)
            ctx.lineTo(x - Math.cos(dot.driftAngle) * tailLen, y - Math.sin(dot.driftAngle) * tailLen)
            ctx.strokeStyle = `rgba(91,168,255,${(alpha * 0.55 * ez).toFixed(3)})`
            ctx.lineWidth = dot.size * 0.48 * zs; ctx.lineCap = 'round'; ctx.stroke()
          }
        })
      }


      // ── Singularity ─────────────────────────────────────────────────────
      if (inSing) {
        const burstA = 1 - smoothstep(P.SS, P.SS + 0.04, sp)
        if (burstA > 0.01) {
          const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55)
          gr.addColorStop(0, `rgba(255,255,255,${burstA})`)
          gr.addColorStop(0.4, `rgba(0,255,163,${burstA * 0.4})`)
          gr.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill()
        }

        const textA = smoothstep(0.95, 0.99, sp)
        if (textA > 0.01) {
          const fs = Math.round(clamp(Math.min(w, h) * 0.065, 36, 76))

          // Accent line above text
          ctx.save(); ctx.globalAlpha = textA * 0.65
          const lw = fs * 4.2
          ctx.beginPath(); ctx.moveTo(cx - lw / 2, cy - fs * 1.1); ctx.lineTo(cx + lw / 2, cy - fs * 1.1)
          ctx.strokeStyle = '#00FFA3'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore()

          // Main title
          ctx.save(); ctx.globalAlpha = textA
          ctx.fillStyle = '#f7f7f8'
          ctx.font = `700 ${fs}px "Barlow Condensed", sans-serif`
          try { ctx.letterSpacing = `${Math.round(fs * 0.2)}px` } catch (_) {}
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText('PATTERSON TECH', cx, cy - fs * 0.1)
          ctx.restore()

          // Tagline — large, bold, fully visible
          const tf = Math.round(clamp(Math.min(w, h) * 0.026, 17, 26))
          ctx.save(); ctx.globalAlpha = textA * 0.92
          ctx.fillStyle = '#f7f7f8'
          ctx.font = `600 ${tf}px Barlow, sans-serif`
          try { ctx.letterSpacing = `${Math.round(tf * 0.18)}px` } catch (_) {}
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText('The Future Of Business', cx, cy + fs * 0.85)
          ctx.restore()
        }
      }

      // ── HTML overlay opacity ─────────────────────────────────────────────
      const hintEl = document.getElementById('gl-hint')
      if (hintEl) hintEl.style.opacity = 1 - smoothstep(0, 0.04, sp)

      const heroTextEl = document.getElementById('gl-hero-text')
      if (heroTextEl) heroTextEl.style.opacity = 1 - smoothstep(0.05, 0.18, sp)

      const nameEl = document.getElementById('gl-name')
      if (nameEl) nameEl.style.opacity = 1 - smoothstep(P.LAND_END, P.DESC_END, sp)

      const singEl = document.getElementById('gl-singularity')
      if (singEl) singEl.style.opacity = smoothstep(0.96, 0.99, sp)
    }

    rafId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div ref={spacerRef} style={{ position: 'relative', height: '1600vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {/* Hero headline above the dots */}
        <div
          id="gl-hero-text"
          style={{
            position: 'absolute',
            top: 82,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 2,
            width: 'min(860px, 90vw)',
          }}
        >
          <p style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
            lineHeight: 1.06,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            color: SF,
            margin: '0 0 6px',
            textShadow: '0 0 48px rgba(0,255,163,0.28)',
          }}>
            Adapt or Get Replaced:
          </p>
          <p style={{
            fontFamily: 'Barlow, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
            lineHeight: 1.5,
            color: 'rgba(247,247,248,0.55)',
            maxWidth: 820,
            margin: '0 auto',
          }}>
            We help local businesses attract customers, build authority, and stay competitive through websites, content, automation, and digital infrastructure.
          </p>
        </div>

        {/* Landing title */}
        <div
          id="gl-name"
          style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 2 }}
        >
          <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 'clamp(0.6rem, 1.1vw, 0.78rem)', letterSpacing: '0.38em', textTransform: 'uppercase', color: SF, marginBottom: 6 }}>
            Patterson Tech
          </p>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', letterSpacing: '0.15em', color: 'rgba(247,247,248,0.8)' }}>
            The Future Of Business
          </p>
        </div>

        {/* Scroll hint */}
        <div
          id="gl-hint"
          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none', zIndex: 2 }}
        >
          <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 600, fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: 0 }}>Scroll</p>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(0,255,163,0.45), transparent)', animation: 'glPulse 2s ease-in-out infinite' }} />
        </div>

        {/* Scene components */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <SceneLeadGen    progress={progressMV} start={P.L1S} end={P.L1E} />
          <SceneWebsite    progress={progressMV} start={P.L2S} end={P.L2E} />
          <SceneBranding   progress={progressMV} start={P.L3S} end={P.L3E} />
          <SceneMedia      progress={progressMV} start={P.L4S} end={P.L4E} />
          <SceneAutomation progress={progressMV} start={P.L5S} end={P.L5E} />
          <SceneAdvertising progress={progressMV} start={P.L6S} end={P.L6E} />
        </div>

        {/* Singularity copy */}
        <div
          id="gl-singularity"
          style={{ position: 'absolute', bottom: '11%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', opacity: 0, zIndex: 20, width: 'min(580px, 80vw)' }}
        >
          <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,247,248,0.92)', lineHeight: 1.2, margin: '0 0 14px' }}>
            Don't Get Replaced.
          </p>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: 'clamp(1.05rem, 1.9vw, 1.4rem)', color: 'rgba(247,247,248,0.88)', letterSpacing: '0.04em', margin: 0 }}>
            The future of business is already being built.
          </p>
        </div>

        <style>{`@keyframes glPulse { 0%,100%{opacity:.28} 50%{opacity:.82} }`}</style>
      </div>
    </div>
  )
}
