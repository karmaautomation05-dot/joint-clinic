import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orthopedic Treatments & Surgeries in Kanpur | Dr. Gaurav Bhargava",
  description:
    "Explore 24+ orthopedic treatments in Kanpur across Knee Care, Hip Replacement, ACL Arthroscopy, Shoulder, Spine, PRP Therapy, and 24/7 Trauma Care by Dr. Gaurav Bhargava (MAMC New Delhi).",
  keywords: [
    "Orthopedic treatments Kanpur",
    "Knee replacement surgery Kanpur",
    "Hip replacement Kanpur",
    "ACL ligament reconstruction Kanpur",
    "Shoulder arthroscopy Kanpur",
    "Slip disc treatment Kanpur",
    "PRP therapy Kanpur",
    "Dr Gaurav Bhargava treatments",
    "Joint Clinic Kanpur",
    "Best orthopedic doctor in Kanpur",
  ],
  alternates: {
    canonical: "https://jointclinic.in/treatments",
  },
  openGraph: {
    title: "Orthopedic Treatments & Surgeries | Joint Clinic Kanpur",
    description:
      "Clear, patient-friendly guide to knee replacements, hip surgery, ACL keyhole repairs, PRP injections, and spine care in Kanpur by Dr. Gaurav Bhargava.",
    url: "https://jointclinic.in/treatments",
    siteName: "Joint Clinic Kanpur",
    images: [
      {
        url: "/images/doctor/gaurav-bhargava.png",
        width: 800,
        height: 800,
        alt: "Orthopedic Treatments — Joint Clinic Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orthopedic Treatments in Kanpur | Joint Clinic",
    description: "Common orthopedic procedures explained in simple patient language.",
    images: ["/images/doctor/gaurav-bhargava.png"],
  },
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
