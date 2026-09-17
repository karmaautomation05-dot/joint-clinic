import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Phone,
  ArrowRight,
  Heart,
  Stethoscope,
  Activity,
  Bone,
} from "lucide-react";
import { DOCTOR_DATA } from "@/data/doctor";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";

export const metadata: Metadata = {
  title: "About Dr. Gaurav Bhargava | Joint Clinic Kanpur",
  description:
    "Learn about Dr. Gaurav Bhargava (MBBS, MS Orthopaedics), former Senior Resident at Maulana Azad Medical College (MAMC), New Delhi, with 20+ years of joint replacement excellence in Kanpur.",
  alternates: {
    canonical: "https://jointclinic.in/about",
  },
  openGraph: {
    title: "About Dr. Gaurav Bhargava | Joint Clinic Kanpur",
    description:
      "MBBS, MS (Orthopaedics), Ex-Senior Resident MAMC New Delhi. Over 20 years of joint replacement and arthroscopy expertise in Kanpur.",
    url: "https://jointclinic.in/about",
    images: [
      {
        url: "/images/doctor/gaurav-bhargava.png",
        width: 800,
        height: 800,
        alt: "Dr. Gaurav Bhargava — Joint Clinic Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dr. Gaurav Bhargava | Joint Clinic Kanpur",
    description: "20+ years experience in joint replacements, arthroscopy, and joint preservation.",
    images: ["/images/doctor/gaurav-bhargava.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Meet Your Orthopedic Surgeon
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Dr. Gaurav Bhargava
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Senior Consultant Joint Replacement &amp; Arthroscopy Surgeon
              <br />
              <span className="text-[#F5CD09] font-semibold text-base">
                Director &amp; Chief Surgeon — Joint Clinic &amp; BMTC Orthopaedics, Kanpur
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Profile & Credentials Section */}
      <div className="container -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Doctor Card & Fast Facts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#b0a59e]">
                <Image
                  src={DOCTOR_DATA.image}
                  alt={DOCTOR_DATA.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-serif font-bold text-slate-900">Core Qualifications</h3>
                <div className="space-y-2">
                  {DOCTOR_DATA.qualifications.map((q, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold p-3 rounded-2xl bg-brand-50/50 border border-brand-100/60"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memberships */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Professional Memberships
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {DOCTOR_DATA.memberships.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <Link
                href="/appointment"
                className="w-full btn-primary py-3.5 text-center text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>

          {/* Right Column: In-Depth Clinical Background */}
          <div className="lg:col-span-8 space-y-8 pt-4 lg:pt-0">
            {/* Story & Background */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
              <div>
                <span className="text-brand-600 font-bold uppercase tracking-widest text-xs mb-2 block">
                  Clinical Pedigree &amp; Surgical Philosophy
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  Bringing Delhi-Standard Surgical Care to Kanpur
                </h2>
              </div>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed font-sans">
                <p>
                  With more than two decades of surgical leadership,{" "}
                  <strong className="text-slate-900">Dr. Gaurav Bhargava</strong> is one of Kanpur&apos;s
                  most trusted authorities in Joint Replacement (Arthroplasty), Keyhole Sports
                  Medicine (Arthroscopy), and Complex Trauma Surgery.
                </p>
                <p>
                  Having completed his post-graduate residency at S.N. Medical College, Agra, followed by senior residency at <strong className="text-slate-900">Maulana Azad Medical College (MAMC) and Lok Nayak Hospital, New Delhi</strong>,
                  he was exposed to an intensive volume of complex joint reconstructions and salvage procedures. This capital medical foundation inspired his commitment: providing patients in Kanpur and central Uttar Pradesh with the same world-class implant technology, sub-millimeter surgical accuracy, and rapid recovery protocols available in premier metropolitan healthcare institutions.
                </p>
                <p>
                  His clinical practice is guided by an unwavering ethical compass:{" "}
                  <em className="text-slate-800 font-medium">conservative biological treatment whenever possible, and surgical precision when truly necessary</em>.
                  Patients frequently seek his candid second opinions before deciding on knee or hip replacement surgeries.
                </p>
              </div>

              {/* Quote */}
              <div className="p-6 sm:p-8 rounded-2xl bg-brand-50/50 border-l-4 border-brand-600 border border-brand-100/60">
                <p className="text-base font-serif italic text-slate-800 leading-relaxed">
                  &ldquo;{DOCTOR_DATA.philosophy.quote}&rdquo;
                </p>
                <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mt-3">
                  — Dr. Gaurav Bhargava
                </p>
              </div>
            </div>

            {/* Academic & Training Journey */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Education &amp; Advanced Training
              </h3>

              <div className="space-y-6">
                {/* MAMC Item */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-brand-50/30 border border-brand-100">
                  <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                      Tertiary Surgical Residency
                    </span>
                    <h4 className="text-lg font-serif font-bold text-slate-900 mt-1">
                      {DOCTOR_DATA.residency.institution}
                    </h4>
                    <p className="text-xs text-brand-700 font-semibold">
                      {DOCTOR_DATA.residency.role} &bull; {DOCTOR_DATA.residency.location}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {DOCTOR_DATA.residency.significance}
                    </p>
                  </div>
                </div>

                {/* Other Degrees */}
                {DOCTOR_DATA.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-serif font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-xs text-brand-700 font-semibold">{edu.institution}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{edu.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliated Facilities Overview */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Clinical Centers &amp; Surgical Infrastructure
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CLINIC_LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-6 rounded-2xl bg-brand-50/20 border border-brand-100 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 px-2.5 py-0.5 rounded-full bg-white border border-brand-200 inline-block">
                        {loc.timings.badge}
                      </span>
                      <h4 className="text-lg font-serif font-bold text-slate-900 mt-2">{loc.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {loc.address.full}
                      </p>
                      <p className="text-xs font-semibold text-brand-700 mt-2">
                        Timings: {loc.timings.hours}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-brand-100">
                      <Link
                        href="/contact"
                        className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                      >
                        <span>View Directions &amp; Maps</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
