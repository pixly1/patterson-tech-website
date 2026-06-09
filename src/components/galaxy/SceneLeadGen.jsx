import { motion, useTransform } from 'framer-motion'
import SceneShell from './SceneShell'

const CARDS = [
  { handle: 'Carter Roofing', headline: 'Free inspection — book before storm season hits.', accent: 'rgba(0,255,163,0.2)' },
  { handle: 'BlueSky Construction', headline: 'Your neighbors got 3 estimates. They chose us.', accent: 'rgba(91,168,255,0.2)' },
  { handle: 'Patterson Roofing', headline: '60-second check. Honest answer. Same week.', accent: 'rgba(255,200,80,0.18)' },
  { handle: 'PineRidge Home Services', headline: 'Storm damage? Get a same-day estimate.', accent: 'rgba(0,255,163,0.14)' },
  { handle: 'Carter Roofing', headline: 'Trusted by 200+ local homeowners this year.', accent: 'rgba(180,100,255,0.18)' },
]

export default function SceneLeadGen({ progress, start, end }) {
  const ringRotation = useTransform(progress, [start, end], [0, Math.PI * 2.5])

  return (
    <SceneShell
      progress={progress} start={start} end={end}
      eyebrow="Lead Generation"
      title="The future isn't lacking attention."
      body="Most businesses don't have a lead problem. They have a capture problem. Every day, opportunity passes unnoticed."
    >
      <div style={{ perspective: '2000px', marginTop: 50 }}>
        <div style={{ width: 300, height: 310, position: 'relative', transformStyle: 'preserve-3d' }}>
          {CARDS.map((card, i) => (
            <CylinderCard key={i} index={i} total={CARDS.length} ringRotation={ringRotation} card={card} />
          ))}
        </div>
      </div>
    </SceneShell>
  )
}

function CylinderCard({ index, total, ringRotation, card }) {
  const baseAngle = (index / total) * Math.PI * 2
  const RADIUS = 210

  const x = useTransform(ringRotation, (r) => Math.sin(baseAngle + r) * RADIUS)
  const z = useTransform(ringRotation, (r) => Math.cos(baseAngle + r) * RADIUS)
  const depth = useTransform(ringRotation, (r) => Math.cos(baseAngle + r))
  const opacity = useTransform(depth, (d) => Math.max(0, 0.1 + 0.9 * ((d + 1) / 2)))
  const scale = useTransform(depth, (d) => 0.72 + 0.28 * ((d + 1) / 2))
  const blurFilter = useTransform(depth, (d) => `blur(${((1 - (d + 1) / 2) * 5).toFixed(1)}px)`)

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        x, z, opacity, scale,
        filter: blurFilter,
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{
        width: 300, height: 310,
        background: '#0d0d14',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #00FFA3, #004d31)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#050508', fontFamily: '"Barlow Condensed", sans-serif' }}>P</span>
          </div>
          <div>
            <div style={{ color: '#f7f7f8', fontSize: 12, fontFamily: 'Barlow, sans-serif', fontWeight: 500 }}>{card.handle}</div>
            <div style={{ color: 'rgba(247,247,248,0.35)', fontSize: 10, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Sponsored</div>
          </div>
        </div>

        {/* Visual area */}
        <div style={{ flex: 1, background: `linear-gradient(135deg, ${card.accent}, rgba(0,0,0,0) 65%)`, padding: '16px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 14, right: 14, width: 72, height: 72, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
          <p style={{ color: '#f7f7f8', fontSize: 14, fontFamily: 'Barlow, sans-serif', fontWeight: 500, lineHeight: 1.45, margin: 0 }}>{card.headline}</p>
        </div>

        {/* CTA */}
        <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(247,247,248,0.32)', fontSize: 10, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.12em' }}>Patterson Tech</span>
          <span style={{ background: '#f7f7f8', color: '#050508', padding: '4px 12px', borderRadius: 20, fontSize: 10, fontFamily: 'Barlow, sans-serif', fontWeight: 600 }}>Learn more</span>
        </div>
      </div>
    </motion.div>
  )
}
