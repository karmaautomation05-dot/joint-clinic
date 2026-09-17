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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Knee Replacement Recovery Guide & Timeline | Joint Clinic Kanpur",
  description:
    "A step-by-step clinical day-by-day and week-by-week recovery guide after Total Knee Replacement surgery by Dr. Gaurav Bhargava in Kanpur.",
  alternates: {
    canonical: "https://jointclinic.in/recovery-guide",
  },
  openGraph: {
    title: "Knee Replacement Day 0–90 Recovery Guide | Joint Clinic Kanpur",
    description:
      "Milestone-by-milestone recovery roadmap: First steps on Day 1, home exercises, walking independence, and long-term implant care by Dr. Gaurav Bhargava.",
    url: "https://jointclinic.in/recovery-guide",
    images: [
      {
        url: "/images/blogs/blog_knee_rehab.png",
        width: 800,
        height: 600,
        alt: "Knee Replacement Recovery Protocol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knee Replacement Recovery Guide | Joint Clinic",
    description: "Clinical day-by-day rehabilitation guide after knee replacement.",
    images: ["/images/blogs/blog_knee_rehab.png"],
  },
};

const TIMELINE_STEPS = [
  {
    phase: "Day 1 (Within 24 Hours Post-Op)",
    title: "Initial Mobilization & First Steps",
    focus: "Early circulation, reducing stiffness & preventing DVT",
    actions: [
      "Bedside ankle pump exercises every hour while awake to promote healthy venous blood return.",
      "Assisted standing with the physiotherapist using a standard four-legged walker.",
      "Deep breathing exercises and incentive spirometry to maintain lung capacity.",
      "Multi-modal pain management and adductor canal nerve block keeping discomfort minimal.",
    ],
    caution: "Do not attempt to stand or take steps without physical therapy assistance.",
  },
  {
    phase: "Days 2 – 3 (In-Hospital Rehabilitation)",
    title: "Building Confidence & Discharge Preparation",
    focus: "Independence in transfers, bathroom visits & stair safety",
    actions: [
      "Walking longer hospital corridor distances with a walker.",
      "Practicing gentle seated knee bending aiming for 70° – 80° flexion.",
      "Learning stair climbing: 'Up with the good leg first, down with the operated leg first'.",
      "Wound inspection, dressing change, and oral medication transition before discharge.",
    ],
    caution: "Never place a pillow directly beneath your operated knee when resting; keep leg straight to prevent joint contracture.",
  },
  {
    phase: "Weeks 1 – 2 (Early Home Recovery)",
    title: "Home Transition & Gentle Range of Motion",
    focus: "Swelling reduction, wound healing & reaching 90° bend",
    actions: [
      "Regular cold pack application (cryotherapy) for 20 minutes, 3 to 4 times a day.",
      "Supervised home physical therapy: straight leg raises, quadriceps sets, and heel slides.",
      "Walking short intervals every 2 hours during daytime to prevent stiffness.",
      "Follow-up visit with Dr. Gaurav Bhargava around Day 12 to 14 for suture removal.",
    ],
    caution: "Avoid soaking the surgical incision in baths until cleared by the doctor.",
  },
  {
    phase: "Weeks 3 – 6 (Functional Independence)",
    title: "Weaning from Walker to Single Cane",
    focus: "110°+ flexion, strength restoration & stationary cycling",
    actions: [
      "Transitioning from walker to a single elbow crutch or walking stick.",
      "Initiating low-resistance stationary upright cycling with seat elevated.",
      "Climbing home stairs independently using handrails.",
      "Restoration of independent personal care, cooking, and light household mobility.",
    ],
    caution: "Do not attempt sudden pivoting or deep floor-squatting during this healing phase.",
  },
  {
    phase: "Weeks 7 – 12 & Beyond (Long-Term Vitality)",
    title: "Unassisted Walking & Full Social Life",
    focus: "Muscle endurance, driving resumption & lifelong joint health",
    actions: [
      "Walking completely unassisted without any walking stick or limp.",
      "Resuming car driving once reaction time and leg strength are certified.",
      "Engaging in low-impact recreational activities: swimming, walking, golf, and gentle cycling.",
      "Annual preventative check-ups with X-rays to verify implant stability.",
    ],
    caution: "High-impact sports like sprinting or heavy jumping should be avoided to maximize implant lifespan beyond 25–30 years.",
  },
];

const PRE_SURGERY_CHECKLIST = [
  "Prepare your home: Remove loose rugs, electrical wires, and tripping hazards.",
  "Arrange a firm, high-seated chair with arms for easy sitting and standing.",
  "Install non-slip rubber mats and sturdy grab bars in the bathroom.",
  "Keep necessary items within waist-to-shoulder height in your bedroom and kitchen.",
  "Organize a comfortable resting bed that allows keeping your leg flat and elevated.",
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
              Patient Care Roadmap
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight text-white">
              Knee Replacement Recovery Guide
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 leading-relaxed font-sans">
              Authored by <strong className="text-white">Dr. Gaurav Bhargava</strong>: A detailed
              day-by-day and week-by-week timeline designed to remove fear and help you achieve
              rapid, confident independence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Roadmap */}
      <div className="container -mt-10 relative z-20 space-y-12">
        {/* Pre-Op Home Preparation */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Home Preparation Checklist (Before Hospitalization)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Simple adjustments to your home that ensure safety and convenience after surgery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {PRE_SURGERY_CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-brand-50/30 border border-brand-100 text-xs sm:text-sm text-slate-800 font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase-by-Phase Timeline */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              Day-by-Day Post-Operative Milestones
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every patient heals at their own pace, but this roadmap reflects what 95%+ of our
              patients achieve following modern tissue-sparing knee arthroplasty.
            </p>
          </div>

          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-10 shadow-sm space-y-5 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 w-fit">
                  {step.phase}
                </span>
                <span className="text-xs font-semibold text-slate-500 italic">
                  Clinical Focus: {step.focus}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-slate-900">{step.title}</h3>

              {/* Action Bullets */}
              <div className="space-y-2.5 pt-1">
                {step.actions.map((act, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0 mt-2" />
                    <span className="leading-relaxed">{act}</span>
                  </div>
                ))}
              </div>

              {/* Clinical Caution */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-bold">Clinical Precaution:</strong> {step.caution}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="bg-brand-950 text-white rounded-[2.5rem] p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600 rounded-full blur-[100px] opacity-25"></div>
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-serif font-bold">Facing Joint Surgery? Have Questions?</h3>
            <p className="text-sm sm:text-base text-brand-100 max-w-xl mx-auto leading-relaxed mt-2">
              Dr. Gaurav Bhargava and our dedicated rehabilitation team walk beside you through every
              stage of your recovery.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/appointment"
                className="btn-primary py-3.5 px-8 text-sm font-semibold"
              >
                Book a Consultation
              </Link>
              <Link
                href="/blog/long-life-knee-replacement-modern-implants"
                className="btn-secondary py-3.5 px-6 text-sm font-semibold"
              >
                Read: How Modern Knee Implants Last 25+ Years &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
