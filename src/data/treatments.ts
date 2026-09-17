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


export interface TreatmentItem {
  id: string;
  name: string;
  shortDesc: string;
  whenNeeded: string;
  howHelps: string;
  recovery: string;
  slug: string;
  badge?: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  items: TreatmentItem[];
}

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  {
    id: "knee-care",
    name: "Knee Care & Surgery",
    tagline: "Restore smooth, pain-free walking and active mobility",
    description:
      "From preventive cartilage protection and keyhole repairs to modern high-flexion knee replacements that let you walk on the very next day.",
    iconName: "Bone",
    items: [
      {
        id: "total-knee-replacement",
        name: "Total Knee Replacement (TKR)",
        shortDesc: "The gold-standard surgery to completely end severe knee pain and straighten bowed legs.",
        whenNeeded: "When severe knee arthritis makes walking, climbing stairs, or sleeping painful despite medicines.",
        howHelps: "Replaces worn joint surfaces with polished, long-lasting implants designed to last 25 to 30+ years.",
        recovery: "Walking starts within 24 hours with a walker; independent walking in 4 to 6 weeks.",
        slug: "total-knee-replacement",
        badge: "Most Popular",
      },
      {
        id: "robotic-knee-replacement",
        name: "Robotic Knee Replacement",
        shortDesc: "Computer and robotic-guided knee surgery for pinpoint millimeter accuracy and faster healing.",
        whenNeeded: "For patients desiring customized implant fit, minimal tissue trauma, and a completely natural knee feel.",
        howHelps: "Uses 3D digital planning to preserve maximum natural bone and healthy ligaments.",
        recovery: "Less post-operative swelling and quicker return to unassisted walking.",
        slug: "total-knee-replacement",
        badge: "High Precision",
      },
      {
        id: "partial-knee-replacement",
        name: "Partial Knee Replacement",
        shortDesc: "Replacing only the damaged inner half of your knee while keeping your natural ligaments intact.",
        whenNeeded: "When arthritis affects only one side of the knee and the rest of the joint is completely healthy.",
        howHelps: "Requires a smaller incision, preserves the ACL, and delivers a completely natural knee bend.",
        recovery: "Shorter hospital stay (1–2 days) and faster recovery than full replacement.",
        slug: "total-knee-replacement",
        badge: "Minimally Invasive",
      },
      {
        id: "knee-arthroscopy-meniscus",
        name: "Knee Keyhole Surgery (Arthroscopy & Meniscus)",
        shortDesc: "Tiny 4mm keyhole procedure to repair torn knee cushion (meniscus) and clean loose cartilage.",
        whenNeeded: "When the knee locks, catches, clicks, or swells after a sudden twist or sports strain.",
        howHelps: "Repairs the natural shock absorbers of the knee without opening the entire joint.",
        recovery: "Home on the same day or next day; back to normal walking within days.",
        slug: "sports-injury-acl-treatment",
        badge: "Keyhole",
      },
    ],
  },
  {
    id: "hip-care",
    name: "Hip Care & Surgery",
    tagline: "End groin pain and regain easy, comfortable walking",
    description:
      "Specialized solutions for Avascular Necrosis (AVN), hip stiffness, and arthritis using modern ceramic implants and joint-preserving techniques.",
    iconName: "Activity",
    items: [
      {
        id: "total-hip-replacement",
        name: "Total Hip Replacement (THR)",
        shortDesc: "Replaces a damaged hip joint with ultra-smooth ceramic bearings for lifelong, pain-free walking.",
        whenNeeded: "For severe hip arthritis, advanced AVN, or hip fractures causing a limp and difficulty putting on shoes.",
        howHelps: "Eliminates deep groin pain and restores full hip motion so you can walk, sit, and drive normally.",
        recovery: "Standing on Day 1; unassisted confident walking within 4 to 6 weeks.",
        slug: "hip-replacement",
        badge: "High Longevity",
      },
      {
        id: "avn-hip-treatment",
        name: "AVN Hip Treatment (Avascular Necrosis)",
        shortDesc: "Specialized care for reduced blood flow to the hip bone, common in young adults and post-steroid use.",
        whenNeeded: "When you feel deep groin or thigh pain while walking or standing, especially if diagnosed early on MRI.",
        howHelps: "Combines early core decompression to restore blood flow or modern ceramic replacement in advanced stages.",
        recovery: "Targeted rehabilitation protocol customized to your exact AVN stage.",
        slug: "hip-replacement",
        badge: "Specialized Focus",
      },
      {
        id: "hip-preservation",
        name: "Hip Preservation & Core Decompression",
        shortDesc: "Early-stage procedure to relieve bone pressure and stimulate fresh blood flow into the hip head.",
        whenNeeded: "In Stage 1 and Stage 2 AVN before the bone shape collapses, aiming to save your natural hip.",
        howHelps: "Drills tiny decompression channels and delivers healing growth factors to prevent hip replacement.",
        recovery: "Protected crutch walking for a few weeks while natural bone regeneration occurs.",
        slug: "hip-replacement",
        badge: "Natural Joint Saver",
      },
    ],
  },
  {
    id: "sports-injury",
    name: "Sports Injury & Arthroscopy",
    tagline: "Get back on the field, court, and gym with confidence",
    description:
      "Expert keyhole surgery and sports rehabilitation for torn ligaments, unstable knees, and athletic injuries.",
    iconName: "ShieldCheck",
    items: [
      {
        id: "acl-reconstruction",
        name: "ACL Ligament Reconstruction",
        shortDesc: "Keyhole reconstruction of the torn anterior cruciate ligament using your body's own natural tendon.",
        whenNeeded: "When your knee pops or 'gives way' during sports, running, or sudden turning.",
        howHelps: "Restores 100% knee stability, protecting your meniscus and preventing premature arthritis.",
        recovery: "Walking with a brace on Day 1; running in 3 to 4 months; full sports return in 6 to 9 months.",
        slug: "sports-injury-acl-treatment",
        badge: "Athletic Recovery",
      },
      {
        id: "pcl-multi-ligament",
        name: "PCL & Multi-Ligament Tear Repair",
        shortDesc: "Advanced keyhole reconstruction for complex knee injuries involving multiple damaged ligaments.",
        whenNeeded: "Following bike accidents or heavy sports impacts causing severe knee looseness or backward sagging.",
        howHelps: "Rebuilds knee alignment and multi-directional stability with anatomical graft placement.",
        recovery: "Supervised structured physical therapy to steadily regain full motion and quad strength.",
        slug: "sports-injury-acl-treatment",
        badge: "Complex Reconstructive",
      },
      {
        id: "meniscus-repair",
        name: "Meniscus Repair (Keyhole)",
        shortDesc: "Micro-suturing torn cartilage cushions instead of removing them, preserving natural knee cushioning.",
        whenNeeded: "When twisting causes sharp joint line pain, swelling, or catching.",
        howHelps: "Saves your natural cartilage cushion to maintain shock absorption for life.",
        recovery: "Daycare or 1-day stay; gradual return to sports over 8 to 12 weeks.",
        slug: "sports-injury-acl-treatment",
        badge: "Cartilage Saver",
      },
      {
        id: "ankle-sports-rehab",
        name: "Ankle Sprain & Sports Rehabilitation",
        shortDesc: "Targeted treatment for recurrent ankle sprains, Achilles tendon pain, and sports muscle tears.",
        whenNeeded: "After twisting an ankle that stays painful, weak, or swells repeatedly during walking.",
        howHelps: "Ligament strengthening, balance training, and non-surgical stabilization.",
        recovery: "Fast functional recovery with personalized athletic return-to-play protocols.",
        slug: "sports-injury-acl-treatment",
        badge: "Active Fitness",
      },
    ],
  },
  {
    id: "shoulder-care",
    name: "Shoulder & Arm Care",
    tagline: "Relieve shoulder pain, lift your arm freely, and sleep peacefully",
    description:
      "Comprehensive keyhole treatments for torn shoulder tendons, stiff frozen shoulders, and repeated dislocations.",
    iconName: "Award",
    items: [
      {
        id: "rotator-cuff-repair",
        name: "Rotator Cuff Tear Repair",
        shortDesc: "Keyhole repair of torn shoulder lifting tendons using dissolvable micro-anchors.",
        whenNeeded: "When you have sharp night pain and cannot lift your arm to comb hair or reach overhead.",
        howHelps: "Reattaches the torn tendon firmly back to bone, restoring arm strength and ending sleepless nights.",
        recovery: "Arm supported in a sling for a few weeks, followed by guided movement exercises.",
        slug: "shoulder-arthroscopy",
        badge: "Keyhole Precision",
      },
      {
        id: "frozen-shoulder-care",
        name: "Frozen Shoulder Treatment",
        shortDesc: "Targeted therapy and gentle keyhole release to free up stiff, locked shoulder joints.",
        whenNeeded: "When your shoulder has become extremely tight, painful, and frozen in all directions.",
        howHelps: "Calms inflammation with targeted injections and safely expands the tight joint capsule.",
        recovery: "Immediate improvement in comfortable range of motion with home stretches.",
        slug: "shoulder-arthroscopy",
        badge: "Mobility Restorer",
      },
      {
        id: "shoulder-dislocation-bankart",
        name: "Shoulder Dislocation Care (Bankart Repair)",
        shortDesc: "Keyhole stabilization for shoulders that repeatedly pop out of their socket.",
        whenNeeded: "After an initial shoulder dislocation that leaves the joint loose, insecure, or slipping out.",
        howHelps: "Re-anchors the torn joint rim (labrum) firmly to keep the shoulder permanently in place.",
        recovery: "Full confidence in lifting and overhead arm movement restored.",
        slug: "shoulder-arthroscopy",
        badge: "Stability Care",
      },
      {
        id: "tennis-elbow-care",
        name: "Tennis Elbow & Arm Pain Care",
        shortDesc: "Proven non-surgical relief and healing injections for stubborn outer elbow and forearm pain.",
        whenNeeded: "Pain when gripping, lifting a bag, shaking hands, or using a computer mouse.",
        howHelps: "PRP biological therapy and forearm tendon offloading to heal micro-tears naturally.",
        recovery: "Gradual reduction in pain within 2 to 4 weeks without surgery.",
        slug: "joint-preservation-prp",
        badge: "Non-Surgical",
      },
    ],
  },
  {
    id: "spine-care",
    name: "Spine & Sciatica Care",
    tagline: "Evidence-based non-surgical relief for back, neck, and nerve pain",
    description:
      "Over 90% of spine and sciatica issues can be cured without surgery using targeted nerve therapy, posture correction, and medical decompression.",
    iconName: "Activity",
    items: [
      {
        id: "slip-disc-treatment",
        name: "Slip Disc Treatment (Herniated Disc)",
        shortDesc: "Non-surgical decompression and targeted nerve therapy for bulging and slipped spinal discs.",
        whenNeeded: "When sudden back pain catches you while bending, sitting, or lifting weights.",
        howHelps: "Relieves pressure on pinched spinal nerves, calms muscle spasms, and restores spinal flexibility.",
        recovery: "Acute pain eases within days; core physical therapy protects against future flare-ups.",
        slug: "spine-sciatica-care",
        badge: "Non-Surgical Focus",
      },
      {
        id: "sciatica-nerve-relief",
        name: "Sciatica Nerve Pain Relief",
        shortDesc: "Targeted treatment for sharp, burning pain traveling from the lower back down the leg.",
        whenNeeded: "When electric shock-like sensations, tingling, or numbness shoot into your buttock, thigh, or foot.",
        howHelps: "Soothes the irritated sciatic nerve root using precision medication and targeted injections.",
        recovery: "Rapid relief in walking distance and comfortable sitting.",
        slug: "spine-sciatica-care",
        badge: "Fast Pain Relief",
      },
      {
        id: "cervical-spondylosis",
        name: "Cervical Spondylosis (Neck Pain)",
        shortDesc: "Relief for neck stiffness, shoulder blade aching, and arm tingling from desk work or age wear.",
        whenNeeded: "When prolonged phone or laptop use triggers neck tightness, headaches, or finger numbness.",
        howHelps: "Ergonomic alignment, cervical decompression stretches, and deep nerve calming therapy.",
        recovery: "Relief with simple daily neck posture habits and guided exercises.",
        slug: "spine-sciatica-care",
        badge: "Posture Care",
      },
      {
        id: "spine-injections",
        name: "Targeted Spine Nerve Blocks",
        shortDesc: "Safe, outpatient anti-inflammatory injections delivered directly near irritated spinal nerves.",
        whenNeeded: "When severe disc pain or sciatica does not settle with oral painkillers and rest.",
        howHelps: "Instantly calms nerve swelling, breaks the severe spasm cycle, and avoids spinal surgery.",
        recovery: "Walk out within 30 minutes; noticeable pain reduction within 24 to 48 hours.",
        slug: "spine-sciatica-care",
        badge: "Quick Outpatient",
      },
    ],
  },
  {
    id: "non-surgical",
    name: "Non-Surgical Joint Care & PRP",
    tagline: "Protect your natural cartilage and delay or avoid surgery",
    description:
      "Regenerative biological injections, joint fluid lubrication, and lifestyle plans for early to moderate joint pain.",
    iconName: "HeartPulse",
    items: [
      {
        id: "prp-therapy",
        name: "PRP Therapy (Platelet-Rich Plasma)",
        shortDesc: "Using concentrated healing factors from your own blood to calm joint inflammation and nourish cartilage.",
        whenNeeded: "For mild-to-moderate knee pain, morning stiffness, or tendonitis where you want to avoid surgery.",
        howHelps: "Natural, drug-free biological injection that soothes joint lining and supports tissue health.",
        recovery: "Walk home immediately after the 20-minute procedure; benefits build over 3 to 6 weeks.",
        slug: "joint-preservation-prp",
        badge: "100% Natural",
      },
      {
        id: "hyaluronic-injections",
        name: "Joint Lubrication Injections (Gel)",
        shortDesc: "Supplying natural cushioning fluid directly inside the knee joint to reduce grating and stiffness.",
        whenNeeded: "When your knees feel dry, creaky, or rub uncomfortably when climbing stairs.",
        howHelps: "Acts like clean shock-absorbing fluid, smoothing knee movement and easing daily walks.",
        recovery: "Zero downtime; immediate return to everyday routine.",
        slug: "joint-preservation-prp",
        badge: "Cartilage Cushion",
      },
      {
        id: "arthritis-prevention",
        name: "Arthritis & Cartilage Protection",
        shortDesc: "Comprehensive joint preservation plan combining weight offloading, knee exercises, and nutrition.",
        whenNeeded: "At the first sign of knee pain in your 40s or 50s to keep your joints healthy for decades.",
        howHelps: "Every 1 kg of body weight lost takes 4 kg of pressure off your knees with every single step.",
        recovery: "Ongoing joint comfort and active lifestyle preservation.",
        slug: "joint-preservation-prp",
        badge: "Preventive Care",
      },
      {
        id: "heel-pain-plantar",
        name: "Heel Pain Care (Plantar Fasciitis)",
        shortDesc: "Fast, effective relief for stabbing morning heel pain when you take your very first steps.",
        whenNeeded: "Sharp heel pain upon waking up or standing up after sitting for a while.",
        howHelps: "Stretching regimens, custom foot orthotics, and localized healing injections.",
        recovery: "Quick morning comfort with proper footwear and simple calf stretches.",
        slug: "joint-preservation-prp",
        badge: "Everyday Relief",
      },
    ],
  },
  {
    id: "fractures-trauma",
    name: "Bone Fractures & 24/7 Trauma Care",
    tagline: "Round-the-clock emergency bone and accident care at BMTC Kidwai Nagar",
    description:
      "Full surgical and non-surgical fracture care with modular OTs, emergency casualty, digital X-rays, and in-house recovery.",
    iconName: "Stethoscope",
    items: [
      {
        id: "bone-fracture-care",
        name: "Bone Fracture Plaster & Alignment",
        shortDesc: "Accurate diagnosis and non-surgical casting or surgical alignment for broken bones of all ages.",
        whenNeeded: "Following falls, slips, or sports impacts causing sudden bone swelling, pain, or deformity.",
        howHelps: "Ensures broken bones heal in their exact anatomical position so limbs function perfectly.",
        recovery: "Regular X-ray monitoring until solid bone union is achieved.",
        slug: "complex-trauma-fractures",
        badge: "Essential Care",
      },
      {
        id: "rod-plate-fixation",
        name: "Plate & Rod Bone Fixation (Nailing/Plating)",
        shortDesc: "Modern titanium plates, screws, and interlocking rods to hold complex broken bones securely.",
        whenNeeded: "For displaced fractures of thigh, leg, arm, or collarbone that cannot heal safely in plaster.",
        howHelps: "Provides immediate internal rigidity, allowing earlier limb movement and preventing joint stiffness.",
        recovery: "Supported early mobilization tailored to the specific fracture type.",
        slug: "complex-trauma-fractures",
        badge: "Surgical Precision",
      },
      {
        id: "old-fracture-nonunion",
        name: "Old Fracture & Non-Union Surgery",
        shortDesc: "Corrective treatment for broken bones that failed to heal properly after earlier treatment elsewhere.",
        whenNeeded: "When a past fracture remains painful, mobile, or has healed crookedly (malunion).",
        howHelps: "Cleans scar tissue, uses bone grafting, and applies stable modern fixation to restart healing.",
        recovery: "Restores normal limb shape and strength under expert follow-up.",
        slug: "complex-trauma-fractures",
        badge: "Corrective Specialist",
      },
      {
        id: "emergency-accident-trauma",
        name: "24/7 Emergency Accident Trauma (BMTC)",
        shortDesc: "Immediate emergency response for road traffic accidents, complex injuries, and pelvic trauma.",
        whenNeeded: "Any acute trauma emergency occurring day or night in Kanpur and surrounding areas.",
        howHelps: "Full hospital backup with modular clean OTs, high-dependency ICU, and experienced trauma teams.",
        recovery: "Comprehensive inpatient rehabilitation from day one until complete recovery.",
        slug: "complex-trauma-fractures",
        badge: "24/7 Available",
      },
    ],
  },
];
