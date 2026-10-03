'use client'

import React, { useState, useRef } from 'react'
import { Sparkles, Clock, UserCheck, Microscope } from 'lucide-react'

const reasons = [
  {
    icon: Sparkles,
    title: 'Rapid 24-Hr Mobilization',
    badge: 'Fast Track',
    description: 'Our tissue-sparing surgical approach minimizes muscle trauma, allowing knee and hip replacement patients to stand and walk safely within 24 hours.',
    color: '#059B8F',
    glow: 'rgba(5,155,143,0.3)',
    num: '01',
  },
  {
    icon: UserCheck,
    title: 'Delhi-Trained Surgeon',
    badge: 'Ex-MAMC',
    description: 'Senior residency at Maulana Azad Medical College (MAMC) & Lok Nayak Hospital New Delhi brings tier-1 capital surgical standards directly to Kanpur.',
    color: '#0A7C97',
    glow: 'rgba(10,124,151,0.3)',
    num: '02',
  },
  {
    icon: Clock,
    title: 'Dual Clinic Network',
    badge: 'Accessible',
    description: 'Dedicated evening consultations in Swaroop Nagar (4–7 PM) and morning OPD + 24/7 emergency trauma care at BMTC Kidwai Nagar.',
    color: '#02BAB9',
    glow: 'rgba(2,186,185,0.3)',
    num: '03',
  },
  {
    icon: Microscope,
    title: 'Modular OT & US-FDA Implants',
    badge: 'Zero Infection',
    description: 'Surgeries performed in Class-100 HEPA-filtered laminar airflow theaters using gold-standard ceramic, titanium, and high-flexion implants.',
    color: '#F18712',
    glow: 'rgba(241,135,18,0.3)',
    num: '04',
  },
]

function Tilt3DCard({ reason, idx }: { reason: typeof reasons[number]; idx: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -10, y: dx * 10 })
  }
  function onMouseEnter() { setHovered(true) }
  function onMouseLeave() { setTilt({ x: 0, y: 0 }); setHovered(false) }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative rounded-3xl p-6 sm:p-8 border overflow-hidden cursor-default group"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${reason.color}14 0%, white 100%)`
          : 'white',
        borderColor: hovered ? reason.color + '55' : 'rgba(226,232,240,0.8)',
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? '8px' : '0'})`,
        transition: 'transform 0.12s ease-out, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? `0 28px 60px ${reason.glow}, 0 4px 12px rgba(0,0,0,0.06)`
          : '0 2px 6px rgba(0,0,0,0.04)',
        willChange: 'transform',
      }}
    >
      {/* Depth glint */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      {/* Large faded number (3D depth element) */}
      <div
        className="absolute -right-2 -bottom-4 text-[90px] font-black select-none pointer-events-none leading-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300"
        style={{ color: reason.color, transform: 'translateZ(10px)' }}
      >
        {reason.num}
      </div>

      <div style={{ transform: 'translateZ(16px)', transformStyle: 'preserve-3d' }} className="relative">
        {/* Icon + Badge */}
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: hovered ? reason.color + '22' : reason.color + '12',
              color: reason.color,
              boxShadow: hovered ? `0 0 20px ${reason.color}44` : 'none',
            }}
          >
            <reason.icon size={24} />
          </div>
          <span
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-all duration-300"
            style={{
              background: hovered ? reason.color + '18' : 'rgba(241,245,249,0.9)',
              color: hovered ? reason.color : '#64748b',
              border: `1px solid ${hovered ? reason.color + '40' : 'transparent'}`,
            }}
          >
            {reason.badge}
          </span>
        </div>

        <h3
          className="text-lg sm:text-xl font-serif font-bold mb-3 leading-snug transition-colors duration-300"
          style={{ color: hovered ? reason.color : '#0f172a' }}
        >
          {reason.title}
        </h3>
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          {reason.description}
        </p>
      </div>

      {/* Bottom color bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-1 rounded-b-3xl transition-all duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)` }}
      />
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">
            The Joint Clinic Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Why Choose Joint Clinic?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            At Joint Clinic, we combine sub-millimeter surgical precision with dedicated personal care to restore your pain-free mobility for life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((reason, idx) => (
            <Tilt3DCard key={idx} reason={reason} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
