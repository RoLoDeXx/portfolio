'use client'
import { useEffect, useRef } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { person } from '@/lib/data'
import { HeroScene } from '@/components/SceneBg'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView || !ref.current) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return () => controls.stop()
  }, [isInView, to, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const stats = [
  { num: 27, suffix: '+', label: 'apps built on it' },
  { num: 75, suffix: '+', label: 'engineers using it' },
  { text: 'v1→v9.3', label: 'versions shipped' },
  { num: 4, suffix: '+', label: 'years at BrowserStack' },
] as const

const words = person.name.split(' ')

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-0 overflow-hidden">

      {/* Floating glow blob */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        animate={{ y: [-18, 18], scale: [1, 1.07, 1] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse, rgba(91,106,245,0.09) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Cartoony scene — stars, moon, floating islands */}
      <HeroScene />

      <div className="relative z-10 mx-auto max-w-5xl px-6 w-full">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-xs text-ds-muted">
            BrowserStack · Design Stack · v9.3
          </span>
        </motion.div>

        {/* Name — word-by-word blur reveal */}
        <h1
          className="font-mono font-medium leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.15 + i * 0.18,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block text-ds-text"
              style={{ marginRight: i < words.length - 1 ? '0.3em' : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
          className="font-sans text-xl text-ds-muted mb-6 max-w-xl leading-relaxed"
          style={{ fontWeight: 300 }}
        >
          {person.tagline}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.62 }}
          className="font-sans text-base text-ds-muted max-w-2xl mb-10"
          style={{ fontWeight: 300, lineHeight: 1.8 }}
        >
          {person.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.72 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <motion.a
            href="#featured"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="font-sans text-sm font-medium px-5 py-2.5 rounded-ds"
            style={{
              background: 'var(--ds-color-accent)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(91,106,245,0.3)',
            }}
          >
            See my work
          </motion.a>
          <motion.a
            href={person.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="font-mono text-sm text-ds-muted hover:text-ds-text transition-colors px-5 py-2.5 rounded-ds"
            style={{ border: '1px solid var(--ds-color-border-bright)' }}
          >
            github/RoLoDeXx ↗
          </motion.a>
          <motion.a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="font-mono text-sm text-ds-muted hover:text-ds-text transition-colors px-5 py-2.5 rounded-ds"
            style={{ border: '1px solid var(--ds-color-border-bright)' }}
          >
            LinkedIn ↗
          </motion.a>
        </motion.div>

        {/* Stats — count-up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.82 }}
          className="flex items-center gap-8 mt-14 flex-wrap"
        >
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="font-mono font-medium text-2xl"
                style={{ color: 'var(--ds-color-accent)' }}
              >
                {'text' in stat ? (
                  stat.text
                ) : (
                  <CountUp to={stat.num} suffix={stat.suffix} />
                )}
              </span>
              <span className="font-sans text-xs text-ds-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
