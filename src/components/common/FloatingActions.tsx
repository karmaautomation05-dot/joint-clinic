"use client";

import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { PRIMARY_CONTACT } from "@/data/clinics";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-14 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp Quick Chat */}
      <a
        href={`https://wa.me/${PRIMARY_CONTACT.whatsapp}?text=Hello%20Dr.%20Gaurav%20Bhargava,%20I%20would%20like%20to%20inquire%20about%20a%20consultation%20at%20Joint%20Clinic.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-xl shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95"
        aria-label="Chat with Joint Clinic on WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
        <span className="text-xs font-bold hidden sm:inline group-hover:inline transition-all">
          Chat on WhatsApp
        </span>
      </a>

      {/* Emergency Call Quick Action on Mobile */}
      <a
        href={`tel:${PRIMARY_CONTACT.phone}`}
        className="sm:hidden flex items-center justify-center w-12 h-12 bg-[#059B8F] text-white rounded-full shadow-lg active:scale-95 transition-transform"
        aria-label="Call Joint Clinic"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
