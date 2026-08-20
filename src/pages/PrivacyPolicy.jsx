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

export default function PrivacyPolicy() {
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
              Privacy Policy
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="font-barlow text-sm text-muted/60">
              Last updated: {LAST_UPDATED}
            </motion.p>
          </div>

          <div className="section-divider" />

          <Section title="Overview" i={3}>
            <p>
              Patterson Tech ("Patterson Tech," "we," "us," or "our") respects your privacy.
              This Privacy Policy explains what information we collect when you visit our website
              or contact us, how we use it, and the choices you have. By using our website or
              submitting information to us, you agree to the practices described here.
            </p>
          </Section>

          <Section title="Information We Collect" i={4}>
            <p>
              We only collect information you choose to provide and basic technical data that
              helps the site function:
            </p>
            <ul className="flex flex-col gap-2 pl-1">
              <li>
                <span className="text-bone/80">Contact &amp; audit forms:</span> your name, email
                address, phone number, business type, and any message details you submit.
              </li>
              <li>
                <span className="text-bone/80">Technical data:</span> standard information your
                browser sends, such as device type, browser, and general usage of the site.
              </li>
            </ul>
          </Section>

          <Section title="How We Use Your Information" i={5}>
            <p>We use the information you provide to:</p>
            <ul className="flex flex-col gap-2 pl-1">
              <li>Respond to inquiries and schedule or deliver your free audit.</li>
              <li>Provide, operate, and improve our services and website.</li>
              <li>Send you information you've requested or that relates to a project.</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </Section>

          <Section title="Cookies &amp; Analytics" i={6}>
            <p>
              We may use cookies or similar technologies to keep the site working properly and to
              understand how visitors use it in aggregate. You can control or disable cookies
              through your browser settings; some features may not function as intended if you do.
            </p>
          </Section>

          <Section title="Third-Party Services" i={7}>
            <p>
              We use trusted third-party tools to operate our site. Contact and audit form
              submissions are processed through Formspree, our form provider, which handles the
              data only to deliver your message to us. These providers maintain their own privacy
              practices, and we encourage you to review them.
            </p>
          </Section>

          <Section title="How We Share Information" i={8}>
            <p>
              We share information only as needed to run our business — for example, with service
              providers who help us operate the site — or when required by law. We do not sell or
              rent your personal information to third parties.
            </p>
          </Section>

          <Section title="Data Security" i={9}>
            <p>
              We take reasonable measures to protect the information you share with us. However, no
              method of transmission or storage over the internet is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Your Rights" i={10}>
            <p>
              You may request access to, correction of, or deletion of the personal information you
              have provided to us. To make a request, email us at the address below and we'll
              respond within a reasonable timeframe.
            </p>
          </Section>

          <Section title="Children's Privacy" i={11}>
            <p>
              Our website and services are intended for businesses and individuals aged 18 and
              older. We do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="Changes to This Policy" i={12}>
            <p>
              We may update this Privacy Policy from time to time. When we do, we'll revise the
              "Last updated" date above. Continued use of the site after changes take effect means
              you accept the updated policy.
            </p>
          </Section>

          <Section title="Contact Us" i={13}>
            <p>
              Questions about this policy or your information? Reach us at{' '}
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

          <motion.p variants={fadeUp} custom={14} className="font-barlow text-xs text-muted/30 leading-relaxed mt-2">
            This Privacy Policy is provided for general informational purposes and does not
            constitute legal advice. For guidance specific to your situation, consult a qualified
            attorney.
          </motion.p>
        </motion.div>
      </div>
    </motion.main>
  )
}
