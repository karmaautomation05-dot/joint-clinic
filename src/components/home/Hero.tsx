'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import DoctorAnimatedCard from '@/components/common/DoctorAnimatedCard'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[350px] sm:w-[500px] lg:w-[650px] h-[350px] sm:h-[500px] lg:h-[650px] bg-brand-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-accent-100/40 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column Content (7 cols on large desktop) */}
          <div className="lg:col-span-7 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600"></span>
              </span>
              <span>Best Orthopedic Doctor &amp; Surgeon • Kanpur</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.15] mb-5 sm:mb-7 tracking-tight break-words">
              Best Orthopedic Doctor &amp; Joint Replacement Surgeon in <span className="text-brand-600 italic">Kanpur</span>
            </h1>
            
            {/* Lead Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-3 sm:mb-4">
              Led by <strong className="text-slate-900 font-bold">Dr. Gaurav Bhargava</strong> — premier bone specialist, fracture specialist, and knee/hip replacement surgeon (Ex-Senior Resident, Maulana Azad Medical College &amp; Lok Nayak Hospital, New Delhi).
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed mb-8 sm:mb-10">
              Comprehensive bone, joint &amp; fracture treatment, sports injury care, knee pain relief, and arthritis treatment at <strong className="text-slate-800 font-semibold">Joint Clinic</strong> (Swaroop Nagar) &amp; <strong className="text-slate-800 font-semibold">BMTC Orthopedic Hospital</strong> (Kidwai Nagar).
            </p>
            
            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 mb-10 sm:mb-12 justify-center lg:justify-start">
              <Link 
                href="/appointment" 
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2.5 group whitespace-nowrap text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-7 shadow-lg shadow-brand-600/20"
              >
                <Calendar size={18} className="text-[#F5CD09] shrink-0" />
                <span>Book Clinic Appointment</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
              <a 
                href="https://wa.me/917309038872?text=Hello%20Dr.%20Gaurav%20Bhargava,%20I%20would%20like%20to%20consult%20the%20best%20orthopedic%20doctor%20in%20Kanpur%20for%20bone%20and%20joint%20treatment." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2.5 whitespace-nowrap text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-7 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 fill-[#25D366] shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Social Proof & Trust Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 py-5 sm:py-6 border-t border-brand-100">
              <div className="flex -space-x-2.5 shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white bg-brand-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  20+
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white bg-accent-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  5k+
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white bg-brand-700 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  24h
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white bg-slate-900 text-[#F5CD09] flex items-center justify-center text-xs font-bold shadow-sm">
                  ★
                </div>
              </div>
              <div className="text-left">
                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-slate-900 leading-snug mb-0.5">
                  <span>5,000+ Joint Surgeries</span>
                  <span className="text-[#F18712] font-serif flex items-center text-xs sm:text-sm font-bold">
                    ★ 5.0 (41+ Verified Reviews)
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  Swaroop Nagar Evening Clinic &amp; BMTC Kidwai Nagar 24/7 Trauma Care
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Signature Doctor Card with Crossfade Animation & Floating Badges */}
          <div className="lg:col-span-5 relative max-w-sm sm:max-w-md mx-auto w-full px-2 sm:px-0">
            <DoctorAnimatedCard variant="hero" priority={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
