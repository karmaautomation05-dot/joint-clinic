export interface VideoTestimonial {
  id: string;
  youtubeId: string;
  patientName: string;
  procedure: string;
  location: string;
  summary: string;
}

export interface ReviewTestimonial {
  id: string;
  author: string;
  source: "Justdial" | "Google Reviews" | "Hospital Feedback";
  rating: number;
  date: string;
  procedure?: string;
  text: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "v-1",
    youtubeId: "4mgxbP_ncj4",
    patientName: "Patient Recovery Story",
    procedure: "Bilateral Total Knee Replacement",
    location: "Kanpur",
    summary:
      "Able to walk smoothly without pain within 3 days post-operation after years of agonizing knee pain and severe bowing deformity.",
  },
  {
    id: "v-2",
    youtubeId: "yNF268Xt33M",
    patientName: "Joint Recovery Journey",
    procedure: "Total Knee Arthroplasty (TKR)",
    location: "Kanpur",
    summary:
      "Patient shares her journey of recovering independent mobility, climbing stairs effortlessly, and returning to daily worship.",
  },
  {
    id: "v-3",
    youtubeId: "MI48Tyb5gaM",
    patientName: "Successful Mobility Restoration",
    procedure: "Knee Replacement Rehabilitation",
    location: "Kanpur",
    summary:
      "Praising Dr. Gaurav Bhargava's meticulous surgical planning and the dedicated post-operative physiotherapy team at BMTC.",
  },
  {
    id: "v-4",
    youtubeId: "CM0CVHi34to",
    patientName: "Pain-Free Living",
    procedure: "Total Hip Replacement",
    location: "Kanpur",
    summary:
      "A young adult suffering from debilitating Avascular Necrosis (AVN) regaining a normal, limp-free stride and active life.",
  },
  {
    id: "v-5",
    youtubeId: "S7I3-adoA14",
    patientName: "Complex Fracture Recovery",
    procedure: "Trauma Reconstruction",
    location: "Kanpur",
    summary:
      "Successful reconstruction of a high-energy peri-articular fracture, restoring full joint range of motion.",
  },
  {
    id: "v-6",
    youtubeId: "vk8cgzwskp0",
    patientName: "Arthroscopy Case Study",
    procedure: "ACL Reconstruction & Meniscus Repair",
    location: "Kanpur",
    summary:
      "Rapid return to active fitness after keyhole ligament reconstruction with minimal scars and quick stability recovery.",
  },
];

export const PATIENT_REVIEWS: ReviewTestimonial[] = [
  {
    id: "r-1",
    author: "Shashi Tiwari",
    source: "Google Reviews",
    rating: 5,
    date: "July 2024",
    procedure: "Total Knee Replacement",
    text: "I was admitted at Bhargava Medical Trauma Center for knee surgery and am very satisfied with the hospital staff care and treatment. Special thanks to Dr. Gaurav Bhargava sir for his treatment during the hospital course. He is truly the best orthopedic surgeon in Kanpur.",
  },
  {
    id: "r-2",
    author: "Ravi Shankar Agarwal",
    source: "Justdial",
    rating: 5,
    date: "Verified Patient",
    procedure: "Bilateral Knee Arthroplasty",
    text: "Dr. Gaurav Bhargava explained the entire knee replacement procedure so clearly that our family's fear vanished. My mother was standing on Day 2 and now walks in the garden every morning without any stick. Delhi-standard treatment right in Kanpur!",
  },
  {
    id: "r-3",
    author: "Amitabh Srivastava",
    source: "Justdial",
    rating: 5,
    date: "Verified Patient",
    procedure: "ACL Reconstruction (Keyhole)",
    text: "Injured my knee while playing badminton. Dr. Bhargava diagnosed the ACL and meniscus tear accurately on MRI and did arthroscopic keyhole surgery. Recovery was smooth and I am back to my daily routine without any wobble or giving way.",
  },
  {
    id: "r-4",
    author: "Pooja Mehrotra",
    source: "Hospital Feedback",
    rating: 5,
    date: "March 2024",
    procedure: "Joint Preservation & PRP",
    text: "Visited his clinic in Swaroop Nagar for early knee arthritis. Other doctors immediately pushed for surgery, but Dr. Gaurav gave me honest advice and started PRP therapy along with muscle exercises. My pain reduced by 85% without surgery.",
  },
  {
    id: "r-5",
    author: "Uddhav Bhalla",
    source: "Google Reviews",
    rating: 5,
    date: "Verified Patient",
    procedure: "Orthopedic Consultation",
    text: "One of the most polite and brilliant doctors in Kanpur. Gives ample time to listen, reviews X-rays carefully, and prescribes only what is necessary.",
  },
];
