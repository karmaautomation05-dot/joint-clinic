export interface FAQItem {
  q: string;
  a: string;
  category: "General" | "Knee" | "Hip" | "Sports" | "Spine" | "Appointment";
}

export const GENERAL_FAQS: FAQItem[] = [
  {
    category: "General",
    q: "Who is the best orthopedic surgeon in Kanpur for joint replacement?",
    a: "Dr. Gaurav Bhargava is widely recognized as one of the best orthopedic and joint replacement surgeons in Kanpur. He completed his Senior Residency at Maulana Azad Medical College (MAMC) and LNJP Hospital, New Delhi, brings over 20 years of surgical experience, and has treated over 10,000 patients across Uttar Pradesh and Northern India. He specializes in tissue-sparing Total Knee Replacement, Hip Replacement, ACL Arthroscopy, and PRP joint preservation.",
  },
  {
    category: "General",
    q: "Where is Dr. Gaurav Bhargava available for consultation and what are the timings?",
    a: "Dr. Gaurav Bhargava consults at two primary locations in Kanpur: in the evenings (4:00 PM – 7:00 PM, Mon–Sat) at Joint Clinic, Swaroop Nagar (7/198-A Anand Bazar, Khalasi Line); and in the mornings (10:00 AM – 2:00 PM, Mon–Sat) at Bhargava Medical & Trauma Centre (BMTC), Kidwai Nagar (30-E, O Block). Emergency fracture and accident trauma at BMTC operates 24x7. Helpline: +91 73090 38872.",
  },
  {
    category: "General",
    q: "Can I get a second opinion on my MRI or surgery recommendation?",
    a: "Yes, absolutely. Many patients visit Dr. Gaurav Bhargava with existing X-rays or MRI reports for a second opinion. We thoroughly evaluate your imaging to determine whether surgery is genuinely required or if conservative, non-surgical joint preservation (such as PRP biological therapy, joint lubrication gel, and physical therapy) can successfully relieve your pain.",
  },
  {
    category: "Knee",
    q: "How soon after knee replacement surgery can a patient walk?",
    a: "Under Dr. Gaurav Bhargava's rapid recovery muscle-sparing protocol and targeted nerve blocks, patients typically take their very first supported steps with a walker within 24 hours of surgery (Day 1). Most patients walk independently inside the home within 2 weeks and discard walking sticks completely by 4 to 6 weeks.",
  },
  {
    category: "Knee",
    q: "How long do modern knee replacement implants last?",
    a: "With current high-density cross-linked polyethylene inserts and titanium alloys, over 90-95% of modern knee implants continue functioning excellently beyond 25 to 30 years when aligned with surgical precision.",
  },
  {
    category: "Knee",
    q: "What is Robotic Knee Replacement and what are its advantages?",
    a: "Robotic Knee Replacement combines 3D CT digital modeling with real-time robotic boundary guidance during surgery. It allows Dr. Bhargava to achieve sub-millimeter precision in bone cuts, preserve maximum natural bone, balance ligaments dynamically, and reduce post-operative swelling for a faster, more natural recovery.",
  },
  {
    category: "Knee",
    q: "Can knee arthritis pain be treated without surgery?",
    a: "Yes! For mild to moderate (Grade 1 and 2) osteoarthritis, Dr. Bhargava offers non-surgical biological PRP (Platelet-Rich Plasma) injections, hyaluronic acid lubrication cushioning, weight offloading, and targeted quadriceps strengthening, delaying or completely avoiding surgical replacement.",
  },
  {
    category: "Hip",
    q: "What causes Avascular Necrosis (AVN) of the hip in young adults?",
    a: "AVN occurs when blood supply to the femoral head is interrupted, frequently following high-dose corticosteroids (including post-viral recovery), trauma, or alcohol consumption. In early Stages 1 and 2, Dr. Bhargava performs Core Decompression to save the natural hip. In advanced Stages 3 and 4, ceramic Total Hip Replacement permanently ends pain and restores natural walking.",
  },
  {
    category: "Sports",
    q: "How is an ACL ligament tear treated at Joint Clinic?",
    a: "Dr. Gaurav Bhargava performs minimally invasive keyhole (arthroscopic) ACL reconstruction using the patient's own hamstring graft fixed with high-strength titanium cortical buttons through 4mm punctures. Athletes regain full knee stability, starting walking within 24 hours and returning to sports within 6 to 9 months.",
  },
  {
    category: "Spine",
    q: "Can slip disc and sciatica be cured without spine surgery?",
    a: "Yes. Over 90% of slip disc and sciatica patients recover fully without spine surgery through targeted transforaminal nerve blocks, biological disc resorption therapy, core muscle stabilization, and ergonomic posture correction.",
  },
  {
    category: "Appointment",
    q: "How can I book an appointment with Dr. Gaurav Bhargava?",
    a: "You can book an appointment online at https://jointclinic.in/appointment or call/WhatsApp our dedicated clinical care team directly at +91 73090 38872. Walk-ins are also welcome during OPD hours at Swaroop Nagar (4-7 PM) and Kidwai Nagar (10 AM-2 PM).",
  },
];
