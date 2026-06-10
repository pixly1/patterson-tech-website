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
    title: 'Campaign Strategy & Setup',
    desc: 'Full build-out of your ad account — audiences, objectives, budget allocation, and campaign structure built for your market.',
  },
  {
    title: 'Ad Copy & Creative Direction',
    desc: 'Hooks, headlines, and creative briefs that stop the scroll. We write copy that speaks directly to your ideal client.',
  },
  {
    title: 'Dedicated Landing Pages',
    desc: 'The ad is only half the job. We build conversion-focused landing pages that turn clicks into calls and form fills.',
  },
  {
    title: 'Audience Targeting & Retargeting',
    desc: 'Cold audiences, lookalikes, and retargeting sequences that keep your business in front of people until they\'re ready.',
  },
  {
    title: 'Lead Tracking & Reporting',
    desc: 'Clear dashboards showing cost-per-lead, conversion rates, and what\'s working — in plain language, not agency speak.',
  },
  {
    title: 'Ongoing Optimization',
    desc: 'Campaigns are tested and refined every week. We kill what\'s not working and double down on what is.',
  },
]

const HOW_IT_WORKS = [
  {
    num: '01',
    heading: 'Audit & Strategy Call',
    body: 'We start with a deep look at your market, your competitors, and what your ideal client actually looks like. Then we build a campaign strategy before we spend a dollar.',
  },
  {
    num: '02',
    heading: 'Build & Launch',
    body: 'Ad copy, creatives, landing page, and full campaign setup — done for you. We launch once everything is built to convert, not just to run.',
  },
  {
    num: '03',
    heading: 'Test, Learn & Scale',
    body: 'The first few weeks are about data. We test variables, read the results, and optimize. Once we find what works, we scale it.',
  },
  {
    num: '04',
    heading: 'Weekly Reporting',
    body: 'You get a clear, jargon-free report every week. Leads generated, cost per lead, and what we\'re adjusting next. Full transparency.',
  },
]

export default function PaidAds() {
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
              Paid Ads & Lead Generation
            </motion.span>
            <motion.h1
              variants={wipeIn}
              className="font-barlow-condensed font-800 text-bone leading-[0.93]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Every Dollar Has a Path<br />
              <span style={{ color: SF }}>to a Booked Job.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="font-barlow text-lg text-muted leading-relaxed max-w-2xl">
              Meta and Google campaigns built around your ideal client. Full stack — audience, creative, landing page, lead form, and follow-up. No spend without a strategy.
            </motion.p>
          </motion.div>

          <div className="section-divider" />
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 mb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3 mb-12"
          >
            <motion.span variants={fadeUp} custom={0} className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-muted">
              How It Works
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-barlow-condensed font-800 text-bone leading-[0.94]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
            >
              Strategy Before Spend.
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-b border-white/5"
              >
                <div className="flex items-start gap-4">
                  <span className="font-barlow-condensed font-700 text-5xl text-white/6 leading-none select-none">{step.num}</span>
                  <h3 className="font-barlow-condensed font-700 text-lg tracking-[0.04em] text-bone mt-1">{step.heading}</h3>
                </div>
                <p className="font-barlow text-muted text-base leading-relaxed md:col-span-2">{step.body}</p>
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
              The Full Stack. Nothing Left Out.
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
              Let's Find Out What's Possible.<br />
              <span style={{ color: SF }}>Start With a Free Audit.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-barlow text-muted text-lg leading-relaxed max-w-lg">
              We'll look at your market, your competitors, and what a realistic cost-per-lead looks like for your business — before you spend anything.
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
