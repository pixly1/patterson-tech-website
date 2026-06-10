import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SF = '#00FFA3'

const SERVICES = [
  {
    num: '01',
    title: 'Organic Social Media',
    headline: 'Build Presence. Own Your Feed.',
    desc: 'Consistent, on-brand content that builds trust and keeps your business top-of-mind — without paid spend. We handle strategy, copy, and posting so you can focus on the work.',
    items: ['Content strategy & planning', 'Platform-specific copy & creative', 'Consistent posting schedule', 'Engagement & community growth'],
    path: '/services/social-media',
  },
  {
    num: '02',
    title: 'Quality Website Development',
    headline: 'Sites That Actually Win Clients.',
    desc: 'Custom-designed, mobile-first websites built to turn visitors into callers. No templates. No filler. Every site is designed from scratch around your business.',
    items: ['100% custom design — no templates', 'Mobile-first & fast-loading', 'Lead capture & form integration', 'Built for search visibility'],
    path: '/services/websites',
  },
  {
    num: '03',
    title: 'Paid Ads & Lead Generation',
    headline: 'Every Dollar Has a Path to a Job.',
    desc: 'Meta and Google campaigns built around your ideal client. Full stack: audience, creative, landing page, lead form, and follow-up. No spend without a strategy.',
    items: ['Campaign strategy & setup', 'Ad copy & creative direction', 'Dedicated landing pages', 'Lead tracking & weekly reporting'],
    path: '/services/paid-ads',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const wipeIn = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1, clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
}

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

        {/* ─── HEADER ─────────────────────────────────────────────── */}
        <motion.div initial="hidden" animate="visible" className="flex flex-col gap-4 mb-16">
          <motion.span variants={fadeUp} custom={0} className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-muted">
            Services
          </motion.span>
          <motion.h1
            variants={wipeIn}
            className="font-barlow-condensed font-800 text-bone leading-[0.93]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Three Ways We Help You<br />
            <span style={{ color: SF }}>Win Online.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="font-barlow text-muted text-lg leading-relaxed max-w-2xl">
            No generic packages. No retainers for things that don't work. Each service is built around one goal — more qualified leads and booked jobs.
          </motion.p>
        </motion.div>

        <div className="section-divider mb-16" />

        {/* ─── SERVICE CARDS ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-20">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group glass glass-hover flex flex-col gap-0 overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              {/* card top bar accent */}
              <div
                className="h-px w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, transparent, rgba(0,255,163,0.0) 50%, transparent)` }}
              />

              <div className="flex flex-col gap-5 p-7 pb-6 flex-1">
                {/* number */}
                <span className="font-barlow-condensed font-700 text-sm tracking-[0.18em] text-muted/50">
                  {service.num}
                </span>

                {/* title + headline */}
                <div className="flex flex-col gap-2">
                  <h2 className="font-barlow-condensed font-800 text-bone leading-[0.95]" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)' }}>
                    {service.title}
                  </h2>
                  <p className="font-barlow-condensed font-600 text-sm tracking-[0.06em]" style={{ color: SF }}>
                    {service.headline}
                  </p>
                </div>

                {/* description */}
                <p className="font-barlow text-sm text-muted leading-relaxed">
                  {service.desc}
                </p>

                {/* features */}
                <ul className="flex flex-col gap-2 flex-1">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'rgba(0,255,163,0.5)' }} />
                      <span className="font-barlow text-xs text-muted/75 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-7 pb-7">
                <Link
                  to={service.path}
                  className="group/link flex items-center justify-between w-full py-3.5 px-5 font-barlow-condensed font-700 text-xs tracking-[0.18em] uppercase transition-all duration-200"
                  style={{
                    background: 'rgba(0,255,163,0.07)',
                    border: '1px solid rgba(0,255,163,0.18)',
                    color: SF,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,163,0.14)'
                    e.currentTarget.style.borderColor = 'rgba(0,255,163,0.35)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,255,163,0.07)'
                    e.currentTarget.style.borderColor = 'rgba(0,255,163,0.18)'
                  }}
                >
                  <span>Explore Service</span>
                  <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
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
            Not sure what you need? Start with the free audit.
          </p>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-10 py-4 transition-all duration-200 hover:opacity-90"
            style={{ background: SF, color: '#050508' }}
          >
            Book Your Free Audit →
          </Link>
          <p className="font-barlow text-xs text-muted/40">
            Free · 15 minutes · No pitch. No obligation.
          </p>
        </motion.div>
      </div>

      <footer className="border-t border-white/5 mt-24 pt-8">
        <p className="font-barlow text-[10px] text-muted/25 tracking-wide text-center">
          Built by Patterson Tech Web Services
        </p>
      </footer>
    </motion.main>
  )
}
