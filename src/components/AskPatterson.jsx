import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard'

const SF = '#00FFA3'

/* ═══════════════════════════════════════════════════════════════════════════
   ASK PATTERSON TECH — short-form video answer search
   ───────────────────────────────────────────────────────────────────────────
   HOW THIS WORKS
   This is a keyword search over a library of short-form videos (the Instagram
   Q&A / scenario series). A visitor types a problem or scenario in plain
   English, and the search surfaces the short videos whose keywords match.

   The search logic is ALREADY built and working. It just has no videos to
   match against yet — so every search currently shows the "coming soon" state.
   The moment you add entries to SHORT_FORM_VIDEOS below, search starts working
   automatically. No other code changes needed.

   ───────────────────────────────────────────────────────────────────────────
   HOW TO ADD A VIDEO (do this for each new short-form video you publish)
   Add an object to the SHORT_FORM_VIDEOS array with this shape:

   {
     id: 'reviews-google',                       // any unique string
     title: 'How do I get more Google reviews?',  // the question/scenario
     description: 'A quick, repeatable system to ask for and collect reviews.',
     thumbnail: '/thumbnails/reviews.jpg',         // image URL (or import an asset)
     videoUrl: 'https://www.instagram.com/reel/XXXX/', // link to the video
     duration: '0:48',                             // e.g. '0:48'
     category: 'Reputation',                       // short label shown on the card
     keywords: [                                   // ← the most important part:
       'google reviews', 'reviews', 'reputation',  //   words/phrases people might
       'star rating', 'testimonials', 'feedback',  //   type when they have this
     ],                                            //   problem. Add generously.
   }

   TIP: keywords drive matching. Think about how a real customer would describe
   the problem ("not enough reviews", "bad reputation", "5 stars") and add those
   phrases. Title and description are also searched, but keywords matter most.
   ═══════════════════════════════════════════════════════════════════════════ */

const SHORT_FORM_VIDEOS = [
  // ⬇️ Add your short-form video objects here. Empty for now — see docs above.
]

// Common filler words ignored when matching, so "how do I get more reviews"
// effectively searches for "get more reviews".
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'how', 'do', 'i', 'my', 'me', 'we', 'to', 'for', 'of', 'is',
  'are', 'in', 'on', 'and', 'or', 'with', 'get', 'got', 'can', 'should', 'what',
  'why', 'when', 'about', 'more', 'help', 'need', 'want', 'business', 'it', 'you',
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
}

/**
 * Score every short-form video against the query and return matches, best first.
 * - keyword hits are weighted heaviest, then title, then description.
 * - returns [] when nothing meaningfully matches.
 */
function searchVideos(query) {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []

  return SHORT_FORM_VIDEOS
    .map((video) => {
      const keywordHay = (video.keywords || []).join(' ').toLowerCase()
      const titleHay = (video.title || '').toLowerCase()
      const descHay = (video.description || '').toLowerCase()

      let score = 0
      for (const t of tokens) {
        if (keywordHay.includes(t)) score += 3
        if (titleHay.includes(t)) score += 2
        if (descHay.includes(t)) score += 1
      }
      return { video, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.video)
}

// A few example prompts to show people the kind of thing they can ask.
const EXAMPLE_PROMPTS = [
  'How do I get more Google reviews?',
  'My ads get clicks but no calls',
  'Following up with leads faster',
  'Not showing up on Google maps',
]

export default function AskPatterson() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('') // the query that was actually searched

  const results = useMemo(() => (submitted ? searchVideos(submitted) : []), [submitted])
  const hasSearched = submitted.trim().length > 0

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(query.trim())
  }

  function runExample(prompt) {
    setQuery(prompt)
    setSubmitted(prompt)
  }

  return (
    <section className="px-6 md:px-16 lg:px-24 py-20 border-b border-white/5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center flex flex-col items-center gap-3 mb-8"
        >
          <span className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-seafoam/60">
            Ask Patterson Tech
          </span>
          <h2
            className="font-barlow-condensed font-800 text-bone leading-[0.95]"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
          >
            Have a Specific Problem?{' '}
            <span style={{ color: SF }}>Search for the Answer.</span>
          </h2>
          <p className="font-barlow text-muted text-base leading-relaxed max-w-xl">
            Describe a situation or problem your business is facing in plain English.
            We'll pull up the short videos that answer it — new ones are added all the time.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50"
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. My website gets traffic but nobody calls…"
              className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-4 text-base font-barlow text-bone placeholder:text-muted/50 focus:outline-none transition-colors"
              onFocus={(e) => { e.target.style.borderColor = `${SF}55` }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>
          <button
            type="submit"
            className="font-barlow-condensed font-700 text-sm tracking-[0.15em] uppercase px-8 py-4 transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
            style={{ background: SF, color: '#050508' }}
          >
            Search
          </button>
        </motion.form>

        {/* Example prompts (only before a search is run) */}
        {!hasSearched && (
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            <span className="font-barlow text-xs text-muted/40 w-full text-center mb-1">Try one of these:</span>
            {EXAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => runExample(p)}
                className="font-barlow text-xs text-muted/80 px-3 py-1.5 border border-white/10 rounded-full hover:border-white/30 hover:text-bone transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="mt-10">
            {results.length > 0 ? (
              <>
                <p className="font-barlow text-sm text-muted/70 mb-5">
                  Showing {results.length} {results.length === 1 ? 'answer' : 'answers'} for
                  “<span className="text-bone">{submitted}</span>”
                </p>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {results.map((v) => (
                    <motion.div
                      key={v.id}
                      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                    >
                      <VideoCard
                        title={v.title}
                        description={v.description}
                        duration={v.duration}
                        category={v.category}
                        youtubeUrl={v.videoUrl}
                        thumbnail={v.thumbnail}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              /* EMPTY STATE — shown for now while the short-form library is empty,
                 and also any time a search has no matches. */
              <div className="glass text-center py-14 px-6 flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                  style={{ background: 'rgba(0,255,163,0.1)', border: `1px solid rgba(0,255,163,0.3)` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SF} strokeWidth="2">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h3 className="font-barlow-condensed font-700 text-bone text-xl tracking-[0.02em]">
                  Video answers are coming soon
                </h3>
                <p className="font-barlow text-muted text-sm max-w-sm leading-relaxed">
                  We're building out a library of short videos that answer real business
                  questions and scenarios. No content available for that yet — check back soon.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
