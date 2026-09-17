export interface DoctorProfile {
  name: string;
  title: string;
  subTitle: string;
  experienceYears: number;
  qualifications: string[];
  education: {
    degree: string;
    institution: string;
    details: string;
  }[];
  residency: {
    role: string;
    institution: string;
    location: string;
    significance: string;
  };
  memberships: string[];
  stats: {
    experience: string;
    surgeries: string;
    patients: string;
    rating: string;
    reviewCount: number;
    successRate: string;
  };
  socials: {
    instagram: string;
    justdial: string;
    practo: string;
  };
  philosophy: {
    title: string;
    quote: string;
    pillars: {
      title: string;
      desc: string;
    }[];
  };
  image: string;
}

export const DOCTOR_DATA: DoctorProfile = {
  name: "Dr. Gaurav Bhargava",
  title: "Senior Consultant Orthopaedic & Joint Replacement Surgeon",
  subTitle: "Director & Head — Joint Clinic (A Centre of Arthroplasty & Arthroscopy)",
  experienceYears: 20,
  qualifications: [
    "MBBS",
    "MS (Orthopaedics)",
    "Advanced Arthroplasty Fellowship",
    "Sports Medicine & Arthroscopy Fellowship",
  ],
  education: [
    {
      degree: "MS in Orthopaedics",
      institution: "S.N. Medical College, Agra",
      details: "Comprehensive post-graduate surgical training in adult reconstructive orthopaedics and complex trauma.",
    },
    {
      degree: "MBBS",
      institution: "Himalayan Institute of Medical Sciences",
      details: "Fundamental medical and clinical education with distinction in surgical disciplines.",
    },
    {
      degree: "Advanced Arthroplasty Training",
      institution: "Premier National Reconstructive Centers",
      details: "Focused specialization in primary & revision total knee (TKR) and total hip arthroplasty (THR).",
    },
  ],
  residency: {
    role: "Former Senior Resident",
    institution: "Maulana Azad Medical College (MAMC) & Associated Lok Nayak Hospital",
    location: "New Delhi",
    significance: "Trained at one of India's most prestigious tertiary surgical institutions, bringing Delhi-standard orthopaedic surgical protocols and clinical rigor to Kanpur.",
  },
  memberships: [
    "Indian Orthopaedic Association (IOA) — Life Member",
    "UP Orthopaedic Association (UPOA)",
    "Indian Arthroscopy Society (IAS)",
  ],
  stats: {
    experience: "20+ Years",
    surgeries: "5,000+",
    patients: "10,000+",
    rating: "5.0",
    reviewCount: 41,
    successRate: "97%+",
  },
  socials: {
    instagram: "https://www.instagram.com/jointclinic_dr.gauravbhargava/",
    justdial: "https://www.justdial.com/Kanpur/Dr-Gaurav-Bhargava-Khalasi-Lines/0512PX512-X512-230826172245-T8L3_BZDET",
    practo: "https://www.practo.com/kanpur/doctor/dr-gaurav-bhargava-orthopedist",
  },
  philosophy: {
    title: "Conservative Care First, Surgical Precision When Needed",
    quote: "My commitment is to restore mobility and improve your quality of life through surgical excellence, ethical recommendations, and compassionate care.",
    pillars: [
      {
        title: "Sub-Millimeter Surgical Precision",
        desc: "Utilizing modern high-flexion, long-life implants and tissue-sparing approaches for anatomical balance and longevity beyond 25 years.",
      },
      {
        title: "Conservative-First Philosophy",
        desc: "Surgery is never rushed. We prioritize regenerative therapies, targeted physical therapy, and joint preservation whenever possible.",
      },
      {
        title: "Rapid Mobilization Protocol",
        desc: "Encouraging gentle standing and guided walking within 24 hours of surgery, significantly reducing complications and speeding independence.",
      },
    ],
  },
  image: "/images/doctor/gaurav-bhargava.png",
};
