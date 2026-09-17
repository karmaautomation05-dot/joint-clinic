import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  Clock,
  ChevronRight,
  ShieldAlert,
  Home,
  FileCheck,
} from "lucide-react";
import { RECOVERY_GUIDES, CategoryRecoveryGuide } from "@/data/recoveryGuides";
import { TREATMENT_CATEGORIES } from "@/data/treatments";
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

const RECOVERY_TO_TREATMENT_MAP: Record<string, string> = {
  "knee-recovery": "knee-care",
  "hip-recovery": "hip-care",
  "sports-recovery": "sports-injury",
  "shoulder-recovery": "shoulder-care",
  "spine-recovery": "spine-care",
  "prp-recovery": "non-surgical",
  "trauma-recovery": "fractures-trauma",
  // Aliases
  "knee-care": "knee-care",
  "hip-care": "hip-care",
  "sports-injury": "sports-injury",
  "shoulder-care": "shoulder-care",
  "spine-care": "spine-care",
  "non-surgical": "non-surgical",
  "fractures-trauma": "fractures-trauma",
};

function getGuideBySlug(slug: string): CategoryRecoveryGuide | undefined {
  return RECOVERY_GUIDES.find(
    (g) => g.id === slug || RECOVERY_TO_TREATMENT_MAP[slug] === RECOVERY_TO_TREATMENT_MAP[g.id]
  );
}

export async function generateStaticParams() {
  const params: { categorySlug: string }[] = [];
  RECOVERY_GUIDES.forEach((g) => {
    params.push({ categorySlug: g.id });
    // Also include treatment category slug as alias
    const treatmentCat = RECOVERY_TO_TREATMENT_MAP[g.id];
    if (treatmentCat && treatmentCat !== g.id) {
      params.push({ categorySlug: treatmentCat });
    }
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { categorySlug: string };
}): Promise<Metadata> {
  const guide = getGuideBySlug(params.categorySlug);
  if (!guide) return {};

  return {
    title: `${guide.title} | Day-by-Day Timeline | Joint Clinic Kanpur`,
    description: `${guide.tagline}. ${guide.overview} Step-by-step patient recovery guide by Dr. Gaurav Bhargava in Kanpur.`,
    keywords: [
      guide.title,
      `${guide.category} recovery`,
      "Joint replacement recovery Kanpur",
      "Knee surgery walking timeline",
      "Dr Gaurav Bhargava recovery guide",
      "BMTC Kidwai Nagar recovery",
    ],
    alternates: {
      canonical: `https://jointclinic.in/recovery-guide/${guide.id}`,
    },
    openGraph: {
      title: `${guide.title} | Joint Clinic Kanpur`,
      description: `${guide.tagline}. Clear patient rehabilitation milestones.`,
      url: `https://jointclinic.in/recovery-guide/${guide.id}`,
      siteName: "Joint Clinic Kanpur",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function DedicatedRecoveryCategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const guide = getGuideBySlug(params.categorySlug);

  if (!guide) {
    notFound();
  }

  const GuideIcon = ICON_MAP[guide.iconName] || Bone;
  const treatmentCategoryId = RECOVERY_TO_TREATMENT_MAP[guide.id] || "knee-care";
  const matchingTreatmentCategory = TREATMENT_CATEGORIES.find(
    (c) => c.id === treatmentCategoryId
  );

  const otherGuides = RECOVERY_GUIDES.filter((g) => g.id !== guide.id);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://jointclinic.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Recovery Guide",
            item: "https://jointclinic.in/recovery-guide",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: `https://jointclinic.in/recovery-guide/${guide.id}`,
          },
        ],
      },
      {
        "@type": "MedicalWebPage",
        "@id": `https://jointclinic.in/recovery-guide/${guide.id}#webpage`,
        name: `${guide.title} | Joint Clinic Kanpur`,
        description: guide.overview,
      },
    ],
  };

  return (
    <div className="bg-white pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Recovery Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Semantic Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/80 font-sans mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/recovery-guide" className="hover:text-white transition-colors">Recovery Guide</Link>
              <span>/</span>
              <span className="text-[#F5CD09] font-medium">{guide.category}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-[#F5CD09]">
                <GuideIcon size={26} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-xs">
                {guide.phases.length}-Phase Roadmap
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight text-white">
              {guide.title}
            </h1>
            <p className="text-base sm:text-lg text-teal-100 font-semibold mt-2">
              {guide.tagline}
            </p>
            <p className="text-sm sm:text-base text-white/90 mt-4 leading-relaxed font-sans">
              {guide.overview} Curated by <strong className="text-white">Dr. Gaurav Bhargava</strong> to provide you and your caregivers with peace of mind at every step.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href={`tel:${PRIMARY_CONTACT.phone}`}
                className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <Phone size={15} className="text-[#F5CD09]" />
                <span>Call Helpline: +91 73090 38872</span>
              </a>
              {matchingTreatmentCategory && (
                <Link
                  href={`/treatments/category/${matchingTreatmentCategory.id}`}
                  className="btn-secondary py-3 px-5 text-xs sm:text-sm font-bold text-white bg-white/15 hover:bg-white/25 border-white/30 flex items-center gap-2"
                >
                  <Bone size={15} />
                  <span>View Related Treatments &rarr;</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mt-12 sm:mt-16 space-y-16">
        {/* Home Preparation Checklist (Cards) */}
        {guide.homePrep && guide.homePrep.length > 0 && (
          <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-[#059B8F]">
                <Home size={22} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block">
                  Before Surgery &amp; Discharge
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Home Preparation Checklist
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guide.homePrep.map((prep, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2 hover:border-brand-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#059B8F] flex items-center justify-center text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{prep.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{prep.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step-by-Step Rehabilitation Timeline (Cards) */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-1">
              Step-by-Step Milestones
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
              Your Recovery Journey &amp; Milestones
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Follow this structured timeline. Each phase outlines safe movements, physical therapy goals, and Dr. Bhargava’s golden recovery tips.
            </p>
          </div>

          <div className="space-y-6">
            {guide.phases.map((phase, pIdx) => (
              <div
                key={pIdx}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-brand-300 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-[#059B8F] px-3 py-1 rounded-full bg-brand-50 border border-brand-100 inline-block mb-2">
                      Phase {pIdx + 1} • {phase.phase}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {phase.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100/80 px-3.5 py-1.5 rounded-full w-fit">
                    <Clock size={14} className="text-[#0A7C97]" />
                    <span>Focus: {phase.focus}</span>
                  </div>
                </div>

                {/* Actions Checklist */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Actions &amp; Exercises:
                  </span>
                  {phase.actions.map((act, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#059B8F] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {act}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Dr. Bhargava's Golden Tip */}
                {phase.tip && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-[#F18712] flex items-center justify-center shrink-0 mt-0.5">
                      💡
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F18712] block mb-0.5">
                        Dr. Bhargava&apos;s Patient Tip
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 italic">
                        &quot;{phase.tip}&quot;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Safety Guide: When to Call the Clinic */}
        {guide.whenToCall && guide.whenToCall.length > 0 && (
          <section className="bg-red-50/60 rounded-3xl p-6 sm:p-10 border border-red-200/80 shadow-2xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle size={22} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-600 block">
                  Patient Safety First
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  When to Contact Joint Clinic Immediately
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              While serious complications are rare, you should never hesitate to reach out if you experience any of the following symptoms:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {guide.whenToCall.map((warn, wIdx) => (
                <div
                  key={wIdx}
                  className="bg-white rounded-2xl p-4 border border-red-100 flex items-start gap-3"
                >
                  <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-800 font-medium">{warn}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-slate-700">
                <strong>Direct Emergency Support:</strong> BMTC Kidwai Nagar provides 24/7 round-the-clock emergency casualty backup for all our surgical patients.
              </div>
              <a
                href={`tel:${PRIMARY_CONTACT.phone}`}
                className="btn-primary py-2.5 px-5 text-xs font-bold whitespace-nowrap bg-red-600 hover:bg-red-700 text-white shrink-0"
              >
                Call: +91 73090 38872
              </a>
            </div>
          </section>
        )}

        {/* Covered Treatments in this Category */}
        {matchingTreatmentCategory && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-1">
                  Surgical &amp; Non-Surgical Options
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Treatments Covered in this Recovery Roadmap
                </h3>
              </div>
              <Link
                href={`/treatments/category/${matchingTreatmentCategory.id}`}
                className="text-xs font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center gap-1.5"
              >
                <span>View Complete Specialty Category</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {matchingTreatmentCategory.items.map((tItem) => (
                <div
                  key={tItem.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-brand-200 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#059B8F] px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-100">
                      {tItem.badge || "Clinical Care"}
                    </span>
                    <h4 className="text-base font-serif font-bold text-slate-900">
                      {tItem.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {tItem.shortDesc}
                    </p>
                  </div>
                  <Link
                    href={`/treatments/${tItem.slug}`}
                    className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center justify-between group"
                  >
                    <span>View Full Treatment Page</span>
                    <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Recovery Portals Switcher */}
        <section className="pt-10 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
              Explore Other Portals
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Other Patient Recovery Guides
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherGuides.map((og) => {
              const OGIcon = ICON_MAP[og.iconName] || Bone;
              return (
                <Link
                  key={og.id}
                  href={`/recovery-guide/${og.id}`}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-brand-50/80 border border-slate-200/70 hover:border-brand-200 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#059B8F] group-hover:bg-[#059B8F] group-hover:text-white transition-colors mb-2 shadow-2xs">
                    <OGIcon size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#059B8F] transition-colors leading-tight">
                    {og.category.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    {og.phases.length} Phases
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
