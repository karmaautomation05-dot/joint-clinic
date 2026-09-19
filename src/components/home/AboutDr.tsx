'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Award, BookOpen, Heart, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function AboutDr() {
  const highlights = [
    { 
      icon: Award, 
      title: '20+ Years Experience', 
      description: 'Extensive clinical and surgical expertise across Kanpur, Delhi-NCR, and North India.' 
    },
    { 
      icon: BookOpen, 
      title: 'Ex-SR MAMC New Delhi', 
      description: 'Senior Residency at prestigious Maulana Azad Medical College & Lok Nayak Hospital, New Delhi.' 
    },
    { 
      icon: Heart, 
      title: '24-Hour Mobilization', 
      description: 'Modern tissue-sparing protocol enabling patients to walk unassisted within 24 hours of surgery.' 
    },
    { 
      icon: ShieldCheck, 
      title: '5,000+ Joint Procedures', 
      description: 'High-volume mastery in primary, complex, and revision Knee & Hip replacements.' 
    },
  ]

  const gallery = [
    { src: '/images/hospital/modular_ot.png', title: 'Ultra-Clean Modular OT', desc: 'HEPA air filtration & laminar airflow for zero infection risk.' },
    { src: '/images/hospital/diagnostic_services.png', title: 'Digital Ortho Diagnostics', desc: 'Precision digital radiography & MRI evaluation.' },
    { src: '/images/blogs/blog_knee_rehab.png', title: 'Fast-Track Rehabilitation', desc: 'Physiotherapist-guided day-by-day joint recovery.' },
    { src: '/images/hospital/trauma_response.png', title: '24/7 Trauma Emergency', desc: 'Immediate trauma response at BMTC Kidwai Nagar.' },
  ]

  return (
    <section className="section-padding bg-white" id="about">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Column: Doctor Portrait */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[3/4] bg-[#b0a59e]">
              <Image 
                src="/images/doctor/gaurav-bhargava.png" 
                alt="Dr. Gaurav Bhargava - Senior Orthopaedic Surgeon" 
                fill 
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Floating Experience Card */}
            <div className="absolute -bottom-8 -left-4 sm:-left-10 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] border border-brand-100 animate-bounce-slow">
              <div className="text-brand-600 font-serif font-bold text-3xl mb-1">20+</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight">
                Years of Surgical Excellence
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-100/60 rounded-full -z-10 blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-accent-100/60 rounded-full -z-10 blur-xl"></div>
          </div>

          {/* Right Column: Bio & Philosophy */}
          <div>
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">
              Bone and Joint Specialist in Kanpur
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
              Dr. Gaurav Bhargava
            </h2>
            <p className="text-lg text-brand-700 font-semibold mb-6">
              Best Orthopedic Surgeon, Joint Replacement Specialist &amp; Fracture Specialist in Kanpur
            </p>
            
            <div className="space-y-5 text-slate-600 leading-relaxed mb-10 text-base">
              <p>
                <strong className="text-slate-900 font-semibold">Dr. Gaurav Bhargava</strong> is widely recognized as the <strong className="text-slate-900">best orthopedic doctor in Kanpur</strong>, serving as a trusted bone specialist, joint replacement surgeon, and fracture specialist. With over 20 years of surgical experience, he brings premier Delhi-standard orthopedic healthcare to patients across Kanpur and Central Uttar Pradesh.
              </p>
              <p>
                Having completed his post-graduation from <span className="font-semibold text-slate-800">S.N. Medical College, Agra</span> and rigorous Senior Residency at the prestigious <span className="font-semibold text-slate-800">Maulana Azad Medical College (MAMC) &amp; Lok Nayak Hospital, New Delhi</span>, Dr. Bhargava combines sub-millimeter surgical accuracy with compassionate, patient-first recovery.
              </p>
              <p>
                As a Life Member of the <span className="font-semibold text-slate-800">Indian Orthopaedic Association (IOA)</span> and UPOA, he delivers comprehensive bone, joint &amp; fracture treatment — from non-surgical arthritis treatment and PRP therapy to knee replacement, hip replacement, and 24/7 trauma care at BMTC Orthopedic Hospital.
              </p>
            </div>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-brand-50/40 border border-brand-100/60">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-600">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-snug">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors"
            >
              <span>Read Full Surgical Dossier &amp; Credentials</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Gallery / Clinical Life Showcase */}
        <div className="pt-16 border-t border-slate-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-slate-900">Clinical Excellence &amp; Infrastructure</h3>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Equipped with Class-100 Modular OTs, digital pre-operative templating, and modern diagnostic systems.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((img, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={img.src} 
                    alt={img.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{img.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{img.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
