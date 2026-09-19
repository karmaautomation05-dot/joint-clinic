import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bone, Joint & Fracture Treatment in Kanpur | Orthopedic Specialties | Joint Clinic",
  description:
    "Comprehensive bone, joint & fracture treatment in Kanpur by Dr. Gaurav Bhargava (Best Orthopedic Surgeon & Joint Replacement Specialist). Knee, hip, sports injury, arthroscopy, and arthritis care.",
  keywords: [
    "Best Orthopedic Doctor in Kanpur",
    "Best Orthopedic Surgeon in Kanpur",
    "Orthopedic Doctor in Kanpur",
    "Bone Specialist in Kanpur",
    "Best Bone Doctor in Kanpur",
    "Fracture Specialist in Kanpur",
    "Bone, Joint & Fracture Treatment in Kanpur",
    "Joint Replacement Surgeon in Kanpur",
    "Knee Replacement Surgeon in Kanpur",
    "Knee Pain Specialist in Kanpur",
    "Hip Replacement Surgeon in Kanpur",
    "Sports Injury Specialist in Kanpur",
    "Arthroscopy Surgeon in Kanpur",
    "Arthritis Treatment in Kanpur",
    "Bone and Joint Specialist in Kanpur",
    "Orthopedic Hospital in Kanpur",
    "Bone Fracture Treatment in Kanpur",
    "Orthopedic Clinic in Kanpur",
    "Dr Gaurav Bhargava Orthopedic Doctor",
    "Orthopedic Doctor Near Me",
  ],
  alternates: {
    canonical: "https://jointclinic.in/treatments",
  },
  openGraph: {
    title: "Bone, Joint & Fracture Treatment in Kanpur | Joint Clinic",
    description:
      "Expert orthopedic care by Dr. Gaurav Bhargava: knee & hip replacement, sports injury arthroscopy, arthritis care, and 24/7 fracture trauma in Kanpur.",
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
    title: "Bone, Joint & Fracture Treatment in Kanpur | Joint Clinic",
    description: "24+ orthopedic treatments across knee, hip, sports injury, spine, PRP, and bone fracture care.",
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
