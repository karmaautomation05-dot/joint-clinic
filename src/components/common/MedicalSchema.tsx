import { DOCTOR_DATA } from "@/data/doctor";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";
import { GENERAL_FAQS } from "@/data/faqs";

export default function MedicalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": "https://jointclinic.in/#physician",
        name: DOCTOR_DATA.name,
        jobTitle: "Senior Consultant Orthopaedic & Joint Replacement Surgeon",
        description: DOCTOR_DATA.subTitle,
        image: "https://jointclinic.in/images/doctor/gaurav-bhargava.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in",
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
        ],
        knowsAbout: [
          "Total Knee Replacement (TKR)",
          "Total Hip Replacement (THR)",
          "ACL Reconstruction Arthroscopy",
          "Meniscus Tear Repair",
          "Platelet-Rich Plasma (PRP) Therapy",
          "Avascular Necrosis (AVN) of Hip",
          "Knee Osteoarthritis Management",
          "Spine & Sciatica Care",
        ],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Maulana Azad Medical College (MAMC), New Delhi",
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
      {
        "@type": "MedicalClinic",
        "@id": "https://jointclinic.in/#swaroop-nagar",
        name: "Joint Clinic — A Centre of Arthroplasty & Arthroscopy",
        image: "https://jointclinic.in/images/doctor/gaurav-bhargava.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in",
        medicalDirector: { "@id": "https://jointclinic.in/#physician" },
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
        availableService: [
          {
            "@type": "MedicalProcedure",
            name: "Knee Replacement Surgery",
          },
          {
            "@type": "MedicalProcedure",
            name: "Hip Replacement Surgery",
          },
          {
            "@type": "MedicalProcedure",
            name: "Sports Injury & ACL Treatment",
          },
          {
            "@type": "MedicalProcedure",
            name: "Shoulder & Rotator Cuff Treatment",
          },
          {
            "@type": "MedicalProcedure",
            name: "PRP Therapy & Joint Pain Care",
          },
          {
            "@type": "MedicalProcedure",
            name: "Slip Disc & Sciatica Care",
          },
        ],
      },
      {
        "@type": ["Hospital", "EmergencyService"],
        "@id": "https://jointclinic.in/#kidwai-nagar",
        name: "Bhargava Medical & Trauma Centre (BMTC)",
        image: "https://jointclinic.in/images/hospital/modular_ot.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in/contact",
        medicalDirector: { "@id": "https://jointclinic.in/#physician" },
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
        ],
      },
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
