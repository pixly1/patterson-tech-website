import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    num: '01',
    title: 'Paid Ads & Lead Generation',
    desc: 'Facebook and Meta campaigns built around your ideal client. Full stack: audience, creative, landing page, lead form, and follow-up. Every dollar has a path to a booked job.',
    items: ['Campaign strategy & setup', 'Ad copy & creative briefing', 'Landing page design', 'Lead form optimization'],
  },
  {
    num: '02',
    title: 'Websites & Funnels',
    desc: 'Conversion-focused websites and landing pages built to turn visitors into callers. No templates. No filler. Built for speed and mobile.',
    items: ['Homepage & multi-page builds', 'Dedicated landing pages', 'Lead capture & form integration', 'Mobile-first, fast-loading'],
  },
  {
    num: '03',
    title: 'Automation & Follow-Up',
    desc: 'GoHighLevel systems that respond in seconds and follow up for a full week. Built so no lead goes cold while you\'re on the job.',
    items: ['Auto-text sequences', '7-day SMS + email workflows', 'CRM setup & lead tracking', 'Appointment booking integration'],
  },
  {
    num: '04',
    title: 'Branding & Online Credibility',
    desc: 'GMB optimization, social profiles, review strategy, and visual identity — everything that makes your business look as good online as it is in person.',
    items: ['Google Business Profile', 'Social profile overhaul', 'Review generation strategy', 'Brand kit & visual direction'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
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
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" className="flex flex-col gap-4 mb-16">
          <motion.span variants={fadeUp} custom={0} className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-muted">
            Services
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-barlow-condensed font-800 text-bone leading-[0.93]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Everything You Need to Win Online.
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="font-barlow text-muted text-lg leading-relaxed max-w-2xl">
            No retainers for things that don't work. No generic packages. Every service is built around one goal: more qualified leads and booked jobs.
          </motion.p>
        </motion.div>

        <div className="section-divider mb-16" />

        <div className="flex flex-col gap-0">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 border-b border-white/5"
            >
              <div className="flex items-start gap-4">
                <span className="font-barlow-condensed font-700 text-5xl text-white/6 leading-none select-none">
                  {service.num}
                </span>
                <h2 className="font-barlow-condensed font-700 text-xl tracking-[0.05em] text-bone mt-1">
                  {service.title}
                </h2>
              </div>
              <div className="lg:col-span-2 flex flex-col gap-4">
                <p className="font-barlow text-muted text-base leading-relaxed">{service.desc}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                      <span className="font-barlow text-sm text-muted/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center flex flex-col items-center gap-4"
        >
          <p className="font-barlow text-muted text-base">
            Not sure what you need? Start with the free audit.
          </p>
          <Link
            to="/#audit"
            className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-10 py-4 bg-white text-void hover:bg-bone/90 transition-all duration-200"
          >
            Book Your Free Audit →
          </Link>
          <p className="font-barlow text-xs text-muted/40">
            Free · 30 minutes · No pitch. No obligation.
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
