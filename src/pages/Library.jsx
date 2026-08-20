import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import BookCard from '../components/BookCard'
import VideoCard from '../components/VideoCard'
import AskPatterson from '../components/AskPatterson'

const BOOK = {
  title: 'The Future of Business',
  description: 'A no-fluff blueprint for local service businesses ready to stop guessing and start generating consistent, qualified leads. Covers paid ads, landing pages, fast follow-up, and the exact system Patterson Tech uses with every client.',
  price: '$29.99',
  buyLink: '#',
}

const CATEGORIES = ['Audits', 'All', 'Paid Ads', 'Lead Funnels', 'Automation', 'Strategy', 'Business Growth']

const VIDEOS = [
  {
    id: 10,
    title: 'Full Business Audit: Local Roofing Company',
    description: 'Complete walkthrough of a free audit for a roofing company in Middle Tennessee. See exactly what we found, what was costing them jobs, and the full plan we laid out.',
    duration: '24:18',
    category: 'Audits',
    youtubeUrl: '#',
  },
  {
    id: 11,
    title: 'Audit Example: Landscaping Business With Zero Online Presence',
    description: 'A landscaping company running entirely on word of mouth. Watch what was missing and how we mapped out a plan to build their digital foundation from scratch.',
    duration: '19:45',
    category: 'Audits',
    youtubeUrl: '#',
  },
  {
    id: 12,
    title: 'Audit Example: Home Services Company Losing Leads to Competitors',
    description: 'This contractor had website traffic but no calls. The audit revealed three critical gaps that were sending their customers straight to competitors every single month.',
    duration: '22:33',
    category: 'Audits',
    youtubeUrl: '#',
  },
  {
    id: 1,
    title: 'Why Your Facebook Ads Are Failing (And It\'s Not the Ad)',
    description: 'Most roofing and construction businesses run ads that get clicks but no calls. Here\'s exactly why — and the fix.',
    duration: '12:34',
    category: 'Paid Ads',
    youtubeUrl: '#',
  },
  {
    id: 2,
    title: 'The Free Audit That Closes Clients Every Time',
    description: 'A breakdown of the exact audit process I use to show local businesses what\'s quietly killing their leads.',
    duration: '18:02',
    category: 'Strategy',
    youtubeUrl: '#',
  },
  {
    id: 3,
    title: 'Build a Landing Page That Actually Converts',
    description: 'Step-by-step walkthrough of a high-converting landing page for a roofing client. Section by section.',
    duration: '21:45',
    category: 'Lead Funnels',
    youtubeUrl: '#',
  },
  {
    id: 4,
    title: 'How I Set Up a 7-Day Follow-Up System in GHL',
    description: 'The exact GoHighLevel automation sequence that keeps leads warm from the moment they submit a form.',
    duration: '15:18',
    category: 'Automation',
    youtubeUrl: '#',
  },
  {
    id: 5,
    title: 'Why Local Businesses Lose Leads in the First 5 Minutes',
    description: 'Speed to lead is the single biggest factor most businesses ignore. Here\'s what the data actually shows.',
    duration: '9:51',
    category: 'Business Growth',
    youtubeUrl: '#',
  },
  {
    id: 6,
    title: 'The Offer Formula That Works for Service Businesses',
    description: 'How to build an offer that makes it easy for a stranger to say yes — even before they know you.',
    duration: '16:27',
    category: 'Strategy',
    youtubeUrl: '#',
  },
  {
    id: 7,
    title: 'Facebook Ad Targeting for Roofing Companies in 2024',
    description: 'Audience setup, custom vs. interest targeting, lookalikes — what actually works after the iOS changes.',
    duration: '14:09',
    category: 'Paid Ads',
    youtubeUrl: '#',
  },
  {
    id: 8,
    title: 'Your Online Presence Is Costing You Jobs — Here\'s Proof',
    description: 'A live audit of a real construction business. No names, no permissions needed — just the honest truth.',
    duration: '23:14',
    category: 'Business Growth',
    youtubeUrl: '#',
  },
  {
    id: 9,
    title: 'How to Write Ad Copy That Gets Homeowners to Call',
    description: 'The psychology behind ad copy that converts. Real examples from active campaigns, no fluff.',
    duration: '11:38',
    category: 'Paid Ads',
    youtubeUrl: '#',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const SF = '#00FFA3'

export default function Library() {
  const [searchParams] = useSearchParams()

  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get('category')
    return cat === 'audits' ? 'Audits' : 'All'
  })

  useEffect(() => {
    if (searchParams.get('category') === 'audits') {
      setTimeout(() => {
        document.getElementById('video-library')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }, [])

  const filtered = activeCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === activeCategory)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-void min-h-screen pt-24 pb-24"
    >
      {/* ─── BOOK SECTION ──────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <BookCard
            title={BOOK.title}
            description={BOOK.description}
            price={BOOK.price}
            buyLink={BOOK.buyLink}
          />
        </div>
      </section>

      {/* ─── ASK PATTERSON TECH (short-form video search) ──── */}
      <AskPatterson />

      {/* ─── VIDEO LIBRARY (long-form) ─────────────────────── */}
      <section id="video-library" className="px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-10"
          >
            <motion.span variants={fadeUp} custom={0} className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase text-seafoam/60 block mb-3">
              Free Education Library
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-barlow-condensed font-800 text-bone"
              style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)' }}
            >
              Learn the System. Apply It Yourself.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-barlow text-muted text-base mt-2 max-w-xl leading-relaxed">
              Real strategies for real service businesses — including full audit recordings so you can see exactly what the process looks like before you book your own.
            </motion.p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-barlow-condensed font-600 text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? cat === 'Audits'
                      ? 'border-white/0 text-void'
                      : 'bg-white text-void border-white'
                    : cat === 'Audits'
                      ? 'text-void border-transparent hover:opacity-90'
                      : 'bg-transparent text-muted border-white/15 hover:border-white/30 hover:text-bone'
                }`}
                style={
                  cat === 'Audits'
                    ? {
                        background: activeCategory === 'Audits' ? SF : 'rgba(0,255,163,0.15)',
                        borderColor: 'rgba(0,255,163,0.4)',
                        color: activeCategory === 'Audits' ? '#050508' : SF,
                      }
                    : {}
                }
              >
                {cat === 'Audits' ? '▶ Audit Examples' : cat}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((video, i) => (
              <motion.div key={video.id} variants={fadeUp} custom={i}>
                <VideoCard
                  title={video.title}
                  description={video.description}
                  duration={video.duration}
                  category={video.category}
                  youtubeUrl={video.youtubeUrl}
                  thumbnail={video.thumbnail}
                />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-barlow text-muted/60">No videos in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </motion.main>
  )
}
