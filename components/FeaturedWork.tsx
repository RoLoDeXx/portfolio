'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ConstellationBg } from '@/components/SceneBg'

const featured = [
  {
    num: '01',
    name: 'DesignLint',
    year: '2024',
    tagline: 'PR-level linting that catches design system violations before they get reviewed.',
    tags: ['Developer Tooling', 'AST', 'CI/CD'],
    accent: '#5B6AF5',
  },
  {
    num: '02',
    name: 'DS Adoption Tracker',
    year: '2023',
    tagline: 'Dashboard showing which components are actually being used — across 14 teams.',
    tags: ['Analytics', 'Dashboard', 'React'],
    accent: '#F5855B',
  },
  {
    num: '03',
    name: 'MCP + AI Agents',
    year: '2025 →',
    tagline: 'Tooling so AI assistants produce design-system-correct code by default.',
    tags: ['AI', 'MCP', 'Developer Experience'],
    accent: '#4AF0A0',
  },
]

type Project = (typeof featured)[number]

function Card({ project, index }: { project: Project; index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 22 })
  const innerX = useTransform(springX, [-300, 300], [-14, 14])
  const innerY = useTransform(springY, [-150, 150], [-7, 7])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 },
        y: { type: 'spring', stiffness: 260, damping: 28, delay: index * 0.12 },
      }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={e => {
        handleMouseLeave()
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--ds-color-border)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--ds-shadow-card)'
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = project.accent + '44'
        ;(e.currentTarget as HTMLElement).style.boxShadow =
          `var(--ds-shadow-card), 0 0 48px ${project.accent}14`
      }}
      className="group relative flex flex-col md:flex-row rounded-ds-lg overflow-hidden cursor-default transition-all duration-300"
      style={{
        background: 'var(--ds-color-surface)',
        border: '1px solid var(--ds-color-border)',
        boxShadow: 'var(--ds-shadow-card)',
      }}
    >
      {/* Left — content */}
      <div className="flex flex-col justify-between p-8 md:w-[42%] gap-8">
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-xs" style={{ color: project.accent, opacity: 0.55 }}>
              {project.num}
            </span>
            <span className="font-mono text-xs text-ds-subtle">{project.year}</span>
          </div>
          <h3
            className="font-mono text-2xl font-medium mb-3 leading-tight"
            style={{ color: project.accent }}
          >
            {project.name}
          </h3>
          <p className="font-sans text-sm text-ds-muted leading-relaxed">{project.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-1 rounded-ds"
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
      </div>

      {/* Right — placeholder visual */}
      <div
        className="relative overflow-hidden md:w-[58%] min-h-[220px]"
        style={{ borderLeft: '1px solid var(--ds-color-border)' }}
      >
        {/* Ambient gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 35% 50%, ${project.accent}0E 0%, transparent 65%)`,
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${project.accent}28 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: 0.55,
          }}
        />

        {/* Parallax watermark number */}
        <motion.div
          style={{
            x: innerX,
            y: innerY,
            fontSize: 'clamp(7rem, 13vw, 11rem)',
            color: project.accent,
            opacity: 0.055,
            lineHeight: 1,
          }}
          className="absolute -right-4 bottom-0 font-mono font-medium select-none pointer-events-none"
        >
          {project.num}
        </motion.div>

        {/* Placeholder badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs px-4 py-2 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.48)',
              border: `1px solid ${project.accent}38`,
              color: project.accent,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            case study in progress
          </motion.span>
        </div>

        {/* Hover glow sweep */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.accent}0A 0%, transparent 55%)`,
            transition: 'opacity 0.6s ease',
          }}
        />
      </div>
    </motion.article>
  )
}

export default function FeaturedWork() {
  return (
    <section id="featured" className="relative py-24 mx-auto max-w-5xl px-6" style={{ zIndex: 2 }}>
      <ConstellationBg />
      <div className="relative" style={{ zIndex: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <h2 className="font-mono text-3xl font-medium text-ds-text">Selected work</h2>
        <p className="font-sans text-sm text-ds-muted mt-3 max-w-md leading-relaxed">
          Case studies are in progress — the work is real, the writeups are coming.
        </p>
      </motion.div>

      <div className="flex flex-col gap-5">
        {featured.map((project, i) => (
          <Card key={project.num} project={project} index={i} />
        ))}
      </div>
      </div>
    </section>
  )
}
