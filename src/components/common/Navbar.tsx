'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Menu,
  X,
  Calendar,
  ChevronDown,
  MapPin,
  Bone,
  Activity,
  ShieldCheck,
  Award,
  HeartPulse,
  Stethoscope,
  ArrowRight,
} from 'lucide-react'

const TREATMENT_NAV_CATEGORIES = [
  {
    name: "Knee Care & Surgery",
    sub: "Total, Robotic & Partial Knee Replacement",
    href: "/treatments/total-knee-replacement",
    icon: Bone,
    badge: "Most Popular",
  },
  {
    name: "Hip Care & Surgery",
    sub: "Total Hip Replacement & AVN Treatment",
    href: "/treatments/hip-replacement",
    icon: Activity,
    badge: "Long-Life",
  },
  {
    name: "Sports Injury & Arthroscopy",
    sub: "ACL Ligament & Meniscus Keyhole Repair",
    href: "/treatments/sports-injury-acl-treatment",
    icon: ShieldCheck,
    badge: "Athletic Return",
  },
  {
    name: "Shoulder & Arm Care",
    sub: "Rotator Cuff, Frozen Shoulder & Dislocation",
    href: "/treatments/shoulder-arthroscopy",
    icon: Award,
  },
  {
    name: "Spine & Sciatica Care",
    sub: "Slip Disc, Sciatica & Non-Surgical Decompression",
    href: "/treatments/spine-sciatica-care",
    icon: Activity,
  },
  {
    name: "Non-Surgical Joint Care & PRP",
    sub: "PRP Injections & Cartilage Lubrication",
    href: "/treatments/joint-preservation-prp",
    icon: HeartPulse,
    badge: "Non-Surgical",
  },
  {
    name: "Bone Fractures & 24/7 Trauma",
    sub: "Emergency Fracture Care & Surgery at BMTC",
    href: "/treatments/complex-trauma-fractures",
    icon: Stethoscope,
    badge: "24/7 Casualty",
  },
];

const RECOVERY_NAV_CATEGORIES = [
  {
    name: "Knee Surgery Recovery",
    sub: "Total Knee, Robotic & Partial Replacement",
    href: "/recovery-guide#knee-recovery",
    icon: Bone,
    badge: "Day 1 Walking",
  },
  {
    name: "Hip Surgery Recovery",
    sub: "Total Hip Replacement & AVN Decompression",
    href: "/recovery-guide#hip-recovery",
    icon: Activity,
    badge: "Ceramic Stability",
  },
  {
    name: "Sports & ACL Recovery",
    sub: "Keyhole ACL, PCL & Meniscus Surgery",
    href: "/recovery-guide#sports-recovery",
    icon: ShieldCheck,
    badge: "Sports Return",
  },
  {
    name: "Shoulder & Arm Recovery",
    sub: "Rotator Cuff, Frozen Shoulder & Dislocation",
    href: "/recovery-guide#shoulder-recovery",
    icon: Award,
  },
  {
    name: "Spine & Sciatica Recovery",
    sub: "Slip Disc, Sciatica Relief & Posture Habits",
    href: "/recovery-guide#spine-recovery",
    icon: Activity,
  },
  {
    name: "PRP & Joint Injection Protocol",
    sub: "Biological Plasma & Joint Lubrication Recovery",
    href: "/recovery-guide#prp-recovery",
    icon: HeartPulse,
    badge: "Zero Downtime",
  },
  {
    name: "Bone Fractures & Trauma",
    sub: "Plaster Cast & Internal Fixation Union",
    href: "/recovery-guide#trauma-recovery",
    icon: Stethoscope,
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false)
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false)

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
                <div className="absolute top-full left-0 w-[360px] sm:w-[390px] bg-white rounded-2xl shadow-2xl border border-brand-100 p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Treatments by Category
                    </span>
                    <Link
                      href="/treatments"
                      className="text-[11px] font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center gap-1"
                    >
                      <span>View All (24)</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>

                  <div className="space-y-0.5">
                    {TREATMENT_NAV_CATEGORIES.map((cat) => {
                      const IconC = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brand-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-[#059B8F] group-hover/item:bg-[#059B8F] group-hover/item:text-white transition-colors shrink-0">
                            <IconC size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-800 group-hover/item:text-[#059B8F] transition-colors truncate">
                                {cat.name}
                              </span>
                              {cat.badge && (
                                <span className="text-[9px] font-bold text-[#F18712] px-1.5 py-0.2 rounded-full bg-amber-50 shrink-0">
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 truncate">
                              {cat.sub}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <Link
                      href="/treatments"
                      className="block text-center py-2 px-3 rounded-xl bg-brand-50/50 hover:bg-brand-100/60 text-[#059B8F] text-xs font-bold transition-colors"
                    >
                      Browse Complete Treatments Directory &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Recovery Guide Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsRecoveryOpen(true)}
              onMouseLeave={() => setIsRecoveryOpen(false)}
            >
              <Link 
                href="/recovery-guide" 
                className="flex items-center gap-1 text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-colors whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-lg"
              >
                <span>Recovery Guide</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${isRecoveryOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </Link>

              {isRecoveryOpen && (
                <div className="absolute top-full left-0 w-[360px] sm:w-[390px] bg-white rounded-2xl shadow-2xl border border-brand-100 p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Recovery Roadmaps (7)
                    </span>
                    <Link
                      href="/recovery-guide"
                      className="text-[11px] font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center gap-1"
                    >
                      <span>All Portals</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>

                  <div className="space-y-0.5">
                    {RECOVERY_NAV_CATEGORIES.map((cat) => {
                      const IconC = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brand-50/80 transition-colors group/item"
                        >
                          <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-[#059B8F] group-hover/item:bg-[#059B8F] group-hover/item:text-white transition-colors shrink-0">
                            <IconC size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-800 group-hover/item:text-[#059B8F] transition-colors truncate">
                                {cat.name}
                              </span>
                              {cat.badge && (
                                <span className="text-[9px] font-bold text-[#F18712] px-1.5 py-0.2 rounded-full bg-amber-50 shrink-0">
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 truncate">
                              {cat.sub}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <Link
                      href="/recovery-guide"
                      className="block text-center py-2 px-3 rounded-xl bg-brand-50/50 hover:bg-brand-100/60 text-[#059B8F] text-xs font-bold transition-colors"
                    >
                      View Complete Recovery Portals &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
            <div className="space-y-1">
              <Link href="/treatments" className="px-2 py-1.5 hover:text-brand-600 font-semibold flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                <span>Treatments by Category</span>
                <span className="text-xs text-[#059B8F] font-bold">View All 24 &rarr;</span>
              </Link>
              <div className="pl-4 pr-2 space-y-1 text-xs text-slate-600">
                <Link href="/treatments/total-knee-replacement" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Knee Care &amp; Replacement</Link>
                <Link href="/treatments/hip-replacement" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Hip Replacement &amp; AVN</Link>
                <Link href="/treatments/sports-injury-acl-treatment" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Sports Injury &amp; ACL Keyhole</Link>
                <Link href="/treatments/shoulder-arthroscopy" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Shoulder &amp; Rotator Cuff</Link>
                <Link href="/treatments/spine-sciatica-care" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Spine, Slip Disc &amp; Sciatica</Link>
                <Link href="/treatments/joint-preservation-prp" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• PRP &amp; Non-Surgical Joint Care</Link>
                <Link href="/treatments/complex-trauma-fractures" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Bone Fractures &amp; 24/7 Trauma</Link>
              </div>
            </div>
            <div className="space-y-1">
              <Link href="/recovery-guide" className="px-2 py-1.5 hover:text-brand-600 font-semibold flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                <span>Recovery Guide (7 Portals)</span>
                <span className="text-xs text-[#059B8F] font-bold">View All &rarr;</span>
              </Link>
              <div className="pl-4 pr-2 space-y-1 text-xs text-slate-600">
                <Link href="/recovery-guide#knee-recovery" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Knee Surgery Recovery</Link>
                <Link href="/recovery-guide#hip-recovery" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Hip Surgery Recovery</Link>
                <Link href="/recovery-guide#sports-recovery" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Sports &amp; ACL Recovery</Link>
                <Link href="/recovery-guide#shoulder-recovery" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Shoulder Surgery Recovery</Link>
                <Link href="/recovery-guide#spine-recovery" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Spine &amp; Sciatica Recovery</Link>
                <Link href="/recovery-guide#prp-recovery" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• PRP &amp; Joint Injections</Link>
                <Link href="/recovery-guide#trauma-recovery" className="block py-1 hover:text-brand-600" onClick={() => setIsMenuOpen(false)}>• Fracture &amp; Trauma Recovery</Link>
              </div>
            </div>
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
