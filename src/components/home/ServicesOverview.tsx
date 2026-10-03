'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Activity, 
  ShieldCheck, 
  HeartPulse, 
  Sparkles, 
  Bone, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react'

const serviceCategories = [
  {
    id: 'knee-replacement',
    icon: Activity,
    title: 'Knee Replacement & Knee Pain Treatment',
    description: 'Complete relief from severe knee pain and arthritis with high-flexion implants and walking within 24 hours by Kanpur’s leading knee replacement surgeon.',
    slug: '/treatments/total-knee-replacement',
    subServices: [
      'Minimally Invasive Subvastus TKR',
      'Unicompartmental (Partial) Knee Replacement',
      'High-Flexion Implants (Up to 155° Bend)',
      'Sub-Millimeter Digital Alignment & Templating',
      '24-Hour Mobilization & Walking Protocol',
      'Stitch-Free Waterproof Skin Closure',
      'Complex & Revision Knee Replacement',
      'Bilateral (Both Knees) Sequential Replacement',
    ]
  },
  {
    id: 'hip-replacement',
    icon: Bone,
    title: 'Hip Replacement Surgery & AVN Care',
    description: 'Modern ceramic bearings and cementless implants for Avascular Necrosis (AVN) and hip arthritis, restoring natural, stable walking.',
    slug: '/treatments/hip-replacement',
    subServices: [
      'Cementless Ceramic-on-Poly / Ceramic-on-Ceramic THR',
      'Avascular Necrosis (AVN) Femoral Head Treatment',
      'Core Decompression & Stem Cell Injection',
      'Dual Mobility Bearings (Dislocation Prevention)',
      'Ankylosing Spondylitis Hip Arthroplasty',
      'Revision Hip Arthroplasty with Trabecular Metal',
      'Pain-Free Squatting & Stair Climbing Ability',
    ]
  },
  {
    id: 'arthroscopy',
    icon: ShieldCheck,
    title: 'Sports Injury Specialist & Arthroscopy',
    description: 'Keyhole arthroscopy surgery for ACL ligament tears, meniscus damage, and sports knee injuries with fast return to active fitness.',
    slug: '/treatments/sports-injury-acl-treatment',
    subServices: [
      'ACL & PCL Ligament Keyhole Reconstruction',
      'Meniscus Repair & Root Reattachment',
      'Rotator Cuff Arthroscopic Repair',
      'Recurrent Shoulder Dislocation (Bankart Repair)',
      'Frozen Shoulder Hydrodilatation & Capsular Release',
      'Cartilage Defect Microfracture & OATS',
      'Sports Injury Return-to-Play Rehabilitation',
    ]
  },
  {
    id: 'prp-preservation',
    icon: HeartPulse,
    title: 'Arthritis Treatment & PRP Joint Care',
    description: 'Non-surgical cartilage protection, platelet-rich plasma (PRP) injections, and joint lubrication to delay or avoid surgery.',
    slug: '/treatments/joint-preservation-prp',
    subServices: [
      'Autologous High-Concentration PRP Therapy',
      'Hyaluronic Acid Joint Viscosupplementation',
      'High Tibial Osteotomy (HTO) Knee Realignment',
      'Grade 1 & 2 Osteoarthritis Joint Preservation',
      'Tennis Elbow & Plantar Fasciitis Therapy',
      'Evidence-Based Exercise & Cartilage Nutrition',
    ]
  },
  {
    id: 'trauma-fractures',
    icon: Sparkles,
    title: 'Bone Fracture Treatment & 24/7 Trauma',
    description: '24/7 emergency fracture specialist care for broken bones, accident trauma, and complex fractures at BMTC Orthopedic Hospital Kidwai Nagar.',
    slug: '/treatments/complex-trauma-fractures',
    subServices: [
      '24/7 Polytrauma & Accident Response',
      'Intramedullary Interlocking Nailing (MIPPO)',
      'Acetabular & Pelvic Ring Fracture Reconstruction',
      'Geriatric Fragility Hip Fracture Fixation',
      'Non-Union & Infected Bone Corrective Surgery',
      'Zero-Infection Modular OT Protocols',
    ]
  },
  {
    id: 'spine-sciatica',
    icon: Activity,
    title: 'Slip Disc, Sciatica & Spine Care',
    description: 'Targeted nerve root decompression, postural physical therapy, and non-surgical care for back, neck, and nerve pain.',
    slug: '/treatments/spine-sciatica-care',
    subServices: [
      'Lumbar Disc Herniation Conservative Protocols',
      'Targeted Transforaminal Epidural Injections',
      'Sciatica Nerve Root Pain Decompression',
      'Cervical Spondylosis & Arm Radiating Pain Care',
      'Core Stabilization & Physiotherapy Regimens',
      'First-Responder Spinal Trauma Emergency Care',
    ]
  }
]

export default function ServicesOverview() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  
  const isAllExpanded = expandedCategories.length === serviceCategories.length

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedCategories([])
    } else {
      setExpandedCategories(serviceCategories.map(cat => cat.id))
    }
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white" id="treatments">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">
              Bone, Joint &amp; Fracture Treatment in Kanpur
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Our Orthopedic Services &amp; Specialties
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
              Delhi-standard surgical mastery across knee replacement, hip replacement, sports arthroscopy, fracture care, and arthritis treatment in Kanpur.
            </p>
          </div>
          <button 
            onClick={toggleAll}
            className="btn-secondary group flex items-center justify-center gap-2 whitespace-nowrap h-fit shadow-xs text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5"
          >
            <span>{isAllExpanded ? 'Collapse All Specialties' : 'View All Specialties & Procedures'}</span>
            <ChevronDown 
              size={18} 
              className={`transition-transform duration-300 ${isAllExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {serviceCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id)
            
            return (
              <div 
                key={category.id} 
                className={`group rounded-3xl bg-white border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'shadow-xl border-brand-300 ring-1 ring-brand-200' 
                    : 'border-slate-200/80 hover:shadow-lg hover:border-brand-200'
                }`}
              >
                <div 
                  className="p-5 sm:p-7 md:p-8 cursor-pointer flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                  onClick={() => toggleCategory(category.id)}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`service-details-${category.id}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCategory(category.id);
                    }
                  }}
                >
                  <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                    isExpanded 
                      ? 'bg-brand-600 text-white shadow-md' 
                      : 'bg-brand-50 text-brand-600 shadow-xs group-hover:bg-brand-100'
                  }`}>
                    <category.icon size={26} className="sm:w-7 sm:h-7" />
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors">
                        {category.title}
                      </h3>
                      <div className={`p-1.5 sm:p-2 rounded-full transition-colors shrink-0 ${isExpanded ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-400 group-hover:text-brand-600'}`}>
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                      </div>
                    </div>
                    <p className={`text-slate-600 leading-relaxed text-xs sm:text-sm transition-all duration-300 ${isExpanded ? 'mb-5' : 'm-0'}`}>
                      {category.description}
                    </p>
                    
                    {/* Expandable Content */}
                    <div 
                      id={`service-details-${category.id}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-5 border-t border-slate-100">
                          <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                            Procedures &amp; Clinical Highlights:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 sm:gap-y-3 gap-x-4">
                            {category.subServices.map((sub, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-700">
                                <CheckCircle2 size={15} className="shrink-0 text-brand-600 mt-0.5" />
                                <span className="text-xs sm:text-sm font-medium leading-snug">{sub}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                            <Link 
                              href={category.slug} 
                              className="text-brand-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-brand-800 transition-colors"
                            >
                              <span>Learn Procedure Details</span>
                              <ArrowRight size={14} />
                            </Link>
                            <Link 
                              href="/appointment" 
                              className="btn-primary py-2 px-4 text-xs font-semibold"
                            >
                              Book Consultation
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isExpanded && (
                      <div className="mt-3 text-brand-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 group-hover:text-brand-700">
                        <span>View Procedures ({category.subServices.length})</span>
                        <span className="text-[10px]">▼</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
