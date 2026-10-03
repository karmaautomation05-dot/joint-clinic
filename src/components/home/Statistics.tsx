'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Award, Activity, HeartPulse, Star } from 'lucide-react'

const stats = [
  {
    icon: Award,
    label: 'Surgical Experience',
    value: '20+',
    numericEnd: 20,
    suffix: '+',
    unit: 'Years',
    detail: 'Ex-SR MAMC New Delhi',
    color: '#059B8F',
    bg: 'from-brand-600/10 to-brand-700/5',
    glow: 'rgba(5,155,143,0.25)',
    borderActive: '#059B8F',
  },
  {
    icon: Activity,
    label: 'Successful Operations',
    value: '5,000+',
    numericEnd: 5000,
    suffix: '+',
    unit: 'Procedures',
    detail: 'Knee, Hip & Arthroscopy',
    color: '#0A7C97',
    bg: 'from-[#0A7C97]/10 to-[#059B8F]/5',
    glow: 'rgba(10,124,151,0.25)',
    borderActive: '#0A7C97',
  },
  {
    icon: HeartPulse,
    label: 'Walking Mobilization',
    value: '24-Hr',
    numericEnd: 24,
    suffix: '-Hr',
    unit: 'Protocol',
    detail: 'Tissue-Sparing Technique',
    color: '#02BAB9',
    bg: 'from-[#02BAB9]/10 to-[#01B3BF]/5',
    glow: 'rgba(2,186,185,0.25)',
    borderActive: '#02BAB9',
  },
  {
    icon: Star,
    label: 'Patient Satisfaction',
    value: '5.0★',
    numericEnd: 5,
    suffix: '.0★',
    unit: 'Rating',
    detail: '41+ Verified Reviews',
    color: '#F18712',
    bg: 'from-accent-500/10 to-accent-300/5',
    glow: 'rgba(241,135,18,0.25)',
    borderActive: '#F18712',
  },
]

function useCountUp(end: number, duration = 1600, triggered: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    let start = 0
    const startTime = performance.now()
    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(end)
    }
    requestAnimationFrame(tick)
  }, [end, duration, triggered])
  return count
}

function StatCard({ stat, idx, triggered }: { stat: typeof stats[number]; idx: number; triggered: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const count = useCountUp(stat.numericEnd, 1200 + idx * 200, triggered)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -8, y: dx * 8 })
  }
  function onMouseLeave() { setTilt({ x: 0, y: 0 }) }

  // Format display value
  const display =
    stat.numericEnd === 5000
      ? (count >= 1000 ? (count / 1000).toFixed(0) + ',000' : count.toString()) + '+'
      : stat.numericEnd === 5
      ? count.toFixed(0) + '.0★'
      : count + stat.suffix

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-3xl p-6 sm:p-8 border border-slate-200/60 cursor-default group overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: 'transform 0.12s ease-out, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: tilt.x !== 0 || tilt.y !== 0
          ? `0 24px 60px ${stat.glow}, 0 4px 12px rgba(0,0,0,0.08)`
          : '0 2px 8px rgba(0,0,0,0.05)',
        willChange: 'transform',
      }}
    >
      {/* Gradient bg layer */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      {/* Glint line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
      {/* 3D depth layer (slightly higher z when tilted) */}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} className="relative">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
            style={{ background: stat.color + '18', color: stat.color }}
          >
            <stat.icon size={22} />
          </div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
            {stat.unit}
          </span>
        </div>

        <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-none mb-1.5" style={{ color: stat.color }}>
          {triggered ? display : stat.value}
        </div>
        <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug mb-0.5">
          {stat.label}
        </div>
        <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
          {stat.detail}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl transition-all duration-500 group-hover:h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
      />
    </div>
  )
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect() } },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50/60 border-y border-slate-100 overflow-hidden relative">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #059B8F 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />
      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} idx={idx} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  )
}
