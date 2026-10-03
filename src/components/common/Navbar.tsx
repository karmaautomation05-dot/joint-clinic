'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Phone,
  Menu,
  X,
  Calendar,
  MapPin,
  Clock,
  Star,
  Activity,
  UserCheck,
  HeartPulse,
  BookOpen,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import { PRIMARY_CONTACT } from '@/data/clinics'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Track scroll position for subtle elevation transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Doctor', href: '/about' },
    { label: 'Treatments', href: '/treatments' },
    { label: 'Recovery Guide', href: '/recovery-guide' },
    { label: 'Reviews', href: '/testimonials' },
    { label: 'Health Blog', href: '/blog' },
    { label: 'Locations & OPD', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 1. TOP UTILITY STRIP (High-End Medical Practice Header) */}
      <div className="bg-[#03332f] text-emerald-100/90 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Kanpur Locations & Consultation Timings */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-50">
              <MapPin size={12} className="text-[#02BAB9] shrink-0" />
              <span>Swaroop Nagar &amp; BMTC Kidwai Nagar, Kanpur</span>
            </span>
            <span className="text-emerald-700 hidden md:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-200">
              <Clock size={12} className="text-[#F5CD09] shrink-0" />
              <span>Mon–Sat OPD Open</span>
            </span>
          </div>

          {/* Right: Google Rating & Direct Emergency Line */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-3">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-emerald-200 hover:text-white transition-colors"
              title="Verified Patient Rating on Google"
            >
              <span className="flex items-center text-[#F5CD09]">
                <Star size={11} className="fill-[#F5CD09]" />
                <Star size={11} className="fill-[#F5CD09]" />
                <Star size={11} className="fill-[#F5CD09]" />
                <Star size={11} className="fill-[#F5CD09]" />
                <Star size={11} className="fill-[#F5CD09]" />
              </span>
              <span className="font-semibold text-white ml-0.5">5.0</span>
              <span className="text-emerald-300/80">(41+ Reviews)</span>
            </a>

            <span className="text-emerald-700 hidden lg:inline">•</span>

            <a
              href="tel:+917309038872"
              className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#F5CD09] transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5CD09] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F18712]"></span>
              </span>
              <span className="text-emerald-300 font-normal hidden sm:inline">24/7 Emergency:</span>
              <span>+91 73090 38872</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
          isScrolled
            ? 'border-slate-200/90 shadow-md py-2.5'
            : 'border-slate-100 shadow-xs py-3 sm:py-3.5'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Authority Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0 focus:outline-none focus:ring-2 focus:ring-[#059B8F] rounded-xl p-1"
          >
            {/* Emblem with subtle glow */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 shrink-0 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/50 p-1 border border-brand-200/60 shadow-xs group-hover:shadow-sm group-hover:scale-105 transition-all duration-200">
              <Image
                src="/images/logo-emblem.png"
                alt="Dr. Gaurav Bhargava Joint Clinic Logo"
                fill
                sizes="56px"
                className="object-contain p-0.5"
                priority
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#059B8F] uppercase tracking-wider leading-none mb-0.5">
                Dr. Gaurav Bhargava&apos;s
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight tracking-tight group-hover:text-[#059B8F] transition-colors">
                Joint Clinic
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                Centre of Arthroplasty &amp; Arthroscopy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items (Clean, Airy, Visible active indicator) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] xl:text-[14px] px-3 xl:px-3.5 py-2 rounded-xl transition-all duration-150 whitespace-nowrap ${
                    active
                      ? 'text-[#059B8F] font-bold bg-[#059B8F]/8 shadow-xs'
                      : 'text-slate-700 hover:text-[#059B8F] hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#059B8F] rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Action CTA & Phone */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Phone quick call (visible on large desktops) */}
            <a
              href="tel:+917309038872"
              className="hidden 2xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors text-xs font-bold text-slate-700 group"
              title="Call Joint Clinic Kanpur"
            >
              <div className="w-7 h-7 rounded-full bg-brand-50 text-[#059B8F] flex items-center justify-center group-hover:bg-[#059B8F] group-hover:text-white transition-colors shrink-0">
                <Phone size={13} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Call OPD</span>
                <span className="text-slate-900 group-hover:text-[#059B8F] transition-colors leading-tight font-bold">+91 73090 38872</span>
              </div>
            </a>

            {/* Primary Action Button: Book Consultation */}
            <Link
              href="/appointment"
              className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#059B8F] to-[#0A7C97] hover:from-[#04887d] hover:to-[#086a82] shadow-md shadow-[#059B8F]/20 hover:shadow-lg hover:shadow-[#059B8F]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
            >
              <Calendar size={15} className="text-[#F5CD09] shrink-0" />
              <span className="whitespace-nowrap">Book Consultation</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-[#059B8F] hover:bg-slate-100 transition-colors border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-[#059B8F]"
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE SLIDE-DOWN DRAWER & BACKDROP */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 z-50 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-110px)] overflow-y-auto flex flex-col animate-in slide-in-from-top-4 duration-300">
            {/* Doctor Authority Header Inside Drawer */}
            <div className="p-4 bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#059B8F] shrink-0 relative bg-white">
                  <Image
                    src="/images/doctor/gaurav-bhargava.png"
                    alt="Dr. Gaurav Bhargava"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Dr. Gaurav Bhargava</h4>
                  <p className="text-[11px] font-semibold text-[#059B8F] leading-tight mt-0.5">
                    MBBS, MS Ortho • MAMC New Delhi
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">20+ Yrs Exp • 10,000+ Surgeries</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md shrink-0">
                OPD Open
              </span>
            </div>

            {/* Mobile Nav Links with Icons */}
            <div className="p-3 space-y-1 divide-y divide-slate-100">
              <div className="space-y-1">
                <Link
                  href="/"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/') && pathname === '/'
                      ? 'bg-[#059B8F]/10 text-[#059B8F] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      🏥
                    </span>
                    <span>Home</span>
                  </span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  href="/about"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/about')
                      ? 'bg-[#059B8F]/10 text-[#059B8F] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-[#059B8F]">
                      <UserCheck size={16} />
                    </span>
                    <span>About Dr. Gaurav Bhargava</span>
                  </span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  href="/treatments"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/treatments')
                      ? 'bg-[#059B8F]/10 text-[#059B8F] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-[#059B8F]">
                      <Activity size={16} />
                    </span>
                    <span>Bone &amp; Joint Treatments</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">
                    24+ Procedures
                  </span>
                </Link>

                <Link
                  href="/recovery-guide"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/recovery-guide')
                      ? 'bg-[#059B8F]/10 text-[#059B8F] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-[#F18712]">
                      <HeartPulse size={16} />
                    </span>
                    <span>Patient Recovery Guides</span>
                  </span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  href="/testimonials"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/testimonials')
                      ? 'bg-[#059B8F]/10 text-[#059B8F] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-amber-500">
                      <Star size={16} className="fill-amber-400" />
                    </span>
                    <span>Verified Patient Reviews</span>
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    5.0 ★
                  </span>
                </Link>

                <Link
                  href="/blog"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/blog')
                      ? 'bg-[#059B8F]/10 text-[#059B8F] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <BookOpen size={16} />
                    </span>
                    <span>Orthopedic Health Blog</span>
                  </span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>

                <Link
                  href="/contact"
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/contact')
                      ? 'bg-[#059B8F]/10 text-[#059B8F] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-[#059B8F]">
                      <MapPin size={16} />
                    </span>
                    <span>Clinics &amp; OPD Timings</span>
                  </span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </div>

              {/* Clinic Location Snapshot in Mobile Drawer */}
              <div className="pt-3 px-2 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <MapPin size={14} className="text-[#059B8F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Joint Clinic (Swaroop Nagar)</strong>
                    <span>120/500 (10), Lajpat Nagar • 4:00 PM – 7:00 PM</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <MapPin size={14} className="text-[#0A7C97] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">BMTC Hospital (Kidwai Nagar)</strong>
                    <span>10:00 AM – 2:00 PM • 24/7 Trauma Emergency</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Action CTAs */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 space-y-2.5 mt-auto">
              <Link
                href="/appointment"
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#059B8F] to-[#0A7C97] shadow-md shadow-[#059B8F]/20 flex items-center justify-center gap-2"
              >
                <Calendar size={17} className="text-[#F5CD09]" />
                <span>Book Clinic Consultation</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+917309038872"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100"
                >
                  <Phone size={14} className="text-[#059B8F]" />
                  <span>Call Doctor</span>
                </a>
                <a
                  href={`https://wa.me/${PRIMARY_CONTACT.whatsapp}?text=Hello%20Dr.%20Gaurav%20Bhargava,%20I%20would%20like%20to%20inquire%20about%20a%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
