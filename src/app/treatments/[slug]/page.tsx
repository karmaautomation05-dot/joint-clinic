import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  Clock,
  HelpCircle,
  Phone,
  FileCheck,
} from "lucide-react";
import { TREATMENTS } from "@/data/treatments";
import { PRIMARY_CONTACT } from "@/data/clinics";

const ICON_MAP: Record<string, typeof Bone> = {
  Bone: Bone,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Award: Award,
  HeartPulse: HeartPulse,
  Stethoscope: Sparkles,
};

function getTreatmentBySlug(slug: string) {
  return TREATMENTS.find((t) => t.slug === slug || t.aliases?.includes(slug));
}

export async function generateStaticParams() {
  const allSlugs = new Set<string>();
  TREATMENTS.forEach((t) => {
    allSlugs.add(t.slug);
    t.aliases?.forEach((alias) => allSlugs.add(alias));
  });
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) return {};

  return {
    title: `${treatment.title} in Kanpur | Dr. Gaurav Bhargava`,
    description: `${treatment.shortDesc} Performed by Dr. Gaurav Bhargava at Joint Clinic Swaroop Nagar & BMTC Kidwai Nagar Kanpur.`,
  };
}

export default function TreatmentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const treatment = getTreatmentBySlug(params.slug);

  if (!treatment) {
    notFound();
  }

  const IconComponent = ICON_MAP[treatment.iconName] || Bone;

  return (
    <div className="bg-white pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs text-[#F5CD09] text-xs font-bold uppercase tracking-wider">
              <span>{treatment.category}</span>
              <span>&bull;</span>
              <span>{treatment.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              {treatment.title}
            </h1>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-sans">
              {treatment.shortDesc}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20 text-xs">
              <div>
                <span className="text-white/70 block mb-0.5">Surgical Duration:</span>
                <strong className="text-white font-bold text-sm">{treatment.stats.duration}</strong>
              </div>
              <div>
                <span className="text-white/70 block mb-0.5">Hospital Stay:</span>
                <strong className="text-white font-bold text-sm">{treatment.stats.hospitalStay}</strong>
              </div>
              <div>
                <span className="text-white/70 block mb-0.5">Walking Resumed:</span>
                <strong className="text-[#F5CD09] font-bold text-sm">{treatment.stats.walkingResumed}</strong>
              </div>
              <div>
                <span className="text-white/70 block mb-0.5">Target Longevity:</span>
                <strong className="text-[#F5CD09] font-bold text-sm">{treatment.stats.longevity}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article & Procedures */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-5">
              <h2 className="text-3xl font-serif font-bold text-slate-900">Clinical Overview</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {treatment.overview}
              </p>
            </div>

            {/* Who is a Candidate / Indications */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
              <h2 className="text-3xl font-serif font-bold text-slate-900">
                When is this Procedure Recommended?
              </h2>
              <div className="space-y-3">
                {treatment.indications.map((ind, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-brand-50/30 border border-brand-100 text-sm text-slate-800 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specific Techniques */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
              <h2 className="text-3xl font-serif font-bold text-slate-900">
                Surgical Approaches &amp; Modern Technology
              </h2>
              <div className="space-y-4">
                {treatment.techniques.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2"
                  >
                    <h3 className="text-lg font-serif font-bold text-slate-900">{tech.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recovery Milestones */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
              <h2 className="text-3xl font-serif font-bold text-slate-900">
                Expected Recovery Timeline
              </h2>
              <div className="space-y-4">
                {treatment.recoveryMilestones.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-28 text-xs font-bold uppercase tracking-wider text-brand-700 shrink-0 pt-2 font-mono">
                      {rec.timeline}
                    </div>
                    <div className="p-4 rounded-2xl bg-brand-50/30 border border-brand-100 flex-1 text-sm text-slate-800">
                      {rec.milestone}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure FAQs */}
            {treatment.faqs.length > 0 && (
              <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
                <h2 className="text-3xl font-serif font-bold text-slate-900">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {treatment.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2"
                    >
                      <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{faq.q}</span>
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed pl-6">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA & Doctor Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-8 shadow-xl space-y-6 sticky top-28">
              <div className="space-y-2 text-center pb-5 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 inline-block">
                  Specialist Consultation
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  Dr. Gaurav Bhargava
                </h3>
                <p className="text-xs text-slate-500">
                  Get a personalized clinical evaluation and second opinion on your joint condition.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/appointment"
                  className="w-full btn-primary py-3.5 text-center text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>

                <Link
                  href="/appointment"
                  className="w-full btn-secondary py-3 text-center text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-brand-600" />
                  <span>Second Opinion on MRI / X-Ray</span>
                </Link>

                <a
                  href={`tel:${PRIMARY_CONTACT.phone}`}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-500 hover:text-brand-600 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {PRIMARY_CONTACT.phoneDisplay}</span>
                </a>
              </div>

              {/* Clinic Availability Card */}
              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                <p className="font-bold text-slate-900">Visiting Hours &amp; Locations:</p>
                <div className="p-3.5 rounded-2xl bg-brand-50/40 border border-brand-100/60 space-y-1">
                  <p className="font-semibold text-slate-900">Joint Clinic (Swaroop Nagar)</p>
                  <p className="text-slate-600 text-[11px]">05:00 PM – 07:00 PM (Mon–Sat)</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <p className="font-semibold text-slate-900">BMTC (Kidwai Nagar)</p>
                  <p className="text-slate-600 text-[11px]">10:00 AM – 02:00 PM (OPD &amp; Modular OTs)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
