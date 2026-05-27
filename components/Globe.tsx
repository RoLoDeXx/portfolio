'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const R = 185
const FOV = 540
const TILT = 0.38 // axial tilt in radians (~22°)

type V3 = [number, number, number]

const toRad = (d: number) => (d * Math.PI) / 180

function onSphere(lat: number, lon: number, r = R): V3 {
  const phi = toRad(lat), th = toRad(lon)
  return [r * Math.cos(phi) * Math.cos(th), r * Math.sin(phi), r * Math.cos(phi) * Math.sin(th)]
}

function ry(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]
}
function rx(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]
}
function proj(p: V3, cx: number, cy: number) {
  const sc = FOV / (FOV + p[2])
  return { x: cx + p[0] * sc, y: cy - p[1] * sc, z: p[2] }
}

function greatArc(lat1: number, lon1: number, lat2: number, lon2: number, n = 64): V3[] {
  const a = onSphere(lat1, lon1, 1)
  const b = onSphere(lat2, lon2, 1)
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n
    const v: V3 = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
    return [v[0] / len * R, v[1] / len * R, v[2] / len * R] as V3
  })
}

const CITIES = [
  { lat: 28.6,   lon: 77.2,   color: '#4AF0A0', home: true  }, // Delhi
  { lat: 51.5,   lon: -0.1,   color: '#5B6AF5', home: false }, // London
  { lat: 37.8,   lon: -122.4, color: '#5B6AF5', home: false }, // SF
  { lat: 35.7,   lon: 139.7,  color: '#A78BFA', home: false }, // Tokyo
  { lat: 1.3,    lon: 103.8,  color: '#A78BFA', home: false }, // Singapore
  { lat: -33.9,  lon: 151.2,  color: '#5B6AF5', home: false }, // Sydney
] as const

const ARC_PAIRS: [number, number][] = [[0, 1], [1, 2], [0, 4], [2, 3], [3, 4], [4, 5]]
const ARC_COLORS = ['#4AF0A0', '#5B6AF5', '#A78BFA', '#5B6AF5', '#A78BFA', '#5B6AF5']

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const velRef = useRef(0)
  const rafRef = useRef(0)
  const visibleRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ── Static geometry ──────────────────────────────────────────
    const gridPts: V3[] = []
    for (let lat = -90; lat <= 90; lat += 15)
      for (let lon = 0; lon < 360; lon += 15)
        gridPts.push(onSphere(lat, lon))

    const latLines: V3[][] = Array.from({ length: 11 }, (_, i) =>
      Array.from({ length: 121 }, (_, j) => onSphere(-75 + i * 15, j * 3))
    )
    const lonLines: V3[][] = Array.from({ length: 12 }, (_, i) =>
      Array.from({ length: 61 }, (_, j) => onSphere(-90 + j * 3, i * 30))
    )

    const arcs = ARC_PAIRS.map(([a, b]) =>
      greatArc(CITIES[a].lat, CITIES[a].lon, CITIES[b].lat, CITIES[b].lon)
    )
    const cityPts = CITIES.map(c => onSphere(c.lat, c.lon))

    // ── State ────────────────────────────────────────────────────
    let angle = 0.3
    let lastSY = window.scrollY
    let arcOff = 0

    // ── Handlers ─────────────────────────────────────────────────
    const onScroll = () => {
      velRef.current += (window.scrollY - lastSY) * 0.003
      lastSY = window.scrollY
    }

    const resize = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
    }

    const observer = new IntersectionObserver(
      ([e]) => { visibleRef.current = e.isIntersecting },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    resize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)

    // ── Draw loop ─────────────────────────────────────────────────
    const frame = () => {
      rafRef.current = requestAnimationFrame(frame)
      if (!visibleRef.current) return

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      const cx = W / 2, cy = H / 2

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      velRef.current *= 0.92
      angle += 0.0026 + velRef.current
      arcOff += 0.007

      const T = (p: V3): V3 => ry(rx(p, TILT), angle)

      // 1 · Atmosphere glow
      const atm = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35)
      atm.addColorStop(0,   'rgba(91,106,245,0.08)')
      atm.addColorStop(0.5, 'rgba(91,106,245,0.03)')
      atm.addColorStop(1,   'rgba(91,106,245,0)')
      ctx.fillStyle = atm
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2)
      ctx.fill()

      // 2 · Wireframe lines
      const drawLines = (lines: V3[][], alpha: number) => {
        for (const line of lines) {
          ctx.beginPath()
          let down = false
          for (const pt of line) {
            const { x, y, z } = proj(T(pt), cx, cy)
            const d = (z + R) / (2 * R)
            if (d < 0.03) { down = false; continue }
            if (!down) { ctx.moveTo(x, y); down = true } else ctx.lineTo(x, y)
          }
          ctx.strokeStyle = `rgba(91,106,245,${alpha})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
      drawLines(latLines, 0.11)
      drawLines(lonLines, 0.11)

      // 3 · Grid dots (front hemisphere only)
      for (const pt of gridPts) {
        const { x, y, z } = proj(T(pt), cx, cy)
        const d = (z + R) / (2 * R)
        if (d < 0.5) continue
        const t = (d - 0.5) / 0.5
        ctx.beginPath()
        ctx.arc(x, y, 0.9 + t * 1.1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91,106,245,${0.1 + t * 0.55})`
        ctx.fill()
      }

      // 4 · Animated arcs
      for (let ai = 0; ai < arcs.length; ai++) {
        ctx.save()
        ctx.setLineDash([5, 16])
        ctx.lineDashOffset = -(arcOff * 55 + ai * 28)
        ctx.beginPath()
        let down = false
        for (const pt of arcs[ai]) {
          const { x, y, z } = proj(T(pt), cx, cy)
          const d = (z + R) / (2 * R)
          if (d < 0.22) { down = false; continue }
          if (!down) { ctx.moveTo(x, y); down = true } else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = ARC_COLORS[ai] + 'aa'
        ctx.lineWidth = 1.3
        ctx.shadowColor = ARC_COLORS[ai]
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.restore()
      }

      // 5 · City pins
      const now = Date.now() * 0.0014
      for (let ci = 0; ci < CITIES.length; ci++) {
        const { x, y, z } = proj(T(cityPts[ci]), cx, cy)
        const d = (z + R) / (2 * R)
        if (d < 0.3) continue

        const city = CITIES[ci]
        const isHome = city.home
        const baseR = isHome ? 5 : 3
        const pulse = 0.5 + 0.5 * Math.sin(now + ci * 1.9)
        const ringR = baseR + pulse * (isHome ? 9 : 5)
        const ringAlpha = Math.floor((0.12 + pulse * 0.22) * 255).toString(16).padStart(2, '0')

        // Pulse ring
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = city.color + ringAlpha
        ctx.lineWidth = 1
        ctx.shadowColor = city.color
        ctx.shadowBlur = isHome ? 18 : 10
        ctx.stroke()
        ctx.restore()

        // Core dot
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, baseR, 0, Math.PI * 2)
        ctx.fillStyle = city.color
        ctx.shadowColor = city.color
        ctx.shadowBlur = isHome ? 22 : 13
        ctx.fill()
        ctx.restore()
      }

      // 6 · Globe edge ring
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(91,106,245,0.2)'
      ctx.lineWidth = 1.5
      ctx.shadowColor = '#5B6AF5'
      ctx.shadowBlur = 28
      ctx.stroke()
      ctx.restore()
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(91,106,245,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center mb-3 px-6"
      >
        <h2 className="font-mono text-3xl font-medium text-ds-text">
          Ships to engineers everywhere
        </h2>
        <p className="font-sans text-sm text-ds-muted mt-3">
          Design Stack powers 27+ apps across teams worldwide — scroll to spin.
        </p>
      </motion.div>

      {/* Globe */}
      <motion.div
        ref={wrapRef}
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        className="relative mx-auto"
        style={{ width: '100%', maxWidth: 520, height: 500 }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </motion.div>

      {/* City legend */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative z-10 flex flex-wrap justify-center gap-4 px-6"
      >
        {[
          { label: 'Delhi', color: '#4AF0A0', note: 'home' },
          { label: 'London',    color: '#5B6AF5' },
          { label: 'San Francisco', color: '#5B6AF5' },
          { label: 'Tokyo',    color: '#A78BFA' },
          { label: 'Singapore', color: '#A78BFA' },
          { label: 'Sydney',   color: '#5B6AF5' },
        ].map(c => (
          <span key={c.label} className="flex items-center gap-1.5 font-mono text-[11px] text-ds-muted">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: c.color, boxShadow: `0 0 5px ${c.color}` }}
            />
            {c.label}
            {c.note && (
              <span style={{ color: c.color }} className="opacity-70">({c.note})</span>
            )}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
