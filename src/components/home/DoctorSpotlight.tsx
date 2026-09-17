import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { DOCTOR_DATA } from "@/data/doctor";

export default function DoctorSpotlight() {
  return (
    <section className="py-20 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Surgeon Portrait with High-Tech Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card bg-[#b0a59e]">
                <Image
                  src={DOCTOR_DATA.image}
                  alt={DOCTOR_DATA.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                />
              </div>

              {/* MAMC Telemetry Pill */}
              <div className="absolute -bottom-6 left-4 right-4 bg-brand-navy text-white p-4 rounded-2xl shadow-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-400 block">
                      Delhi-Standard Clinical Rigor
                    </span>
                    <p className="text-xs font-bold text-white leading-snug">
                      Ex-Senior Resident, Maulana Azad Medical College (MAMC), New Delhi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Surgeon Dossier */}
          <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-blue px-2.5 py-1 rounded bg-blue-50 border border-brand-blue/20 mb-3">
                <span>HEAD SURGEON DOSSIER</span>
                <span>&bull;</span>
                <span>IOA LIFE MEMBER</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                {DOCTOR_DATA.name}
              </h2>
              <p className="text-sm font-semibold text-brand-blue font-mono mt-1">
                {DOCTOR_DATA.title}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Dr. Gaurav Bhargava is a senior orthopaedic consultant with over{" "}
              <strong className="text-brand-navy font-bold">20 years of surgical experience</strong>,
              specializing in joint replacement (arthroplasty) and keyhole sports medicine (arthroscopy).
              Trained at India&apos;s apex surgical centers including{" "}
              <strong className="text-brand-navy">Maulana Azad Medical College (New Delhi)</strong> and{" "}
              <strong className="text-brand-navy">S.N. Medical College (Agra)</strong>, he has restored
              pain-free mobility for more than 10,000 patients across northern India.
            </p>

            {/* Philosophy Banner */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 border-l-4 border-l-brand-blue shadow-2xs space-y-1">
              <p className="text-xs font-mono font-bold uppercase text-brand-blue tracking-wider">
                CORE SURGICAL PHILOSOPHY
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-800 italic">
                &ldquo;{DOCTOR_DATA.philosophy.quote}&rdquo;
              </p>
            </div>

            {/* Technical Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {DOCTOR_DATA.philosophy.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-brand-navy hover:bg-brand-navyLight shadow transition-colors"
              >
                <span>Full Credentials &amp; Case Volume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-brand-blue bg-blue-50 hover:bg-blue-100 border border-brand-blue/20 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
