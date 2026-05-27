'use client'
import { motion } from 'framer-motion'
import { skills } from '@/lib/data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-24 mx-auto max-w-5xl px-6">

      {/* Divider */}
      <div className="mb-14" style={{ borderTop: '1px solid var(--ds-color-border)' }} />

      <motion.div {...fadeUp()} className="mb-12">
        <h2 className="font-mono text-3xl font-medium text-ds-text">Tools of the trade</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((group, i) => (
          <motion.div
            key={group.label}
            {...fadeUp(i * 0.08)}
            className="rounded-ds-lg p-5"
            style={{
              background: 'var(--ds-color-surface)',
              border: '1px solid var(--ds-color-border)',
            }}
          >
            <p
              className="font-mono text-[11px] mb-4 uppercase tracking-widest"
              style={{ color: 'var(--ds-color-accent)' }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-sans text-xs px-2.5 py-1 rounded-ds transition-colors"
                  style={{
                    background: 'var(--ds-color-bg)',
                    border: '1px solid var(--ds-color-border-bright)',
                    color: 'var(--ds-color-muted)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
