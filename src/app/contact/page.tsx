import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Building2,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";

export const metadata: Metadata = {
  title: "Contact & Clinic Locations | Joint Clinic Kanpur",
  description:
    "Visiting hours, phone numbers, and interactive Google Maps for Joint Clinic in Swaroop Nagar and Bhargava Medical & Trauma Centre (BMTC) in Kidwai Nagar, Kanpur.",
  alternates: {
    canonical: "https://jointclinic.in/contact",
  },
  openGraph: {
    title: "Clinic Locations & Directions | Joint Clinic Kanpur",
    description:
      "Find Dr. Gaurav Bhargava at Joint Clinic (Swaroop Nagar, 4–7 PM) and BMTC (Kidwai Nagar, 10 AM–2 PM & 24/7 Trauma Emergency). Call +91 73090 38872.",
    url: "https://jointclinic.in/contact",
    images: [
      {
        url: "/images/doctor/gaurav-bhargava.png",
        width: 800,
        height: 800,
        alt: "Joint Clinic Locations Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joint Clinic Locations & Contact | Kanpur",
    description: "Swaroop Nagar & BMTC Kidwai Nagar contact details and OPD timings.",
    images: ["/images/doctor/gaurav-bhargava.png"],
  },
};

export default function ContactPage() {
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
            name: "Contact",
            item: "https://jointclinic.in/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": "https://jointclinic.in/contact#webpage",
        name: "Contact Joint Clinic Kanpur — Swaroop Nagar & BMTC Kidwai Nagar",
        description:
          "Clinic timings, addresses, phone numbers, and directions for Joint Clinic Swaroop Nagar and BMTC Kidwai Nagar in Kanpur.",
      },
    ],
  };

  return (
    <div className="bg-white pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Semantic Breadcrumbs for UX & SEO */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/80 font-sans mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#F5CD09] font-medium">Contact</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Locations &amp; Contact Details
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Get in Touch with Joint Clinic
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              We operate across two dedicated facilities in Kanpur for outpatient specialist
              consultations, advanced joint surgeries, and 24/7 trauma emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Locations Cards with Maps */}
      <div className="container -mt-10 relative z-20 space-y-12">
        {CLINIC_LOCATIONS.map((clinic, idx) => (
          <div
            key={clinic.id}
            className="bg-white rounded-[2.5rem] border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Info Column */}
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 inline-block">
                    {clinic.timings.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-3">
                    {clinic.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {clinic.tagline}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-50/30 border border-brand-100">
                    <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs uppercase tracking-wider mb-0.5">
                        Clinic Address
                      </strong>
                      <span className="text-slate-600 leading-relaxed">{clinic.address.full}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-50/30 border border-brand-100">
                    <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs uppercase tracking-wider mb-0.5">
                        Consultation Timings
                      </strong>
                      <span className="text-slate-900 font-bold">{clinic.timings.hours}</span>
                      <span className="text-slate-500 block text-xs mt-0.5">{clinic.timings.days}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-50/30 border border-brand-100">
                    <Phone className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs uppercase tracking-wider mb-0.5">
                        Clinic Phone
                      </strong>
                      <a
                        href={`tel:${clinic.phone}`}
                        className="text-slate-900 font-bold hover:text-brand-600 font-mono"
                      >
                        {clinic.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={clinic.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-3.5 px-6 text-xs font-semibold flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Get GPS Directions</span>
                  </a>

                  <a
                    href={`https://wa.me/${PRIMARY_CONTACT.whatsapp}?text=Hello%20Joint%20Clinic,%20I%20would%20like%20directions%20or%20timings%20for%20${encodeURIComponent(clinic.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-3.5 px-6 text-xs font-semibold flex items-center gap-2 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Map Column */}
              <div className="lg:col-span-6 relative min-h-[360px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-100">
                <iframe
                  src={clinic.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px] lg:min-h-full"
                  title={`Map of ${clinic.name}`}
                />
              </div>
            </div>
          </div>
        ))}

        {/* 24/7 Emergency Trauma Callout */}
        <div className="bg-gradient-to-r from-red-950 via-brand-950 to-slate-950 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-red-900/30">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center gap-2 text-red-300 text-xs font-bold uppercase tracking-wider justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4" />
              <span>24/7 Emergency Polytrauma &amp; Fractures</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">Accident or Acute Fracture Emergency?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Bhargava Medical &amp; Trauma Centre (BMTC), Kidwai Nagar operates round-the-clock emergency casualty, digital X-rays, modular OTs, and ICU resuscitation.
            </p>
          </div>

          <a
            href={`tel:${PRIMARY_CONTACT.emergencyPhone}`}
            className="btn-primary bg-red-600 hover:bg-red-700 py-3.5 px-7 text-xs font-bold shrink-0 flex items-center gap-2 shadow-lg shadow-red-600/30"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Emergency: {PRIMARY_CONTACT.emergencyPhoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
