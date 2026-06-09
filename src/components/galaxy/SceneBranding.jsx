import { useState, Fragment } from 'react'
import { motion, useTransform } from 'framer-motion'
import SceneShell from './SceneShell'

const SF = '#00FFA3'

const STAGES = [
  {
    id: 'unknown',
    label: 'UNKNOWN',
    sub: 'Just another business.',
    accent: '#8a8a9a',
    bg: 'rgba(107,107,122,0.28)',
    bgHover: 'rgba(107,107,122,0.42)',
    border: 'rgba(107,107,122,0.45)',
    borderHover: 'rgba(107,107,122,0.72)',
    detail: 'No identity. No recall. No trust.',
  },
  {
    id: 'identity',
    label: 'IDENTITY',
    sub: 'A recognizable brand.',
    accent: SF,
    bg: 'rgba(0,255,163,0.16)',
    bgHover: 'rgba(0,255,163,0.28)',
    border: 'rgba(0,255,163,0.45)',
    borderHover: 'rgba(0,255,163,0.82)',
    detail: 'Logo. Colors. Voice. Presence.',
  },
  {
    id: 'recognition',
    label: 'RECOGNITION',
    sub: 'Repeated exposure.',
    accent: '#5BA8FF',
    bg: 'rgba(91,168,255,0.16)',
    bgHover: 'rgba(91,168,255,0.28)',
    border: 'rgba(91,168,255,0.45)',
    borderHover: 'rgba(91,168,255,0.82)',
    detail: 'Social. Ads. Search. Video.',
  },
  {
    id: 'trust',
    label: 'TRUST',
    sub: 'People become familiar.',
    accent: '#FFC850',
    bg: 'rgba(255,200,80,0.16)',
    bgHover: 'rgba(255,200,80,0.28)',
    border: 'rgba(255,200,80,0.45)',
    borderHover: 'rgba(255,200,80,0.82)',
    detail: 'Reviews. Proof. Authority.',
  },
  {
    id: 'action',
    label: 'CUSTOMERS',
    sub: 'Familiar becomes chosen.',
    accent: SF,
    bg: 'rgba(0,255,163,0.22)',
    bgHover: 'rgba(0,255,163,0.35)',
    border: 'rgba(0,255,163,0.62)',
    borderHover: '#00FFA3',
    detail: 'Leads. Bookings. Growth.',
  },
]

const GLASS_CARDS = [
  { title: 'Visual Identity', body: 'Logo · Colors · Typography' },
  { title: 'Messaging', body: 'What you say. How you say it.' },
  { title: 'Consistency', body: 'Same experience, everywhere.' },
  { title: 'Perception', body: 'How customers feel about you.' },
]

export default function SceneBranding({ progress, start, end }) {
  const sceneT = useTransform(progress, [start, end], [0, 1])
  const [hovered, setHovered] = useState(null)

  return (
    <SceneShell
      progress={progress} start={start} end={end}
      eyebrow="Branding"
      title="People don't buy the best."
      body="They buy what they remember. Recognition creates trust. Trust creates action."
    >
      <div style={{ width: '100%', maxWidth: 950, pointerEvents: 'auto' }}>

        {/* ── Transformation pathway ── */}
        <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', marginBottom: 12 }}>
          {STAGES.map((stage, i) => (
            <Fragment key={stage.id}>
              <StageCard
                stage={stage}
                index={i}
                sceneT={sceneT}
                isHovered={hovered === stage.id}
                onHover={setHovered}
              />
              {i < STAGES.length - 1 && (
                <ArrowConnector index={i} sceneT={sceneT} />
              )}
            </Fragment>
          ))}
        </div>

        {/* ── Glass info cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9, marginBottom: 10 }}>
          {GLASS_CARDS.map((card, i) => (
            <GlassCard key={i} card={card} index={i} sceneT={sceneT} />
          ))}
        </div>

        {/* ── Bottom statement ── */}
        <BottomStatement sceneT={sceneT} />

        <style>{`
          @keyframes brandDot {
            0%   { left: -6px; opacity: 0; }
            12%  { opacity: 1; }
            88%  { opacity: 1; }
            100% { left: calc(100% + 6px); opacity: 0; }
          }
        `}</style>
      </div>
    </SceneShell>
  )
}

// ─── Stage card ────────────────────────────────────────────────────────────

function StageCard({ stage, index, sceneT, isHovered, onHover }) {
  const s = index * 0.13
  const opacity = useTransform(sceneT, [s, s + 0.12], [0, 1])
  const slideY = useTransform(sceneT, [s, s + 0.12], [18, 0])

  return (
    <motion.div
      style={{ opacity, y: slideY, flex: 1 }}
      onMouseEnter={() => onHover(stage.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div style={{
        height: isHovered ? 196 : 176,
        background: isHovered ? stage.bgHover : stage.bg,
        border: `1px solid ${isHovered ? stage.borderHover : stage.border}`,
        borderRadius: 10,
        padding: '14px 10px 13px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
        transition: 'height 0.22s ease, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
        cursor: 'default',
        overflow: 'hidden',
        boxShadow: isHovered ? `0 0 24px ${stage.accent}18, inset 0 1px 0 ${stage.accent}12` : 'none',
      }}>
        <StageIcon id={stage.id} accent={stage.accent} />

        <div style={{
          color: stage.accent,
          fontSize: 9,
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 700,
          letterSpacing: '0.24em',
        }}>
          {stage.label}
        </div>

        <div style={{
          color: 'rgba(247,247,248,0.92)',
          fontSize: 13,
          fontWeight: 500,
          fontFamily: 'Barlow, sans-serif',
          lineHeight: 1.38,
        }}>
          {stage.sub}
        </div>

        {/* Detail — revealed when card height expands on hover */}
        <div style={{
          color: stage.accent,
          fontSize: 11,
          fontWeight: 600,
          fontFamily: '"Barlow Condensed", sans-serif',
          letterSpacing: '0.12em',
          opacity: isHovered ? 0.92 : 0,
          transition: 'opacity 0.18s ease',
          lineHeight: 1.7,
          flexShrink: 0,
        }}>
          {stage.detail}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Stage icons ───────────────────────────────────────────────────────────

function StageIcon({ id, accent }) {
  const wrap = { width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }

  if (id === 'unknown') return (
    <div style={wrap}>
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        border: '1.5px dashed rgba(107,107,122,0.36)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: 'rgba(107,107,122,0.5)', fontSize: 17, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 300 }}>?</span>
      </div>
    </div>
  )

  if (id === 'identity') return (
    <div style={wrap}>
      <svg width="38" height="38" viewBox="0 0 38 38">
        {/* Outer ring — 12 dots, every 3rd is larger */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2
          const big = i % 3 === 0
          return (
            <circle
              key={i}
              cx={19 + Math.cos(a) * 14}
              cy={19 + Math.sin(a) * 14}
              r={big ? 2.2 : 1.4}
              fill={accent}
              opacity={big ? 0.88 : 0.5}
            />
          )
        })}
        {/* Inner ring — 6 dots */}
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2
          return (
            <circle
              key={`in${i}`}
              cx={19 + Math.cos(a) * 7}
              cy={19 + Math.sin(a) * 7}
              r={1.2}
              fill={accent}
              opacity={0.42}
            />
          )
        })}
        <circle cx="19" cy="19" r="1.8" fill={accent} opacity={0.72} />
      </svg>
    </div>
  )

  if (id === 'recognition') {
    const clusters = [{ x: 2, y: 1 }, { x: 20, y: 5 }, { x: 10, y: 20 }]
    return (
      <div style={wrap}>
        <svg width="38" height="38" viewBox="0 0 38 38">
          {clusters.map((pos, j) =>
            Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2
              return (
                <circle
                  key={`${j}-${i}`}
                  cx={pos.x + 8 + Math.cos(a) * 5.5}
                  cy={pos.y + 8 + Math.sin(a) * 5.5}
                  r={1.1}
                  fill={accent}
                  opacity={0.4 + j * 0.14}
                />
              )
            })
          )}
        </svg>
      </div>
    )
  }

  if (id === 'trust') return (
    <div style={{ ...wrap, flexDirection: 'column', gap: 3 }}>
      <div style={{ color: accent, fontSize: 14, letterSpacing: 1.5, lineHeight: 1 }}>★★★★★</div>
      <div style={{ color: accent, fontSize: 8, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.14em', opacity: 0.68 }}>
        4.9 · 127 reviews
      </div>
    </div>
  )

  if (id === 'action') return (
    <div style={wrap}>
      <svg width="38" height="28" viewBox="0 0 38 28">
        <polyline
          points="2,26 9,19 17,14 25,7 35,2"
          stroke={accent} strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          opacity={0.88}
        />
        <circle cx="35" cy="2" r="3" fill={accent} opacity={0.92} />
        <circle cx="9" cy="19" r="1.7" fill={accent} opacity={0.42} />
        <circle cx="25" cy="7" r="1.7" fill={accent} opacity={0.55} />
        <circle cx="6" cy="8" r="2" fill={accent} opacity={0.26} />
        <circle cx="32" cy="20" r="1.5" fill={accent} opacity={0.22} />
      </svg>
    </div>
  )

  return null
}

// ─── Arrow connector ────────────────────────────────────────────────────────

function ArrowConnector({ index, sceneT }) {
  const s = index * 0.13 + 0.1
  const opacity = useTransform(sceneT, [s, s + 0.09], [0, 1])

  return (
    <motion.div style={{
      opacity,
      flexShrink: 0,
      width: 26,
      alignSelf: 'center',
      position: 'relative',
      height: 14,
    }}>
      {/* Static line */}
      <div style={{
        position: 'absolute',
        top: '50%', left: 0, right: 0,
        height: 1,
        background: 'rgba(255,255,255,0.11)',
        transform: 'translateY(-50%)',
      }} />
      {/* Seafoam traveling dot */}
      <div style={{
        position: 'absolute',
        top: '50%', transform: 'translateY(-50%)',
        width: 5, height: 5, borderRadius: '50%',
        background: SF,
        boxShadow: `0 0 6px ${SF}`,
        animation: `brandDot ${1.4 + index * 0.22}s ease-in-out infinite`,
        animationDelay: `${index * 0.34}s`,
      }} />
      {/* Arrowhead */}
      <svg
        width="5" height="8" viewBox="0 0 5 8"
        style={{ position: 'absolute', right: -1, top: '50%', transform: 'translateY(-50%)' }}
      >
        <path d="M0,0 L5,4 L0,8 Z" fill="rgba(255,255,255,0.2)" />
      </svg>
    </motion.div>
  )
}

// ─── Glass cards ────────────────────────────────────────────────────────────

function GlassCard({ card, index, sceneT }) {
  const s = 0.58 + index * 0.06
  const opacity = useTransform(sceneT, [s, s + 0.08], [0, 1])
  const slideY = useTransform(sceneT, [s, s + 0.08], [10, 0])

  return (
    <motion.div style={{ opacity, y: slideY }}>
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.16)',
        borderRadius: 8,
        padding: '13px 15px',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          color: SF,
          fontSize: 11,
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}>
          {card.title}
        </div>
        <div style={{
          color: 'rgba(247,247,248,0.78)',
          fontSize: 13,
          fontWeight: 400,
          fontFamily: 'Barlow, sans-serif',
          lineHeight: 1.4,
        }}>
          {card.body}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Bottom statement ───────────────────────────────────────────────────────

function BottomStatement({ sceneT }) {
  const opacity = useTransform(sceneT, [0.88, 0.98], [0, 1])
  return (
    <motion.div style={{ opacity, textAlign: 'center', paddingTop: 2 }}>
      <p style={{
        color: 'rgba(247,247,248,0.26)',
        fontSize: 10,
        fontFamily: 'Barlow, sans-serif',
        fontStyle: 'italic',
        letterSpacing: '0.04em',
        margin: 0,
      }}>
        Branding isn't decoration — it's the system that makes strangers remember you. And remembered businesses get chosen.
      </p>
    </motion.div>
  )
}
