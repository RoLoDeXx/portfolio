'use client'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-24 mx-auto max-w-5xl px-6">

      <motion.div {...fadeUp()} className="mb-14">
        <h2 className="font-mono text-3xl font-medium text-ds-text">Things I've built</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            {...fadeUp(i * 0.12)}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative rounded-ds-lg p-6 flex flex-col gap-4 transition-all duration-300 cursor-default overflow-hidden group"
            style={{
              background: 'var(--ds-color-surface)',
              border: '1px solid var(--ds-color-border)',
              boxShadow: 'var(--ds-shadow-card)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = project.accent + '55'
              el.style.boxShadow = `var(--ds-shadow-card), 0 0 30px ${project.accent}18`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--ds-color-border)'
              el.style.boxShadow = 'var(--ds-shadow-card)'
            }}
          >
            {/* Accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
            />

            {/* Name */}
            <div>
              <h3
                className="font-mono text-base font-medium mb-1"
                style={{ color: project.accent }}
              >
                {project.name}
              </h3>
              <p className="font-sans text-xs text-ds-muted">{project.tagline}</p>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-ds-muted leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Impact */}
            <div
              className="font-mono text-[11px] px-3 py-2 rounded-ds"
              style={{
                background: 'var(--ds-color-bg)',
                border: `1px solid ${project.accent}33`,
                color: project.accent,
              }}
            >
              {project.impact}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: 'var(--ds-color-bg)',
                    border: '1px solid var(--ds-color-border-bright)',
                    color: 'var(--ds-color-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            {'github' in project || 'live' in project ? (
              <div className="flex gap-3 pt-1">
                {'github' in project && (
                  <a
                    href={(project as { github: string }).github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] flex items-center gap-1 transition-opacity opacity-60 hover:opacity-100"
                    style={{ color: project.accent }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    GitHub
                  </a>
                )}
                {'live' in project && (
                  <a
                    href={(project as { live: string }).live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] flex items-center gap-1 transition-opacity opacity-60 hover:opacity-100"
                    style={{ color: project.accent }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Live
                  </a>
                )}
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
