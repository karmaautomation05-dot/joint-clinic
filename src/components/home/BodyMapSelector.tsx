'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone, Calendar } from 'lucide-react'
import { getAnatomyType } from '@/utils/anatomy'
import type { ScanMode } from './Ortho3DHuman'

// Dynamically import the WebGL 3D clothed human male with SSR disabled
const Ortho3DHuman = dynamic(() => import('./Ortho3DHuman'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] sm:h-[600px] md:h-[660px] rounded-3xl bg-white border border-slate-200 flex flex-col items-center justify-center gap-4 text-center p-6 shadow-sm">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-brand-500/20 border-t-brand-600 animate-spin" />
        <span className="absolute font-sans text-xs text-brand-600 font-bold">3D</span>
      </div>
      <div>
        <div className="text-slate-900 font-serif font-bold text-base mb-1">
          Loading 3D Anatomy Model...
        </div>
        <div className="text-xs text-slate-500">
          Initializing Interactive Musculoskeletal View
        </div>
      </div>
    </div>
  ),
})

// Dynamically import high-definition 3D Joint Anatomy viewer
const JointAnatomy3D = dynamic(() => import('@/components/common/JointAnatomy3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-8 rounded-full border-2 border-brand-500/20 border-t-brand-600 animate-spin" />
      <span className="text-xs text-slate-500 font-medium">Loading 3D Joint Anatomy...</span>
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
    label: 'Knee',
    slug: 'total-knee-replacement',
    color: '#02BAB9',
    treatmentName: 'Total & Partial Knee Replacement (Arthroplasty)',
    category: 'Joint Replacement',
    desc: 'Tissue-sparing muscle preservation, sub-millimeter anatomical alignment, and rapid walking protocol within 24 hours of surgery.',
    stats: ['Walk in 24 hr', 'High-flex implant', '25+ yr durability'],
    surgicalFeatures: [
      'Subvastus muscle-preserving dissection',
      'High-flexion US-FDA approved joint implants',
      'Targeted multimodal pain management',
      'Computer-navigated kinematic balance',
    ],
    implantType: 'Cobalt-Chrome / Ceramic on Highly Cross-linked Polyethylene',
    recoveryTime: 'Independent walking at 24 hours; driving in 4 weeks',
  },
  {
    id: 'hip',
    label: 'Hip',
    slug: 'hip-replacement',
    color: '#F18712',
    treatmentName: 'Total Hip Replacement & Joint Preservation',
    category: 'Joint Replacement',
    desc: 'Ceramic-on-ceramic and titanium modular dual-mobility constructs for avascular necrosis, osteoarthritis, and hip dysplasia.',
    stats: ['Muscle-sparing', 'Ceramic bearings', '25–30 yr longevity'],
    surgicalFeatures: [
      'Anatomical restoration of natural leg length and offset',
      'Dual-mobility articulation for zero-dislocation risk',
      'Tissue-sparing surgical approach',
      'Immediate unassisted stepping from day one',
    ],
    implantType: 'Delta Ceramic-on-Ceramic / Trabecular Titanium Shell',
    recoveryTime: 'Assisted stepping within 24 hours; stairs at Day 2',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    slug: 'shoulder-arthroscopy',
    color: '#059B8F',
    treatmentName: 'Shoulder Arthroscopy & Rotator Cuff Repair',
    category: 'Sports & Keyhole Surgery',
    desc: 'High-definition 4K arthroscopic keyhole surgery for rotator cuff tears, recurrent dislocations, labral tears, and impingement.',
    stats: ['3mm Keyhole', 'Day-care discharge', 'Full range of motion'],
    surgicalFeatures: [
      'Suture-anchor knotless bio-composite fixation',
      'Minimal muscle trauma under 4K camera optics',
      'Targeted nerve-block for pain-free recovery',
      'Structured personalized rehabilitation',
    ],
    implantType: 'Bio-absorbable PEEK & Suture-Tape Anchors',
    recoveryTime: 'Normal daily tasks in 5 days; sports in 12–16 weeks',
  },
  {
    id: 'spine',
    label: 'Spine',
    slug: 'joint-preservation-prp',
    color: '#01B3BF',
    treatmentName: 'Spinal Pain Care & Disc Preservation',
    category: 'Non-Operative Care',
    desc: 'Fluoroscopy-guided precision epidural injections, facet joint radiofrequency, and platelet-rich plasma (PRP) therapy for back pain.',
    stats: ['Zero hospital stay', 'C-Arm guidance', 'Relief in 2–4 wk'],
    surgicalFeatures: [
      'Real-time fluoroscopic sub-millimeter needle guidance',
      'Targeted anti-inflammatory neuro-blockades',
      'Autologous platelet-rich plasma disc preservation',
      'Integrated postural spine rehabilitation',
    ],
    implantType: 'Interventional biologics & targeted hydro-dissection',
    recoveryTime: 'Zero downtime; resume daily activities same day',
  },
  {
    id: 'elbow',
    label: 'Elbow',
    slug: 'complex-trauma-fractures',
    color: '#0A7C97',
    treatmentName: 'Elbow Arthroscopy & Ligament Reconstruction',
    category: 'Trauma & Keyhole Surgery',
    desc: 'Minimally invasive release for stubborn tennis/golfer’s elbow, complex fracture fixation, and collateral ligament repair.',
    stats: ['Minimally invasive', 'Anatomical plates', 'Early mobility'],
    surgicalFeatures: [
      'Low-profile anatomical locking compression plates',
      'Direct cartilage visualization with mini-arthroscope',
      'Full preservation of ulnar and radial nerves',
      'Cast-free dynamic functional recovery',
    ],
    implantType: 'Titanium Anatomical Angle-Stable Plates',
    recoveryTime: 'Active elbow movement at 48 hours; full load in 6 weeks',
  },
  {
    id: 'ankle',
    label: 'Ankle',
    slug: 'complex-trauma-fractures',
    color: '#059B8F',
    treatmentName: 'Ankle Arthroscopy & Fracture Treatment',
    category: 'Foot & Ankle Care',
    desc: 'Keyhole cartilage debridement, syndesmotic stabilization, Achilles tendon repair, and rigid anatomical fracture fixation.',
    stats: ['Rigid fixation', 'Minimally invasive', 'Early weight-bearing'],
    surgicalFeatures: [
      'High-resolution small-joint arthroscopy',
      'Dynamic syndesmosis stabilization',
      'Sub-millimeter articular surface reconstruction',
      'Cast-free removable walker boot protocol',
    ],
    implantType: 'Titanium Locking Plates & High-Strength FiberTape',
    recoveryTime: 'Partial weight-bearing at 3 weeks; normal walking at 6 weeks',
  },
]

export default function BodyMapSelector() {
  const [activeJointId, setActiveJointId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ScanMode>('normal')
  const [rightPanelTab, setRightPanelTab] = useState<'protocol' | 'anatomy'>('protocol')

  const activeJoint = activeJointId ? JOINTS.find((j) => j.id === activeJointId) : null
  const currentColor = activeJoint?.color || '#059B8F'

  return (
    <section id="interactive-body-map" className="py-14 sm:py-18 md:py-22 bg-white border-y border-slate-100">
      <div className="container">
        {/* Clean Clinical Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
            <span>3D Interactive Anatomy Explorer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight leading-tight">
            Explore Your Joint &amp; Treatment
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Rotate the 3D model 360°, toggle between the realistic Full Body and high-definition Medical Skeleton, or click any joint to inspect Dr. Gaurav Bhargava&apos;s specialized surgical procedures.
          </p>
        </div>

        {/* Clean Body Part & View Mode Selection Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10">
          {/* Full Body Clothed vs Full Skeleton View Toggle */}
          <div className="flex items-center bg-slate-900/90 text-white p-1 rounded-2xl border border-slate-700 shadow-md mr-1">
            <button
              type="button"
              onClick={() => setViewMode('normal')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'normal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Full Body Clothed View"
            >
              <span>👤 Full Body</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('skeleton')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'skeleton'
                  ? 'bg-brand-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Full High-Definition Medical Skeleton"
            >
              <span>🦴 Full Skeleton</span>
            </button>
          </div>

          {/* Full Body Overview Button */}
          <button
            onClick={() => setActiveJointId(null)}
            className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeJointId === null
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeJointId === null ? '#02BAB9' : '#94a3b8' }}
            />
            <span>Full Body</span>
          </button>

          {/* Individual Joint Buttons */}
          {JOINTS.map((j) => {
            const isSelected = j.id === activeJointId
            return (
              <button
                key={j.id}
                onClick={() => {
                  setActiveJointId(j.id)
                  setRightPanelTab('protocol')
                }}
                className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'text-white shadow-md shadow-brand-600/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: j.color,
                        borderColor: j.color,
                      }
                    : {}
                }
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: isSelected ? '#ffffff' : j.color,
                  }}
                />
                <span>{j.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main 3D Model & Procedure Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Left: 3D Clothed Human Male on Pure White Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Ortho3DHuman
              activeJointId={activeJointId}
              onSelectJoint={(id) => {
                setActiveJointId(id)
                if (id) setRightPanelTab('protocol')
              }}
              activeColor={currentColor}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
            />
          </div>

          {/* Right: Clean White Clinical Procedure Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between transition-all duration-300"
              style={{
                borderTopColor: currentColor,
                borderTopWidth: '4px',
              }}
            >
              {activeJoint ? (
                // SPECIFIC JOINT PROCEDURE & 3D X-RAY VIEW
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${activeJoint.color}15`,
                        color: activeJoint.color,
                      }}
                    >
                      {activeJoint.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {activeJoint.label} Specialty
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 leading-snug">
                    {activeJoint.treatmentName}
                  </h3>

                  {/* Interactive Tab Switch: Protocol vs 3D Joint Anatomy */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-4">
                    <button
                      type="button"
                      onClick={() => setRightPanelTab('protocol')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        rightPanelTab === 'protocol'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>📋 Surgical Protocol</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRightPanelTab('anatomy')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        rightPanelTab === 'anatomy'
                          ? 'bg-white text-brand-700 shadow-xs'
                          : 'text-slate-600 hover:text-brand-700'
                      }`}
                    >
                      <span>🔬 3D X-Ray &amp; Implants</span>
                    </button>
                  </div>

                  {rightPanelTab === 'anatomy' ? (
                    <div className="mb-6">
                      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
                        <JointAnatomy3D
                          type={getAnatomyType(activeJoint.slug || activeJoint.id)}
                          title={`${activeJoint.label} 3D Anatomy & Implants`}
                          subtitle="High-Definition Surgical Reconstruction"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2 text-center">
                        Interactive 360° X-Ray View • Click callout pins to inspect components
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                        {activeJoint.desc}
                      </p>

                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-5">
                        {activeJoint.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center"
                          >
                            <div
                              className="text-xs sm:text-sm font-bold leading-tight"
                              style={{ color: activeJoint.color }}
                            >
                              {stat}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mb-5 space-y-2.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Surgical Protocol &amp; Rigor:
                        </div>
                        {activeJoint.surgicalFeatures.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2
                              size={16}
                              className="shrink-0 mt-0.5"
                              style={{ color: activeJoint.color }}
                            />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs mb-6">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-500 font-medium shrink-0">Implant / Protocol:</span>
                          <span className="text-right font-semibold text-slate-900">
                            {activeJoint.implantType}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2 pt-2 border-t border-slate-200">
                          <span className="text-slate-500 font-medium shrink-0">Mobilization:</span>
                          <span className="text-right font-bold text-emerald-700">
                            {activeJoint.recoveryTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // FULL BODY OVERVIEW (SHOWN ON INITIAL LOAD & FULL BODY SELECTION)
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700">
                      Comprehensive Joint Care
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Ex-SR MAMC New Delhi
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-3 leading-snug">
                    Full-Body Orthopaedic &amp; Joint Replacement Portfolio
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Select any joint on the 3D model or choose from the body parts above to explore Dr. Gaurav Bhargava&apos;s specialized surgical procedures, implant technologies, and fast-track recovery protocols.
                  </p>

                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                      <div className="text-xs sm:text-sm font-bold text-brand-600 leading-tight">
                        5,000+
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">Surgeries</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                      <div className="text-xs sm:text-sm font-bold text-brand-700 leading-tight">
                        20+ Years
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">Excellence</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                      <div className="text-xs sm:text-sm font-bold text-[#F18712] leading-tight">
                        24-Hr
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">Walking</div>
                    </div>
                  </div>

                  <div className="mb-6 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Clinical Focus Areas:
                    </div>
                    {[
                      'Computer-balanced Total Knee & Hip Arthroplasty',
                      'High-definition 4K Keyhole Shoulder Arthroscopy',
                      'Non-operative fluoroscopy-guided spinal preservation',
                      'Class-100 laminar airflow infection-free operating theaters',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-brand-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-50 border border-brand-200 text-xs text-brand-900 leading-relaxed mb-6">
                    💡 <strong>Tip:</strong> Tap on the <strong>Knee</strong>, <strong>Hip</strong>, <strong>Shoulder</strong>, <strong>Spine</strong>, <strong>Elbow</strong>, or <strong>Ankle</strong> pins to zoom the 3D camera into that joint.
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                {activeJoint ? (
                  <Link
                    href={`/treatments/${activeJoint.slug}`}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-bold shadow-md shadow-brand-600/20"
                    style={{
                      backgroundColor: activeJoint.color,
                      borderColor: activeJoint.color,
                    }}
                  >
                    <span>View Treatment Details</span>
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <Link
                    href="/appointment"
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-bold shadow-md shadow-brand-600/20"
                  >
                    <Calendar size={15} />
                    <span>Book Clinic Appointment</span>
                  </Link>
                )}

                <a
                  href="tel:+917309038872"
                  className="btn-secondary py-3 px-5 text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  <span>Call OPD</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
