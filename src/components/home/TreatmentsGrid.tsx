'use client'

import Link from "next/link";
import { useState, useRef } from "react";
import {
  Bone, Activity, ShieldCheck, Award, HeartPulse, Sparkles, ArrowRight, Stethoscope,
} from "lucide-react";
import { TREATMENTS } from "@/data/treatments";

const ICON_MAP: Record<string, typeof Bone> = {
  Bone, Activity, ShieldCheck, Award, HeartPulse, Stethoscope, Sparkles,
};

const CARD_COLORS: Record<string, { color: string; glow: string }> = {
  "total-knee-replacement":    { color: "#059B8F", glow: "rgba(5,155,143,0.25)" },
  "hip-replacement":           { color: "#0A7C97", glow: "rgba(10,124,151,0.25)" },
  "acl-reconstruction":        { color: "#02BAB9", glow: "rgba(2,186,185,0.25)" },
  "shoulder-arthroscopy":      { color: "#F18712", glow: "rgba(241,135,18,0.25)" },
  "joint-preservation-prp":    { color: "#01B3BF", glow: "rgba(1,179,191,0.25)" },
  "complex-trauma-fractures":  { color: "#F5CD09", glow: "rgba(245,205,9,0.25)" },
};

function TreatmentCard3D({ t }: { t: (typeof TREATMENTS)[number] }) {
  const [tilt, setTilt]     = useState({ x: 0, y: 0 })
  const [hovered, setHov]   = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const IconComponent = ICON_MAP[t.iconName] || Bone
  const accent = CARD_COLORS[t.slug] ?? { color: "#059B8F", glow: "rgba(5,155,143,0.25)" }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2))  / (rect.width / 2)
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
    setTilt({ x: dy * -9, y: dx * 9 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false) }}
      className="group relative rounded-3xl border p-7 flex flex-col justify-between overflow-hidden"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${accent.color}12 0%, white 70%)`
          : "white",
        borderColor: hovered ? accent.color + "50" : "rgba(226,232,240,0.8)",
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? "10px" : "0"})`,
        transition: "transform 0.12s ease-out, box-shadow 0.3s ease, background 0.4s ease, border-color 0.3s ease",
        transformStyle: "preserve-3d",
        boxShadow: hovered
          ? `0 32px 64px ${accent.glow}, 0 4px 16px rgba(0,0,0,0.07)`
          : "0 1px 4px rgba(0,0,0,0.04)",
        willChange: "transform",
        cursor: "default",
      }}
    >
      {/* Top glint */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

      {/* Big faded icon bg */}
      <div
        className="absolute -right-4 -bottom-6 opacity-[0.04] group-hover:opacity-[0.06] transition-opacity duration-400"
        style={{ transform: "translateZ(0)" }}
      >
        <IconComponent style={{ width: 110, height: 110, color: accent.color }} />
      </div>

      {/* Content (lifted to 3D Z layer) */}
      <div style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }} className="relative flex flex-col h-full">
        <div>
          {/* Icon + Category */}
          <div className="flex items-center justify-between mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: hovered ? accent.color + "20" : accent.color + "12",
                color: accent.color,
                boxShadow: hovered ? `0 0 20px ${accent.glow}` : "none",
              }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {t.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-black mb-2 transition-colors duration-300"
            style={{ color: hovered ? accent.color : "#0f172a" }}
          >
            {t.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-5">{t.shortDesc}</p>

          {/* Tech Specs */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 mb-6 font-mono text-[11px] group-hover:border-slate-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans text-xs">Walking:</span>
              <span className="font-bold text-emerald-700">{t.stats.walkingResumed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans text-xs">Implant Goal:</span>
              <span className="font-bold" style={{ color: accent.color }}>{t.stats.longevity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-sans text-xs">Duration:</span>
              <span className="font-bold text-slate-800">{t.stats.duration}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/treatments/${t.slug}`}
          className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:gap-3 group-hover:border-opacity-50"
          style={{ color: hovered ? accent.color : "#475569" }}
        >
          <span>Indications & Clinical Data</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-[3px] rounded-b-3xl transition-all duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)` }}
      />
    </div>
  )
}

const FEATURE_SLUGS = [
  "total-knee-replacement",
  "hip-replacement",
  "acl-reconstruction",
  "shoulder-arthroscopy",
  "joint-preservation-prp",
  "complex-trauma-fractures",
]

export default function TreatmentsGrid() {
  const featured = TREATMENTS.filter((t) => FEATURE_SLUGS.includes(t.slug))
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-blue px-3 py-1 rounded-md bg-blue-50 border border-brand-blue/20 inline-block mb-3">
              TERTIARY SURGICAL PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Arthroplasty, Arthroscopy & Joint Preservation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              State-of-the-art orthopaedic procedures utilizing sub-millimeter anatomical alignment,
              long-life implants, and accelerated rehabilitation protocols.
            </p>
          </div>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline shrink-0"
          >
            <span>View All 7 Categories & 24+ Treatments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((t) => <TreatmentCard3D key={t.id} t={t} />)}
        </div>
      </div>
    </section>
  )
}
