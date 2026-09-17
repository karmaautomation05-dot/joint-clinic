'use client'

import React, { useState } from 'react'
import { Calendar, User, Phone, MessageSquare, Send, MapPin } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    clinic: 'Swaroop Nagar Joint Clinic (5:00 PM – 7:00 PM)',
    service: 'Knee Pain / Knee Replacement (TKR)',
    message: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const whatsappLink = `https://wa.me/917309038872?text=${encodeURIComponent(
    `Hello Dr. Gaurav Bhargava (Joint Clinic),\nI would like to book a consultation appointment:\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Preferred Date: ${formData.date}\n• Clinic Location: ${formData.clinic}\n• Concern / Procedure: ${formData.service}\n• Clinical Details: ${formData.message || 'Consultation request'}`
  )}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(whatsappLink, '_blank')
  }

  return (
    <section id="appointment-section" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {/* Left Hero/Info Column */}
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-14 bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white flex flex-col justify-between relative overflow-hidden">
            {/* Soft Ambient Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-semibold uppercase tracking-wider mb-6">
                <Calendar size={14} className="text-[#F5CD09]" />
                Priority OPD Scheduling
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Schedule Your <span className="text-[#F5CD09]">Joint Consultation</span>
              </h2>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-10">
                Take the first step towards active, pain-free mobility. Book an in-person consultation or request a second opinion on your MRI/X-Ray with Dr. Gaurav Bhargava.
              </p>
              
              <div className="space-y-5">
                <a
                  href="tel:+917309038872"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs hover:bg-white/15 transition-all group"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-[#F5CD09] shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-0.5">
                      Call Clinic Desk
                    </div>
                    <div className="text-xl font-bold font-mono text-white group-hover:text-[#F5CD09] transition-colors">+91 73090 38872</div>
                    <div className="text-xs text-white/80">BMTC Day OPD &amp; 24/7 Trauma Emergency</div>
                  </div>
                </a>
                
                <a
                  href="https://wa.me/917309038872?text=Hello%20Dr.%20Gaurav%20Bhargava,%20I%20would%20like%20to%20consult%20regarding%20joint%20pain."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs hover:bg-white/15 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/40 group-hover:scale-105 transition-transform">
                    <WhatsAppIcon className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                      WhatsApp Triage
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#25D366] text-white tracking-wide">Online</span>
                    </div>
                    <div className="text-lg font-bold text-white group-hover:text-[#F5CD09] transition-colors">Fast Appointment Confirmation</div>
                    <div className="text-xs text-white/80">Share your MRI or X-ray reports directly on WhatsApp</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative z-10 mt-10 pt-6 border-t border-white/20 text-xs text-white/80">
              <span>Evening OPD: Swaroop Nagar • Morning OPD: BMTC Kidwai Nagar</span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="full-name" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User size={15} className="text-brand-600" />
                    Patient Full Name
                  </label>
                  <input 
                    required
                    id="full-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Chandra" 
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone-number" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone size={15} className="text-brand-600" />
                    Mobile Number
                  </label>
                  <input 
                    required
                    id="phone-number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210" 
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="preferred-date" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar size={15} className="text-brand-600" />
                    Preferred Date
                  </label>
                  <input 
                    required
                    id="preferred-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="clinic-location" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin size={15} className="text-brand-600" />
                    Clinic Location
                  </label>
                  <select 
                    id="clinic-location"
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                  >
                    <option value="Swaroop Nagar Joint Clinic (5:00 PM – 7:00 PM)">
                      Swaroop Nagar Joint Clinic (5–7 PM)
                    </option>
                    <option value="BMTC Kidwai Nagar (Morning 10:00 AM – 2:00 PM)">
                      BMTC Kidwai Nagar (10 AM–2 PM)
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="service-type" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare size={15} className="text-brand-600" />
                  Primary Concern / Procedure
                </label>
                <select 
                  id="service-type"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                >
                  <option value="Knee Pain / Knee Replacement (TKR)">Knee Pain / Knee Replacement (TKR)</option>
                  <option value="Hip Pain / Hip Replacement (THR)">Hip Pain / Hip Replacement (THR)</option>
                  <option value="Sports Injury / ACL / Arthroscopy">Sports Injury / ACL / Arthroscopy</option>
                  <option value="Joint Preservation / PRP Injections">Joint Preservation / PRP Injections</option>
                  <option value="Spine / Slip Disc / Sciatica">Spine / Slip Disc / Sciatica</option>
                  <option value="Fracture / Emergency Trauma">Fracture / Emergency Trauma</option>
                  <option value="Second Opinion on MRI / X-Ray">Second Opinion on MRI / X-Ray</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="additional-notes" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare size={15} className="text-brand-600" />
                  Brief Symptoms or Previous Surgery Notes
                </label>
                <textarea 
                  id="additional-notes"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe joint pain duration, mobility limits, or recent injury..." 
                  rows={3}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 text-base font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/25 hover:shadow-2xl transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                <span>Confirm Appointment via WhatsApp</span>
              </button>
              
              <p className="text-center text-[11px] text-slate-400 mt-3">
                No advance payment needed for clinic booking. Our staff will confirm your OPD slot.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
