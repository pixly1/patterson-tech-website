import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GalaxyHero from '../components/GalaxyHero'

const SF = '#00FFA3'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const wipeIn = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1, clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Home() {
  const [auditFields, setAuditFields] = useState({ name: '', email: '', phone: '', businessType: '', notes: '' })
  const [auditState, setAuditState] = useState('idle')

  function handleAuditChange(e) {
    setAuditFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleAuditSubmit(e) {
    e.preventDefault()
    setAuditState('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xykaprnl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(auditFields),
      })
      setAuditState(res.ok ? 'success' : 'error')
    } catch {
      setAuditState('error')
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-void min-h-screen"
    >
      {/* ─── GALAXY HERO EXPERIENCE ───────────────────────────── */}
      <GalaxyHero />

      {/* ─── VSL ────────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-center px-6 md:px-16 lg:px-28 py-24 bg-void">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center text-center gap-6 mb-10"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 font-barlow-condensed font-700 text-sm tracking-[0.3em] uppercase"
              style={{ color: SF }}
            >
              <span className="block w-6 h-px" style={{ background: SF }} />
              Watch First
            </motion.span>
            <motion.h2
              variants={wipeIn}
              className="font-barlow-condensed font-800 text-bone leading-[0.92]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
            >
              See exactly what you get.<br />
              <span style={{ color: SF }}>In three minutes.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-barlow text-lg text-muted leading-relaxed max-w-xl"
            >
              This short video walks you through exactly what happens in your free audit —
              what we look at, what we find, and what you walk away with.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative w-full max-w-3xl mx-auto glass"
              style={{
                aspectRatio: '16/9',
                borderColor: 'rgba(0,255,163,0.18)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,163,0.07) 0%, rgba(5,5,8,0.96) 70%)' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 76, height: 76, borderRadius: '50%',
                    background: 'rgba(0,255,163,0.14)',
                    border: '1.5px solid rgba(0,255,163,0.45)',
                  }}
                >
                  <div style={{ width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: '22px solid #00FFA3', marginLeft: 5 }} />
                </div>
                <div className="text-center">
                  <p className="font-barlow-condensed font-700 text-bone tracking-[0.12em] uppercase mb-2" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}>
                    Patterson Tech — Free Audit Overview
                  </p>
                  <p className="font-barlow text-muted text-sm">
                    Video coming soon · ~3 minutes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center font-barlow text-sm mt-5"
            style={{ color: 'rgba(247,247,248,0.28)' }}
          >
            Watch first — then fill out the form below.
          </motion.p>
        </div>
      </section>

      {/* ─── AUDIT CTA ──────────────────────────────────────────── */}
      <section id="audit" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-28 py-28 bg-void">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="flex flex-col items-center text-center gap-8 mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 font-barlow-condensed font-700 text-sm tracking-[0.3em] uppercase"
              style={{ color: SF }}
            >
              <span className="block w-6 h-px" style={{ background: SF }} />
              Free Business Audit
            </motion.span>

            <motion.h2
              variants={wipeIn}
              className="font-barlow-condensed font-800 text-bone leading-[0.92]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Don't Get Replaced.<br />
              <span style={{ color: SF }}>The future of business is now.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-barlow text-xl text-muted leading-relaxed max-w-xl"
            >
              Start with a free 15-minute audit. You'll leave with a clear
              picture of exactly what's holding your business back — and exactly how to fix it.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {auditState === 'success' ? (
              <div
                className="glass p-12 max-w-xl mx-auto text-center flex flex-col items-center gap-5"
                style={{ borderColor: 'rgba(0,255,163,0.2)', borderWidth: 1, borderStyle: 'solid' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,255,163,0.1)', border: `1.5px solid rgba(0,255,163,0.4)` }}
                >
                  <span style={{ color: SF, fontSize: 22 }}>✓</span>
                </div>
                <h3 className="font-barlow-condensed font-700 text-bone text-2xl tracking-[0.04em]">You're booked.</h3>
                <p className="font-barlow text-muted text-base max-w-xs leading-relaxed">
                  We'll reach out within 24 hours to confirm your audit time.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleAuditSubmit}
                className="glass p-8 md:p-10 max-w-xl mx-auto flex flex-col gap-4"
                style={{ borderColor: 'rgba(0,255,163,0.1)', borderWidth: 1, borderStyle: 'solid' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={auditFields.name}
                    onChange={handleAuditChange}
                    placeholder="Your Name"
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors"
                    onFocus={(e) => { e.target.style.borderColor = `${SF}40` }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                  <input
                    type="email"
                    name="email"
                    value={auditFields.email}
                    onChange={handleAuditChange}
                    placeholder="Email Address"
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors"
                    onFocus={(e) => { e.target.style.borderColor = `${SF}40` }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={auditFields.phone}
                    onChange={handleAuditChange}
                    placeholder="Phone"
                    required
                    className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors"
                    onFocus={(e) => { e.target.style.borderColor = `${SF}40` }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                  <input
                    type="text"
                    name="businessType"
                    value={auditFields.businessType}
                    onChange={handleAuditChange}
                    placeholder="Business Type"
                    className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors"
                    onFocus={(e) => { e.target.style.borderColor = `${SF}40` }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <textarea
                  name="notes"
                  value={auditFields.notes}
                  onChange={handleAuditChange}
                  placeholder="What's going on? (optional)"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors resize-none"
                  onFocus={(e) => { e.target.style.borderColor = `${SF}40` }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
                <button
                  type="submit"
                  disabled={auditState === 'submitting'}
                  className="w-full py-4 font-barlow-condensed font-700 text-base tracking-[0.18em] uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                  style={{ background: SF, color: '#050508' }}
                >
                  {auditState === 'submitting' ? 'Sending...' : 'Book a Free Audit →'}
                </button>
                {auditState === 'error' && (
                  <p className="text-center font-barlow text-sm text-red-400/80">
                    Something went wrong — try again or reach out directly.
                  </p>
                )}
                <p className="text-center font-barlow text-sm text-muted/40 tracking-wide">
                  Free · 15 minutes · You'll walk away with complete clarity.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── NOT READY YET ──────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-16 lg:px-28 py-24 bg-void-2">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto w-full text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-7"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 font-barlow-condensed font-700 text-sm tracking-[0.3em] uppercase"
              style={{ color: SF }}
            >
              <span className="block w-6 h-px" style={{ background: SF }} />
              Not Ready Yet?
            </motion.span>

            <motion.h2
              variants={wipeIn}
              className="font-barlow-condensed font-800 text-bone leading-[0.92]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
            >
              Want to see how this<br />
              <span style={{ color: SF }}>actually works first?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-barlow text-xl text-muted leading-relaxed max-w-2xl"
            >
              Not sure what you're signing up for? Watch real audits we've done
              for actual businesses — the full process, uncut. Then explore the
              Education Library when you're ready to go deeper.
            </motion.p>

            {/* Featured: Audit Examples */}
            <motion.div variants={fadeUp} custom={2} className="w-full max-w-2xl">
              <Link to="/library?category=audits" className="block group">
                <div
                  className="relative p-8 md:p-10 transition-all duration-300"
                  style={{
                    background: 'rgba(0,255,163,0.04)',
                    border: `1.5px solid rgba(0,255,163,0.35)`,
                    borderRadius: 12,
                    boxShadow: '0 0 40px rgba(0,255,163,0.06)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 60px rgba(0,255,163,0.14)'; e.currentTarget.style.borderColor = 'rgba(0,255,163,0.65)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,163,0.06)'; e.currentTarget.style.borderColor = 'rgba(0,255,163,0.35)' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="font-barlow-condensed font-700 text-xs tracking-[0.28em] uppercase px-3 py-1"
                      style={{ background: 'rgba(0,255,163,0.14)', color: SF, borderRadius: 4 }}
                    >
                      Most Valuable
                    </span>
                  </div>
                  <h3
                    className="font-barlow-condensed font-800 text-bone leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                  >
                    Watch Real Audit Examples
                  </h3>
                  <p className="font-barlow text-base leading-relaxed mb-6" style={{ color: 'rgba(247,247,248,0.62)' }}>
                    See recordings of actual audits we've run for real businesses.
                    Watch exactly what we look at, what we find, and what we recommend —
                    before you decide to book your own.
                  </p>
                  <div
                    className="inline-flex items-center gap-3 font-barlow-condensed font-700 text-sm tracking-[0.18em] uppercase px-8 py-4 transition-all duration-200 group-hover:opacity-90"
                    style={{ background: SF, color: '#050508', borderRadius: 4 }}
                  >
                    Watch Real Audits →
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Secondary: Library */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-col items-center gap-3">
              <p className="font-barlow text-sm" style={{ color: 'rgba(247,247,248,0.38)' }}>
                Want to go deeper on strategy and systems?
              </p>
              <Link
                to="/library"
                className="font-barlow-condensed font-700 text-sm tracking-[0.18em] uppercase border-b pb-0.5 transition-colors duration-200 hover:text-bone"
                style={{ color: 'rgba(247,247,248,0.55)', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                Explore the Full Education Library →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-10 bg-void">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-barlow-condensed font-600 text-xs tracking-[0.22em] uppercase text-muted/50">Patterson Tech</span>
          </div>
          <p className="font-barlow text-xs text-muted/30 tracking-wide">© {new Date().getFullYear()} Patterson Tech. All rights reserved.</p>
          <p className="font-barlow text-[10px] text-muted/20 tracking-wide">Built by Patterson Tech Web Services</p>
        </div>
      </footer>
    </motion.main>
  )
}
