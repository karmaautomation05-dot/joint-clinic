"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bone,
  Activity,
  ShieldCheck,
  Award,
  HeartPulse,
  Stethoscope,
  Sparkles,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Calendar,
  HelpCircle,
  ChevronRight,
  Clock,
} from "lucide-react";
import { RECOVERY_GUIDES, CategoryRecoveryGuide } from "@/data/recoveryGuides";
import { PRIMARY_CONTACT } from "@/data/clinics";

const ICON_MAP: Record<string, typeof Bone> = {
  Bone: Bone,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Award: Award,
  HeartPulse: HeartPulse,
  Stethoscope: Stethoscope,
  Sparkles: Sparkles,
};

export default function RecoveryGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const displayedGuides: CategoryRecoveryGuide[] =
    selectedCategory === "all"
      ? RECOVERY_GUIDES
      : RECOVERY_GUIDES.filter((g) => g.id === selectedCategory);

  return (
    <div className="bg-white pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Step-by-Step Patient Recovery Portals
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Your Complete Recovery Roadmap
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Guidance from <strong className="text-white">Dr. Gaurav Bhargava</strong>: Clear, reassuring, and practical recovery timelines.
              From Day 1 hospital milestones to home exercises, safe mobility, and active living — explained in friendly patient language.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Category Tabs (Matching /treatments) */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-[#059B8F] text-white shadow-md shadow-[#059B8F]/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Categories ({RECOVERY_GUIDES.length})
            </button>
            {RECOVERY_GUIDES.map((guide) => {
              const IconComp = ICON_MAP[guide.iconName] || Bone;
              const isSelected = selectedCategory === guide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedCategory(guide.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-[#059B8F] text-white shadow-md shadow-[#059B8F]/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <IconComp size={15} />
                  <span>{guide.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mt-10 space-y-16">
        {/* If 'all' is selected, show an introduction directory */}
        {selectedCategory === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {RECOVERY_GUIDES.map((guide) => {
              const IconComp = ICON_MAP[guide.iconName] || Bone;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedCategory(guide.id)}
                  className="group bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg hover:border-brand-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-[#059B8F] group-hover:bg-[#059B8F] group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#059B8F]">
                      {guide.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#059B8F] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {guide.overview}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#059B8F]">
                    <span>View {guide.phases.length}-Phase Roadmap</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Category-by-Category Deep Dives */}
        {displayedGuides.map((guide) => {
          const IconComp = ICON_MAP[guide.iconName] || Bone;
          return (
            <div
              key={guide.id}
              id={guide.id}
              className="scroll-mt-36 space-y-10 border-b border-slate-200 pb-16 last:border-b-0"
            >
              {/* Category Header Banner */}
              <div className="bg-gradient-to-r from-brand-50/80 via-white to-brand-50/50 rounded-3xl p-6 sm:p-10 border border-brand-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-brand-200 flex items-center justify-center text-[#059B8F] shrink-0">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] bg-white px-3 py-1 rounded-full border border-brand-200">
                        {guide.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {guide.tagline}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-slate-600 max-w-2xl leading-relaxed pt-1">
                      {guide.overview}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <Link
                    href="/appointment"
                    className="px-5 py-2.5 rounded-full bg-[#059B8F] hover:bg-[#04877c] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Consult Doctor</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* 1. Pre-Op / Home Preparation Checklist */}
              <div className="bg-white rounded-[2rem] border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-[#059B8F] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Home Preparation Checklist
                    </h3>
                    <p className="text-xs text-slate-500">
                      Simple, practical preparations so your home is safe and ready for smooth healing.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  {guide.homePrep.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 hover:bg-brand-50/40 hover:border-brand-200 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-[#059B8F] shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Step-by-Step Healing Timeline */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-1">
                      Step-by-Step Progression
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                      Phased Healing Milestones
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
                    Personalized pacing with Dr. Bhargava
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {guide.phases.map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 hover:shadow-md hover:border-brand-200 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#059B8F] px-3 py-1 rounded-full bg-brand-50 border border-brand-100 w-fit">
                          {phase.phase}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {phase.focus}
                        </span>
                      </div>

                      <h4 className="text-xl font-serif font-bold text-slate-900">
                        {phase.title}
                      </h4>

                      <div className="space-y-2.5 pt-1">
                        {phase.actions.map((action, aIdx) => (
                          <div
                            key={aIdx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#059B8F] shrink-0 mt-1.5" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>

                      {/* Patient Care Tip */}
                      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-[#F18712] shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-bold text-[#F18712]">Patient Advice:</strong>{" "}
                          {phase.tip}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. When to Contact Dr. Bhargava / Red Flags */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                      When to Call Joint Clinic (Helpful Checkpoints)
                    </h4>
                    <p className="text-xs text-slate-600">
                      Recovery is typically smooth, but reach out right away if you notice any of the following:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  {guide.whenToCall.map((item, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 rounded-xl bg-white/80 border border-rose-100 text-xs text-slate-800 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* 24/7 Patient Support Card */}
        <div className="bg-gradient-to-r from-[#059B8F] to-[#0A7C97] text-white rounded-[2.5rem] p-8 sm:p-12 text-center space-y-5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-2">
              We Are With You Every Step of the Way
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold">
              Have a Recovery Question or Need a Follow-up?
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed mt-2">
              Dr. Gaurav Bhargava and our dedicated clinical team at Swaroop Nagar &amp; Kidwai Nagar are just a phone call or WhatsApp message away.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/appointment"
                className="px-8 py-3.5 rounded-full bg-[#F18712] hover:bg-[#d96e00] text-white text-sm font-bold transition-colors shadow-md"
              >
                Book Recovery Review Visit
              </Link>
              <a
                href={`tel:${PRIMARY_CONTACT.phone}`}
                className="px-8 py-3.5 rounded-full bg-white text-[#059B8F] hover:bg-slate-50 text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Phone size={16} className="text-[#059B8F]" />
                <span>Call Us: +91 73090 38872</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
