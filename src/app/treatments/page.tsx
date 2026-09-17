import type { Metadata } from "next";
import Link from "next/link";
import {
  Bone,
  Activity,
  ShieldCheck,
  Award,
  HeartPulse,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { TREATMENTS } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Orthopaedic Treatments & Specialties | Joint Clinic Kanpur",
  description:
    "Explore our complete range of specialized joint procedures in Kanpur: Total Knee Replacement (TKR), Total Hip Replacement (THR), Arthroscopic ACL reconstruction, and non-surgical PRP joint preservation.",
};

const ICON_MAP: Record<string, typeof Bone> = {
  Bone: Bone,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Award: Award,
  HeartPulse: HeartPulse,
  Stethoscope: Sparkles,
};

export default function TreatmentsPage() {
  return (
    <div className="bg-white pb-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Clinical Procedures &amp; Surgery
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Arthroplasty &amp; Arthroscopy Specialties
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Dr. Gaurav Bhargava provides advanced, tissue-sparing surgical interventions and
              regenerative joint preservation protocols across Kanpur and Central Uttar Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of All Treatments */}
      <div className="container -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TREATMENTS.map((t) => {
            const IconComponent = ICON_MAP[t.iconName] || Bone;
            return (
              <div
                key={t.id}
                className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 shadow-sm flex flex-col justify-between group hover:border-brand-300 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50/50 text-brand-700 border border-brand-100">
                      {t.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-3 leading-snug">
                    {t.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {t.shortDesc}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-4 mb-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Procedure Duration:</span>
                      <span className="font-bold text-slate-800">{t.stats.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Hospital Stay:</span>
                      <span className="font-bold text-slate-800">{t.stats.hospitalStay}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Walking Resumed:</span>
                      <span className="font-bold text-brand-700">{t.stats.walkingResumed}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Procedure Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/appointment"
                    className="btn-primary py-2 px-3.5 text-xs font-semibold"
                  >
                    Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
