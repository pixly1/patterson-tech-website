import { motion, useTransform } from 'framer-motion'
import SceneShell from './SceneShell'

const STATS = [
  { label: 'Total Spend', value: '$1,240' },
  { label: 'Leads', value: '55' },
  { label: 'Avg. Cost/Lead', value: '$22.54' },
]

const CAMPAIGNS = [
  { name: 'Carter Roofing — Storm Season', status: 'Active', spend: '$483', cpl: '$21.95' },
  { name: 'BlueSky Construction — Free Est.', status: 'Active', spend: '$328', cpl: '$23.43' },
  { name: 'PineRidge — Referral', status: 'Active', spend: '$219', cpl: '$19.91' },
  { name: 'Seasonal — Holiday Promo', status: 'Paused', spend: '$210', cpl: '$26.25' },
]

export default function SceneAdvertising({ progress, start, end }) {
  const sceneT = useTransform(progress, [start, end], [0, 1])

  return (
    <SceneShell
      progress={progress} start={start} end={end}
      eyebrow="Advertising"
      title="Guessing is expensive."
      body="Every dollar should have a destination. Growth becomes predictable when attention becomes measurable."
    >
      <div style={{ width: '100%', maxWidth: 580 }}>
        <div style={{
          background: '#0d0d14',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        }}>
          {/* Header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00FFA3' }} />
              <span style={{ color: '#f7f7f8', fontSize: 13, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.05em' }}>Ad Dashboard · Live</span>
            </div>
            <span style={{ color: 'rgba(247,247,248,0.32)', fontSize: 10, fontFamily: 'Barlow, sans-serif' }}>This month</span>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {STATS.map((stat, i) => (
              <StatCell key={i} stat={stat} index={i} sceneT={sceneT} />
            ))}
          </div>

          {/* Campaign rows */}
          <div>
            {CAMPAIGNS.map((c, i) => (
              <CampaignRow key={i} campaign={c} index={i} sceneT={sceneT} />
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  )
}

function StatCell({ stat, index, sceneT }) {
  const s = index * 0.1
  const opacity = useTransform(sceneT, [s, s + 0.16], [0, 1])

  return (
    <motion.div
      style={{ opacity, padding: '14px 16px', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      className="last:border-r-0"
    >
      <div style={{ color: 'rgba(247,247,248,0.38)', fontSize: 9, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 5 }}>
        {stat.label}
      </div>
      <div style={{ color: '#f7f7f8', fontSize: 22, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}>
        {stat.value}
      </div>
    </motion.div>
  )
}

function CampaignRow({ campaign, index, sceneT }) {
  const s = 0.32 + index * 0.1
  const opacity = useTransform(sceneT, [s, s + 0.14], [0, 1])
  const x = useTransform(sceneT, [s, s + 0.14], [-14, 0])
  const isActive = campaign.status === 'Active'

  return (
    <motion.div
      style={{ opacity, x, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      className="last:border-b-0"
    >
      <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: isActive ? '#00FFA3' : 'rgba(247,247,248,0.18)' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#f7f7f8', fontSize: 11, fontFamily: 'Barlow, sans-serif', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {campaign.name}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, flexShrink: 0, alignItems: 'center' }}>
        <span style={{ color: 'rgba(247,247,248,0.45)', fontSize: 10, fontFamily: 'Barlow, sans-serif' }}>{campaign.spend}</span>
        <span style={{ color: '#00FFA3', fontSize: 11, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, minWidth: 52, textAlign: 'right' }}>{campaign.cpl}</span>
      </div>
    </motion.div>
  )
}
