import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Activity,
  HeartPulse,
  Phone,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { PRIMARY_CONTACT } from "@/data/clinics";

export const metadata: Metadata = {
  title: "Knee Replacement Recovery Guide & Timeline | Joint Clinic Kanpur",
  description:
    "A clear, step-by-step patient recovery guide after knee replacement surgery by Dr. Gaurav Bhargava in Kanpur. Plain-language milestones from Day 1 to lifelong walking.",
  alternates: {
    canonical: "https://jointclinic.in/recovery-guide",
  },
  openGraph: {
    title: "Knee Replacement Recovery Roadmap | Joint Clinic Kanpur",
    description:
      "Simple, comforting, and clear recovery milestones: Taking your first steps on Day 1, home exercises, walking without a stick, and returning to active life.",
    url: "https://jointclinic.in/recovery-guide",
    images: [
      {
        url: "/images/blogs/blog_knee_rehab.png",
        width: 800,
        height: 600,
        alt: "Knee Replacement Recovery Roadmap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knee Replacement Recovery Guide | Joint Clinic",
    description: "Step-by-step patient recovery timeline in simple language.",
    images: ["/images/blogs/blog_knee_rehab.png"],
  },
};

const TIMELINE_STEPS = [
  {
    phase: "Day 1 (Within 24 Hours After Surgery)",
    title: "Your Very First Steps & Getting Comfortable",
    focus: "Gentle movement, good circulation & walking with support",
    actions: [
      "Point and flex your toes and ankles gently in bed — this natural movement keeps your calf muscles relaxed and your blood flowing smoothly.",
      "Stand up and take your very first guided steps with a sturdy walker, supported closely side-by-side by our caring physiotherapist.",
      "Take gentle, deep breaths to keep your chest clear and your body energized.",
      "Modern, targeted pain-relief medicine keeps you comfortable and relaxed, so standing up feels surprisingly easy.",
    ],
    tip: "There is never any rush. Always wait for your physiotherapist or nurse before standing up on Day 1. Safety and comfort come first!",
  },
  {
    phase: "Days 2 to 3 (In the Hospital)",
    title: "Building Confidence Before Heading Home",
    focus: "Walking in corridors, easy chair sitting & safe stair steps",
    actions: [
      "Walk short, confident laps around your hospital room and down the hallway with your walker.",
      "Practice sitting comfortably in a high chair for meals and getting up without straining.",
      "Learn our simple golden rule for stairs: 'Good leg steps up first, operated leg steps down first'.",
      "Dr. Gaurav Bhargava inspects your knee, applies a clean waterproof dressing, and gives you a clear medication plan before you head home comfortably by car.",
    ],
    tip: "When resting in bed, keep your leg naturally flat and straight. Avoid putting a pillow directly under your knee — keeping it straight helps you walk tall and upright later on!",
  },
  {
    phase: "Weeks 1 to 2 (Settling In at Home)",
    title: "Healing Smoothly in the Comfort of Home",
    focus: "Calming swelling, simple bed exercises & wound care",
    actions: [
      "Place a soothing cold ice pack wrapped in a cloth over your knee for 15 to 20 minutes, 3 to 4 times a day, to calm warmth and puffiness.",
      "Do your daily gentle exercises in bed with your home physiotherapist — simple heel slides and tightening your front thigh muscles.",
      "Take short 2-minute walks around the house every couple of hours during the day to keep your joints limber.",
      "Visit Joint Clinic around Day 12 to 14 for a quick, painless dressing check and stitch removal with Dr. Bhargava.",
    ],
    tip: "Keep your waterproof dressing clean and dry. Avoid soaking your knee in a bath or bucket until Dr. Bhargava gives you the green light.",
  },
  {
    phase: "Weeks 3 to 6 (Gaining Everyday Freedom)",
    title: "Stepping from Walker to a Simple Cane",
    focus: "Bending past 90 degrees, stationary cycling & household independence",
    actions: [
      "Step up from a four-legged walker to a light single walking stick or cane as your leg strength builds.",
      "Bend your knee smoothly past a right angle (90 degrees) to sit naturally at dining tables and sofas.",
      "Start gentle pedaling on a stationary exercise bike to build smooth, effortless thigh power.",
      "Enjoy light daily activities like preparing morning tea, walking in your garden, and moving freely around your home.",
    ],
    tip: "Listen to your body. Avoid sudden sharp twists or sitting flat on the floor during these important healing weeks.",
  },
  {
    phase: "Weeks 7 to 12 & Beyond (Returning to Life)",
    title: "Walking Pain-Free with Full Confidence",
    focus: "Walking without a stick, driving & enjoying social life",
    actions: [
      "Walk completely on your own without any stick, cane, or limp — walking tall, balanced, and pain-free.",
      "Resume driving your car once your operated leg feels strong and your braking response is quick and effortless.",
      "Return to the activities you love: evening walks with friends, family gatherings, travel, and gentle swimming.",
      "A simple annual check-up with an X-ray ensures your high-tech implant stays strong and smooth for 25 to 30+ years.",
    ],
    tip: "Modern knee implants are designed for lifelong walking, travel, and active living. Simply avoid high-impact jumping or heavy contact sports to keep your new knee in pristine condition!",
  },
];

const PRE_SURGERY_CHECKLIST = [
  {
    title: "Clear Walking Pathways",
    desc: "Remove loose floor rugs, carpets, and extension cords so your walker glides freely without tripping hazards.",
  },
  {
    title: "Set Up a High, Sturdy Chair",
    desc: "Pick a firm chair with armrests in your living room so sitting down and standing up are effortless.",
  },
  {
    title: "Bathroom Safety First",
    desc: "Place a non-slip rubber mat on your bathroom floor and ensure a firm handrail or support is within easy reach.",
  },
  {
    title: "Keep Daily Essentials Handy",
    desc: "Keep your phone charger, medicines, reading glasses, and a water bottle at waist-height near your bedside.",
  },
  {
    title: "Stock Up on Cold Gel Packs",
    desc: "Keep 2 reusable gel ice packs in your freezer ready for soothing swelling relief once you return home.",
  },
  {
    title: "Arrange a Family Helper",
    desc: "Having a family member or caregiver by your side for the first week makes daily routines comforting and peaceful.",
  },
];

export default function RecoveryGuidePage() {
  return (
    <div className="bg-white pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#059B8F] to-[#0A7C97] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#02BAB9]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-4">
              Step-by-Step Patient Guide
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Your Knee Recovery Roadmap
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Guidance from <strong className="text-white">Dr. Gaurav Bhargava</strong>: A warm, clear, and reassuring
              timeline showing exactly what to expect from Day 1 to walking pain-free. No medical jargon — just practical support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Roadmap */}
      <div className="container -mt-10 relative z-20 space-y-12">
        {/* Pre-Op Home Preparation */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-[#059B8F] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Getting Your Home Ready Before Surgery
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                A few small, simple preparations to make your home comfortable and completely safe when you return.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {PRE_SURGERY_CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-brand-50/40 border border-brand-100 flex flex-col justify-between space-y-2 hover:bg-brand-50/70 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <CheckCircle2 className="w-5 h-5 text-[#059B8F] shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase-by-Phase Timeline */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059B8F] block mb-2">
              Your Healing Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              What to Expect: From Day 1 to Full Recovery
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every body heals at its own natural pace, but with modern muscle-sparing techniques,
              over 95% of our patients celebrate these exact milestones.
            </p>
          </div>

          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-10 shadow-xs space-y-5 hover:shadow-lg hover:border-brand-200 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#059B8F] px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-100 w-fit">
                  {step.phase}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {step.focus}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-slate-900">
                {step.title}
              </h3>

              {/* Action Bullets */}
              <div className="space-y-3 pt-1">
                {step.actions.map((act, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#059B8F] shrink-0 mt-2" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

              {/* Patient-Friendly Tip */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#F18712] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-bold text-[#F18712]">Helpful Advice:</strong> {step.tip}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 24/7 Support & Reassurance Card */}
        <div className="bg-gradient-to-r from-[#059B8F] to-[#0A7C97] text-white rounded-[2.5rem] p-8 sm:p-14 text-center space-y-5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD09] px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs inline-block mb-2">
              We Are Always With You
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold">
              Have a Question During Your Recovery?
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed mt-2">
              Dr. Gaurav Bhargava and our dedicated clinical team are just a phone call or WhatsApp away.
              You are never recovering alone.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/appointment"
                className="px-8 py-3.5 rounded-full bg-[#F18712] hover:bg-[#d96e00] text-white text-sm font-bold transition-colors shadow-md"
              >
                Book a Check-up Visit
              </Link>
              <a
                href={`tel:${PRIMARY_CONTACT.phone}`}
                className="px-8 py-3.5 rounded-full bg-white text-[#059B8F] hover:bg-slate-50 text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Phone size={16} className="text-[#059B8F]" />
                <span>Call Us: +91 73090 38872</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
