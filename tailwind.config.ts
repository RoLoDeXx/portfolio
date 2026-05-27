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
          bg:       '#0C0C0F',
          surface:  '#13131A',
          border:   '#1E1E28',
          'border-bright': '#2E2E3E',
          text:     '#EEEEF2',
          muted:    '#6B6B80',
          subtle:   '#3A3A4E',
          accent:   '#5B6AF5',
          'accent-hover': '#7480FF',
          'accent-muted': '#1A1D3F',
          warm:     '#F5855B',
          green:    '#4AF0A0',
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
