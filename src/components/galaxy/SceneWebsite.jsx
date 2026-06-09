import { motion, useTransform } from 'framer-motion'
import SceneShell from './SceneShell'

const FIELDS = [
  { label: 'Full name', value: 'Sam Carver' },
  { label: 'Phone', value: '(404) 555-0142' },
  { label: 'Business', value: 'Carter Roofing · Marietta GA' },
  { label: "What's going on?", value: 'Two leaks after the storm.' },
]

const PINGS = [
  { name: 'Sam C.', area: 'Marietta', side: 'left', t: 0.0 },
  { name: 'Jordan K.', area: 'Roswell', side: 'right', t: 0.22 },
  { name: 'Dana R.', area: 'Smyrna', side: 'left', t: 0.48 },
]

export default function SceneWebsite({ progress, start, end }) {
  const sceneT = useTransform(progress, [start, end], [0, 1])

  return (
    <SceneShell
      progress={progress} start={start} end={end}
      eyebrow="Website"
      title="Most websites are brochures."
      body="The best come with automated messaging and follow-up built in — working 24 hours a day, catching every lead while you sleep."
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {PINGS.map((p, i) => (
          <PingCard key={i} ping={p} sceneT={sceneT} />
        ))}

        {/* Browser mockup */}
        <div style={{
          width: '100%',
          background: '#0d0d14',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
        }}>
          {/* Chrome bar */}
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: 10, color: 'rgba(247,247,248,0.3)', fontSize: 10, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.1em' }}>
              Patterson Tech/inspection
            </span>
          </div>
          {/* Page hero */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ color: '#f7f7f8', fontSize: 15, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, marginBottom: 3 }}>Free Roof Inspection</div>
            <div style={{ color: 'rgba(247,247,248,0.4)', fontSize: 11, fontFamily: 'Barlow, sans-serif' }}>60-second check. Same-week appointment.</div>
          </div>
          {/* Form fields */}
          <div style={{ padding: '12px 16px' }}>
            {FIELDS.map((f, i) => (
              <TypedField key={i} field={f} index={i} sceneT={sceneT} />
            ))}
            <SubmitBtn sceneT={sceneT} />
          </div>
        </div>
      </div>
    </SceneShell>
  )
}

function TypedField({ field, index, sceneT }) {
  const s = 0.08 + index * 0.14
  const e = s + 0.22
  const typedLen = useTransform(sceneT, [s, e], [0, field.value.length])
  const displayed = useTransform(typedLen, (v) => field.value.slice(0, Math.round(Math.max(0, v))))

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ color: 'rgba(247,247,248,0.38)', fontSize: 9, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 4 }}>
        {field.label}
      </div>
      <div style={{
        height: 32, background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7,
        padding: '0 10px', display: 'flex', alignItems: 'center',
        fontSize: 11, fontFamily: 'Barlow, sans-serif', color: '#f7f7f8',
        gap: 1,
      }}>
        <motion.span>{displayed}</motion.span>
        <span style={{ width: 1.5, height: 12, background: '#00FFA3', opacity: 0.9, flexShrink: 0 }} />
      </div>
    </div>
  )
}

function SubmitBtn({ sceneT }) {
  const opacity = useTransform(sceneT, [0.72, 0.88], [0.25, 1])
  const scale = useTransform(sceneT, [0.72, 0.88], [0.97, 1])
  return (
    <motion.div style={{ opacity, scale, marginTop: 8 }}>
      <div style={{
        height: 36, background: '#00FFA3', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#050508', fontSize: 11, fontFamily: '"Barlow Condensed", sans-serif',
        fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>
        Book an Inspection →
      </div>
    </motion.div>
  )
}

function PingCard({ ping, sceneT }) {
  const s = ping.t
  const e = s + 0.3
  const opacity = useTransform(sceneT, [s, s + 0.08, e, e + 0.1], [0, 1, 1, 0])
  const x = useTransform(sceneT, [s, e + 0.1], ping.side === 'left' ? [-70, -44] : [70, 44])

  return (
    <motion.div style={{
      position: 'absolute',
      [ping.side]: '2%',
      top: `${22 + ping.t * 38}%`,
      opacity, x, zIndex: 20,
    }}>
      <div style={{
        background: '#0d0d14',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12, padding: '8px 12px',
        backdropFilter: 'blur(8px)',
        minWidth: 130,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FFA3' }} />
          <span style={{ color: '#00FFA3', fontSize: 9, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}>New lead</span>
        </div>
        <div style={{ color: '#f7f7f8', fontSize: 12, fontFamily: 'Barlow, sans-serif', fontWeight: 500 }}>
          {ping.name} · {ping.area}
        </div>
      </div>
    </motion.div>
  )
}
