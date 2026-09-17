import type { Metadata } from "next";
import Link from "next/link";
import {
  Bone,
  Activity,
  ShieldCheck,
  Award,
  HeartPulse,
  Stethoscope,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Phone,
  Clock,
  CheckCircle2,
  Calendar,
  HeartHandshake,
} from "lucide-react";
import { RECOVERY_GUIDES } from "@/data/recoveryGuides";
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

const RECOVERY_TO_TREATMENT_MAP: Record<string, { id: string; name: string }> = {
  "knee-recovery": { id: "knee-care", name: "Knee Care & Surgery" },
  "hip-recovery": { id: "hip-care", name: "Hip Care & Surgery" },
  "sports-recovery": { id: "sports-injury", name: "Sports Injury & Arthroscopy" },
  "shoulder-recovery": { id: "shoulder-care", name: "Shoulder & Arm Care" },
  "spine-recovery": { id: "spine-care", name: "Spine & Sciatica Care" },
  "prp-recovery": { id: "non-surgical", name: "Non-Surgical Joint Care & PRP" },
  "trauma-recovery": { id: "fractures-trauma", name: "Bone Fractures & Trauma" },
};

export const metadata: Metadata = {
  title: "Patient Recovery Guides & Rehabilitation Milestones | Joint Clinic Kanpur",
  description:
    "Explore 7 specialty recovery guides by Dr. Gaurav Bhargava in Kanpur. Step-by-step healing timelines for Knee, Hip, Sports/ACL, Shoulder, Spine, PRP, and Trauma recovery.",
  keywords: [
    "Recovery Guide Kanpur",
    "Knee Surgery Recovery",
    "Hip Replacement Recovery Timeline",
    "ACL Rehabilitation Protocol",
    "Dr Gaurav Bhargava Patient Recovery",
    "Joint Clinic Kanpur",
  ],
  alternates: {
    canonical: "https://jointclinic.in/recovery-guide",
  },
  openGraph: {
    title: "Patient Recovery Guides | Joint Clinic Kanpur",
    description: "Reassuring, step-by-step patient recovery timelines by Dr. Gaurav Bhargava.",
    url: "https://jointclinic.in/recovery-guide",
    siteName: "Joint Clinic Kanpur",
    locale: "en_IN",
    type: "website",
  },
};

export default function RecoveryGuideIndexPage() {
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
        ],
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://jointclinic.in/recovery-guide#webpage",
        name: "Patient Recovery Guides & Rehabilitation Milestones | Joint Clinic Kanpur",
        description:
          "Step-by-step patient recovery timelines for Knee, Hip, Sports/ACL, Shoulder, Spine, PRP, and Trauma Care by Dr. Gaurav Bhargava in Kanpur.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: RECOVERY_GUIDES.map((guide, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: guide.title,
            description: guide.overview,
            url: `https://jointclinic.in/recovery-guide/${guide.id}`,
          })),
        },
      },
    ],
  };

  return (
    <div className="bg-white pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Semantic Breadcrumbs for UX & SEO */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/80 font-sans mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#F5CD09] font-medium">Recovery Guide</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              7 Patient Recovery Portals
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Patient Recovery Guides
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Reassuring, structured recovery timelines from <strong className="text-white">Dr. Gaurav Bhargava</strong>.
              Select a specialty below to view step-by-step healing milestones, home preparation checklists, exercises, and safety precautions.
            </p>
          </div>
        </div>
      </section>

      {/* Recovery Category Cards Grid */}
      <div className="container mt-12 sm:mt-16">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-2">
            Rehabilitation Portals
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Select a Recovery Specialty
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Click on your procedure category to open its complete recovery roadmap — from Day 1 hospital care to independent daily mobility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RECOVERY_GUIDES.map((guide) => {
            const GuideIcon = ICON_MAP[guide.iconName] || Bone;
            const treatmentCategory = RECOVERY_TO_TREATMENT_MAP[guide.id] || {
              id: "knee-care",
              name: "Knee Care",
            };

            return (
              <div
                key={guide.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-brand-300 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-[#059B8F] group-hover:bg-[#059B8F] group-hover:text-white transition-colors">
                      <GuideIcon size={24} />
                    </div>
                    <span className="text-xs font-bold text-[#059B8F] px-3 py-1 rounded-full bg-brand-50/70 border border-brand-100">
                      {guide.phases.length} Phases
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#059B8F] mb-3">
                    {guide.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {guide.overview}
                  </p>

                  {/* Phases Preview Box */}
                  <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100/90 mb-6 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Roadmap Milestones:
                    </span>
                    {guide.phases.slice(0, 3).map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-2 text-xs text-slate-700 font-medium py-0.5"
                      >
                        <CheckCircle2 size={13} className="text-[#059B8F] shrink-0" />
                        <span className="truncate">{p.title} ({p.phase.split("(")[0].trim()})</span>
                      </div>
                    ))}
                    {guide.phases.length > 3 && (
                      <span className="text-[11px] text-[#0A7C97] font-semibold block pt-1">
                        + {guide.phases.length - 3} more progressive phases
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <Link
                    href={`/recovery-guide/${guide.id}`}
                    className="w-full btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md"
                  >
                    <span>Open {guide.category.split(" ")[0]} Recovery Guide</span>
                    <ArrowRight size={14} />
                  </Link>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                    <Link
                      href={`/treatments/category/${treatmentCategory.id}`}
                      className="font-bold text-[#0A7C97] hover:underline flex items-center gap-1"
                    >
                      <span>{treatmentCategory.name}</span>
                      <ArrowRight size={11} />
                    </Link>
                    <a
                      href={`tel:${PRIMARY_CONTACT.phone}`}
                      className="font-semibold text-slate-600 hover:text-[#059B8F]"
                    >
                      Call Helpline
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Patient Reassurance & Helpline Banner */}
      <div className="container mt-20">
        <div className="bg-gradient-to-r from-brand-50 to-teal-50/50 rounded-3xl p-8 sm:p-12 border border-brand-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <HeartHandshake className="w-5 h-5 text-[#059B8F]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F]">
                Continuous Support
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
              Questions During Your Recovery?
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Our clinical care team is here to support you at every stage of your healing.
              Whether you need guidance on exercises, swelling management, or medication, reach out to us directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${PRIMARY_CONTACT.phone}`}
              className="btn-primary py-3 px-6 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Phone size={16} className="text-[#F5CD09]" />
              <span>Call Helpline: +91 73090 38872</span>
            </a>
            <Link
              href="/appointment"
              className="btn-secondary py-3 px-6 text-sm font-bold text-center"
            >
              Book Follow-up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
