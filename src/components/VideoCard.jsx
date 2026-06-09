import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'

export default function VideoCard({ title, description, duration, category, youtubeUrl = '#', thumbnail = null }) {
  const handleClick = () => {
    if (youtubeUrl && youtubeUrl !== '#') {
      window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={false}
      scale={1.01}
      transitionSpeed={500}
      className="h-full"
    >
      <motion.div
        onClick={handleClick}
        className="glass glass-hover rounded-sm overflow-hidden flex flex-col h-full cursor-pointer group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video bg-white/4 flex-shrink-0 overflow-hidden">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/6 to-white/2 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {/* Duration tag */}
          <span className="absolute bottom-2 right-2 font-barlow-condensed font-600 text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 bg-black/60 text-white/80">
            {duration}
          </span>
          {/* Play overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-4 flex-1">
          <span className="font-barlow-condensed font-600 text-[10px] tracking-[0.2em] uppercase text-muted/60">
            {category}
          </span>
          <h3 className="font-barlow font-600 text-sm text-bone leading-snug group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="font-barlow text-xs text-muted leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </motion.div>
    </Tilt>
  )
}
