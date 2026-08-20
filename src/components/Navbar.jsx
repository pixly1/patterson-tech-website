import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo-mark.png'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Learn', path: '/library' },
  { label: 'Our System', path: '/our-system' },
  { label: 'FREE Resources', path: '/free-resources' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  function handleBookAudit() {
    if (isHome) {
      document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })
      }, 450)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-void/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo mark */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <img
            src={logo}
            alt="Patterson Tech"
            className="h-[72px] w-[72px] object-contain opacity-100 transition-opacity duration-200"
            style={{ filter: 'invert(1) brightness(3)', mixBlendMode: 'screen', transform: 'scale(1.45)', transformOrigin: 'left center', marginRight: 28 }}
          />
          <span className="font-barlow-condensed font-700 text-base tracking-[0.18em] uppercase text-bone/70 group-hover:text-bone transition-colors duration-200">
            Patterson Tech
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-barlow text-sm tracking-[0.1em] uppercase transition-colors duration-200 ${
                (link.path === '/' ? location.pathname === '/' : location.pathname === link.path)
                  ? 'text-bone'
                  : 'text-muted hover:text-bone'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleBookAudit}
            className="btn-seafoam font-barlow text-sm tracking-[0.08em] uppercase px-5 py-2 border border-white/20 text-bone"
          >
            Apply
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-bone transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-bone transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-bone transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Availability bar — attached to bottom of nav, hides on scroll */}
      <div
        className="w-full flex items-center justify-center px-3 overflow-hidden transition-all duration-300"
        style={{ background: '#E8112D', height: scrolled ? 0 : 26, opacity: scrolled ? 0 : 1 }}
      >
        <span
          className="bg-white text-black font-barlow-condensed font-800 uppercase px-3 tracking-[0.08em] text-center whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ borderRadius: 3, fontSize: 'clamp(0.6rem, 1.3vw, 0.78rem)', maxWidth: '100%' }}
        >
          🔴 LIMITED AVAILABILITY — ONLY 3 HANDS-ON CLIENT SPOTS OPEN THIS MONTH
        </span>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-void border-t border-white/5"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-barlow text-base tracking-[0.1em] uppercase text-muted hover:text-bone transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleBookAudit}
              className="btn-seafoam font-barlow text-sm tracking-[0.08em] uppercase px-5 py-3 border border-white/20 text-bone text-center mt-2 w-full"
            >
              Apply
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
