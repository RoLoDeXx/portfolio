'use client'
import { motion } from 'framer-motion'

// Deterministic star positions — golden angle spiral, SSR-safe
const STARS = Array.from({ length: 48 }, (_, i) => {
  const a = i * 2.3999632
  return {
    x: (Math.sin(a) * 0.5 + 0.5) * 100,
    y: (Math.cos(a * 0.71) * 0.5 + 0.5) * 82,
    r: [0.45, 0.7, 1.0, 1.35][i % 4],
    op: [0.18, 0.26, 0.38, 0.48, 0.3][i % 5],
    dur: 2.4 + (i % 6) * 0.55,
    delay: (i * 0.37) % 5.4,
  }
})

// ─── Hero scene: stars + moon + two floating islands ─────────────────────────
export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {/* ── Stars ── */}
        {STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="white"
            animate={{ opacity: [s.op, s.op * 0.18, s.op] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* ── Moon — crescent, top-right ── */}
        <motion.g
          animate={{ y: [-7, 7] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <circle cx="978" cy="108" r="60" fill="#1A1A2E" />
          <circle cx="1004" cy="97" r="54" fill="#0C0C0F" />
          {/* craters */}
          <circle cx="952" cy="103" r="7.5" fill="#151528" stroke="#272742" strokeWidth="0.6" />
          <circle cx="966" cy="132" r="4.5" fill="#151528" stroke="#272742" strokeWidth="0.6" />
          <circle cx="941" cy="128" r="3" fill="#151528" stroke="#272742" strokeWidth="0.6" />
          {/* subtle rim glow */}
          <circle cx="978" cy="108" r="60" stroke="#5B6AF5" strokeWidth="0.4" opacity="0.25" />
        </motion.g>

        {/* ── Island 1 — left-center, small, blue accent ── */}
        <motion.g
          animate={{ y: [-11, 11] }}
          transition={{ duration: 5.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.4 }}
        >
          <g transform="translate(82,218)">
            {/* underside glow */}
            <ellipse cx="76" cy="30" rx="54" ry="10" fill="#5B6AF5" opacity="0.13" />
            {/* earthy underbody */}
            <path d="M10 22 Q76 60 142 22 L136 44 Q76 74 16 44 Z" fill="#0D0D18" />
            {/* surface */}
            <ellipse cx="76" cy="22" rx="66" ry="18" fill="#12121E" stroke="#5B6AF5" strokeWidth="1.6" opacity="0.88" />
            {/* grass tufts */}
            <path d="M30 16 Q32 8 34 16" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M36 15 Q38 6 40 15" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M108 16 Q110 9 112 16" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
            {/* tree left */}
            <rect x="52" y="-12" width="4" height="22" rx="1" fill="#222232" />
            <ellipse cx="54" cy="-19" rx="11" ry="10" fill="#0D1E10" stroke="#4AF0A0" strokeWidth="0.9" opacity="0.9" />
            {/* tree right (smaller) */}
            <rect x="90" y="-8" width="3.5" height="16" rx="1" fill="#222232" />
            <ellipse cx="91.75" cy="-15" rx="8.5" ry="7.5" fill="#0D1E10" stroke="#4AF0A0" strokeWidth="0.9" opacity="0.9" />
            {/* crystal accent */}
            <polygon points="118,8 122,-1 126,8 122,13" fill="#5B6AF5" opacity="0.65" />
            <polygon points="119,8 122,3 125,8" fill="white" opacity="0.18" />
            {/* small pebble */}
            <ellipse cx="68" cy="18" rx="7" ry="4.5" fill="#1A1A2A" stroke="#2E2E3E" strokeWidth="0.7" />
          </g>
        </motion.g>

        {/* ── Island 2 — right-center, larger, warm accent ── */}
        <motion.g
          animate={{ y: [9, -9] }}
          transition={{ duration: 7.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1.1 }}
        >
          <g transform="translate(752,365)">
            {/* glow */}
            <ellipse cx="100" cy="32" rx="80" ry="13" fill="#F5855B" opacity="0.1" />
            {/* underbody */}
            <path d="M8 26 Q100 70 192 26 L186 50 Q100 88 14 50 Z" fill="#0D0D18" />
            {/* surface */}
            <ellipse cx="100" cy="26" rx="92" ry="22" fill="#12121E" stroke="#F5855B" strokeWidth="1.6" opacity="0.82" />
            {/* grass */}
            <path d="M55 19 Q57 10 59 19" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M62 18 Q64 8 66 18" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M155 19 Q157 11 159 19" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
            {/* pine tree */}
            <rect x="66" y="-18" width="4.5" height="24" rx="1" fill="#222232" />
            <polygon points="68.25,-42 84,-12 52.5,-12" fill="#0D1E10" stroke="#4AF0A0" strokeWidth="0.9" opacity="0.88" />
            <polygon points="68.25,-30 80,-8 56.5,-8" fill="#122218" stroke="#4AF0A0" strokeWidth="0.6" opacity="0.5" />
            {/* small cabin */}
            <rect x="122" y="1" width="32" height="21" rx="1" fill="#0C0C0F" stroke="#5B6AF5" strokeWidth="1.3" opacity="0.9" />
            <polygon points="122,1 138,-13 154,1" fill="#0C0C0F" stroke="#5B6AF5" strokeWidth="1.3" opacity="0.9" />
            {/* cabin windows — lit */}
            <rect x="127" y="7" width="8" height="7" rx="1.5" fill="#5B6AF5" opacity="0.6" />
            <rect x="140" y="7" width="8" height="7" rx="1.5" fill="#5B6AF5" opacity="0.6" />
            {/* chimney */}
            <rect x="144" y="-9" width="5" height="12" rx="1" fill="#0C0C0F" stroke="#5B6AF5" strokeWidth="0.8" opacity="0.7" />
            {/* smoke puff */}
            <motion.g
              animate={{ y: [-6, -18], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
            >
              <circle cx="146.5" cy="-14" r="4.5" fill="#1E1E2E" />
            </motion.g>
            <motion.g
              animate={{ y: [-6, -20], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
            >
              <circle cx="149" cy="-16" r="3.5" fill="#1E1E2E" />
            </motion.g>
            {/* rock cluster */}
            <ellipse cx="85" cy="20" rx="10" ry="6" fill="#1A1A2A" stroke="#2E2E3E" strokeWidth="0.8" />
            <ellipse cx="93" cy="21" rx="7" ry="5" fill="#161622" stroke="#2E2E3E" strokeWidth="0.8" />
          </g>
        </motion.g>

        {/* ── Sparkle particles ── */}
        {[
          { cx: 316, cy: 262, c: '#5B6AF5', r: 2.8, d: 0 },
          { cx: 674, cy: 182, c: '#F5855B', r: 2.2, d: 1.6 },
          { cx: 488, cy: 432, c: '#4AF0A0', r: 2.0, d: 0.9 },
          { cx: 855, cy: 278, c: '#5B6AF5', r: 1.6, d: 2.4 },
          { cx: 192, cy: 388, c: '#4AF0A0', r: 1.6, d: 3.2 },
          { cx: 560, cy: 120, c: '#F5855B', r: 1.2, d: 0.5 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx} cy={p.cy} r={p.r}
            fill={p.c}
            animate={{ opacity: [0.7, 0.08, 0.7], scale: [1, 1.5, 1] }}
            transition={{ duration: 3.2 + i * 0.5, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}

// ─── Constellation bg — for FeaturedWork section ─────────────────────────────
const NODES = Array.from({ length: 18 }, (_, i) => {
  const a = i * 2.3999632 * 1.4
  return {
    x: (Math.sin(a) * 0.42 + 0.5) * 100,
    y: (Math.cos(a * 0.9) * 0.42 + 0.5) * 100,
  }
})
const EDGES = [
  [0,1],[1,3],[3,5],[5,7],[7,2],[2,0],[4,6],[6,8],[8,10],[10,4],
  [1,9],[9,11],[11,13],[3,12],[12,14],[5,15],[7,16],[16,17],
]

export function ConstellationBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {EDGES.map(([a, b], i) => {
          const na = NODES[a], nb = NODES[b]
          if (!na || !nb) return null
          return (
            <motion.line
              key={i}
              x1={`${na.x}%`} y1={`${na.y}%`}
              x2={`${nb.x}%`} y2={`${nb.y}%`}
              stroke="#5B6AF5"
              strokeWidth="0.08"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.18, 0] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
          )
        })}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={`${n.x}%`} cy={`${n.y}%`}
            r="0.25"
            fill="#5B6AF5"
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}

// ─── Rolling hills — between sections ────────────────────────────────────────
export function HillsDivider() {
  return (
    <div className="relative w-full pointer-events-none overflow-hidden" style={{ height: 180, zIndex: 2 }} aria-hidden="true">
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
        {/* back ridge */}
        <path
          d="M0 90 Q180 28 360 70 Q540 112 720 48 Q900 -16 1080 36 Q1260 88 1440 30 L1440 180 L0 180 Z"
          fill="#0F0F18"
          opacity="0.75"
        />
        {/* front ridge */}
        <path
          d="M0 118 Q210 54 420 96 Q630 138 840 74 Q1050 10 1260 62 Q1380 90 1440 58 L1440 180 L0 180 Z"
          fill="#0C0C0F"
        />
        {/* trees on back ridge */}
        {[168, 400, 720, 1010, 1280].map((x, i) => {
          const baseY = i % 2 === 0 ? 62 : 52
          return (
            <g key={i} transform={`translate(${x},${baseY})`} opacity="0.55">
              <rect x="-2" y="0" width="4" height="18" rx="1" fill="#1A2A1A" />
              <ellipse cx="0" cy="-6" rx="11" ry="9" fill="#111E11" />
            </g>
          )
        })}
        {/* mushrooms */}
        {[280, 900].map((x, i) => (
          <g key={i} transform={`translate(${x},120)`} opacity="0.45">
            <rect x="-2" y="0" width="4" height="10" rx="1" fill="#2A1A2A" />
            <ellipse cx="0" cy="-2" rx="9" ry="6" fill="#3A1A3A" />
            <circle cx="-3" cy="-3" r="1.5" fill="white" opacity="0.4" />
            <circle cx="2" cy="-5" r="1.2" fill="white" opacity="0.4" />
          </g>
        ))}
      </svg>
    </div>
  )
}

// ─── City horizon — for footer ────────────────────────────────────────────────
const BUILDINGS = [
  { x: 0,    w: 70,  h: 100 }, { x: 60,   w: 50,  h: 140 },
  { x: 100,  w: 90,  h: 80  }, { x: 180,  w: 40,  h: 170 },
  { x: 210,  w: 60,  h: 110 }, { x: 260,  w: 80,  h: 150 },
  { x: 330,  w: 50,  h: 90  }, { x: 370,  w: 70,  h: 200 },
  { x: 430,  w: 45,  h: 120 }, { x: 465,  w: 90,  h: 160 },
  { x: 545,  w: 55,  h: 100 }, { x: 590,  w: 80,  h: 180 },
  { x: 660,  w: 50,  h: 130 }, { x: 700,  w: 70,  h: 95  },
  { x: 760,  w: 60,  h: 155 }, { x: 810,  w: 90,  h: 110 },
  { x: 890,  w: 45,  h: 175 }, { x: 925,  w: 70,  h: 130 },
  { x: 985,  w: 55,  h: 90  }, { x: 1030, w: 80,  h: 145 },
  { x: 1100, w: 50,  h: 120 }, { x: 1140, w: 65,  h: 165 },
  { x: 1195, w: 80,  h: 100 }, { x: 1265, w: 50,  h: 140 },
  { x: 1305, w: 70,  h: 85  }, { x: 1365, w: 75,  h: 120 },
]
const BASE_Y = 220

export function CityHorizon() {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden" style={{ height: 260, zIndex: 1 }} aria-hidden="true">
      <svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax meet" className="absolute bottom-0 w-full" fill="none">
        {/* Ground */}
        <rect x="0" y={BASE_Y} width="1440" height="40" fill="#0C0C0F" />
        {/* Buildings */}
        {BUILDINGS.map((b, i) => {
          const y = BASE_Y - b.h
          const hasAntenna = b.h > 140
          return (
            <g key={i}>
              <rect x={b.x} y={y} width={b.w} height={b.h} fill="#0F0F18" stroke="#1A1A28" strokeWidth="0.8" />
              {/* windows — lit grid */}
              {Array.from({ length: Math.floor(b.h / 22) }, (_, row) =>
                Array.from({ length: Math.floor(b.w / 18) }, (_, col) => {
                  const wx = b.x + 6 + col * 18
                  const wy = y + 10 + row * 22
                  const lit = (i + row * 3 + col * 7) % 5 !== 0
                  return lit ? (
                    <rect key={`${row}-${col}`} x={wx} y={wy} width="8" height="6" rx="1"
                      fill="#5B6AF5" opacity={0.12 + ((i + row + col) % 4) * 0.07} />
                  ) : null
                })
              )}
              {/* antenna */}
              {hasAntenna && (
                <>
                  <rect x={b.x + b.w / 2 - 1.5} y={y - 22} width="3" height="22" rx="1" fill="#1A1A28" />
                  <motion.circle
                    cx={b.x + b.w / 2} cy={y - 24} r="3.5"
                    fill="#F5855B"
                    animate={{ opacity: [0.9, 0.2, 0.9] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  />
                </>
              )}
            </g>
          )
        })}
        {/* Fog / gradient fade at top */}
        <defs>
          <linearGradient id="cityFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0C0C0F" stopOpacity="1" />
            <stop offset="60%" stopColor="#0C0C0F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1440" height="260" fill="url(#cityFade)" />
      </svg>
    </div>
  )
}
