"use client";

import { useState } from "react";
import { Play, Star, Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { VIDEO_TESTIMONIALS, PATIENT_REVIEWS } from "@/data/testimonials";

export default function VideoTestimonials() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block">
            Verified Patient Outcomes
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Real Recovery Stories &amp; Clinical Reviews
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Real patient recoveries documenting active walking, pain relief, and restored quality of life following joint replacement and arthroscopic surgery.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {VIDEO_TESTIMONIALS.slice(0, 3).map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 flex flex-col justify-between group"
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
                    className="relative w-full h-full"
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
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100 inline-block">
                  {video.procedure}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                  {video.patientName}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {video.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Written Review Cards */}
        <div className="border-t border-slate-100 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Verified Feedback on Justdial &amp; Google
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Rated 5.0 out of 5 stars by patients across Kanpur and Uttar Pradesh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {PATIENT_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-8 rounded-3xl bg-brand-50/30 border border-brand-100/60 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-lg">
                      {"★".repeat(review.rating)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                      {review.source}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-100/50 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">{review.author}</span>
                  <span className="font-medium text-brand-600">{review.procedure}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors"
            >
              <span>View All Verified Patient Stories &amp; Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
