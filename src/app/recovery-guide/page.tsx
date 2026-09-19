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
      {
        "@type": "FAQPage",
        "@id": "https://jointclinic.in/recovery-guide#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How soon do patients walk after joint surgery at Joint Clinic?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Dr. Gaurav Bhargava's tissue-sparing subvastus approach and multimodal pain relief, over 95% of knee and hip replacement patients stand and take supported steps with a walker within 24 hours of surgery (Day 1).",
            },
          },
          {
            "@type": "Question",
            name: "What physiotherapy is required during home recovery?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Patients receive a customized bedside exercise plan focusing on ankle pumps, quad sets, straight leg raises, and gentle knee bending. Our in-house physiotherapy team monitors progress to prevent stiffness and ensure safe mobility.",
            },
          },
          {
            "@type": "Question",
            name: "When can patients resume driving and work after joint replacement?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sedentary desk work can typically be resumed in 2 to 3 weeks. Driving is usually permitted around 4 to 6 weeks once full emergency braking reflex and quadriceps control are confirmed by Dr. Bhargava.",
            },
          },
          {
            "@type": "Question",
            name: "Where are follow-up recovery reviews conducted in Kanpur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Follow-up reviews, suture removals, and recovery progress checks are conducted at Joint Clinic in Swaroop Nagar (Evening OPD 4:00 PM – 7:00 PM) or BMTC Hospital in Kidwai Nagar (Morning OPD 10:00 AM – 2:00 PM). Hotline: +91 73090 38872.",
            },
          },
        ],
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
        {/* AEO Rehabilitation Knowledge Snapshot for Search Engines & AI Assistants */}
        <div className="bg-brand-50/60 rounded-3xl border border-brand-200/80 p-6 sm:p-8 mb-12 space-y-3 shadow-xs aeo-summary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059B8F] text-white flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#059B8F]">
                Rehabilitation Protocols &bull; AI Knowledge Snapshot
              </span>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Orthopedic Recovery at Joint Clinic Kanpur at a Glance
              </h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans aeo-answer">
            Patient recovery protocols at Joint Clinic are curated by <strong>Dr. Gaurav Bhargava</strong> (Ex-Senior Resident MAMC New Delhi). Utilizing modern tissue-sparing surgical techniques and targeted sensory nerve blocks, over <strong>95% of joint replacement patients walk within 24 hours of surgery (Day 1)</strong>. Step-by-step rehabilitation roadmaps cover 7 specialized categories: Knee, Hip, Sports/ACL, Shoulder, Spine, PRP Joint Preservation, and Bone Fracture Trauma. Post-operative reviews are conducted at Joint Clinic Swaroop Nagar and BMTC Hospital Kidwai Nagar.
          </p>
        </div>

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

      {/* Recovery FAQ Section with Schema Microdata */}
      <section 
        itemScope 
        itemType="https://schema.org/FAQPage"
        className="container mt-20 space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-2">
            Direct Answers &bull; Rehabilitation FAQ
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Frequently Asked Questions About Recovery
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Key answers on walking milestones, home care, and follow-up reviews by Dr. Gaurav Bhargava.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <article 
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
            className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:bg-brand-50/40 hover:border-brand-200 transition-all shadow-2xs"
          >
            <h4 itemProp="name" className="text-base font-serif font-bold text-slate-900">
              How soon do patients walk after joint surgery at Joint Clinic?
            </h4>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Under Dr. Gaurav Bhargava&apos;s tissue-sparing subvastus approach and multimodal pain relief, over 95% of knee and hip replacement patients stand and take supported steps with a walker within 24 hours of surgery (Day 1).
              </p>
            </div>
          </article>

          <article 
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
            className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:bg-brand-50/40 hover:border-brand-200 transition-all shadow-2xs"
          >
            <h4 itemProp="name" className="text-base font-serif font-bold text-slate-900">
              What physiotherapy is required during home recovery?
            </h4>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Patients receive a customized bedside exercise plan focusing on ankle pumps, quad sets, straight leg raises, and gentle knee bending. Our in-house physiotherapy team monitors progress to prevent stiffness and ensure safe mobility.
              </p>
            </div>
          </article>

          <article 
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
            className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:bg-brand-50/40 hover:border-brand-200 transition-all shadow-2xs"
          >
            <h4 itemProp="name" className="text-base font-serif font-bold text-slate-900">
              When can patients resume driving and work after joint replacement?
            </h4>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Sedentary desk work can typically be resumed in 2 to 3 weeks. Driving is usually permitted around 4 to 6 weeks once full emergency braking reflex and quadriceps control are confirmed by Dr. Bhargava.
              </p>
            </div>
          </article>

          <article 
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
            className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:bg-brand-50/40 hover:border-brand-200 transition-all shadow-2xs"
          >
            <h4 itemProp="name" className="text-base font-serif font-bold text-slate-900">
              Where are follow-up recovery reviews conducted in Kanpur?
            </h4>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Follow-up reviews, suture removals, and recovery progress checks are conducted at Joint Clinic in Swaroop Nagar (Evening OPD 4:00 PM – 7:00 PM) or BMTC Hospital in Kidwai Nagar (Morning OPD 10:00 AM – 2:00 PM). Hotline: +91 73090 38872.
              </p>
            </div>
          </article>
        </div>
      </section>

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
