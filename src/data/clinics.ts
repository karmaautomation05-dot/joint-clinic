export interface ClinicLocation {
  id: string;
  name: string;
  type: "clinic" | "hospital";
  tagline: string;
  address: {
    line1: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  timings: {
    days: string;
    hours: string;
    badge: string;
  };
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
  features: string[];
}

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: "swaroop-nagar",
    name: "Joint Clinic",
    type: "clinic",
    tagline: "A Centre of Arthroplasty & Arthroscopy — Evening Specialist OPD",
    address: {
      line1: "7/198-A 4, Anand Bazar",
      area: "Khalasi Lines, Swaroop Nagar",
      city: "Kanpur",
      state: "Uttar Pradesh",
      pincode: "208002",
      full: "7/198-A 4, Anand Bazar, Khalasi Lines, Swaroop Nagar, Kanpur, Uttar Pradesh 208002",
    },
    geo: {
      latitude: 26.4803575,
      longitude: 80.3108834,
    },
    timings: {
      days: "Monday to Saturday",
      hours: "04:00 PM – 07:00 PM",
      badge: "Evening Specialist Clinic",
    },
    phone: "+917309038872",
    phoneDisplay: "+91 73090 38872",
    whatsapp: "917309038872",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.241331358117!2d80.30819031110792!3d26.48017347681141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c39c9d326ac11%3A0xa8cc4c17ce27548a!2sDr.%20Gaurav%20Bhargava%20-%20Best%20Orthopedic%20Doctor%20%7C%20Bone%2C%20Joint%20%26%20Fracture%20Treatment%20in%20Kanpur!5e0!3m2!1sen!2sus!4v1791535691852!5m2!1sen!2sus",
    mapDirectionsUrl:
      "https://www.google.com/maps/place/Dr.+Gaurav+Bhargava+-+Best+Orthopedic+Doctor+%7C+Bone,+Joint+%26+Fracture+Treatment+in+Kanpur/@26.4801735,80.3081903,17z",
    features: [
      "Specialist Joint & Sports Injury Consultations",
      "Comprehensive Digital X-Ray & Diagnostics",
      "Intra-Articular & PRP Injections",
      "Second Opinion Evaluations",
      "Post-Op Follow-Ups",
    ],
  },
  {
    id: "kidwai-nagar",
    name: "Bhargava Medical & Trauma Centre (BMTC)",
    type: "hospital",
    tagline: "Surgical Inpatient Hospital, Modular OT & 24/7 Emergency Trauma Unit",
    address: {
      line1: "30-E, O Block",
      area: "Kidwai Nagar",
      city: "Kanpur",
      state: "Uttar Pradesh",
      pincode: "208023",
      full: "30-E, O Block, Kidwai Nagar, Kanpur, Uttar Pradesh 208023",
    },
    geo: {
      latitude: 26.435421,
      longitude: 80.334185,
    },
    timings: {
      days: "Monday to Saturday",
      hours: "10:00 AM – 02:00 PM (OPD) | 24/7 Emergency",
      badge: "Day OPD & 24/7 Surgical Hospital",
    },
    phone: "+917309038872",
    phoneDisplay: "+91 73090 38872",
    whatsapp: "917309038872",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Bhargava+Medical+and+Trauma+Center+30E+O+Block+Kidwai+Nagar+Kanpur&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapDirectionsUrl:
      "https://maps.google.com/?q=Bhargava+Medical+and+Trauma+Center+30E+O+Block+Kidwai+Nagar+Kanpur",
    features: [
      "Ultra-Clean Laminar Airflow Modular OT",
      "Primary & Revision Total Joint Surgeries",
      "24/7 Emergency Trauma & Fracture Care",
      "ICU & High-Dependency Inpatient Care",
      "In-House Dedicated Orthopedic Physiotherapy",
    ],
  },
];

export const PRIMARY_CONTACT = {
  phone: "+917309038872",
  phoneDisplay: "+91 73090 38872",
  emergencyPhone: "+917309038872",
  emergencyPhoneDisplay: "+91 73090 38872 (24x7)",
  whatsapp: "917309038872",
  email: "care@jointclinic.in",
  instagram: "https://www.instagram.com/jointclinic_dr.gauravbhargava/",
  justdial: "https://www.justdial.com/Kanpur/Dr-Gaurav-Bhargava-Khalasi-Lines/0512PX512-X512-230826172245-T8L3_BZDET",
};
