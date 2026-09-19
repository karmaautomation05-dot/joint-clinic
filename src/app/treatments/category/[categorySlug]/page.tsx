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
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronRight,
  HelpCircle,
  Phone,
  Hospital,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { TREATMENT_CATEGORIES, TreatmentCategory, TREATMENTS } from "@/data/treatments";
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

const CATEGORY_TO_RECOVERY_MAP: Record<string, { slug: string; title: string }> = {
  "knee-care": { slug: "knee-recovery", title: "Knee Surgery Recovery Guide" },
  "hip-care": { slug: "hip-recovery", title: "Hip Surgery Recovery Guide" },
  "sports-injury": { slug: "sports-recovery", title: "Sports & ACL Recovery Guide" },
  "shoulder-care": { slug: "shoulder-recovery", title: "Shoulder & Arm Recovery Guide" },
  "spine-care": { slug: "spine-recovery", title: "Spine & Sciatica Recovery Guide" },
  "non-surgical": { slug: "prp-recovery", title: "PRP & Joint Injection Protocol" },
  "fractures-trauma": { slug: "trauma-recovery", title: "Bone Fracture & Trauma Recovery" },
};

function getCategoryBySlug(slug: string): TreatmentCategory | undefined {
  return TREATMENT_CATEGORIES.find((c) => c.id === slug);
}

export async function generateStaticParams() {
  return TREATMENT_CATEGORIES.map((c) => ({
    categorySlug: c.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { categorySlug: string };
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) return {};

  return {
    title: `${category.name} in Kanpur | Dr. Gaurav Bhargava | Joint Clinic`,
    description: `${category.tagline}. ${category.description} Expert orthopedic care by Dr. Gaurav Bhargava in Kanpur.`,
    keywords: [
      category.name,
      `${category.name} in Kanpur`,
      `Best doctor for ${category.name} Kanpur`,
      "Dr Gaurav Bhargava Kanpur",
      "Joint Clinic Swaroop Nagar",
      "BMTC Kidwai Nagar",
      "Orthopedic Surgeon Kanpur",
    ],
    alternates: {
      canonical: `https://jointclinic.in/treatments/category/${category.id}`,
    },
    openGraph: {
      title: `${category.name} | Joint Clinic Kanpur`,
      description: `${category.tagline}. Expert procedures by Dr. Gaurav Bhargava.`,
      url: `https://jointclinic.in/treatments/category/${category.id}`,
      siteName: "Joint Clinic Kanpur",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function TreatmentCategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = getCategoryBySlug(params.categorySlug);

  if (!category) {
    notFound();
  }

  const CatIcon = ICON_MAP[category.iconName] || Bone;
  const recoveryInfo = CATEGORY_TO_RECOVERY_MAP[category.id] || {
    slug: "knee-recovery",
    title: "Patient Recovery Guide",
  };

  const otherCategories = TREATMENT_CATEGORIES.filter((c) => c.id !== category.id);

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
          {
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `https://jointclinic.in/treatments/category/${category.id}`,
          },
        ],
      },
      {
        "@type": "MedicalWebPage",
        "@id": `https://jointclinic.in/treatments/category/${category.id}#webpage`,
        name: `${category.name} in Kanpur | Dr. Gaurav Bhargava | Joint Clinic`,
        description: category.description,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: category.items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            description: item.shortDesc,
            url: `https://jointclinic.in/treatments/${item.slug}`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `https://jointclinic.in/treatments/category/${category.id}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `What conditions are treated under ${category.name} in Kanpur?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${category.description} At Joint Clinic, Dr. Gaurav Bhargava provides comprehensive diagnosis and surgical/non-surgical care for ${category.items.map((i) => i.name).join(", ")}.`,
            },
          },
          {
            "@type": "Question",
            name: `Who is the specialist for ${category.name} in Kanpur?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Dr. Gaurav Bhargava (MBBS, MS Orthopaedics, Ex-Senior Resident Maulana Azad Medical College, New Delhi) with 20+ years of surgical experience is the chief specialist for ${category.name} at Joint Clinic (Swaroop Nagar) and BMTC Hospital (Kidwai Nagar), Kanpur.`,
            },
          },
          {
            "@type": "Question",
            name: `Where are ${category.name} consultations and surgeries conducted?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Evening OPD consultations (4:00 PM – 7:00 PM) are held at Joint Clinic, Swaroop Nagar. Surgeries, digital X-rays, and 24/7 trauma emergency care are provided at Bhargava Medical & Trauma Centre (BMTC), Kidwai Nagar, Kanpur.`,
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

      {/* Category Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Semantic Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/80 font-sans mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <span>/</span>
              <span className="text-[#F5CD09] font-medium">{category.name}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-[#F5CD09]">
                <CatIcon size={26} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-xs">
                {category.items.length} Specialized Procedures
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight text-white">
              {category.name}
            </h1>
            <p className="text-base sm:text-lg text-teal-100 font-semibold mt-2">
              {category.tagline}
            </p>
            <p className="text-sm sm:text-base text-white/90 mt-4 leading-relaxed font-sans">
              {category.description} Provided by <strong className="text-white">Dr. Gaurav Bhargava</strong> (Ex-Sr. Resident MAMC New Delhi) with consultations at Swaroop Nagar and ultra-clean surgical facilities at BMTC Kidwai Nagar, Kanpur.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link
                href="/appointment"
                className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <Calendar size={15} className="text-[#F5CD09]" />
                <span>Book Consultation for {category.name.split(" ")[0]}</span>
              </Link>
              <Link
                href={`/recovery-guide#${recoveryInfo.slug}`}
                className="btn-secondary py-3 px-5 text-xs sm:text-sm font-bold text-white bg-white/15 hover:bg-white/25 border-white/30 flex items-center gap-2"
              >
                <FileText size={15} />
                <span>{recoveryInfo.title}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: All Items in this Category in Card Format */}
      <div className="container mt-12 sm:mt-16">
        {/* AEO Clinical Specialty Summary Box for Search & AI Assistants */}
        <div className="bg-brand-50/60 rounded-3xl border border-brand-200/80 p-6 sm:p-8 mb-10 space-y-3 shadow-xs aeo-summary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059B8F] text-white flex items-center justify-center shrink-0">
              <CatIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#059B8F]">
                Clinical Specialty Summary &bull; AI Knowledge Snapshot
              </span>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                {category.name} in Kanpur at a Glance
              </h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans aeo-answer">
            Specialized <strong>{category.name}</strong> care at Joint Clinic is led by <strong>Dr. Gaurav Bhargava</strong> (Ex-Senior Resident MAMC New Delhi, 20+ years experience). Offering {category.items.length} specialized procedures ranging from {category.items.slice(0, 3).map((item) => item.name).join(", ")} to conservative treatments. Consultations are available at <strong>Joint Clinic Swaroop Nagar</strong> (Evening OPD 4–7 PM) and surgeries at <strong>BMTC Hospital Kidwai Nagar</strong> (Laminar Airflow Class-100 Modular OTs &amp; 24/7 emergency trauma).
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-1">
              Complete Procedure Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Treatments in {category.name}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Review symptoms, clinical approaches, and recovery expectations. Click any card to read in-depth details.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full w-fit">
            Showing all {category.items.length} procedures
          </span>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {category.items.map((item) => {
            // Find full treatment object for stats if available
            const fullTreatment = TREATMENTS.find((t) => t.slug === item.slug);

            return (
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

                  {/* Quick Stats Chips */}
                  {fullTreatment && (
                    <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration</span>
                        <span className="text-xs font-bold text-slate-800">{fullTreatment.stats.duration}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Stay</span>
                        <span className="text-xs font-bold text-slate-800">{fullTreatment.stats.hospitalStay}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Walking</span>
                        <span className="text-xs font-bold text-[#059B8F]">{fullTreatment.stats.walkingResumed}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Links */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/treatments/${item.slug}`}
                    className="text-xs sm:text-sm font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Individual Page</span>
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    href="/appointment"
                    className="px-3.5 py-2 rounded-full bg-[#059B8F] text-white hover:bg-[#0A7C97] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Consult Doctor</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recovery Guide Spotlight Card */}
        <div className="mt-14 bg-gradient-to-r from-teal-50/80 to-brand-50/80 rounded-3xl p-6 sm:p-10 border border-brand-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] mb-2 block">
              Step-by-Step Rehabilitation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
              {recoveryInfo.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Understand exact recovery milestones from Day 1 in the hospital to home exercises, safe movement tips, and return to independent living.
            </p>
          </div>
          <Link
            href={`/recovery-guide#${recoveryInfo.slug}`}
            className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 shadow-md"
          >
            Open Recovery Roadmap &rarr;
          </Link>
        </div>

        {/* BMTC Laminar OT Hospital Assurance */}
        <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-[#059B8F] shrink-0">
            <Hospital size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900">
              Surgical Excellence at Bhargava Medical &amp; Trauma Centre (BMTC)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All surgeries in this specialty are performed in Ultra-Clean Laminar Airflow Modular Operation Theatres at BMTC, Kidwai Nagar, Kanpur. This advanced environment ensures ultra-low infection rates, HEPA filtration, and round-the-clock intensive post-operative nursing care.
            </p>
          </div>
        </div>

        {/* Visible Category FAQ Section with Microdata for Search Engines & AEO */}
        <section 
          itemScope 
          itemType="https://schema.org/FAQPage"
          className="mt-14 bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-1">
              Direct Answers &bull; Clinical FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Frequently Asked Questions About {category.name}
            </h3>
          </div>

          <div className="space-y-4">
            <article 
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question" 
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-2xs space-y-2"
            >
              <h4 itemProp="name" className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#059B8F] shrink-0" />
                <span>What conditions are treated under {category.name} in Kanpur?</span>
              </h4>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 font-sans">
                  {category.description} At Joint Clinic, Dr. Gaurav Bhargava provides comprehensive diagnosis and surgical/non-surgical care for {category.items.map((i) => i.name).join(", ")}.
                </p>
              </div>
            </article>

            <article 
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question" 
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-2xs space-y-2"
            >
              <h4 itemProp="name" className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#059B8F] shrink-0" />
                <span>Who is the specialist for {category.name} in Kanpur?</span>
              </h4>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 font-sans">
                  Dr. Gaurav Bhargava (MBBS, MS Orthopaedics, Ex-Senior Resident Maulana Azad Medical College, New Delhi) with 20+ years of surgical experience is the chief specialist for {category.name} at Joint Clinic (Swaroop Nagar) and BMTC Hospital (Kidwai Nagar), Kanpur.
                </p>
              </div>
            </article>

            <article 
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question" 
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-2xs space-y-2"
            >
              <h4 itemProp="name" className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#059B8F] shrink-0" />
                <span>Where are {category.name} consultations and surgeries conducted?</span>
              </h4>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 font-sans">
                  Evening OPD consultations (4:00 PM – 7:00 PM) are held at Joint Clinic, Swaroop Nagar. Surgeries, digital X-rays, and 24/7 trauma emergency care are provided at Bhargava Medical &amp; Trauma Centre (BMTC), Kidwai Nagar, Kanpur.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Explore Other Specialties Switcher */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
              Browse Other Portals
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Explore Other Orthopedic Specialties
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherCategories.map((other) => {
              const OtherIcon = ICON_MAP[other.iconName] || Bone;
              return (
                <Link
                  key={other.id}
                  href={`/treatments/category/${other.id}`}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-brand-50/80 border border-slate-200/70 hover:border-brand-200 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#059B8F] group-hover:bg-[#059B8F] group-hover:text-white transition-colors mb-2 shadow-2xs">
                    <OtherIcon size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#059B8F] transition-colors leading-tight">
                    {other.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    {other.items.length} items
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
