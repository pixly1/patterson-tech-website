import { motion, useTransform } from 'framer-motion'
import SceneShell from './SceneShell'

const POSTS = [
  { title: 'How to spot roof damage before it leaks', views: '12.4K', accent: 'rgba(0,255,163,0.22)' },
  { title: '3 signs your contractor is cutting corners', views: '8.7K', accent: 'rgba(91,168,255,0.22)' },
  { title: '47 inspections in June — what we found', views: '24.1K', accent: 'rgba(255,200,80,0.22)' },
  { title: 'Free audit process — start to finish', views: '5.2K', accent: 'rgba(180,100,255,0.2)' },
  { title: 'Before & after: storm damage project', views: '31.5K', accent: 'rgba(0,255,163,0.18)' },
  { title: '5-star clients share their experience', views: '18.9K', accent: 'rgba(255,80,80,0.18)' },
]

export default function SceneMedia({ progress, start, end }) {
  const sceneT = useTransform(progress, [start, end], [0, 1])

  return (
    <SceneShell
      progress={progress} start={start} end={end}
      eyebrow="Media"
      title="Visibility compounds."
      body="The businesses growing fastest aren't shouting louder. They're showing up more often. Silence disappears."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: '100%', maxWidth: 880 }}>
        {POSTS.map((post, i) => (
          <PostCard key={i} post={post} index={i} sceneT={sceneT} />
        ))}
      </div>
    </SceneShell>
  )
}

function PostCard({ post, index, sceneT }) {
  const s = index * 0.1
  const opacity = useTransform(sceneT, [s, s + 0.18], [0, 1])
  const scale = useTransform(sceneT, [s, s + 0.18], [0.86, 1])

  return (
    <motion.div style={{ opacity, scale }}>
      <div style={{
        background: '#0d0d14',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10, overflow: 'hidden',
      }}>
        {/* Thumbnail */}
        <div style={{
          height: 148,
          background: `linear-gradient(135deg, ${post.accent}, rgba(0,0,0,0) 70%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(247,247,248,0.1)',
            border: '1px solid rgba(247,247,248,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#f7f7f8', fontSize: 13, marginLeft: 2 }}>▶</span>
          </div>
          <div style={{
            position: 'absolute', bottom: 6, right: 7,
            background: 'rgba(0,0,0,0.55)', borderRadius: 4,
            padding: '2px 5px',
            color: '#f7f7f8', fontSize: 8, fontFamily: 'Barlow, sans-serif',
          }}>
            {index % 3 === 0 ? '2:14' : index % 3 === 1 ? '4:38' : '1:55'}
          </div>
        </div>
        {/* Info */}
        <div style={{ padding: '10px 12px' }}>
          <div style={{
            color: '#f7f7f8', fontSize: 12, fontFamily: 'Barlow, sans-serif',
            lineHeight: 1.35, marginBottom: 6,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>
            {post.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#00FFA3', fontSize: 11, fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>
              {post.views}
            </span>
            <span style={{ color: 'rgba(247,247,248,0.3)', fontSize: 10, fontFamily: 'Barlow, sans-serif' }}>views</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
