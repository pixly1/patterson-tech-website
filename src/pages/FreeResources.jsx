import { useState } from 'react'
import { motion } from 'framer-motion'
import VSL from '../components/VSL'

const SF = '#00FFA3'

// Placeholder resources — swap `file` to the real downloadable (e.g. '/downloads/x.pdf')
// once the toolkits are ready.
const RESOURCES = [
  {
    title: 'Online Presence Checklist',
    blurb:
      'The exact checklist we run on every audit. See where your business is invisible online — and fix it yourself, point by point.',
    tag: 'Checklist',
    file: null,
  },
  {
    title: 'Local Ads Starter Toolkit',
    blurb:
      'Everything you need to launch your first paid ads without burning money: targeting, budgets, and ready-to-steal ad copy.',
    tag: 'Toolkit',
    file: null,
  },
  {
    title: 'Lead Follow-Up Scripts',
    blurb:
      'Word-for-word call, text, and email scripts that turn missed calls and cold leads into booked jobs.',
    tag: 'Scripts',
    file: null,
  },
]

export default function FreeResources() {
  const [email, setEmail] = useState('')
  const [signupState, setSignupState] = useState('idle')

  async function handleSignup(e) {
    e.preventDefault()
    setSignupState('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xykaprnl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, signup: 'Newsletter + Bi-Weekly Webinar Access' }),
      })
      setSignupState(res.ok ? 'success' : 'error')
    } catch {
      setSignupState('error')
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen pt-[106px] pb-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center pt-8 mb-14">
          <h1
            className="font-barlow-condensed font-800 text-bone leading-[0.95]"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}
          >
            FREE <span style={{ color: SF }}>Resources</span>
          </h1>
          <p className="font-barlow text-lg md:text-xl text-muted mt-4 max-w-2xl mx-auto">
            Toolkits, checklists, and scripts we actually use — free to download, no strings attached.
          </p>
        </div>

        {/* Webinar VSL + newsletter signup */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-16">
          {/* Vertical selfie VSL — drop the recording at public/webinar-vsl.mp4 */}
          <VSL src="/webinar-vsl.mp4" vertical />

          <div
            className="glass p-8 md:p-10 w-full max-w-md text-center"
            style={{ borderColor: 'rgba(0,255,163,0.2)', borderRadius: 16 }}
          >
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95] mb-3"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)' }}
            >
              Newsletter + <span style={{ color: SF }}>Bi-Weekly Webinar Access</span>
            </h2>
            <p className="font-barlow text-base text-muted leading-relaxed mb-8">
              Sign up once, get both: our newsletter with what's actually working right now, plus an
              invite to every bi-weekly live webinar.
            </p>

            {signupState === 'success' ? (
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,255,163,0.1)', border: '1.5px solid rgba(0,255,163,0.4)' }}
                >
                  <span style={{ color: SF, fontSize: 20 }}>✓</span>
                </div>
                <p className="font-barlow-condensed font-700 text-bone text-xl">
                  You're on the list. See you at the next webinar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-3 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none"
                  style={{ borderRadius: 6 }}
                />
                <button
                  type="submit"
                  disabled={signupState === 'submitting'}
                  className="font-barlow-condensed font-800 text-sm tracking-[0.16em] uppercase px-8 py-3 transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{ background: SF, color: '#050508', borderRadius: 6 }}
                >
                  {signupState === 'submitting' ? 'Signing Up...' : 'Sign Me Up'}
                </button>
              </form>
            )}
            {signupState === 'error' && (
              <p className="font-barlow text-sm text-red-400/80 mt-3">
                Something went wrong — try again in a second.
              </p>
            )}
          </div>
        </div>

        {/* Downloadable resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {RESOURCES.map((r) => (
            <div
              key={r.title}
              className="glass p-8 flex flex-col gap-4"
              style={{ borderColor: 'rgba(0,255,163,0.18)', borderRadius: 14 }}
            >
              <span
                className="self-start font-barlow-condensed font-700 text-xs tracking-[0.24em] uppercase px-3 py-1"
                style={{ background: 'rgba(0,255,163,0.12)', color: SF, borderRadius: 4 }}
              >
                {r.tag}
              </span>
              <h2 className="font-barlow-condensed font-800 text-bone text-2xl leading-tight">
                {r.title}
              </h2>
              <p className="font-barlow text-sm text-muted leading-relaxed flex-1">{r.blurb}</p>
              {r.file ? (
                <a
                  href={r.file}
                  download
                  className="text-center font-barlow-condensed font-700 text-sm tracking-[0.16em] uppercase px-6 py-3 transition-all duration-200 hover:opacity-90"
                  style={{ background: SF, color: '#050508', borderRadius: 6 }}
                >
                  Download Free →
                </a>
              ) : (
                <span
                  className="text-center font-barlow-condensed font-700 text-sm tracking-[0.16em] uppercase px-6 py-3"
                  style={{
                    border: '1px solid rgba(0,255,163,0.3)',
                    color: 'rgba(0,255,163,0.6)',
                    borderRadius: 6,
                  }}
                >
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </motion.main>
  )
}
