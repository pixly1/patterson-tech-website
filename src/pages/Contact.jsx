import { useState } from 'react'
import { motion } from 'framer-motion'

const SF = '#00FFA3'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', phone: '', email: '', reason: '' })
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
        body: JSON.stringify({ ...fields, form: 'Contact Page' }),
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
      className="bg-void min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" animate="visible" className="flex flex-col gap-4 mb-16">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase"
            style={{ color: SF }}
          >
            — Get in Touch
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-barlow-condensed font-800 text-bone leading-[0.93]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Contact Our Team.
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="font-barlow text-muted text-lg leading-relaxed max-w-xl">
            Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <div className="section-divider mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass p-8 md:p-12 max-w-2xl"
        >
          {formState === 'success' ? (
            <div className="text-center flex flex-col items-center gap-4 py-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,255,163,0.1)', border: '1.5px solid rgba(0,255,163,0.4)' }}
              >
                <span style={{ color: SF, fontSize: 20 }}>✓</span>
              </div>
              <p className="font-barlow-condensed font-700 text-bone text-2xl">Message sent.</p>
              <p className="font-barlow text-muted text-base">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors md:col-span-2"
                />
              </div>
              <textarea
                name="reason"
                value={fields.reason}
                onChange={handleChange}
                placeholder="Reason for contact"
                rows={4}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors mb-5 resize-none"
              />
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full py-4 font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
                style={{ background: SF, color: '#050508' }}
              >
                {formState === 'submitting' ? 'Sending...' : 'Send Message →'}
              </button>
              {formState === 'error' && (
                <p className="text-center font-barlow text-sm text-red-400/80 mt-3">
                  Something went wrong — try again or email us directly.
                </p>
              )}
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col gap-2"
        >
          <p className="font-barlow text-sm text-muted/60">Prefer to reach out directly?</p>
          <a
            href="mailto:Pattersontech@thefutureofbusinesses.com"
            className="font-barlow-condensed font-600 text-base tracking-[0.08em] text-muted hover:text-bone transition-colors"
          >
            Pattersontech@thefutureofbusinesses.com
          </a>
        </motion.div>
      </div>
    </motion.main>
  )
}
