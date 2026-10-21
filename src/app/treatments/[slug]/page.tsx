import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
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
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { TREATMENTS, TREATMENT_CATEGORIES } from "@/data/treatments";
import { getRelatedBlogsForTreatment } from "@/data/blogs";
import { PRIMARY_CONTACT } from "@/data/clinics";
import dynamic from "next/dynamic";
import { getAnatomyType } from "@/utils/anatomy";

const JointAnatomy3D = dynamic(() => import("@/components/common/JointAnatomy3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] sm:h-[520px] rounded-3xl bg-white border border-slate-200 flex flex-col items-center justify-center gap-3 shadow-sm">
      <div className="w-12 h-12 rounded-full border-2 border-brand-500/20 border-t-brand-600 animate-spin" />
      <span className="text-xs text-slate-500 font-mono">Loading 3D Joint Reconstruction...</span>
    </div>
  ),
});

const ICON_MAP: Record<string, typeof Bone> = {
  Bone: Bone,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Award: Award,
  HeartPulse: HeartPulse,
  Stethoscope: Stethoscope,
  Sparkles: Sparkles,
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
    title: `${treatment.title} in Kanpur | Dr. Gaurav Bhargava | Joint Clinic`,
    description: `${treatment.shortDesc} Expert orthopedic care by Dr. Gaurav Bhargava (MAMC New Delhi) at Joint Clinic Swaroop Nagar & BMTC Kidwai Nagar Kanpur.`,
    keywords: [
      treatment.title,
      `${treatment.title} in Kanpur`,
      `Best doctor for ${treatment.title} Kanpur`,
      `${treatment.title} Dr Gaurav Bhargava`,
      `${treatment.title} recovery`,
      "Joint Clinic Kanpur",
      "BMTC Kidwai Nagar",
      "Orthopedic Surgeon Kanpur",
    ],
    alternates: {
      canonical: `https://jointclinic.in/treatments/${params.slug}`,
    },
    openGraph: {
      title: `${treatment.title} in Kanpur | Dr. Gaurav Bhargava`,
      description: treatment.shortDesc,
      url: `https://jointclinic.in/treatments/${params.slug}`,
      siteName: "Joint Clinic Kanpur",
      images: [
        {
          url: "/images/doctor/gaurav-bhargava.png",
          width: 800,
          height: 800,
          alt: `${treatment.title} - Dr. Gaurav Bhargava`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${treatment.title} | Dr. Gaurav Bhargava Kanpur`,
      description: treatment.shortDesc,
      images: ["/images/doctor/gaurav-bhargava.png"],
    },
  };
}

export default function TreatmentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  if (TREATMENT_CATEGORIES.some((c) => c.id === params.slug)) {
    redirect(`/treatments/category/${params.slug}`);
  }

  const treatment = getTreatmentBySlug(params.slug);

  if (!treatment) {
    notFound();
  }

  const IconComponent = ICON_MAP[treatment.iconName] || Bone;
  const relatedBlogs = getRelatedBlogsForTreatment(treatment.slug, treatment.category);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        "@id": `https://jointclinic.in/treatments/${treatment.slug}#procedure`,
        name: treatment.title,
        description: treatment.shortDesc,
        procedureType: "SurgicalProcedure",
        performer: {
          "@id": "https://jointclinic.in/#physician",
        },
        location: [
          { "@id": "https://jointclinic.in/#swaroop-nagar" },
          { "@id": "https://jointclinic.in/#kidwai-nagar" },
        ],
      },
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
            name: treatment.title,
            item: `https://jointclinic.in/treatments/${treatment.slug}`,
          },
        ],
      },
    ],
  };

  if (treatment.faqs && treatment.faqs.length > 0) {
    (schema["@graph"] as any[]).push({
      "@type": "FAQPage",
      "@id": `https://jointclinic.in/treatments/${treatment.slug}#faq`,
      mainEntity: treatment.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    });
  }

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
          <div className="max-w-3xl space-y-4">
            {/* Semantic Breadcrumbs for UX & SEO */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/80 font-sans">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <span>/</span>
              <span className="text-[#F5CD09] font-medium">{treatment.title}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xs text-[#F5CD09] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>{treatment.category}</span>
              <span>&bull;</span>
              <span>{treatment.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              {treatment.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-sans">
              {treatment.shortDesc}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-white/20 text-xs">
              <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl backdrop-blur-xs">
                <span className="text-white/70 block mb-0.5 text-[11px]">Surgical Duration:</span>
                <strong className="text-white font-bold text-xs sm:text-sm">{treatment.stats.duration}</strong>
              </div>
              <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl backdrop-blur-xs">
                <span className="text-white/70 block mb-0.5 text-[11px]">Hospital Stay:</span>
                <strong className="text-white font-bold text-xs sm:text-sm">{treatment.stats.hospitalStay}</strong>
              </div>
              <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl backdrop-blur-xs">
                <span className="text-white/70 block mb-0.5 text-[11px]">Walking Resumed:</span>
                <strong className="text-[#F5CD09] font-bold text-xs sm:text-sm">{treatment.stats.walkingResumed}</strong>
              </div>
              <div className="bg-white/10 p-2.5 sm:p-3 rounded-xl backdrop-blur-xs">
                <span className="text-white/70 block mb-0.5 text-[11px]">Target Longevity:</span>
                <strong className="text-[#F5CD09] font-bold text-xs sm:text-sm">{treatment.stats.longevity}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Bone & Joint Reconstruction Specific to Treatment (Full-Width Featured Showcase) */}
      <section className="container -mt-8 sm:-mt-10 relative z-20">
        <JointAnatomy3D
          type={getAnatomyType(treatment.slug)}
          title={`${treatment.title} • 3D Surgical Model`}
          subtitle={`Interactive 3D visualization for ${treatment.title}. Rotate 360° to inspect bone landmarks, surgical reconstruction, and internal alignment.`}
        />
      </section>

      {/* Main Content Layout */}
      <div className="container mt-8 sm:mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Article & Procedures */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* AEO Quick Fact / Answer Box (100% Solid Opaque Pure White Card) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-3 shadow-xl aeo-summary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#059B8F] text-white flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#059B8F]">
                    Fast Facts &amp; Clinical Summary
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                    {treatment.title} at a Glance
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans aeo-answer">
                <strong>{treatment.title}</strong> is performed by <strong>Dr. Gaurav Bhargava</strong> (Ex-SR Maulana Azad Medical College, New Delhi) at Joint Clinic Swaroop Nagar and BMTC Hospital Kidwai Nagar Kanpur. This treatment is recommended for patients experiencing {treatment.indications.slice(0, 2).map((i) => i.toLowerCase()).join(" or ")}. Typical surgical duration is {treatment.stats.duration}, hospital stay is {treatment.stats.hospitalStay}, and walking is resumed {treatment.stats.walkingResumed}.
              </p>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 md:p-10 shadow-sm space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Clinical Overview</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {treatment.overview}
              </p>
            </div>

            {/* Who is a Candidate / Indications */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 md:p-10 shadow-sm space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                When is this Procedure Recommended?
              </h2>
              <div className="space-y-3">
                {treatment.indications.map((ind, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-brand-50 border border-brand-200 text-xs sm:text-sm text-slate-800 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specific Techniques */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 md:p-10 shadow-sm space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Surgical Approaches &amp; Modern Technology
              </h2>
              <div className="space-y-3.5 sm:space-y-4">
                {treatment.techniques.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900">{tech.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recovery Milestones */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 md:p-10 shadow-sm space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Expected Recovery Timeline
              </h2>
              <div className="space-y-3.5 sm:space-y-4">
                {treatment.recoveryMilestones.map((rec, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <div className="sm:w-28 text-xs font-bold uppercase tracking-wider text-brand-700 shrink-0 sm:pt-2 font-mono">
                      {rec.timeline}
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-50 border border-brand-200 flex-1 text-xs sm:text-sm text-slate-800">
                      {rec.milestone}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure FAQs with Schema Microdata */}
            {treatment.faqs.length > 0 && (
              <section 
                itemScope 
                itemType="https://schema.org/FAQPage"
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 md:p-10 shadow-sm space-y-5 sm:space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block">
                    Direct Answers &bull; Procedure FAQ
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Frequently Asked Questions About {treatment.title}
                  </h2>
                </div>
                <div className="space-y-3.5 sm:space-y-4">
                  {treatment.faqs.map((faq, idx) => (
                    <article
                      key={idx}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                      className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <h3 itemProp="name" className="text-sm sm:text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{faq.q}</span>
                      </h3>
                      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <p itemProp="text" className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 font-sans">
                          {faq.a}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Related Clinical Blog & Recovery Articles */}
            {relatedBlogs.length > 0 && (
              <section className="bg-gradient-to-br from-teal-50/70 to-brand-50/70 rounded-2xl sm:rounded-3xl border border-brand-200/80 p-5 sm:p-8 md:p-10 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-200/60">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-1">
                      Patient Education &bull; Clinical Insights
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Related Health &amp; Recovery Articles
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="text-xs font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center gap-1 shrink-0"
                  >
                    <span>View All Health Blogs</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedBlogs.map((b) => (
                    <article
                      key={b.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#059B8F]">
                          <span className="px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-100">{b.category}</span>
                          <span>&bull;</span>
                          <span>{b.readTime}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                          {b.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {b.excerpt}
                        </p>
                      </div>
                      <Link
                        href={`/blog/${b.slug}`}
                        className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-[#059B8F] hover:text-[#0A7C97] flex items-center justify-between group/link"
                      >
                        <span>Read Doctor's Clinical Guide</span>
                        <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar CTA & Doctor Quick Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xl space-y-5 sticky top-28">
              <div className="space-y-2 text-center pb-4 sm:pb-5 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 inline-block">
                  Specialist Consultation
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 mt-1">
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
                <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200 space-y-1">
                  <p className="font-semibold text-slate-900">Joint Clinic (Swaroop Nagar)</p>
                  <p className="text-slate-600 text-[11px]">05:00 PM – 07:00 PM (Mon–Sat)</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-semibold text-slate-900">BMTC (Kidwai Nagar)</p>
                  <p className="text-slate-600 text-[11px]">10:00 AM – 02:00 PM (OPD &amp; Modular OTs)</p>
                </div>
              </div>

              {/* Related Blog Links in Sidebar */}
              {relatedBlogs.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#059B8F]" />
                      <span>Related Health Blog</span>
                    </span>
                    <span className="text-[10px] font-semibold text-[#059B8F] uppercase">Educational</span>
                  </div>
                  {relatedBlogs.slice(0, 2).map((rb) => (
                    <Link
                      key={rb.id}
                      href={`/blog/${rb.slug}`}
                      className="block p-3 rounded-2xl bg-brand-50/70 hover:bg-brand-50 border border-brand-200/80 hover:border-brand-300 transition-all group"
                    >
                      <p className="font-serif font-bold text-slate-900 text-xs group-hover:text-brand-700 line-clamp-2 mb-1">
                        {rb.title}
                      </p>
                      <span className="text-[10px] font-bold text-[#059B8F] flex items-center gap-1">
                        <span>Read Clinical Article</span>
                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
