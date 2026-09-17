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
    title: 'Total & Partial Knee Replacement (TKR/PKR)',
    description: 'Sub-millimeter implant precision, muscle-sparing tissue dissection, and 24-hour unassisted walking protocol.',
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
    title: 'Total Hip Replacement (THR) & Hip Preservation',
    description: 'Modern ceramic-on-ceramic and dual-mobility bearings designed for lifetime wear and active lifestyle.',
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
    title: 'Shoulder & Knee Arthroscopy (Keyhole Sports Surgery)',
    description: 'Ultra-minimally invasive camera-guided repair of sports tears, ligament ruptures, and shoulder instability.',
    slug: '/treatments/arthroscopy-sports-injuries',
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
    title: 'Joint Preservation & PRP Biological Therapy',
    description: 'Non-surgical cartilage protection, platelet-rich plasma injections, and biomechanical knee realignment.',
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
    title: 'Complex Trauma, Fractures & Pelvic Surgery',
    description: '24/7 emergency fracture stabilization at BMTC Kidwai Nagar with Class-100 Modular Operating Suites.',
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
    title: 'Spine Care, Slip Disc & Sciatica Management',
    description: 'Targeted nerve root decompression, postural therapy, and non-surgical spinal care for back & neck pain.',
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
    <section className="section-padding bg-white" id="treatments">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">
              Surgical &amp; Non-Surgical Specialties
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Our Orthopedic Services
            </h2>
            <p className="text-lg text-slate-600">
              Delhi-standard surgical mastery across primary joint replacements, sports keyhole arthroscopy, and biological joint preservation in Kanpur.
            </p>
          </div>
          <button 
            onClick={toggleAll}
            className="btn-secondary group flex items-center justify-center gap-2 whitespace-nowrap h-fit shadow-sm"
          >
            <span>{isAllExpanded ? 'Collapse All Specialties' : 'View All Specialties & Procedures'}</span>
            <ChevronDown 
              size={18} 
              className={`transition-transform duration-300 ${isAllExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
          {serviceCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id)
            
            return (
              <div 
                key={category.id} 
                className={`group rounded-[2rem] bg-white border border-slate-200/80 transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'shadow-xl border-brand-300 ring-1 ring-brand-200' : 'hover:shadow-lg hover:border-brand-200'
                }`}
              >
                <div 
                  className="p-8 cursor-pointer flex flex-col sm:flex-row gap-6 items-start"
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
                  <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                    isExpanded ? 'bg-brand-600 text-white shadow-md' : 'bg-brand-50 text-brand-600 shadow-sm group-hover:bg-brand-100'
                  }`}>
                    <category.icon size={30} />
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 leading-tight">
                        {category.title}
                      </h3>
                      <div className={`p-2 rounded-full transition-colors shrink-0 ${isExpanded ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-400 group-hover:text-brand-600'}`}>
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                      </div>
                    </div>
                    <p className={`text-slate-600 leading-relaxed transition-all duration-300 ${isExpanded ? 'mb-6' : 'm-0'}`}>
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
                        <div className="pt-6 border-t border-slate-100">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Procedures &amp; Clinical Highlights:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                            {category.subServices.map((sub, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-700">
                                <CheckCircle2 size={16} className="shrink-0 text-brand-600 mt-0.5" />
                                <span className="text-xs sm:text-sm font-medium leading-snug">{sub}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-7 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                            <Link 
                              href={category.slug} 
                              className="text-brand-600 font-bold text-sm flex items-center gap-1.5 hover:text-brand-800 transition-colors"
                            >
                              <span>Learn Procedure Details</span>
                              <ArrowRight size={15} />
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
                      <div className="mt-4 text-brand-600 font-bold text-sm flex items-center gap-1.5 group-hover:text-brand-700">
                        <span>View Procedures</span>
                        <span className="text-xs">▼</span>
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
