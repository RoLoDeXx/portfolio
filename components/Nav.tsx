'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { person } from '@/lib/data'

function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(!document.documentElement.classList.contains('light'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('light', !next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center rounded-ds transition-colors"
      style={{
        background: 'var(--ds-color-surface)',
        border: '1px solid var(--ds-color-border)',
        color: 'var(--ds-color-muted)',
      }}
    >
      {dark ? (
        // Sun icon
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </motion.button>
  )
}

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
          background: 'var(--nav-bg)',
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
          <li><ThemeToggle /></li>
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
