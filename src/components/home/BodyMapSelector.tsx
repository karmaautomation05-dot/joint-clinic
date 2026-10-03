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
  treatmentName: string
  stats: string[]
}

const JOINTS: JointZone[] = [
  {
    id: 'shoulder', label: 'Shoulder', cx: 92, cy: 134, r: 13,
    slug: 'shoulder-arthroscopy', color: '#059B8F',
    desc: 'Rotator cuff repair, SLAP tears, labral reconstruction & shoulder instability correction.',
    treatmentName: 'Shoulder Arthroscopy & Repair',
    stats: ['Same-day discharge', 'Arthroscopic (keyhole)', 'Full range in 12–16 wk'],
  },
  {
    id: 'elbow', label: 'Elbow', cx: 70, cy: 196, r: 10,
    slug: 'complex-trauma-fractures', color: '#0A7C97',
    desc: 'Tennis & golfer\'s elbow release, distal humerus fracture fixation, ligament reconstruction.',
    treatmentName: 'Elbow Reconstruction',
    stats: ['Local / regional anaesthesia', 'Day-care procedure', 'Back to work in 6 wk'],
  },
  {
    id: 'hip', label: 'Hip', cx: 108, cy: 246, r: 15,
    slug: 'hip-replacement', color: '#F18712',
    desc: 'Total hip arthroplasty, avascular necrosis core decompression & hip dysplasia correction.',
    treatmentName: 'Hip Arthroplasty & Preservation',
    stats: ['Walk next day', 'Ceramic / titanium implants', '25–30 yr implant life'],
  },
  {
    id: 'knee', label: 'Knee', cx: 108, cy: 330, r: 14,
    slug: 'total-knee-replacement', color: '#02BAB9',
    desc: 'Total & unicompartmental knee replacement, ACL/PCL reconstruction & meniscus surgery.',
    treatmentName: 'Knee Replacement & Arthroscopy',
    stats: ['Walk in 24 hr', 'High-flex implants', '20+ yr durability'],
  },
  {
    id: 'ankle', label: 'Ankle', cx: 110, cy: 408, r: 9,
    slug: 'complex-trauma-fractures', color: '#059B8F',
    desc: 'Ankle arthroscopy, bimalleolar & trimalleolar fracture ORIF, Achilles tendon repair.',
    treatmentName: 'Ankle Fracture & Ligament Care',
    stats: ['Minimally invasive', 'Cast-free protocol', 'Weight-bear in 4–6 wk'],
  },
  {
    id: 'spine', label: 'Spine', cx: 150, cy: 210, r: 11,
    slug: 'joint-preservation-prp', color: '#01B3BF',
    desc: 'Disc herniation, lumbar spondylosis, spinal canal stenosis & facet joint injection.',
    treatmentName: 'Spinal Pain & Disc Treatment',
    stats: ['PRP / regenerative', 'Outpatient procedure', 'Pain relief in 2–4 wk'],
  },
]

export default function BodyMapSelector() {
  const [active, setActive] = useState<JointZone>(JOINTS[3]) // knee default

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d2137 40%, #0a1e2f 70%, #0c1a2e 100%)' }}>

      {/* Fine dot-grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #59d6d4 1px, transparent 0)', backgroundSize: '28px 28px' }} />

      {/* Ambient glows */}
      <div className="absolute top-16 left-12 w-72 h-72 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(5,155,143,0.18) 0%, transparent 70%)' }} />
      <div className="absolute bottom-16 right-12 w-80 h-80 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(1,179,191,0.12) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl"
        style={{ background: `radial-gradient(circle, ${active.color}0d 0%, transparent 65%)`, transition: 'background 0.6s ease' }} />

      <div className="container relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-4"
            style={{ borderColor: `${active.color}40`, background: `${active.color}14`, color: active.color, transition: 'all 0.4s ease' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.color }} />
            Interactive Anatomy Map
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Select Your Joint — <span style={{ color: active.color, transition: 'color 0.4s ease' }}>We Treat It</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Tap any highlighted joint on the anatomy diagram to explore surgical treatments available at Joint Clinic, Kanpur.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">

          {/* ── Realistic Anatomy Figure ─────────────────────────────────────── */}
          <div className="relative flex-shrink-0 select-none" style={{ width: 240, perspective: '900px' }}>
            <div style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-5deg) rotateX(3deg)', transition: 'transform 0.8s ease' }}>
              {/* Card glow behind figure */}
              <div className="absolute inset-x-4 inset-y-8 rounded-full blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse, ${active.color}28 0%, transparent 70%)`, transition: 'background 0.5s ease' }} />

              <svg viewBox="0 0 240 480" className="w-full relative drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 32px rgba(5,155,143,0.15))' }}>
                <defs>
                  {/* Skin gradient */}
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a4a" />
                    <stop offset="50%" stopColor="#162d3d" />
                    <stop offset="100%" stopColor="#0f2030" />
                  </linearGradient>
                  {/* Muscle highlight */}
                  <linearGradient id="muscleHL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#243d50" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#2a4d63" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1a3044" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="limbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1a3346" />
                    <stop offset="50%" stopColor="#203d52" />
                    <stop offset="100%" stopColor="#152a3a" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* ── HEAD ── */}
                <ellipse cx="130" cy="40" rx="23" ry="27" fill="url(#bodyGrad)" stroke="#2a4a60" strokeWidth="1.5" />
                {/* Face detail */}
                <ellipse cx="130" cy="46" rx="16" ry="18" fill="none" stroke="#2a4a60" strokeWidth="0.5" opacity="0.5" />
                {/* Neck */}
                <path d="M120 64 Q130 68 140 64 L141 82 Q130 86 119 82 Z" fill="url(#bodyGrad)" stroke="#243d50" strokeWidth="1" />
                {/* Hair line */}
                <path d="M107 34 Q130 18 153 34" fill="none" stroke="#2a4a60" strokeWidth="1.5" />

                {/* ── TORSO ── */}
                {/* Chest/torso main body */}
                <path d="M 90 82 Q 82 90 78 110 L 70 200 Q 68 215 72 222 L 78 225 Q 85 235 108 238 L 152 238 Q 175 235 182 225 L 188 222 Q 192 215 190 200 L 182 110 Q 178 90 170 82 Z"
                  fill="url(#bodyGrad)" stroke="#243d50" strokeWidth="1.5" />
                {/* Pectoral / chest muscle lines */}
                <path d="M 105 95 Q 130 102 155 95" fill="none" stroke="#2a4a60" strokeWidth="1" opacity="0.7" />
                <path d="M 103 107 Q 130 115 157 107" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.5" />
                {/* Sternum line */}
                <line x1="130" y1="85" x2="130" y2="165" stroke="#2a4a60" strokeWidth="0.8" opacity="0.6" strokeDasharray="3 4" />
                {/* Ribcage lines */}
                {[98, 110, 122, 134, 146, 158].map((y, i) => (
                  <path key={i}
                    d={`M ${i % 2 === 0 ? 105 : 103} ${y} Q 130 ${y + 4} ${i % 2 === 0 ? 155 : 157} ${y}`}
                    fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.45" />
                ))}
                {/* Abdominal segments */}
                <path d="M 115 165 Q 130 168 145 165" fill="none" stroke="#2a4a60" strokeWidth="0.9" opacity="0.5" />
                <path d="M 112 180 Q 130 183 148 180" fill="none" stroke="#2a4a60" strokeWidth="0.9" opacity="0.5" />
                <path d="M 112 196 Q 130 199 148 196" fill="none" stroke="#2a4a60" strokeWidth="0.9" opacity="0.5" />
                {/* Oblique muscle lines */}
                <path d="M 85 155 Q 90 175 88 195" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.4" />
                <path d="M 175 155 Q 170 175 172 195" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.4" />

                {/* ── LEFT ARM (viewer's right) ── */}
                <path d="M 90 88 Q 66 96 58 136 L 48 210 Q 46 225 52 228 L 60 229 Q 68 228 72 215 L 82 138 Q 88 110 94 94 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1.2" />
                {/* Deltoid definition */}
                <path d="M 88 92 Q 78 96 74 110" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.6" />
                {/* Bicep line */}
                <path d="M 72 130 Q 66 158 64 185" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.5" />
                {/* Forearm */}
                <path d="M 56 200 Q 50 215 50 228 L 46 230 Q 44 232 48 235 L 56 236 Q 62 234 64 228 L 70 213 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1" />
                {/* Left hand */}
                <ellipse cx="52" cy="238" rx="9" ry="7" fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1" />

                {/* ── RIGHT ARM (viewer's left) ── */}
                <path d="M 170 88 Q 194 96 202 136 L 212 210 Q 214 225 208 228 L 200 229 Q 192 228 188 215 L 178 138 Q 172 110 166 94 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1.2" />
                <path d="M 172 92 Q 182 96 186 110" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.6" />
                <path d="M 188 130 Q 194 158 196 185" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.5" />
                <path d="M 204 200 Q 210 215 210 228 L 214 230 Q 216 232 212 235 L 204 236 Q 198 234 196 228 L 190 213 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1" />
                <ellipse cx="208" cy="238" rx="9" ry="7" fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1" />

                {/* ── PELVIS ── */}
                <path d="M 78 228 Q 72 238 74 250 Q 82 262 108 265 L 152 265 Q 178 262 186 250 Q 188 238 182 228 Z"
                  fill="url(#bodyGrad)" stroke="#243d50" strokeWidth="1.2" />
                {/* Pelvis bone detail */}
                <path d="M 86 242 Q 108 256 152 242" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.5" />
                <line x1="130" y1="228" x2="130" y2="265" stroke="#2a4a60" strokeWidth="0.6" opacity="0.5" strokeDasharray="3 3" />

                {/* ── LEFT THIGH ── */}
                <path d="M 80 260 Q 72 280 68 320 L 76 344 Q 84 350 96 348 L 108 344 Q 116 342 118 320 Q 116 280 114 260 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1.2" />
                {/* Quad lines */}
                <path d="M 82 275 Q 88 300 86 325" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.45" />
                <path d="M 94 268 Q 98 300 96 330" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.45" />
                <path d="M 106 268 Q 110 300 108 330" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.45" />

                {/* ── RIGHT THIGH ── */}
                <path d="M 146 260 Q 144 280 142 320 L 148 344 Q 156 350 166 348 L 178 344 Q 188 342 192 320 Q 188 280 182 260 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1.2" />
                <path d="M 178 275 Q 172 300 174 325" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.45" />
                <path d="M 166 268 Q 162 300 164 330" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.45" />
                <path d="M 154 268 Q 150 300 152 330" fill="none" stroke="#2a4a60" strokeWidth="0.7" opacity="0.45" />

                {/* ── LEFT SHIN ── */}
                <path d="M 75 344 Q 68 370 70 405 L 78 416 Q 88 420 98 416 L 106 412 Q 110 405 108 380 Q 106 360 104 344 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1.1" />
                {/* Shin bone ridge */}
                <line x1="90" y1="350" x2="90" y2="410" stroke="#2a4a60" strokeWidth="0.6" opacity="0.5" />
                {/* Calf muscle */}
                <path d="M 76 358 Q 72 380 74 400" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.4" />

                {/* ── RIGHT SHIN ── */}
                <path d="M 185 344 Q 192 360 192 380 Q 190 405 188 412 L 180 416 Q 170 420 162 416 L 154 412 Q 150 405 152 380 Q 154 360 160 344 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1.1" />
                <line x1="170" y1="350" x2="170" y2="410" stroke="#2a4a60" strokeWidth="0.6" opacity="0.5" />
                <path d="M 184 358 Q 188 380 186 400" fill="none" stroke="#2a4a60" strokeWidth="0.8" opacity="0.4" />

                {/* ── LEFT FOOT ── */}
                <path d="M 68 410 Q 64 418 66 426 L 76 432 Q 90 436 104 430 L 108 420 Q 106 413 100 412 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1" />
                {/* ── RIGHT FOOT ── */}
                <path d="M 192 410 Q 196 418 194 426 L 184 432 Q 170 436 156 430 L 152 420 Q 154 413 160 412 Z"
                  fill="url(#limbGrad)" stroke="#243d50" strokeWidth="1" />

                {/* ── SPINE LINE ── */}
                <path d="M 130 84 Q 132 140 130 228 Q 129 248 130 265"
                  fill="none" stroke="#0A7C97" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                {/* Vertebrae discs */}
                {[100, 116, 132, 148, 164, 180, 196].map((y, i) => (
                  <rect key={i} x="125" y={y} width="10" height="5" rx="2" fill="#0A7C97" opacity="0.2" />
                ))}

                {/* ── JOINT HOTSPOTS ── */}
                {JOINTS.map((j) => {
                  const isActive = active.id === j.id
                  return (
                    <g key={j.id} onClick={() => setActive(j)} style={{ cursor: 'pointer' }}>
                      {/* Outer pulse ring — only on active */}
                      {isActive && (
                        <>
                          <circle cx={j.cx} cy={j.cy} r={j.r + 10} fill="none" stroke={j.color} strokeWidth="1" opacity="0.3">
                            <animate attributeName="r" values={`${j.r + 8};${j.r + 18};${j.r + 8}`} dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.35;0;0.35" dur="2.2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={j.cx} cy={j.cy} r={j.r + 5} fill="none" stroke={j.color} strokeWidth="1.5" opacity="0.25">
                            <animate attributeName="r" values={`${j.r + 4};${j.r + 12};${j.r + 4}`} dur="2.2s" repeatCount="indefinite" begin="0.4s" />
                            <animate attributeName="opacity" values="0.25;0;0.25" dur="2.2s" repeatCount="indefinite" begin="0.4s" />
                          </circle>
                        </>
                      )}
                      {/* Main disc */}
                      <circle
                        cx={j.cx} cy={j.cy} r={j.r}
                        fill={isActive ? j.color : 'rgba(255,255,255,0.06)'}
                        stroke={j.color}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        opacity={isActive ? 1 : 0.65}
                        style={{
                          transition: 'all 0.35s ease',
                          filter: isActive ? `drop-shadow(0 0 10px ${j.color}bb)` : 'none',
                        }}
                      />
                      {/* Crosshair */}
                      <g opacity={isActive ? 1 : 0.6} style={{ transition: 'opacity 0.3s' }}>
                        <line x1={j.cx - j.r * 0.45} y1={j.cy} x2={j.cx + j.r * 0.45} y2={j.cy}
                          stroke={isActive ? 'white' : j.color} strokeWidth="1.5" />
                        <line x1={j.cx} y1={j.cy - j.r * 0.45} x2={j.cx} y2={j.cy + j.r * 0.45}
                          stroke={isActive ? 'white' : j.color} strokeWidth="1.5" />
                      </g>
                      {/* Label (only active) */}
                      {isActive && (
                        <text x={j.cx + j.r + 5} y={j.cy + 4} fill={j.color} fontSize="8" fontWeight="700" fontFamily="system-ui">
                          {j.label.toUpperCase()}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* ── Detail Panel ──────────────────────────────────────────────────── */}
          <div className="w-full max-w-sm lg:max-w-md flex flex-col gap-4">
            {/* Joint selector pills */}
            <div className="flex flex-wrap gap-2">
              {JOINTS.map((j) => (
                <button
                  key={j.id}
                  onClick={() => setActive(j)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-250"
                  style={{
                    borderColor: active.id === j.id ? j.color : 'rgba(255,255,255,0.1)',
                    background:  active.id === j.id ? j.color + '20' : 'rgba(255,255,255,0.04)',
                    color:       active.id === j.id ? j.color : '#6b7a8d',
                    boxShadow:   active.id === j.id ? `0 0 12px ${j.color}30` : 'none',
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: j.color }} />
                  {j.label}
                </button>
              ))}
            </div>

            {/* Active zone card */}
            <div
              key={active.id}
              className="relative rounded-3xl p-7 sm:p-8 border overflow-hidden"
              style={{
                borderColor: active.color + '35',
                background: `linear-gradient(145deg, ${active.color}10 0%, rgba(10,22,40,0.9) 60%, rgba(8,18,32,0.95) 100%)`,
                boxShadow: `0 0 60px ${active.color}1a, inset 0 1px 0 rgba(255,255,255,0.06)`,
                transition: 'all 0.45s ease',
              }}
            >
              {/* Watermark letter */}
              <div className="absolute -right-2 -bottom-4 text-[100px] font-black opacity-[0.04] select-none pointer-events-none leading-none"
                style={{ color: active.color }}>
                {active.label.charAt(0)}
              </div>

              {/* Header */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: active.color + '20', border: `1.5px solid ${active.color}45` }}>
                  <span className="text-lg" style={{ color: active.color }}>✦</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: active.color }}>
                    {active.label} Joint Treatment
                  </div>
                  <div className="text-white text-lg sm:text-xl font-serif font-bold leading-snug">
                    {active.treatmentName}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {active.desc}
              </p>

              {/* Stats */}
              <div className="flex flex-col gap-2 mb-6">
                {active.stats.map((s) => (
                  <div key={s} className="flex items-center gap-2.5 text-xs font-semibold"
                    style={{ color: active.color }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black"
                      style={{ background: active.color + '25', border: `1px solid ${active.color}40` }}>✓</span>
                    <span className="text-slate-300 font-medium">{s}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/treatments/${active.slug}`}
                className="inline-flex items-center gap-2.5 text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: active.color,
                  color: 'white',
                  boxShadow: `0 4px 16px ${active.color}40`,
                }}
              >
                Explore {active.label} Treatments
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
