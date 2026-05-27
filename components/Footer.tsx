'use client'
import { motion } from 'framer-motion'
import { person } from '@/lib/data'
import { CityHorizon } from '@/components/SceneBg'

export default function Footer() {
  return (
    <footer id="contact" className="relative py-24 mx-auto max-w-5xl px-6" style={{ zIndex: 2 }}>
      <CityHorizon />

      <div className="relative" style={{ zIndex: 3 }}>
      <div
        className="rounded-ds-lg p-10 text-center"
        style={{
          background: 'var(--ds-color-surface)',
          border: '1px solid var(--ds-color-border)',
          boxShadow: 'var(--ds-shadow-glow)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="font-mono font-medium mb-4"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            Say hello.
          </h2>
          <p className="font-sans text-ds-muted text-base mb-8 max-w-md mx-auto leading-relaxed">
            I'm looking for my next role. If you're building something in design systems or developer tooling, I'd genuinely like to hear about it.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={`mailto:${person.email}`}
              className="font-mono text-sm px-6 py-3 rounded-ds transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: 'var(--ds-color-accent)',
                color: '#fff',
                boxShadow: '0 0 24px rgba(91,106,245,0.35)',
              }}
            >
              {person.email}
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm px-5 py-3 rounded-ds text-ds-muted hover:text-ds-text transition-colors"
              style={{ border: '1px solid var(--ds-color-border-bright)' }}
            >
              GitHub ↗
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm px-5 py-3 rounded-ds text-ds-muted hover:text-ds-text transition-colors"
              style={{ border: '1px solid var(--ds-color-border-bright)' }}
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-12 flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: '1px solid var(--ds-color-border)', paddingTop: '24px' }}
      >
        <p className="font-mono text-xs text-ds-subtle">
          {person.name} • {person.location}
        </p>
        <p className="font-mono text-xs text-ds-subtle">
          Built with Next.js, Tailwind, Framer Motion
        </p>
      </div>
      </div>
    </footer>
  )
}
