import Link from "next/link";
import {
  Bone,
  Activity,
  ShieldCheck,
  Award,
  HeartPulse,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { TREATMENTS } from "@/data/treatments";

const ICON_MAP: Record<string, typeof Bone> = {
  Bone: Bone,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Award: Award,
  HeartPulse: HeartPulse,
  Stethoscope: Sparkles,
};

export default function TreatmentsGrid() {
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
              Arthroplasty, Arthroscopy &amp; Joint Preservation
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
            <span>View All 6 Specialties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* High-Tech Clinical Procedure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((t) => {
            const IconComponent = ICON_MAP[t.iconName] || Bone;
            return (
              <div
                key={t.id}
                className="group relative bg-white rounded-3xl border border-slate-200 hover:border-brand-blue/50 p-7 transition-all duration-300 hover:shadow-card hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {t.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-lg font-black text-brand-navy group-hover:text-brand-blue transition-colors mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {t.shortDesc}
                  </p>

                  {/* Tech Specs Block */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 mb-6 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-sans text-xs">Walking:</span>
                      <span className="font-bold text-emerald-700">{t.stats.walkingResumed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-sans text-xs">Implant Goal:</span>
                      <span className="font-bold text-brand-blue">{t.stats.longevity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-sans text-xs">Duration:</span>
                      <span className="font-bold text-slate-800">{t.stats.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <Link
                  href={`/treatments/${t.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700 group-hover:text-brand-blue transition-colors"
                >
                  <span>Indications &amp; Clinical Data</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
