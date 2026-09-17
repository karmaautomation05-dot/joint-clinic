import React from 'react'
import { Sparkles, Clock, UserCheck, Microscope } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Sparkles,
      title: 'Rapid 24-Hr Mobilization',
      description: 'Our tissue-sparing surgical approach minimizes muscle trauma, allowing knee and hip replacement patients to stand and walk safely within 24 hours.'
    },
    {
      icon: UserCheck,
      title: 'Delhi-Trained Surgeon',
      description: 'Senior residency at Maulana Azad Medical College (MAMC) & Lok Nayak Hospital New Delhi brings tier-1 capital surgical standards directly to Kanpur.'
    },
    {
      icon: Clock,
      title: 'Dual Clinic Network',
      description: 'Dedicated evening consultations in Swaroop Nagar (5–7 PM) and morning OPD + 24/7 emergency trauma care at BMTC Kidwai Nagar.'
    },
    {
      icon: Microscope,
      title: 'Modular OT & US-FDA Implants',
      description: 'Surgeries performed in Class-100 HEPA-filtered laminar airflow theaters using gold-standard ceramic, titanium, and high-flexion implants.'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">
            The Joint Clinic Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Why Choose Joint Clinic?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            At Joint Clinic, we combine sub-millimeter surgical precision with dedicated personal care to restore your pain-free mobility for life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="bg-brand-50/20 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:bg-white hover:border-brand-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-8 text-brand-600">
                  <reason.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
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
