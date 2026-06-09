import { motion, useTransform } from 'framer-motion'
import SceneShell from './SceneShell'

const SMS = [
  { from: 'biz', text: "Hey Sam — got your request. Free Thursday at 10?" },
  { from: 'lead', text: "Thursday works!" },
  { from: 'biz', text: "Confirmed. Sending details now." },
]

const ORBIT = [
  { kind: 'Email', label: 'Day 1 · Intro follow-up', angle: 0 },
  { kind: 'SMS', label: 'Day 2 · Quick check-in', angle: Math.PI * 0.4 },
  { kind: 'Reminder', label: 'Day 3 · Add to calendar', angle: Math.PI * 0.8 },
  { kind: 'Email', label: 'Day 5 · Estimate ready', angle: Math.PI * 1.2 },
  { kind: 'SMS', label: 'Day 7 · Final nudge', angle: Math.PI * 1.6 },
]

const KIND_COLOR = { Email: '#5BA8FF', SMS: '#00FFA3', Reminder: '#FFBD2E' }

export default function SceneAutomation({ progress, start, end }) {
  const sceneT = useTransform(progress, [start, end], [0, 1])
  const orbitAngle = useTransform(sceneT, [0, 1], [0, Math.PI * 2])

  return (
    <SceneShell
      progress={progress} start={start} end={end}
      eyebrow="Automation"
      title="Most businesses need less repetition."
      body="Build systems that follow up, remind, and confirm — automatically. Every task automated creates space for growth."
    >
      <div style={{ position: 'relative', width: '100%', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {ORBIT.map((c, i) => (
          <OrbitCard key={i} card={c} orbitAngle={orbitAngle} />
        ))}

        {/* Phone */}
        <div style={{
          width: 240, height: 420,
          background: '#0d0d14',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 36, overflow: 'hidden',
          position: 'relative', zIndex: 10, flexShrink: 0,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.65)',
        }}>
          {/* Notch */}
          <div style={{ height: 26, background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 56, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }} />
          </div>
          {/* Contact bar */}
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #00FFA3, #004d31)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#050508', fontSize: 11, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700 }}>P</span>
            </div>
            <div>
              <div style={{ color: '#f7f7f8', fontSize: 11, fontFamily: 'Barlow, sans-serif', fontWeight: 500 }}>Patterson Tech</div>
              <div style={{ color: '#00FFA3', fontSize: 9, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.14em' }}>Auto-reply · On</div>
            </div>
          </div>
          {/* Messages */}
          <div style={{ padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SMS.map((msg, i) => (
              <SMSBubble key={i} msg={msg} index={i} sceneT={sceneT} />
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  )
}

function SMSBubble({ msg, index, sceneT }) {
  const s = 0.1 + index * 0.2
  const opacity = useTransform(sceneT, [s, s + 0.14], [0, 1])
  const y = useTransform(sceneT, [s, s + 0.14], [10, 0])
  const isBiz = msg.from === 'biz'

  return (
    <motion.div style={{ opacity, y, display: 'flex', justifyContent: isBiz ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '84%', padding: '7px 10px',
        borderRadius: isBiz ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isBiz ? '#00FFA3' : 'rgba(255,255,255,0.07)',
        color: isBiz ? '#050508' : '#f7f7f8',
        fontSize: 11, fontFamily: 'Barlow, sans-serif', lineHeight: 1.45,
      }}>
        {msg.text}
      </div>
    </motion.div>
  )
}

function OrbitCard({ card, orbitAngle }) {
  const RX = 252, RY = 164
  const x = useTransform(orbitAngle, (r) => Math.cos(card.angle + r) * RX)
  const y = useTransform(orbitAngle, (r) => Math.sin(card.angle + r) * RY)
  const depth = useTransform(orbitAngle, (r) => Math.sin(card.angle + r))
  const opacity = useTransform(depth, (d) => 0.3 + 0.7 * ((d + 1) / 2))
  const scale = useTransform(depth, (d) => 0.82 + 0.18 * ((d + 1) / 2))
  const color = KIND_COLOR[card.kind] || '#f7f7f8'

  return (
    <motion.div style={{ position: 'absolute', x, y, opacity, scale, width: 155, marginLeft: -77 }}>
      <div style={{
        background: '#0d0d14',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 10, padding: '7px 10px',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ color, fontSize: 9, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>{card.kind}</div>
        <div style={{ color: '#f7f7f8', fontSize: 11, fontFamily: 'Barlow, sans-serif', lineHeight: 1.35 }}>{card.label}</div>
      </div>
    </motion.div>
  )
}
