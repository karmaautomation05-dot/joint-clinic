import { MetadataRoute } from "next";
import { TREATMENTS, TREATMENT_CATEGORIES } from "@/data/treatments";
import { RECOVERY_GUIDES } from "@/data/recoveryGuides";
import { BLOG_POSTS } from "@/data/blogs";

const BASE_URL = "https://jointclinic.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/treatments`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/recovery-guide`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/appointment`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dedicated Treatment Category pages
  const treatmentCategoryRoutes: MetadataRoute.Sitemap = TREATMENT_CATEGORIES.map(
    (cat) => ({
      url: `${BASE_URL}/treatments/category/${cat.id}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  // Dedicated Recovery Guide Category pages
  const recoveryCategoryRoutes: MetadataRoute.Sitemap = RECOVERY_GUIDES.map(
    (guide) => ({
      url: `${BASE_URL}/recovery-guide/${guide.id}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  // Dynamic individual treatment pages
  const allTreatmentSlugs = new Set<string>();
  TREATMENTS.forEach((t) => {
    allTreatmentSlugs.add(t.slug);
    t.aliases?.forEach((alias) => allTreatmentSlugs.add(alias));
  });

  const treatmentRoutes: MetadataRoute.Sitemap = Array.from(allTreatmentSlugs).map(
    (slug) => ({
      url: `${BASE_URL}/treatments/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  // Dynamic blog post pages
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...treatmentCategoryRoutes,
    ...recoveryCategoryRoutes,
    ...treatmentRoutes,
    ...blogRoutes,
  ];
}
