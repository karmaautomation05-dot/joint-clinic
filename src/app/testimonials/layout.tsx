import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Reviews & Recovery Stories | Dr. Gaurav Bhargava | Joint Clinic Kanpur",
  description:
    "Read real patient reviews and recovery stories for knee replacement, hip surgery, arthroscopy, and fracture treatments by Dr. Gaurav Bhargava in Kanpur.",
  keywords: [
    "Best Orthopedic Doctor in Kanpur",
    "Knee Replacement Surgeon in Kanpur",
    "Dr Gaurav Bhargava Orthopedic Doctor",
    "Joint Replacement Surgeon in Kanpur",
    "Orthopedic Hospital in Kanpur",
    "Bone Specialist in Kanpur",
  ],
  alternates: {
    canonical: "https://jointclinic.in/testimonials",
  },
  openGraph: {
    title: "Patient Reviews & Recovery Stories | Joint Clinic Kanpur",
    description:
      "Real patient experiences and verified surgical outcomes from Dr. Gaurav Bhargava's orthopedic patients in Kanpur.",
    url: "https://jointclinic.in/testimonials",
    siteName: "Joint Clinic Kanpur",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
