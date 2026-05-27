export const person = {
  name: 'Samarth Sharma',
  role: 'Frontend Engineer',
  tagline: 'Frontend engineer. I build the tools other engineers build with.',
  bio: "I started Design Stack at BrowserStack in 2022 — just me and a blank repo. It's now the component library that 14 product teams build on. I've shipped every version from v1 to v9.3, set up the monorepo it lives in, and spent most of my time making sure the 75+ engineers who use it never have to think about the design system at all.",
  location: 'Delhi, India',
  email: 'imailtosamarth@gmail.com',
  github: 'https://github.com/RoLoDeXx',
  linkedin: 'https://linkedin.com/in/samarth-sharma-fe',
  available: false,
}

export const tokens = [
  '--ds-color-accent: #5B6AF5',
  '--ds-spacing-4: 16px',
  '--ds-radius: 6px',
  '--ds-font-mono: "DM Mono"',
  '--ds-shadow-card: 0 8px 24px rgba(0,0,0,.3)',
  '--ds-color-text: #EEEEF2',
  '--ds-spacing-8: 32px',
  '--ds-color-surface: #13131A',
  '--ds-color-border: #1E1E28',
  '--ds-radius-lg: 12px',
  '--ds-color-muted: #6B6B80',
  '--ds-spacing-12: 48px',
  '--ds-color-warm: #F5855B',
  '--ds-color-green: #4AF0A0',
  '--ds-font-sans: "DM Sans"',
  '--ds-color-bg: #0C0C0F',
]

export const work = [
  {
    company: 'BrowserStack',
    role: 'Software Engineer L3',
    period: 'Nov 2022 – Present',
    badge: 'Founding Member',
    description:
      'Built Design Stack from a blank repo. It\'s the component library 14 product teams ship with — 27+ apps, ~75 engineers. I\'ve done every major release, maintained the monorepo, and generally tried to make sure the library stays out of people\'s way.',
    highlights: [
      'Set up the BrowserStack frontend monorepo — someone had to do it',
      'Shipped nine major versions of Design Stack, most backwards-compatible',
      'Moved 27+ apps from ESLint to OxLint — faster linting, less config noise',
      'Built tooling so AI assistants produce DS-compliant code by default',
      'Built DesignLint, DS Adoption Tracker, and DesignStack Lab — tools the team actually uses',
      'Frontend infra on-call: security patches, P0/P1 incidents, CI reliability',
    ],
    stack: ['React', 'TypeScript', 'Vitest', 'Storybook', 'Chromatic', 'OxLint', 'GitHub Actions'],
  },
  {
    company: 'GoComet',
    role: 'Software Development Engineer I',
    period: 'Jul 2021 – Nov 2022',
    badge: null,
    description:
      'First job out of college. Worked across three B2B SaaS products, wrote a lot of tests, and set up product analytics from scratch.',
    highlights: [
      'React UIs across Invoice-parser, GoInvoice, and GoProcure',
      'Took frontend test coverage from near-zero to ~80%',
      'Set up Mixpanel with proper event schemas — so the data was actually useful',
    ],
    stack: ['React', 'JavaScript', 'Mixpanel'],
  },
]

export const projects = [
  {
    name: 'DesignLint',
    tagline: 'Automated design-system compliance at PR level',
    description:
      'PR-level linting that catches Design Stack violations before they get reviewed. Replaced the pattern of leaving the same comments on PRs over and over — now it\'s a rule in CI. Teams can add their own DS-specific checks without touching the core tool.',
    impact: '27 apps • 75+ engineers • no more repeated review comments',
    tags: ['Developer Tooling', 'Linting', 'Design Systems', 'AST'],
    accent: '#5B6AF5',
  },
  {
    name: 'DS Adoption Tracker',
    tagline: 'Real-time visibility into design system health',
    description:
      'Internal dashboard that tracks how much of the design system is actually being used, across 14 teams and 27+ apps. Before this, someone had to manually audit spreadsheets to figure out which components weren\'t getting adopted. Now it\'s just a dashboard.',
    impact: '14 teams • 27 apps • no more spreadsheet audits',
    tags: ['Analytics', 'Design Systems', 'React', 'Dashboard'],
    accent: '#F5855B',
  },
  {
    name: 'MCP + Skills + Agents',
    tagline: 'Four-layer AI enforcement for design systems',
    description:
      'Making AI coding tools actually useful for Design Stack — instead of generating the wrong components. Combines llms.txt context files, better JSDoc, GitHub Copilot agents, and MCP servers so that Copilot and Claude produce DS-compliant code without needing to be told.',
    impact: 'In progress • AI writes DS-correct code by default',
    tags: ['AI', 'MCP', 'GitHub Copilot', 'Developer Experience'],
    accent: '#4AF0A0',
  },
  {
    name: 'Cosmos',
    tagline: 'N-body gravity simulator in the browser',
    description:
      'Interactive gravity simulator that runs entirely in the browser — no backend, no WebGL libraries. Spawn 16 body types from asteroids to black holes, load 17 presets including TRAPPIST-1, and share simulations via URL. Uses a Barnes-Hut O(N log N) quadtree solver to hit 60 fps even with large bodies.',
    impact: 'React 19 + Canvas 2D • 60 fps physics loop • zero dependencies beyond React',
    tags: ['React', 'TypeScript', 'Canvas 2D', 'Physics', 'Vite'],
    accent: '#A78BFA',
    github: 'https://github.com/RoLoDeXx/cosmos',
    live: 'https://rolodexx.github.io/cosmos/',
  },
]

export const skills = [
  { label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'Tailwind'] },
  { label: 'Testing', items: ['Vitest', 'React Testing Library', 'Storybook', 'Chromatic', 'Omlet'] },
  { label: 'Tooling', items: ['OxLint / OxFmt', 'GitHub Actions', 'semantic-release', 'CI/CD'] },
  { label: 'Design Systems', items: ['Component architecture', 'Design tokens', 'Monorepo', 'JSDoc / MDX', 'llms.txt', 'MCP servers'] },
]
