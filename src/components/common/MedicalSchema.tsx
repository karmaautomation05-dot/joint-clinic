import { DOCTOR_DATA } from "@/data/doctor";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";

export default function MedicalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": "https://jointclinic.in/#physician",
        name: DOCTOR_DATA.name,
        description: DOCTOR_DATA.subTitle,
        image: "https://jointclinic.in/images/doctor/gaurav-bhargava.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in",
        medicalSpecialty: [
          "Orthopedic Surgery",
          "Joint Replacement Surgery (Arthroplasty)",
          "Sports Medicine & Arthroscopy",
          "Trauma Surgery",
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
        "@id": "https://jointclinic.in/#clinic",
        name: "Joint Clinic — A Centre of Arthroplasty & Arthroscopy",
        image: "https://jointclinic.in/images/doctor/gaurav-bhargava.png",
        telephone: PRIMARY_CONTACT.phone,
        url: "https://jointclinic.in",
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
            opens: "17:00",
            closes: "19:00",
          },
        ],
        availableService: [
          {
            "@type": "MedicalProcedure",
            name: "Total Knee Replacement (TKR)",
          },
          {
            "@type": "MedicalProcedure",
            name: "Total Hip Replacement (THR)",
          },
          {
            "@type": "MedicalProcedure",
            name: "Arthroscopic ACL & Meniscus Surgery",
          },
          {
            "@type": "MedicalProcedure",
            name: "Joint Preservation & PRP Therapy",
          },
        ],
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
