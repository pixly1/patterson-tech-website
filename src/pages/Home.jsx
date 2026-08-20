import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import VSL from '../components/VSL'

const SF = '#00FFA3'

// Each card is a full-size image (same footprint as the VSL). Drop the finished
// step graphics in and set `image` to the imported asset.
// `progress` fills the bar pinned to the bottom of each card.
const STEPS = [
  { title: 'Discover', image: null, progress: 25 },
  { title: 'Build', image: null, progress: 50 },
  { title: 'Train', image: null, progress: 75 },
  { title: 'Launch', image: null, progress: 100 },
]

function scrollToForm() {
  document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' })
  const [formState, setFormState] = useState('idle')

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormState('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xykaprnl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  const inputClass =
    'bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors'

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-void min-h-screen pt-[106px]"
    >
      {/* ─── HERO: HEADER + SUBHEADER + VSL ─────────────────────── */}
      <section className="px-6 md:px-16 lg:px-28 pt-5 md:pt-8 pb-16">
        <div className="max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-6">
          <h1
            className="font-barlow-condensed font-800 text-bone leading-[0.95]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.6rem)' }}
          >
            More Customers.<br />
            <span style={{ color: SF }}>Zero Headache.</span>
          </h1>
          <p className="font-barlow text-xl md:text-2xl text-muted leading-relaxed max-w-2xl">
            We build the websites, ads, and systems that make local businesses
            impossible to ignore — while you stay focused on the work.
          </p>

          <div className="w-full mt-6">
            <VSL />
          </div>

          <button
            onClick={scrollToForm}
            className="mt-8 font-barlow-condensed font-800 tracking-[0.14em] uppercase px-16 py-6 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: SF,
              color: '#050508',
              fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)',
              borderRadius: 10,
              boxShadow: '0 0 40px rgba(0,255,163,0.35)',
            }}
          >
            Start Today
          </button>
        </div>
      </section>

      {/* ─── THE PROCESS ────────────────────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-14">
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Here's How It Works
            </h2>
            <p className="font-barlow text-lg text-muted mt-4 max-w-xl mx-auto">
              No confusion, no runaround. Four steps from where you are now to a
              business that grows itself.
            </p>
          </div>

          <div className="flex flex-col gap-10 max-w-4xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s.title} className="w-full">
                <div className="flex items-baseline justify-center gap-4 mb-4">
                  <span
                    className="font-barlow-condensed font-800 leading-none"
                    style={{ color: 'rgba(0,255,163,0.35)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="font-barlow-condensed font-800 uppercase tracking-[0.22em] leading-none"
                    style={{ color: SF, fontSize: 'clamp(1.6rem, 3.6vw, 2.6rem)' }}
                  >
                    {s.title}
                  </h3>
                </div>

                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: '16/9',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(0,255,163,0.22)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 0 40px rgba(0,255,163,0.06)',
                  }}
                >
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-barlow text-muted text-sm uppercase tracking-[0.2em]">
                        Image coming soon
                      </span>
                    </div>
                  )}

                  {/* Progress bar — pinned to the bottom edge, fills further each step */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: 4, background: 'rgba(255,255,255,0.07)' }}
                  >
                    <div
                      style={{
                        width: `${s.progress}%`,
                        height: '100%',
                        background: SF,
                        boxShadow: '0 0 12px rgba(0,255,163,0.55)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Learn / Resources buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14">
            <Link
              to="/library"
              className="font-barlow-condensed font-700 tracking-[0.14em] uppercase px-10 py-4 text-center transition-all duration-200 hover:opacity-90"
              style={{
                border: `2px solid ${SF}`,
                color: SF,
                borderRadius: 8,
                fontSize: '1.1rem',
              }}
            >
              Get Educated
            </Link>
            <Link
              to="/free-resources"
              className="font-barlow-condensed font-700 tracking-[0.14em] uppercase px-10 py-4 text-center transition-all duration-200 hover:opacity-90"
              style={{
                border: '2px solid rgba(247,247,248,0.35)',
                color: '#f7f7f8',
                borderRadius: 8,
                fontSize: '1.1rem',
              }}
            >
              Get Free Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ─── THE FORM ───────────────────────────────────────────── */}
      <section id="audit" className="relative px-6 md:px-16 lg:px-28 py-24">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-10">
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Apply to <span style={{ color: SF }}>Work With Us</span>
            </h2>
            <p className="font-barlow text-lg text-muted mt-4">
              Tell us a little about your business. We'll reach out within 24 hours.
            </p>
          </div>

          {formState === 'success' ? (
            <div
              className="glass p-12 text-center flex flex-col items-center gap-5"
              style={{ borderColor: 'rgba(0,255,163,0.2)', borderRadius: 14 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,255,163,0.1)', border: '1.5px solid rgba(0,255,163,0.4)' }}
              >
                <span style={{ color: SF, fontSize: 22 }}>✓</span>
              </div>
              <h3 className="font-barlow-condensed font-700 text-bone text-2xl tracking-[0.04em]">
                Got it. You're in.
              </h3>
              <p className="font-barlow text-muted text-base max-w-xs leading-relaxed">
                We'll reach out within 24 hours to get started.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass p-8 md:p-10 flex flex-col gap-4"
              style={{ borderColor: 'rgba(0,255,163,0.12)', borderRadius: 14 }}
            >
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className={inputClass}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className={inputClass}
                />
                <input
                  type="tel"
                  name="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className={inputClass}
                />
              </div>
              <textarea
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="What's going on with your business?"
                rows={3}
                className={`${inputClass} w-full resize-none`}
              />
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full py-5 font-barlow-condensed font-800 text-lg tracking-[0.18em] uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                style={{ background: SF, color: '#050508', borderRadius: 8 }}
              >
                {formState === 'submitting' ? 'Sending...' : 'Apply to Work With Us →'}
              </button>
              {formState === 'error' && (
                <p className="text-center font-barlow text-sm text-red-400/80">
                  Something went wrong — try again or reach out directly.
                </p>
              )}
            </form>
          )}

          {/* Done-for-you option */}
          <div
            className="p-8 md:p-10 mt-10 text-center"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 16,
            }}
          >
            <span
              className="inline-block font-barlow-condensed font-700 text-xs tracking-[0.24em] uppercase px-3 py-1 mb-4"
              style={{ background: 'rgba(0,255,163,0.12)', color: SF, borderRadius: 4 }}
            >
              Optional
            </span>
            <h3
              className="font-barlow-condensed font-800 text-bone leading-[0.95] mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
            >
              Rather have us <span style={{ color: SF }}>run it for you?</span>
            </h3>
            <p className="font-barlow text-base text-muted leading-relaxed max-w-lg mx-auto mb-7">
              Don't want to touch the dashboard? We've got you. You still get set up on
              PTOS the exact same way — but our team runs it for you, month to month.
              Your content, your leads, your follow-up: handled.
            </p>
            <button
              onClick={scrollToForm}
              className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-90"
              style={{ border: `2px solid ${SF}`, color: SF, borderRadius: 8 }}
            >
              Have Us Run It For You →
            </button>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
