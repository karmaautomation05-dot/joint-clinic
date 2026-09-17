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
    default: "Joint Clinic Kanpur | Dr. Gaurav Bhargava | Arthroplasty & Arthroscopy",
    template: "%s | Joint Clinic Kanpur",
  },
  description:
    "Joint Clinic Kanpur — A Centre of Arthroplasty & Arthroscopy led by Dr. Gaurav Bhargava (MBBS, MS Ortho, Ex-SR MAMC New Delhi). 20+ years experience in Total Knee Replacement (TKR), Hip Replacement, ACL Arthroscopy, and PRP Joint Preservation in Swaroop Nagar & BMTC Kidwai Nagar.",
  keywords: [
    "Joint Clinic Kanpur",
    "Dr Gaurav Bhargava",
    "Best Orthopedic Doctor in Kanpur",
    "Best Knee Replacement Surgeon in Kanpur",
    "Robotic Knee Replacement Kanpur",
    "Hip Replacement Surgeon Kanpur",
    "Arthroscopy Specialist Kanpur",
    "ACL Surgery Kanpur",
    "Joint Clinic Swaroop Nagar",
    "BMTC Kidwai Nagar Orthopedics",
    "PRP Knee Therapy Kanpur",
    "Slip Disc Treatment Kanpur",
    "Fracture Hospital Kanpur",
    "Orthopedic Doctor near me Kanpur",
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
    siteName: "Joint Clinic — Dr. Gaurav Bhargava",
    title: "Joint Clinic Kanpur | Dr. Gaurav Bhargava — Arthroplasty & Arthroscopy",
    description:
      "Restore active, pain-free mobility with Delhi-standard joint replacement and keyhole sports injury surgery in Kanpur by Dr. Gaurav Bhargava (MAMC New Delhi).",
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
    title: "Joint Clinic Kanpur | Dr. Gaurav Bhargava",
    description: "Centre of Arthroplasty & Arthroscopy led by Dr. Gaurav Bhargava in Kanpur.",
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
