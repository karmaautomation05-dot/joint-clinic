export interface Treatment {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  shortDesc: string;
  category: "Arthroplasty" | "Arthroscopy" | "Joint Preservation" | "Trauma Care";
  iconName: string;
  heroImage?: string;
  tag: string;
  stats: {
    duration: string;
    hospitalStay: string;
    walkingResumed: string;
    longevity: string;
  };
  overview: string;
  indications: string[];
  techniques: {
    name: string;
    description: string;
  }[];
  recoveryMilestones: {
    timeline: string;
    milestone: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const TREATMENTS: Treatment[] = [
  {
    id: "knee-replacement",
    slug: "total-knee-replacement",
    aliases: ["knee-replacement", "total-knee-replacement"],
    title: "Knee Replacement Surgery",
    shortDesc:
      "Advanced primary, partial, and total knee replacement using high-flexion, long-life implants with walking resumed within 24 hours.",
    category: "Arthroplasty",
    iconName: "Bone",
    tag: "Most Popular",
    stats: {
      duration: "60 - 90 mins",
      hospitalStay: "3 - 4 days",
      walkingResumed: "Within 24 hours",
      longevity: "25 - 30+ Years",
    },
    overview:
      "Dr. Gaurav Bhargava specializes in tissue-sparing Total Knee Replacement (TKR) and Partial Knee Replacement. Designed for patients suffering from end-stage Osteoarthritis (Grade 3 & 4), rheumatoid arthritis, or severe knee deformities, this surgery replaces damaged articular cartilage and bone with high-grade titanium and cross-linked polyethylene components, completely eliminating bone-on-bone friction.",
    indications: [
      "Severe knee pain that limits daily activities (walking, climbing stairs, getting out of chairs)",
      "Moderate or severe knee pain while resting, either day or night",
      "Chronic knee inflammation and swelling that does not improve with rest or medications",
      "Knee deformity — bowing in (varus) or knocking (valgus) of knees",
      "Failure to substantially improve with other treatments such as anti-inflammatory medications, cortisone/lubricant injections, and physical therapy",
    ],
    techniques: [
      {
        name: "Total Knee Replacement (TKR)",
        description:
          "Comprehensive resurfacing of both femoral and tibial articular surfaces, with precise ligament balancing for a natural knee feel.",
      },
      {
        name: "Unicondylar (Partial) Knee Replacement",
        description:
          "Preserves healthy bone, anterior cruciate ligament (ACL), and lateral compartment when arthritis is confined to only the medial side. Quicker recovery and more natural flexion.",
      },
      {
        name: "High-Flexion Implants",
        description:
          "Engineered specifically for Indian lifestyles, accommodating safe deep knee bending, floor sitting, and cross-legged positions.",
      },
      {
        name: "Revision Knee Surgery",
        description:
          "Specialized reconstructive procedure to exchange loosened, infected, or worn implants from surgeries performed decades earlier.",
      },
    ],
    recoveryMilestones: [
      {
        timeline: "Day 1 (Within 24h)",
        milestone: "Assisted standing and initial steps using a walker with physiotherapist guidance.",
      },
      {
        timeline: "Week 1 - 2",
        milestone: "Independent transfers, walking in house with walker, wound dressing checks.",
      },
      {
        timeline: "Week 3 - 6",
        milestone: "Transitioning to a single elbow stick/cane, reaching 90° - 110° flexion, stationary cycling.",
      },
      {
        timeline: "Week 7 - 12",
        milestone: "Unassisted independent walking, resumption of driving and normal outdoor social activities.",
      },
    ],
    faqs: [
      {
        q: "How long do modern knee replacements last?",
        a: "With current high-density cross-linked polyethylene inserts and titanium alloys, over 90-95% of implants continue functioning excellently beyond 25 to 30 years when placed with surgical precision.",
      },
      {
        q: "Is knee replacement surgery painful?",
        a: "Modern peri-operative multi-modal analgesia, adductor canal nerve blocks, and minimally invasive muscle-sparing approaches ensure the post-operative period is comfortable and manageable.",
      },
      {
        q: "When can I climb stairs after knee surgery?",
        a: "You will practice stair climbing with our physiotherapist before discharge from BMTC (usually by Day 3). We teach the 'good leg goes up first, operated leg goes down first' technique.",
      },
    ],
  },
  {
    id: "hip-replacement",
    slug: "hip-replacement",
    aliases: ["hip-replacement", "total-hip-replacement"],
    title: "Hip Replacement Surgery",
    shortDesc:
      "Minimally invasive Total Hip Replacement using ceramic bearings for Avascular Necrosis (AVN) and arthritis, restoring pain-free walking.",
    category: "Arthroplasty",
    iconName: "Activity",
    tag: "Pain-Free Mobility",
    stats: {
      duration: "60 - 80 mins",
      hospitalStay: "3 - 4 days",
      walkingResumed: "Within 24 hours",
      longevity: "25 - 30+ Years",
    },
    overview:
      "Total Hip Arthroplasty (THR) is one of the most successful operations in modern medicine. Dr. Gaurav Bhargava performs uncemented and hybrid hip replacements for conditions like Avascular Necrosis (AVN) of the femoral head (frequently seen in young adults), ankylosing spondylitis, osteoarthritis, and femoral neck fractures.",
    indications: [
      "Avascular Necrosis (AVN) of femoral head (often post-steroid or post-viral)",
      "Severe pain in groin, buttock, or down the thigh on weight-bearing",
      "Hip stiffness preventing shoe-tying, sitting, or striding",
      "Post-traumatic arthritis after previous hip dislocation or fracture",
      "Non-union of femoral neck fractures in active adults",
    ],
    techniques: [
      {
        name: "Uncemented Biological Fixation",
        description:
          "Implants featuring porous titanium coatings into which the patient's own bone naturally integrates, offering lifelong structural stability.",
      },
      {
        name: "Ceramic-on-Ceramic / Poly Bearings",
        description:
          "Ultra-low friction articulating surfaces that virtually eliminate wear particles, ideal for younger, active patients.",
      },
      {
        name: "Bipolar Hemiarthroplasty",
        description:
          "Targeted replacement of only the femoral head in elderly patients with hip fractures, enabling rapid return to walking.",
      },
    ],
    recoveryMilestones: [
      {
        timeline: "Day 1",
        milestone: "Full weight-bearing standing with walker under physical therapy supervision.",
      },
      {
        timeline: "Week 2 - 3",
        milestone: "Wound healed, suture removal, transition to walking stick.",
      },
      {
        timeline: "Week 4 - 6",
        milestone: "Walking without assistance, driving resumed, pain-free sitting.",
      },
    ],
    faqs: [
      {
        q: "What causes Avascular Necrosis (AVN) in Kanpur young adults?",
        a: "AVN occurs when blood supply to the femoral head is interrupted, commonly after trauma, high-dose steroids, or alcohol consumption. In advanced stages 3 and 4, Total Hip Replacement provides permanent pain relief and restores normal gait.",
      },
    ],
  },
  {
    id: "sports-injury-acl",
    slug: "sports-injury-acl-treatment",
    aliases: [
      "arthroscopy-sports-injuries",
      "arthroscopy-sports-injury",
      "sports-injury-acl-treatment",
      "acl-treatment",
      "sports-injury",
      "acl-reconstruction",
    ],
    title: "Sports Injury & ACL Treatment",
    shortDesc:
      "Keyhole surgery for ACL ligament tears, meniscus injuries, and sports knee pain with fast return to active sports and running.",
    category: "Arthroscopy",
    iconName: "ShieldCheck",
    tag: "Keyhole Sports Surgery",
    stats: {
      duration: "45 - 60 mins",
      hospitalStay: "Daycare / 1 day",
      walkingResumed: "Same day / Day 1",
      longevity: "Full Sports Return",
    },
    overview:
      "Arthroscopy is a precision keyhole surgical procedure where an HD camera (arthroscope) and specialized micro-instruments are inserted through small puncture holes. Dr. Gaurav Bhargava has fellowship training in sports medicine and treats recreational athletes, gym enthusiasts, and trauma patients suffering from ligament tears and cartilage damage.",
    indications: [
      "Anterior Cruciate Ligament (ACL) or PCL tear with knee giving way or instability",
      "Meniscus tear causing locking, clicking, and sharp twisting pain",
      "Cartilage defects and loose bodies inside the knee joint",
      "Recurrent patellar (kneecap) dislocation or instability",
    ],
    techniques: [
      {
        name: "Anatomical ACL Reconstruction",
        description:
          "Using autologous hamstring or patellar tendon grafts positioned precisely in the anatomical footprint for maximal rotational stability.",
      },
      {
        name: "Meniscus Repair (Inside-Out & All-Inside)",
        description:
          "Preserving the body's natural shock absorbers through micro-suturing instead of removing the meniscus, preventing early arthritis.",
      },
      {
        name: "Chondroplasty & Microfracture",
        description:
          "Stimulating new fibrocartilage growth in areas of localized cartilage loss.",
      },
    ],
    recoveryMilestones: [
      {
        timeline: "Day 1",
        milestone: "Walking with knee brace and crutches; quadriceps isometric contractions.",
      },
      {
        timeline: "Week 4 - 6",
        milestone: "Full range of motion achieved; stationary cycling started.",
      },
      {
        timeline: "Month 4 - 6",
        milestone: "Jogging, agility drills, sports-specific rehabilitation.",
      },
    ],
    faqs: [
      {
        q: "Do all ACL tears require surgery?",
        a: "In active individuals, young adults, or those who experience knee instability or 'giving way', ACL reconstruction is crucial to prevent long-term meniscal tears and secondary osteoarthritis.",
      },
    ],
  },
  {
    id: "shoulder-arthroscopy",
    slug: "shoulder-arthroscopy",
    aliases: ["shoulder-arthroscopy", "rotator-cuff-repair", "shoulder-treatment"],
    title: "Shoulder & Rotator Cuff Treatment",
    shortDesc:
      "Keyhole surgery for torn rotator cuff tendons, frozen shoulder, and recurrent shoulder dislocation for pain-free arm movement.",
    category: "Arthroscopy",
    iconName: "Award",
    tag: "Keyhole Shoulder Care",
    stats: {
      duration: "45 - 75 mins",
      hospitalStay: "1 day",
      walkingResumed: "Immediate",
      longevity: "Restored Strength",
    },
    overview:
      "Shoulder pain that prevents sleeping on one side, lifting the arm overhead, or causes repeated shoulder pop-outs can be treated with minimally invasive shoulder arthroscopy. Suture anchors fix torn tendons back to bone with minimal muscle disruption.",
    indications: [
      "Rotator cuff tears with weakness and inability to lift arm overhead",
      "Recurrent shoulder dislocations (Bankart lesion / labral tear)",
      "Subacromial impingement causing chronic painful arc syndrome",
      "Refractory frozen shoulder unresponsive to conservative physiotherapy",
    ],
    techniques: [
      {
        name: "Arthroscopic Rotator Cuff Repair",
        description:
          "Double-row or single-row suture anchor fixation of supraspinatus tendon back to its humeral footprint under HD camera visualization.",
      },
      {
        name: "Arthroscopic Bankart Repair",
        description:
          "Re-anchoring the torn glenoid labrum to prevent repeated shoulder pop-outs in active individuals.",
      },
    ],
    recoveryMilestones: [
      {
        timeline: "Weeks 1 - 4",
        milestone: "Protected arm sling, gentle passive pendulum exercises.",
      },
      {
        timeline: "Weeks 5 - 8",
        milestone: "Active-assisted range of motion, rotator cuff strengthening.",
      },
    ],
    faqs: [
      {
        q: "Why does my shoulder ache especially at night?",
        a: "Night pain is the classic symptom of rotator cuff inflammation or tearing, caused by pressure on the subacromial space when lying flat. An MRI helps confirm whether it requires repair or targeted injections.",
      },
    ],
  },
  {
    id: "joint-preservation",
    slug: "joint-preservation-prp",
    aliases: ["joint-preservation", "joint-preservation-prp", "prp-therapy", "arthritis-joint-preservation"],
    title: "PRP Therapy & Joint Pain Care",
    shortDesc:
      "Non-surgical platelet-rich plasma (PRP) and cartilage lubrication injections to relieve joint pain and protect knee cartilage without surgery.",
    category: "Joint Preservation",
    iconName: "HeartPulse",
    tag: "Non-Surgical Joint Care",
    stats: {
      duration: "15 - 30 mins",
      hospitalStay: "OPD Procedure",
      walkingResumed: "Immediate",
      longevity: "6 - 18 Months Relief",
    },
    overview:
      "Not every patient with joint pain needs surgery. Dr. Gaurav Bhargava believes in exhausting all evidence-based joint preservation options for Grade 1 and Grade 2 arthritis. Using biological interventions, we nourish existing cartilage, reduce synovial inflammation, and restore joint fluid lubrication.",
    indications: [
      "Early to moderate knee or shoulder osteoarthritis (Grade 1 & 2)",
      "Patellofemoral chondromalacia in young adults and runners",
      "Chronic tendonitis (Tennis Elbow, Achilles tendinopathy, Plantar Fasciitis)",
      "Patients who wish to delay or prevent future surgical intervention",
    ],
    techniques: [
      {
        name: "Platelet-Rich Plasma (PRP) Therapy",
        description:
          "Concentrated platelets extracted from the patient's own blood, rich in growth factors (PDGF, TGF-beta) that calm inflammation and promote tissue repair.",
      },
      {
        name: "Viscosupplementation (Hyaluronic Acid Injections)",
        description:
          "Injecting high molecular weight hyaluronic acid directly into the joint space to restore natural joint fluid cushion and lubrication.",
      },
      {
        name: "Targeted Rehabilitation & Weight Protocol",
        description:
          "Biomechanical gait correction, quadriceps strengthening, and nutritional counseling (every 1 kg weight lost removes 4 kg pressure per knee step).",
      },
    ],
    recoveryMilestones: [
      {
        timeline: "Day 1",
        milestone: "Normal walking immediately; avoid intense strenuous exercise for 48 hours.",
      },
      {
        timeline: "Week 2 - 4",
        milestone: "Gradual reduction in baseline stiffness and pain; peak effect seen at 4-6 weeks.",
      },
    ],
    faqs: [
      {
        q: "How many PRP sessions are typically needed?",
        a: "Most joint conditions benefit from a cycle of 2 to 3 sessions spaced 3-4 weeks apart, providing significant pain relief for 9 to 18 months when combined with daily strengthening exercises.",
      },
    ],
  },
  {
    id: "trauma-fracture-care",
    slug: "complex-trauma-fractures",
    aliases: ["trauma-fracture-care", "complex-trauma-fractures", "fracture-care"],
    title: "Bone Fracture & Trauma Care",
    shortDesc:
      "24/7 emergency surgical care for bone fractures, road accident injuries, and complex joint trauma at BMTC Kidwai Nagar.",
    category: "Trauma Care",
    iconName: "Stethoscope",
    tag: "24/7 Emergency Care",
    stats: {
      duration: "Case Dependent",
      hospitalStay: "2 - 5 days",
      walkingResumed: "Guided Weight Bearing",
      longevity: "Anatomical Union",
    },
    overview:
      "Backed by the high-acuity trauma and ICU facilities of Bhargava Medical & Trauma Centre (BMTC) in Kidwai Nagar, Dr. Gaurav Bhargava provides 24/7 emergency surgical stabilization for road traffic accidents, high-energy polytrauma, complex fractures near joints, and malunited bones.",
    indications: [
      "Compound and open fractures requiring urgent debridement and stabilization",
      "Intra-articular fractures of tibia, femur, ankle, wrist, or elbow",
      "Pelvic ring and acetabular fractures",
      "Non-union (bones that have failed to heal after previous surgery)",
      "Periprosthetic fractures (fractures occurring around an existing joint implant)",
    ],
    techniques: [
      {
        name: "Minimally Invasive Plate Osteosynthesis (MIPO)",
        description:
          "Inserting anatomical locking plates through small incisions, preserving blood supply to bone fragments for rapid healing.",
      },
      {
        name: "Intramedullary Nailing",
        description:
          "Closed interlocking nails for femur and tibia fractures that permit early load bearing.",
      },
    ],
    recoveryMilestones: [
      {
        timeline: "Week 6 - 8",
        milestone: "Initial radiographic bone union; progressive increase in weight bearing.",
      },
      {
        timeline: "Week 12 - 16",
        milestone: "Solid bony union, full unassisted weight-bearing.",
      },
    ],
    faqs: [
      {
        q: "Where are emergency trauma surgeries performed?",
        a: "All surgical trauma admissions and emergency operations are conducted at Bhargava Medical & Trauma Centre (Kidwai Nagar), which features 24x7 emergency response, modular OTs, and ICU backup.",
      },
    ],
  },
  {
    id: "spine-sciatica-care",
    slug: "spine-sciatica-care",
    aliases: ["spine-care", "spine-sciatica-care", "slip-disc-treatment"],
    title: "Slip Disc & Sciatica Care",
    shortDesc:
      "Evidence-based non-surgical care, targeted nerve blocks, and postural physical therapy for back pain, slip disc, and sciatica.",
    category: "Joint Preservation",
    iconName: "Activity",
    tag: "Non-Surgical Spine Care",
    stats: {
      duration: "OPD / Daycare",
      hospitalStay: "Conservative / 1 day",
      walkingResumed: "Immediate",
      longevity: "Long-Term Relief",
    },
    overview:
      "Spinal health is fundamental to total-body biomechanics and active mobility. Dr. Gaurav Bhargava provides comprehensive evaluation and conservative care for back, neck, and nerve root compression conditions. Using precise diagnosis, MRI correlation, and targeted nerve root therapy, over 90% of spine patients achieve sustained pain relief without invasive surgery.",
    indications: [
      "Sciatica with radiating leg pain, numbness, or tingling",
      "Lumbar disc herniation (slip disc) causing severe low back pain",
      "Cervical spondylosis with neck stiffness and shoulder-arm radiation",
      "Facet joint arthropathy and chronic muscular spasm",
      "Lumbar canal stenosis with claudication pain when walking",
    ],
    techniques: [
      {
        name: "Targeted Epidural & Nerve Root Blocks",
        description:
          "Precision anti-inflammatory injections directed to the compressed nerve root, rapidly calming pain and breaking the inflammatory spasm cycle.",
      },
      {
        name: "Core Stabilization & Postural Rehabilitation",
        description:
          "Targeted physical therapy strengthening the deep transversus abdominis, multifidus, and pelvic stabilizers to unload the lumbar spine.",
      },
      {
        name: "Ergonomic & Spinal Unloading Protocol",
        description:
          "Comprehensive guidance on workstation posture, driving ergonomics, and sleep positioning to prevent recurrent disc flare-ups.",
      },
    ],
    recoveryMilestones: [
      {
        timeline: "Week 1 - 2",
        milestone: "Acute nerve irritation calming, baseline walking resumed.",
      },
      {
        timeline: "Week 3 - 6",
        milestone: "Core endurance reestablished, full unassisted pain-free mobility.",
      },
    ],
    faqs: [
      {
        q: "Does every slipped disc require surgery?",
        a: "No. The vast majority (over 90%) of lumbar disc herniations resolve successfully through dedicated conservative treatment, targeted nerve blocks, and structured physiotherapy.",
      },
    ],
  },
];
