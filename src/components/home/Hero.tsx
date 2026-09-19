'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Star, ShieldCheck, Activity } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-brand-100/60 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[450px] h-[450px] bg-accent-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="container relative section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column Content */}
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-xs sm:text-sm font-bold mb-8 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600"></span>
              </span>
              Best Orthopedic Doctor &amp; Surgeon • Kanpur
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6.5xl font-serif font-bold text-slate-900 leading-[1.12] mb-7 tracking-tight">
              Best Orthopedic Doctor &amp; Joint Replacement Surgeon in <span className="text-brand-600 italic">Kanpur</span>
            </h1>
            
            {/* Lead Paragraph */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-4 max-w-xl">
              Led by <strong className="text-slate-900 font-semibold">Dr. Gaurav Bhargava</strong> — premier bone specialist, fracture specialist, and knee/hip replacement surgeon (Ex-Senior Resident, Maulana Azad Medical College &amp; Lok Nayak Hospital, New Delhi).
            </p>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-10 max-w-xl">
              Comprehensive bone, joint &amp; fracture treatment, sports injury care, knee pain treatment, and arthritis relief at <strong className="text-slate-800 font-semibold">Joint Clinic</strong> (Swaroop Nagar) &amp; <strong className="text-slate-800 font-semibold">BMTC Orthopedic Hospital</strong> (Kidwai Nagar).
            </p>
            
            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/appointment" 
                className="btn-primary flex items-center justify-center gap-2.5 group whitespace-nowrap text-base py-3.5 px-7 shadow-lg shadow-brand-600/20"
              >
                <Calendar size={20} className="text-[#F5CD09]" />
                <span>Book Clinic Appointment</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a 
                href="https://wa.me/917309038872?text=Hello%20Dr.%20Gaurav%20Bhargava,%20I%20would%20like%20to%20consult%20the%20best%20orthopedic%20doctor%20in%20Kanpur%20for%20bone%20and%20joint%20treatment." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary flex items-center justify-center gap-2.5 whitespace-nowrap text-base py-3.5 px-7 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 fill-[#25D366] shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Social Proof & Trust Strip */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-t border-brand-100">
              <div className="flex -space-x-2.5">
                <div className="w-11 h-11 rounded-full border-2 border-white bg-brand-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  20+
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white bg-accent-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  5k+
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white bg-brand-700 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  24h
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white bg-slate-900 text-[#F5CD09] flex items-center justify-center text-xs font-bold shadow-sm">
                  ★
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 leading-none mb-1">
                  <span>5,000+ Joint Surgeries</span>
                  <span className="text-[#F18712] font-serif flex items-center text-sm font-bold">
                    ★ 5.0 (41+ Verified Reviews)
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Orthopedic Clinic in Swaroop Nagar &amp; 24/7 Trauma Hospital at BMTC Kidwai Nagar
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Signature Doctor Card */}
          <div className="relative">
            {/* Ambient decoration */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent-200/40 rounded-full -z-10 blur-2xl"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-brand-200/40 rounded-full -z-10 blur-2xl"></div>

            <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl bg-[#b0a59e]">
              <Image 
                src="/images/doctor/gaurav-bhargava.png" 
                alt="Dr. Gaurav Bhargava - Senior Joint Replacement & Arthroscopy Specialist" 
                fill 
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating 20+ Years Experience Card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 z-20 bg-white p-5 rounded-2xl shadow-xl max-w-[210px] border border-brand-100 animate-bounce-slow">
              <div className="text-brand-600 font-serif font-bold text-3xl mb-0.5">20+</div>
              <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-tight">
                Years Clinical Excellence • MAMC New Delhi
              </div>
            </div>

            {/* Floating Verified Rating Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-brand-100 flex items-center gap-2">
              <div className="flex text-[#F18712]">
                <Star size={16} className="fill-[#F5CD09] text-[#F18712]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-none">5.0 / 5.0 Rating</div>
                <div className="text-[9px] text-slate-500 font-medium">Justdial Verified Specialist</div>
              </div>
            </div>

            {/* Rapid Mobilization Floating Pill */}
            <div className="absolute top-1/2 -right-4 sm:-right-8 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-brand-100 hidden sm:flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                <Activity size={14} />
              </div>
              <span className="text-xs font-bold text-slate-800">24-Hr Mobilization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
