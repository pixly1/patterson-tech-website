import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SF = '#00FFA3'

const AGENCY_SIDE = [
  'Pays forever',
  'Lose access the day you leave',
  'No understanding of how it works',
  'Everything outsourced',
]

const PT_SIDE = [
  'Own the system',
  'Your business keeps growing',
  'Your team understands it',
  'You control everything',
]

const TIMELINE = [
  {
    n: '01',
    title: 'Discovery',
    text: "We dig into your business — where customers come from now, what's broken, and what growth actually looks like for you.",
  },
  {
    n: '02',
    title: 'Build',
    text: 'We build your customer acquisition system: website, lead capture, CRM, automations, content — every piece, wired together.',
  },
  {
    n: '03',
    title: 'Train',
    text: 'We teach someone you already trust to run it. Real training, real SOPs — until your team owns it with confidence.',
  },
  {
    n: '04',
    title: 'Support',
    text: "We stay in your corner as it runs — but your business never depends on us to keep growing.",
  },
]

const INCLUDED = [
  'PTOS Dashboard',
  'Content Calendar',
  'Analytics',
  'CRM',
  'Automation',
  'Approvals',
  'Tasks',
  'Reports',
]

const PHILOSOPHY = [
  "You shouldn't rent your marketing forever.",
  "You shouldn't have to trust an agency forever.",
  "You shouldn't lose everything if someone quits.",
  'Your business should understand its own growth.',
  'Great systems outlast great employees.',
  "Marketing shouldn't feel mysterious.",
  'AI should make your business simpler — not more confusing.',
]

const COMPONENTS = [
  'Website',
  'Lead Capture',
  'CRM',
  'Automations',
  'Content System',
  'Reporting',
  'AI',
  'Email',
  'Text',
  'Review Collection',
  'Training',
  'SOPs',
]

const TEAM_ROLES = [
  'Owner',
  'Office Manager',
  'Salesperson',
  'Marketing Assistant',
  'Family Member',
  'Operations',
]

const OWNERSHIP = [
  'Website',
  'Automations',
  'CRM',
  'Processes',
  'Accounts',
  'Data',
  'Training',
]

export default function OurSystem() {
  const navigate = useNavigate()

  function goApply() {
    navigate('/')
    setTimeout(() => {
      document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })
    }, 450)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen pt-[106px] pb-24"
    >
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-28 pt-10 pb-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <span
            className="font-barlow-condensed font-700 text-sm tracking-[0.3em] uppercase"
            style={{ color: SF }}
          >
            Our System
          </span>
          <h1
            className="font-barlow-condensed font-800 text-bone leading-[0.95]"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)' }}
          >
            How Our System Works
          </h1>
          <p className="font-barlow text-xl md:text-2xl text-muted leading-relaxed max-w-2xl">
            We don't become another monthly marketing company. We build the system,
            teach your team, and help you own it.
          </p>

          {/* Dashboard graphic placeholder — swap in real PTOS screenshot */}
          <div
            className="relative w-full max-w-3xl mt-6"
            style={{
              aspectRatio: '16/9',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(0,255,163,0.22)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span
                className="font-barlow-condensed font-800 uppercase tracking-[0.2em]"
                style={{ color: SF, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
              >
                PTOS Dashboard
              </span>
              <span className="font-barlow text-muted text-sm uppercase tracking-[0.2em]">
                Screenshot coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: DEPENDENCE VS OWNERSHIP ─────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              Most agencies create dependence.<br />
              <span style={{ color: SF }}>You deserve ownership.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div
              className="p-8 flex flex-col gap-5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
              }}
            >
              <span className="font-barlow-condensed font-800 text-2xl text-muted uppercase tracking-[0.1em]">
                Typical Agency
              </span>
              <ul className="flex flex-col gap-3">
                {AGENCY_SIDE.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-barlow text-base text-muted">
                    <span className="mt-0.5" style={{ color: 'rgba(255,80,80,0.7)' }}>✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="p-8 flex flex-col gap-5"
              style={{
                background: 'rgba(0,255,163,0.04)',
                border: '1.5px solid rgba(0,255,163,0.35)',
                borderRadius: 14,
                boxShadow: '0 0 40px rgba(0,255,163,0.08)',
              }}
            >
              <span className="font-barlow-condensed font-800 text-2xl text-bone uppercase tracking-[0.1em]">
                Patterson Tech
              </span>
              <ul className="flex flex-col gap-3">
                {PT_SIDE.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-barlow text-base text-bone/90">
                    <span className="mt-0.5" style={{ color: SF }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: TIMELINE ────────────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              Here's exactly what happens.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((s) => (
              <div
                key={s.n}
                className="glass p-8 flex flex-col gap-4"
                style={{ borderColor: 'rgba(0,255,163,0.18)', borderRadius: 14 }}
              >
                <span
                  className="font-barlow-condensed font-800"
                  style={{ color: SF, fontSize: '2.4rem', lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <h3 className="font-barlow-condensed font-800 text-bone text-3xl leading-tight">
                  {s.title}
                </h3>
                <p className="font-barlow text-base text-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT'S INCLUDED ─────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              What's actually included?
            </h2>
            <p className="font-barlow text-lg text-muted mt-4 max-w-xl mx-auto">
              We don't say "we build websites." We show you the system.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INCLUDED.map((item) => (
              <div
                key={item}
                className="glass flex items-center justify-center text-center p-6"
                style={{ borderColor: 'rgba(0,255,163,0.14)', borderRadius: 12, minHeight: 110 }}
              >
                <span className="font-barlow-condensed font-700 text-bone text-lg uppercase tracking-[0.08em]">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center font-barlow text-sm text-muted/50 mt-6">
            Dashboard screenshots coming soon — this is the real software your team will run.
          </p>
        </div>
      </section>

      {/* ─── SECTION 4: PHILOSOPHY ──────────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-24 bg-void-2">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              Why this works better.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {PHILOSOPHY.map((line) => (
              <p
                key={line}
                className="font-barlow-condensed font-700 text-bone/90 leading-snug text-center"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.1rem)' }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="text-center mt-14">
            <p
              className="font-barlow-condensed font-800 leading-tight"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', color: SF }}
            >
              The goal isn't another service.<br />The goal is ownership.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: COMPONENTS ──────────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              What we actually build.
            </h2>
            <p className="font-barlow text-lg text-muted mt-4 max-w-xl mx-auto">
              These aren't individual services. They're pieces of one system.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COMPONENTS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-5 py-4"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,255,163,0.14)',
                  borderRadius: 10,
                }}
              >
                <span style={{ color: SF }}>✔</span>
                <span className="font-barlow-condensed font-700 text-bone text-base uppercase tracking-[0.06em]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: WE TEACH YOUR TEAM ──────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-barlow-condensed font-800 text-bone leading-[0.95] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            We teach <span style={{ color: SF }}>your team.</span>
          </h2>
          <p className="font-barlow text-xl text-muted leading-relaxed max-w-xl mx-auto mb-8">
            Every system we build is taught to someone you already trust.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {TEAM_ROLES.map((role) => (
              <span
                key={role}
                className="font-barlow-condensed font-700 text-sm uppercase tracking-[0.12em] px-5 py-2.5"
                style={{
                  background: 'rgba(0,255,163,0.08)',
                  border: '1px solid rgba(0,255,163,0.25)',
                  color: '#f7f7f8',
                  borderRadius: 999,
                }}
              >
                {role}
              </span>
            ))}
          </div>

          <p
            className="font-barlow-condensed font-800 leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#f7f7f8' }}
          >
            Because your company <span style={{ color: SF }}>shouldn't depend on us.</span>
          </p>
        </div>
      </section>

      {/* ─── SECTION 7: LIFETIME OWNERSHIP ──────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-barlow-condensed font-800 text-bone leading-[0.95] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            Lifetime <span style={{ color: SF }}>ownership.</span>
          </h2>
          <p className="font-barlow text-xl text-muted leading-relaxed max-w-xl mx-auto mb-10">
            When we're done, it's yours. All of it.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {OWNERSHIP.map((item) => (
              <span
                key={item}
                className="font-barlow-condensed font-700 text-base uppercase tracking-[0.1em] px-6 py-3"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,255,163,0.22)',
                  color: '#f7f7f8',
                  borderRadius: 10,
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <p
            className="font-barlow-condensed font-800"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: SF }}
          >
            Everything.
          </p>
        </div>
      </section>

      {/* ─── SECTION 8: CTA ─────────────────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-24">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
          <h2
            className="font-barlow-condensed font-800 text-bone leading-[0.95]"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}
          >
            Ready?
          </h2>
          <button
            onClick={goApply}
            className="font-barlow-condensed font-800 tracking-[0.14em] uppercase px-14 py-6 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: SF,
              color: '#050508',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)',
              borderRadius: 10,
              boxShadow: '0 0 40px rgba(0,255,163,0.35)',
            }}
          >
            Apply to Work With Us
          </button>
          <p className="font-barlow text-sm text-muted/50">
            You're one system away from running a very different business.
          </p>
        </div>
      </section>
    </motion.main>
  )
}
