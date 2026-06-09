import { motion, useTransform } from 'framer-motion'

const SF = '#00FFA3'

export default function SceneShell({ progress, start, end, eyebrow, title, body, children }) {
  const len = end - start
  const opacity = useTransform(
    progress,
    [start, start + len * 0.1, end - len * 0.1, end],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    progress,
    [start, start + len * 0.14, end - len * 0.1, end],
    [22, 0, 0, -16]
  )

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center pointer-events-none px-6 pt-[10vh]"
    >
      <motion.div style={{ y }} className="text-center max-w-[600px] mb-8">
        <p
          className="font-barlow-condensed font-bold tracking-[0.28em] uppercase mb-3"
          style={{ color: SF, fontSize: 'clamp(0.85rem, 1.15vw, 1rem)' }}
        >
          — {eyebrow}
        </p>
        <h2
          className="font-barlow-condensed font-bold text-bone leading-none mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          {title}
        </h2>
        <p
          className="font-barlow leading-relaxed"
          style={{ color: 'rgba(247,247,248,0.9)', fontSize: 'clamp(0.95rem, 1.55vw, 1.12rem)', fontWeight: 400, textShadow: '0 1px 12px rgba(5,5,8,0.85)' }}
        >
          {body}
        </p>
      </motion.div>

      <div
        className="relative w-full flex items-center justify-center"
        style={{ maxWidth: 960, height: 380 }}
      >
        {children}
      </div>
    </motion.div>
  )
}
