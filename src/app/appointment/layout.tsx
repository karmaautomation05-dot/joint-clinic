import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Orthopedic Consultation in Kanpur | Dr. Gaurav Bhargava | Joint Clinic",
  description:
    "Schedule your consultation with Dr. Gaurav Bhargava, Best Orthopedic Doctor & Joint Replacement Surgeon in Kanpur. Clinics at Swaroop Nagar & BMTC Kidwai Nagar.",
  keywords: [
    "Orthopedic Doctor in Kanpur",
    "Best Orthopedic Doctor in Kanpur",
    "Best Orthopedic Surgeon in Kanpur",
    "Dr Gaurav Bhargava Orthopedic Doctor",
    "Orthopedic Doctor Near Me",
    "Bone Specialist in Kanpur",
    "Knee Pain Specialist in Kanpur",
    "Joint Replacement Surgeon in Kanpur",
    "Orthopedic Clinic in Kanpur",
  ],
  alternates: {
    canonical: "https://jointclinic.in/appointment",
  },
  openGraph: {
    title: "Book Orthopedic Consultation in Kanpur | Dr. Gaurav Bhargava",
    description:
      "Direct OPD consultation booking at Swaroop Nagar & BMTC Kidwai Nagar with Kanpur's leading orthopedic surgeon.",
    url: "https://jointclinic.in/appointment",
    siteName: "Joint Clinic Kanpur",
  },
};

export default function AppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
