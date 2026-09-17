import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orthopedic Surgery & Injury Recovery Guides | Joint Clinic Kanpur",
  description:
    "Comprehensive patient recovery guides for knee replacement, hip surgery, ACL tear, shoulder, spine, fractures, and PRP therapy by Dr. Gaurav Bhargava in Kanpur. Step-by-step healing timelines in simple language.",
  alternates: {
    canonical: "https://jointclinic.in/recovery-guide",
  },
  openGraph: {
    title: "Patient Recovery Guides & Healing Milestones | Joint Clinic Kanpur",
    description:
      "Simple, comforting recovery timelines across knee, hip, ACL, shoulder, spine, fractures, and non-surgical treatments. Practical home prep and phase-by-phase milestones.",
    url: "https://jointclinic.in/recovery-guide",
    images: [
      {
        url: "/images/blogs/blog_knee_rehab.png",
        width: 800,
        height: 600,
        alt: "Orthopedic Recovery Roadmap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orthopedic Surgery Recovery Guides | Joint Clinic Kanpur",
    description: "Step-by-step patient recovery timelines in clear, simple language.",
    images: ["/images/blogs/blog_knee_rehab.png"],
  },
};

export default function RecoveryGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
