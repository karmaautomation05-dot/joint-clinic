import { DOCTOR_DATA } from "@/data/doctor";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";
import { GENERAL_FAQS } from "@/data/faqs";
import { TREATMENTS } from "@/data/treatments";

export default function MedicalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebSite Schema (Enables Google Sitelinks Search Box)
      {
        "@type": "WebSite",
        "@id": "https://jointclinic.in/#website",
        url: "https://jointclinic.in",
        name: "Joint Clinic Kanpur",
        alternateName: [
          "Joint Clinic",
          "Dr. Gaurav Bhargava Orthopedic Clinic",
          "Joint Clinic Swaroop Nagar",
          "BMTC Kidwai Nagar Orthopedics",
        ],
        description:
          "Kanpur's Premier Centre of Arthroplasty, Arthroscopy & Joint Preservation led by Dr. Gaurav Bhargava (MAMC New Delhi).",
        publisher: { "@id": "https://jointclinic.in/#physician" },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://jointclinic.in/treatments?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },

      // 2. MedicalWebPage Schema with Speakable Specification for Voice AI (Google Assistant, Siri, Alexa)
      {
        "@type": "MedicalWebPage",
        "@id": "https://jointclinic.in/#webpage",
        url: "https://jointclinic.in",
        name: "Joint Clinic Kanpur — Orthopedic Surgery & Joint Preservation",
        description:
          "Delhi-standard joint replacement, keyhole sports arthroscopy, PRP therapy, and 24/7 emergency fracture trauma in Kanpur by Dr. Gaurav Bhargava.",
        about: { "@id": "https://jointclinic.in/#physician" },
        specialty: "https://schema.org/Orthopedic",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".aeo-summary", "p.font-serif"],
        },
      },

      // 3. Lead Physician Schema (Dr. Gaurav Bhargava)
      {
        "@type": "Physician",
        "@id": "https://jointclinic.in/#physician",
        name: DOCTOR_DATA.name,
        jobTitle: "Senior Consultant Orthopaedic & Joint Replacement Surgeon",
        description: `${DOCTOR_DATA.subTitle}. Over 20 years of clinical experience, Ex-Senior Resident Maulana Azad Medical College (MAMC) New Delhi, treating over 10,000 patients across Northern India.`,
        image: "https://jointclinic.in/images/doctor/gaurav-bhargava.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in/about",
        sameAs: [
          PRIMARY_CONTACT.instagram,
          PRIMARY_CONTACT.justdial,
          "https://maps.google.com/?q=7/198-A+Anand+Bazar+Khalasi+Line+Swaroop+Nagar+Kanpur+Uttar+Pradesh+208002",
        ],
        medicalSpecialty: [
          "Orthopedic Surgery",
          "Joint Replacement Surgery (Arthroplasty)",
          "Sports Medicine & Arthroscopy",
          "Trauma Surgery",
          "Spine Care",
          "Joint Preservation",
        ],
        knowsAbout: TREATMENTS.map((t) => t.title),
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Maulana Azad Medical College (MAMC) & LNJP Hospital, New Delhi",
          },
          {
            "@type": "EducationalOrganization",
            name: "S.N. Medical College, Agra",
          },
        ],
        memberOf: [
          {
            "@type": "Organization",
            name: "Indian Orthopaedic Association (IOA)",
          },
          {
            "@type": "Organization",
            name: "Uttar Pradesh Orthopaedic Association (UPOA)",
          },
        ],
        worksFor: [
          { "@id": "https://jointclinic.in/#swaroop-nagar" },
          { "@id": "https://jointclinic.in/#kidwai-nagar" },
        ],
        priceRange: "$$",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          ratingCount: "41",
          bestRating: "5",
          worstRating: "1",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "7/198-A 4, Anand Bazar, Khalasi Lines, Swaroop Nagar",
          addressLocality: "Kanpur",
          addressRegion: "Uttar Pradesh",
          postalCode: "208002",
          addressCountry: "IN",
        },
      },

      // 4. Joint Clinic — Swaroop Nagar (Evening Specialist OPD)
      {
        "@type": "MedicalClinic",
        "@id": "https://jointclinic.in/#swaroop-nagar",
        name: "Joint Clinic — Centre of Arthroplasty & Arthroscopy",
        image: "https://jointclinic.in/images/doctor/gaurav-bhargava.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in",
        medicalDirector: { "@id": "https://jointclinic.in/#physician" },
        priceRange: "$$",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking, Health Insurance TPA",
        address: {
          "@type": "PostalAddress",
          streetAddress: "7/198-A 4, Anand Bazar, Khalasi Lines, Swaroop Nagar",
          addressLocality: "Kanpur",
          addressRegion: "Uttar Pradesh",
          postalCode: "208002",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 26.4803575,
          longitude: 80.3108834,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "16:00",
            closes: "19:00",
          },
        ],
        availableService: TREATMENTS.map((t) => ({
          "@type": "MedicalProcedure",
          name: t.title,
          url: `https://jointclinic.in/treatments/${t.slug}`,
          description: t.shortDesc,
        })),
      },

      // 5. Bhargava Medical & Trauma Centre (BMTC) — Kidwai Nagar (Day OPD & 24/7 Hospital)
      {
        "@type": ["Hospital", "EmergencyService"],
        "@id": "https://jointclinic.in/#kidwai-nagar",
        name: "Bhargava Medical & Trauma Centre (BMTC)",
        image: "https://jointclinic.in/images/hospital/modular_ot.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in/contact",
        medicalDirector: { "@id": "https://jointclinic.in/#physician" },
        priceRange: "$$",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Health Insurance TPA, Ayushman Bharat",
        address: {
          "@type": "PostalAddress",
          streetAddress: "30-E, O Block, Kidwai Nagar",
          addressLocality: "Kanpur",
          addressRegion: "Uttar Pradesh",
          postalCode: "208023",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 26.435421,
          longitude: 80.334185,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "14:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        availableService: [
          {
            "@type": "MedicalProcedure",
            name: "Laminar Airflow Modular Operation Theatre Joint Surgeries",
          },
          {
            "@type": "MedicalProcedure",
            name: "24/7 Emergency Trauma & Fracture Fixation",
          },
          {
            "@type": "MedicalProcedure",
            name: "In-House Post-Operative Orthopedic Rehabilitation",
          },
          ...TREATMENTS.map((t) => ({
            "@type": "MedicalProcedure",
            name: t.title,
            url: `https://jointclinic.in/treatments/${t.slug}`,
          })),
        ],
      },

      // 6. Global High-Intent FAQ Schema (Powers Google FAQ Snippets & AI Citations)
      {
        "@type": "FAQPage",
        "@id": "https://jointclinic.in/#faq",
        mainEntity: GENERAL_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
