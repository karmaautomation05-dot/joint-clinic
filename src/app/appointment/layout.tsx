import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Consultation & Second Opinion | Joint Clinic Kanpur",
  description:
    "Schedule an outpatient consultation with Dr. Gaurav Bhargava at Joint Clinic (Swaroop Nagar) or BMTC (Kidwai Nagar), Kanpur. Fast-track appointment booking and second opinion on MRI/X-ray reports.",
  alternates: {
    canonical: "https://jointclinic.in/appointment",
  },
  openGraph: {
    title: "Book Consultation | Dr. Gaurav Bhargava — Joint Clinic Kanpur",
    description:
      "Schedule your orthopedic consultation or MRI second opinion with Dr. Gaurav Bhargava in Kanpur. Available at Swaroop Nagar and BMTC Kidwai Nagar.",
    url: "https://jointclinic.in/appointment",
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
    title: "Book Consultation | Dr. Gaurav Bhargava — Joint Clinic Kanpur",
    description: "Book an orthopedic appointment at Swaroop Nagar or BMTC Kidwai Nagar, Kanpur.",
    images: ["/images/doctor/gaurav-bhargava.png"],
  },
};

export default function AppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
