import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SF = '#00FFA3'

export default function Services() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">

        {/* ─── HERO: THE SYSTEM ───────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h1
            className="font-barlow-condensed font-800 text-bone leading-[0.95] mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)' }}
          >
            It All Runs On <span style={{ color: SF }}>One System.</span>
          </h1>
          <p className="font-barlow text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
            We don't become another monthly marketing company. We build the system,
            teach your team, and help you own it.
          </p>

          {/* PTOS dashboard screenshot placeholder */}
          <div
            className="relative w-full max-w-3xl mx-auto"
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

        {/* ─── AGENCY COMPARISON ──────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2
            className="font-barlow-condensed font-800 text-bone leading-[0.95] text-center mb-10"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            Most agencies create dependence.<br />
            <span style={{ color: SF }}>You deserve ownership.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {[
                  'Monthly retainers that never end — you pay forever',
                  'Lose access the day you leave',
                  'No understanding of how it works',
                  'Everything outsourced',
                ].map((item) => (
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
                {[
                  'Pay once — access the system forever',
                  'Your business keeps growing',
                  'Your team understands it',
                  'You control everything',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-barlow text-base text-bone/90">
                    <span className="mt-0.5" style={{ color: SF }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── THE PROCESS ────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2
            className="font-barlow-condensed font-800 text-bone leading-[0.95] text-center mb-12"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
          >
            Here's exactly what happens.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Discovery', text: "We dig into your business — where customers come from now, and what's holding growth back." },
              { n: '02', title: 'Build', text: 'We build your system: website, lead capture, automations, content — every piece wired together.' },
              { n: '03', title: 'Train', text: 'We teach someone you already trust to run it. Real training, real SOPs.' },
              { n: '04', title: 'Support', text: 'We stay in your corner — but your business never depends on us to keep growing.' },
            ].map((s) => (
              <div
                key={s.n}
                className="glass p-7 flex flex-col gap-3"
                style={{ borderColor: 'rgba(0,255,163,0.18)', borderRadius: 14 }}
              >
                <span className="font-barlow-condensed font-800" style={{ color: SF, fontSize: '2rem', lineHeight: 1 }}>
                  {s.n}
                </span>
                <h3 className="font-barlow-condensed font-800 text-bone text-2xl leading-tight">{s.title}</h3>
                <p className="font-barlow text-sm text-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── PRICING STATEMENT ──────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <div
            className="p-10 md:p-12"
            style={{
              background: 'rgba(0,255,163,0.04)',
              border: '1.5px solid rgba(0,255,163,0.3)',
              borderRadius: 16,
              boxShadow: '0 0 40px rgba(0,255,163,0.07)',
            }}
          >
            <h2
              className="font-barlow-condensed font-800 text-bone leading-[0.95] mb-4"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
            >
              One-time purchase.<br />
              <span style={{ color: SF }}>One small, cheap subscription.</span>
            </h2>
            <p className="font-barlow text-base text-muted leading-relaxed max-w-lg mx-auto">
              You buy the system once. A small maintenance subscription keeps your PTOS
              running, updated, and supported. No retainers. No endless contracts.
              That's it.
            </p>
          </div>

          {/* Done-for-you option */}
          <div
            className="p-8 md:p-10 mt-8 text-center"
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
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' }), 100)}
              className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-90"
              style={{ border: `2px solid ${SF}`, color: SF, borderRadius: 8 }}
            >
              Have Us Run It For You →
            </Link>
          </div>

          {/* Ownership statement */}
          <p
            className="font-barlow-condensed font-800 text-bone leading-snug mt-14"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
          >
            Every system we build is taught to someone you already trust.<br />
            <span style={{ color: SF }}>And when we're done — it's yours. Everything.</span>
          </p>
        </div>

        {/* ─── BOTTOM CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <p className="font-barlow text-muted text-base">
            Ready to see what this looks like for your business?
          </p>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-90"
            style={{ background: SF, color: '#050508' }}
          >
            Apply to Work With Us →
          </Link>
          <p className="font-barlow text-xs text-muted/40">
            Free · 15 minutes · No pitch. No obligation.
          </p>
        </motion.div>
      </div>
    </motion.main>
  )
}
