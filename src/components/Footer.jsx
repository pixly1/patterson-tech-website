import { Link } from 'react-router-dom'
import gunnerSuit from '../assets/gunner-suit.jpg'

const BUSINESS_EMAIL = 'Pattersontech@thefutureofbusinesses.com'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-void px-6 md:px-16 lg:px-24 pt-12 pb-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* About */}
        <div className="flex flex-col sm:flex-row gap-5 items-start max-w-3xl">
          <div className="glass overflow-hidden shrink-0" style={{ width: 96, borderRadius: 8 }}>
            <img
              src={gunnerSuit}
              alt="Gunner Patterson"
              loading="lazy"
              className="w-full object-cover object-center"
              style={{ aspectRatio: '4/5' }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-barlow-condensed font-700 text-sm tracking-[0.18em] uppercase text-bone/80">
              Gunner Patterson <span className="text-muted/50 normal-case tracking-normal">· Founder</span>
            </span>
            <p className="font-barlow text-xs text-muted/80 leading-relaxed">
              Gunner Patterson is the founder of Patterson Tech — a digital systems company built
              around one belief: most local service businesses don't lose because their work is bad.
              They lose because they're invisible online.
            </p>
            <p className="font-barlow text-xs text-muted/70 leading-relaxed">
              After years of watching great contractors, roofers, and service operators lose jobs to
              competitors with worse skills but better marketing, Gunner built a repeatable system
              that fixes the actual problem — not just the surface symptoms. Patterson Tech now runs
              a full 7-agent AI operating system to deliver paid ads, lead funnels, automation,
              content strategy, and websites for clients across construction, roofing, and local
              services.
            </p>
          </div>
        </div>

        <div className="section-divider" />

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand + contact */}
          <div className="flex flex-col gap-3">
            <span className="font-barlow-condensed font-700 text-base tracking-[0.18em] uppercase text-bone/80">
              Patterson Tech
            </span>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="font-barlow text-sm text-muted hover:text-bone transition-colors duration-200"
            >
              {BUSINESS_EMAIL}
            </a>
            <p className="font-barlow text-sm text-muted/70">
              Nationwide <span className="text-muted/40">·</span> Based in Middle Tennessee
            </p>
          </div>

          {/* Legal links */}
          <nav className="flex flex-col gap-3 md:items-end">
            <span className="font-barlow-condensed font-600 text-xs tracking-[0.22em] uppercase text-muted/50">
              Legal
            </span>
            <Link
              to="/privacy-policy"
              className="font-barlow text-sm text-muted hover:text-bone transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-barlow text-sm text-muted hover:text-bone transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </nav>
        </div>

        <div className="section-divider" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-barlow text-xs text-muted/40 tracking-wide">
            © {new Date().getFullYear()} Patterson Tech. All rights reserved.
          </p>
          <p className="font-barlow text-[10px] text-muted/25 tracking-wide">
            Built by Patterson Tech Web Services
          </p>
        </div>
      </div>
    </footer>
  )
}
