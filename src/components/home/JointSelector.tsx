"use client";

import { useState } from "react";
import Link from "next/link";
import { Bone, Activity, Award, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

interface JointCondition {
  id: string;
  name: string;
  icon: typeof Bone;
  tagline: string;
  symptoms: string[];
  commonCauses: string[];
  recommendedTreatments: {
    title: string;
    href: string;
    type: "Surgical" | "Non-Surgical";
    badge: string;
  }[];
}

const JOINTS_DATA: JointCondition[] = [
  {
    id: "knee",
    name: "Knee Joint",
    icon: Bone,
    tagline: "Difficulty climbing stairs, severe grating crepitus, or knee buckling",
    symptoms: [
      "Severe joint pain when descending or climbing stairs",
      "Inability to bend knee past 90 degrees or sit cross-legged",
      "Persistent bone-on-bone grating and morning stiffness",
      "Knee giving way, sudden locking, or clicking during twisting",
    ],
    commonCauses: [
      "Grade 3 & 4 Knee Osteoarthritis (articular cartilage erosion)",
      "Anterior Cruciate Ligament (ACL) or PCL rupture",
      "Meniscus tear with mechanical joint locking",
    ],
    recommendedTreatments: [
      {
        title: "Knee Replacement Surgery",
        href: "/treatments/total-knee-replacement",
        type: "Surgical",
        badge: "High-Flexion 25+ Yrs",
      },
      {
        title: "Sports Injury & ACL Treatment",
        href: "/treatments/sports-injury-acl-treatment",
        type: "Surgical",
        badge: "4mm Keyhole",
      },
      {
        title: "PRP Therapy & Joint Pain Care",
        href: "/treatments/joint-preservation-prp",
        type: "Non-Surgical",
        badge: "Cartilage Protection",
      },
    ],
  },
  {
    id: "hip",
    name: "Hip & Pelvis",
    icon: Activity,
    tagline: "Deep groin pain, limited leg rotation, or an unavoidable limp",
    symptoms: [
      "Deep groin pain radiating down the anterior thigh to the knee",
      "Stiffness putting on shoes, tying laces, or getting in/out of vehicles",
      "Noticeable antalgic limping and progressive leg shortening",
      "Severe night pain that prevents uninterrupted sleep",
    ],
    commonCauses: [
      "Avascular Necrosis (AVN) of the femoral head (Stages 2-4)",
      "Severe Hip Osteoarthritis or Ankylosing Spondylitis",
      "Femoral neck fractures and post-traumatic hip degeneration",
    ],
    recommendedTreatments: [
      {
        title: "Hip Replacement Surgery",
        href: "/treatments/hip-replacement",
        type: "Surgical",
        badge: "Uncemented Ceramic",
      },
      {
        title: "PRP & Joint Preservation",
        href: "/treatments/joint-preservation-prp",
        type: "Non-Surgical",
        badge: "Early AVN Stage",
      },
    ],
  },
  {
    id: "shoulder",
    name: "Shoulder Joint",
    icon: Award,
    tagline: "Inability to raise arm overhead, sharp night pain, or recurrent instability",
    symptoms: [
      "Unable to sleep on the affected shoulder due to dull aching",
      "Sharp pain during overhead reach, lifting, or combing hair",
      "Marked weakness in arm abduction and external rotation",
      "Shoulder popping out of socket with minor movements",
    ],
    commonCauses: [
      "Full or Partial-Thickness Rotator Cuff Tendon Tear",
      "Recurrent Anterior Shoulder Dislocation (Bankart Lesion)",
      "Refractory Frozen Shoulder (Adhesive Capsulitis)",
    ],
    recommendedTreatments: [
      {
        title: "Shoulder & Rotator Cuff Treatment",
        href: "/treatments/shoulder-arthroscopy",
        type: "Surgical",
        badge: "Keyhole Surgery",
      },
      {
        title: "Shoulder Dislocation & Bankart Repair",
        href: "/treatments/shoulder-arthroscopy",
        type: "Surgical",
        badge: "Labral Fixation",
      },
      {
        title: "PRP & Non-Surgical Joint Care",
        href: "/treatments/joint-preservation-prp",
        type: "Non-Surgical",
        badge: "Conservative",
      },
    ],
  },
  {
    id: "spine-trauma",
    name: "Spine & Trauma",
    icon: Sparkles,
    tagline: "Radiating leg sciatica, intense back spasms, or acute traumatic fractures",
    symptoms: [
      "Electric shock-like nerve pain shooting past the knee (sciatica)",
      "Locked back spasms that occur after bending or lifting weights",
      "Acute bone deformity and severe swelling following fall or road accident",
    ],
    commonCauses: [
      "Lumbar Disc Herniation (Slipped Disc) vs Paraspinal Muscle Spasm",
      "High-energy peri-articular, femoral, or pelvic trauma fractures",
    ],
    recommendedTreatments: [
      {
        title: "Bone Fracture & Emergency Surgery",
        href: "/treatments/complex-trauma-fractures",
        type: "Surgical",
        badge: "Emergency Modular OT",
      },
      {
        title: "Slip Disc & Sciatica Spine Care",
        href: "/treatments/spine-sciatica-care",
        type: "Non-Surgical",
        badge: "Decompression",
      },
    ],
  },
];

export default function JointSelector() {
  const [selectedJointId, setSelectedJointId] = useState("knee");
  const currentJoint = JOINTS_DATA.find((j) => j.id === selectedJointId) || JOINTS_DATA[0];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-blue px-3 py-1 rounded-md bg-blue-50 border border-brand-blue/20 inline-block mb-3">
            DIAGNOSTIC TRIAGE TOOL
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Where Does Your Joint Hurt?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Select an anatomical region to review clinical symptoms and recommended tertiary surgical
            or conservative options.
          </p>
        </div>

        {/* High-Tech Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {JOINTS_DATA.map((joint) => {
            const Icon = joint.icon;
            const isSelected = joint.id === selectedJointId;
            return (
              <button
                key={joint.id}
                type="button"
                onClick={() => setSelectedJointId(joint.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-brand-navy text-white shadow-md ring-2 ring-brand-blue/40"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-brand-blue"}`}
                />
                <span>{joint.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Joint Card */}
        <div className="bg-slate-50/60 rounded-3xl border border-slate-200 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Clinical Symptoms & Likely Etiology */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-[11px] font-bold text-brand-blue uppercase tracking-wider">
                  Clinical Presentation
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-navy mt-1">
                  {currentJoint.name} Assessment
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 italic font-medium">
                  &ldquo;{currentJoint.tagline}&rdquo;
                </p>
              </div>

              {/* Symptoms Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Reported Symptom Indicators:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentJoint.symptoms.map((symptom, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-brand-navy font-medium bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Underlying Diagnoses */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy font-mono">
                  Differential Diagnoses:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {currentJoint.commonCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Treatment Paths */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy font-mono">
                  Evidence-Based Treatment Pathways
                </h4>
                <span className="font-mono text-[10px] text-brand-blue font-bold">
                  Dr. Gaurav Bhargava
                </span>
              </div>

              <div className="space-y-3">
                {currentJoint.recommendedTreatments.map((treatment, idx) => (
                  <Link
                    key={idx}
                    href={treatment.href}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-brand-blue hover:bg-blue-50/40 transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                        {treatment.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                            treatment.type === "Surgical"
                              ? "bg-blue-100 text-brand-blue"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {treatment.type}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {treatment.badge}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/appointment"
                  className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-brand-blue hover:bg-brand-blueHover flex items-center justify-center gap-2 shadow transition-colors"
                >
                  Consult for {currentJoint.name} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
