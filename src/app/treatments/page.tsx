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

const TREATMENTS_FAQS = [
  {
    q: "How do I know if I need surgery or non-surgical joint care?",
    a: "Dr. Gaurav Bhargava follows a conservative-first approach. For mild-to-moderate arthritis, tendonitis, or early disc issues, non-surgical options like PRP biological therapy, joint lubrication, and physical therapy are prioritized. Surgery is advised only for end-stage cartilage loss, severe mechanical instability, or progressive nerve compression.",
  },
  {
    q: "Can I bring my existing MRI or X-ray reports for a second opinion?",
    a: "Yes, absolutely. Many patients visit Joint Clinic with previous scans to get an objective second opinion before deciding on surgery. Dr. Bhargava will review your images and clinical exam thoroughly.",
  },
  {
    q: "Where are surgical operations performed in Kanpur?",
    a: "All surgical procedures (including Knee/Hip Replacements, Arthroscopy, and Fracture Fixation) are performed in the Ultra-Clean Laminar Airflow Modular Operation Theaters at Bhargava Medical & Trauma Centre (BMTC), Kidwai Nagar, ensuring minimal infection risk and 24/7 post-op monitoring.",
  },
  {
    q: "How soon do patients start walking after joint surgery?",
    a: "Under modern tissue-sparing techniques and targeted sensory nerve blocks, knee and hip replacement patients take their first supported steps with a walker within 24 hours of surgery (Day 1).",
  },
];

const CATEGORY_TO_RECOVERY_MAP: Record<string, string> = {
  "knee-care": "knee-recovery",
  "hip-care": "hip-recovery",
  "sports-injury": "sports-recovery",
  "shoulder-care": "shoulder-recovery",
  "spine-care": "spine-recovery",
  "non-surgical": "prp-recovery",
  "fractures-trauma": "trauma-recovery",
};

export default function TreatmentsPage() {
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
            name: "Treatments",
            item: "https://jointclinic.in/treatments",
          },
        ],
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://jointclinic.in/treatments#webpage",
        name: "Orthopedic Specialties & Treatments by Category | Joint Clinic Kanpur",
        description:
          "Explore 7 clinical orthopedic categories covering 24+ specialized treatments by Dr. Gaurav Bhargava across Knee, Hip, Sports/ACL, Shoulder, Spine, PRP, and Trauma Care in Kanpur.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: TREATMENT_CATEGORIES.map((cat, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: cat.name,
            description: cat.description,
            url: `https://jointclinic.in/treatments/category/${cat.id}`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://jointclinic.in/treatments#faq",
        mainEntity: TREATMENTS_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
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
              <span className="text-[#F5CD09] font-medium">Treatments</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              7 Clinical Specialties
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Orthopedic Treatments &amp; Surgeries
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Find clear, simple explanations for your joint, bone, and ligament concerns.
              Select a specialty category below to explore all available surgical and non-surgical procedures tailored to your condition.
            </p>
          </div>
        </div>
      </section>

      {/* Category Cards Grid */}
      <div className="container mt-12 sm:mt-16">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-2">
            Specialized Portals
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Select an Orthopedic Specialty
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Click any category below to view all treatment procedures, symptoms treated, clinical techniques, and recovery expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TREATMENT_CATEGORIES.map((category) => {
            const CatIcon = ICON_MAP[category.iconName] || Bone;
            const recoverySlug = CATEGORY_TO_RECOVERY_MAP[category.id] || "knee-recovery";
            return (
              <div
                key={category.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-brand-300 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-[#059B8F] group-hover:bg-[#059B8F] group-hover:text-white transition-colors">
                      <CatIcon size={24} />
                    </div>
                    <span className="text-xs font-bold text-[#059B8F] px-3 py-1 rounded-full bg-brand-50/70 border border-brand-100">
                      {category.items.length} Treatments
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#059B8F] mb-3">
                    {category.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Procedures Preview List */}
                  <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100/90 mb-6 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Featured Procedures:
                    </span>
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/treatments/${item.slug}`}
                        className="flex items-center justify-between text-xs text-slate-700 hover:text-[#059B8F] font-medium transition-colors py-0.5 group/item"
                      >
                        <span className="truncate pr-2">• {item.name}</span>
                        <ChevronRight size={13} className="text-slate-400 group-hover/item:text-[#059B8F] shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <Link
                    href={`/treatments/category/${category.id}`}
                    className="w-full btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md"
                  >
                    <span>Explore {category.name.split(" ")[0]} Treatments ({category.items.length})</span>
                    <ArrowRight size={14} />
                  </Link>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                    <Link
                      href={`/recovery-guide#${recoverySlug}`}
                      className="font-bold text-[#0A7C97] hover:underline flex items-center gap-1"
                    >
                      <span>Recovery Roadmap</span>
                      <ArrowRight size={11} />
                    </Link>
                    <Link
                      href="/appointment"
                      className="font-semibold text-slate-600 hover:text-[#059B8F]"
                    >
                      Book OPD
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Treatments FAQ Section for Search Snippets & Patient Clarity */}
      <div className="container mt-20 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-2">
            Clear Answers
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Frequently Asked Questions About Treatments
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Answers from Dr. Gaurav Bhargava to help you make confident decisions about your joint and bone health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {TREATMENTS_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:bg-brand-50/40 hover:border-brand-200 transition-all shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-[#059B8F] shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-slate-900">
                  {faq.q}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
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
