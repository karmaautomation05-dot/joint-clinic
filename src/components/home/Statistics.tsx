import React from 'react'

export default function Statistics() {
  const stats = [
    { label: 'Years Surgical Experience', value: '20+', color: 'text-[#059B8F]' },
    { label: 'Joint & Trauma Procedures', value: '5,000+', color: 'text-[#0A7C97]' },
    { label: 'Post-Op Walking Protocol', value: '24-Hr', color: 'text-[#02BAB9]' },
    { label: 'Justdial Patient Rating', value: '5.0★', color: 'text-[#F18712]' },
  ]

  return (
    <section className="py-16 bg-white border-y border-brand-100 overflow-hidden relative">
      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className={`text-4xl sm:text-5xl md:text-6xl font-serif font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-widest font-bold text-black">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
