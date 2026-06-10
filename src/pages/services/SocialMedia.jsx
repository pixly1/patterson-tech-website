import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SF = '#00FFA3'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const wipeIn = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1, clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
}

const DELIVERABLES = [
  {
    title: 'Content Strategy',
    desc: 'We map out what you post, when you post it, and why — built around your specific audience and business goals.',
  },
  {
    title: 'Platform-Specific Copy & Creative',
    desc: 'Captions, hooks, and creative direction that match the platform — whether that\'s Facebook, Instagram, or TikTok.',
  },
  {
    title: 'Consistent Posting Schedule',
    desc: 'Your feed stays active and on-brand without you lifting a finger. We handle the calendar, you handle the calls.',
  },
  {
    title: 'Engagement & Community Growth',
    desc: 'Responding to comments, building follower relationships, and growing your audience organically over time.',
  },
  {
    title: 'Monthly Performance Review',
    desc: 'Clear reporting on reach, engagement, and growth — so you always know what\'s working and what we\'re adjusting.',
  },
  {
    title: 'Brand Voice Development',
    desc: 'We learn how you talk, what you stand for, and make sure every post sounds exactly like you — not a generic agency.',
  },
]

const WHY_POINTS = [
  {
    num: '01',
    heading: 'Trust is built in the feed.',
    body: 'Before a potential client ever picks up the phone, they\'ve already looked you up. A strong, consistent social presence tells them you\'re real, reliable, and worth calling.',
  },
  {
    num: '02',
    heading: 'Most local businesses ghost their own pages.',
    body: 'The bar is low. Posting consistently — even 3x a week — puts you miles ahead of the competition in your area. We make it effortless.',
  },
  {
    num: '03',
    heading: 'Organic compounds over time.',
    body: 'Unlike ads, organic social keeps working long after you post. Good content gets shared, saved, and discovered for months. It\'s a long game that pays off.',
  },
]

export default function SocialMedia() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen pt-32 pb-24"
    >
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 mb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" className="flex flex-col gap-4 mb-16">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 font-barlow-condensed font-600 text-xs tracking-[0.3em] uppercase"
              style={{ color: SF }}
            >
              <span className="block w-6 h-px" style={{ background: SF }} />
              Organic Social Media
            </motion.span>
            <motion.h1
              variants={wipeIn}
              className="font-barlow-condensed font-800 text-bone leading-[0.93]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Build Presence.<br />
              <span style={{ color: SF }}>Own Your Feed.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="font-barlow text-lg text-muted leading-relaxed max-w-2xl">
              Consistent, on-brand social content that keeps your business top-of-mind and builds real trust with the people in your market — without paid spend.
            </motion.p>
          </motion.div>

          <div className="section-divider" />
        </div>
      </section>

      {/* ─── WHY IT MATTERS ─────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 mb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3 mb-12"
          >
            <motion.span variants={fadeUp} custom={0} className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-muted">
              Why It Matters
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-barlow-condensed font-800 text-bone leading-[0.94]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
            >
              Your Feed Is Your First Impression.
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {WHY_POINTS.map((pt, i) => (
              <motion.div
                key={pt.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-b border-white/5"
              >
                <div className="flex items-start gap-4">
                  <span className="font-barlow-condensed font-700 text-5xl text-white/6 leading-none select-none">{pt.num}</span>
                  <h3 className="font-barlow-condensed font-700 text-lg tracking-[0.04em] text-bone mt-1">{pt.heading}</h3>
                </div>
                <p className="font-barlow text-muted text-base leading-relaxed md:col-span-2">{pt.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 mb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3 mb-12"
          >
            <motion.span variants={fadeUp} custom={0} className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-muted">
              What's Included
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-barlow-condensed font-800 text-bone leading-[0.94]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
            >
              Everything Handled for You.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DELIVERABLES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="glass glass-hover p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: SF }} />
                  <h3 className="font-barlow-condensed font-700 text-bone text-base tracking-[0.04em]">{item.title}</h3>
                </div>
                <p className="font-barlow text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="section-divider mb-16" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-barlow-condensed font-800 text-bone leading-[0.93]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}
            >
              Ready to Start?<br />
              <span style={{ color: SF }}>Book a Free Audit First.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-barlow text-muted text-lg leading-relaxed max-w-lg">
              We'll review your current social presence, identify the gaps, and walk you through exactly what we'd do — before you commit to anything.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col items-center gap-3">
              <Link
                to="/"
                onClick={() => setTimeout(() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-90"
                style={{ background: SF, color: '#050508' }}
              >
                Book Your Free Audit →
              </Link>
              <p className="font-barlow text-xs text-muted/40">Free · 15 minutes · No pitch. No obligation.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="flex justify-center mt-16 px-6">
        <Link
          to="/services"
          className="flex items-center gap-2 font-barlow text-sm text-muted/60 hover:text-bone transition-colors duration-200 tracking-wide"
        >
          <span>←</span> Back to Services
        </Link>
      </div>

      <footer className="border-t border-white/5 mt-12 pt-8 px-6">
        <p className="font-barlow text-[10px] text-muted/25 tracking-wide text-center">
          Built by Patterson Tech Web Services
        </p>
      </footer>
    </motion.main>
  )
}
