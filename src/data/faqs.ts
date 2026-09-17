export interface FAQItem {
  q: string;
  a: string;
  category: "General" | "Knee" | "Hip" | "Appointment";
}

export const GENERAL_FAQS: FAQItem[] = [
  {
    category: "General",
    q: "Where is Dr. Gaurav Bhargava available for consultation?",
    a: "Dr. Gaurav Bhargava consults at two primary locations in Kanpur: in the evenings (5:00 PM – 7:00 PM, Mon–Sat) at Joint Clinic, Swaroop Nagar (7/198-A Anand Bazar, Khalasi Line); and in the mornings (10:00 AM – 2:00 PM, Mon–Sat) at Bhargava Medical & Trauma Centre (BMTC), Kidwai Nagar (30-E, O Block). Emergency trauma services at BMTC operate 24x7.",
  },
  {
    category: "General",
    q: "Can I get a second opinion on my MRI or surgery recommendation?",
    a: "Yes, absolutely. Many patients visit Dr. Gaurav Bhargava with existing X-rays or MRI reports for a second opinion. We will review your imaging to confirm whether surgical intervention is genuinely indicated or if conservative, non-surgical joint preservation (such as PRP therapy, targeted medications, and physical therapy) is suitable.",
  },
  {
    category: "Knee",
    q: "How do I know if I need a Total Knee Replacement vs. conservative treatment?",
    a: "Joint replacement is recommended when end-stage (Grade 3 or 4) osteoarthritis has completely eroded joint cartilage, causing constant bone-on-bone pain, visible limb deformity (bowing), and severe limitation of everyday activities despite non-surgical treatments. For milder stages, we emphasize cartilage preservation.",
  },
  {
    category: "Knee",
    q: "How soon after knee replacement will I be able to walk?",
    a: "Under our rapid recovery protocol, patients typically take their first guided steps with a walker within 24 hours of surgery. Independent walking inside the home is generally achieved within 1 to 2 weeks, and unassisted walking without any cane occurs by 4 to 6 weeks.",
  },
  {
    category: "Hip",
    q: "What causes Avascular Necrosis (AVN) of the hip in young adults?",
    a: "AVN occurs when the blood supply to the head of the thigh bone (femoral head) is impaired, leading to bone collapse. Common causes in northern India include previous high-dose corticosteroid usage, trauma, and heavy alcohol use. In advanced AVN, uncemented Total Hip Replacement restores full, pain-free mobility.",
  },
  {
    category: "Appointment",
    q: "What documents should I bring to my first appointment?",
    a: "Please bring any recent X-rays, MRI scans, CT reports, past blood tests, discharge summaries from prior surgeries, and a list of current medications you are taking. Having physical films or digital DICOM files helps Dr. Bhargava make an accurate immediate diagnosis.",
  },
];
