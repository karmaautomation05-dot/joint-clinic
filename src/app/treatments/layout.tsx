import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orthopaedic Treatments by Category | Joint Clinic Kanpur",
  description:
    "Explore common and advanced orthopedic treatments categorized by Knee, Hip, Sports Injury & ACL, Shoulder, Spine & Sciatica, Non-Surgical PRP, and 24/7 Trauma Care by Dr. Gaurav Bhargava.",
  alternates: {
    canonical: "https://jointclinic.in/treatments",
  },
  openGraph: {
    title: "Orthopaedic Treatments & Surgeries | Joint Clinic Kanpur",
    description:
      "Clear, patient-friendly guide to knee replacements, hip surgery, ACL keyhole repairs, PRP injections, and spine care in Kanpur by Dr. Gaurav Bhargava.",
    url: "https://jointclinic.in/treatments",
    images: [
      {
        url: "/images/doctor/gaurav-bhargava.png",
        width: 800,
        height: 800,
        alt: "Orthopaedic Treatments — Joint Clinic Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treatments & Surgeries | Joint Clinic Kanpur",
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
