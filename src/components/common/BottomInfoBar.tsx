"use client";

import { Clock, MapPin } from "lucide-react";

export default function BottomInfoBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-100 shadow-[0_-4px_24px_0_rgba(0,0,0,0.07)] text-[11px] sm:text-xs py-2">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Clinic OPD Schedules */}
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-black font-semibold shrink-0">
            <Clock size={13} className="text-[#F18712] shrink-0" />
            <span>Swaroop Nagar: 4:00 PM – 7:00 PM (Mon–Sat)</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5 text-black font-medium shrink-0">
            <MapPin size={13} className="text-[#059B8F] shrink-0" />
            <span>BMTC Kidwai Nagar: 10:00 AM – 2:00 PM (24/7 Trauma Emergency)</span>
          </span>
        </div>

        {/* Right: Emergency Phone with pulsing dot */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 ml-4">
          <a
            href="tel:+917309038872"
            className="flex items-center gap-1.5 text-[#F18712] font-bold hover:text-[#d96e00] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5CD09] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F18712]"></span>
            </span>
            Emergency: +91 73090 38872
          </a>
        </div>
      </div>
    </div>
  );
}
