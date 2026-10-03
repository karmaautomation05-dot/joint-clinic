'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface JointZone {
  id: string
  label: string
  cx: number
  cy: number
  r: number
  slug: string
  desc: string
  color: string
  ringColor: string
}

const JOINTS: JointZone[] = [
  { id: 'shoulder', label: 'Shoulder', cx: 88, cy: 122, r: 14, slug: 'shoulder-arthroscopy', desc: 'Rotator cuff repair, SLAP, labral tears & instability', color: '#059B8F', ringColor: '#d4f6f6' },
  { id: 'elbow',    label: 'Elbow',    cx: 68, cy: 178, r: 11, slug: 'total-knee-replacement', desc: 'Tennis / golfer\'s elbow, fracture fixation & ligament repair', color: '#0A7C97', ringColor: '#cce4ed' },
  { id: 'hip',      label: 'Hip',      cx: 105, cy: 228, r: 16, slug: 'hip-replacement', desc: 'Total hip arthroplasty, avascular necrosis & dysplasia correction', color: '#F18712', ringColor: '#fce38d' },
  { id: 'knee',     label: 'Knee',     cx: 105, cy: 308, r: 15, slug: 'total-knee-replacement', desc: 'Total knee replacement, ACL / PCL repair & meniscus surgery', color: '#02BAB9', ringColor: '#a9eeee' },
  { id: 'ankle',    label: 'Ankle',    cx: 108, cy: 378, r: 10, slug: 'complex-trauma-fractures', desc: 'Ankle arthroscopy, fracture fixation & ligament reconstruction', color: '#059B8F', ringColor: '#d4f6f6' },
  { id: 'spine',    label: 'Spine',    cx: 148, cy: 195, r: 12, slug: 'joint-preservation-prp', desc: 'Disc herniation, spondylosis & spinal canal stenosis treatment', color: '#01B3BF', ringColor: '#b8f2f2' },
]

export default function BodyMapSelector() {
  const [active, setActive] = useState<JointZone | null>(JOINTS[3]) // knee default

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-900 via-[#0A7C97]/90 to-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      {/* Ambient glow blobs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-600/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-widest mb-4">
            Interactive Anatomy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Select Your Joint — We Treat It
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Click any highlighted joint on the diagram to explore the surgical procedures and treatments available at Joint Clinic.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          {/* SVG Body Map */}
          <div className="relative flex-shrink-0 w-[220px] sm:w-[260px]" style={{ perspective: '800px' }}>
            {/* 3D card wrapper */}
            <div className="relative w-full" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-4deg) rotateX(2deg)' }}>
              {/* Glow behind figure */}
              <div className="absolute inset-x-8 top-8 bottom-8 bg-brand-500/10 blur-2xl rounded-full pointer-events-none" />
              <svg
                viewBox="0 0 220 440"
                className="w-full drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 24px rgba(5,155,143,0.18))' }}
              >
                {/* ── Body silhouette paths ── */}
                {/* Head */}
                <ellipse cx="130" cy="42" rx="22" ry="27" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* Neck */}
                <rect x="122" y="66" width="16" height="16" rx="4" fill="#1e293b" />
                {/* Torso */}
                <path d="M 88 82 L 68 195 L 88 215 L 88 235 L 172 235 L 172 215 L 192 195 L 172 82 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* Left arm */}
                <path d="M 88 82 Q 60 90 55 130 L 45 200 Q 43 218 50 220 L 60 220 Q 67 218 70 200 L 80 130 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
                {/* Right arm (our view left) */}
                <path d="M 172 82 Q 200 90 205 130 L 215 200 Q 217 218 210 220 L 200 220 Q 193 218 190 200 L 180 130 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
                {/* Left thigh */}
                <path d="M 88 235 L 75 310 L 88 320 L 102 310 L 105 235 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
                {/* Right thigh */}
                <path d="M 120 235 L 118 310 L 132 320 L 145 310 L 172 235 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
                {/* Left shin */}
                <path d="M 78 320 L 72 390 L 85 395 L 100 390 L 100 320 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
                {/* Right shin */}
                <path d="M 120 320 L 120 390 L 135 395 L 148 390 L 142 320 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
                {/* Left foot */}
                <ellipse cx="86" cy="400" rx="17" ry="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                {/* Right foot */}
                <ellipse cx="134" cy="400" rx="17" ry="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                {/* Spine line */}
                <line x1="130" y1="82" x2="130" y2="230" stroke="#0A7C97" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
                {/* Skeletal cross-hatching for ribcage */}
                {[100,112,124,136,148,160].map((y, i) => (
                  <line key={i} x1="95" y1={y} x2="165" y2={y} stroke="#334155" strokeWidth="0.8" opacity="0.5" />
                ))}

                {/* ── Joint hotspots ── */}
                {JOINTS.map((j) => {
                  const isActive = active?.id === j.id
                  return (
                    <g key={j.id} style={{ cursor: 'pointer' }} onClick={() => setActive(j)}>
                      {/* Pulse ring */}
                      {isActive && (
                        <circle cx={j.cx} cy={j.cy} r={j.r + 8} fill="none" stroke={j.color} strokeWidth="1.5" opacity="0.4">
                          <animate attributeName="r" values={`${j.r + 6};${j.r + 14};${j.r + 6}`} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* Fill disc */}
                      <circle
                        cx={j.cx} cy={j.cy} r={j.r}
                        fill={isActive ? j.color : 'rgba(5,155,143,0.15)'}
                        stroke={j.color}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        opacity={isActive ? 1 : 0.7}
                        style={{ transition: 'all 0.3s ease', filter: isActive ? `drop-shadow(0 0 8px ${j.color}88)` : 'none' }}
                      />
                      {/* Cross-hair inside */}
                      <line x1={j.cx - j.r * 0.4} y1={j.cy} x2={j.cx + j.r * 0.4} y2={j.cy} stroke={isActive ? 'white' : j.color} strokeWidth="1.5" opacity="0.8" />
                      <line x1={j.cx} y1={j.cy - j.r * 0.4} x2={j.cx} y2={j.cy + j.r * 0.4} stroke={isActive ? 'white' : j.color} strokeWidth="1.5" opacity="0.8" />
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="flex flex-col gap-4 w-full max-w-sm lg:max-w-md">
            {/* Legend dots */}
            <div className="flex flex-wrap gap-2 mb-2">
              {JOINTS.map((j) => (
                <button
                  key={j.id}
                  onClick={() => setActive(j)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200"
                  style={{
                    borderColor: active?.id === j.id ? j.color : 'rgba(255,255,255,0.15)',
                    background: active?.id === j.id ? j.color + '22' : 'rgba(255,255,255,0.05)',
                    color: active?.id === j.id ? j.color : '#94a3b8',
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: j.color }} />
                  {j.label}
                </button>
              ))}
            </div>

            {/* Active zone card */}
            {active && (
              <div
                key={active.id}
                className="relative rounded-3xl p-6 sm:p-8 border overflow-hidden transition-all duration-400"
                style={{
                  borderColor: active.color + '40',
                  background: `linear-gradient(135deg, ${active.color}12 0%, rgba(10,28,40,0.85) 100%)`,
                  boxShadow: `0 0 40px ${active.color}22`,
                }}
              >
                {/* Big faded label bg */}
                <div className="absolute -right-4 -bottom-4 text-[80px] font-black opacity-5 select-none pointer-events-none leading-none" style={{ color: active.color }}>
                  {active.label.charAt(0)}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  {/* Joint icon dot */}
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: active.color + '22', border: `1.5px solid ${active.color}55` }}>
                    <span className="text-xl leading-none" style={{ color: active.color }}>✦</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: active.color }}>
                      {active.label} Joint
                    </div>
                    <div className="text-white text-lg font-serif font-bold leading-tight">
                      {active.label === 'Knee'    ? 'Knee Replacement & Arthroscopy' :
                       active.label === 'Hip'     ? 'Hip Arthroplasty & Preservation' :
                       active.label === 'Shoulder' ? 'Shoulder Arthroscopy & Repair' :
                       active.label === 'Spine'   ? 'Spinal Pain & Disc Treatment' :
                       active.label === 'Elbow'   ? 'Elbow Reconstruction' :
                                                    'Ankle Fracture & Ligament Care'}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {active.desc}
                </p>

                {/* Mini stat pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Walk in 24hr', 'US-FDA Implants', 'Class-100 OT'].map((pill) => (
                    <span key={pill} className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: active.color + '22', color: active.color, border: `1px solid ${active.color}44` }}>
                      ✓ {pill}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/treatments/${active.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:gap-3"
                  style={{ background: active.color, color: 'white' }}
                >
                  Explore {active.label} Treatments
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
