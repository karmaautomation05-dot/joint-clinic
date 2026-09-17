"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";

export default function AppointmentPage() {
  const [clinicId, setClinicId] = useState("swaroop-nagar");
  const [consultType, setConsultType] = useState("first-visit");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [jointConcern, setJointConcern] = useState("Knee Pain");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedClinic =
    CLINIC_LOCATIONS.find((c) => c.id === clinicId) || CLINIC_LOCATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const createWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Dr. Gaurav Bhargava / Joint Clinic,\n\nI would like to book an appointment:\n- Name: ${fullName || "Patient"}\n- Phone: ${phone || "Not specified"}\n- Clinic: ${selectedClinic.name}\n- Consultation Type: ${consultType}\n- Joint/Concern: ${jointConcern}\n- Preferred Date: ${preferredDate || "Earliest available"}\n- Note: ${notes || "None"}`
    );
    return `https://wa.me/${PRIMARY_CONTACT.whatsapp}?text=${text}`;
  };

  return (
    <div className="bg-white pb-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Book Your Visit
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Schedule a Consultation
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Consult Dr. Gaurav Bhargava for in-person assessment, surgical planning, or an unbiased
              second opinion on your MRI/X-ray scans in Kanpur.
            </p>
          </div>
        </div>
      </section>

      <div className="container -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Booking Form */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900">
                  Appointment Request Received!
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Our clinic desk will call you shortly at <strong className="text-slate-900">{phone}</strong> to confirm your slot at {selectedClinic.name}.
                </p>

                <div className="pt-4">
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 py-3.5 px-6 text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white border-none shadow-lg shadow-[#25D366]/30"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                    <span>Confirm Instantly on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Select Clinic */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                    1. Choose Preferred Clinic Location:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CLINIC_LOCATIONS.map((c) => {
                      const isSelected = c.id === clinicId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setClinicId(c.id)}
                          className={`p-5 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-brand-600 bg-brand-50/50 shadow-sm ring-2 ring-brand-600/20"
                              : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-brand-200"
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 block">
                            {c.timings.badge}
                          </span>
                          <p className="font-serif font-bold text-base text-slate-900 mt-1">{c.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{c.timings.hours}</p>
                          <p className="text-[11px] text-slate-600 mt-1 truncate">
                            {c.address.area}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Consultation Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                    2. Select Consultation Type:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "first-visit", label: "First Time Visit" },
                      { id: "second-opinion", label: "Second Opinion on MRI" },
                      { id: "follow-up", label: "Follow-Up Visit" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setConsultType(type.id)}
                        className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-center ${
                          consultType === type.id
                            ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white hover:border-brand-200"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Patient Details */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                    3. Patient Contact &amp; Clinical Information:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Joint or Area of Concern
                      </label>
                      <select
                        value={jointConcern}
                        onChange={(e) => setJointConcern(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                      >
                        <option>Knee Pain / Osteoarthritis</option>
                        <option>Hip Pain / AVN</option>
                        <option>Sports Injury / ACL or Meniscus</option>
                        <option>Shoulder Pain / Rotator Cuff</option>
                        <option>Spine / Sciatica / Back Pain</option>
                        <option>Fracture / Emergency Trauma</option>
                        <option>Other Orthopaedic Condition</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">
                      Brief Description of Symptoms or Existing Reports
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Severe knee pain for 2 years, had X-ray done last week showing joint space narrowing."
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {consultType === "second-opinion" && (
                    <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-200 text-xs text-slate-800 space-y-1">
                      <p className="font-bold flex items-center gap-1.5 text-brand-700">
                        <FileCheck className="w-4 h-4" />
                        <span>Second Opinion MRI / X-Ray Review</span>
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Please carry your physical films or digital DICOM CD to your visit, or share photos of your MRI report directly via WhatsApp after submitting.
                      </p>
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto btn-primary py-4 px-8 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Appointment Request</span>
                  </button>

                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto btn-secondary py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-[#25D366] shrink-0" />
                    <span>Book via WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Schedule & Guidance */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                OPD Schedule at a Glance
              </h3>

              {CLINIC_LOCATIONS.map((loc) => (
                <div key={loc.id} className="p-4 rounded-2xl bg-brand-50/30 border border-brand-100 space-y-1 text-xs">
                  <p className="font-serif font-bold text-slate-900">{loc.name}</p>
                  <p className="text-slate-500 text-[11px]">{loc.address.full}</p>
                  <p className="text-brand-700 font-semibold pt-1">
                    {loc.timings.hours} ({loc.timings.days})
                  </p>
                </div>
              ))}

              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-900 mb-1">What to Bring:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>&bull; All previous X-rays, MRIs, and CT scans</li>
                  <li>&bull; Recent blood investigation reports</li>
                  <li>&bull; Prescription list of ongoing medications</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-900">Helpline:</p>
                <a
                  href={`tel:${PRIMARY_CONTACT.phone}`}
                  className="font-bold text-brand-700 font-mono text-sm block"
                >
                  {PRIMARY_CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
