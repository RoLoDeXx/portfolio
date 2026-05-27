'use client'
import { motion } from 'framer-motion'
import { work } from '@/lib/data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Work() {
  return (
    <section id="work" className="relative z-10 py-24 mx-auto max-w-5xl px-6">

      <motion.div {...fadeUp()} className="mb-14">
        <h2 className="font-mono text-3xl font-medium text-ds-text">Where I've worked</h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        {work.map((job, i) => (
          <motion.div
            key={job.company}
            {...fadeUp(i * 0.1)}
            whileHover={{ y: -2 }}
            className="rounded-ds-lg p-6 transition-all duration-300 group"
            style={{
              background: 'var(--ds-color-surface)',
              border: '1px solid var(--ds-color-border)',
              boxShadow: 'var(--ds-shadow-card)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--ds-color-border-bright)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--ds-shadow-card), var(--ds-shadow-glow)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--ds-color-border)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--ds-shadow-card)'
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-3">
                <h3 className="font-mono text-lg font-medium text-ds-text">{job.company}</h3>
                {job.badge && (
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: 'var(--ds-color-accent-muted)',
                      border: '1px solid var(--ds-color-accent)',
                      color: 'var(--ds-color-accent)',
                    }}
                  >
                    {job.badge}
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="font-sans text-sm text-ds-muted">{job.role}</p>
                <p className="font-mono text-xs text-ds-subtle mt-0.5">{job.period}</p>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-ds-muted leading-relaxed mb-5">{job.description}</p>

            {/* Highlights */}
            <ul className="flex flex-col gap-2 mb-5">
              {job.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 font-sans text-sm text-ds-muted">
                  <span className="text-ds-accent mt-0.5 flex-shrink-0">›</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-ds"
                  style={{
                    background: 'var(--ds-color-bg)',
                    border: '1px solid var(--ds-color-border-bright)',
                    color: 'var(--ds-color-muted)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
