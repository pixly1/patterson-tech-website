import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SF = '#00FFA3'

const SITES = [
  { name: 'Brothers in Business', url: 'https://www.brothersinbusiness.org/', tag: 'Business Services' },
  { name: 'Goal Post', url: 'https://goalpost-website-zeta.vercel.app/', tag: 'Sports & Recreation' },
  { name: "Jensen's Auto Detailing", url: 'https://jensons-auto-detailing-website.vercel.app/', tag: 'Auto Detailing' },
  { name: 'M&D Landscaping', url: 'https://md-landscaping-website.vercel.app/', tag: 'Landscaping' },
]

const INDUSTRIES = [
  'Landscaping', 'Auto Detailing', 'Plumbing', 'Flooring', 'HVAC',
  'Roofing', 'Pressure Washing', 'Cleaning Services', 'Construction',
  'Electrician', 'Painting', 'Pest Control', 'Tree Service', 'Restaurant',
  'Retail', 'Health & Wellness', 'Other',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function IframeCard({ name, url, tag }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(0.44)
  const [containerH, setContainerH] = useState(360)
  const [active, setActive] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const el = containerRef.current
    if (!el) return
    const calculate = () => {
      const w = el.offsetWidth
      const s = w / 1280
      setScale(s)
      setContainerH(Math.round(900 * s))
    }
    calculate()
    const ro = new ResizeObserver(calculate)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isMobile])

  useEffect(() => {
    if (!active) return
    const handleDown = (e) => {
      if (!containerRef.current?.contains(e.target)) setActive(false)
    }
    document.addEventListener('mousedown', handleDown)
    return () => document.removeEventListener('mousedown', handleDown)
  }, [active])

  // ── Mobile card ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
      >
        {/* visual preview area */}
        <div
          style={{
            height: 180,
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, rgba(0,255,163,0.06) 0%, rgba(5,5,8,0) 55%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {/* subtle grid lines */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
            <p
              className="font-barlow-condensed font-800 text-bone"
              style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: 6 }}
            >
              {name}
            </p>
            <p className="font-barlow text-xs text-muted tracking-wide">{tag}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-barlow-condensed font-700 text-xs tracking-[0.2em] uppercase px-5 py-2.5"
            style={{
              position: 'relative', zIndex: 1,
              background: 'rgba(0,255,163,0.1)',
              border: `1px solid rgba(0,255,163,0.3)`,
              color: SF,
              borderRadius: 3,
            }}
          >
            View Live Site →
          </a>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/5">
          <p className="font-barlow text-xs text-muted/50 tracking-wide">Live website</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-barlow text-xs tracking-[0.12em] uppercase transition-opacity"
            style={{ color: SF }}
          >
            Visit →
          </a>
        </div>
      </motion.div>
    )
  }

  // ── Desktop iframe card (unchanged) ─────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border: `1px solid ${active ? 'rgba(0,255,163,0.28)' : 'rgba(255,255,255,0.08)'}`,
        background: 'rgba(255,255,255,0.02)',
        transition: 'border-color 0.3s ease',
      }}
    >
      <div
        ref={containerRef}
        style={{ height: containerH, overflow: 'hidden', position: 'relative', cursor: active ? 'default' : 'pointer' }}
        onClick={() => !active && setActive(true)}
      >
        <iframe
          src={url}
          title={name}
          loading="lazy"
          style={{
            width: 1280,
            height: 900,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: active ? 'all' : 'none',
            border: 'none',
            display: 'block',
          }}
        />

        {!active && (
          <div
            className="absolute inset-0 flex items-end justify-center pb-6"
            style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.72) 0%, rgba(5,5,8,0.08) 55%, transparent 100%)' }}
          >
            <div
              className="flex items-center gap-2 px-5 py-2.5 font-barlow-condensed font-700 text-xs tracking-[0.2em] uppercase"
              style={{ background: 'rgba(5,5,8,0.7)', border: `1px solid ${SF}44`, color: SF, borderRadius: 3 }}
            >
              Click to Explore Live Site
            </div>
          </div>
        )}

        {active && (
          <button
            onClick={(e) => { e.stopPropagation(); setActive(false) }}
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 font-barlow text-xs"
            style={{ background: 'rgba(5,5,8,0.88)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(247,247,248,0.65)', borderRadius: 3 }}
          >
            × Exit Preview
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
        <div>
          <p className="font-barlow-condensed font-700 text-bone text-base tracking-[0.05em]">{name}</p>
          <p className="font-barlow text-xs text-muted mt-0.5">{tag}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-barlow text-xs tracking-[0.12em] uppercase transition-opacity hover:opacity-70"
          style={{ color: SF }}
          onClick={(e) => e.stopPropagation()}
        >
          Visit →
        </a>
      </div>
    </motion.div>
  )
}

function FormField({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-barlow text-xs tracking-[0.12em] uppercase text-muted">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || ''}
        className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors"
        onFocus={(e) => { e.target.style.borderColor = `${SF}44` }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
      />
    </div>
  )
}

export default function Websites() {
  const [fields, setFields] = useState({
    name: '', email: '', phone: '', business: '', industry: '', colorVibe: '', hasPhotos: '', notes: '',
  })
  const [formState, setFormState] = useState('idle')

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormState('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xgobzgnj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen pt-32 pb-24"
    >
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 mb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" className="flex flex-col gap-4">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 font-barlow-condensed font-600 text-xs tracking-[0.3em] uppercase"
              style={{ color: SF }}
            >
              <span className="block w-6 h-px" style={{ background: SF }} />
              Website Development
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-barlow-condensed font-800 text-bone leading-[0.93]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Websites That Actually<br />
              <span style={{ color: SF }}>Win Clients.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="font-barlow text-lg text-muted leading-relaxed max-w-2xl">
              Every site we build is designed from scratch around your business — no templates, no filler.
              Browse our live work below. Scroll through each site right here without leaving the page.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── IFRAME GRID ────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 mb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SITES.map((site) => (
              <IframeCard key={site.url} {...site} />
            ))}
          </div>
          <p className="font-barlow text-xs text-muted/40 text-center mt-5 tracking-wide">
            Click any preview to interact · Click "Exit Preview" when done
          </p>
        </div>
      </section>

      {/* ─── DEMO FORM ──────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <div className="section-divider mb-16" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center text-center gap-6 mb-12"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 font-barlow-condensed font-600 text-xs tracking-[0.3em] uppercase"
              style={{ color: SF }}
            >
              <span className="block w-6 h-px" style={{ background: SF }} />
              Book a Demo
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-barlow-condensed font-800 text-bone leading-[0.93]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Let's Build Yours.<br />
              <span style={{ color: SF }}>Schedule a Live Demo.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-barlow text-lg text-muted leading-relaxed max-w-xl">
              Fill this out and one of our reps will reach out to lock in a time.
              We'll come to the call with mock-ups built around your business.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {formState === 'success' ? (
              <div
                className="glass p-12 text-center flex flex-col items-center gap-5"
                style={{ borderColor: 'rgba(0,255,163,0.2)', borderWidth: 1, borderStyle: 'solid' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,255,163,0.1)', border: `1.5px solid rgba(0,255,163,0.4)` }}
                >
                  <span style={{ color: SF, fontSize: 22 }}>✓</span>
                </div>
                <h3 className="font-barlow-condensed font-700 text-bone text-3xl tracking-[0.04em]">You're on the list.</h3>
                <p className="font-barlow text-muted text-base max-w-sm leading-relaxed">
                  A member of our team will reach out within 24 hours to schedule your demo call.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass flex flex-col gap-4 p-8 md:p-10"
                style={{ borderColor: 'rgba(0,255,163,0.1)', borderWidth: 1, borderStyle: 'solid' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Full Name *" name="name" value={fields.name} onChange={handleChange} required />
                  <FormField label="Email Address *" name="email" type="email" value={fields.email} onChange={handleChange} required />
                  <FormField label="Phone Number *" name="phone" type="tel" value={fields.phone} onChange={handleChange} required />
                  <FormField label="Business Name *" name="business" value={fields.business} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-barlow text-xs tracking-[0.12em] uppercase text-muted">Industry</label>
                    <select
                      name="industry"
                      value={fields.industry}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone focus:outline-none appearance-none transition-colors"
                      onFocus={(e) => { e.target.style.borderColor = `${SF}44` }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                    >
                      <option value="" style={{ background: '#050508' }}>Select your industry...</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind} style={{ background: '#050508' }}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-barlow text-xs tracking-[0.12em] uppercase text-muted">Do you have photos ready?</label>
                    <select
                      name="hasPhotos"
                      value={fields.hasPhotos}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone focus:outline-none appearance-none transition-colors"
                      onFocus={(e) => { e.target.style.borderColor = `${SF}44` }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                    >
                      <option value="" style={{ background: '#050508' }}>Select...</option>
                      <option value="yes" style={{ background: '#050508' }}>Yes, I have photos ready</option>
                      <option value="no" style={{ background: '#050508' }}>No, need help with that</option>
                      <option value="not-sure" style={{ background: '#050508' }}>Not sure yet</option>
                    </select>
                  </div>
                </div>

                <FormField
                  label="Color vibe / brand direction"
                  name="colorVibe"
                  value={fields.colorVibe}
                  onChange={handleChange}
                  placeholder="e.g. dark and modern, green and earthy, bold and clean..."
                />

                <div className="flex flex-col gap-1.5">
                  <label className="font-barlow text-xs tracking-[0.12em] uppercase text-muted">Anything else we should know?</label>
                  <textarea
                    name="notes"
                    value={fields.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Competitors you admire, things to avoid, timeline, etc."
                    className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none resize-none transition-colors"
                    onFocus={(e) => { e.target.style.borderColor = `${SF}44` }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-4 font-barlow-condensed font-700 text-base tracking-[0.18em] uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 mt-2"
                  style={{ background: SF, color: '#050508' }}
                >
                  {formState === 'submitting' ? 'Sending...' : 'Request My Demo →'}
                </button>

                {formState === 'error' && (
                  <p className="text-center font-barlow text-sm text-red-400/80">
                    Something went wrong — try again or email us directly.
                  </p>
                )}

                <p className="text-center font-barlow text-xs text-muted/40 tracking-wide">
                  We'll reach out within 24 hours to confirm your demo time.
                </p>
              </form>
            )}
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
