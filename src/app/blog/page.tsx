import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User, Calendar, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Orthopaedic & Spine Health Blogs | Dr. Gaurav Bhargava",
  description:
    "Evidence-based clinical guides and patient recovery articles on knee replacements, arthritis, slipped disc vs spasm, and joint longevity by Dr. Gaurav Bhargava.",
};

export default function BlogListingPage() {
  return (
    <div className="bg-white pb-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Patient Education &amp; Clinical Guides
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Orthopaedic Health Library
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              In-depth medical articles and recovery blueprints authored by Dr. Gaurav Bhargava to
              help you make well-informed decisions regarding your joint and spine health.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <div className="container -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-[2.5rem] border border-slate-200/80 overflow-hidden shadow-sm hover:border-brand-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image Container */}
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-950/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                    {post.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      <span>{post.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-serif font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-7 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium">
                  By {post.author}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
