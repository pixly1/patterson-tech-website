import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" animate="visible" className="flex flex-col gap-8">
          <motion.span variants={fadeUp} custom={0} className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-muted">
            About
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-barlow-condensed font-800 text-bone leading-[0.93]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Gunner Patterson
          </motion.h1>

          <div className="section-divider" />

          <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
            {/* Photo placeholder */}
            <div className="glass aspect-square lg:aspect-auto lg:h-72 flex items-center justify-center">
              <span className="font-barlow-condensed text-xs tracking-[0.2em] uppercase text-muted/40">
                Photo
              </span>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <p className="font-barlow text-muted text-lg leading-relaxed">
                Gunner Patterson is the founder of Patterson Tech — a digital systems company built around one belief: most local service businesses don't lose because their work is bad. They lose because they're invisible online.
              </p>
              <p className="font-barlow text-muted text-base leading-relaxed">
                After years of watching great contractors, roofers, and service operators lose jobs to competitors with worse skills but better marketing, Gunner built a repeatable system that fixes the actual problem — not just the surface symptoms.
              </p>
              <p className="font-barlow text-muted text-base leading-relaxed">
                Patterson Tech now runs a full 7-agent AI operating system to deliver paid ads, lead funnels, automation, content strategy, and websites for clients across construction, roofing, and local services.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-4">
            <Link to="/#audit" className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-8 py-3 bg-white text-void hover:bg-bone/90 transition-all duration-200">
              Book a Free Audit →
            </Link>
            <Link to="/library" className="inline-block font-barlow-condensed font-600 text-sm tracking-[0.15em] uppercase px-8 py-3 border border-white/20 text-bone hover:bg-white/5 transition-all duration-200">
              Explore the Library
            </Link>
          </motion.div>
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
