'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-100">
      <div className="container flex items-center justify-between py-4">
        {/* Brand Logo & Lockup - Clean Medfemme Style */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/images/logo-emblem.png"
              alt="Dr. Gaurav Bhargava Joint Clinic Logo"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">
              Dr. Gaurav Bhargava&apos;s
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-none tracking-tight group-hover:text-brand-600 transition-colors">
              Joint Clinic
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-brand-600 uppercase tracking-widest mt-1">
              A Centre of Arthroplasty &amp; Arthroscopy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Properly Spaced, 6 Clean Items */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors whitespace-nowrap ${
              isActive('/')
                ? 'text-brand-600 font-bold'
                : 'text-slate-600 hover:text-brand-600'
            }`}
          >
            Home
          </Link>

          {/* Medfemme-style 2-line Doctor link - Larger prominent size */}
          <Link
            href="/about"
            className="flex flex-col transition-colors whitespace-nowrap group/about"
          >
            <span
              className={`text-base font-bold leading-tight ${
                isActive('/about')
                  ? 'text-brand-600'
                  : 'text-slate-900 group-hover/about:text-brand-600'
              }`}
            >
              Dr. Gaurav Bhargava
            </span>
            <span className="text-xs font-semibold text-slate-500 group-hover/about:text-brand-600 transition-colors leading-tight">
              Best Orthopedic Surgeon
            </span>
          </Link>

          {/* Unified Treatments & Recovery Guide */}
          <Link
            href="/treatments"
            className={`text-sm font-semibold transition-colors whitespace-nowrap ${
              isActive('/treatments') || isActive('/recovery-guide')
                ? 'text-brand-600 font-bold'
                : 'text-slate-600 hover:text-brand-600'
            }`}
          >
            Treatments &amp; Recovery
          </Link>

          {/* Interchanged: Health Blog before Reviews */}
          <Link
            href="/blog"
            className={`text-sm font-semibold transition-colors whitespace-nowrap ${
              isActive('/blog')
                ? 'text-brand-600 font-bold'
                : 'text-slate-600 hover:text-brand-600'
            }`}
          >
            Health Blog
          </Link>

          <Link
            href="/testimonials"
            className={`text-sm font-semibold transition-colors whitespace-nowrap ${
              isActive('/testimonials')
                ? 'text-brand-600 font-bold'
                : 'text-slate-600 hover:text-brand-600'
            }`}
          >
            Reviews
          </Link>

          <Link
            href="/contact"
            className={`text-sm font-semibold transition-colors whitespace-nowrap ${
              isActive('/contact')
                ? 'text-brand-600 font-bold'
                : 'text-slate-600 hover:text-brand-600'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action CTA & Phone - Medfemme Style */}
        <div className="hidden xl:flex items-center gap-4">
          <a
            href="tel:+917309038872"
            className="flex items-center gap-2 text-brand-700 font-bold hover:text-brand-800 transition-colors whitespace-nowrap"
          >
            <Phone size={18} className="fill-brand-700/10 text-brand-600" />
            <span>+91 73090 38872</span>
          </a>

          <Link
            href="/appointment"
            className="btn-primary py-2.5 px-5 text-sm whitespace-nowrap shrink-0"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="xl:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer - Unified & Clean */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-b border-brand-100 py-6 px-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3 text-base font-medium text-slate-700">
            <Link
              href="/"
              className={`px-2 py-1.5 transition-colors ${
                isActive('/') ? 'text-brand-600 font-bold' : 'hover:text-brand-600 font-semibold'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-2 py-1.5 transition-colors flex flex-col ${
                isActive('/about') ? 'text-brand-600 font-bold' : 'hover:text-brand-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-base font-bold text-slate-900 leading-tight">Dr. Gaurav Bhargava</span>
              <span className="text-xs font-semibold text-slate-500">Best Orthopedic Surgeon</span>
            </Link>
            <Link
              href="/treatments"
              className={`px-2 py-1.5 transition-colors ${
                isActive('/treatments') || isActive('/recovery-guide')
                  ? 'text-brand-600 font-bold'
                  : 'hover:text-brand-600 font-semibold'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Treatments &amp; Recovery Protocols
            </Link>
            <Link
              href="/blog"
              className={`px-2 py-1.5 transition-colors ${
                isActive('/blog') ? 'text-brand-600 font-bold' : 'hover:text-brand-600 font-semibold'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Health Blog
            </Link>
            <Link
              href="/testimonials"
              className={`px-2 py-1.5 transition-colors ${
                isActive('/testimonials') ? 'text-brand-600 font-bold' : 'hover:text-brand-600 font-semibold'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Verified Patient Reviews
            </Link>
            <Link
              href="/contact"
              className={`px-2 py-1.5 transition-colors ${
                isActive('/contact') ? 'text-brand-600 font-bold' : 'hover:text-brand-600 font-semibold'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact &amp; Clinic Locations
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a
              href="tel:+917309038872"
              className="flex items-center justify-center gap-2 text-brand-700 font-bold p-3 bg-brand-50 rounded-2xl hover:bg-brand-100 transition-colors"
            >
              <Phone size={18} className="fill-brand-700/10 text-brand-600" />
              <span>Call: +91 73090 38872</span>
            </a>
            <Link
              href="/appointment"
              className="block btn-primary text-center py-3.5"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
