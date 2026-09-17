"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight, FileCheck } from "lucide-react";
import Link from "next/link";
import { GENERAL_FAQS } from "@/data/faqs";

export default function HomeFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50/50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-blue px-3 py-1 rounded-md bg-blue-50 border border-brand-blue/20 inline-block mb-3">
            CLINICAL QUERIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Clear, authoritative guidance regarding joint replacement longevity, recovery speed, and
            second opinions.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {GENERAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm text-brand-navy hover:text-brand-blue transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-blue" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Second Opinion MRI Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-brand-navy">
                Have an existing MRI scan or surgery recommendation?
              </p>
              <p className="text-[11px] text-slate-500">
                Get an unbiased review from Dr. Gaurav Bhargava before deciding on joint surgery.
              </p>
            </div>
          </div>
          <Link
            href="/appointment"
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 hover:bg-blue-100 border border-brand-blue/20 transition-colors shrink-0"
          >
            Second Opinion Review &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
