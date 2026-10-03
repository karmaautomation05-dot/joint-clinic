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
      { id: 'femoral', title: 'Femoral Component', desc: 'Anatomically contoured cobalt-chrome femoral shield replicating natural condylar curvature.', pos: [0, 0.42, 0.46], color: '#02BAB9' },
      { id: 'poly', title: 'UHMWPE Bearing Insert', desc: 'Highly cross-linked polyethylene shock-absorbing insert for frictionless gliding and 25+ year durability.', pos: [0, 0.08, 0.50], color: '#F18712' },
      { id: 'tibial', title: 'Tibial Baseplate', desc: 'Titanium alloy tibial tray providing sub-millimeter fixation to the proximal tibial bone bed.', pos: [0, -0.20, 0.45], color: '#059B8F' },
      { id: 'patella', title: 'Patellar Tracking', desc: 'Preserved native kneecap with optimized trochlear groove tracking for natural, pain-free stair climbing.', pos: [0, 0.28, 0.62], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-day1', title: 'Day-1 Load Transfer', desc: 'Direct axial stability allows 100% safe weight-bearing and supported walking within 24 hours of surgery.', pos: [0, -0.20, 0.45], color: '#059B8F' },
      { id: 'rec-quad', title: 'Quadriceps Gliding', desc: 'Active patellar tendon excursion enables early straight leg raises and rapid neuromuscular reactivation.', pos: [0, 0.28, 0.62], color: '#02BAB9' },
      { id: 'rec-rom', title: 'Bending Arc (0°-120°)', desc: 'Optimized posterior condylar offset facilitates smooth knee flexion without impingement or stiffness.', pos: [0, 0.42, 0.46], color: '#F18712' },
      { id: 'rec-bearing', title: 'Zero Wear Cushion', desc: 'UHMWPE articular insert eliminates bone friction for pain-free long-distance walking.', pos: [0, 0.08, 0.50], color: '#0A7C97' },
    ],
  },
  hip: {
    surgical: [
      { id: 'acetabulum', title: 'Acetabular Cup', desc: 'Titanium shell with trabecular porous coating for rapid biological bone ingrowth.', pos: [0.18, 0.42, 0.26], color: '#02BAB9' },
      { id: 'head', title: 'Ceramic Femoral Ball', desc: 'High-hardness BIOLOX ceramic head providing micro-smooth articulation and low friction.', pos: [0.12, 0.32, 0.20], color: '#F18712' },
      { id: 'neck', title: 'Anatomical Offset Neck', desc: 'Restores exact limb length and abductor muscle biomechanics to prevent limping.', pos: [-0.06, 0.18, 0.16], color: '#0A7C97' },
      { id: 'stem', title: 'Titanium Femoral Stem', desc: 'Triple-tapered femoral stem achieving rigid proximal press-fit fixation inside femoral canal.', pos: [-0.20, -0.25, 0.12], color: '#059B8F' },
    ],
    recovery: [
      { id: 'rec-walk', title: 'Day-1 Walking Axis', desc: 'Immediate stable mechanical press-fit allows walker-assisted stepping on Day 1.', pos: [-0.20, -0.25, 0.12], color: '#059B8F' },
      { id: 'rec-abductor', title: 'Gluteus Medius Strength', desc: 'Restored hip offset empowers abductor muscles for level pelvic control without Trendelenburg gait.', pos: [-0.06, 0.18, 0.16], color: '#02BAB9' },
      { id: 'rec-ingrowth', title: 'Porous Bone Ingrowth', desc: 'Biological osseointegration locks the acetabular cup permanently into pelvic bone over 6 weeks.', pos: [0.18, 0.42, 0.26], color: '#F18712' },
      { id: 'rec-disloc', title: 'Capsular Stability', desc: 'Tissue-sparing surgical approach protects posterior capsule, enabling safe sitting and movement.', pos: [0.12, 0.32, 0.20], color: '#0A7C97' },
    ],
  },
  shoulder: {
    surgical: [
      { id: 'rotator', title: 'Supraspinatus Tendon', desc: 'Anatomically re-anchored rotator cuff tendon restored flush onto humeral greater tuberosity.', pos: [0.14, 0.36, 0.24], color: '#F18712' },
      { id: 'head', title: 'Humeral Head Articulation', desc: 'Smooth spherical humeral head articulating with preserved glenoid socket.', pos: [0.04, 0.18, 0.18], color: '#02BAB9' },
      { id: 'glenoid', title: 'Glenoid Labrum', desc: 'Repaired fibrocartilaginous labral bumper preventing shoulder instability and subluxation.', pos: [-0.22, 0.16, 0.12], color: '#059B8F' },
      { id: 'acromion', title: 'Subacromial Clearance', desc: 'Targeted decompression creates ample space for impingement-free arm lifting.', pos: [0.06, 0.52, 0.18], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-pendulum', title: 'Passive Pendulum Glide', desc: 'Early gentle Codman exercises prevent joint capsule contracture and adhesive capsulitis.', pos: [0.04, 0.18, 0.18], color: '#02BAB9' },
      { id: 'rec-tendon', title: 'Tendon-Bone Union', desc: 'Protected sling phase allows vascular ingrowth between tendon footprint and cortical bone.', pos: [0.14, 0.36, 0.24], color: '#F18712' },
      { id: 'rec-scapula', title: 'Scapulothoracic Rhythm', desc: 'Targeted trapezius and serratus exercises rebuild dynamic overhead elevation.', pos: [-0.22, 0.16, 0.12], color: '#059B8F' },
      { id: 'rec-reach', title: 'Active Overhead Reach', desc: 'Progressive resistance training restores full overhead functional mobility at 8-12 weeks.', pos: [0.06, 0.52, 0.18], color: '#0A7C97' },
    ],
  },
  spine: {
    surgical: [
      { id: 'disc', title: 'Intervertebral Disc Space', desc: 'Cushioning fibrocartilage space maintaining neural foramen height between vertebrae.', pos: [0, 0.05, 0.26], color: '#02BAB9' },
      { id: 'herniation', title: 'Targeted Discectomy Site', desc: 'Microscopic removal of protruding disc fragment relieving mechanical nerve compression.', pos: [0.18, 0.04, 0.16], color: '#F18712' },
      { id: 'nerve', title: 'Decompressed Nerve Root', desc: 'Spinal root fully freed from stenosis, ending radiating leg sciatica and numbness.', pos: [0.26, -0.06, 0.08], color: '#059B8F' },
      { id: 'vertebra', title: 'Lumbar Motion Segment', desc: 'Preserved vertebral bodies and facet joints providing natural rotational and flexion stability.', pos: [0, 0.40, 0.22], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-decomp', title: 'Sciatic Nerve Relief', desc: 'Immediate relief of burning leg pain as root swelling resolves with anti-inflammatory therapy.', pos: [0.26, -0.06, 0.08], color: '#059B8F' },
      { id: 'rec-core', title: 'Core Muscle Activation', desc: 'Deep abdominal bracing stabilizes the lumbar motion segment during daily transfers.', pos: [0, 0.40, 0.22], color: '#0A7C97' },
      { id: 'rec-annulus', title: 'Annular Scar Healing', desc: 'Fibrous outer disc ring consolidates over 6 weeks, preventing recurrent disc herniation.', pos: [0.18, 0.04, 0.16], color: '#F18712' },
      { id: 'rec-walk', title: 'Day-1 Walking Protocol', desc: 'Early upright walking promotes disc hydration and prevents epidural adhesion.', pos: [0, 0.05, 0.26], color: '#02BAB9' },
    ],
  },
  sports: {
    surgical: [
      { id: 'acl', title: 'ACL Tendon Graft', desc: 'Anatomically aligned quadrupled autograft replicating native cruciate biomechanics.', pos: [0.04, 0.12, 0.22], color: '#F18712' },
      { id: 'screw', title: 'Interference Fixation', desc: 'Bio-composite fixation screws securing graft rigidly within femoral and tibial tunnels.', pos: [0.16, 0.38, 0.24], color: '#02BAB9' },
      { id: 'meniscus', title: 'Meniscal Shock Absorber', desc: 'Preserved and sutured meniscus cushions distributing contact stresses across tibial plateau.', pos: [-0.20, 0.02, 0.26], color: '#059B8F' },
      { id: 'tunnel', title: 'Tibial Tunnel Anchor', desc: 'Precision-drilled anatomical aperture preventing graft impingement in full extension.', pos: [-0.08, -0.22, 0.24], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-ligament', title: 'Graft Ligamentization', desc: 'Cellular repopulation and collagen remodeling transforms tendon graft into true living ligament.', pos: [0.04, 0.12, 0.22], color: '#F18712' },
      { id: 'rec-extension', title: 'Full Terminal Extension', desc: 'Achieving 0° hyperextension in week 1 is critical to avoid cyclops lesion and limp.', pos: [-0.08, -0.22, 0.24], color: '#0A7C97' },
      { id: 'rec-proprio', title: 'Neuro-Muscular Control', desc: 'Wobble board and balance training restores subconscious joint position sense.', pos: [-0.20, 0.02, 0.26], color: '#059B8F' },
      { id: 'rec-rts', title: 'Return-to-Sport Testing', desc: 'Rigorous 9-month criteria including quad index >90% and functional hop symmetry.', pos: [0.16, 0.38, 0.24], color: '#02BAB9' },
    ],
  },
  prp: {
    surgical: [
      { id: 'cartilage', title: 'Articular Cartilage Matrix', desc: 'Target chondrocyte surface receiving biological platelet growth factor stimulation.', pos: [0, 0.20, 0.36], color: '#02BAB9' },
      { id: 'biofluid', title: 'Hyaluronic Fluid Layer', desc: 'High-viscosity bio-gel cushion restoring hydrodynamic lubrication and easing friction.', pos: [0, 0.05, 0.38], color: '#F18712' },
      { id: 'factors', title: 'Platelet Growth Factors', desc: 'High-concentration PDGF and VEGF inducing tissue repair and suppressing inflammation.', pos: [0.18, 0.12, 0.30], color: '#059B8F' },
      { id: 'boneplate', title: 'Subchondral Protection', desc: 'Relieves subchondral bone marrow edema and prevents progressive joint space narrowing.', pos: [0, -0.20, 0.32], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-infil', title: 'Cellular Activation (Day 1-3)', desc: 'Growth factors trigger localized cascade to stimulate native chondrocyte collagen synthesis.', pos: [0.18, 0.12, 0.30], color: '#059B8F' },
      { id: 'rec-cycle', title: 'Gentle Cycling Nourishment', desc: 'Non-impact spinning stimulates joint fluid circulation and cartilage nutrient absorption.', pos: [0, 0.05, 0.38], color: '#F18712' },
      { id: 'rec-maturation', title: 'Collagen Maturation (Wks 3-6)', desc: 'Proteoglycan synthesis strengthens cartilage surface resilience against compressive loads.', pos: [0, 0.20, 0.36], color: '#02BAB9' },
      { id: 'rec-longevity', title: 'Long-Term Preservation', desc: 'Delays or prevents invasive joint surgery by maintaining healthy biological joint margins.', pos: [0, -0.20, 0.32], color: '#0A7C97' },
    ],
  },
  trauma: {
    surgical: [
      { id: 'plate', title: 'Titanium Locking Plate', desc: 'Anatomically pre-contoured Low-Contact Locking Compression Plate (LCP) bridging fracture.', pos: [0.16, 0.12, 0.25], color: '#02BAB9' },
      { id: 'screws', title: 'Bi-Cortical Locking Screws', desc: 'Angular-stable threaded screws locking rigidly into plate and bone for maximum pull-out strength.', pos: [0.16, 0.42, 0.25], color: '#F18712' },
      { id: 'fracture', title: 'Anatomical Reduction Line', desc: 'Sub-millimeter reduction restoring bone length, axial alignment, and rotational profile.', pos: [0, 0.0, 0.18], color: '#059B8F' },
      { id: 'periosteum', title: 'Preserved Biology & Blood', desc: 'Minimally-invasive MIPO plate insertion preserves critical periosteal vascular network.', pos: [-0.15, -0.25, 0.15], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-callus', title: 'Biological Callus Knit', desc: 'Woven primary callus bridges fracture gap over 3-6 weeks under dynamic micro-motion.', pos: [0, 0.0, 0.18], color: '#059B8F' },
      { id: 'rec-load', title: 'Progressive Weight-Bearing', desc: 'Controlled axial loading stimulates osteoblast bone deposition via Wolff’s law.', pos: [0.16, -0.32, 0.25], color: '#F18712' },
      { id: 'rec-stability', title: 'Internal Splint Stability', desc: 'Locked construct protects bone against bending and torsional stresses during daily transfers.', pos: [0.16, 0.12, 0.25], color: '#02BAB9' },
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

interface ProjectedPin {
  id: string
  title: string
  color: string
  x: number
  y: number
  visible: boolean
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
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [projectedPins, setProjectedPins] = useState<ProjectedPin[]>([])

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
    resetCam?: () => void
    zoom?: (delta: number) => void
    setAutoRotate?: (enabled: boolean) => void
  }>({})

  useEffect(() => {
    let animId: number
    let disposed = false

    async function init() {
      if (!canvasRef.current || !containerRef.current || disposed) return

      const THREE = await import('three')
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')

      const canvas = canvasRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── High Performance Renderer ─────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      renderer.setClearColor(0xffffff, 1)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15

      // ── Scene & Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
      camera.position.set(0, 0.15, 3.2)
      const cameraTarget = new THREE.Vector3(0, 0.05, 0)
      camera.lookAt(cameraTarget)

      // ── OrbitControls with Physics Damping ──────────────────────────────
      const controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      controls.dampingFactor = 0.06
      controls.enablePan = false
      controls.minDistance = 1.4
      controls.maxDistance = 5.0
      controls.minPolarAngle = Math.PI * 0.18
      controls.maxPolarAngle = Math.PI * 0.82
      controls.target.copy(cameraTarget)
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 0.9

      let isInteracting = false
      controls.addEventListener('start', () => { isInteracting = true })
      controls.addEventListener('end', () => { isInteracting = false })

      // ── Studio High-Key Lighting & Environment Reflections ──────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.45)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.2)
      keyLight.position.set(3, 4, 3.5)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.0005
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.3)
      fillLight.position.set(-3.5, 2, 2.5)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0xccfbf1, 1.1)
      rimLight.position.set(0, -3, -3)
      scene.add(rimLight)

      // Generate a sleek studio gradient environment map for metallic reflections
      const pmrem = new THREE.PMREMGenerator(renderer)
      pmrem.compileEquirectangularShader()
      const envCanvas = document.createElement('canvas')
      envCanvas.width = 512
      envCanvas.height = 256
      const envCtx = envCanvas.getContext('2d')
      if (envCtx) {
        const grad = envCtx.createLinearGradient(0, 0, 0, 256)
        grad.addColorStop(0, '#ffffff')
        grad.addColorStop(0.35, '#f8fafc')
        grad.addColorStop(0.65, '#e2e8f0')
        grad.addColorStop(1, '#cbd5e1')
        envCtx.fillStyle = grad
        envCtx.fillRect(0, 0, 512, 256)

        // Specular studio softbox highlight
        envCtx.fillStyle = '#ffffff'
        envCtx.beginPath()
        envCtx.ellipse(256, 70, 180, 50, 0, 0, Math.PI * 2)
        envCtx.fill()
      }
      const envTex = new THREE.CanvasTexture(envCanvas)
      envTex.mapping = THREE.EquirectangularReflectionMapping
      const envRT = pmrem.fromEquirectangular(envTex)
      scene.environment = envRT.texture

      // Soft Ground Contact Shadow Disk
      const shadowGeo = new THREE.CircleGeometry(1.35, 48)
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.16,
      })
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
      shadowPlane.rotation.x = -Math.PI / 2
      shadowPlane.position.y = -1.25
      scene.add(shadowPlane)

      // Master Root Group
      const jointGroup = new THREE.Group()
      scene.add(jointGroup)

      // ── Physical PBR Clinical Materials ──────────────────────────────────
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xf8f5ee, // Warm clinical ivory
        roughness: 0.40,
        metalness: 0.02,
      })

      const metalMat = new THREE.MeshStandardMaterial({
        color: 0xdce5ec, // Polished Surgical Cobalt-Chrome / Titanium
        roughness: 0.12,
        metalness: 0.94,
      })

      const ceramicMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // BIOLOX Delta ceramic
        roughness: 0.05,
        metalness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      })

      const polyMat = new THREE.MeshPhysicalMaterial({
        color: 0xecfeff, // Medical-grade UHMWPE polymer
        roughness: 0.18,
        metalness: 0.08,
        transmission: 0.70,
        transparent: true,
        opacity: 0.90,
        ior: 1.46,
      })

      const tendonMat = new THREE.MeshPhysicalMaterial({
        color: 0xb92b27, // Anatomical tendon / muscle band
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      })

      const cartilageMat = new THREE.MeshPhysicalMaterial({
        color: 0x02bab9, // Articular cartilage / meniscus
        roughness: 0.22,
        metalness: 0.12,
        transmission: 0.4,
        transparent: true,
        opacity: 0.92,
        emissive: 0x016b6a,
        emissiveIntensity: 0.22,
      })

      const nerveMat = new THREE.MeshStandardMaterial({
        color: 0xf5cd09, // Lumbar spinal root & cord
        roughness: 0.28,
        metalness: 0.05,
        emissive: 0xd97706,
        emissiveIntensity: 0.38,
      })

      const plateMat = new THREE.MeshStandardMaterial({
        color: 0x64748b, // Titanium Locking Plate
        roughness: 0.20,
        metalness: 0.88,
      })

      const screwMat = new THREE.MeshStandardMaterial({
        color: 0x334155, // Locking hex screws
        roughness: 0.16,
        metalness: 0.92,
      })

      const goldBioMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Platelet growth factors
        roughness: 0.22,
        metalness: 0.35,
        emissive: 0xb45309,
        emissiveIntensity: 0.45,
      })

      // Containers for dynamic visibility toggling
      let surgicalObjects: THREE.Object3D[] = []
      let biologicalObjects: THREE.Object3D[] = []
      let pinAnchors: { id: string; mesh: THREE.Mesh; worldPos: THREE.Vector3; color: string; title: string }[] = []

      // ── Anatomical Model Builders ─────────────────────────────────────────
      function buildModel(currentType: AnatomyType) {
        while (jointGroup.children.length > 0) {
          jointGroup.remove(jointGroup.children[0])
        }
        surgicalObjects = []
        biologicalObjects = []
        pinAnchors = []

        if (currentType === 'knee') {
          // ── KNEE MODEL: Smooth Anatomical Alignment ──────────────────────
          // 1. Distal Femur (Upper Thigh Bone)
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.21, 1.15, 32), boneMat)
          femurShaft.position.set(0, 0.92, -0.04)
          femurShaft.castShadow = true
          jointGroup.add(femurShaft)

          // Femoral flare leading into condyles
          const flare = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.42, 32), boneMat)
          flare.position.set(0, 0.46, -0.02)
          flare.rotation.x = Math.PI
          jointGroup.add(flare)

          // Medial & Lateral Femoral Condyles (Smooth anatomical curves)
          const condyleM = new THREE.Mesh(new THREE.SphereGeometry(0.24, 28, 28), boneMat)
          condyleM.scale.set(0.85, 1.25, 1.35)
          condyleM.position.set(-0.20, 0.30, 0.02)
          condyleM.castShadow = true
          jointGroup.add(condyleM)

          const condyleL = new THREE.Mesh(new THREE.SphereGeometry(0.23, 28, 28), boneMat)
          condyleL.scale.set(0.85, 1.25, 1.35)
          condyleL.position.set(0.20, 0.30, 0.02)
          condyleL.castShadow = true
          jointGroup.add(condyleL)

          // 2. Proximal Tibia (Lower Leg Shin Bone)
          const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.22, 32), boneMat)
          plateau.scale.set(1.08, 1.0, 0.90)
          plateau.position.set(0, -0.22, 0)
          plateau.castShadow = true
          jointGroup.add(plateau)

          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.16, 1.05, 32), boneMat)
          tibiaShaft.position.set(0, -0.75, 0)
          tibiaShaft.castShadow = true
          jointGroup.add(tibiaShaft)

          const fibula = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 20), boneMat)
          fibula.position.set(0.40, -0.32, -0.08)
          jointGroup.add(fibula)

          // 3. Patella (Kneecap) & Quadriceps/Patellar Tendon
          const patella = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 24), boneMat)
          patella.scale.set(1.0, 1.25, 0.65)
          patella.position.set(0, 0.28, 0.42)
          jointGroup.add(patella)

          const quadTendon = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.60, 20), tendonMat)
          quadTendon.position.set(0, 0.66, 0.34)
          jointGroup.add(quadTendon)

          const patellarTendon = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.10, 0.44, 20), tendonMat)
          patellarTendon.position.set(0, -0.04, 0.38)
          jointGroup.add(patellarTendon)

          // 4. SURGICAL MODE: Cobalt-Chrome Implant + UHMWPE Poly Insert
          const sGroup = new THREE.Group()
          const femoralShield = new THREE.Mesh(
            new THREE.CylinderGeometry(0.38, 0.40, 0.38, 32, 1, false, -Math.PI / 2, Math.PI),
            metalMat
          )
          femoralShield.rotation.z = Math.PI / 2
          femoralShield.position.set(0, 0.30, 0.08)
          sGroup.add(femoralShield)

          const polyBearing = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.12, 32), polyMat)
          polyBearing.position.set(0, 0.08, 0.02)
          sGroup.add(polyBearing)

          const tibialPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 32), metalMat)
          tibialPlate.position.set(0, -0.02, 0.02)
          sGroup.add(tibialPlate)

          const tibialStem = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.42, 20), metalMat)
          tibialStem.rotation.x = Math.PI
          tibialStem.position.set(0, -0.24, 0)
          sGroup.add(tibialStem)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // 5. BIOLOGICAL MODE: Meniscus Fibrocartilage & Cruciate Ligaments
          const bGroup = new THREE.Group()
          const menM = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.055, 16, 32, Math.PI * 0.9), cartilageMat)
          menM.rotation.x = Math.PI / 2
          menM.position.set(-0.16, 0.02, 0.02)
          bGroup.add(menM)

          const menL = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.055, 16, 32, Math.PI * 0.9), cartilageMat)
          menL.rotation.x = Math.PI / 2
          menL.rotation.z = Math.PI
          menL.position.set(0.16, 0.02, 0.02)
          bGroup.add(menL)

          const acl = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.40, 16), tendonMat)
          acl.rotation.z = 0.52
          acl.rotation.y = 0.32
          acl.position.set(0.02, 0.13, 0.04)
          bGroup.add(acl)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'hip') {
          // ── HIP MODEL: Mathematical 130° Anatomical Femoral Neck & Acetabulum
          // 1. Pelvic Acetabulum Wing
          const pelvis = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.16, 20, 36, Math.PI * 1.1), boneMat)
          pelvis.position.set(0.16, 0.46, 0.0)
          pelvis.rotation.z = -0.32
          jointGroup.add(pelvis)

          // 2. Femoral Shaft & Greater Trochanter
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 1.25, 32), boneMat)
          femurShaft.position.set(-0.20, -0.45, 0)
          jointGroup.add(femurShaft)

          const trochanter = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), boneMat)
          trochanter.scale.set(0.85, 1.35, 0.85)
          trochanter.position.set(-0.25, 0.08, 0)
          jointGroup.add(trochanter)

          // 3. Anatomical Femoral Neck (Connecting shaft to acetabulum at 130°)
          const neckBone = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.42, 24), boneMat)
          neckBone.rotation.z = -0.78
          neckBone.position.set(-0.06, 0.20, 0.02)
          jointGroup.add(neckBone)

          // 4. SURGICAL: Titanium Cup, Ceramic Ball & Modular Stem
          const sGroup = new THREE.Group()
          const acetabularCup = new THREE.Mesh(
            new THREE.SphereGeometry(0.30, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55),
            metalMat
          )
          acetabularCup.position.set(0.14, 0.40, 0.04)
          acetabularCup.rotation.z = 2.38
          sGroup.add(acetabularCup)

          const ceramicBall = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), ceramicMat)
          ceramicBall.position.set(0.10, 0.33, 0.04)
          sGroup.add(ceramicBall)

          const metalNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.10, 0.38, 20), metalMat)
          metalNeck.rotation.z = -0.78
          metalNeck.position.set(-0.06, 0.20, 0.02)
          sGroup.add(metalNeck)

          const metalStem = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.95, 20), metalMat)
          metalStem.position.set(-0.20, -0.22, 0.01)
          sGroup.add(metalStem)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // 5. BIOLOGICAL: Natural Femoral Head & Acetabular Labrum
          const bGroup = new THREE.Group()
          const naturalHead = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), boneMat)
          naturalHead.position.set(0.10, 0.33, 0.04)
          bGroup.add(naturalHead)

          const labrum = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 16, 32), cartilageMat)
          labrum.position.set(0.14, 0.40, 0.04)
          labrum.rotation.z = 2.38
          bGroup.add(labrum)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'shoulder') {
          // ── SHOULDER: Glenoid Cavity, Clavicle Arch & Humeral Head ────────
          // 1. Scapula & Glenoid Neck
          const scapulaBlade = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.75, 24, 1, false, 0, Math.PI * 0.8), boneMat)
          scapulaBlade.rotation.y = Math.PI / 2
          scapulaBlade.position.set(-0.35, -0.10, -0.10)
          jointGroup.add(scapulaBlade)

          // Clavicle Arch
          const clavicle = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.90, 20), boneMat)
          clavicle.rotation.z = Math.PI / 2.3
          clavicle.position.set(0.04, 0.58, 0.04)
          jointGroup.add(clavicle)

          // Humerus Shaft & Head
          const humerusShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 1.15, 32), boneMat)
          humerusShaft.position.set(0.12, -0.42, 0)
          jointGroup.add(humerusShaft)

          const humeralHead = new THREE.Mesh(new THREE.SphereGeometry(0.29, 32, 32), boneMat)
          humeralHead.position.set(0.04, 0.18, 0.02)
          jointGroup.add(humeralHead)

          const glenoidRim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.045, 16, 28), cartilageMat)
          glenoidRim.position.set(-0.16, 0.18, 0)
          glenoidRim.rotation.y = Math.PI / 2.2
          jointGroup.add(glenoidRim)

          // SURGICAL: Suture Anchors & Rotator Cuff Fixation
          const sGroup = new THREE.Group()
          const anchor1 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.14, 10), screwMat)
          anchor1.position.set(0.16, 0.32, 0.16)
          sGroup.add(anchor1)

          const anchor2 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.14, 10), screwMat)
          anchor2.position.set(0.22, 0.22, 0.14)
          sGroup.add(anchor2)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Supraspinatus Tendon Band
          const bGroup = new THREE.Group()
          const supraspinatus = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 0.56, 20), tendonMat)
          supraspinatus.rotation.z = 0.95
          supraspinatus.position.set(-0.04, 0.38, 0.12)
          bGroup.add(supraspinatus)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'spine') {
          // ── SPINE: L4-L5 Lumbar Vertebrae, Discs & Nerve Roots ───────────
          // Superior L4 Vertebral Body
          const l4 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.36, 32), boneMat)
          l4.scale.set(1.15, 1.0, 0.88)
          l4.position.set(0, 0.40, 0)
          jointGroup.add(l4)

          // Inferior L5 Vertebral Body
          const l5 = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.46, 0.36, 32), boneMat)
          l5.scale.set(1.18, 1.0, 0.90)
          l5.position.set(0, -0.40, 0)
          jointGroup.add(l5)

          // Spinous Processes extending posterior
          const l4Spinous = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.44, 16), boneMat)
          l4Spinous.rotation.x = -Math.PI / 2.2
          l4Spinous.position.set(0, 0.40, -0.42)
          jointGroup.add(l4Spinous)

          const l5Spinous = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.44, 16), boneMat)
          l5Spinous.rotation.x = -Math.PI / 2.2
          l5Spinous.position.set(0, -0.40, -0.42)
          jointGroup.add(l5Spinous)

          // Intervertebral Disc
          const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.18, 32), cartilageMat)
          disc.scale.set(1.15, 1.0, 0.88)
          disc.position.set(0, 0.0, 0)
          jointGroup.add(disc)

          // Spinal Cord & Nerve Roots
          const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.25, 20), nerveMat)
          cord.position.set(0, 0.0, -0.16)
          jointGroup.add(cord)

          const nerveR = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.030, 0.46, 14), nerveMat)
          nerveR.rotation.z = Math.PI / 3
          nerveR.position.set(0.24, -0.05, -0.08)
          jointGroup.add(nerveR)

          const nerveL = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.030, 0.46, 14), nerveMat)
          nerveL.rotation.z = -Math.PI / 3
          nerveL.position.set(-0.24, -0.05, -0.08)
          jointGroup.add(nerveL)

          // SURGICAL: Microdiscectomy Retractor
          const sGroup = new THREE.Group()
          const retractor = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.025, 10, 20, Math.PI), metalMat)
          retractor.rotation.y = Math.PI / 2
          retractor.position.set(0.18, 0.04, 0.14)
          sGroup.add(retractor)
          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Disc Herniation Bulge
          const bGroup = new THREE.Group()
          const herniation = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 20), tendonMat)
          herniation.scale.set(1.25, 0.85, 1.0)
          herniation.position.set(0.18, 0.02, 0.14)
          bGroup.add(herniation)
          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'sports') {
          // ── SPORTS: ACL Reconstruction Graft & Meniscal Cartilage ────────
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.22, 0.85, 28), boneMat)
          femurShaft.position.set(0, 0.85, 0)
          jointGroup.add(femurShaft)

          const condyles = new THREE.Mesh(new THREE.SphereGeometry(0.35, 28, 28), boneMat)
          condyles.scale.set(1.2, 0.72, 1.0)
          condyles.position.set(0, 0.38, 0)
          jointGroup.add(condyles)

          const tibiaPlateau = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.22, 28), boneMat)
          tibiaPlateau.position.set(0, -0.24, 0)
          jointGroup.add(tibiaPlateau)

          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.17, 0.85, 28), boneMat)
          tibiaShaft.position.set(0, -0.74, 0)
          jointGroup.add(tibiaShaft)

          // Meniscus shock absorbers
          const menM = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.05, 14, 28, Math.PI * 0.9), cartilageMat)
          menM.rotation.x = Math.PI / 2
          menM.position.set(-0.16, -0.06, 0.02)
          jointGroup.add(menM)

          const menL = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.05, 14, 28, Math.PI * 0.9), cartilageMat)
          menL.rotation.x = Math.PI / 2
          menL.rotation.z = Math.PI
          menL.position.set(0.16, -0.06, 0.02)
          jointGroup.add(menL)

          // ACL Graft Bundle
          const aclGraft = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.50, 20), tendonMat)
          aclGraft.rotation.z = 0.52
          aclGraft.rotation.y = 0.32
          aclGraft.position.set(0.04, 0.08, 0.08)
          jointGroup.add(aclGraft)

          // SURGICAL: Titanium Interference Screws
          const sGroup = new THREE.Group()
          const screwF = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.038, 0.24, 14), screwMat)
          screwF.position.set(0.16, 0.36, 0.14)
          sGroup.add(screwF)

          const screwT = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.038, 0.24, 14), screwMat)
          screwT.position.set(-0.08, -0.24, 0.12)
          sGroup.add(screwT)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Collateral Ligaments
          const bGroup = new THREE.Group()
          const mcl = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.72, 12), tendonMat)
          mcl.position.set(-0.34, 0.05, 0.02)
          bGroup.add(mcl)

          const lcl = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.72, 12), tendonMat)
          lcl.position.set(0.34, 0.05, 0.02)
          bGroup.add(lcl)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'prp') {
          // ── PRP: Cartilage Matrix & Hydrodynamic Bio-Fluid ───────────────
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.23, 0.85, 28), boneMat)
          femurShaft.position.set(0, 0.85, 0)
          jointGroup.add(femurShaft)

          const condyles = new THREE.Mesh(new THREE.SphereGeometry(0.36, 28, 28), boneMat)
          condyles.scale.set(1.2, 0.8, 1.0)
          condyles.position.set(0, 0.38, 0)
          jointGroup.add(condyles)

          const femCartilage = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.39, 0.08, 32), cartilageMat)
          femCartilage.position.set(0, 0.18, 0)
          jointGroup.add(femCartilage)

          const tibCartilage = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.08, 32), cartilageMat)
          tibCartilage.position.set(0, -0.06, 0)
          jointGroup.add(tibCartilage)

          const tibiaPlateau = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.22, 28), boneMat)
          tibiaPlateau.position.set(0, -0.22, 0)
          jointGroup.add(tibiaPlateau)

          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.17, 0.85, 28), boneMat)
          tibiaShaft.position.set(0, -0.72, 0)
          jointGroup.add(tibiaShaft)

          const fluidZone = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 32), polyMat)
          fluidZone.position.set(0, 0.06, 0)
          jointGroup.add(fluidZone)

          // SURGICAL: Targeted Micro-Delivery Needle
          const sGroup = new THREE.Group()
          const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.65, 14), metalMat)
          needle.rotation.z = -1.22
          needle.position.set(0.35, 0.18, 0.20)
          sGroup.add(needle)
          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Platelet-Rich Plasma Bioactive Growth Factors
          const bGroup = new THREE.Group()
          for (let i = 0; i < 10; i++) {
            const p = new THREE.Mesh(new THREE.SphereGeometry(0.034, 14, 14), goldBioMat)
            const angle = (i / 10) * Math.PI * 2
            const r = 0.12 + (i % 3) * 0.05
            p.position.set(Math.cos(angle) * r, 0.06 + (i % 2 === 0 ? 0.02 : -0.02), Math.sin(angle) * r + 0.12)
            bGroup.add(p)
          }
          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        } else if (currentType === 'trauma') {
          // ── TRAUMA: Precision Cortical Bone Reduction & LCP Locking Plate
          const boneUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.21, 0.72, 32), boneMat)
          boneUpper.position.set(0, 0.54, 0)
          jointGroup.add(boneUpper)

          const boneLower = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.20, 0.72, 32), boneMat)
          boneLower.position.set(0, -0.54, 0)
          jointGroup.add(boneLower)

          const fractureDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.03, 32), cartilageMat)
          fractureDisc.rotation.z = 0.28
          fractureDisc.position.set(0, 0.0, 0)
          jointGroup.add(fractureDisc)

          // SURGICAL: Titanium Locking Compression Plate & 6 Screws
          const sGroup = new THREE.Group()
          const plate = new THREE.Mesh(new THREE.BoxGeometry(0.11, 1.25, 0.038), plateMat)
          plate.position.set(0.18, 0.0, 0.16)
          sGroup.add(plate)

          const screwY = [0.46, 0.28, 0.10, -0.10, -0.28, -0.46]
          screwY.forEach((sy) => {
            const sc = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.38, 12), screwMat)
            sc.rotation.x = Math.PI / 2
            sc.position.set(0.18, sy, 0.06)
            sGroup.add(sc)

            const head = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.02, 12), plateMat)
            head.rotation.x = Math.PI / 2
            head.position.set(0.18, sy, 0.18)
            sGroup.add(head)
          })

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Primary Callus Formation Collar
          const bGroup = new THREE.Group()
          const callus = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), boneMat)
          callus.scale.set(1.12, 0.55, 1.12)
          callus.position.set(0, 0.0, 0)
          bGroup.add(callus)
          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        }

        // ── 3D Visual Glowing Beacon Anchors ────────────────────────────────
        const currentCallouts = isRecovery
          ? CALLOUTS_DATA[currentType].recovery
          : CALLOUTS_DATA[currentType].surgical

        currentCallouts.forEach((c) => {
          const beaconGroup = new THREE.Group()
          beaconGroup.position.set(...c.pos)

          // Glowing Sphere
          const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.038, 16, 16),
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(c.color),
              emissive: new THREE.Color(c.color),
              emissiveIntensity: 0.8,
              roughness: 0.1,
            })
          )
          beaconGroup.add(orb)

          // Pulse Radar Ring
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(0.052, 0.072, 28),
            new THREE.MeshBasicMaterial({
              color: new THREE.Color(c.color),
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.8,
            })
          )
          beaconGroup.add(ring)

          jointGroup.add(beaconGroup)

          pinAnchors.push({
            id: c.id,
            mesh: orb,
            worldPos: new THREE.Vector3(...c.pos),
            color: c.color,
            title: c.title,
          })
        })

        applyMode(viewMode)
      }

      function applyMode(mode: 'surgical' | 'biological') {
        surgicalObjects.forEach((obj) => (obj.visible = mode === 'surgical'))
        biologicalObjects.forEach((obj) => (obj.visible = mode === 'biological'))
      }

      stateRef.current.setMode = applyMode
      stateRef.current.rebuild = buildModel
      stateRef.current.resetCam = () => {
        camera.position.set(0, 0.15, 3.2)
        cameraTarget.set(0, 0.05, 0)
        controls.target.copy(cameraTarget)
        controls.update()
      }
      stateRef.current.zoom = (delta: number) => {
        camera.position.z = Math.max(1.4, Math.min(5.0, camera.position.z + delta))
        controls.update()
      }
      stateRef.current.setAutoRotate = (enabled: boolean) => {
        controls.autoRotate = enabled
      }

      buildModel(activeType)

      // ── Main Render & Projection Loop ───────────────────────────────────
      const clock = new THREE.Clock()
      const tempVec = new THREE.Vector3()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()
        controls.update()

        // Soft floating when user is not actively interacting
        if (!isInteracting) {
          jointGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.02
        }

        // Project 3D Pin Anchors to 2D Screen Space
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const newPins: ProjectedPin[] = []

          pinAnchors.forEach((pin) => {
            tempVec.copy(pin.worldPos)
            tempVec.applyMatrix4(jointGroup.matrixWorld)
            tempVec.project(camera)

            const isFront = tempVec.z < 1.0
            const x = (tempVec.x * 0.5 + 0.5) * rect.width
            const y = (-(tempVec.y * 0.5) + 0.5) * rect.height

            newPins.push({
              id: pin.id,
              title: pin.title,
              color: pin.color,
              x,
              y,
              visible: isFront && x >= 10 && x <= rect.width - 10 && y >= 10 && y <= rect.height - 10,
            })
          })

          setProjectedPins(newPins)
        }

        renderer.render(scene, camera)
      }

      animate()

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
        controls.dispose()
        renderer.dispose()
        pmrem.dispose()
        envTex.dispose()
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

  function toggleAutoRotate() {
    const next = !autoRotate
    setAutoRotate(next)
    if (stateRef.current.setAutoRotate) {
      stateRef.current.setAutoRotate(next)
    }
  }

  const currentConfig = TYPE_CONFIG[activeType] || TYPE_CONFIG.knee

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-8 sm:my-12">
      {/* Top Clinical Header Bar */}
      <div className="p-5 sm:p-7 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#059B8F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#059B8F]">
              {isRecovery ? 'Clinical Rehabilitation & Bone Healing 3D' : 'Precision 3D Surgical Reconstruction'}
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

        {/* View Mode Toggle Button */}
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

      {/* Optional Joint Type Selector for Recovery Hub */}
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        {/* WebGL Canvas Container */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative min-h-[440px] sm:min-h-[520px] lg:min-h-[560px] bg-white cursor-grab active:cursor-grabbing flex items-center justify-center select-none overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Interactive Floating 2D Vector Pin Badges projected onto 3D Coordinates */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {projectedPins.map((pin) => {
              if (!pin.visible) return null
              const isSelected = activeCallout.id === pin.id
              const matchingCallout = callouts.find((c) => c.id === pin.id)
              return (
                <div
                  key={pin.id}
                  style={{
                    transform: `translate(${pin.x}px, ${pin.y}px)`,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                  className="-translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-75"
                >
                  <button
                    type="button"
                    onClick={() => matchingCallout && setActiveCallout(matchingCallout)}
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs border transition-all ${
                      isSelected
                        ? 'bg-white border-[#059B8F] ring-2 ring-[#059B8F]/30 scale-105'
                        : 'bg-white/95 border-slate-200 hover:border-[#059B8F] hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: pin.color }}
                    />
                    <span className="text-[11px] font-bold text-slate-800 whitespace-nowrap leading-none">
                      {pin.title}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {/* On-Canvas Camera Floating Control Bar */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/95 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={() => stateRef.current.zoom && stateRef.current.zoom(-0.4)}
              className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-base transition-colors"
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => stateRef.current.zoom && stateRef.current.zoom(0.4)}
              className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-base transition-colors"
              title="Zoom Out"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => stateRef.current.resetCam && stateRef.current.resetCam()}
              className="px-2.5 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1"
              title="Reset Camera View"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={toggleAutoRotate}
              className={`px-2.5 h-8 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 ${
                autoRotate ? 'bg-teal-50 text-[#059B8F]' : 'bg-slate-50 text-slate-600'
              }`}
              title="Toggle Slow Turntable Rotation"
            >
              {autoRotate ? 'Rotating' : 'Paused'}
            </button>
          </div>

          {/* Interactive Drag Hint */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span className="text-[11px] font-medium text-slate-500 bg-white/95 px-3.5 py-1 rounded-full border border-slate-200 shadow-xs">
              🖱️ Drag 360° to orbit &bull; Pinch/Scroll to zoom &bull; Click pins to inspect
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
