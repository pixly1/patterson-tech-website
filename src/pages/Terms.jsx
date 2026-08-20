import { motion } from 'framer-motion'

const SF = '#00FFA3'
const BUSINESS_EMAIL = 'Pattersontech@thefutureofbusinesses.com'
const LAST_UPDATED = 'June 15, 2026'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Section({ title, children, i }) {
  return (
    <motion.section variants={fadeUp} custom={i} className="flex flex-col gap-3">
      <h2 className="font-barlow-condensed font-700 text-bone text-xl md:text-2xl tracking-[0.02em]">
        {title}
      </h2>
      <div className="font-barlow text-muted text-base leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </motion.section>
  )
}

export default function Terms() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-void min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="visible" className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="font-barlow-condensed font-600 text-xs tracking-[0.25em] uppercase"
              style={{ color: SF }}
            >
              — Legal
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-barlow-condensed font-800 text-bone leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Terms of Service
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="font-barlow text-sm text-muted/60">
              Last updated: {LAST_UPDATED}
            </motion.p>
          </div>

          <div className="section-divider" />

          <Section title="Acceptance of Terms" i={3}>
            <p>
              These Terms of Service ("Terms") govern your use of the Patterson Tech website and
              services ("Services"). By accessing our website, submitting a form, or engaging us for
              work, you agree to these Terms. If you do not agree, please do not use the site or our
              Services.
            </p>
          </Section>

          <Section title="Description of Services" i={4}>
            <p>
              Patterson Tech provides digital marketing and web services, including website design
              and development, organic social media, paid advertising, lead generation, and related
              automation and strategy. Specific deliverables, timelines, and pricing for any
              engagement are defined in a separate proposal or written agreement between you and
              Patterson Tech.
            </p>
          </Section>

          <Section title="Client Responsibilities" i={5}>
            <p>When you engage our Services, you agree to:</p>
            <ul className="flex flex-col gap-2 pl-1">
              <li>Provide accurate information and timely materials, approvals, and feedback.</li>
              <li>Hold the rights to any content, logos, or assets you provide to us.</li>
              <li>Use the Services and any deliverables lawfully and in good faith.</li>
            </ul>
          </Section>

          <Section title="Payment &amp; Engagement" i={6}>
            <p>
              Fees, payment schedules, and the scope of any project are set out in the proposal or
              agreement for that engagement. Unless otherwise agreed in writing, invoices are due as
              stated on the invoice, and work may be paused for overdue accounts. The free audit
              carries no cost and no obligation.
            </p>
          </Section>

          <Section title="Intellectual Property" i={7}>
            <p>
              Content on this website — including text, design, and branding — is owned by Patterson
              Tech and may not be copied or reused without permission. Ownership of project
              deliverables transfers to the client as specified in the applicable agreement,
              typically upon full payment. Patterson Tech may display non-confidential work in its
              portfolio unless agreed otherwise.
            </p>
          </Section>

          <Section title="Disclaimers" i={8}>
            <p>
              Our Services and website are provided "as is" and "as available." While we work hard to
              deliver strong results, we do not guarantee specific outcomes such as a particular
              number of leads, rankings, or revenue, as these depend on factors outside our control.
            </p>
          </Section>

          <Section title="Limitation of Liability" i={9}>
            <p>
              To the fullest extent permitted by law, Patterson Tech is not liable for any indirect,
              incidental, or consequential damages arising from your use of the site or Services. Our
              total liability for any claim related to an engagement will not exceed the amount you
              paid to us for that engagement.
            </p>
          </Section>

          <Section title="Governing Law" i={10}>
            <p>
              These Terms are governed by the laws of the State of Tennessee, United States, without
              regard to its conflict-of-law rules. Any disputes will be handled in the courts located
              in Tennessee.
            </p>
          </Section>

          <Section title="Changes to These Terms" i={11}>
            <p>
              We may update these Terms from time to time. When we do, we'll revise the "Last updated"
              date above. Continued use of the site or Services after changes take effect means you
              accept the updated Terms.
            </p>
          </Section>

          <Section title="Contact Us" i={12}>
            <p>
              Questions about these Terms? Reach us at{' '}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="transition-colors duration-200 hover:text-bone"
                style={{ color: SF }}
              >
                {BUSINESS_EMAIL}
              </a>
              . Patterson Tech serves clients nationwide and is based in Middle Tennessee.
            </p>
          </Section>

          <motion.p variants={fadeUp} custom={13} className="font-barlow text-xs text-muted/30 leading-relaxed mt-2">
            These Terms are provided for general informational purposes and do not constitute legal
            advice. For guidance specific to your situation, consult a qualified attorney.
          </motion.p>
        </motion.div>
      </div>
    </motion.main>
  )
}
