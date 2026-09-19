import { DOCTOR_DATA } from "@/data/doctor";
import { CLINIC_LOCATIONS, PRIMARY_CONTACT } from "@/data/clinics";
import { GENERAL_FAQS } from "@/data/faqs";
import { TREATMENTS } from "@/data/treatments";

export default function MedicalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebSite Schema (Enables Google Sitelinks Search Box & Entity Graph)
      {
        "@type": "WebSite",
        "@id": "https://jointclinic.in/#website",
        url: "https://jointclinic.in",
        name: "Joint Clinic Kanpur — Best Orthopedic Doctor & Surgeon",
        alternateName: [
          "Joint Clinic",
          "Dr Gaurav Bhargava Orthopedic Doctor",
          "Best Orthopedic Doctor in Kanpur",
          "Best Orthopedic Surgeon in Kanpur",
          "Bone Specialist in Kanpur",
          "Best Bone Doctor in Kanpur",
          "Fracture Specialist in Kanpur",
          "Bone and Joint Specialist in Kanpur",
          "Orthopedic Hospital in Kanpur",
          "Orthopedic Clinic in Kanpur",
          "Joint Clinic Swaroop Nagar",
          "BMTC Kidwai Nagar Orthopedics",
        ],
        description:
          "Kanpur's Premier Centre of Arthroplasty, Arthroscopy, Bone Fracture Treatment & Joint Preservation led by Dr. Gaurav Bhargava (MAMC New Delhi).",
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

      // 2. MedicalWebPage Schema with Speakable Specification for Voice AI
      {
        "@type": "MedicalWebPage",
        "@id": "https://jointclinic.in/#webpage",
        url: "https://jointclinic.in",
        name: "Best Orthopedic Doctor & Surgeon in Kanpur | Bone & Joint Treatment",
        description:
          "Delhi-standard joint replacement, knee replacement surgery, hip replacement, keyhole sports arthroscopy, PRP therapy, and 24/7 emergency fracture trauma in Kanpur by Dr. Gaurav Bhargava.",
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
        name: "Dr. Gaurav Bhargava",
        jobTitle:
          "Best Orthopedic Doctor & Surgeon in Kanpur, Bone Specialist & Joint Replacement Surgeon",
        description:
          "Dr. Gaurav Bhargava is a senior consultant orthopedic surgeon, bone specialist, and knee replacement surgeon in Kanpur with 20+ years of clinical excellence (Ex-Senior Resident MAMC New Delhi), treating over 10,000 patients across Uttar Pradesh.",
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
          "Knee Replacement Surgeon",
          "Hip Replacement Surgeon",
          "Knee Pain Specialist",
          "Sports Injury Specialist",
          "Arthroscopy Surgeon",
          "Fracture Specialist",
          "Bone and Joint Specialist",
          "Arthritis Treatment",
          "Spine and Sciatica Care",
          "Joint Preservation & PRP",
        ],
        knowsAbout: [
          "Best Orthopedic Doctor in Kanpur",
          "Best Orthopedic Surgeon in Kanpur",
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
          ...TREATMENTS.map((t) => t.title),
        ],
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

      // 4. Joint Clinic — Swaroop Nagar (Orthopedic Clinic in Kanpur)
      {
        "@type": "MedicalClinic",
        "@id": "https://jointclinic.in/#swaroop-nagar",
        name: "Joint Clinic — Best Orthopedic Clinic in Kanpur",
        alternateName: "Joint Clinic Swaroop Nagar",
        description:
          "Kanpur's premier orthopedic clinic in Swaroop Nagar for joint replacement consultation, bone and joint specialist care, knee pain treatment, arthritis care, and PRP therapy.",
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

      // 5. Bhargava Medical & Trauma Centre (BMTC) — Orthopedic Hospital in Kanpur (Kidwai Nagar)
      {
        "@type": ["Hospital", "EmergencyService"],
        "@id": "https://jointclinic.in/#kidwai-nagar",
        name: "Bhargava Medical & Trauma Centre (BMTC) — Orthopedic Hospital in Kanpur",
        alternateName: "BMTC Orthopedic Hospital Kidwai Nagar",
        description:
          "24/7 Orthopedic Hospital in Kidwai Nagar, Kanpur with modular laminar airflow OTs, emergency bone fracture treatment, complex trauma surgery, and joint replacement by Dr. Gaurav Bhargava.",
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
            name: "Bone, Joint & Fracture Treatment in Kanpur",
          },
          {
            "@type": "MedicalProcedure",
            name: "Bone Fracture Treatment in Kanpur (24/7 Trauma Emergency)",
          },
          {
            "@type": "MedicalProcedure",
            name: "Total Knee Replacement & Knee Pain Treatment",
          },
          {
            "@type": "MedicalProcedure",
            name: "Total Hip Replacement Surgery",
          },
          {
            "@type": "MedicalProcedure",
            name: "Laminar Airflow Modular Operation Theatre Joint Surgeries",
          },
          ...TREATMENTS.map((t) => ({
            "@type": "MedicalProcedure",
            name: t.title,
            url: `https://jointclinic.in/treatments/${t.slug}`,
          })),
        ],
      },

      // 6. Global High-Intent FAQ Schema (Targeting Top 20 Search Queries)
      {
        "@type": "FAQPage",
        "@id": "https://jointclinic.in/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is the best orthopedic doctor and bone specialist in Kanpur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Dr. Gaurav Bhargava is recognized as the best orthopedic doctor and bone specialist in Kanpur. With over 20 years of clinical experience, post-graduation from S.N. Medical College Agra, and Senior Residency at Maulana Azad Medical College (MAMC) New Delhi, he has treated over 10,000 patients across Uttar Pradesh. He consults at Joint Clinic in Swaroop Nagar and BMTC Hospital in Kidwai Nagar.",
            },
          },
          {
            "@type": "Question",
            name: "Where can I find an orthopedic doctor near me in Kanpur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you are searching for an orthopedic doctor near me in Kanpur, Dr. Gaurav Bhargava is conveniently available at two central locations: Joint Clinic at Swaroop Nagar (Evening OPD 4:00 PM – 7:00 PM) for North/Central Kanpur, and BMTC at Kidwai Nagar (Morning OPD 10:00 AM – 2:00 PM & 24/7 Emergency) for South Kanpur. Call +91 73090 38872.",
            },
          },
          {
            "@type": "Question",
            name: "Which is the best orthopedic hospital in Kanpur for bone fracture treatment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bhargava Medical & Trauma Centre (BMTC), located at 30-E, O Block, Kidwai Nagar, is a premier orthopedic hospital in Kanpur offering 24/7 emergency fracture treatment, modern modular operation theaters with laminar airflow, digital X-rays, and ICU facilities under Dr. Gaurav Bhargava.",
            },
          },
          {
            "@type": "Question",
            name: "Who is the leading knee replacement surgeon and knee pain specialist in Kanpur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Dr. Gaurav Bhargava is the leading knee replacement surgeon and knee pain specialist in Kanpur, specializing in minimally invasive subvastus Total Knee Replacement (TKR), robotic knee surgery, and partial knee replacement, with patients walking within 24 hours of surgery.",
            },
          },
          {
            "@type": "Question",
            name: "What non-surgical arthritis treatments are available in Kanpur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "At Joint Clinic Kanpur, arthritis treatment includes autologous Platelet-Rich Plasma (PRP) biological therapy, hyaluronic acid joint lubrication injections, quadriceps muscle rehabilitation, and lifestyle offloading plans that relieve pain and protect natural joint cartilage without surgery.",
            },
          },
          ...GENERAL_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
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
