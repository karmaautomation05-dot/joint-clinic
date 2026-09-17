"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Building2,
  Stethoscope,
  Radio,
} from "lucide-react";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";

export default function OpdScheduleBar() {
  const [activeClinicId, setActiveClinicId] = useState("swaroop-nagar");
  const clinic =
    CLINIC_LOCATIONS.find((c) => c.id === activeClinicId) || CLINIC_LOCATIONS[0];

  return (
    <section className="py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-blue px-3 py-1 rounded-md bg-blue-50 border border-brand-blue/20 inline-block mb-3">
            KANPUR CONSULTATION CENTERS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Select Your Preferred Facility
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Choose between our evening outpatient clinic in Swaroop Nagar or morning OPD &amp;
            inpatient admissions at Bhargava Medical &amp; Trauma Centre (BMTC) in Kidwai Nagar.
          </p>
        </div>

        {/* High-Tech Segmented Switch */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {CLINIC_LOCATIONS.map((loc) => {
              const isSelected = loc.id === activeClinicId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveClinicId(loc.id)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isSelected
                      ? "bg-brand-navy text-white shadow-md ring-2 ring-brand-blue/30"
                      : "text-slate-600 hover:text-brand-navy hover:bg-slate-50"
                  }`}
                >
                  {loc.type === "clinic" ? (
                    <Stethoscope className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Building2 className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>{loc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Facility Dossier */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Telemetry & Access Info */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-blue px-2.5 py-1 rounded bg-blue-50 border border-brand-blue/20">
                  {clinic.timings.badge}
                </span>
                <h3 className="text-2xl font-black text-brand-navy mt-3">
                  {clinic.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {clinic.tagline}
                </p>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-brand-blue text-xs font-bold">
                    <Clock className="w-4 h-4" />
                    <span>TIMINGS</span>
                  </div>
                  <p className="text-sm font-bold text-brand-navy font-sans">
                    {clinic.timings.hours}
                  </p>
                  <p className="text-xs text-slate-500 font-sans">{clinic.timings.days}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-brand-blue text-xs font-bold">
                    <Phone className="w-4 h-4" />
                    <span>DIRECT DESK</span>
                  </div>
                  <a
                    href={`tel:${clinic.phone}`}
                    className="text-sm font-bold text-brand-navy hover:text-brand-blue block font-sans"
                  >
                    {clinic.phoneDisplay}
                  </a>
                  <p className="text-xs text-emerald-700 font-semibold font-sans">
                    WhatsApp Assist Enabled
                  </p>
                </div>
              </div>

              {/* Exact Location */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider font-mono text-brand-navy">
                    PHYSICAL ADDRESS
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    {clinic.address.full}
                  </p>
                </div>
              </div>

              {/* Technical Features */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider font-mono text-brand-navy">
                  CLINICAL CAPABILITIES AT THIS FACILITY:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {clinic.features.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-600 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/appointment"
                  className="px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-brand-blue hover:bg-brand-blueHover shadow transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book at {clinic.name}</span>
                </Link>

                <a
                  href={clinic.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-brand-navy bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-brand-blue" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Right: Embedded Interactive Map */}
            <div className="lg:col-span-5 relative min-h-[340px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
              <iframe
                src={clinic.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px] lg:min-h-full"
                title={`Google Map for ${clinic.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
