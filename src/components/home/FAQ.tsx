'use client'

import React, { useState } from 'react'
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'How soon can I walk after Knee Replacement surgery?',
    a: 'With Dr. Gaurav Bhargava’s tissue-sparing subvastus approach and multimodal pain management, over 95% of our patients stand and take supported steps within 24 hours of surgery. Full unassisted daily walking is usually achieved within 2 to 3 weeks.'
  },
  {
    q: 'How long do modern knee and hip implants last?',
    a: 'Contemporary high-flexion, highly cross-linked polyethylene, ceramic, and titanium implants routinely deliver 25 to 30+ years of durable function when positioned with sub-millimeter precision and proper soft-tissue balancing.'
  },
  {
    q: 'What is the difference between the Swaroop Nagar and BMTC clinics?',
    a: 'Joint Clinic in Swaroop Nagar is our specialized evening consultation center (4:00 PM – 7:00 PM, Mon–Sat) for OPD reviews and second opinions. Bhargava Medical & Trauma Centre (BMTC) in Kidwai Nagar houses our morning OPD (10:00 AM – 2:00 PM), Class-100 Modular Operation Theaters, inpatient rooms, and 24/7 trauma emergency care.'
  },
  {
    q: 'Can joint arthritis be managed without surgery?',
    a: 'Yes. For Grade 1 and 2 early osteoarthritis, Dr. Bhargava prioritizes biological joint preservation, including autologous PRP injections, hyaluronic acid viscosupplementation, targeted muscle strengthening, and lifestyle modifications. Surgery is advised only for advanced end-stage bone-on-bone arthritis.'
  },
  {
    q: 'What is keyhole Arthroscopy and how fast is recovery?',
    a: 'Arthroscopy is a minimally invasive camera-guided keyhole surgery performed through 4 mm incisions to repair ACL/PCL tears, meniscus injuries, and rotator cuff damage. Patients typically go home the next day and resume desk work within 5 to 7 days.'
  },
  {
    q: 'Is joint replacement safe for patients over 70 with diabetes or blood pressure?',
    a: 'Yes. With thorough pre-operative medical screening, physician clearance, and specialized regional nerve blocks, joint replacement is safely performed in patients well into their 70s and 80s, liberating them from chronic crippling pain.'
  }
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="section-padding bg-white" id="faq">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 shadow-sm">
                <HelpCircle size={32} />
              </div>
              <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                Help &amp; Answers
              </span>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-base">
                Find clear medical guidance regarding joint replacement longevity, keyhole sports surgery, and clinic schedules. Have a question about your MRI?
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-brand-600 font-bold border-b-2 border-brand-200 hover:border-brand-600 pb-1 transition-all"
              >
                <span>Contact Clinic Support</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqs.map((f, idx) => {
                const isOpen = openIdx === idx
                return (
                  <div 
                    key={idx} 
                    className={`border rounded-[1.5rem] transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-brand-200 bg-brand-50/25 shadow-sm' : 'border-slate-100 bg-white hover:border-brand-100'
                    }`}
                  >
                    <button 
                      className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      id={`faq-question-${idx}`}
                    >
                      <span className={`text-base sm:text-lg font-serif font-bold transition-colors ${
                        isOpen ? 'text-brand-800' : 'text-slate-900'
                      }`}>
                        {f.q}
                      </span>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    
                    <div 
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-6 sm:p-7 pt-0 text-slate-600 leading-relaxed text-sm sm:text-base border-t border-brand-100/30">
                        {f.a}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
