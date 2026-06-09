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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors md:col-span-2"
            />
          </div>
          <textarea
            placeholder="Reason for contact"
            rows={4}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-barlow text-bone placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors mb-5 resize-none"
          />
          <button
            className="w-full py-4 font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-200"
            style={{ background: SF, color: '#050508' }}
          >
            Send Message →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col gap-2"
        >
          <p className="font-barlow text-sm text-muted/60">Prefer to reach out directly?</p>
          <a
            href="mailto:gunnercpatterson@gmail.com"
            className="font-barlow-condensed font-600 text-base tracking-[0.08em] text-muted hover:text-bone transition-colors"
          >
            gunnercpatterson@gmail.com
          </a>
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
