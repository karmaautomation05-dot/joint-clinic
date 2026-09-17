'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X, Calendar, ChevronDown, MapPin } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-xs">
      {/* Main Header Bar */}
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 flex items-center justify-between py-2.5 sm:py-3">
        {/* Left Group: Logo + Desktop Nav Items pushed tightly to the left */}
        <div className="flex items-center gap-3 sm:gap-4 xl:gap-6 shrink-0 min-w-0">
          {/* Far Left Brand Lockup */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 shrink-0 transition-transform group-hover:scale-105 duration-200">
              <Image 
                src="/images/logo-emblem.png" 
                alt="Dr. Gaurav Bhargava Joint Clinic Logo" 
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-0.5 whitespace-nowrap">
                Dr. Gaurav Bhargava&apos;s
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-slate-900 leading-none tracking-tight group-hover:text-brand-600 transition-colors whitespace-nowrap">
                Joint Clinic
              </span>
              {/* The line below the clinic name Joint Clinic */}
              <div className="flex items-center gap-1 mt-0.5 pt-0.5 border-t border-brand-200">
                <span className="text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-wider text-brand-700 whitespace-nowrap">
                  A Centre of Arthroplasty &amp; Arthroscopy
                </span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation Menu: Pushed to the left right next to the logo */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2 shrink-0">
            <Link 
              href="/" 
              className="text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-colors whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-lg"
            >
              Home
            </Link>

            {/* Medfemme-style two-line stacked About link */}
            <Link 
              href="/about" 
              className="group/about flex flex-col hover:bg-brand-50/60 transition-colors whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-lg"
            >
              <span className="text-xs xl:text-[13px] font-semibold text-slate-700 group-hover/about:text-brand-600 transition-colors leading-tight">
                Dr. Gaurav Bhargava
              </span>
              <span className="text-[9px] xl:text-[10px] font-medium text-[#059B8F] group-hover/about:text-[#0A7C97] transition-colors leading-none mt-0.5">
                Joint Replacement Specialist
              </span>
            </Link>

            <div 
              className="relative"
              onMouseEnter={() => setIsTreatmentsOpen(true)}
              onMouseLeave={() => setIsTreatmentsOpen(false)}
            >
              <Link 
                href="/treatments" 
                className="flex items-center gap-1 text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-colors whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-lg"
              >
                <span>Treatments</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${isTreatmentsOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </Link>

              {isTreatmentsOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-brand-100 p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <Link href="/treatments/total-knee-replacement" className="block p-2.5 rounded-xl hover:bg-brand-50 text-xs font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                    Total Knee Replacement (TKR)
                  </Link>
                  <Link href="/treatments/hip-replacement" className="block p-2.5 rounded-xl hover:bg-brand-50 text-xs font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                    Total Hip Replacement (THR)
                  </Link>
                  <Link href="/treatments/arthroscopy-sports-injuries" className="block p-2.5 rounded-xl hover:bg-brand-50 text-xs font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                    Knee &amp; Shoulder Arthroscopy (ACL)
                  </Link>
                  <Link href="/treatments/joint-preservation-prp" className="block p-2.5 rounded-xl hover:bg-brand-50 text-xs font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                    PRP &amp; Joint Preservation
                  </Link>
                  <Link href="/treatments/complex-trauma-fractures" className="block p-2.5 rounded-xl hover:bg-brand-50 text-xs font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                    Complex Trauma &amp; Pelvic Surgery
                  </Link>
                  <Link href="/treatments/spine-sciatica-care" className="block p-2.5 rounded-xl hover:bg-brand-50 text-xs font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                    Spine, Slip Disc &amp; Sciatica Care
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/recovery-guide" 
              className="text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-colors whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-lg"
            >
              Recovery Protocol
            </Link>

            <Link 
              href="/testimonials" 
              className="text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-colors whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-lg"
            >
              Reviews
            </Link>

            <Link 
              href="/blog" 
              className="text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-colors whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-lg"
            >
              Health Blog
            </Link>

            {/* Locations item: with MapPin, prominent badge, completely visible */}
            <Link 
              href="/contact" 
              className="flex items-center gap-1.5 text-xs xl:text-[13px] font-bold text-[#059B8F] hover:text-[#0A7C97] hover:bg-brand-50/80 transition-colors whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-brand-50/50 border border-brand-100/70"
            >
              <MapPin size={13} className="text-[#059B8F] shrink-0" />
              <span>Locations</span>
            </Link>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto pl-3">
          {/* Full Phone text pill: Only shown on 2xl: (1536px+) to prevent horizontal crowding on laptops */}
          <a 
            href="tel:+917309038872" 
            className="hidden 2xl:flex items-center gap-2 text-slate-700 font-bold hover:text-brand-600 transition-colors whitespace-nowrap text-xs px-3 py-1.5 rounded-full hover:bg-brand-50"
          >
            <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
              <Phone size={13} />
            </div>
            <span>+91 73090 38872</span>
          </a>

          {/* Compact phone button on xl to 2xl screens */}
          <a
            href="tel:+917309038872"
            aria-label="Call clinic directly: +91 73090 38872"
            title="Call: +91 73090 38872"
            className="hidden xl:flex 2xl:hidden w-9 h-9 rounded-full bg-brand-50 border border-brand-200 items-center justify-center text-brand-600 hover:bg-brand-100 hover:text-brand-700 transition-colors shrink-0"
          >
            <Phone size={15} />
          </a>

          <Link 
            href="/appointment" 
            className="btn-primary py-2.5 px-3.5 sm:px-4.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-md shadow-brand-600/15 shrink-0"
          >
            <Calendar size={15} className="text-[#F5CD09]" />
            <span>Book Consultation</span>
          </Link>

          {/* Mobile / Tablet Menu Button (only on screens < lg / 1024px) */}
          <button 
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-100 py-6 px-4 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3 text-base font-medium text-slate-700">
            <Link href="/" className="px-2 py-1.5 hover:text-brand-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="px-2 py-1.5 hover:text-brand-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
              About Dr. Gaurav Bhargava
            </Link>
            <Link href="/treatments" className="px-2 py-1.5 hover:text-brand-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
              Treatments &amp; Surgeries
            </Link>
            <Link href="/recovery-guide" className="px-2 py-1.5 hover:text-brand-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
              Knee Recovery Protocol (Day 0–90)
            </Link>
            <Link href="/testimonials" className="px-2 py-1.5 hover:text-brand-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
              Verified Patient Reviews
            </Link>
            <Link href="/blog" className="px-2 py-1.5 hover:text-brand-600 font-semibold" onClick={() => setIsMenuOpen(false)}>
              Orthopaedic Health Blog
            </Link>
            <Link href="/contact" className="px-2 py-1.5 hover:text-brand-600 font-semibold flex items-center gap-2 text-brand-700" onClick={() => setIsMenuOpen(false)}>
              <MapPin size={16} className="text-[#059B8F] shrink-0" />
              <span>Clinic Locations &amp; Directions</span>
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a 
              href="tel:+917309038872" 
              className="flex items-center justify-center gap-2 text-brand-700 font-bold p-3 bg-brand-50 rounded-2xl"
            >
              <Phone size={18} />
              <span>Call: +91 73090 38872</span>
            </a>
            <Link 
              href="/appointment" 
              className="block btn-primary text-center py-3.5" 
              onClick={() => setIsMenuOpen(false)}
            >
              Book Clinic Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
