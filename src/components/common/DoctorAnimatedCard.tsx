'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Activity, Sparkles, GraduationCap, Award } from 'lucide-react'
import { DOCTOR_DATA } from '@/data/doctor'

interface DoctorAnimatedCardProps {
  variant?: 'hero' | 'about' | 'compact'
  showBadges?: boolean
  autoRotate?: boolean
  className?: string
  priority?: boolean
  initialIndex?: number
}

export default function DoctorAnimatedCard({
  variant = 'hero',
  showBadges = true,
  autoRotate = true,
  className = '',
  priority = false,
  initialIndex = 0,
}: DoctorAnimatedCardProps) {
  const [currentIdx, setCurrentIdx] = useState(initialIndex)
  const [isHovered, setIsHovered] = useState(false)

  const photos = DOCTOR_DATA.images || [
    {
      src: '/images/doctor/dr-gaurav-suit.png',
      alt: 'Dr. Gaurav Bhargava - Senior Joint Replacement Surgeon in Kanpur',
      label: 'Ex-SR MAMC New Delhi',
      role: 'Director & Chief Surgeon',
    },
    {
      src: '/images/doctor/dr-gaurav-formal.png',
      alt: 'Dr. Gaurav Bhargava - Bone, Joint & Fracture Specialist',
      label: 'Clinical & Trauma Rigor',
      role: '20+ Years Surgical Excellence',
    },
    {
      src: '/images/doctor/gaurav-bhargava.png',
      alt: 'Dr. Gaurav Bhargava - Orthopedic Specialist Kanpur',
      label: 'Specialist OPD Consultations',
      role: 'Joint Clinic Swaroop Nagar & BMTC',
    },
  ]

  useEffect(() => {
    if (!autoRotate || isHovered) return
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % photos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [autoRotate, isHovered, photos.length])

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glowing backdrop aura with gentle breathing animation */}
      {variant !== 'compact' && (
        <>
          <div className="absolute -bottom-6 -right-6 w-52 sm:w-64 h-52 sm:h-64 bg-accent-200/50 rounded-full -z-10 blur-2xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -top-6 -left-6 w-40 sm:w-48 h-40 sm:h-48 bg-brand-200/50 rounded-full -z-10 blur-2xl pointer-events-none animate-pulse-glow [animation-delay:2s]" />
        </>
      )}

      {/* Main Portrait Container (100% Solid Opaque) */}
      <div
        className={`relative z-10 overflow-hidden bg-white group ${
          variant === 'about'
            ? 'aspect-[3/4] rounded-3xl shadow-xl border-4 sm:border-8 border-white'
            : variant === 'compact'
            ? 'aspect-[4/5] rounded-2xl shadow-md border-2 border-slate-200'
            : 'aspect-[4/5] rounded-3xl shadow-xl border-4 sm:border-8 border-white'
        }`}
      >
        {/* Render stacked photos for seamless crossfade and Ken-Burns zoom */}
        {photos.map((photo, idx) => {
          const isActive = idx === currentIdx
          return (
            <div
              key={photo.src}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={priority && idx === 0}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          )
        })}

        {/* Interactive Thumbnail / Indicator Bars */}
        <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center gap-1.5 px-4 pointer-events-auto">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer shadow-sm ${
                idx === currentIdx
                  ? 'w-7 bg-brand-500 shadow-xs'
                  : 'w-2 bg-slate-900/40 hover:bg-slate-900/70'
              }`}
              aria-label={`View photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Badges with Physics-based Floating Animations */}
      {showBadges && variant === 'hero' && (
        <>
          {/* Floating 20+ Years Experience Card */}
          <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-6 z-20 bg-white p-3.5 sm:p-5 rounded-2xl shadow-xl max-w-[170px] sm:max-w-[210px] border border-slate-200 hover:scale-105 transition-transform duration-300">
            <div className="text-brand-600 font-serif font-bold text-2xl sm:text-3xl mb-0.5">
              20+
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-tight">
              Years Clinical Excellence • MAMC New Delhi
            </div>
          </div>

          {/* Floating Verified Rating Badge (Floating Animation) */}
          <div className="absolute -top-3 sm:-top-4 right-2 sm:-right-4 z-20 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-1.5 sm:gap-2 animate-float">
            <div className="flex text-[#F18712]">
              <Star size={14} className="fill-[#F5CD09] text-[#F18712]" />
            </div>
            <div className="text-left">
              <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-none">
                5.0 / 5.0 Rating
              </div>
              <div className="text-[8.5px] sm:text-[9px] text-slate-500 font-medium">
                Justdial Verified
              </div>
            </div>
          </div>

          {/* Rapid Mobilization Floating Pill (Counter-Float Animation) */}
          <div className="absolute top-1/2 right-2 sm:-right-6 z-20 bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-200 hidden sm:flex items-center gap-1.5 animate-float-delayed">
            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              <Activity size={12} />
            </div>
            <span className="text-[11px] font-bold text-slate-800">
              24-Hr Mobilization
            </span>
          </div>
        </>
      )}

      {showBadges && variant === 'about' && (
        <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-6 z-20 bg-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-[170px] sm:max-w-[200px] border border-slate-200 animate-float">
          <div className="text-brand-600 font-serif font-bold text-2xl sm:text-3xl mb-0.5">
            20+
          </div>
          <div className="text-[9px] sm:text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-tight">
            Years of Surgical Excellence
          </div>
        </div>
      )}
    </div>
  )
}
