"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bone,
  Activity,
  ShieldCheck,
  Award,
  HeartPulse,
  Sparkles,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronRight,
  HelpCircle,
  Phone,
} from "lucide-react";
import { TREATMENT_CATEGORIES } from "@/data/treatments";
import { PRIMARY_CONTACT } from "@/data/clinics";

const ICON_MAP: Record<string, typeof Bone> = {
  Bone: Bone,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Award: Award,
  HeartPulse: HeartPulse,
  Sparkles: Sparkles,
  Stethoscope: Stethoscope,
};

export default function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCategories =
    selectedCategory === "all"
      ? TREATMENT_CATEGORIES
      : TREATMENT_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="bg-white pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Patient-First Orthopedic Care
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Common Treatments &amp; Surgeries
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Find clear, simple explanations for your joint, bone, and ligament concerns.
              Every treatment is tailored to help you return to pain-free, active living without unnecessary confusion.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
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
              All Categories ({TREATMENT_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0)})
            </button>
            {TREATMENT_CATEGORIES.map((cat) => {
              const IconComp = ICON_MAP[cat.iconName] || Bone;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-[#059B8F] text-white shadow-md shadow-[#059B8F]/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <IconComp size={15} />
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categorized Content */}
      <div className="container mt-12 space-y-16">
        {filteredCategories.map((category) => {
          const CatIcon = ICON_MAP[category.iconName] || Bone;
          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-36"
            >
              {/* Category Header */}
              <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-[#059B8F]">
                      <CatIcon size={22} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F]">
                      {category.tagline}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
                    {category.name}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                    {category.description}
                  </p>
                </div>
                <Link
                  href="/appointment"
                  className="btn-secondary py-2 px-4 text-xs font-bold flex items-center gap-2 w-fit shrink-0"
                >
                  <Calendar size={14} className="text-[#F18712]" />
                  <span>Consult for {category.name.split(" ")[0]}</span>
                </Link>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-brand-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-bold text-[#059B8F] px-3 py-1 rounded-full bg-brand-50 border border-brand-100">
                          {category.name}
                        </span>
                        {item.badge && (
                          <span className="text-[11px] font-bold text-[#F18712] px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Short Description */}
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                        {item.shortDesc}
                      </p>

                      {/* Clear Explanations Box */}
                      <div className="space-y-4 bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-100 mb-6">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                            <HelpCircle size={14} className="text-[#F18712]" />
                            <span>When is this needed?</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {item.whenNeeded}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                            <CheckCircle2 size={14} className="text-[#059B8F]" />
                            <span>How it helps:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {item.howHelps}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                            <Clock size={14} className="text-[#0A7C97]" />
                            <span>Expected Recovery:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                            {item.recovery}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/treatments/${item.slug}`}
                        className="text-xs sm:text-sm font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center gap-1.5 transition-colors"
                      >
                        <span>Full Details &amp; Guide</span>
                        <ArrowRight size={15} />
                      </Link>

                      <Link
                        href="/appointment"
                        className="px-3.5 py-2 rounded-full bg-[#059B8F] text-white hover:bg-[#0A7C97] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Book Visit</span>
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Helpful Patient Assurance Banner */}
      <div className="container mt-20">
        <div className="bg-gradient-to-r from-brand-50 to-teal-50/50 rounded-3xl p-8 sm:p-12 border border-brand-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] mb-2 block">
              Second Opinions &amp; Advice
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
              Unsure which treatment is right for your joint?
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Bring your existing X-rays, MRI scans, or past prescriptions for an honest clinical evaluation.
              We believe in exhausting non-surgical options before recommending surgery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/appointment"
              className="btn-primary py-3 px-6 text-sm font-bold text-center"
            >
              Book an Evaluation
            </Link>
            <a
              href={`tel:${PRIMARY_CONTACT.phone}`}
              className="btn-secondary py-3 px-6 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Phone size={16} className="text-[#059B8F]" />
              <span>Call: +91 73090 38872</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
