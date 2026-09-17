'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, Phone, Clock } from 'lucide-react'

export default function GoogleMaps() {
  const [isIntersecting, setIntersecting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const locations = [
    {
      title: 'Joint Clinic (Evening Consultation)',
      tagline: 'Centre of Arthroplasty & Arthroscopy',
      address: '7/198-A, Anand Bazar, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002',
      mapEmbed: "https://maps.google.com/maps?q=Joint%20Clinic,%207/198-A,%20Anand%20Bazar,%20Khalasi%20Line,%20Swaroop%20Nagar,%20Kanpur,%20Uttar%20Pradesh%20208002&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.google.com/?q=26.4803575,80.3108834",
      hours: '05:00 PM – 07:00 PM',
      days: 'Monday – Saturday',
      phone: '+91 73090 38872'
    },
    {
      title: 'Bhargava Medical & Trauma Centre (BMTC)',
      tagline: 'Modular OTs, Inpatient Care & 24/7 Trauma Emergency',
      address: '30-E, O Block, Kidwai Nagar, Kanpur, Uttar Pradesh 208023',
      mapEmbed: "https://maps.google.com/maps?q=Bhargava%20Medical%20and%20Trauma%20Centre,%2030E,%20O%20Block,%20Kidwai%20Nagar,%20Kanpur,%20Uttar%20Pradesh%20208023&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Bhargava+Medical+and+Trauma+Centre+30E+O+Block+Kidwai+Nagar+Kanpur",
      hours: '10:00 AM – 02:00 PM (OPD) | 24/7 Emergency',
      days: 'Everyday',
      phone: '+91 73090 38872'
    }
  ]

  return (
    <section className="bg-white section-padding" ref={sectionRef} id="locations">
      <div className="container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">
            Clinic Schedules &amp; GPS
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Dual Clinic Locations in Kanpur
          </h2>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            Dr. Gaurav Bhargava provides dedicated consultations across two accessible locations in Kanpur. Please verify the operating hours before your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {locations.map((loc, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Map at Top */}
              <div className="w-full h-[300px] bg-slate-100 relative group overflow-hidden">
                {isIntersecting ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={loc.mapEmbed}
                    title={`${loc.title} Location`}
                    className="absolute inset-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-brand-50/30">
                    <MapPin size={48} className="mb-4 text-brand-400 animate-pulse" />
                    <p className="font-serif italic text-lg text-brand-700/70">Loading interactive map...</p>
                  </div>
                )}
              </div>

              {/* Information below Map */}
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 mb-1 block">
                    {loc.tagline}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight">
                    {loc.title}
                  </h3>
                </div>
                
                <div className="space-y-6 mb-8 flex-grow">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center shrink-0 text-brand-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                        Clinic Address
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{loc.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center shrink-0 text-brand-600">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                        Consultation Timings
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {loc.days}: <span className="font-bold text-brand-700">{loc.hours}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  <a 
                    href={`tel:${loc.phone.replace(/\s/g, '')}`}
                    className="btn-primary flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"
                  >
                    <Phone size={16} />
                    <span>Call Clinic Desk</span>
                  </a>
                  <a 
                    href={loc.mapLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"
                  >
                    <Navigation size={16} />
                    <span>Get GPS Route</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
