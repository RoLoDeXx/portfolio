'use client'
import { motion } from 'framer-motion'
import { person } from '@/lib/data'

const links = [
  { label: 'Work', href: '#featured' },
  { label: 'Experience', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(12,12,15,0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--ds-color-border)',
        }}
      >
        {/* Logo */}
        <a href="#" className="font-mono text-sm text-ds-text hover:text-ds-muted transition-colors">
          {person.name.split(' ')[0].toLowerCase()}.
        </a>

        {/* Links */}
        <ul className="flex items-center gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-sans text-sm text-ds-muted hover:text-ds-text transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${person.email}`}
              className="font-mono text-xs px-3 py-1.5 rounded-ds transition-all"
              style={{
                background: 'var(--ds-color-accent-muted)',
                border: '1px solid var(--ds-color-accent)',
                color: 'var(--ds-color-accent)',
              }}
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  )
}
