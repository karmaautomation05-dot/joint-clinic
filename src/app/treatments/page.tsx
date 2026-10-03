"use client";

import { useState, useEffect } from "react";
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
  HeartHandshake,
  ShieldAlert,
  Hospital,
} from "lucide-react";
import { TREATMENT_CATEGORIES } from "@/data/treatments";
import { RECOVERY_GUIDES } from "@/data/recoveryGuides";
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
  {
    q: "Are cashless health insurance and Ayushman Bharat accepted for surgeries?",
    a: "Yes. Inpatient surgical treatments at BMTC Hospital Kidwai Nagar support cashless health insurance TPA processing as well as government healthcare panel schemes, with a dedicated TPA helpdesk assisting with pre-authorization.",
  },
  {
    q: "What non-surgical treatments are available for knee and shoulder pain?",
    a: "Non-surgical treatments include autologous Platelet-Rich Plasma (PRP) therapy, hyaluronic acid joint lubrication injections, ultrasound-guided frozen shoulder hydrodilatation, spinal nerve root blocks, and customized kinetic physiotherapy.",
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

const RECOVERY_TO_CATEGORY_MAP: Record<string, string> = {
  "knee-recovery": "knee-care",
  "hip-recovery": "hip-care",
  "sports-recovery": "sports-injury",
  "shoulder-recovery": "shoulder-care",
  "spine-recovery": "spine-care",
  "prp-recovery": "non-surgical",
  "trauma-recovery": "fractures-trauma",
};

export default function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState<"treatments" | "recovery">("treatments");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "recovery" || window.location.hash === "#recovery") {
        setActiveTab("recovery");
      }
    }
  }, []);

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
            name: "Treatments & Recovery",
            item: "https://jointclinic.in/treatments",
          },
        ],
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://jointclinic.in/treatments#webpage",
        name: "Bone, Joint & Fracture Treatment & Recovery in Kanpur — Dr. Gaurav Bhargava",
        description:
          "Explore 7 clinical orthopedic categories covering 24+ specialized treatments and step-by-step rehabilitation recovery guides by Dr. Gaurav Bhargava in Kanpur.",
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
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Semantic Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/80 font-sans mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#F5CD09] font-medium">Treatments &amp; Recovery</span>
            </nav>

            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-3 sm:mb-4">
              Integrated Clinical &amp; Rehabilitation Care
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Treatments &amp; Recovery Guide
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mt-3 sm:mt-4 leading-relaxed font-sans">
              Expert orthopedic surgeries, minimally invasive arthroscopy, non-surgical joint care, and step-by-step patient recovery roadmaps led by Dr. Gaurav Bhargava (Best Orthopedic Surgeon in Kanpur).
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mt-8 sm:mt-12">
        {/* Interactive View Toggle Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto p-1 sm:p-1.5 bg-slate-100 rounded-2xl sm:rounded-full border border-slate-200/80 shadow-xs gap-1 sm:gap-0">
            <button
              onClick={() => setActiveTab("treatments")}
              className={`w-full sm:w-auto px-4 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "treatments"
                  ? "bg-[#059B8F] text-white shadow-md shadow-[#059B8F]/25 scale-[1.01]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Stethoscope size={16} />
              <span className="sm:hidden">Treatments (7 Specialties)</span>
              <span className="hidden sm:inline">Surgical &amp; Clinical Treatments (7 Specialties)</span>
            </button>
            <button
              onClick={() => setActiveTab("recovery")}
              className={`w-full sm:w-auto px-4 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "recovery"
                  ? "bg-[#059B8F] text-white shadow-md shadow-[#059B8F]/25 scale-[1.01]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <HeartPulse size={16} />
              <span className="sm:hidden">Recovery Guides (7 Roadmaps)</span>
              <span className="hidden sm:inline">Rehabilitation &amp; Recovery Guides (7 Roadmaps)</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: TREATMENTS DIRECTORY */}
        {activeTab === "treatments" && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-2">
                Specialized Portals
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Select an Orthopedic Specialty
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Click any specialty below to explore individual procedures, clinical approaches, and integrated recovery timelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {TREATMENT_CATEGORIES.map((category) => {
                const CatIcon = ICON_MAP[category.iconName] || Bone;
                const recoverySlug = CATEGORY_TO_RECOVERY_MAP[category.id] || "knee-recovery";
                return (
                  <div
                    key={category.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-brand-300 p-5 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badge & Icon */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-[#059B8F] group-hover:bg-[#059B8F] group-hover:text-white transition-colors">
                          <CatIcon size={24} />
                        </div>
                        <span className="text-xs font-bold text-[#059B8F] px-3 py-1 rounded-full bg-brand-50 border border-brand-200">
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
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 space-y-2">
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
                          <HeartPulse size={12} className="text-[#059B8F]" />
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
        )}

        {/* VIEW 2: RECOVERY & REHABILITATION ROADMAPS */}
        {activeTab === "recovery" && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-2">
                Rehabilitation Protocols
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Step-by-Step Patient Recovery Guides
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Clear milestones from Day 1 post-op to complete independent mobility. Click any guide for detailed instructions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {RECOVERY_GUIDES.map((guide) => {
                const CatIcon = ICON_MAP[guide.iconName] || HeartPulse;
                const treatmentCatId = RECOVERY_TO_CATEGORY_MAP[guide.id] || "knee-care";
                return (
                  <div
                    key={guide.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-brand-300 p-5 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badge & Icon */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#F18712] group-hover:bg-[#F18712] group-hover:text-white transition-colors">
                          <CatIcon size={24} />
                        </div>
                        <span className="text-xs font-bold text-[#F18712] px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
                          {guide.phases.length} Recovery Phases
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

                      {/* Key Milestones Snapshot */}
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Key Healing Milestones:
                        </span>
                        {guide.phases.slice(0, 3).map((phase, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 py-1 border-b border-slate-100 last:border-none"
                          >
                            <span className="font-bold text-[#059B8F] shrink-0">{phase.phase.split("(")[0].trim()}:</span>
                            <span className="text-slate-600 truncate">{phase.title}</span>
                          </div>
                        ))}
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
                          href={`/treatments/category/${treatmentCatId}`}
                          className="font-bold text-[#059B8F] hover:underline flex items-center gap-1"
                        >
                          <Stethoscope size={12} />
                          <span>Related Procedures</span>
                        </Link>
                        <Link
                          href="/appointment"
                          className="font-semibold text-slate-600 hover:text-[#059B8F]"
                        >
                          Consult Doctor
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Doctor Philosophy & Laminar OT Hospital Assurance */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-teal-50 to-brand-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-brand-200 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] mb-2 block">
              Clinical Excellence &bull; BMTC Hospital Kidwai Nagar
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
              Tissue-Sparing Surgeries &amp; Day-1 Walking Recovery
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              All surgeries are performed by Dr. Gaurav Bhargava inside Ultra-Clean Class-100 Laminar Airflow Modular Operation Theatres at BMTC Hospital Kidwai Nagar. Our evidence-based protocols enable joint replacement patients to start guided walking within 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/appointment"
              className="btn-primary py-3 px-6 text-sm font-bold shadow-md text-center"
            >
              Book OPD Consultation
            </Link>
            <a
              href="tel:+917309038872"
              className="px-6 py-3 rounded-full bg-white border border-brand-200 text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              <span>+91 73090 38872</span>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <section
          itemScope
          itemType="https://schema.org/FAQPage"
          className="mt-16 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-1">
              Patient Guidance &bull; FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Frequently Asked Questions About Treatments &amp; Recovery
            </h3>
          </div>

          <div className="space-y-4">
            {TREATMENTS_FAQS.map((faq, idx) => (
              <article
                key={idx}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-2xs space-y-2"
              >
                <h4
                  itemProp="name"
                  className="text-base font-bold text-slate-900 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-50 text-[#059B8F] text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    Q
                  </span>
                  <span>{faq.q}</span>
                </h4>
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  className="pl-7"
                >
                  <p
                    itemProp="text"
                    className="text-sm text-slate-600 leading-relaxed font-sans aeo-answer"
                  >
                    {faq.a}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
