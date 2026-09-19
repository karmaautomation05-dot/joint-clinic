import { NextResponse } from "next/server";
import { TREATMENTS, TREATMENT_CATEGORIES } from "@/data/treatments";
import { RECOVERY_GUIDES } from "@/data/recoveryGuides";
import { BLOG_POSTS } from "@/data/blogs";

export const dynamic = "force-static";

export async function GET() {
  const BASE_URL = "https://jointclinic.in";
  const currentDate = new Date().toISOString();

  // 1. Core Static Pages
  const staticPages = [
    { url: `${BASE_URL}/`, lastmod: currentDate, changefreq: "daily", priority: "1.0" },
    { url: `${BASE_URL}/about`, lastmod: currentDate, changefreq: "weekly", priority: "0.9" },
    { url: `${BASE_URL}/treatments`, lastmod: currentDate, changefreq: "weekly", priority: "0.9" },
    { url: `${BASE_URL}/recovery-guide`, lastmod: currentDate, changefreq: "weekly", priority: "0.9" },
    { url: `${BASE_URL}/appointment`, lastmod: currentDate, changefreq: "daily", priority: "0.9" },
    { url: `${BASE_URL}/testimonials`, lastmod: currentDate, changefreq: "weekly", priority: "0.8" },
    { url: `${BASE_URL}/blog`, lastmod: currentDate, changefreq: "daily", priority: "0.8" },
    { url: `${BASE_URL}/contact`, lastmod: currentDate, changefreq: "monthly", priority: "0.8" },
  ];

  // 2. Dedicated Treatment Category Pages
  const treatmentCategories = TREATMENT_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/treatments/category/${cat.id}`,
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "0.85",
  }));

  // 3. Dedicated Recovery Guide Category Pages
  const recoveryCategories = RECOVERY_GUIDES.map((guide) => ({
    url: `${BASE_URL}/recovery-guide/${guide.id}`,
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "0.85",
  }));

  // 4. Dynamic Individual Treatment Pages
  const allTreatmentSlugs = new Set<string>();
  TREATMENTS.forEach((t) => {
    allTreatmentSlugs.add(t.slug);
    t.aliases?.forEach((alias) => allTreatmentSlugs.add(alias));
  });

  const treatmentPages = Array.from(allTreatmentSlugs).map((slug) => ({
    url: `${BASE_URL}/treatments/${slug}`,
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "0.8",
  }));

  // 5. Dynamic Blog Posts
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "0.7",
  }));

  const allPages = [
    ...staticPages,
    ...treatmentCategories,
    ...recoveryCategories,
    ...treatmentPages,
    ...blogPages,
  ];

  const xmlEntries = allPages
    .map(
      (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
