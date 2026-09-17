export interface RecoveryPhase {
  phase: string;
  title: string;
  focus: string;
  actions: string[];
  tip: string;
}

export interface HomePrepItem {
  title: string;
  desc: string;
}

export interface CategoryRecoveryGuide {
  id: string;
  category: string;
  iconName: string;
  title: string;
  tagline: string;
  overview: string;
  homePrep: HomePrepItem[];
  phases: RecoveryPhase[];
  whenToCall: string[];
}

export const RECOVERY_GUIDES: CategoryRecoveryGuide[] = [
  {
    id: "knee-recovery",
    category: "Knee Care & Surgery",
    iconName: "Bone",
    title: "Knee Surgery Recovery Guide",
    tagline: "Total Knee, Robotic & Partial Knee Replacement Recovery",
    overview:
      "Modern knee replacement uses tissue-sparing techniques so you begin taking supported steps on Day 1. Recovery is smooth, steady, and focused on comfortable daily walking.",
    homePrep: [
      {
        title: "Clear Walking Pathways",
        desc: "Move loose floor mats, wires, and coffee tables so your walker moves freely without tripping hazards.",
      },
      {
        title: "Choose a Firm Armchair",
        desc: "Pick a chair with firm cushions and sturdy armrests so standing up is easy and comfortable.",
      },
      {
        title: "Bathroom Safety Setup",
        desc: "Use a non-slip rubber mat inside the shower and place a sturdy support rail near the toilet seat.",
      },
      {
        title: "Cold Gel Packs Ready",
        desc: "Keep 2 reusable gel ice packs in your freezer ready for soothing swelling relief upon returning home.",
      },
    ],
    phases: [
      {
        phase: "Day 1 (Within 24 Hours Post-Op)",
        title: "Your First Guided Steps",
        focus: "Gentle circulation, standing with support & comfort",
        actions: [
          "Gently flex your ankles and toes in bed to keep blood flowing smoothly and legs relaxed.",
          "Stand up and take your very first guided steps with a walker alongside our caring physiotherapist.",
          "Take slow, deep breaths to keep your lungs clear and your body energized.",
          "Targeted pain-relief medicine keeps you relaxed and comfortable, making standing surprisingly easy.",
        ],
        tip: "Always wait for your physiotherapist or nurse before standing up on Day 1. There is no rush — safety comes first!",
      },
      {
        phase: "Days 2 to 3 (In Hospital)",
        title: "Confidence Before Going Home",
        focus: "Corridor walking, chair sitting & safe stair steps",
        actions: [
          "Walk short, comfortable laps in the room and hospital hallway with your walker.",
          "Sit up comfortably in a chair for your meals and practice smooth sitting and standing.",
          "Learn our simple golden rule for stairs: 'Good leg steps up first, operated leg steps down first'.",
          "Dr. Gaurav Bhargava inspects your knee and applies a clean waterproof dressing before you head home by car.",
        ],
        tip: "When resting in bed, keep your leg naturally flat and straight. Avoid putting a pillow directly under your knee to ensure you walk tall and upright later on!",
      },
      {
        phase: "Weeks 1 to 2 (Home Healing)",
        title: "Settling In at Home",
        focus: "Calming swelling, gentle stretches & wound check",
        actions: [
          "Apply a cold ice pack wrapped in a cloth over your knee for 15 to 20 minutes, 3 to 4 times a day.",
          "Practice simple bed exercises guided by your home physiotherapist: gentle heel slides and thigh tightening.",
          "Take short 2-minute walks around the house every couple of hours during the day.",
          "Visit the clinic around Day 12 to 14 for a quick, painless dressing check and stitch removal.",
        ],
        tip: "Keep your waterproof dressing dry and clean. Avoid soaking your knee in a bath until Dr. Bhargava gives the all-clear.",
      },
      {
        phase: "Weeks 3 to 6 (Everyday Freedom)",
        title: "Stepping from Walker to Cane",
        focus: "Bending past 90 degrees, stationary cycling & household ease",
        actions: [
          "Gradually move from a four-legged walker to a light walking stick or cane as your leg strength builds.",
          "Bend your knee smoothly past 90 degrees to sit comfortably at dining tables and sofas.",
          "Start gentle pedaling on a stationary exercise bike to build smooth, effortless thigh power.",
          "Enjoy light household activities like making tea, walking in your garden, and moving freely.",
        ],
        tip: "Listen to your body. Avoid sudden sharp twists or sitting flat on the floor during these important healing weeks.",
      },
      {
        phase: "Weeks 7 to 12 & Beyond (Walking Free)",
        title: "Walking Pain-Free & Returning to Life",
        focus: "Walking without a stick, driving & social outings",
        actions: [
          "Walk completely on your own without any stick, cane, or limp — walking tall, balanced, and confident.",
          "Resume car driving once your operated leg feels strong and braking reaction time is effortless.",
          "Return to social activities: evening community walks, family gatherings, travel, and gentle swimming.",
          "An annual check-up with an X-ray ensures your implant remains strong and healthy for 25 to 30+ years.",
        ],
        tip: "Modern knee implants are built for lifelong walking and travel. Simply avoid high-impact jumping or contact sports.",
      },
    ],
    whenToCall: [
      "Sudden increase in calf pain, redness, or warmth.",
      "Persistent fever above 101°F (38.3°C).",
      "Noticeable fluid leakage from the surgical bandage.",
      "Sudden severe pain that does not settle with prescribed medicines.",
    ],
  },
  {
    id: "hip-recovery",
    category: "Hip Care & Surgery",
    iconName: "Activity",
    title: "Hip Surgery Recovery Guide",
    tagline: "Total Hip Replacement & AVN Hip Treatment Recovery",
    overview:
      "Modern ceramic hip replacement relieves deep groin pain almost immediately. Within hours of surgery, patients stand and experience stable, balanced weight-bearing.",
    homePrep: [
      {
        title: "High Sturdy Seating",
        desc: "Ensure living room chairs have firm seats at or above knee level so your hips remain comfortably open.",
      },
      {
        title: "Raised Toilet Seat",
        desc: "Install an elevated toilet seat adapter to make sitting down and standing up effortless.",
      },
      {
        title: "Long-Handled Shoe Horn",
        desc: "Keep a long shoe horn and slip-on footwear handy to avoid bending forward past 90 degrees.",
      },
      {
        title: "Clear Bedside Access",
        desc: "Arrange your bed so you can swing your legs in and out smoothly without awkward twisting.",
      },
    ],
    phases: [
      {
        phase: "Day 1 (Within 24 Hours Post-Op)",
        title: "Standing Tall Without Groin Pain",
        focus: "Full weight-bearing standing, breathing & circulation",
        actions: [
          "Stand up and take supported steps with a walker under physiotherapist guidance — the deep arthritic grinding is already gone!",
          "Gentle ankle rotations and toe pumps in bed to keep leg circulation active.",
          "Practice safe bed transfers: keeping your toes and knees pointing forward naturally.",
        ],
        tip: "Avoid crossing your legs while sitting or resting in bed during early recovery to protect hip alignment.",
      },
      {
        phase: "Days 2 to 3 (Pre-Discharge)",
        title: "Mastering Safe Movement",
        focus: "Corridor walks, chair sitting & stair techniques",
        actions: [
          "Walk smoothly along the hospital corridor with your walker, focusing on a balanced, even stride.",
          "Practice sitting in high chairs without bending your waist forward more than a right angle.",
          "Learn safe stair climbing: 'Up with the good leg first, down with the operated leg first'.",
        ],
        tip: "Use a firm pillow between your legs when lying on your side to keep your hips in natural alignment.",
      },
      {
        phase: "Weeks 1 to 2 (Home Comfort)",
        title: "Healing & Daily Gentle Walks",
        focus: "Swelling management, home stretches & wound check",
        actions: [
          "Short 5-minute walks inside your home every 2 to 3 hours during waking hours.",
          "Do your gentle bed exercises: buttock squeezes and gentle leg slide-outs.",
          "Clinic follow-up on Day 12 to 14 for dressing review and stitch removal with Dr. Bhargava.",
        ],
        tip: "Wear slip-on shoes or ask family members to help with socks so you don't reach down awkwardly.",
      },
      {
        phase: "Weeks 3 to 6 (Stepping Out)",
        title: "Moving to a Single Walking Stick",
        focus: "Normal walking stride, car rides & light chores",
        actions: [
          "Transition from your walker to a single walking stick held in the opposite hand.",
          "Walk comfortably outdoors on flat garden paths and apartment walkways.",
          "Resume light household routines, cooking, and comfortable desk work.",
        ],
        tip: "Avoid low, soft sofas or deep bucket seats during these weeks; always choose firm chairs.",
      },
      {
        phase: "Weeks 7 to 12 & Beyond (Active Living)",
        title: "Lifelong Pain-Free Freedom",
        focus: "Walking unassisted, driving & travel",
        actions: [
          "Walk completely without any stick or limp — your hip feels natural, strong, and flexible.",
          "Resume driving and normal outdoor shopping, travel, and social visits.",
          "Enjoy low-impact activities like swimming, walking, and gentle cycling.",
        ],
        tip: "Modern ceramic hip bearings last 25 to 30+ years. Keep a healthy body weight to protect your joint for life.",
      },
    ],
    whenToCall: [
      "Sudden sharp groin pain accompanied by a feeling of joint slipping.",
      "One leg suddenly appears significantly shorter or turned outward.",
      "Redness, warmth, or drainage around the hip wound.",
    ],
  },
  {
    id: "sports-recovery",
    category: "Sports Injury & Arthroscopy",
    iconName: "ShieldCheck",
    title: "Sports & ACL Recovery Guide",
    tagline: "Keyhole ACL, PCL & Meniscus Surgery Recovery Roadmap",
    overview:
      "Arthroscopic sports surgery uses tiny keyhole incisions to repair ligaments and cartilage. Recovery follows structured athletic milestones to rebuild strength and rotational stability.",
    homePrep: [
      {
        title: "Long Leg Brace",
        desc: "Have your hinged knee brace adjusted and ready as fitted by our sports physiotherapy team.",
      },
      {
        title: "Crutches Fitted Correctly",
        desc: "Ensure forearm or underarm crutches are adjusted to your height for safe, comfortable walking.",
      },
      {
        title: "Elevated Resting Pillows",
        desc: "Keep pillows ready to elevate your leg above heart level to rapidly drain swelling.",
      },
      {
        title: "Reusable Ice Gel Wraps",
        desc: "Have flexible cold wraps in your freezer to ice around the knee brace.",
      },
    ],
    phases: [
      {
        phase: "Day 1 (Immediate Post-Op)",
        title: "Protecting the New Ligament",
        focus: "Brace support, swelling control & quad muscle wake-up",
        actions: [
          "Rest with your leg elevated on pillows to allow natural fluid drainage.",
          "Begin gentle quadriceps sets: tightening your front thigh muscle while keeping your leg straight in the brace.",
          "Walk safely using crutches with touch-down weight bearing as instructed by your surgeon.",
        ],
        tip: "Keep your knee locked straight in the brace when walking or sleeping to protect the delicate new graft.",
      },
      {
        phase: "Weeks 1 to 2 (Early Healing)",
        title: "Controlling Swelling & Knee Bending",
        focus: "Reaching 90° bend, cold therapy & wound check",
        actions: [
          "Ice your knee for 15 to 20 minutes several times a day around the bandages.",
          "Practice seated heel slides under physiotherapist guidance, aiming for 90 degrees of comfortable knee bend.",
          "Clinic follow-up on Day 12 to 14 for stitch removal and brace angle adjustment.",
        ],
        tip: "Straightening your knee completely flat is just as important as bending it — practice resting your heel on a rolled towel.",
      },
      {
        phase: "Weeks 3 to 6 (Weaning off Crutches)",
        title: "Regaining Quad Strength & Normal Walking",
        focus: "Full weight-bearing, stationary cycling & unlocking brace",
        actions: [
          "Transition from two crutches down to one, and then walking smoothly without crutches inside the home.",
          "Begin smooth, low-resistance spinning on a stationary upright bicycle with the seat raised high.",
          "Advance to mini-squats, calf raises, and balance board training.",
        ],
        tip: "Avoid sudden pivoting, twisting on a planted foot, or kicking during this intermediate graft healing period.",
      },
      {
        phase: "Months 3 to 6 (Athletic Conditioning)",
        title: "Jogging & Agility Training",
        focus: "Straight-line jogging, jump landing & gym strengthening",
        actions: [
          "Start outdoor straight-line jogging once thigh muscle strength reaches 80% of your uninjured leg.",
          "Perform controlled agility ladder drills, side shuffles, and balance training.",
          "Dedicated gym strength work: leg presses, hamstring curls, and core stabilization.",
        ],
        tip: "Graft remodeling takes several months — don't rush into full matches until Dr. Bhargava completes your functional test.",
      },
      {
        phase: "Months 7 to 9 & Beyond (Full Sports Return)",
        title: "Competitive Sports & Full Fitness",
        focus: "Cutting, pivoting, match fitness & clearance",
        actions: [
          "Complete sports-specific drills (football, cricket, badminton, running) with full rotational confidence.",
          "Pass the return-to-sport functional hop test and quad strength comparison.",
          "Return to competitive games and high-intensity fitness with 100% stable knees.",
        ],
        tip: "Maintain weekly warm-up jump-landing drills (FIFA 11+ protocol) to keep your knees permanently protected.",
      },
    ],
    whenToCall: [
      "Knee brace feels painfully tight causing foot numbness or pins and needles.",
      "Sudden severe pop or giving-way sensation after a stumble.",
      "High fever or persistent hot swelling around the knee punctures.",
    ],
  },
  {
    id: "shoulder-recovery",
    category: "Shoulder & Arm Care",
    iconName: "Award",
    title: "Shoulder Surgery Recovery Guide",
    tagline: "Rotator Cuff Repair, Frozen Shoulder & Dislocation Recovery",
    overview:
      "Shoulder tendons heal slowly into bone, so patience during early sling protection pays off with lifelong strength, overhead mobility, and peaceful sleep.",
    homePrep: [
      {
        title: "Comfortable Arm Sling",
        desc: "Ensure your shoulder immobilizer sling fits comfortably with the neck strap padded.",
      },
      {
        title: "Button-Front Shirts",
        desc: "Keep loose shirts that button in the front ready so dressing doesn't require raising your arm.",
      },
      {
        title: "Recliner or Bed Wedges",
        desc: "Sleeping slightly propped up on extra pillows or in a recliner chair is much more comfortable for the first 2 weeks.",
      },
      {
        title: "Ice Pack Wraps",
        desc: "Keep flexible gel cold packs ready to drape comfortably over the top of your shoulder.",
      },
    ],
    phases: [
      {
        phase: "Weeks 1 to 2 (Sling Protection)",
        title: "Protecting the Repair & Resting Comfortably",
        focus: "Sling support, hand/wrist exercises & night comfort",
        actions: [
          "Wear your shoulder sling continuously, including during sleep, to keep the repaired tendon protected.",
          "Regularly open and close your hand, squeeze a soft stress ball, and rotate your wrist to prevent arm stiffness.",
          "Sleep propped up with 2 to 3 pillows behind your back or in an armchair — lying flat can feel uncomfortable early on.",
          "Clinic follow-up on Day 12 to 14 for wound dressing review.",
        ],
        tip: "Do not attempt to lift your arm using its own power — allow your arm to rest peacefully in the sling.",
      },
      {
        phase: "Weeks 3 to 6 (Passive Range of Motion)",
        title: "Gentle Guided Movement",
        focus: "Pendulum swings, assisted stretching & weaning off sling",
        actions: [
          "Perform gentle pendulum swings: leaning forward and letting your relaxed arm sway naturally in circles.",
          "Use your healthy arm or a pulley rope to gently lift the operated arm without engaging its muscles.",
          "Begin removing the sling for seated desk activities, writing, and eating meals.",
        ],
        tip: "Always let your good arm do the lifting work during this phase; the repaired tendon is still knitting to bone.",
      },
      {
        phase: "Weeks 7 to 12 (Active Movement & Strengthening)",
        title: "Moving Your Arm on Your Own",
        focus: "Lifting arm overhead, light resistance bands & daily tasks",
        actions: [
          "Lift your arm on its own: reaching for cups on shelves and combing your hair comfortably.",
          "Start light elastic resistance band exercises to rebuild shoulder blade and rotator cuff endurance.",
          "Resume light car driving once steering feels completely safe and painless.",
        ],
        tip: "Avoid lifting heavy groceries, pulling heavy doors, or sudden jerks until strength testing confirms full healing.",
      },
      {
        phase: "Months 4 to 6 & Beyond (Full Power Restored)",
        title: "Lifting, Sports & Sleeping Soundly",
        focus: "Heavy lifting, gym routines & overhead sports",
        actions: [
          "Return to active gym fitness: push-ups, light bench press, and overhead lifting.",
          "Resume recreational sports like badminton, swimming, and tennis.",
          "Sleep peacefully on either side without any lingering shoulder ache.",
        ],
        tip: "Continue simple shoulder blade posture stretches at your desk to prevent future tightness.",
      },
    ],
    whenToCall: [
      "Severe night pain that is not eased by prescribed medication and ice.",
      "Hand or fingers become pale, cold, or numb.",
      "Sling straps cause sharp neck irritation or skin chafing.",
    ],
  },
  {
    id: "spine-recovery",
    category: "Spine & Sciatica Care",
    iconName: "Activity",
    title: "Spine & Sciatica Recovery Guide",
    tagline: "Slip Disc, Sciatica Decompression & Spine Care Recovery",
    overview:
      "Whether recovering from a severe slip disc flare-up, targeted nerve block injection, or spinal decompression, structured ergonomic habits ensure lasting relief.",
    homePrep: [
      {
        title: "Firm Mattress",
        desc: "Sleep on a medium-firm supportive mattress that keeps your spine in neutral anatomical alignment.",
      },
      {
        title: "Lumbar Support Cushion",
        desc: "Keep a small cylindrical roll or lumbar cushion for your lower back when sitting.",
      },
      {
        title: "Knee Pillow for Sleeping",
        desc: "Keep a pillow to place under your knees when sleeping on your back, or between your knees on your side.",
      },
      {
        title: "Slip-On Shoes",
        desc: "Wear comfortable supportive shoes to avoid bending low at the waist to tie laces.",
      },
    ],
    phases: [
      {
        phase: "Days 1 to 3 (Calming Acute Spasms)",
        title: "Resting the Irritated Nerve",
        focus: "Pain relief, gentle walking & avoiding prolonged sitting",
        actions: [
          "Rest in a comfortable position: on your back with pillows beneath your knees, or on your side with a pillow between knees.",
          "Apply warm or cold compress to the lower back for 15 minutes to soothe muscle tightness.",
          "Take short 3 to 5 minute walks around the house every 2 hours — light walking helps spinal discs heal faster than bed rest.",
        ],
        tip: "Avoid sitting continuously in soft sofas or slumping at a desk for more than 20 minutes at a time.",
      },
      {
        phase: "Weeks 1 to 2 (Restoring Flexibility)",
        title: "Nerve Calming & Posture Reset",
        focus: "Gentle nerve glides, pelvic tilts & core engagement",
        actions: [
          "Practice gentle pelvic tilts and knee-to-chest stretches in bed under physiotherapist guidance.",
          "Learn to bend at your hips and knees instead of rounding your lower back when picking up items.",
          "Gradually increase your walking time to 15–20 minutes daily on flat terrain.",
        ],
        tip: "Remember: 'Lift with your legs, not with your back!' Keep objects close to your chest when carrying.",
      },
      {
        phase: "Weeks 3 to 6 (Core Muscle Shield)",
        title: "Strengthening Your Natural Back Support",
        focus: "Deep abdominal core stability & ergonomic workstation",
        actions: [
          "Engage in structured core stabilization exercises (bird-dog, bridges, and gentle planks).",
          "Set up an ergonomic desk workstation with your computer screen at eye level and lower back supported.",
          "Resume comfortable car driving for commute distances.",
        ],
        tip: "Take a 30-second standing break every 45 minutes of computer work to unload your spinal discs.",
      },
      {
        phase: "Weeks 7 & Beyond (Lifelong Back Health)",
        title: "Active Living & Preventing Recurrence",
        focus: "Endurance walking, swimming & healthy body weight",
        actions: [
          "Incorporate 30 minutes of brisk walking, swimming, or elliptical exercise into your daily routine.",
          "Maintain a healthy body weight — reducing belly weight directly relieves pressure on lumbar discs.",
          "Enjoy active family life, travel, and gardening with proper posture.",
        ],
        tip: "Never hesitate to perform simple back extension stretches if you feel mild stiffness after a long car ride.",
      },
    ],
    whenToCall: [
      "Sudden loss of bladder or bowel sensation (a true emergency requiring immediate evaluation).",
      "Progressive foot weakness or inability to lift your toes/foot upward (foot drop).",
      "Severe radiating pain that worsens despite resting and prescribed medicines.",
    ],
  },
  {
    id: "prp-recovery",
    category: "Non-Surgical Joint Care & PRP",
    iconName: "HeartPulse",
    title: "PRP & Joint Injection Recovery Guide",
    tagline: "Platelet-Rich Plasma & Hyaluronic Acid Lubrication Protocol",
    overview:
      "PRP biological therapy uses natural growth factors from your own blood to calm joint inflammation and stimulate cartilage repair with zero surgical downtime.",
    homePrep: [
      {
        title: "Loose Comfortable Pants",
        desc: "Wear loose clothing to your appointment so the knee or shoulder injection site is easily accessible.",
      },
      {
        title: "Ice Packs Ready",
        desc: "Keep a cold gel pack in the freezer at home in case you feel mild fullness or tightness in the joint.",
      },
      {
        title: "Paracetamol at Hand",
        desc: "Keep standard paracetamol ready for mild soreness. Avoid Ibuprofen/Brufen as it can interfere with PRP healing.",
      },
      {
        title: "Rest Day Planned",
        desc: "Plan a light, relaxing rest day following your injection session with no strenuous walking or gym workouts.",
      },
    ],
    phases: [
      {
        phase: "First 48 Hours (Post-Injection)",
        title: "Allowing Natural Growth Factors to Work",
        focus: "Rest, gentle walking & avoiding anti-inflammatory pills",
        actions: [
          "Walk out of the clinic comfortably right after the procedure; take it easy for the first 24 to 48 hours.",
          "Apply an ice pack for 10–15 minutes if you feel temporary mild fullness or aching inside the joint.",
          "Avoid NSAID painkillers (like Brufen, Voveran) for 2 weeks because PRP relies on natural biological signaling.",
        ],
        tip: "Mild tightness inside the joint for 24 to 48 hours is completely normal — it means your natural platelets are actively working!",
      },
      {
        phase: "Weeks 1 to 2 (Tissue Healing)",
        title: "Easing Back into Routine",
        focus: "Comfortable daily walks, light stretches & hydration",
        actions: [
          "Resume your normal daily household activities, walking, and desk work without restriction.",
          "Drink plenty of water to support healthy joint fluid replenishment.",
          "Perform gentle non-impact knee stretches and seated quad tightening.",
        ],
        tip: "Avoid high-impact jumping, running, or heavy squats during the first 2 weeks after injection.",
      },
      {
        phase: "Weeks 3 to 6 (Peak Cartilage Nourishment)",
        title: "Celebrating Noticeable Pain Relief",
        focus: "Reduced stiffness, smoother stairs & cycling",
        actions: [
          "Experience the peak biological effect: noticeably less grating, lighter morning walking, and less ache on stairs.",
          "Begin regular low-impact stationary cycling and brisk walking.",
          "Follow up with Dr. Gaurav Bhargava to evaluate joint response and plan second booster session if indicated.",
        ],
        tip: "Combine your PRP improvements with simple daily quad exercises — stronger muscles take 50% of the weight off your joint!",
      },
      {
        phase: "Months 3 to 12 & Beyond (Long-Term Comfort)",
        title: "Sustained Joint Vitality",
        focus: "Weight management, cartilage protection & annual booster",
        actions: [
          "Enjoy 9 to 18 months of sustained joint comfort and easy mobility without needing surgery.",
          "Maintain a healthy body weight to multiply the protective lifespan of your natural cartilage.",
          "Schedule a simple annual review to monitor cartilage health and decide on preventive boosters.",
        ],
        tip: "Every kilogram of excess weight lost reduces 4 kilograms of force on your knee joint with every single step!",
      },
    ],
    whenToCall: [
      "Significant redness, increasing heat, or severe swelling developing 2–3 days after injection.",
      "High fever developing following the procedure.",
      "Inability to bear any weight on the leg.",
    ],
  },
  {
    id: "trauma-recovery",
    category: "Bone Fractures & 24/7 Trauma Care",
    iconName: "Stethoscope",
    title: "Fracture & Trauma Recovery Guide",
    tagline: "Cast, Plate & Rod Fixation Bone Union Protocol",
    overview:
      "Whether treated with modern plaster casting or surgical titanium plates and rods, bones heal through predictable biological stages of new bone formation.",
    homePrep: [
      {
        title: "Cast Protection Covers",
        desc: "Keep a waterproof plastic cover ready to keep your plaster cast 100% dry during sponge baths.",
      },
      {
        title: "Firm Elevation Pillows",
        desc: "Keep pillows ready to elevate the fractured limb above heart level whenever resting to rapidly reduce swelling.",
      },
      {
        title: "Supportive Mobility Aids",
        desc: "Have a walker or crutches adjusted to your height for non-weight-bearing movement.",
      },
      {
        title: "Nutritious Calcium Diet",
        desc: "Stock up on calcium and vitamin D rich foods (milk, paneer, eggs, leafy greens) to fuel bone knitting.",
      },
    ],
    phases: [
      {
        phase: "Weeks 1 to 2 (Early Bone Alignment)",
        title: "Resting the Fracture & Draining Swelling",
        focus: "Limb elevation, pain relief & wigging fingers/toes",
        actions: [
          "Keep the injured limb elevated on pillows above chest height whenever sitting or lying down.",
          "Wiggle your toes or fingers regularly every hour to ensure healthy circulation and prevent stiffness.",
          "Take prescribed pain relievers and calcium supplements regularly.",
          "Follow up at BMTC Kidwai Nagar around Day 10 to 14 for first check X-ray and dressing/cast inspection.",
        ],
        tip: "Never stick sharp objects or knitting needles inside your plaster cast to scratch an itch; use a hair dryer on cool setting instead!",
      },
      {
        phase: "Weeks 3 to 6 (Early Bone Knitting)",
        title: "Soft Callus Formation",
        focus: "Protected movement, joint preservation & partial load",
        actions: [
          "New soft bone (callus) begins bridging the fracture gap — follow surgeon instructions on exact weight allowance.",
          "Gently move the free joints above and below the fracture to avoid muscle wasting.",
          "Second check X-ray around Week 4 to 6 to evaluate progress of bone union.",
        ],
        tip: "Do not put full body weight on a fractured leg until Dr. Gaurav Bhargava confirms satisfactory bone healing on X-ray.",
      },
      {
        phase: "Weeks 7 to 12 (Solid Bone Union)",
        title: "Progressing to Full Weight-Bearing",
        focus: "Transitioning off crutches, muscle rebuilding & cast removal",
        actions: [
          "Plaster cast removal or progression to unassisted walking if internal plate/rod was placed.",
          "Dedicated physiotherapy to restore joint flexibility and rebuild muscle bulk.",
          "Return to light desk employment, driving, and routine personal activities.",
        ],
        tip: "Skin under a newly removed cast may be dry and sensitive — wash gently with lukewarm water and apply moisturizer.",
      },
      {
        phase: "Months 4 to 6 & Beyond (Full Structural Strength)",
        title: "Full Physical Strength & Normal Life",
        focus: "Bone remodeling, unrestricted walking & work return",
        actions: [
          "The healed bone remodels back to its original strength and normal contour.",
          "Resume full sports, physical work, travel, and prolonged standing without fear.",
          "Modern titanium implants (plates and rods) can safely remain inside the body for life without needing removal.",
        ],
        tip: "Celebrate your healing! A well-aligned bone heals as strong as — and often stronger than — the uninjured bone.",
      },
    ],
    whenToCall: [
      "Fingers or toes become blue, unusually cold, or numb.",
      "Plaster cast becomes cracked, soft, loose, or wet.",
      "Sudden sharp increase in pain beneath the cast or surgical incision.",
    ],
  },
];
