import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  CalendarCheck,
  Phone,
  Share2,
  BookOpen,
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogs";
import { PRIMARY_CONTACT } from "@/data/clinics";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Dr. Gaurav Bhargava`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const otherBlogs = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="bg-white pb-24">
      {/* Blog Article Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10 max-w-4xl space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5CD09] hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Health Library</span>
          </Link>

          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F5CD09] font-bold">
            <span>{post.category}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-brand-100 pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <User className="w-3.5 h-3.5 text-brand-400" />
              <span>{post.author}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              <span>{post.date}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Blog Body & Sidebar */}
      <div className="container -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-sm">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>

            {/* Markdown Body */}
            <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-600 prose-strong:text-slate-900 prose-ul:text-base prose-li:my-1.5">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Author Footer Card */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center gap-4 p-5 rounded-2xl bg-brand-50/40 border border-brand-100/60">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#a89c94] relative shrink-0 shadow-sm">
                <Image
                  src="/images/doctor/gaurav-bhargava.png"
                  alt={post.author}
                  fill
                  className="object-cover object-top scale-[1.38]"
                />
              </div>
              <div>
                <p className="text-xs text-slate-500">Article clinically authored &amp; reviewed by</p>
                <h4 className="text-base font-serif font-bold text-slate-900">{post.author}</h4>
                <p className="text-xs text-brand-700 font-semibold">{post.authorRole}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Consultation Booking Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-8 shadow-xl space-y-5 sticky top-28">
              <div className="space-y-1.5 text-center pb-4 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 inline-block">
                  Expert Assessment
                </span>
                <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                  Need Help with Your Joint Pain?
                </h3>
                <p className="text-xs text-slate-500">
                  Consult Dr. Gaurav Bhargava in person at our Swaroop Nagar Clinic or BMTC Kidwai Nagar.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/appointment"
                  className="w-full btn-primary py-3.5 text-center text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>

                <a
                  href={`tel:${PRIMARY_CONTACT.phone}`}
                  className="w-full btn-secondary py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>Call: {PRIMARY_CONTACT.phoneDisplay}</span>
                </a>
              </div>

              {/* Other Related Blogs */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                  <span>Related Articles</span>
                </h4>
                <div className="space-y-3">
                  {otherBlogs.map((b) => (
                    <Link
                      key={b.id}
                      href={`/blog/${b.slug}`}
                      className="block group space-y-1 text-xs"
                    >
                      <p className="font-serif font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                        {b.title}
                      </p>
                      <p className="text-[10px] text-slate-500">{b.date} &bull; {b.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
