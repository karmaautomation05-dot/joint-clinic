'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, Activity, ShieldCheck, Sparkles, Clock, CheckCircle2, RotateCcw } from 'lucide-react'

// Dynamically import the WebGL 3D character with SSR disabled for optimal performance
const Ortho3DHuman = dynamic(() => import('./Ortho3DHuman'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] sm:h-[620px] md:h-[680px] rounded-3xl bg-slate-900/90 border border-slate-700/60 flex flex-col items-center justify-center gap-4 text-center p-6">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-brand-500/20 border-t-brand-400 animate-spin" />
        <span className="absolute font-mono text-[10px] text-brand-300 font-bold">3D</span>
      </div>
      <div>
        <div className="text-white font-serif font-bold text-base mb-1">
          Loading 3D Arthro-Atlas...
        </div>
        <div className="font-mono text-xs text-slate-400">
          Initializing WebGL Musculoskeletal Model
        </div>
      </div>
    </div>
  ),
})

interface JointZone {
  id: string
  label: string
  slug: string
  color: string
  treatmentName: string
  category: string
  desc: string
  stats: string[]
  surgicalFeatures: string[]
  implantType: string
  recoveryTime: string
}

const JOINTS: JointZone[] = [
  {
    id: 'knee',
    label: 'Knee Joint',
    slug: 'total-knee-replacement',
    color: '#02BAB9',
    treatmentName: 'Total & Partial Knee Replacement (Arthroplasty)',
    category: 'Tertiary Arthroplasty',
    desc: 'Sub-millimeter alignment utilizing tissue-sparing techniques, high-flexion implants, and accelerated walking protocol within 24 hours.',
    stats: ['Walk in 24 hr', 'High-flexion implant', '25+ yr durability'],
    surgicalFeatures: [
      'Subvastus tissue-sparing muscle preservation',
      'High-flexion US-FDA approved joint prostheses',
      'Zero-cutting pain management protocol',
      'Computer-navigated kinematic balancing',
    ],
    implantType: 'Cobalt-Chrome / Ceramic on Highly Cross-linked Polyethylene',
    recoveryTime: 'Full weight-bearing at 24 hours; driving in 4 weeks',
  },
  {
    id: 'hip',
    label: 'Hip Joint',
    slug: 'hip-replacement',
    color: '#F18712',
    treatmentName: 'Total Hip Arthroplasty & Joint Preservation',
    category: 'Complex Reconstruction',
    desc: 'Ceramic-on-ceramic and titanium modular dual-mobility constructs for avascular necrosis, osteoarthritis, and dysplasia correction.',
    stats: ['Direct Anterior / Posterior approach', 'Ceramic bearings', '25–30 yr longevity'],
    surgicalFeatures: [
      'Anatomical restoration of leg length and offset',
      'Modular dual-mobility cups for zero-dislocation risk',
      'Muscle-sparing tissue dissection',
      'Rapid mobilization without motion restrictions',
    ],
    implantType: 'Delta Ceramic-on-Ceramic / Trabecular Titanium Shell',
    recoveryTime: 'Immediate unassisted stepping; stairs at Day 2',
  },
  {
    id: 'shoulder',
    label: 'Shoulder Joint',
    slug: 'shoulder-arthroscopy',
    color: '#059B8F',
    treatmentName: 'Shoulder Arthroscopy & Rotator Cuff Repair',
    category: 'Sports & Keyhole Surgery',
    desc: 'High-definition 4K arthroscopic repair of rotator cuff tears, SLAP lesions, recurrent dislocations, and subacromial impingement.',
    stats: ['3mm Keyhole incision', 'Day-care discharge', 'Full ROM protocol'],
    surgicalFeatures: [
      'Suture-anchor bio-composite knotless fixation',
      'Minimal muscle trauma with 4K optics',
      'Targeted nerve-block pain-free recovery',
      'Structured physical rehab sequence',
    ],
    implantType: 'Bio-absorbable PEEK & Suture-Tape Anchors',
    recoveryTime: 'Desk work in 5 days; active sports in 12–16 weeks',
  },
  {
    id: 'spine',
    label: 'Spinal Column',
    slug: 'joint-preservation-prp',
    color: '#01B3BF',
    treatmentName: 'Spinal Pain Management & Disc Preservation',
    category: 'Non-Operative & Interventional',
    desc: 'Targeted fluoroscopy-guided transforaminal epidural injections, facet joint thermal denervation, and platelet-rich plasma (PRP) therapy.',
    stats: ['Zero hospital stay', 'Targeted precision', 'Relief in 2–4 wk'],
    surgicalFeatures: [
      'Fluoroscopic C-Arm sub-millimeter needle guidance',
      'Targeted anti-inflammatory neuro-blockades',
      'Concentrated autologous PRP disc preservation',
      'Integrated postural spinal rehabilitation',
    ],
    implantType: 'Interventional biologics & targeted hydro-dissection',
    recoveryTime: 'Zero downtime; resume daily routine same evening',
  },
  {
    id: 'elbow',
    label: 'Elbow Joint',
    slug: 'complex-trauma-fractures',
    color: '#0A7C97',
    treatmentName: 'Elbow Arthroscopy & Ligament Reconstruction',
    category: 'Upper Extremity Trauma',
    desc: 'Minimally invasive release for refractory tennis/golfer’s elbow, distal humerus intra-articular fracture ORIF, and collateral ligament repair.',
    stats: ['Keyhole procedure', 'Rigid anatomically contoured plates', 'Early mobility'],
    surgicalFeatures: [
      'Low-profile anatomical locking compression plates (LCP)',
      'Direct visualization of cartilage lesions',
      'Preservation of ulnar and radial nerves',
      'Cast-free dynamic functional splinting',
    ],
    implantType: 'Titanium Anatomical Angle-Stable Plates',
    recoveryTime: 'Active elbow flexion at 48 hours; full load in 6–8 weeks',
  },
  {
    id: 'ankle',
    label: 'Ankle Joint',
    slug: 'complex-trauma-fractures',
    color: '#059B8F',
    treatmentName: 'Ankle Arthroscopy & Complex Trauma Care',
    category: 'Foot & Ankle Reconstruction',
    desc: 'Arthroscopic cartilage debridement, syndesmotic stabilization, Achilles tendon repair, and rigid ORIF for bimalleolar / trimalleolar fractures.',
    stats: ['Rigid fixation', 'Minimally invasive', 'Early weight-bearing'],
    surgicalFeatures: [
      'High-resolution small-joint arthroscopy',
      'TightRope syndesmosis dynamic fixation',
      'Sub-millimeter articular surface anatomic reduction',
      'Cast-free removable walker boot protocol',
    ],
    implantType: 'Titanium Locking Plates & High-Strength FiberTape',
    recoveryTime: 'Progressive partial loading at 3 weeks; walking at 6 weeks',
  },
]

export default function BodyMapSelector() {
  const [activeJointId, setActiveJointId] = useState<string>('knee')

  const activeJoint = JOINTS.find(j => j.id === activeJointId) || JOINTS[0]

  return (
    <section
      id="ortho-3d-atlas"
      className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#050e1a] via-[#091728] to-[#040c17]"
    >
      {/* Background medical ambient grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #02bab9 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient gradient lights */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-[120px] opacity-25"
        style={{ background: activeJoint.color }}
      />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-brand-700/20 pointer-events-none blur-[100px]" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-4 bg-slate-900/80 border-slate-700/80">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeJoint.color }}
            />
            <span className="font-mono text-slate-300">ORTHORACLE-GRADE 3D ANATOMY ATLAS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 sm:mb-5 tracking-tight leading-tight">
            Interactive 3D Musculoskeletal Model
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Rotate the full-body 3D anatomical character in 360°, inspect skeletal structures, and select any joint to examine Dr. Gaurav Bhargava&apos;s tertiary surgical procedures.
          </p>
        </div>

        {/* Joint Selection Quick-Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {JOINTS.map(j => {
            const isSelected = j.id === activeJointId
            return (
              <button
                key={j.id}
                onClick={() => setActiveJointId(j.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'scale-105 shadow-lg shadow-brand-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700/70 hover:border-slate-600'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: `${j.color}25`,
                        borderColor: j.color,
                        borderWidth: '1.5px',
                        color: '#ffffff',
                      }
                    : {}
                }
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: j.color,
                    boxShadow: isSelected ? `0 0 8px ${j.color}` : 'none',
                  }}
                />
                <span>{j.label}</span>
                {isSelected && (
                  <span
                    className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold"
                    style={{ backgroundColor: `${j.color}40`, color: '#ffffff' }}
                  >
                    3D Focused
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── MAIN 3D WORKSPACE (Orthoracle 3D Viewer + Clinical Dossier) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 3D WebGL Anatomical Model (7 cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Ortho3DHuman
              activeJointId={activeJointId}
              onSelectJoint={id => setActiveJointId(id)}
              activeColor={activeJoint.color}
            />
          </div>

          {/* Right Column: High-Precision Clinical Procedure Card (5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="relative flex-1 rounded-3xl p-6 sm:p-8 border bg-slate-900/90 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500"
              style={{
                borderColor: `${activeJoint.color}45`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px ${activeJoint.color}15`,
              }}
            >
              {/* Subtle accent corner glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-25"
                style={{ backgroundColor: activeJoint.color }}
              />

              <div>
                {/* Category Pill & ID */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border"
                    style={{
                      backgroundColor: `${activeJoint.color}18`,
                      borderColor: `${activeJoint.color}40`,
                      color: activeJoint.color,
                    }}
                  >
                    {activeJoint.category}
                  </span>

                  <span className="font-mono text-[11px] text-slate-400">
                    ANAT-ID: #{activeJoint.id.toUpperCase()}-01
                  </span>
                </div>

                {/* Treatment Heading */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 leading-snug">
                  {activeJoint.treatmentName}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {activeJoint.desc}
                </p>

                {/* Fast-Track Clinical Metrics */}
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  {activeJoint.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center"
                    >
                      <div
                        className="font-mono text-[11px] font-bold leading-tight"
                        style={{ color: activeJoint.color }}
                      >
                        {stat}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Surgical Protocol Features */}
                <div className="mb-6 space-y-2">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    SURGICAL RIGOR &amp; TECHNIQUE:
                  </div>
                  {activeJoint.surgicalFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: activeJoint.color }}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Clinical Implant Spec Box */}
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5 mb-6 font-mono text-[11px]">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-400 shrink-0">Prosthesis / Implant:</span>
                    <span className="text-right font-medium text-slate-200">
                      {activeJoint.implantType}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-800/80">
                    <span className="text-slate-400 shrink-0">Milestone:</span>
                    <span className="text-right font-medium text-emerald-400">
                      {activeJoint.recoveryTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/treatments/${activeJoint.slug}`}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-bold shadow-lg"
                  style={{
                    backgroundColor: activeJoint.color,
                    borderColor: activeJoint.color,
                  }}
                >
                  <span>Explore Full Procedure</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/appointment"
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold text-center border border-slate-700 transition-colors"
                >
                  Book Consult
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
