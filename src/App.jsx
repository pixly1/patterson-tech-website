import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Library from './pages/Library'
import FreeResources from './pages/FreeResources'
import Services from './pages/Services'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import Websites from './pages/services/Websites'
import SocialMedia from './pages/services/SocialMedia'
import PaidAds from './pages/services/PaidAds'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/free-resources" element={<FreeResources />} />
        <Route path="/our-system" element={<Services />} />
        <Route path="/services" element={<Navigate to="/our-system" replace />} />
        <Route path="/services/websites" element={<Websites />} />
        <Route path="/services/social-media" element={<SocialMedia />} />
        <Route path="/services/paid-ads" element={<PaidAds />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
