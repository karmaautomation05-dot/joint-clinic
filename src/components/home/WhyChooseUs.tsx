import React from 'react'
import { Sparkles, Clock, UserCheck, Microscope } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Sparkles,
      title: 'Rapid 24-Hr Mobilization',
      badge: 'Fast Track',
      description: 'Our tissue-sparing surgical approach minimizes muscle trauma, allowing knee and hip replacement patients to stand and walk safely within 24 hours.'
    },
    {
      icon: UserCheck,
      title: 'Delhi-Trained Surgeon',
      badge: 'Ex-MAMC',
      description: 'Senior residency at Maulana Azad Medical College (MAMC) & Lok Nayak Hospital New Delhi brings tier-1 capital surgical standards directly to Kanpur.'
    },
    {
      icon: Clock,
      title: 'Dual Clinic Network',
      badge: 'Accessible',
      description: 'Dedicated evening consultations in Swaroop Nagar (4–7 PM) and morning OPD + 24/7 emergency trauma care at BMTC Kidwai Nagar.'
    },
    {
      icon: Microscope,
      title: 'Modular OT & US-FDA Implants',
      badge: 'Zero Infection',
      description: 'Surgeries performed in Class-100 HEPA-filtered laminar airflow theaters using gold-standard ceramic, titanium, and high-flexion implants.'
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">
            The Joint Clinic Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Why Choose Joint Clinic?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            At Joint Clinic, we combine sub-millimeter surgical precision with dedicated personal care to restore your pain-free mobility for life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-50 to-brand-100/70 rounded-2xl flex items-center justify-center text-brand-600 shadow-2xs group-hover:scale-105 transition-transform">
                    <reason.icon size={26} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                    {reason.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 mb-2 sm:mb-3 leading-snug group-hover:text-brand-700 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
