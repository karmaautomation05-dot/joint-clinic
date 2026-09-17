import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Stories & Recovery Reviews | Joint Clinic Kanpur",
  description:
    "Real video testimonials and verified recovery reviews from patients who underwent Total Knee Replacement, Hip Surgery, and ACL Arthroscopy with Dr. Gaurav Bhargava in Kanpur.",
  alternates: {
    canonical: "https://jointclinic.in/testimonials",
  },
  openGraph: {
    title: "Patient Testimonials & Reviews | Joint Clinic Kanpur",
    description:
      "Watch inspiring recovery journeys of patients walking pain-free after joint replacement surgery by Dr. Gaurav Bhargava.",
    url: "https://jointclinic.in/testimonials",
    images: [
      {
        url: "/images/doctor/gaurav-bhargava.png",
        width: 800,
        height: 800,
        alt: "Dr. Gaurav Bhargava — Joint Clinic Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patient Testimonials | Joint Clinic Kanpur",
    description: "Verified reviews and video recovery stories from Dr. Gaurav Bhargava's patients.",
    images: ["/images/doctor/gaurav-bhargava.png"],
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
