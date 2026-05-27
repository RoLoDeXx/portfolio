# Samarth Sharma — Portfolio

Built with Next.js 14, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Next.js. Click Deploy.

That's it. Live in ~90 seconds.

## Customising content

All content lives in one file: `lib/data.ts`

- `person` — name, bio, email, GitHub, LinkedIn
- `tokens` — the CSS variables shown in the scrolling strip
- `work` — work experience cards
- `projects` — project cards (name, description, impact, tags, accent colour)
- `skills` — skills grouped by category

No code changes needed for content updates — just edit `lib/data.ts`.

## Design tokens

CSS custom properties are defined in `app/globals.css` under `:root`.
Tailwind classes map to the same values via `tailwind.config.ts`.

| Token | Value |
|---|---|
| `--ds-color-bg` | `#0C0C0F` |
| `--ds-color-accent` | `#5B6AF5` |
| `--ds-color-surface` | `#13131A` |
| `--ds-font-mono` | `DM Mono` |

## Project structure

```
├── app/
│   ├── layout.tsx      # Root layout, metadata, fonts
│   ├── page.tsx        # Page assembly
│   └── globals.css     # Design tokens + base styles
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx        # Hero + token strip
│   ├── Work.tsx        # Experience cards
│   ├── Projects.tsx    # Project cards
│   ├── Skills.tsx      # Skills grid
│   └── Footer.tsx      # Contact + footer
├── lib/
│   └── data.ts         # All content (edit this)
├── tailwind.config.ts
└── next.config.js
```
