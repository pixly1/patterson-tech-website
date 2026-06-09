import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'

export default function BookCard({ title, description, price, buyLink = '#' }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
      {/* Book cover with tilt */}
      <div className="flex justify-center lg:justify-end">
        <Tilt
          tiltMaxAnglX={15}
          tiltMaxAngleY={15}
          glareEnable={true}
          glareMaxOpacity={0.12}
          glareColor="#ffffff"
          glarePosition="all"
          scale={1.02}
          transitionSpeed={600}
          className="w-full max-w-[260px]"
        >
          <div className="glass border border-white/12 aspect-[2/3] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Placeholder book cover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3" />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-px bg-white/30" />
              <span className="font-barlow-condensed font-800 text-xl tracking-[0.1em] uppercase text-bone leading-tight">
                {title}
              </span>
              <div className="w-12 h-px bg-white/30" />
              <span className="font-barlow text-xs text-muted/70 tracking-[0.2em] uppercase">
                Gunner Patterson
              </span>
            </div>
          </div>
        </Tilt>
      </div>

      {/* Book info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        <span className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-muted">
          Patterson Tech · Featured Release
        </span>
        <h2
          className="font-barlow-condensed font-800 text-bone leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          {title}
        </h2>
        <p className="font-barlow text-muted text-lg leading-relaxed max-w-md">
          {description}
        </p>
        <div className="flex items-center gap-6">
          <span className="font-barlow-condensed font-700 text-2xl text-bone tracking-wide">
            {price}
          </span>
          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-8 py-3 bg-white text-void hover:bg-bone/90 active:scale-95 transition-all duration-200"
          >
            Get It on Amazon →
          </a>
        </div>
        <p className="font-barlow text-xs text-muted/40 tracking-wide mt-1">
          Available in paperback and digital formats.
        </p>
      </motion.div>
    </div>
  )
}
