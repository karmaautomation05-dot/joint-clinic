'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import type * as THREE from 'three'
import { AnatomyType, getAnatomyType } from '@/utils/anatomy'

export { getAnatomyType }
export type { AnatomyType }

export interface CalloutPoint {
  id: string
  title: string
  desc: string
  pos: [number, number, number]
  color: string
}

const CALLOUTS_DATA: Record<AnatomyType, { surgical: CalloutPoint[]; recovery: CalloutPoint[] }> = {
  knee: {
    surgical: [
      { id: 'femoral', title: 'Femoral Component', desc: 'Anatomically contoured cobalt-chrome femoral shield replicating natural condylar curvature.', pos: [0, 0.42, 0.48], color: '#02BAB9' },
      { id: 'poly', title: 'UHMWPE Bearing Insert', desc: 'Highly cross-linked polyethylene shock-absorbing insert for frictionless gliding and 25+ year durability.', pos: [0, 0.08, 0.52], color: '#F18712' },
      { id: 'tibial', title: 'Tibial Baseplate', desc: 'Titanium alloy tibial tray providing sub-millimeter fixation to the proximal tibial bone bed.', pos: [0, -0.22, 0.46], color: '#059B8F' },
      { id: 'patella', title: 'Patellar Tracking', desc: 'Preserved native kneecap with optimized trochlear groove tracking for natural, pain-free stair climbing.', pos: [0, 0.28, 0.65], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-day1', title: 'Day-1 Load Transfer', desc: 'Direct axial stability allows 100% safe weight-bearing and supported walking within 24 hours of surgery.', pos: [0, -0.22, 0.46], color: '#059B8F' },
      { id: 'rec-quad', title: 'Quadriceps Gliding', desc: 'Active patellar tendon excursion enables early straight leg raises and rapid neuromuscular reactivation.', pos: [0, 0.28, 0.65], color: '#02BAB9' },
      { id: 'rec-rom', title: 'Bending Arc (0°-120°)', desc: 'Optimized posterior condylar offset facilitates smooth knee flexion without impingement or stiffness.', pos: [0, 0.42, 0.48], color: '#F18712' },
      { id: 'rec-bearing', title: 'Zero Wear Cushion', desc: 'UHMWPE articular insert eliminates bone friction for pain-free long-distance walking.', pos: [0, 0.08, 0.52], color: '#0A7C97' },
    ],
  },
  hip: {
    surgical: [
      { id: 'acetabulum', title: 'Acetabular Cup', desc: 'Titanium shell with trabecular porous coating for rapid biological bone ingrowth.', pos: [0.15, 0.45, 0.25], color: '#02BAB9' },
      { id: 'head', title: 'Ceramic Femoral Ball', desc: 'High-hardness BIOLOX ceramic head providing micro-smooth articulation and low friction.', pos: [0.05, 0.32, 0.22], color: '#F18712' },
      { id: 'neck', title: 'Anatomical Offset Neck', desc: 'Restores exact limb length and abductor muscle biomechanics to prevent limping.', pos: [-0.15, 0.18, 0.15], color: '#0A7C97' },
      { id: 'stem', title: 'Titanium Femoral Stem', desc: 'Triple-tapered femoral stem achieving rigid proximal press-fit fixation inside femoral canal.', pos: [-0.22, -0.25, 0.05], color: '#059B8F' },
    ],
    recovery: [
      { id: 'rec-walk', title: 'Day-1 Walking Axis', desc: 'Immediate stable mechanical press-fit allows walker-assisted stepping on Day 1.', pos: [-0.22, -0.25, 0.05], color: '#059B8F' },
      { id: 'rec-abductor', title: 'Gluteus Medius Strength', desc: 'Restored hip offset empowers abductor muscles for level pelvic control without Trendelenburg gait.', pos: [-0.15, 0.18, 0.15], color: '#02BAB9' },
      { id: 'rec-ingrowth', title: 'Porous Bone Ingrowth', desc: 'Biological osseointegration locks the acetabular cup permanently into pelvic bone over 6 weeks.', pos: [0.15, 0.45, 0.25], color: '#F18712' },
      { id: 'rec-disloc', title: 'Capsular Stability', desc: 'Tissue-sparing surgical approach protects posterior capsule, enabling safe sitting and movement.', pos: [0.05, 0.32, 0.22], color: '#0A7C97' },
    ],
  },
  shoulder: {
    surgical: [
      { id: 'rotator', title: 'Supraspinatus Tendon', desc: 'Anatomically re-anchored rotator cuff tendon restored flush onto humeral greater tuberosity.', pos: [0.12, 0.38, 0.22], color: '#F18712' },
      { id: 'head', title: 'Humeral Head Articulation', desc: 'Smooth spherical humeral head articulating with preserved glenoid socket.', pos: [0.0, 0.18, 0.15], color: '#02BAB9' },
      { id: 'glenoid', title: 'Glenoid Labrum', desc: 'Repaired fibrocartilaginous labral bumper preventing shoulder instability and subluxation.', pos: [-0.28, 0.15, 0.08], color: '#059B8F' },
      { id: 'acromion', title: 'Subacromial Clearance', desc: 'Targeted decompression creates ample space for impingement-free arm lifting.', pos: [0.05, 0.52, 0.18], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-pendulum', title: 'Passive Pendulum Glide', desc: 'Early gentle Codman exercises prevent joint capsule contracture and adhesive capsulitis.', pos: [0.0, 0.18, 0.15], color: '#02BAB9' },
      { id: 'rec-tendon', title: 'Tendon-Bone Union', desc: 'Protected sling phase allows vascular ingrowth between tendon footprint and cortical bone.', pos: [0.12, 0.38, 0.22], color: '#F18712' },
      { id: 'rec-scapula', title: 'Scapulothoracic Rhythm', desc: 'Targeted trapezius and serratus exercises rebuild dynamic overhead elevation.', pos: [-0.28, 0.15, 0.08], color: '#059B8F' },
      { id: 'rec-reach', title: 'Active Overhead Reach', desc: 'Progressive resistance training restores full overhead functional mobility at 8-12 weeks.', pos: [0.05, 0.52, 0.18], color: '#0A7C97' },
    ],
  },
  spine: {
    surgical: [
      { id: 'disc', title: 'Intervertebral Disc Space', desc: 'Cushioning fibrocartilage space maintaining neural foramen height between vertebrae.', pos: [0, 0.08, 0.25], color: '#02BAB9' },
      { id: 'herniation', title: 'Targeted Discectomy Site', desc: 'Microscopic removal of protruding disc fragment relieving mechanical nerve compression.', pos: [0.18, 0.05, 0.12], color: '#F18712' },
      { id: 'nerve', title: 'Decompressed Nerve Root', desc: 'Spinal root fully freed from stenosis, ending radiating leg sciatica and numbness.', pos: [0.26, -0.05, 0.0], color: '#059B8F' },
      { id: 'vertebra', title: 'Lumbar Motion Segment', desc: 'Preserved vertebral bodies and facet joints providing natural rotational and flexion stability.', pos: [0, 0.42, 0.18], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-decomp', title: 'Sciatic Nerve Relief', desc: 'Immediate relief of burning leg pain as root swelling resolves with anti-inflammatory therapy.', pos: [0.26, -0.05, 0.0], color: '#059B8F' },
      { id: 'rec-core', title: 'Core Muscle Activation', desc: 'Deep abdominal bracing stabilizes the lumbar motion segment during daily transfers.', pos: [0, 0.42, 0.18], color: '#0A7C97' },
      { id: 'rec-annulus', title: 'Annular Scar Healing', desc: 'Fibrous outer disc ring consolidates over 6 weeks, preventing recurrent disc herniation.', pos: [0.18, 0.05, 0.12], color: '#F18712' },
      { id: 'rec-walk', title: 'Day-1 Walking Protocol', desc: 'Early upright walking promotes disc hydration and prevents epidural adhesion.', pos: [0, 0.08, 0.25], color: '#02BAB9' },
    ],
  },
  sports: {
    surgical: [
      { id: 'acl', title: 'ACL Tendon Graft', desc: 'Anatomically aligned quadrupled autograft replicating native cruciate biomechanics.', pos: [0.05, 0.18, 0.22], color: '#F18712' },
      { id: 'screw', title: 'Interference Fixation', desc: 'Bio-composite fixation screws securing graft rigidly within femoral and tibial tunnels.', pos: [0.18, 0.42, 0.28], color: '#02BAB9' },
      { id: 'meniscus', title: 'Meniscal Shock Absorber', desc: 'Preserved and sutured meniscus cushions distributing contact stresses across tibial plateau.', pos: [-0.22, 0.02, 0.32], color: '#059B8F' },
      { id: 'tunnel', title: 'Tibial Tunnel Anchor', desc: 'Precision-drilled anatomical aperture preventing graft impingement in full extension.', pos: [-0.08, -0.22, 0.25], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-ligament', title: 'Graft Ligamentization', desc: 'Cellular repopulation and collagen remodeling transforms tendon graft into true living ligament.', pos: [0.05, 0.18, 0.22], color: '#F18712' },
      { id: 'rec-extension', title: 'Full Terminal Extension', desc: 'Achieving 0° hyperextension in week 1 is critical to avoid cyclops lesion and limp.', pos: [-0.08, -0.22, 0.25], color: '#0A7C97' },
      { id: 'rec-proprio', title: 'Neuro-Muscular Control', desc: 'Wobble board and balance training restores subconscious joint position sense.', pos: [-0.22, 0.02, 0.32], color: '#059B8F' },
      { id: 'rec-rts', title: 'Return-to-Sport Testing', desc: 'Rigorous 9-month criteria including quad index >90% and functional hop symmetry.', pos: [0.18, 0.42, 0.28], color: '#02BAB9' },
    ],
  },
  prp: {
    surgical: [
      { id: 'cartilage', title: 'Articular Cartilage Matrix', desc: 'Target chondrocyte surface receiving biological platelet growth factor stimulation.', pos: [0, 0.22, 0.38], color: '#02BAB9' },
      { id: 'biofluid', title: 'Hyaluronic Fluid Layer', desc: 'High-viscosity bio-gel cushion restoring hydrodynamic lubrication and easing friction.', pos: [0, 0.05, 0.42], color: '#F18712' },
      { id: 'factors', title: 'Platelet Growth Factors', desc: 'High-concentration PDGF and VEGF inducing tissue repair and suppressing inflammation.', pos: [0.18, 0.12, 0.32], color: '#059B8F' },
      { id: 'boneplate', title: 'Subchondral Protection', desc: 'Relieves subchondral bone marrow edema and prevents progressive joint space narrowing.', pos: [0, -0.22, 0.35], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-infil', title: 'Cellular Activation (Day 1-3)', desc: 'Growth factors trigger localized cascade to stimulate native chondrocyte collagen synthesis.', pos: [0.18, 0.12, 0.32], color: '#059B8F' },
      { id: 'rec-cycle', title: 'Gentle Cycling Nourishment', desc: 'Non-impact spinning stimulates joint fluid circulation and cartilage nutrient absorption.', pos: [0, 0.05, 0.42], color: '#F18712' },
      { id: 'rec-maturation', title: 'Collagen Maturation (Wks 3-6)', desc: 'Proteoglycan synthesis strengthens cartilage surface resilience against compressive loads.', pos: [0, 0.22, 0.38], color: '#02BAB9' },
      { id: 'rec-longevity', title: 'Long-Term Preservation', desc: 'Delays or prevents invasive joint surgery by maintaining healthy biological joint margins.', pos: [0, -0.22, 0.35], color: '#0A7C97' },
    ],
  },
  trauma: {
    surgical: [
      { id: 'plate', title: 'Titanium Locking Plate', desc: 'Anatomically pre-contoured Low-Contact Locking Compression Plate (LCP) bridging fracture.', pos: [0.12, 0.15, 0.28], color: '#02BAB9' },
      { id: 'screws', title: 'Bi-Cortical Locking Screws', desc: 'Angular-stable threaded screws locking rigidly into plate and bone for maximum pull-out strength.', pos: [0.12, 0.48, 0.28], color: '#F18712' },
      { id: 'fracture', title: 'Anatomical Reduction Line', desc: 'Sub-millimeter reduction restoring bone length, axial alignment, and rotational profile.', pos: [0, 0.0, 0.18], color: '#059B8F' },
      { id: 'periosteum', title: 'Preserved Biology & Blood', desc: 'Minimally-invasive MIPO plate insertion preserves critical periosteal vascular network.', pos: [-0.15, -0.25, 0.15], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-callus', title: 'Biological Callus Knit', desc: 'Woven primary callus bridges fracture gap over 3-6 weeks under dynamic micro-motion.', pos: [0, 0.0, 0.18], color: '#059B8F' },
      { id: 'rec-load', title: 'Progressive Weight-Bearing', desc: 'Controlled axial loading stimulates osteoblast bone deposition via Wolff’s law.', pos: [0.12, -0.35, 0.28], color: '#F18712' },
      { id: 'rec-stability', title: 'Internal Splint Stability', desc: 'Locked construct protects bone against bending and torsional stresses during daily transfers.', pos: [0.12, 0.15, 0.28], color: '#02BAB9' },
      { id: 'rec-union', title: 'Solid Cortical Union', desc: 'Dense lamellar bone remodeling completes solid radiological union at 8-12 weeks.', pos: [-0.15, -0.25, 0.15], color: '#0A7C97' },
    ],
  },
}

const TYPE_CONFIG: Record<AnatomyType, { label: string; badge: string }> = {
  knee: { label: 'Knee Arthroplasty', badge: 'Knee Joint & Implants' },
  hip: { label: 'Hip Arthroplasty', badge: 'Hip Joint & Acetabulum' },
  shoulder: { label: 'Shoulder & Rotator Cuff', badge: 'Glenohumeral Joint' },
  spine: { label: 'Spine & Lumbar Discs', badge: 'Vertebral Motion Segment' },
  sports: { label: 'Sports & Ligaments', badge: 'ACL & Meniscus' },
  prp: { label: 'PRP & Joint Preservation', badge: 'Cartilage & Bio-Fluid' },
  trauma: { label: 'Bone Fracture Fixation', badge: 'Internal Plate & Screws' },
}

export interface JointAnatomy3DProps {
  type?: AnatomyType
  title?: string
  subtitle?: string
  isRecovery?: boolean
  allowTypeSwitch?: boolean
}

export default function JointAnatomy3D({
  type: initialType = 'knee',
  title,
  subtitle,
  isRecovery = false,
  allowTypeSwitch = false,
}: JointAnatomy3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [activeType, setActiveType] = useState<AnatomyType>(initialType)
  const [viewMode, setViewMode] = useState<'surgical' | 'biological'>(isRecovery ? 'biological' : 'surgical')

  // Pick callouts
  const callouts = useMemo(() => {
    const list = CALLOUTS_DATA[activeType] || CALLOUTS_DATA.knee
    return isRecovery ? list.recovery : list.surgical
  }, [activeType, isRecovery])

  const [activeCallout, setActiveCallout] = useState<CalloutPoint>(callouts[0])

  useEffect(() => {
    setActiveCallout(callouts[0])
  }, [callouts])

  useEffect(() => {
    setActiveType(initialType)
  }, [initialType])

  const stateRef = useRef<{
    setMode?: (mode: 'surgical' | 'biological') => void
    rebuild?: (type: AnatomyType) => void
  }>({})

  useEffect(() => {
    let animId: number
    let disposed = false

    async function init() {
      if (!canvasRef.current || !containerRef.current || disposed) return

      const THREE = await import('three')

      const canvas = canvasRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── Renderer ────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      renderer.setClearColor(0xffffff, 1) // 100% Solid Pure White
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      // ── Scene & Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
      camera.position.set(0, 0.15, 3.2)
      const cameraTarget = new THREE.Vector3(0, 0.1, 0)
      camera.lookAt(cameraTarget)

      // ── Lighting ────────────────────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.0)
      keyLight.position.set(3, 4, 4)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.0005
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.2)
      fillLight.position.set(-4, 2, 2)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0xccfbf1, 1.0)
      rimLight.position.set(0, -3, -3)
      scene.add(rimLight)

      // Soft ground shadow disk
      const shadowGeo = new THREE.CircleGeometry(1.4, 32)
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.18,
      })
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
      shadowPlane.rotation.x = -Math.PI / 2
      shadowPlane.position.y = -1.25
      scene.add(shadowPlane)

      // Root Joint Master Group
      const jointGroup = new THREE.Group()
      scene.add(jointGroup)

      // ── Shared Materials ────────────────────────────────────────────────
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xf7f5ef,
        roughness: 0.36,
        metalness: 0.05,
      })
      const metalMat = new THREE.MeshStandardMaterial({
        color: 0xdde6ed,
        roughness: 0.15,
        metalness: 0.88,
      })
      const ceramicMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.06,
        metalness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
      })
      const polyMat = new THREE.MeshPhysicalMaterial({
        color: 0xecfeff,
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.6,
        transparent: true,
        opacity: 0.88,
      })
      const tendonMat = new THREE.MeshStandardMaterial({
        color: 0xbe3a34,
        roughness: 0.45,
        metalness: 0.05,
      })
      const cartilageMat = new THREE.MeshStandardMaterial({
        color: 0x02bab9,
        roughness: 0.25,
        metalness: 0.18,
        emissive: 0x016b6a,
        emissiveIntensity: 0.25,
      })
      const nerveMat = new THREE.MeshStandardMaterial({
        color: 0xf5cd09,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0xd97706,
        emissiveIntensity: 0.35,
      })
      const plateMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        roughness: 0.22,
        metalness: 0.85,
      })
      const screwMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.18,
        metalness: 0.9,
      })
      const goldBioMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.25,
        metalness: 0.35,
        emissive: 0xb45309,
        emissiveIntensity: 0.4,
      })

      // Containers for dynamic toggles
      let surgicalObjects: THREE.Object3D[] = []
      let biologicalObjects: THREE.Object3D[] = []
      let pinsGroup = new THREE.Group()
      jointGroup.add(pinsGroup)

      // ── Model Builders ───────────────────────────────────────────────────
      function buildModel(currentType: AnatomyType) {
        // Clear previous children
        while (jointGroup.children.length > 0) {
          jointGroup.remove(jointGroup.children[0])
        }
        surgicalObjects = []
        biologicalObjects = []
        pinsGroup = new THREE.Group()
        jointGroup.add(pinsGroup)

        if (currentType === 'knee') {
          // FEMUR
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.22, 1.1, 24), boneMat)
          femurShaft.position.set(0, 0.95, -0.05)
          femurShaft.castShadow = true
          jointGroup.add(femurShaft)

          const flare = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.45, 24), boneMat)
          flare.position.set(0, 0.45, -0.02)
          flare.rotation.x = Math.PI
          jointGroup.add(flare)

          const cMed = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 20), boneMat)
          cMed.scale.set(0.85, 1.15, 1.35)
          cMed.position.set(-0.22, 0.32, 0.02)
          jointGroup.add(cMed)

          const cLat = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 20), boneMat)
          cLat.scale.set(0.85, 1.15, 1.35)
          cLat.position.set(0.22, 0.32, 0.02)
          jointGroup.add(cLat)

          // TIBIA
          const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.36, 0.24, 24), boneMat)
          plateau.position.set(0, -0.22, 0)
          jointGroup.add(plateau)

          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.17, 1.0, 24), boneMat)
          tibiaShaft.position.set(0, -0.75, 0)
          jointGroup.add(tibiaShaft)

          const fibula = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), boneMat)
          fibula.position.set(0.42, -0.32, -0.10)
          jointGroup.add(fibula)

          // Patella & Tendons
          const patella = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), boneMat)
          patella.scale.set(1.0, 1.25, 0.6)
          patella.position.set(0, 0.28, 0.44)
          jointGroup.add(patella)

          const tendonSup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.6, 16), tendonMat)
          tendonSup.position.set(0, 0.65, 0.36)
          jointGroup.add(tendonSup)

          const tendonInf = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.45, 16), tendonMat)
          tendonInf.position.set(0, -0.05, 0.40)
          jointGroup.add(tendonInf)

          // SURGICAL: Prosthetic Implants
          const sGroup = new THREE.Group()
          const femoralShield = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.42, 0.38, 24, 1, false, -Math.PI / 2, Math.PI), metalMat)
          femoralShield.rotation.z = Math.PI / 2
          femoralShield.position.set(0, 0.32, 0.08)
          sGroup.add(femoralShield)

          const polyBearing = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.14, 24), polyMat)
          polyBearing.position.set(0, 0.08, 0.02)
          sGroup.add(polyBearing)

          const tibialPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.08, 24), metalMat)
          tibialPlate.position.set(0, -0.02, 0.02)
          sGroup.add(tibialPlate)

          const tibialStem = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.42, 16), metalMat)
          tibialStem.rotation.x = Math.PI
          tibialStem.position.set(0, -0.25, 0)
          sGroup.add(tibialStem)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Meniscus & ACL
          const bGroup = new THREE.Group()
          const meniscusM = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 12, 24, Math.PI * 0.9), cartilageMat)
          meniscusM.rotation.x = Math.PI / 2
          meniscusM.position.set(-0.16, 0.02, 0.02)
          bGroup.add(meniscusM)

          const meniscusL = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 12, 24, Math.PI * 0.9), cartilageMat)
          meniscusL.rotation.x = Math.PI / 2
          meniscusL.rotation.z = Math.PI
          meniscusL.position.set(0.16, 0.02, 0.02)
          bGroup.add(meniscusL)

          const acl = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 12), tendonMat)
          acl.rotation.z = 0.5
          acl.rotation.y = 0.3
          acl.position.set(0.02, 0.14, 0.05)
          bGroup.add(acl)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'hip') {
          // HIP MODEL
          // Pelvic Bone Wing / Acetabulum
          const pelvis = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.16, 16, 32, Math.PI * 1.2), boneMat)
          pelvis.position.set(0.18, 0.48, 0.0)
          pelvis.rotation.z = -0.35
          jointGroup.add(pelvis)

          // Femur Shaft angled
          const hipFemurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.20, 1.2, 24), boneMat)
          hipFemurShaft.position.set(-0.25, -0.45, 0)
          hipFemurShaft.rotation.z = -0.12
          jointGroup.add(hipFemurShaft)

          // Greater Trochanter
          const trochanter = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 18), boneMat)
          trochanter.scale.set(0.9, 1.3, 0.8)
          trochanter.position.set(-0.34, 0.05, 0)
          jointGroup.add(trochanter)

          // SURGICAL: Acetabular Cup, Ceramic Ball, Titanium Neck & Stem
          const sGroup = new THREE.Group()

          const acetabularCup = new THREE.Mesh(new THREE.SphereGeometry(0.30, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55), metalMat)
          acetabularCup.position.set(0.14, 0.42, 0.04)
          acetabularCup.rotation.z = 2.4
          sGroup.add(acetabularCup)

          const ceramicBall = new THREE.Mesh(new THREE.SphereGeometry(0.23, 24, 24), ceramicMat)
          ceramicBall.position.set(0.08, 0.34, 0.05)
          sGroup.add(ceramicBall)

          const hipNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.38, 16), metalMat)
          hipNeck.rotation.z = -0.85
          hipNeck.position.set(-0.06, 0.22, 0.04)
          sGroup.add(hipNeck)

          const hipStem = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.9, 16), metalMat)
          hipStem.position.set(-0.22, -0.22, 0.02)
          hipStem.rotation.z = -0.12
          sGroup.add(hipStem)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Natural Femoral Head & Cartilage
          const bGroup = new THREE.Group()
          const naturalHead = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 24), boneMat)
          naturalHead.position.set(0.08, 0.34, 0.05)
          bGroup.add(naturalHead)

          const labrum = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 12, 24), cartilageMat)
          labrum.position.set(0.14, 0.42, 0.04)
          labrum.rotation.z = 2.4
          bGroup.add(labrum)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'shoulder') {
          // SHOULDER MODEL
          // Scapula blade
          const scapula = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.08), boneMat)
          scapula.position.set(-0.35, -0.05, -0.08)
          scapula.rotation.z = -0.2
          jointGroup.add(scapula)

          // Clavicle Arch
          const clavicle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.85, 16), boneMat)
          clavicle.rotation.z = Math.PI / 2.3
          clavicle.position.set(0.05, 0.58, 0.05)
          jointGroup.add(clavicle)

          // Humerus Shaft
          const humerus = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 1.1, 24), boneMat)
          humerus.position.set(0.12, -0.42, 0)
          jointGroup.add(humerus)

          // Humeral Head
          const humeralHead = new THREE.Mesh(new THREE.SphereGeometry(0.30, 24, 24), boneMat)
          humeralHead.position.set(0.02, 0.18, 0.02)
          jointGroup.add(humeralHead)

          // Glenoid Rim
          const glenoid = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 16, 24), cartilageMat)
          glenoid.position.set(-0.18, 0.18, 0)
          glenoid.rotation.y = Math.PI / 2.2
          jointGroup.add(glenoid)

          // SURGICAL: Suture Anchors & Acromioplasty
          const sGroup = new THREE.Group()
          const anchor1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8), screwMat)
          anchor1.position.set(0.15, 0.32, 0.15)
          sGroup.add(anchor1)

          const anchor2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8), screwMat)
          anchor2.position.set(0.22, 0.22, 0.14)
          sGroup.add(anchor2)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Rotator cuff tendon & Biceps
          const bGroup = new THREE.Group()
          const supraspinatus = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.55, 16), tendonMat)
          supraspinatus.rotation.z = 1.0
          supraspinatus.position.set(-0.05, 0.38, 0.12)
          bGroup.add(supraspinatus)

          const bicepsTendon = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.7, 12), tendonMat)
          bicepsTendon.position.set(0.15, 0.02, 0.22)
          bGroup.add(bicepsTendon)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'spine') {
          // SPINE MODEL: L4 & L5 Lumbar Motion Segment
          // Superior Vertebra L4
          const l4 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.38, 24), boneMat)
          l4.scale.set(1.15, 1.0, 0.9)
          l4.position.set(0, 0.42, 0)
          jointGroup.add(l4)

          const l4Spinous = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.45, 12), boneMat)
          l4Spinous.rotation.x = -Math.PI / 2.2
          l4Spinous.position.set(0, 0.42, -0.42)
          jointGroup.add(l4Spinous)

          // Inferior Vertebra L5
          const l5 = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.46, 0.38, 24), boneMat)
          l5.scale.set(1.18, 1.0, 0.92)
          l5.position.set(0, -0.42, 0)
          jointGroup.add(l5)

          const l5Spinous = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.45, 12), boneMat)
          l5Spinous.rotation.x = -Math.PI / 2.2
          l5Spinous.position.set(0, -0.42, -0.42)
          jointGroup.add(l5Spinous)

          // Intervertebral Disc
          const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.20, 24), cartilageMat)
          disc.scale.set(1.15, 1.0, 0.9)
          disc.position.set(0, 0.0, 0)
          jointGroup.add(disc)

          // Spinal Canal Nerve Cord
          const spinalCord = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 1.3, 16), nerveMat)
          spinalCord.position.set(0, 0.0, -0.16)
          jointGroup.add(spinalCord)

          // Exiting Nerve Roots (Left & Right)
          const nerveR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.48, 12), nerveMat)
          nerveR.rotation.z = Math.PI / 3
          nerveR.position.set(0.24, -0.05, -0.10)
          jointGroup.add(nerveR)

          const nerveL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.48, 12), nerveMat)
          nerveL.rotation.z = -Math.PI / 3
          nerveL.position.set(-0.24, -0.05, -0.10)
          jointGroup.add(nerveL)

          // SURGICAL: Decompression Portal
          const sGroup = new THREE.Group()
          const retractor = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 8, 16, Math.PI), metalMat)
          retractor.rotation.y = Math.PI / 2
          retractor.position.set(0.18, 0.05, 0.12)
          sGroup.add(retractor)
          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Herniation Bulge
          const bGroup = new THREE.Group()
          const herniation = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), tendonMat)
          herniation.scale.set(1.2, 0.8, 1.0)
          herniation.position.set(0.18, 0.02, 0.15)
          bGroup.add(herniation)
          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'sports') {
          // SPORTS & LIGAMENT MODEL
          // Femur
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.22, 0.8, 20), boneMat)
          femurShaft.position.set(0, 0.85, 0)
          jointGroup.add(femurShaft)

          const condyles = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 20), boneMat)
          condyles.scale.set(1.2, 0.7, 1.0)
          condyles.position.set(0, 0.38, 0)
          jointGroup.add(condyles)

          // Tibia
          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.8, 20), boneMat)
          tibiaShaft.position.set(0, -0.75, 0)
          jointGroup.add(tibiaShaft)

          const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.22, 20), boneMat)
          plateau.position.set(0, -0.25, 0)
          jointGroup.add(plateau)

          // Meniscus rings
          const menMed = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.05, 12, 20, Math.PI * 0.9), cartilageMat)
          menMed.rotation.x = Math.PI / 2
          menMed.position.set(-0.16, -0.06, 0.02)
          jointGroup.add(menMed)

          const menLat = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.05, 12, 20, Math.PI * 0.9), cartilageMat)
          menLat.rotation.x = Math.PI / 2
          menLat.rotation.z = Math.PI
          menLat.position.set(0.16, -0.06, 0.02)
          jointGroup.add(menLat)

          // ACL Graft Bundle
          const aclGraft = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.52, 16), tendonMat)
          aclGraft.rotation.z = 0.55
          aclGraft.rotation.y = 0.35
          aclGraft.position.set(0.04, 0.08, 0.08)
          jointGroup.add(aclGraft)

          // SURGICAL: Interference Screws & Endobutton
          const sGroup = new THREE.Group()
          const screwFemur = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.24, 12), screwMat)
          screwFemur.position.set(0.18, 0.38, 0.15)
          sGroup.add(screwFemur)

          const screwTibia = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.24, 12), screwMat)
          screwTibia.position.set(-0.08, -0.25, 0.12)
          sGroup.add(screwTibia)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: PCL & Collateral Ligaments
          const bGroup = new THREE.Group()
          const mcl = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 10), tendonMat)
          mcl.position.set(-0.35, 0.05, 0.02)
          bGroup.add(mcl)

          const lcl = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 10), tendonMat)
          lcl.position.set(0.35, 0.05, 0.02)
          bGroup.add(lcl)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'prp') {
          // PRP & CARTILAGE PRESERVATION MODEL
          // Femur & Tibia
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.24, 0.8, 20), boneMat)
          femurShaft.position.set(0, 0.85, 0)
          jointGroup.add(femurShaft)

          const condyles = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 20), boneMat)
          condyles.scale.set(1.2, 0.8, 1.0)
          condyles.position.set(0, 0.38, 0)
          jointGroup.add(condyles)

          // Bright Articular Cartilage Surfaces
          const femCartilage = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.39, 0.08, 24), cartilageMat)
          femCartilage.position.set(0, 0.18, 0)
          jointGroup.add(femCartilage)

          const tibCartilage = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.08, 24), cartilageMat)
          tibCartilage.position.set(0, -0.06, 0)
          jointGroup.add(tibCartilage)

          const tibiaPlateau = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.22, 20), boneMat)
          tibiaPlateau.position.set(0, -0.22, 0)
          jointGroup.add(tibiaPlateau)

          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.8, 20), boneMat)
          tibiaShaft.position.set(0, -0.72, 0)
          jointGroup.add(tibiaShaft)

          // Synovial Fluid Zone (Translucent Cushion)
          const fluidZone = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 24), polyMat)
          fluidZone.position.set(0, 0.06, 0)
          jointGroup.add(fluidZone)

          // SURGICAL / CLINICAL: Targeted PRP Delivery Needle
          const sGroup = new THREE.Group()
          const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.65, 12), metalMat)
          needle.rotation.z = -1.2
          needle.position.set(0.35, 0.18, 0.22)
          sGroup.add(needle)
          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Bioactive Platelet Droplet Spheres
          const bGroup = new THREE.Group()
          for (let i = 0; i < 9; i++) {
            const p = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), goldBioMat)
            const angle = (i / 9) * Math.PI * 2
            const r = 0.12 + Math.random() * 0.14
            p.position.set(Math.cos(angle) * r, 0.06 + (Math.random() - 0.5) * 0.06, Math.sin(angle) * r + 0.15)
            bGroup.add(p)
          }
          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'trauma') {
          // TRAUMA & BONE FRACTURE MODEL
          // Cortical Bone Upper Segment
          const boneUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.21, 0.75, 24), boneMat)
          boneUpper.position.set(0, 0.55, 0)
          jointGroup.add(boneUpper)

          // Cortical Bone Lower Segment
          const boneLower = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.20, 0.75, 24), boneMat)
          boneLower.position.set(0, -0.55, 0)
          jointGroup.add(boneLower)

          // Oblique Fracture Gap Interface
          const fractureDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.03, 24), cartilageMat)
          fractureDisc.rotation.z = 0.28
          fractureDisc.position.set(0, 0.0, 0)
          jointGroup.add(fractureDisc)

          // SURGICAL: Titanium Locking Plate & Screws
          const sGroup = new THREE.Group()
          const plate = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.25, 0.04), plateMat)
          plate.position.set(0.18, 0.0, 0.16)
          sGroup.add(plate)

          // 6 Bi-Cortical Locking Screws
          const screwY = [0.48, 0.30, 0.12, -0.12, -0.30, -0.48]
          screwY.forEach((sy) => {
            const sc = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 10), screwMat)
            sc.rotation.x = Math.PI / 2
            sc.position.set(0.18, sy, 0.06)
            sGroup.add(sc)

            const head = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 10), plateMat)
            head.rotation.x = Math.PI / 2
            head.position.set(0.18, sy, 0.19)
            sGroup.add(head)
          })

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Primary Callus Formation Collar
          const bGroup = new THREE.Group()
          const callus = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 20), boneMat)
          callus.scale.set(1.1, 0.55, 1.1)
          callus.position.set(0, 0.0, 0)
          bGroup.add(callus)
          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        }

        // ── Interactive Pin Badges ─────────────────────────────────────────
        const currentCallouts = isRecovery
          ? CALLOUTS_DATA[currentType].recovery
          : CALLOUTS_DATA[currentType].surgical

        function createBadge(text: string, color: string) {
          const c = document.createElement('canvas')
          c.width = 340
          c.height = 76
          const ctx = c.getContext('2d')
          if (!ctx) return null

          ctx.fillStyle = 'rgba(255, 255, 255, 0.96)'
          ctx.beginPath()
          ctx.roundRect(4, 4, 332, 68, 34)
          ctx.fill()

          ctx.strokeStyle = color
          ctx.lineWidth = 4
          ctx.stroke()

          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(36, 38, 14, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#0f172a'
          ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          ctx.textBaseline = 'middle'
          ctx.fillText(text, 64, 39)

          const tex = new THREE.CanvasTexture(c)
          tex.needsUpdate = true
          return tex
        }

        currentCallouts.forEach((callout) => {
          const pinRoot = new THREE.Group()
          pinRoot.position.set(...callout.pos)

          const orbGeo = new THREE.SphereGeometry(0.045, 16, 16)
          const orbMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(callout.color),
            emissive: new THREE.Color(callout.color),
            emissiveIntensity: 0.65,
            roughness: 0.2,
          })
          const orb = new THREE.Mesh(orbGeo, orbMat)
          pinRoot.add(orb)

          const ringGeo = new THREE.RingGeometry(0.065, 0.085, 24)
          const ringMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(callout.color),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
          })
          const ring = new THREE.Mesh(ringGeo, ringMat)
          pinRoot.add(ring)

          const tex = createBadge(callout.title, callout.color)
          if (tex) {
            const spriteMat = new THREE.SpriteMaterial({
              map: tex,
              depthTest: false,
              depthWrite: false,
            })
            const sprite = new THREE.Sprite(spriteMat)
            sprite.scale.set(0.68, 0.155, 1)
            sprite.position.set(0, 0.12, 0)
            pinRoot.add(sprite)
          }

          pinsGroup.add(pinRoot)
        })

        // Apply current view mode visibility
        applyMode(viewMode)
      }

      function applyMode(mode: 'surgical' | 'biological') {
        surgicalObjects.forEach((obj) => (obj.visible = mode === 'surgical'))
        biologicalObjects.forEach((obj) => (obj.visible = mode === 'biological'))
      }

      stateRef.current.setMode = applyMode
      stateRef.current.rebuild = buildModel

      // Initial build
      buildModel(activeType)

      // ── Mouse & Touch Drag Controls ──────────────────────────────────────
      let isDragging = false
      let prevMousePos = { x: 0, y: 0 }
      let targetRotY = 0
      let targetRotX = 0.05
      let rotY = 0
      let rotX = 0.05

      function onMouseDown(e: MouseEvent) {
        isDragging = true
        prevMousePos = { x: e.clientX, y: e.clientY }
      }

      function onMouseMove(e: MouseEvent) {
        if (!isDragging) return
        const dx = e.clientX - prevMousePos.x
        const dy = e.clientY - prevMousePos.y
        prevMousePos = { x: e.clientX, y: e.clientY }

        targetRotY += dx * 0.0075
        targetRotX += dy * 0.005
        targetRotX = Math.max(-0.45, Math.min(0.45, targetRotX))
      }

      function onMouseUp() {
        isDragging = false
      }

      function onTouchStart(e: TouchEvent) {
        if (e.touches.length === 1) {
          isDragging = true
          prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
      }

      function onTouchMove(e: TouchEvent) {
        if (!isDragging || e.touches.length !== 1) return
        const dx = e.touches[0].clientX - prevMousePos.x
        const dy = e.touches[0].clientY - prevMousePos.y
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY }

        targetRotY += dx * 0.0075
        targetRotX += dy * 0.005
        targetRotX = Math.max(-0.45, Math.min(0.45, targetRotX))
      }

      function onTouchEnd() {
        isDragging = false
      }

      canvas.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('touchstart', onTouchStart, { passive: true })
      canvas.addEventListener('touchmove', onTouchMove, { passive: true })
      canvas.addEventListener('touchend', onTouchEnd)

      // ── Render Loop ──────────────────────────────────────────────────────
      const clock = new THREE.Clock()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const dt = clock.getDelta()
        const elapsedTime = clock.getElapsedTime()

        // Smooth rotation damping
        rotY += (targetRotY - rotY) * 0.08
        rotX += (targetRotX - rotX) * 0.08

        jointGroup.rotation.y = rotY
        jointGroup.rotation.x = rotX

        // Subtle breathing float when not dragging
        if (!isDragging) {
          jointGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.02
        }

        renderer.render(scene, camera)
      }

      animate()

      // Resize observer
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width
          const h = entry.contentRect.height
          if (w > 0 && h > 0) {
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h, false)
          }
        }
      })
      ro.observe(container)

      return () => {
        disposed = true
        cancelAnimationFrame(animId)
        ro.disconnect()
        canvas.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        canvas.removeEventListener('touchstart', onTouchStart)
        canvas.removeEventListener('touchmove', onTouchMove)
        canvas.removeEventListener('touchend', onTouchEnd)
        renderer.dispose()
      }
    }

    const cleanupPromise = init()

    return () => {
      disposed = true
      cleanupPromise.then((cleanup) => cleanup && cleanup())
    }
  }, [activeType, isRecovery, viewMode])

  function handleTypeChange(newType: AnatomyType) {
    setActiveType(newType)
    if (stateRef.current.rebuild) {
      stateRef.current.rebuild(newType)
    }
  }

  function handleModeChange(newMode: 'surgical' | 'biological') {
    setViewMode(newMode)
    if (stateRef.current.setMode) {
      stateRef.current.setMode(newMode)
    }
  }

  const currentConfig = TYPE_CONFIG[activeType] || TYPE_CONFIG.knee

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-8 sm:my-12">
      {/* Top Header Bar */}
      <div className="p-5 sm:p-7 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#059B8F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#059B8F]">
              {isRecovery ? 'Rehabilitation & Healing 3D Model' : 'Interactive 3D Surgical Reconstruction'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            {title || (isRecovery ? `${currentConfig.label} Recovery Model` : `${currentConfig.label} 3D Anatomy`)}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {subtitle || (isRecovery
              ? 'Inspect structural joint stability, Day-1 walking alignment, and progressive tissue remodeling in interactive 3D.'
              : 'Rotate the 3D model 360° to view bone landmarks, precision surgical implants, and tissue-sparing techniques.')}
          </p>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shrink-0 self-start md:self-auto shadow-2xs">
          <button
            type="button"
            onClick={() => handleModeChange('surgical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'surgical'
                ? 'bg-[#059B8F] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isRecovery ? 'Load Stabilization' : 'Surgical Reconstruction'}
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('biological')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'biological'
                ? 'bg-[#059B8F] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isRecovery ? 'Biological Tissue Healing' : 'Native Bone Anatomy'}
          </button>
        </div>
      </div>

      {/* Optional Joint Type Selector for General Guides & Main Recovery Hub */}
      {allowTypeSwitch && (
        <div className="px-5 sm:px-7 py-3 border-b border-slate-100 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Switch Joint:
          </span>
          {(Object.keys(TYPE_CONFIG) as AnatomyType[]).map((tKey) => {
            const isCur = tKey === activeType
            return (
              <button
                key={tKey}
                type="button"
                onClick={() => handleTypeChange(tKey)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  isCur
                    ? 'bg-brand-50 text-[#059B8F] border-[#059B8F] shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {TYPE_CONFIG[tKey].label}
              </button>
            )
          })}
        </div>
      )}

      {/* 3D Canvas & Interactive Callout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* WebGL Canvas Container */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative min-h-[420px] sm:min-h-[500px] lg:min-h-[540px] bg-white cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Interactive Drag Hint */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span className="text-[11px] font-medium text-slate-500 bg-white/95 px-3.5 py-1 rounded-full border border-slate-200 shadow-xs">
              🖱️ Drag 360° to rotate joint &bull; Click callouts to inspect
            </span>
          </div>
        </div>

        {/* Anatomical & Clinical Information Sidebar */}
        <div className="lg:col-span-4 p-5 sm:p-7 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isRecovery ? 'Rehabilitation Anchors' : 'Key Anatomical Structures'}
              </span>
              <span className="text-xs font-semibold text-[#059B8F] bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                {callouts.length} Checkpoints
              </span>
            </div>

            {/* Callouts Pill Selectors */}
            <div className="space-y-2.5">
              {callouts.map((point) => {
                const isSelected = activeCallout.id === point.id
                return (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => setActiveCallout(point)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-white border-[#059B8F] shadow-md ring-1 ring-[#059B8F]/20'
                        : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-1 shadow-xs"
                      style={{ backgroundColor: point.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {point.title}
                        </h4>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#059B8F] uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Focused Callout Detailed Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeCallout.color }}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Clinical Detail
              </span>
            </div>
            <h4 className="text-sm font-serif font-bold text-slate-900">
              {activeCallout.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {activeCallout.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
