import React from 'react'
import { Award, Activity, HeartPulse, Star } from 'lucide-react'

export default function Statistics() {
  const stats = [
    {
      icon: Award,
      label: 'Surgical Experience',
      value: '20+',
      unit: 'Years',
      detail: 'Ex-SR MAMC New Delhi',
      color: 'text-[#059B8F]',
      bg: 'bg-brand-50',
    },
    {
      icon: Activity,
      label: 'Successful Operations',
      value: '5,000+',
      unit: 'Procedures',
      detail: 'Knee, Hip & Arthroscopy',
      color: 'text-[#0A7C97]',
      bg: 'bg-teal-50',
    },
    {
      icon: HeartPulse,
      label: 'Walking Mobilization',
      value: '24-Hr',
      unit: 'Protocol',
      detail: 'Tissue-Sparing Technique',
      color: 'text-[#02BAB9]',
      bg: 'bg-cyan-50',
    },
    {
      icon: Star,
      label: 'Patient Satisfaction',
      value: '5.0★',
      unit: 'Rating',
      detail: '41+ Verified Reviews',
      color: 'text-[#F18712]',
      bg: 'bg-amber-50',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 hover:border-brand-300 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-center sm:text-left group"
            >
              <div className="flex items-center justify-center sm:justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} className="sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
                  {stat.unit}
                </span>
              </div>

              <div>
                <div className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold ${stat.color} leading-none mb-1 sm:mb-2`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {stat.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
