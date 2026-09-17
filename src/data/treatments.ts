export interface Treatment {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  shortDesc: string;
  category: string;
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
  // 1. Total Knee Replacement
  {
    id: "total-knee-replacement",
    slug: "total-knee-replacement",
    aliases: ["knee-replacement"],
    title: "Total Knee Replacement (TKR)",
    shortDesc: "The gold-standard surgery to completely end severe knee pain and straighten bowed legs with long-life implants.",
    category: "Arthroplasty",
    iconName: "Bone",
    tag: "Most Popular",
    stats: {
      duration: "60 - 90 mins",
      hospitalStay: "3 - 4 days",
      walkingResumed: "Within 24 hours",
      longevity: "25 - 30+ Years",
    },
    overview: "Dr. Gaurav Bhargava specializes in tissue-sparing Total Knee Replacement (TKR). Designed for patients suffering from end-stage Osteoarthritis (Grade 3 & 4), rheumatoid arthritis, or severe knee deformities, this surgery replaces damaged joint surfaces with high-grade titanium and cross-linked polyethylene components, completely eliminating bone-on-bone friction.",
    indications: [
      "Severe knee pain limiting walking, stairs, or getting out of chairs",
      "Resting pain day or night that disrupts sleep",
      "Bowing inward or outward of the legs (varus/valgus deformity)",
      "Creaking, grinding, and swelling that does not respond to medicines or exercises",
    ],
    techniques: [
      {
        name: "Sub-Millimeter Anatomical Alignment",
        description: "Precise bone cuts and customized ligament tensioning so the knee bends naturally and feels secure.",
      },
      {
        name: "High-Flexion Implants",
        description: "Modern designs accommodating safe deep bending suited for Indian lifestyle habits.",
      },
      {
        name: "Tissue-Sparing Muscle Preservation",
        description: "Minimizes muscle cutting, resulting in dramatically less post-operative soreness and faster steps.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Standing and walking short steps with a walker alongside the physiotherapist." },
      { timeline: "Week 2 - 3", milestone: "Wound inspection, comfortable indoor walking, stepping onto a single cane." },
      { timeline: "Week 4 - 6", milestone: "Walking independently without sticks, knee bending past 100 degrees." },
      { timeline: "Week 7 - 12", milestone: "Driving, social outings, painless long walks, and stair climbing." },
    ],
    faqs: [
      {
        q: "How long do modern knee replacements last?",
        a: "Modern cross-linked polyethylene inserts and titanium alloys function excellently beyond 25 to 30 years when placed with surgical precision.",
      },
      {
        q: "Is walking on Day 1 safe?",
        a: "Yes! Modern nerve blocks and muscle-sparing approaches ensure you are comfortable, and early walking actively prevents stiffness and blood clots.",
      },
    ],
  },

  // 2. Robotic Knee Replacement
  {
    id: "robotic-knee-replacement",
    slug: "robotic-knee-replacement",
    aliases: ["robotic-tkr", "robotic-knee-surgery"],
    title: "Robotic Knee Replacement",
    shortDesc: "Computer and robotic-guided knee surgery for pinpoint millimeter accuracy, less soft tissue trauma, and natural knee movement.",
    category: "Arthroplasty",
    iconName: "Bone",
    tag: "High Precision",
    stats: {
      duration: "60 - 75 mins",
      hospitalStay: "2 - 3 days",
      walkingResumed: "Within 24 hours",
      longevity: "30+ Years",
    },
    overview: "Robotic Knee Replacement combines 3D CT-based pre-operative modeling with real-time robotic boundary guidance in the operating room. Dr. Gaurav Bhargava plans bone cuts to sub-millimeter precision, preserving critical soft tissues and healthy bone contours for the most natural-feeling artificial knee possible.",
    indications: [
      "Severe knee arthritis with complex anatomical variations or past fractures",
      "Patients desiring maximum implant longevity and precise personalized fit",
      "Active individuals wishing to minimize muscle trauma and recovery time",
    ],
    techniques: [
      {
        name: "3D CT Pre-Planning",
        description: "A customized 3D map of your knee anatomy is created before surgery to select the exact implant size and angle.",
      },
      {
        name: "Robotic Arm Boundary Guidance",
        description: "The robotic tool stays strictly within pre-defined safe zones, protecting collateral ligaments and blood vessels.",
      },
      {
        name: "Dynamic Intra-Operative Balancing",
        description: "Real-time sensors verify tension throughout the entire bend arc before final implant placement.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Taking smooth assisted steps with minimal joint swelling." },
      { timeline: "Week 2", milestone: "Full extension and early 90° flexion with minimal analgesic need." },
      { timeline: "Week 4", milestone: "Comfortable independent walking and gentle stationary cycling." },
    ],
    faqs: [
      {
        q: "Does the robot perform the surgery autonomously?",
        a: "No. Dr. Gaurav Bhargava performs and controls the entire surgery. The robotic system acts as a high-precision digital guide to ensure zero error.",
      },
    ],
  },

  // 3. Partial Knee Replacement
  {
    id: "partial-knee-replacement",
    slug: "partial-knee-replacement",
    aliases: ["unicondylar-knee-replacement", "half-knee-replacement"],
    title: "Partial Knee Replacement (Unicondylar)",
    shortDesc: "Replacing only the worn-out inner compartment of the knee while preserving 100% of your natural ligaments and healthy bone.",
    category: "Arthroplasty",
    iconName: "Bone",
    tag: "Minimally Invasive",
    stats: {
      duration: "45 - 60 mins",
      hospitalStay: "1 - 2 days",
      walkingResumed: "Same day / Day 1",
      longevity: "20 - 25 Years",
    },
    overview: "When arthritis is confined solely to the inside (medial) compartment of the knee, replacing the whole joint is unnecessary. In Partial Knee Replacement (UKA), Dr. Gaurav Bhargava resurfaces only the worn half. Crucially, both the Anterior Cruciate Ligament (ACL) and Posterior Cruciate Ligament (PCL) are kept intact, giving the knee a completely natural proprioceptive feel.",
    indications: [
      "Pain strictly localized to the inner side of the knee during walking",
      "X-rays showing preserved outer joint space and intact kneecap cartilage",
      "Knee remains reasonably straight without severe contractures",
    ],
    techniques: [
      {
        name: "Mini-Incision Approach",
        description: "Smaller surgical exposure that leaves the quadriceps tendon and patella undisturbed.",
      },
      {
        name: "Ligament-Preserving Resurfacing",
        description: "Retains all four major knee ligaments so the joint moves with natural speed and balance.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Walking same day with minimal assistance; knee bends past 90 degrees." },
      { timeline: "Week 2 - 3", milestone: "Walking without canes inside the home; driving resumed." },
      { timeline: "Week 6", milestone: "Full normal daily activities and low-impact sports like swimming and golf." },
    ],
    faqs: [
      {
        q: "Can a partial knee replacement be converted to a total knee replacement later?",
        a: "Yes. If arthritis ever develops in the other compartments decades later, it can be easily converted to a standard total knee replacement.",
      },
    ],
  },

  // 4. Knee Keyhole Surgery (Meniscus & Cartilage)
  {
    id: "knee-keyhole-meniscus",
    slug: "knee-keyhole-meniscus",
    aliases: ["knee-arthroscopy", "knee-meniscus-surgery"],
    title: "Knee Keyhole Surgery (Arthroscopy & Meniscus)",
    shortDesc: "Tiny 4mm keyhole procedure to repair torn meniscus cushions, remove loose cartilage, and smooth joint movement.",
    category: "Arthroscopy",
    iconName: "Bone",
    tag: "Keyhole Procedure",
    stats: {
      duration: "30 - 45 mins",
      hospitalStay: "Daycare / 1 day",
      walkingResumed: "Within hours",
      longevity: "Joint Preserving",
    },
    overview: "Knee Arthroscopy allows Dr. Gaurav Bhargava to inspect and treat inside the joint using a high-definition miniature camera and pencil-thin instruments through tiny 4mm keyholes. Torn meniscus tissue is repaired or neatly contoured, loose cartilage fragments are washed out, and painful joint catching is resolved with near-zero downtime.",
    indications: [
      "Sharp twisting knee pain followed by clicking or mechanical locking",
      "Swelling after minor sports twists or kneeling in middle-aged adults",
      "Persistent joint line tenderness not settling with conservative therapy",
    ],
    techniques: [
      {
        name: "All-Inside Meniscus Suturing",
        description: "Deploys specialized dissolvable micro-implants to suture cartilage tears without open incisions.",
      },
      {
        name: "Chondroplasty & Joint Lavage",
        description: "Gently smooths frayed cartilage edges and clears inflammatory debris from the joint cavity.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Discharged home walking with partial or full weight bearing." },
      { timeline: "Week 1 - 2", milestone: "Stitches removed, swelling clears, normal daily walking resumed." },
      { timeline: "Week 4 - 6", milestone: "Full return to gym, jogging, and recreational sports." },
    ],
    faqs: [
      {
        q: "Will I need a plaster cast after keyhole surgery?",
        a: "No plaster cast is needed. Only small waterproof band-aids over the 4mm entry points, allowing immediate gentle bending.",
      },
    ],
  },

  // 5. Total Hip Replacement
  {
    id: "hip-replacement",
    slug: "hip-replacement",
    aliases: ["total-hip-replacement", "hip-arthroplasty"],
    title: "Total Hip Replacement (THR)",
    shortDesc: "Replaces damaged hip ball and socket with ultra-smooth ceramic bearings for lifelong, pain-free walking and flexibility.",
    category: "Arthroplasty",
    iconName: "Activity",
    tag: "High Longevity",
    stats: {
      duration: "60 - 80 mins",
      hospitalStay: "3 - 4 days",
      walkingResumed: "Within 24 hours",
      longevity: "25 - 30+ Years",
    },
    overview: "Total Hip Replacement is recognized worldwide as one of the most transformative surgeries in orthopedics. Dr. Gaurav Bhargava utilizes uncemented titanium stems and ceramic-on-ceramic or cross-linked polyethylene articulations. The damaged femoral head and worn acetabular cup are replaced, immediately ending chronic groin grinding and restoring a smooth, balanced walking stride.",
    indications: [
      "Avascular Necrosis (AVN) of femoral head (Stage 3 & 4)",
      "Severe osteoarthritis or rheumatoid arthritis of the hip",
      "Severe groin pain, limp, and inability to wear shoes or cross legs",
      "Femoral neck fractures in active adults",
    ],
    techniques: [
      {
        name: "Uncemented Porous Titanium Fixation",
        description: "Bone cells naturally grow directly into the implant surface, creating lifelong biological bonding.",
      },
      {
        name: "Ceramic-on-Poly Bearings",
        description: "Provides ultra-smooth rotation with virtually zero wear particles, ideal for decades of active walking.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Standing and walking with a walker; deep groin pain is already gone." },
      { timeline: "Week 2 - 3", milestone: "Wound inspection, transitioning to a light walking stick." },
      { timeline: "Week 4 - 6", milestone: "Walking independently, driving cars, comfortable sitting on firm chairs." },
    ],
    faqs: [
      {
        q: "Why is hip replacement so popular for AVN?",
        a: "AVN causes the round femoral head to collapse, causing severe groin pain. Modern ceramic hip replacement completely fixes the joint geometry, allowing patients to resume pain-free work and travel.",
      },
    ],
  },

  // 6. AVN Hip Treatment
  {
    id: "avn-hip-treatment",
    slug: "avn-hip-treatment",
    aliases: ["avascular-necrosis-hip", "avn-femoral-head"],
    title: "AVN Hip Treatment (Avascular Necrosis)",
    shortDesc: "Comprehensive staged care for reduced blood flow to the hip head, from early joint preservation to advanced ceramic replacement.",
    category: "Joint Preservation",
    iconName: "Activity",
    tag: "Specialized Care",
    stats: {
      duration: "45 - 75 mins",
      hospitalStay: "1 - 3 days",
      walkingResumed: "Next day",
      longevity: "Staged Protocol",
    },
    overview: "Avascular Necrosis (AVN) of the femoral head is a major orthopedic condition in Kanpur and North India, frequently affecting young adults following viral illnesses, steroid therapies, or trauma. Dr. Gaurav Bhargava utilizes a stage-specific protocol: early biological decompression for Stages 1 & 2 to save the natural head, and high-performance ceramic hip replacement for Stages 3 & 4.",
    indications: [
      "Deep ache in the groin or front of thigh, often worsening with standing or walking",
      "MRI showing early bone edema or crescent sign in the femoral head",
      "History of steroid usage, COVID-19 recovery, or heavy alcohol intake",
      "Restricted inward rotation of the hip joint",
    ],
    techniques: [
      {
        name: "Early Core Decompression & Biological Augmentation",
        description: "Decompresses intra-osseous pressure and infuses autologous growth factors in early AVN.",
      },
      {
        name: "Dual-Mobility / Ceramic Arthroplasty",
        description: "Replaces collapsed femoral heads with maximum stability and wear-resistance in young adults.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 2", milestone: "Protected weight bearing according to surgical stage." },
      { timeline: "Month 1 - 2", milestone: "Rebuilding hip abductor strength and normal gait mechanics." },
      { timeline: "Month 3+", milestone: "Return to full work, unrestricted mobility, and social life." },
    ],
    faqs: [
      {
        q: "Can AVN be detected on normal X-rays?",
        a: "Early Stage 1 and 2 AVN is often invisible on normal X-rays. An MRI scan is the gold standard to detect AVN early when the natural joint can still be saved.",
      },
    ],
  },

  // 7. Hip Preservation & Core Decompression
  {
    id: "hip-preservation-core-decompression",
    slug: "hip-preservation-core-decompression",
    aliases: ["core-decompression-hip", "hip-preservation"],
    title: "Hip Preservation & Core Decompression",
    shortDesc: "Early-stage minimally invasive procedure to relieve bone pressure and stimulate fresh blood vessels into the femoral head.",
    category: "Joint Preservation",
    iconName: "Activity",
    tag: "Natural Joint Saver",
    stats: {
      duration: "40 - 50 mins",
      hospitalStay: "1 - 2 days",
      walkingResumed: "Next day (crutches)",
      longevity: "Joint Preserving",
    },
    overview: "In Stage 1 and early Stage 2 AVN before the bone ball has flattened, the natural joint can still be preserved. Core Decompression involves drilling micro-channels into the necrotic femoral head under live digital C-arm imaging. This relieves painful internal bone marrow pressure and channels fresh blood flow to stimulate bone remodeling.",
    indications: [
      "Stage 1 or early Stage 2 AVN diagnosed on MRI with preserved spherical femoral head",
      "Young patients seeking to delay or prevent hip replacement surgery",
      "Bone marrow edema syndrome of the hip",
    ],
    techniques: [
      {
        name: "Targeted C-Arm Micro-Decompression",
        description: "Pinpoint placement of cannulated drills into the exact necrotic zone under fluoroscopic guidance.",
      },
      {
        name: "Biological Matrix Infusion",
        description: "Delivering bone marrow aspirate concentrate (BMAC) to jumpstart healthy bone angiogenesis.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Discharged walking with crutches to protect the drilled channel." },
      { timeline: "Week 2 - 4", milestone: "Protected partial weight bearing allowing new bone formation." },
      { timeline: "Week 6 - 8", milestone: "Full unassisted walking; follow-up MRI showing edema resolution." },
    ],
    faqs: [
      {
        q: "How successful is core decompression?",
        a: "When performed early in Stage 1 or early Stage 2 before the bone collapses, it successfully halts disease progression in up to 75-80% of patients.",
      },
    ],
  },

  // 8. ACL Reconstruction
  {
    id: "acl-reconstruction",
    slug: "acl-reconstruction",
    aliases: ["sports-injury-acl-treatment", "acl-treatment", "acl-tear-surgery"],
    title: "ACL Ligament Reconstruction (Keyhole)",
    shortDesc: "Anatomical keyhole reconstruction of torn anterior cruciate ligament using your own hamstring graft for 100% knee stability.",
    category: "Arthroscopy",
    iconName: "ShieldCheck",
    tag: "Athletic Recovery",
    stats: {
      duration: "45 - 60 mins",
      hospitalStay: "Daycare / 1 day",
      walkingResumed: "Within 24 hours",
      longevity: "Full Sports Return",
    },
    overview: "The Anterior Cruciate Ligament (ACL) is the central pivot stabilizer of the knee. When torn during sports twists, jumping, or bike falls, the knee repeatedly 'gives way' and risks tearing the meniscus. Dr. Gaurav Bhargava reconstructs the ligament through tiny keyholes using autologous hamstring tendon grafts fixed with titanium cortical buttons.",
    indications: [
      "Knee popping sound accompanied by rapid swelling during sports or sudden twist",
      "Instability or knee buckling when attempting to jog, cut, or walk on uneven ground",
      "Young and athletic individuals wishing to return to cricket, football, gym, or running",
    ],
    techniques: [
      {
        name: "Anatomical Footprint Grafting",
        description: "Positions the graft exactly where nature intended for maximum rotational stability.",
      },
      {
        name: "Suspensory Cortical Fixation",
        description: "Uses high-strength titanium buttons providing rock-solid graft hold during bone integration.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Walking with knee brace and crutches; quad tightening exercises." },
      { timeline: "Week 4 - 6", milestone: "Weaning off brace, full straight leg raise, stationary cycling." },
      { timeline: "Month 3 - 4", milestone: "Straight-line outdoor jogging, agility ladder drills." },
      { timeline: "Month 6 - 9", milestone: "Return to full competitive sports and match play." },
    ],
    faqs: [
      {
        q: "Can a torn ACL heal on its own without surgery?",
        a: "Because the ACL is bathed in joint fluid without a direct blood sheath, complete tears rarely heal. In active individuals, surgery is recommended to prevent early meniscus damage and arthritis.",
      },
    ],
  },

  // 9. PCL & Multi-Ligament Knee Repair
  {
    id: "pcl-multi-ligament-repair",
    slug: "pcl-multi-ligament-repair",
    aliases: ["pcl-reconstruction", "multi-ligament-knee"],
    title: "PCL & Multi-Ligament Knee Repair",
    shortDesc: "Advanced keyhole reconstruction for complex knee injuries involving multiple damaged ligaments following high-energy trauma.",
    category: "Arthroscopy",
    iconName: "ShieldCheck",
    tag: "Complex Reconstructive",
    stats: {
      duration: "90 - 120 mins",
      hospitalStay: "2 - 3 days",
      walkingResumed: "Day 1 (protected)",
      longevity: "Structural Stability",
    },
    overview: "Posterior Cruciate Ligament (PCL) and multi-ligament knee injuries (combining ACL, PCL, MCL, or LCL) typically happen in motorcycle collisions, sports collisions, or severe knee dislocations. Dr. Gaurav Bhargava performs single-stage anatomical reconstructions to restore multi-directional knee stability and prevent joint subluxation.",
    indications: [
      "Dashboard injuries from road accidents where the shin is driven backward",
      "Gross knee looseness, sagging backward (posterior sag sign), or hyperextension",
      "Knee dislocation with multi-ligament disruption",
    ],
    techniques: [
      {
        name: "Single-Stage Multi-Ligament Reconstruction",
        description: "Restores both central pivot and peripheral collaterals in a single coordinated procedure.",
      },
      {
        name: "PCL Dynamic Bracing Protocol",
        description: "Specialized post-op bracing that counters gravity to protect the posterior graft while it unites.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 4", milestone: "Protected dynamic bracing with controlled passive motion." },
      { timeline: "Week 6 - 8", milestone: "Progressive weight bearing and hamstring protection." },
      { timeline: "Month 4 - 6", milestone: "Hamstring and quad strengthening with balance restoration." },
    ],
    faqs: [
      {
        q: "Is surgery always needed for PCL tears?",
        a: "Isolated Grade 1 and 2 PCL tears can often heal with specialized dynamic bracing. However, combined multi-ligament tears require surgical reconstruction to prevent severe instability.",
      },
    ],
  },

  // 10. Meniscus Repair Surgery
  {
    id: "meniscus-repair-surgery",
    slug: "meniscus-repair-surgery",
    aliases: ["meniscus-repair", "knee-meniscus-tear"],
    title: "Meniscus Repair & Cartilage Preservation",
    shortDesc: "Micro-suturing torn cartilage cushions instead of removing them, preserving your natural knee shock absorbers for life.",
    category: "Arthroscopy",
    iconName: "ShieldCheck",
    tag: "Cartilage Saver",
    stats: {
      duration: "30 - 45 mins",
      hospitalStay: "Daycare / 1 day",
      walkingResumed: "Next day",
      longevity: "Joint Preserving",
    },
    overview: "The menisci are two C-shaped shock-absorbing cartilage discs in each knee. While older practice removed torn pieces, Dr. Gaurav Bhargava follows the principle of 'Save the Meniscus'. Using micro-suture anchors through 4mm keyholes, torn menisci are re-stitched back together, preventing the bone-on-bone friction that causes early arthritis.",
    indications: [
      "Twisting sports injury or sudden catch with sharp tenderness at the joint line",
      "MRI showing vertical, bucket-handle, or root tear of the meniscus",
      "Mechanical locking where the knee gets stuck and cannot straighten",
    ],
    techniques: [
      {
        name: "All-Inside Micro-Suturing",
        description: "Utilizes self-adjusting suture devices through keyholes without needing counter incisions.",
      },
      {
        name: "Inside-Out Zone Repair",
        description: "Gold standard for complex body tears, creating ultra-strong anatomical cartilage re-apposition.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 2", milestone: "Crutch walking and protected knee bending up to 90 degrees." },
      { timeline: "Week 4 - 6", milestone: "Full weight bearing without crutches as cartilage bridges securely." },
      { timeline: "Month 3", milestone: "Full return to squats, gym routines, and recreational running." },
    ],
    faqs: [
      {
        q: "Why is repair better than removing the torn meniscus?",
        a: "Removing the meniscus takes away the natural shock absorber, increasing contact stress on bone by 300%. Repairing it preserves your cartilage and protects your knee against arthritis.",
      },
    ],
  },

  // 11. Ankle Sprain & Sports Rehab
  {
    id: "ankle-sprain-sports-rehab",
    slug: "ankle-sprain-sports-rehab",
    aliases: ["ankle-injury", "sports-rehab"],
    title: "Ankle Sprain & Sports Injury Care",
    shortDesc: "Comprehensive stabilization and sports recovery for recurring ankle sprains, torn ligaments, and Achilles tendon injuries.",
    category: "Sports Medicine",
    iconName: "ShieldCheck",
    tag: "Active Fitness",
    stats: {
      duration: "Conservative / 30m",
      hospitalStay: "Outpatient / Daycare",
      walkingResumed: "Immediate / Day 1",
      longevity: "Long-Term Stability",
    },
    overview: "Ankle sprains are the single most common sports and walking injury. When overlooked, partial ligament tears lead to chronic ankle instability, repeat rolls, and cartilage wearing. Dr. Gaurav Bhargava provides advanced diagnostic ultrasound, functional air-stirrup stabilization, and keyhole Broström ligament repairs for stubborn chronic laxity.",
    indications: [
      "Ankle rolling outward during running, walking on steps, or uneven pavements",
      "Persistent swelling, bruising, or tenderness over outer ankle bone (ATFL)",
      "Feeling that the ankle is loose or about to give way on stairs",
    ],
    techniques: [
      {
        name: "Functional Dynamic Offloading",
        description: "Allows early protected walking while shielding the torn ligament from re-stretching.",
      },
      {
        name: "Proprioceptive Balance Retraining",
        description: "Wobble board and neural drills that restore rapid subconscious reflexes.",
      },
      {
        name: "Keyhole Broström-Gould Repair",
        description: "Minimally invasive anatomical tightening of chronically loose ankle ligaments.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 2", milestone: "Swelling reduction with compression wrap, early straight-line walking." },
      { timeline: "Week 3 - 4", milestone: "Single-leg balance stability, resistance band ankle strengthening." },
      { timeline: "Week 6 - 8", milestone: "Return to running, jumping, and court sports with zero fear of rolling." },
    ],
    faqs: [
      {
        q: "Should I keep resting in bed if my ankle is sprained?",
        a: "Prolonged bed rest leads to stiff joints and weak reflexes. After 48 hours of ice and compression, structured protected walking actually accelerates healing.",
      },
    ],
  },

  // 12. Shoulder Arthroscopy & Keyhole
  {
    id: "shoulder-arthroscopy",
    slug: "shoulder-arthroscopy",
    aliases: ["shoulder-keyhole", "shoulder-surgery"],
    title: "Shoulder Keyhole Surgery (Arthroscopy)",
    shortDesc: "Minimally invasive keyhole surgery to treat impingement, bone spurs, and labral tears, relieving deep ache and stiffness.",
    category: "Shoulder Care",
    iconName: "Award",
    tag: "Keyhole Precision",
    stats: {
      duration: "45 - 60 mins",
      hospitalStay: "Daycare / 1 day",
      walkingResumed: "Same day",
      longevity: "Long-Term Relief",
    },
    overview: "Shoulder Arthroscopy uses tiny 4mm puncture incisions to diagnose and treat painful shoulder conditions without cutting through large muscles. Dr. Gaurav Bhargava removes irritating bone spurs (subacromial decompression), trims inflamed bursa, and releases tight capsules, ending persistent night ache and restoring full overhead arm motion.",
    indications: [
      "Pain when raising your arm above head height or putting on a jacket",
      "Persistent shoulder ache that disrupts sleep when lying on the affected side",
      "Clicking, popping, or pinching sensations under the collarbone or shoulder tip",
    ],
    techniques: [
      {
        name: "Subacromial Decompression & Acromioplasty",
        description: "Smoothes the underside of the shoulder blade to give lifting tendons ample room to glide.",
      },
      {
        name: "Biceps Tenodesis / Tenotomy",
        description: "Relieves painful long-head biceps tendon friction in chronic shoulder impingement.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 2", milestone: "Gentle pendulum exercises and elbow/wrist movements." },
      { timeline: "Week 3 - 4", milestone: "Passive overhead stretching and assisted wall climbs." },
      { timeline: "Week 6 - 8", milestone: "Active arm lifting, resistance band endurance, peaceful sleep." },
    ],
    faqs: [
      {
        q: "How soon can I sleep on my shoulder after keyhole surgery?",
        a: "Most patients experience significant reduction in night pain within 2 to 3 weeks and can comfortably sleep on their operated side by 6 to 8 weeks.",
      },
    ],
  },

  // 13. Rotator Cuff Tear Repair
  {
    id: "rotator-cuff-repair",
    slug: "rotator-cuff-repair",
    aliases: ["cuff-tear-repair", "rotator-cuff-surgery"],
    title: "Rotator Cuff Tear Repair",
    shortDesc: "Keyhole reattachment of torn shoulder lifting tendons using dissolvable micro-anchors to restore arm power and painless sleep.",
    category: "Shoulder Care",
    iconName: "Award",
    tag: "Tendon Specialist",
    stats: {
      duration: "60 - 75 mins",
      hospitalStay: "1 - 2 days",
      walkingResumed: "Same day",
      longevity: "Permanent Repair",
    },
    overview: "The rotator cuff consists of four muscles whose tendons anchor the arm bone into the shoulder socket. When torn from heavy lifting, falls, or age-related tendon wear, lifting the arm becomes agonizing or impossible. Dr. Gaurav Bhargava performs anatomical repairs using arthroscopic knotless suture anchors that firmly press the tendon back onto bone.",
    indications: [
      "Inability to lift arm to comb hair, wash back, or reach high shelves",
      "Severe nocturnal ache waking you up repeatedly at 2 AM or 3 AM",
      "Sudden weakness after a slip where you caught yourself by the hand",
    ],
    techniques: [
      {
        name: "Double-Row Suture-Bridge Repair",
        description: "Creates a broad anatomical footprint compression that maximizes tendon-to-bone vascular healing.",
      },
      {
        name: "Bio-Composite Knotless Anchors",
        description: "Eliminates bulky knots that could fray against surrounding bones, promoting cleaner healing.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 4", milestone: "Arm protected in a comfortable abduction sling; hand/wrist exercises." },
      { timeline: "Week 5 - 8", milestone: "Guided passive movement with physiotherapist; weaning off sling." },
      { timeline: "Month 3 - 4", milestone: "Active arm lifting, resistance bands, and full daily household independence." },
      { timeline: "Month 6", milestone: "Heavy lifting, overhead sports, and full physical strength restored." },
    ],
    faqs: [
      {
        q: "Why does a rotator cuff take several weeks to heal?",
        a: "Tendons have a limited blood supply and require 6 to 8 weeks to knit firmly back onto the bone surface. The sling protects the repair during this vital bonding period.",
      },
    ],
  },

  // 14. Frozen Shoulder Treatment
  {
    id: "frozen-shoulder-treatment",
    slug: "frozen-shoulder-treatment",
    aliases: ["adhesive-capsulitis", "frozen-shoulder"],
    title: "Frozen Shoulder Treatment & Mobility Care",
    shortDesc: "Specialized non-surgical joint expansion and gentle keyhole release to rapidly free up stiff, locked shoulder joints.",
    category: "Shoulder Care",
    iconName: "Award",
    tag: "Mobility Restorer",
    stats: {
      duration: "20 - 45 mins",
      hospitalStay: "Daycare / Outpatient",
      walkingResumed: "Immediate",
      longevity: "Lasting Flexibility",
    },
    overview: "Frozen Shoulder (Adhesive Capsulitis) causes the joint capsule to thicken and contract like a shrunken shrink-wrap. Common in diabetics and after minor strains, it causes agonizing stiffness. Dr. Gaurav Bhargava offers ultrasound-guided hydrodilatation (liquid expansion) and gentle arthroscopic capsular release to break the stiffness cycle safely.",
    indications: [
      "Shoulder severely stiff in all directions: cannot reach wallet, bra strap, or hair",
      "Painful freezing phase with sharp catching pain on unexpected arm jerks",
      "Diabetic patients with stubborn shoulder restriction lasting months",
    ],
    techniques: [
      {
        name: "Ultrasound-Guided Hydrodilatation",
        description: "Safely inflates and stretches the contracted joint capsule using local anesthetic and sterile saline.",
      },
      {
        name: "Selective Keyhole Capsular Release",
        description: "In stubborn cases, precisely divides contracted capsule fibers with an arthroscopic wand.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Immediate release of tight restriction; guided stretching begins." },
      { timeline: "Week 1 - 2", milestone: "Reaching overhead and behind the back with dramatically less ache." },
      { timeline: "Week 4 - 6", milestone: "Full normal functional mobility restored with daily home stretches." },
    ],
    faqs: [
      {
        q: "Is forceful manipulation under anesthesia safe for frozen shoulder?",
        a: "Forceful cracking can risk bone fracture in osteoporotic bone. We prefer gentle targeted hydrodilatation or precision keyhole release which is far safer and much more effective.",
      },
    ],
  },

  // 15. Shoulder Dislocation Care (Bankart Repair)
  {
    id: "shoulder-dislocation-bankart",
    slug: "shoulder-dislocation-bankart",
    aliases: ["bankart-repair", "shoulder-instability"],
    title: "Shoulder Dislocation Care (Bankart Repair)",
    shortDesc: "Keyhole stabilization and labral re-anchoring for shoulders that repeatedly pop out of their socket or feel insecure.",
    category: "Shoulder Care",
    iconName: "Award",
    tag: "Stability Care",
    stats: {
      duration: "45 - 60 mins",
      hospitalStay: "Daycare / 1 day",
      walkingResumed: "Same day",
      longevity: "Permanent Stability",
    },
    overview: "When a shoulder dislocates, the fibrous cartilage rim (glenoid labrum) tears away from the socket bone (Bankart lesion). In young patients, this tear leaves the joint prone to recurrent pop-outs during throwing or rolling over in bed. Dr. Gaurav Bhargava performs arthroscopic Bankart repair, firmly re-attaching the labrum with suture anchors to restore rock-solid stability.",
    indications: [
      "Shoulder has popped out of its joint once or multiple times",
      "Apprehension or feeling of slipping when raising arm outward and backward",
      "Young sports players, athletes, or gym enthusiasts with labral tears on MRI",
    ],
    techniques: [
      {
        name: "Arthroscopic Labral Re-Anchoring",
        description: "Restores the natural bumper barrier that prevents the arm ball from slipping forward.",
      },
      {
        name: "Capsular Shift & Plication",
        description: "Tightens redundant, stretched joint capsule tissues to ensure snug joint containment.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 3", milestone: "Shoulder immobilizer sling; gentle hand and forearm drills." },
      { timeline: "Week 4 - 6", milestone: "Protected external rotation and pendulum stretches." },
      { timeline: "Month 3 - 4", milestone: "Dynamic rotator cuff strengthening and throwing motion preparation." },
      { timeline: "Month 6", milestone: "Full clearance for overhead sports, swimming, and gym workouts." },
    ],
    faqs: [
      {
        q: "What happens if I don't get a recurrent shoulder dislocation treated?",
        a: "Every time the shoulder pops out, it chips bone from the socket and damages cartilage, ultimately causing premature joint arthritis and bone loss.",
      },
    ],
  },

  // 16. Tennis Elbow & Forearm Care
  {
    id: "tennis-elbow-treatment",
    slug: "tennis-elbow-treatment",
    aliases: ["tennis-elbow", "lateral-epicondylitis"],
    title: "Tennis Elbow & Forearm Tendon Care",
    shortDesc: "Proven non-surgical relief, PRP biological therapy, and tendon offloading for stubborn outer elbow and grip pain.",
    category: "Shoulder & Arm Care",
    iconName: "Award",
    tag: "Non-Surgical",
    stats: {
      duration: "15 - 30 mins",
      hospitalStay: "Outpatient",
      walkingResumed: "Immediate",
      longevity: "Long-Term Relief",
    },
    overview: "Tennis Elbow (Lateral Epicondylitis) is not limited to tennis players — it is common among computer users, housewives, mechanics, and gym lifters. It involves micro-tearing of the forearm extensor tendon on the outer elbow. Dr. Gaurav Bhargava offers non-surgical regenerative protocols including targeted PRP injections, counter-force bracing, and eccentric tendon training.",
    indications: [
      "Sharp outer elbow ache when lifting a grocery bag, laptop, or cup of tea",
      "Weakened grip strength and pain during handshakes or turning doorknobs",
      "Tender spot on the outer bone of the elbow that hurts when pressed",
    ],
    techniques: [
      {
        name: "Targeted PRP Biological Therapy",
        description: "Concentrated natural platelets stimulate collagen rebuilding in degenerative tendon tissue.",
      },
      {
        name: "Counter-Force Bracing & Tendon Offloading",
        description: "Reduces traction tension on the bony insertion, allowing micro-tears to bridge and heal.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 2", milestone: "Pain reduction with bracing and anti-inflammatory offloading." },
      { timeline: "Week 3 - 4", milestone: "Noticeably stronger grip; starting eccentric forearm stretches." },
      { timeline: "Week 6 - 8", milestone: "Complete resolution of gripping pain and full return to daily tasks." },
    ],
    faqs: [
      {
        q: "Are repeated steroid injections safe for tennis elbow?",
        a: "Repeated steroid shots can weaken the tendon and cause skin discoloration. We prefer regenerative PRP therapy which naturally heals tendon micro-tears for permanent relief.",
      },
    ],
  },

  // 17. Spine Care & Sciatica (Overview)
  {
    id: "spine-sciatica-care",
    slug: "spine-sciatica-care",
    aliases: ["spine-care", "sciatica-care"],
    title: "Spine Care & Non-Surgical Sciatica Relief",
    shortDesc: "Evidence-based non-surgical relief for slip discs, sciatica, neck pain, and chronic lower back spasms.",
    category: "Spine Care",
    iconName: "Activity",
    tag: "Non-Surgical Focus",
    stats: {
      duration: "Conservative / Outpatient",
      hospitalStay: "Zero / Daycare",
      walkingResumed: "Same day",
      longevity: "Lifelong Posture Care",
    },
    overview: "Over 90% of back pain and sciatica cases resolve completely without open surgery when treated with structured modern care. Dr. Gaurav Bhargava specializes in diagnosing nerve pinch points, providing precision spinal nerve blocks, ergonomic workstation correction, and core muscle stabilization to ensure lasting spinal health.",
    indications: [
      "Persistent lower back pain radiating down one or both legs into the calf or foot",
      "Inability to sit or stand comfortably for more than 15 to 20 minutes",
      "Stiffness, burning nerve sensations, or morning back spasms",
    ],
    techniques: [
      {
        name: "Targeted Epidural & Facet Injections",
        description: "Delivers soothing medicine directly near irritated spinal roots under live fluoroscopy.",
      },
      {
        name: "Ergonomic & Core Stabilization",
        description: "Rebuilds deep abdominal and spinal muscles to create a natural muscular back brace.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1 - 3", milestone: "Immediate calming of acute nerve pain and back spasms." },
      { timeline: "Week 2 - 3", milestone: "Normal walking distance restored; resumption of desk work." },
      { timeline: "Week 6+", milestone: "Active lifestyle, swimming, brisk walking with zero back ache." },
    ],
    faqs: [
      {
        q: "Does slip disc always require surgery?",
        a: "No! Over 90% of herniated discs heal non-surgically with targeted medications, temporary offloading, and physiotherapy. Surgery is reserved only for progressive nerve weakness.",
      },
    ],
  },

  // 18. Slip Disc Treatment
  {
    id: "slip-disc-treatment",
    slug: "slip-disc-treatment",
    aliases: ["herniated-disc", "lumbar-disc-prolapse"],
    title: "Slip Disc Treatment (Herniated Disc Care)",
    shortDesc: "Non-surgical decompression and targeted nerve soothing therapy for bulging and slipped lumbar spinal discs.",
    category: "Spine Care",
    iconName: "Activity",
    tag: "Non-Surgical Focus",
    stats: {
      duration: "Conservative / Daycare",
      hospitalStay: "Zero to 1 day",
      walkingResumed: "Day 1",
      longevity: "Long-Term Relief",
    },
    overview: "A slip disc occurs when the soft gel-like center of a spinal disc pushes through its fibrous ring, irritating adjacent spinal nerve roots. Dr. Gaurav Bhargava treats lumbar disc prolapse through evidence-based conservative pathways, targeted anti-inflammatory regimens, and precision spinal injections, helping the body resorb the herniated disc naturally.",
    indications: [
      "Sudden sharp back pain after bending forward or lifting a heavy item",
      "Pain aggravated by coughing, sneezing, or sitting down",
      "Numbness, tingling, or weakness in the leg or foot muscles",
    ],
    techniques: [
      {
        name: "Biological Disc Resorption Protocol",
        description: "Reduces inflammatory swelling so the body's natural immune cells can safely resorb herniated gel.",
      },
      {
        name: "Spinal Extension Mechanics",
        description: "McKenzie directional exercises that push disc material away from sensitive nerves.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1", milestone: "Acute pain settles with medication and short frequent walks." },
      { timeline: "Week 3 - 4", milestone: "Full sitting tolerance without leg shooting sensations." },
      { timeline: "Week 8", milestone: "Strengthened core muscles protecting against future disc recurrence." },
    ],
    faqs: [
      {
        q: "How long does a herniated disc take to resorb?",
        a: "Most disc bulges shrink significantly within 6 to 12 weeks as water content is absorbed by the body, relieving nerve pressure permanently.",
      },
    ],
  },

  // 19. Sciatica Nerve Relief
  {
    id: "sciatica-nerve-relief",
    slug: "sciatica-nerve-relief",
    aliases: ["sciatica-treatment", "pinched-nerve-relief"],
    title: "Sciatica Nerve Pain Relief",
    shortDesc: "Targeted treatments for sharp, burning pain, electric shocks, or tingling traveling from the lower back down the leg.",
    category: "Spine Care",
    iconName: "Activity",
    tag: "Fast Pain Relief",
    stats: {
      duration: "15 - 30 mins",
      hospitalStay: "Outpatient",
      walkingResumed: "Immediate",
      longevity: "Lasting Relief",
    },
    overview: "Sciatica refers to symptoms caused by compression or inflammation of the sciatic nerve — the largest nerve in the body. It produces an electric shock or burning pain traveling from the buttock down through the thigh, calf, and into the toes. Dr. Gaurav Bhargava pinpoint-identifies the root cause and administers rapid-acting soothing protocols.",
    indications: [
      "Electric shock or burning pain shooting down the back of one leg",
      "Pins and needles, numbness, or tingling in calf, ankle, or toes",
      "Inability to walk even short distances without bending forward to relieve pain",
    ],
    techniques: [
      {
        name: "Transforaminal Nerve Root Block",
        description: "Pinpoint injection directly around the irritated nerve sleeve to eliminate chemical inflammation.",
      },
      {
        name: "Nerve Flossing Exercises",
        description: "Gentle therapeutic glides that prevent nerve adhesions along the spinal canal.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1 - 2", milestone: "Noticeable reduction in radiating leg shock sensations." },
      { timeline: "Week 2", milestone: "Walking longer distances without sitting breaks." },
      { timeline: "Week 4 - 6", milestone: "Full unassisted walking, pain-free sitting, and sound sleep." },
    ],
    faqs: [
      {
        q: "What is the fastest way to relieve severe sciatica?",
        a: "A targeted nerve block injection directly around the inflamed nerve root offers rapid pain relief within 24 to 48 hours, breaking the severe spasm cycle.",
      },
    ],
  },

  // 20. Cervical Spondylosis (Neck Pain)
  {
    id: "cervical-spondylosis-neck-pain",
    slug: "cervical-spondylosis-neck-pain",
    aliases: ["cervical-spondylosis", "neck-pain-care"],
    title: "Cervical Spondylosis (Neck Pain & Stiffness)",
    shortDesc: "Relief for neck stiffness, shoulder blade aching, and finger tingling caused by desk posture, mobile use, or age wear.",
    category: "Spine Care",
    iconName: "Activity",
    tag: "Posture Care",
    stats: {
      duration: "Conservative / Outpatient",
      hospitalStay: "Zero",
      walkingResumed: "Immediate",
      longevity: "Posture Health",
    },
    overview: "Cervical spondylosis is age-related wear and tear of the neck vertebrae and discs, amplified by prolonged smartphone usage ('tech-neck') and sedentary computer desks. Dr. Gaurav Bhargava provides non-surgical neck care: postural retraining, cervical isometric exercises, ergonomic workstation advice, and targeted trigger-point therapy.",
    indications: [
      "Stiff neck muscles, grinding sounds on head turning, and chronic tension headaches",
      "Aching pain radiating into shoulder blades or down the arm into the fingers",
      "Numbness or tingling in fingertips while working on computers or phones",
    ],
    techniques: [
      {
        name: "Cervical Ergonomic Correction",
        description: "Adjusts monitor height, chair lumbar support, and phone habits to unload cervical discs.",
      },
      {
        name: "Isometric Cervical Strengthening",
        description: "Builds deep neck flexor muscles that support the weight of the head effortlessly.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1", milestone: "Neck muscle spasms ease with heat therapy and gentle stretches." },
      { timeline: "Week 2 - 3", milestone: "Headache frequency drops; arm tingling completely disappears." },
      { timeline: "Week 4+", milestone: "Work comfortably without neck exhaustion using ergonomic habits." },
    ],
    faqs: [
      {
        q: "Can neck exercises cure cervical spondylosis?",
        a: "Consistent cervical posture exercises strengthen neck supporting muscles, taking up to 70% of the strain off discs and stopping symptoms from recurring.",
      },
    ],
  },

  // 21. Targeted Spine Nerve Blocks
  {
    id: "targeted-spine-injections",
    slug: "targeted-spine-injections",
    aliases: ["spine-nerve-blocks", "epidural-injection"],
    title: "Targeted Spine Injections & Nerve Blocks",
    shortDesc: "Safe, outpatient precision anti-inflammatory injections delivered directly near irritated spinal nerves under digital guidance.",
    category: "Spine Care",
    iconName: "Activity",
    tag: "Quick Outpatient",
    stats: {
      duration: "20 - 30 mins",
      hospitalStay: "Daycare (2 hours)",
      walkingResumed: "Within 30 mins",
      longevity: "6 - 12+ Months",
    },
    overview: "When severe slip disc pain or sciatica does not settle with oral painkillers, Targeted Spine Injections offer rapid, safe relief. Under real-time digital C-arm X-ray guidance, Dr. Gaurav Bhargava delivers tiny doses of targeted anti-inflammatory medicine right to the irritated nerve root, ending excruciating spasms without open surgery.",
    indications: [
      "Severe acute sciatica that prevents sleep, standing, or walking",
      "Failed response to oral analgesics and initial physical therapy",
      "Patients wanting to avoid open spinal surgery or needing rapid pain relief",
    ],
    techniques: [
      {
        name: "Fluoroscopic C-Arm Guidance",
        description: "Visualizes needle position to the exact millimeter, ensuring maximum safety and medicine delivery.",
      },
      {
        name: "Transforaminal & Facet Denervation",
        description: "Directly calms the nerve sleeve without affecting surrounding back muscles.",
      },
    ],
    recoveryMilestones: [
      { timeline: "30 Mins", milestone: "Walk out of the clinic and return home comfortably by car." },
      { timeline: "Day 1 - 2", milestone: "Significant reduction in radiating leg shock and lower back tightness." },
      { timeline: "Week 2 - 4", milestone: "Comfortable initiation of core strengthening and physical therapy." },
    ],
    faqs: [
      {
        q: "Is a spinal nerve block painful?",
        a: "The procedure is performed under local anesthesia so you feel only a tiny pinch. Most patients report feeling almost instant soothing relief as the medicine touches the nerve.",
      },
    ],
  },

  // 22. PRP Therapy (Platelet-Rich Plasma)
  {
    id: "joint-preservation-prp",
    slug: "joint-preservation-prp",
    aliases: ["prp-therapy", "platelet-rich-plasma", "joint-preservation"],
    title: "PRP Therapy (Platelet-Rich Plasma)",
    shortDesc: "Natural biological injections using concentrated healing factors from your own blood to nourish cartilage and calm inflammation.",
    category: "Joint Preservation",
    iconName: "HeartPulse",
    tag: "100% Natural",
    stats: {
      duration: "20 - 30 mins",
      hospitalStay: "Outpatient",
      walkingResumed: "Immediate",
      longevity: "12 - 18 Months",
    },
    overview: "Platelet-Rich Plasma (PRP) is a cutting-edge regenerative therapy that harnesses your body's own natural healing powers. A small sample of your blood is drawn and spun in a specialized centrifuge to concentrate platelets and growth factors. Dr. Gaurav Bhargava injects this golden serum directly into the knee or shoulder joint to reduce friction, nourish cartilage, and delay surgery.",
    indications: [
      "Mild to moderate knee osteoarthritis (Grade 1 & 2) with morning stiffness",
      "Partial rotator cuff tears, patellar tendonitis, or tennis elbow",
      "Patients wishing to preserve their natural cartilage and avoid or delay surgery",
    ],
    techniques: [
      {
        name: "High-Concentration Double-Spin Centrifugation",
        description: "Extracts 5 to 7 times normal baseline concentration of restorative growth factors.",
      },
      {
        name: "Ultrasound-Guided Joint Delivery",
        description: "Ensures precise intra-articular placement with zero drug wastage.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1", milestone: "Walk out immediately after the procedure; light daily walking." },
      { timeline: "Week 2 - 3", milestone: "Biological growth factors actively soothe joint lining; grating subsides." },
      { timeline: "Week 4 - 8", milestone: "Smoother stairs, lighter morning waking, and comfortable walking." },
    ],
    faqs: [
      {
        q: "Are there any side effects from PRP injections?",
        a: "Because PRP is prepared entirely from your own blood, there is zero risk of allergic reaction, rejection, or foreign body response.",
      },
    ],
  },

  // 23. Joint Lubrication Injections (Gel)
  {
    id: "joint-lubrication-gel-injections",
    slug: "joint-lubrication-gel-injections",
    aliases: ["hyaluronic-acid-injection", "viscosupplementation"],
    title: "Joint Lubrication Injections (Hyaluronic Acid Gel)",
    shortDesc: "Supplying natural cushioning fluid directly inside the knee joint to reduce grinding, ease stiffness, and protect cartilage.",
    category: "Joint Preservation",
    iconName: "HeartPulse",
    tag: "Cartilage Cushion",
    stats: {
      duration: "15 mins",
      hospitalStay: "Outpatient",
      walkingResumed: "Immediate",
      longevity: "6 - 12 Months",
    },
    overview: "Healthy joints have thick, lubricating synovial fluid rich in Hyaluronic Acid (HA). In osteoarthritis, this fluid thins out, causing painful bone grinding. Viscosupplementation injects high-molecular-weight hyaluronic acid gel directly into the knee, acting like fresh shock-absorbing lubricant that restores smooth, frictionless joint movement.",
    indications: [
      "Knees that feel dry, creaky, or grind painfully when climbing stairs",
      "Moderate knee arthritis where painkillers cause stomach upset",
      "Patients wanting immediate mechanical cushioning for everyday walking",
    ],
    techniques: [
      {
        name: "High-Molecular-Weight Hyaluronic Acid",
        description: "Cross-linked viscoelastic gel that mimics healthy youthful joint fluid.",
      },
      {
        name: "Aspiration & Infusion Technique",
        description: "Removes inflammatory excess fluid first before delivering the clean cushioning gel.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Immediate", milestone: "Walk out of clinic without downtime; resume normal day." },
      { timeline: "Day 3 - 5", milestone: "Noticeably smoother, quieter knee bending without creaks." },
      { timeline: "Month 1 - 6+", milestone: "Enjoy easy walks and stair climbing with lasting cushioning." },
    ],
    faqs: [
      {
        q: "How many injections are needed?",
        a: "Modern single-dose cross-linked gels require just ONE quick injection that provides 6 to 12 months of smooth joint lubrication.",
      },
    ],
  },

  // 24. Arthritis & Cartilage Protection
  {
    id: "arthritis-cartilage-protection",
    slug: "arthritis-cartilage-protection",
    aliases: ["arthritis-prevention", "knee-preservation-plan"],
    title: "Arthritis & Cartilage Protection Plan",
    shortDesc: "Comprehensive joint preservation plan combining weight offloading, quad strengthening, and nutrition to protect natural knees for decades.",
    category: "Joint Preservation",
    iconName: "HeartPulse",
    tag: "Preventive Care",
    stats: {
      duration: "Personalized Program",
      hospitalStay: "Zero",
      walkingResumed: "Immediate",
      longevity: "Decades of Mobility",
    },
    overview: "Preventing arthritis progression is far better than treating advanced joint collapse. Dr. Gaurav Bhargava crafts personalized joint protection plans for patients in their 40s and 50s. Every 1 kg of excess body weight lost takes 4 kg of pressure off the knees with every step. Combined with quadriceps strengthening and cartilage nutrition, patients keep their natural knees healthy for life.",
    indications: [
      "Early knee ache after long walks or standing in middle age",
      "Family history of severe knee arthritis or bowed legs",
      "Active individuals desiring to safeguard cartilage against premature degeneration",
    ],
    techniques: [
      {
        name: "Joint Offloading Biomechanics",
        description: "Custom foot wedges and knee braces that shift weight onto healthy cartilage zones.",
      },
      {
        name: "Non-Impact Thigh Conditioning",
        description: "Stationary cycling and isometric exercises that build a muscular shock-absorption shield.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Month 1", milestone: "Stronger thigh muscles absorbing 50% of walking impact." },
      { timeline: "Month 3", milestone: "Weight offloading relieves knee tightness; pain-free daily walks." },
      { timeline: "Year 1+", milestone: "Sustained joint health, avoiding joint replacement surgery." },
    ],
    faqs: [
      {
        q: "Can damaged cartilage regenerate?",
        a: "While severe cartilage loss cannot fully regrow, early protective care halts degeneration, thickens joint fluid, and keeps your natural joint functioning pain-free for decades.",
      },
    ],
  },

  // 25. Heel Pain Care (Plantar Fasciitis)
  {
    id: "heel-pain-plantar-fasciitis",
    slug: "heel-pain-plantar-fasciitis",
    aliases: ["heel-pain", "plantar-fasciitis"],
    title: "Heel Pain Care (Plantar Fasciitis Treatment)",
    shortDesc: "Fast, effective relief for stabbing morning heel pain when taking your very first steps out of bed.",
    category: "Non-Surgical Care",
    iconName: "HeartPulse",
    tag: "Everyday Relief",
    stats: {
      duration: "15 mins",
      hospitalStay: "Outpatient",
      walkingResumed: "Immediate",
      longevity: "Permanent Comfort",
    },
    overview: "Plantar Fasciitis is an inflammation of the thick band of tissue running across the bottom of your foot, connecting your heel bone to your toes. It causes an excruciating stabbing pain on the very first morning steps. Dr. Gaurav Bhargava provides rapid relief through calf stretching regimens, custom silicone orthotics, and localized healing injections.",
    indications: [
      "Sharp, stabbing pain beneath the heel when stepping out of bed in the morning",
      "Heel pain after prolonged sitting that temporarily eases after walking a few steps",
      "Tenderness when pressing the bottom inner edge of the heel bone",
    ],
    techniques: [
      {
        name: "Plantar Fascia Stretch Protocol",
        description: "Lengthens calf muscle and Achilles tendon to eliminate traction tension on the heel.",
      },
      {
        name: "Targeted Micro-Injection Therapy",
        description: "Quickly calms chronic fascial inflammation when simple shoe modifications are insufficient.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1 - 3", milestone: "Comfortable morning steps with silicone heel cushions." },
      { timeline: "Week 2 - 3", milestone: "Significant drop in morning stabbing sensation." },
      { timeline: "Week 6", milestone: "Walking, jogging, and daily activities completely pain-free." },
    ],
    faqs: [
      {
        q: "Why is heel pain worst on the first morning steps?",
        a: "During sleep, the plantar fascia tightens and shortens. Taking your first step forcefully stretches the inflamed band, triggering acute pain.",
      },
    ],
  },

  // 26. Complex Trauma & Fractures (Overview)
  {
    id: "complex-trauma-fractures",
    slug: "complex-trauma-fractures",
    aliases: ["trauma-care", "fracture-care"],
    title: "Complex Trauma & Fracture Care",
    shortDesc: "24/7 comprehensive fracture and trauma care with modern fixation, modular OTs, and in-house recovery at BMTC Kidwai Nagar.",
    category: "Trauma Care",
    iconName: "Stethoscope",
    tag: "24/7 Emergency Care",
    stats: {
      duration: "Emergency / Planned",
      hospitalStay: "1 - 5 days",
      walkingResumed: "Rapid protocol",
      longevity: "Anatomical Union",
    },
    overview: "From simple plaster casting to high-velocity road accident fractures, Dr. Gaurav Bhargava delivers 24/7 emergency orthopedic care at BMTC Hospital Kidwai Nagar. Utilizing advanced digital radiography, modular ultra-clean laminar airflow operating theaters, and titanium interlocking implants, broken bones are aligned to perfection for rapid union.",
    indications: [
      "Bone fractures of hip, femur, tibia, ankle, arm, forearm, or clavicle",
      "Compound open fractures requiring emergency debridement and stabilization",
      "Multiple trauma and vehicular accident injuries",
    ],
    techniques: [
      {
        name: "Biological Minimally Invasive Osteosynthesis (MIPO)",
        description: "Inserts fixation plates through small skin tunnels, preserving bone blood supply for rapid healing.",
      },
      {
        name: "Interlocking Intramedullary Nailing",
        description: "Places load-sharing titanium rods inside hollow bones, allowing early weight bearing.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1 - 2", milestone: "Swelling drainage, wound healing, early movement of adjacent joints." },
      { timeline: "Week 4 - 6", milestone: "Check X-ray confirms bone callus formation; progressive weight bearing." },
      { timeline: "Month 3 - 6", milestone: "Solid bone union, muscle rebuilding, return to full work and driving." },
    ],
    faqs: [
      {
        q: "Do titanium plates and screws need to be removed later?",
        a: "Modern biocompatible titanium implants can safely stay inside your body for life without causing issues, unless they cause localized irritation.",
      },
    ],
  },

  // 27. Bone Fracture Plaster & Alignment
  {
    id: "bone-fracture-plaster-alignment",
    slug: "bone-fracture-plaster-alignment",
    aliases: ["fracture-casting", "plaster-alignment"],
    title: "Bone Fracture Plaster & Non-Surgical Alignment",
    shortDesc: "Accurate diagnosis and non-surgical fiberglass casting or closed alignment for broken bones of children and adults.",
    category: "Trauma Care",
    iconName: "Stethoscope",
    tag: "Essential Care",
    stats: {
      duration: "20 - 30 mins",
      hospitalStay: "Outpatient",
      walkingResumed: "Immediate / Cast shoe",
      longevity: "Natural Bone Union",
    },
    overview: "Many broken bones can heal naturally and solidly without surgery if properly aligned and held securely. Dr. Gaurav Bhargava performs gentle closed reduction and applies modern lightweight fiberglass casts. Digital check X-rays verify exact anatomical alignment, ensuring the bone unites without deformity.",
    indications: [
      "Non-displaced or minimally displaced fractures of wrist, ankle, arm, or collarbone",
      "Pediatric greenstick fractures which have excellent natural remodeling power",
      "Stress fractures and hairline cracks requiring protective immobilization",
    ],
    techniques: [
      {
        name: "Gentle Closed Anatomical Reduction",
        description: "Aligns bone ends without incisions under local pain block and gentle traction.",
      },
      {
        name: "Lightweight Waterproof Fiberglass Casting",
        description: "Far lighter, stronger, and more breathable than traditional heavy plaster of Paris.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 1", milestone: "Limb elevation settles swelling; finger or toe wiggling ensures circulation." },
      { timeline: "Week 3 - 4", milestone: "Check X-ray confirms early soft bone bridging across fracture gap." },
      { timeline: "Week 6", milestone: "Cast removal, followed by gentle physiotherapy to restore joint flexibility." },
    ],
    faqs: [
      {
        q: "What should I do if my cast gets wet or feels tight?",
        a: "If your cast gets soaked or fingers become pale or numb, contact our clinic immediately for cast adjustment or replacement.",
      },
    ],
  },

  // 28. Plate & Rod Bone Fixation
  {
    id: "plate-rod-bone-fixation",
    slug: "plate-rod-bone-fixation",
    aliases: ["nailing-plating", "internal-fixation"],
    title: "Plate & Rod Bone Fixation (Modern Plating/Nailing)",
    shortDesc: "Precision titanium plates, locking screws, and interlocking rods to hold complex broken bones rigidly for early walking.",
    category: "Trauma Care",
    iconName: "Stethoscope",
    tag: "Surgical Precision",
    stats: {
      duration: "60 - 90 mins",
      hospitalStay: "2 - 3 days",
      walkingResumed: "Day 1 - 2 (guided)",
      longevity: "Permanent Structural Union",
    },
    overview: "Displaced fractures of long bones (such as thigh bone, shin, or arm) cannot be held securely in plaster alone. Dr. Gaurav Bhargava performs internal fixation using titanium locking plates and intramedullary interlocking nails. This provides immediate mechanical rigidity, allowing early joint movement and preventing long bed rest.",
    indications: [
      "Displaced fractures of thigh (femur), shin (tibia), upper arm (humerus), or forearm",
      "Fractures involving joint surfaces requiring millimeter-exact alignment",
      "Fractures in active adults needing early mobilization to return to employment",
    ],
    techniques: [
      {
        name: "Interlocking Intramedullary Nailing",
        description: "Passes a strong titanium rod inside the hollow bone marrow, sharing weight naturally.",
      },
      {
        name: "Anatomical Locking Compression Plates",
        description: "Contoured plates that grip bone securely even in softer or osteoporotic bone.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Day 1 - 2", milestone: "Sitting up and assisted standing; adjacent joints moving freely." },
      { timeline: "Week 4 - 6", milestone: "X-ray confirms bone knitting; progressive partial to full weight bearing." },
      { timeline: "Month 3", milestone: "Complete solid bone union; unassisted walking, driving, and work return." },
    ],
    faqs: [
      {
        q: "Will bone fixation set off airport metal detectors?",
        a: "Modern titanium implants rarely trigger airport security scanners, and Joint Clinic provides an implant card if ever required.",
      },
    ],
  },

  // 29. Old Fracture & Non-Union Surgery
  {
    id: "old-fracture-nonunion-surgery",
    slug: "old-fracture-nonunion-surgery",
    aliases: ["fracture-nonunion", "malunion-surgery"],
    title: "Old Fracture & Non-Union Surgery (Corrective Care)",
    shortDesc: "Specialized reconstructive surgery for broken bones that failed to heal or healed crookedly after earlier treatment elsewhere.",
    category: "Trauma Care",
    iconName: "Stethoscope",
    tag: "Corrective Specialist",
    stats: {
      duration: "90 - 120 mins",
      hospitalStay: "2 - 4 days",
      walkingResumed: "Structured protocol",
      longevity: "Restored Function",
    },
    overview: "When a broken bone fails to knit after months (non-union) or heals in an abnormal angle (malunion), patients suffer from persistent pain, limp, and deformity. Dr. Gaurav Bhargava specializes in revision trauma surgery: clearing dense scar tissue, opening bone marrow channels, using autologous bone grafting, and placing rigid modern implants to restart natural biological healing.",
    indications: [
      "Fracture that remains painful and loose 6 to 9 months after original injury",
      "Past fracture that healed crookedly, causing limb shortening or a noticeable limp",
      "Failed previous surgery or broken implants needing revision reconstruction",
    ],
    techniques: [
      {
        name: "Biological Marrow Decortication & Grafting",
        description: "Re-ignites natural healing factors and packs viable bone cells into the fracture gap.",
      },
      {
        name: "High-Stability Revision Fixation",
        description: "Replaces failed implants with heavy-duty titanium constructs that compress bone ends.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Week 2 - 4", milestone: "Wound healed, protected mobilization shielding the new bone graft." },
      { timeline: "Week 8 - 12", milestone: "Follow-up X-ray demonstrates solid bone bridging across the former gap." },
      { timeline: "Month 4 - 6", milestone: "Full limb strength restored; normal walking without pain or limp." },
    ],
    faqs: [
      {
        q: "Can a bone that hasn't healed for over a year still unite?",
        a: "Yes! With proper biological bone grafting and rigid modern fixation, even long-standing non-unions achieve strong, solid healing in over 90% of cases.",
      },
    ],
  },

  // 30. 24/7 Emergency Accident Trauma (BMTC)
  {
    id: "emergency-accident-trauma-bmtc",
    slug: "emergency-accident-trauma-bmtc",
    aliases: ["emergency-trauma", "accident-care-bmtc"],
    title: "24/7 Emergency Accident Trauma Care (BMTC Kidwai Nagar)",
    shortDesc: "Round-the-clock emergency casualty response for road traffic accidents, pelvic fractures, and severe orthopedic emergencies.",
    category: "Trauma Care",
    iconName: "Stethoscope",
    tag: "24/7 Available",
    stats: {
      duration: "Immediate Triage",
      hospitalStay: "Inpatient Care",
      walkingResumed: "Emergency protocol",
      longevity: "Life & Limb Saving",
    },
    overview: "BMTC Hospital Kidwai Nagar operates a 24/7 emergency orthopedic trauma casualty unit led by Dr. Gaurav Bhargava. Equipped with digital X-ray, in-house emergency blood testing, high-dependency ICU beds, and laminar airflow modular operating theaters, patients involved in road traffic collisions or falls receive immediate life-saving and limb-saving surgical care.",
    indications: [
      "Road traffic accidents, motorcycle collisions, or high-level falls with bone injury",
      "Compound open fractures with bleeding or bone exposure requiring urgent cleaning",
      "Severe joint dislocations or crushing pelvic and hip injuries",
    ],
    techniques: [
      {
        name: "Damage Control Orthopedic Surgery (DCO)",
        description: "Rapidly stabilizes broken bones using external frames while stabilizing patient vital signs.",
      },
      {
        name: "Laminar Airflow Infection-Free Operating Theaters",
        description: "Ultra-clean air circulation drastically reduces the risk of post-traumatic surgical infection.",
      },
    ],
    recoveryMilestones: [
      { timeline: "Immediate", milestone: "Emergency triage, pain relief, temporary splinting, and digital diagnostics." },
      { timeline: "Day 1 - 3", milestone: "Definitive surgical alignment and modular titanium internal fixation." },
      { timeline: "Week 2+", milestone: "Structured inpatient and home physiotherapy guiding full physical recovery." },
    ],
    faqs: [
      {
        q: "Is emergency orthopedic surgery available at night?",
        a: "Yes. BMTC Hospital Kidwai Nagar has 24/7 emergency casualty staff, on-call anesthetists, modular OTs, and Dr. Gaurav Bhargava's surgical trauma team available round the clock.",
      },
    ],
  },
];

export interface TreatmentCategoryItem {
  id: string;
  name: string;
  shortDesc: string;
  whenNeeded: string;
  howHelps: string;
  recovery: string;
  slug: string;
  badge: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  items: TreatmentCategoryItem[];
}

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  {
    id: "knee-care",
    name: "Knee Care & Surgery",
    tagline: "End knee pain, straighten legs, and walk freely again",
    description:
      "Comprehensive surgical and non-surgical knee solutions: from high-flexion joint replacements to precision robotic alignment and gentle keyhole repairs.",
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
        slug: "robotic-knee-replacement",
        badge: "High Precision",
      },
      {
        id: "partial-knee-replacement",
        name: "Partial Knee Replacement",
        shortDesc: "Replacing only the damaged inner half of your knee while keeping your natural ligaments intact.",
        whenNeeded: "When arthritis affects only one side of the knee and the rest of the joint is completely healthy.",
        howHelps: "Requires a smaller incision, preserves the ACL, and delivers a completely natural knee bend.",
        recovery: "Shorter hospital stay (1–2 days) and faster recovery than full replacement.",
        slug: "partial-knee-replacement",
        badge: "Minimally Invasive",
      },
      {
        id: "knee-arthroscopy-meniscus",
        name: "Knee Keyhole Surgery (Arthroscopy & Meniscus)",
        shortDesc: "Tiny 4mm keyhole procedure to repair torn knee cushion (meniscus) and clean loose cartilage.",
        whenNeeded: "When the knee locks, catches, clicks, or swells after a sudden twist or sports strain.",
        howHelps: "Repairs the natural shock absorbers of the knee without opening the entire joint.",
        recovery: "Home on the same day or next day; back to normal walking within days.",
        slug: "knee-keyhole-meniscus",
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
        slug: "avn-hip-treatment",
        badge: "Specialized Focus",
      },
      {
        id: "hip-preservation",
        name: "Hip Preservation & Core Decompression",
        shortDesc: "Early-stage procedure to relieve bone pressure and stimulate fresh blood flow into the hip head.",
        whenNeeded: "In Stage 1 and Stage 2 AVN before the bone shape collapses, aiming to save your natural hip.",
        howHelps: "Drills tiny decompression channels and delivers healing growth factors to prevent hip replacement.",
        recovery: "Protected crutch walking for a few weeks while natural bone regeneration occurs.",
        slug: "hip-preservation-core-decompression",
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
        slug: "acl-reconstruction",
        badge: "Athletic Recovery",
      },
      {
        id: "pcl-multi-ligament",
        name: "PCL & Multi-Ligament Tear Repair",
        shortDesc: "Advanced keyhole reconstruction for complex knee injuries involving multiple damaged ligaments.",
        whenNeeded: "Following bike accidents or heavy sports impacts causing severe knee looseness or backward sagging.",
        howHelps: "Rebuilds knee alignment and multi-directional stability with anatomical graft placement.",
        recovery: "Supervised structured physical therapy to steadily regain full motion and quad strength.",
        slug: "pcl-multi-ligament-repair",
        badge: "Complex Reconstructive",
      },
      {
        id: "meniscus-repair",
        name: "Meniscus Repair (Keyhole)",
        shortDesc: "Micro-suturing torn cartilage cushions instead of removing them, preserving natural knee cushioning.",
        whenNeeded: "When twisting causes sharp joint line pain, swelling, or catching.",
        howHelps: "Saves your natural cartilage cushion to maintain shock absorption for life.",
        recovery: "Daycare or 1-day stay; gradual return to sports over 8 to 12 weeks.",
        slug: "meniscus-repair-surgery",
        badge: "Cartilage Saver",
      },
      {
        id: "ankle-sports-rehab",
        name: "Ankle Sprain & Sports Rehabilitation",
        shortDesc: "Targeted treatment for recurrent ankle sprains, Achilles tendon pain, and sports muscle tears.",
        whenNeeded: "After twisting an ankle that stays painful, weak, or swells repeatedly during walking.",
        howHelps: "Ligament strengthening, balance training, and non-surgical stabilization.",
        recovery: "Fast functional recovery with personalized athletic return-to-play protocols.",
        slug: "ankle-sprain-sports-rehab",
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
        slug: "rotator-cuff-repair",
        badge: "Keyhole Precision",
      },
      {
        id: "frozen-shoulder-care",
        name: "Frozen Shoulder Treatment",
        shortDesc: "Targeted therapy and gentle keyhole release to free up stiff, locked shoulder joints.",
        whenNeeded: "When your shoulder has become extremely tight, painful, and frozen in all directions.",
        howHelps: "Calms inflammation with targeted injections and safely expands the tight joint capsule.",
        recovery: "Immediate improvement in comfortable range of motion with home stretches.",
        slug: "frozen-shoulder-treatment",
        badge: "Mobility Restorer",
      },
      {
        id: "shoulder-dislocation-bankart",
        name: "Shoulder Dislocation Care (Bankart Repair)",
        shortDesc: "Keyhole stabilization for shoulders that repeatedly pop out of their socket.",
        whenNeeded: "After an initial shoulder dislocation that leaves the joint loose, insecure, or slipping out.",
        howHelps: "Re-anchors the torn joint rim (labrum) firmly to keep the shoulder permanently in place.",
        recovery: "Full confidence in lifting and overhead arm movement restored.",
        slug: "shoulder-dislocation-bankart",
        badge: "Stability Care",
      },
      {
        id: "tennis-elbow-care",
        name: "Tennis Elbow & Arm Pain Care",
        shortDesc: "Proven non-surgical relief and healing injections for stubborn outer elbow and forearm pain.",
        whenNeeded: "Pain when gripping, lifting a bag, shaking hands, or using a computer mouse.",
        howHelps: "PRP biological therapy and forearm tendon offloading to heal micro-tears naturally.",
        recovery: "Gradual reduction in pain within 2 to 4 weeks without surgery.",
        slug: "tennis-elbow-treatment",
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
        slug: "slip-disc-treatment",
        badge: "Non-Surgical Focus",
      },
      {
        id: "sciatica-nerve-relief",
        name: "Sciatica Nerve Pain Relief",
        shortDesc: "Targeted treatment for sharp, burning pain traveling from the lower back down the leg.",
        whenNeeded: "When electric shock-like sensations, tingling, or numbness shoot into your buttock, thigh, or foot.",
        howHelps: "Soothes the irritated sciatic nerve root using precision medication and targeted injections.",
        recovery: "Rapid relief in walking distance and comfortable sitting.",
        slug: "sciatica-nerve-relief",
        badge: "Fast Pain Relief",
      },
      {
        id: "cervical-spondylosis",
        name: "Cervical Spondylosis (Neck Pain)",
        shortDesc: "Relief for neck stiffness, shoulder blade aching, and arm tingling from desk work or age wear.",
        whenNeeded: "When prolonged phone or laptop use triggers neck tightness, headaches, or finger numbness.",
        howHelps: "Ergonomic alignment, cervical decompression stretches, and deep nerve calming therapy.",
        recovery: "Relief with simple daily neck posture habits and guided exercises.",
        slug: "cervical-spondylosis-neck-pain",
        badge: "Posture Care",
      },
      {
        id: "spine-injections",
        name: "Targeted Spine Nerve Blocks",
        shortDesc: "Safe, outpatient anti-inflammatory injections delivered directly near irritated spinal nerves.",
        whenNeeded: "When severe disc pain or sciatica does not settle with oral painkillers and rest.",
        howHelps: "Instantly calms nerve swelling, breaks the severe spasm cycle, and avoids spinal surgery.",
        recovery: "Walk out within 30 minutes; noticeable pain reduction within 24 to 48 hours.",
        slug: "targeted-spine-injections",
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
        slug: "joint-lubrication-gel-injections",
        badge: "Cartilage Cushion",
      },
      {
        id: "arthritis-prevention",
        name: "Arthritis & Cartilage Protection",
        shortDesc: "Comprehensive joint preservation plan combining weight offloading, knee exercises, and nutrition.",
        whenNeeded: "At the first sign of knee pain in your 40s or 50s to keep your joints healthy for decades.",
        howHelps: "Every 1 kg of body weight lost takes 4 kg of pressure off your knees with every single step.",
        recovery: "Ongoing joint comfort and active lifestyle preservation.",
        slug: "arthritis-cartilage-protection",
        badge: "Preventive Care",
      },
      {
        id: "heel-pain-plantar",
        name: "Heel Pain Care (Plantar Fasciitis)",
        shortDesc: "Fast, effective relief for stabbing morning heel pain when you take your very first steps.",
        whenNeeded: "Sharp heel pain upon waking up or standing up after sitting for a while.",
        howHelps: "Stretching regimens, custom foot orthotics, and localized healing injections.",
        recovery: "Quick morning comfort with proper footwear and simple calf stretches.",
        slug: "heel-pain-plantar-fasciitis",
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
        slug: "bone-fracture-plaster-alignment",
        badge: "Essential Care",
      },
      {
        id: "rod-plate-fixation",
        name: "Plate & Rod Bone Fixation (Nailing/Plating)",
        shortDesc: "Modern titanium plates, screws, and interlocking rods to hold complex broken bones securely.",
        whenNeeded: "For displaced fractures of thigh, leg, arm, or collarbone that cannot heal safely in plaster.",
        howHelps: "Provides immediate internal rigidity, allowing earlier limb movement and preventing joint stiffness.",
        recovery: "Supported early mobilization tailored to the specific fracture type.",
        slug: "plate-rod-bone-fixation",
        badge: "Surgical Precision",
      },
      {
        id: "old-fracture-nonunion",
        name: "Old Fracture & Non-Union Surgery",
        shortDesc: "Corrective treatment for broken bones that failed to heal properly after earlier treatment elsewhere.",
        whenNeeded: "When a past fracture remains painful, mobile, or has healed crookedly (malunion).",
        howHelps: "Cleans scar tissue, uses bone grafting, and applies stable modern fixation to restart healing.",
        recovery: "Restores normal limb shape and strength under expert follow-up.",
        slug: "old-fracture-nonunion-surgery",
        badge: "Corrective Specialist",
      },
      {
        id: "emergency-accident-trauma",
        name: "24/7 Emergency Accident Trauma (BMTC)",
        shortDesc: "Immediate emergency response for road traffic accidents, complex injuries, and pelvic trauma.",
        whenNeeded: "Any acute trauma emergency occurring day or night in Kanpur and surrounding areas.",
        howHelps: "Full hospital backup with modular clean OTs, high-dependency ICU, and experienced trauma teams.",
        recovery: "Comprehensive inpatient rehabilitation from day one until complete recovery.",
        slug: "emergency-accident-trauma-bmtc",
        badge: "24/7 Available",
      },
    ],
  },
];