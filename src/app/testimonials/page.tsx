"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Star, ExternalLink, Instagram, Calendar, ArrowRight } from "lucide-react";
import { VIDEO_TESTIMONIALS, PATIENT_REVIEWS } from "@/data/testimonials";
import { PRIMARY_CONTACT } from "@/data/clinics";

export default function TestimonialsPage() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <div className="bg-white pb-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Patient Experiences &amp; Outcomes
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Recovery Stories &amp; Testimonials
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Watch real patients describe their journey from chronic joint pain to active, unassisted
              walking under the care of Dr. Gaurav Bhargava in Kanpur.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <div className="container -mt-10 relative z-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEO_TESTIMONIALS.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-[2.5rem] border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-200 group flex flex-col justify-between transition-all duration-300"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer">
                {activeVideoId === video.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.patientName}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div
                    onClick={() => setActiveVideoId(video.youtubeId)}
                    className="relative w-full h-full group"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.patientName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-brand-600 ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-7 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100 inline-block">
                  {video.procedure}
                </span>
                <h2 className="text-xl font-serif font-bold text-slate-900">{video.patientName}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {video.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Written Verified Reviews */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">
                Verified Patient Reviews
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Rated 5.0 out of 5.0 on Justdial and Google Reviews with 40+ positive ratings.
              </p>
            </div>

            <a
              href={PRIMARY_CONTACT.justdial}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition-colors w-fit"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>View 41+ Reviews on Justdial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATIENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-brand-50/30 border border-brand-100/60 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {"★".repeat(review.rating)}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                      {review.source}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-100/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{review.author}</span>
                  <span className="font-medium text-brand-700">{review.procedure}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={PRIMARY_CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-600" />
              <span>Follow @jointclinic_dr.gauravbhargava for recovery reels &amp; live surgical videos</span>
            </a>

            <Link
              href="/appointment"
              className="btn-primary py-3 px-6 text-xs font-semibold"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
