import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        mono: ['var(--font-dm-mono)'],
      },
      colors: {
        ds: {
          bg:              'var(--ds-color-bg)',
          surface:         'var(--ds-color-surface)',
          border:          'var(--ds-color-border)',
          'border-bright': 'var(--ds-color-border-bright)',
          text:            'var(--ds-color-text)',
          muted:           'var(--ds-color-muted)',
          subtle:          'var(--ds-color-subtle)',
          accent:          'var(--ds-color-accent)',
          'accent-hover':  'var(--ds-color-accent-hover)',
          'accent-muted':  'var(--ds-color-accent-muted)',
          warm:            'var(--ds-color-warm)',
          green:           'var(--ds-color-green)',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'ds': '6px',
        'ds-lg': '12px',
      },
      animation: {
        'token-scroll': 'tokenScroll 30s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        tokenScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
