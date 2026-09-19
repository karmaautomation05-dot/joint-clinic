import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import FloatingActions from "@/components/common/FloatingActions";
import BottomInfoBar from "@/components/common/BottomInfoBar";
import MedicalSchema from "@/components/common/MedicalSchema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jointclinic.in"),
  title: {
    default: "Best Orthopedic Doctor & Surgeon in Kanpur | Dr. Gaurav Bhargava | Joint Clinic",
    template: "%s | Best Orthopedic Doctor in Kanpur | Joint Clinic",
  },
  description:
    "Dr. Gaurav Bhargava is the best orthopedic doctor, bone specialist, and joint replacement surgeon in Kanpur (Ex-SR MAMC New Delhi, 20+ yrs experience). Advanced bone, joint & fracture treatment, knee replacement, hip replacement, and sports arthroscopy at Joint Clinic (Swaroop Nagar) & BMTC Orthopedic Hospital (Kidwai Nagar).",
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
    "Joint Clinic Kanpur",
    "Joint Clinic Swaroop Nagar",
    "BMTC Kidwai Nagar",
  ],
  authors: [{ name: "Dr. Gaurav Bhargava" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jointclinic.in",
    siteName: "Joint Clinic Kanpur — Dr. Gaurav Bhargava",
    title: "Best Orthopedic Doctor & Surgeon in Kanpur | Dr. Gaurav Bhargava",
    description:
      "Looking for the best orthopedic doctor near me in Kanpur? Dr. Gaurav Bhargava (MAMC New Delhi) provides advanced bone, joint & fracture treatment, knee/hip replacement, and sports keyhole surgery.",
    images: [
      {
        url: "/images/doctor/gaurav-bhargava.png",
        width: 800,
        height: 800,
        alt: "Dr. Gaurav Bhargava — Best Orthopedic Doctor in Kanpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Orthopedic Doctor & Surgeon in Kanpur | Dr. Gaurav Bhargava",
    description:
      "Leading bone, joint & fracture treatment, knee replacement, and sports arthroscopy in Kanpur by Dr. Gaurav Bhargava.",
    images: ["/images/doctor/gaurav-bhargava.png"],
  },
  other: {
    "theme-color": "#059B8F",
    "geo.region": "IN-UP",
    "geo.placename": "Kanpur, Uttar Pradesh, India",
    "geo.position": "26.480358;80.310883",
    "ICBM": "26.480358, 80.310883",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <MedicalSchema />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-brand-600 selection:text-white">
        <Navbar />
        <main className="flex-1 pb-8">{children}</main>
        <Footer />
        <FloatingActions />
        <BottomInfoBar />
      </body>
    </html>
  );
}
