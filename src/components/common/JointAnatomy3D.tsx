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
      { id: 'femoral', title: 'Femoral Component', desc: 'Anatomically contoured cobalt-chrome femoral shield replicating natural condylar curvature and trochlear groove.', pos: [-0.067, -0.340, 0.008], color: '#02BAB9' },
      { id: 'patella', title: 'Patellar Tracking', desc: 'Preserved native kneecap with optimized trochlear groove tracking for natural, pain-free stair climbing.', pos: [-0.067, -0.385, 0.014], color: '#0A7C97' },
      { id: 'poly', title: 'UHMWPE Bearing Insert', desc: 'Highly cross-linked polyethylene shock-absorbing insert for frictionless gliding and 25+ year durability.', pos: [-0.095, -0.415, 0.008], color: '#F18712' },
      { id: 'tibial', title: 'Tibial Baseplate', desc: 'Titanium alloy tibial tray providing sub-millimeter fixation to the proximal tibial bone bed with central keel.', pos: [-0.065, -0.450, 0.008], color: '#059B8F' },
    ],
    recovery: [
      { id: 'rec-rom', title: 'Bending Arc (0°-120°)', desc: 'Optimized posterior condylar offset facilitates smooth knee flexion without impingement or stiffness.', pos: [-0.067, -0.340, 0.008], color: '#F18712' },
      { id: 'rec-quad', title: 'Quadriceps Gliding', desc: 'Active patellar tendon excursion enables early straight leg raises and rapid neuromuscular reactivation.', pos: [-0.067, -0.385, 0.014], color: '#02BAB9' },
      { id: 'rec-bearing', title: 'Zero Wear Cushion', desc: 'UHMWPE articular insert eliminates bone friction for pain-free long-distance walking.', pos: [-0.095, -0.415, 0.008], color: '#0A7C97' },
      { id: 'rec-day1', title: 'Day-1 Load Transfer', desc: 'Direct axial stability allows 100% safe weight-bearing and supported walking within 24 hours of surgery.', pos: [-0.065, -0.450, 0.008], color: '#059B8F' },
    ],
  },
  hip: {
    surgical: [
      { id: 'acetabulum', title: 'Acetabular Cup', desc: 'Titanium shell with trabecular porous coating for rapid biological bone ingrowth.', pos: [-0.065, 0.080, 0.010], color: '#02BAB9' },
      { id: 'head', title: 'Ceramic Femoral Ball', desc: 'High-hardness BIOLOX Delta ceramic head providing micro-smooth articulation and low friction.', pos: [-0.088, 0.055, 0.010], color: '#F18712' },
      { id: 'neck', title: 'Anatomical Offset Neck', desc: '128° angle of inclination restores exact limb length and abductor muscle biomechanics.', pos: [-0.115, 0.035, 0.008], color: '#0A7C97' },
      { id: 'stem', title: 'Titanium Femoral Stem', desc: 'Triple-tapered femoral stem achieving rigid proximal press-fit fixation inside femoral canal.', pos: [-0.135, -0.040, 0.006], color: '#059B8F' },
    ],
    recovery: [
      { id: 'rec-ingrowth', title: 'Porous Bone Ingrowth', desc: 'Biological osseointegration locks the acetabular cup permanently into pelvic bone over 6 weeks.', pos: [-0.065, 0.080, 0.010], color: '#F18712' },
      { id: 'rec-disloc', title: 'Capsular Stability', desc: 'Tissue-sparing surgical approach protects posterior capsule, enabling safe sitting and movement.', pos: [-0.088, 0.055, 0.010], color: '#0A7C97' },
      { id: 'rec-abductor', title: 'Gluteus Medius Strength', desc: 'Restored hip offset empowers abductor muscles for level pelvic control without Trendelenburg gait.', pos: [-0.115, 0.035, 0.008], color: '#02BAB9' },
      { id: 'rec-walk', title: 'Day-1 Walking Axis', desc: 'Immediate stable mechanical press-fit allows walker-assisted stepping on Day 1.', pos: [-0.135, -0.040, 0.006], color: '#059B8F' },
    ],
  },
  shoulder: {
    surgical: [
      { id: 'acromion', title: 'Subacromial Clearance', desc: 'Targeted decompression creates ample space for impingement-free arm lifting.', pos: [-0.150, 0.695, 0.030], color: '#0A7C97' },
      { id: 'rotator', title: 'Supraspinatus Tendon', desc: 'Anatomically re-anchored rotator cuff tendon restored flush onto humeral greater tuberosity.', pos: [-0.190, 0.670, 0.025], color: '#F18712' },
      { id: 'head', title: 'Humeral Head Articulation', desc: 'Smooth spherical humeral head articulating with preserved glenoid socket.', pos: [-0.180, 0.640, 0.015], color: '#02BAB9' },
      { id: 'glenoid', title: 'Glenoid Labrum', desc: 'Repaired fibrocartilaginous labral bumper preventing shoulder instability and subluxation.', pos: [-0.130, 0.645, 0.010], color: '#059B8F' },
    ],
    recovery: [
      { id: 'rec-reach', title: 'Active Overhead Reach', desc: 'Progressive resistance training restores full overhead functional mobility at 8-12 weeks.', pos: [-0.150, 0.695, 0.030], color: '#0A7C97' },
      { id: 'rec-tendon', title: 'Tendon-Bone Union', desc: 'Protected sling phase allows vascular ingrowth between tendon footprint and cortical bone.', pos: [-0.190, 0.670, 0.025], color: '#F18712' },
      { id: 'rec-pendulum', title: 'Passive Pendulum Glide', desc: 'Early gentle Codman exercises prevent joint capsule contracture and adhesive capsulitis.', pos: [-0.180, 0.640, 0.015], color: '#02BAB9' },
      { id: 'rec-scapula', title: 'Scapulothoracic Rhythm', desc: 'Targeted trapezius and serratus exercises rebuild dynamic overhead elevation.', pos: [-0.130, 0.645, 0.010], color: '#059B8F' },
    ],
  },
  spine: {
    surgical: [
      { id: 'vertebra', title: 'Lumbar Motion Segment', desc: 'Preserved L1-L4 vertebral bodies and facet joints providing natural rotational and flexion stability.', pos: [0.005, 0.350, 0.005], color: '#0A7C97' },
      { id: 'disc', title: 'Intervertebral Disc Space', desc: 'Cushioning fibrocartilage space maintaining neural foramen height between vertebrae.', pos: [0.005, 0.280, 0.005], color: '#02BAB9' },
      { id: 'herniation', title: 'Targeted Discectomy Site', desc: 'Microscopic removal of protruding disc fragment relieving mechanical nerve compression.', pos: [0.030, 0.260, 0.005], color: '#F18712' },
      { id: 'nerve', title: 'Decompressed Nerve Root', desc: 'Spinal root fully freed from stenosis, ending radiating leg sciatica and numbness.', pos: [0.050, 0.210, 0.002], color: '#059B8F' },
    ],
    recovery: [
      { id: 'rec-core', title: 'Core Muscle Activation', desc: 'Deep abdominal bracing stabilizes the lumbar motion segment during daily transfers.', pos: [0.005, 0.350, 0.005], color: '#0A7C97' },
      { id: 'rec-walk', title: 'Day-1 Walking Protocol', desc: 'Early upright walking promotes disc hydration and prevents epidural adhesion.', pos: [0.005, 0.280, 0.005], color: '#02BAB9' },
      { id: 'rec-annulus', title: 'Annular Scar Healing', desc: 'Fibrous outer disc ring consolidates over 6 weeks, preventing recurrent disc herniation.', pos: [0.030, 0.260, 0.005], color: '#F18712' },
      { id: 'rec-decomp', title: 'Sciatic Nerve Relief', desc: 'Immediate relief of burning leg pain as root swelling resolves with anti-inflammatory therapy.', pos: [0.050, 0.210, 0.002], color: '#059B8F' },
    ],
  },
  sports: {
    surgical: [
      { id: 'screw', title: 'Interference Fixation', desc: 'Bio-composite fixation screws securing graft rigidly within femoral and tibial tunnels.', pos: [-0.050, -0.335, 0.005], color: '#02BAB9' },
      { id: 'acl', title: 'ACL Tendon Graft', desc: 'Anatomically aligned quadrupled autograft replicating native cruciate biomechanics.', pos: [-0.067, -0.380, 0.008], color: '#F18712' },
      { id: 'meniscus', title: 'Meniscal Shock Absorber', desc: 'Preserved and sutured meniscus cushions distributing contact stresses across tibial plateau.', pos: [-0.095, -0.410, 0.008], color: '#059B8F' },
      { id: 'tunnel', title: 'Tibial Tunnel Anchor', desc: 'Precision-drilled anatomical aperture preventing graft impingement in full extension.', pos: [-0.065, -0.450, 0.005], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-rts', title: 'Return-to-Sport Testing', desc: 'Rigorous 9-month criteria including quad index >90% and functional hop symmetry.', pos: [-0.050, -0.335, 0.005], color: '#02BAB9' },
      { id: 'rec-ligament', title: 'Graft Ligamentization', desc: 'Cellular repopulation and collagen remodeling transforms tendon graft into true living ligament.', pos: [-0.067, -0.380, 0.008], color: '#F18712' },
      { id: 'rec-proprio', title: 'Neuro-Muscular Control', desc: 'Wobble board and balance training restores subconscious joint position sense.', pos: [-0.095, -0.410, 0.008], color: '#059B8F' },
      { id: 'rec-extension', title: 'Full Terminal Extension', desc: 'Achieving 0° hyperextension in week 1 is critical to avoid cyclops lesion and limp.', pos: [-0.065, -0.450, 0.005], color: '#0A7C97' },
    ],
  },
  prp: {
    surgical: [
      { id: 'cartilage', title: 'Articular Cartilage Matrix', desc: 'Target chondrocyte surface receiving biological platelet growth factor stimulation.', pos: [-0.067, -0.350, 0.008], color: '#02BAB9' },
      { id: 'biofluid', title: 'Hyaluronic Fluid Layer', desc: 'High-viscosity bio-gel cushion restoring hydrodynamic lubrication and easing friction.', pos: [-0.067, -0.385, 0.012], color: '#F18712' },
      { id: 'factors', title: 'Platelet Growth Factors', desc: 'High-concentration PDGF and VEGF inducing tissue repair and suppressing inflammation.', pos: [-0.095, -0.410, 0.008], color: '#059B8F' },
      { id: 'boneplate', title: 'Subchondral Protection', desc: 'Relieves subchondral bone marrow edema and prevents progressive joint space narrowing.', pos: [-0.065, -0.450, 0.005], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-maturation', title: 'Collagen Maturation (Wks 3-6)', desc: 'Proteoglycan synthesis strengthens cartilage surface resilience against compressive loads.', pos: [-0.067, -0.350, 0.008], color: '#02BAB9' },
      { id: 'rec-cycle', title: 'Gentle Cycling Nourishment', desc: 'Non-impact spinning stimulates joint fluid circulation and cartilage nutrient absorption.', pos: [-0.067, -0.385, 0.012], color: '#F18712' },
      { id: 'rec-infil', title: 'Cellular Activation (Day 1-3)', desc: 'Growth factors trigger localized cascade to stimulate native chondrocyte collagen synthesis.', pos: [-0.095, -0.410, 0.008], color: '#059B8F' },
      { id: 'rec-longevity', title: 'Long-Term Preservation', desc: 'Delays or prevents invasive joint surgery by maintaining healthy biological joint margins.', pos: [-0.065, -0.450, 0.005], color: '#0A7C97' },
    ],
  },
  trauma: {
    surgical: [
      { id: 'screws', title: 'Bi-Cortical Locking Screws', desc: 'Angular-stable threaded screws locking rigidly into plate and bone for maximum pull-out strength.', pos: [-0.140, -0.040, 0.005], color: '#F18712' },
      { id: 'plate', title: 'Titanium Locking Plate', desc: 'Anatomically pre-contoured Low-Contact Locking Compression Plate (LCP) bridging fracture.', pos: [-0.140, -0.100, 0.005], color: '#02BAB9' },
      { id: 'fracture', title: 'Anatomical Reduction Line', desc: 'Sub-millimeter reduction restoring bone length, axial alignment, and rotational profile.', pos: [-0.110, -0.150, 0.005], color: '#059B8F' },
      { id: 'periosteum', title: 'Preserved Biology & Blood', desc: 'Minimally-invasive MIPO plate insertion preserves critical periosteal vascular network.', pos: [-0.080, -0.210, 0.005], color: '#0A7C97' },
    ],
    recovery: [
      { id: 'rec-stability', title: 'Internal Splint Stability', desc: 'Locked construct protects bone against bending and torsional stresses during daily transfers.', pos: [-0.140, -0.040, 0.005], color: '#02BAB9' },
      { id: 'rec-load', title: 'Progressive Weight-Bearing', desc: 'Controlled axial loading stimulates osteoblast bone deposition via Wolff’s law.', pos: [-0.140, -0.100, 0.005], color: '#F18712' },
      { id: 'rec-callus', title: 'Biological Callus Knit', desc: 'Woven primary callus bridges fracture gap over 3-6 weeks under dynamic micro-motion.', pos: [-0.110, -0.150, 0.005], color: '#059B8F' },
      { id: 'rec-union', title: 'Solid Cortical Union', desc: 'Dense lamellar bone remodeling completes solid radiological union at 8-12 weeks.', pos: [-0.080, -0.210, 0.005], color: '#0A7C97' },
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
  index: number
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
  const [cameraView, setCameraView] = useState<'joint' | 'skeleton'>('joint')
  const [viewMode, setViewMode] = useState<'surgical' | 'biological'>(isRecovery ? 'biological' : 'surgical')
  const [visualTheme, setVisualTheme] = useState<'studio' | 'radiograph'>('studio')
  const [autoRotate, setAutoRotate] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [projectedPins, setProjectedPins] = useState<ProjectedPin[]>([])

  const callouts = useMemo(() => {
    const list = CALLOUTS_DATA[activeType] || CALLOUTS_DATA.knee
    return (viewMode === 'biological' || isRecovery) ? list.recovery : list.surgical
  }, [activeType, viewMode, isRecovery])

  const [activeCallout, setActiveCallout] = useState<CalloutPoint>(callouts[0])

  useEffect(() => {
    setActiveCallout(callouts[0])
  }, [callouts])

  useEffect(() => {
    setActiveType(initialType)
  }, [initialType])

  const stateRef = useRef<{
    setMode?: (mode: 'surgical' | 'biological') => void
    setTheme?: (theme: 'studio' | 'radiograph') => void
    setCameraView?: (cv: 'joint' | 'skeleton') => void
    rebuildPins?: (type: AnatomyType, mode: 'surgical' | 'biological') => void
    focusJoint?: (type: AnatomyType) => void
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
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
      const gltfLoader = new GLTFLoader()

      const canvas = canvasRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── High Performance WebGL Renderer ────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5))
      renderer.setSize(width, height, false)
      renderer.setClearColor(visualTheme === 'radiograph' ? 0x050a14 : 0x181e28, 1)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = visualTheme === 'radiograph' ? 1.35 : 1.25

      // ── Scene & Camera ─────────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(visualTheme === 'radiograph' ? 0x050a14 : 0x181e28)

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
      const cameraTarget = new THREE.Vector3(-0.07, -0.39, 0.005)
      camera.position.set(-0.07, -0.39, 0.65)
      camera.lookAt(cameraTarget)

      // ── OrbitControls with Physics Damping ─────────────────────────────────
      const controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      controls.dampingFactor = 0.06
      controls.enablePan = false
      controls.minDistance = 0.35
      controls.maxDistance = 4.5
      controls.minPolarAngle = Math.PI * 0.08
      controls.maxPolarAngle = Math.PI * 0.92
      controls.target.copy(cameraTarget)
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 0.85

      // ── Studio & Radiograph Dual Lighting Setup ────────────────────────────
      const ambientLight = new THREE.AmbientLight(
        visualTheme === 'radiograph' ? 0x0c4a6e : 0xfffaf0,
        visualTheme === 'radiograph' ? 1.8 : 1.15
      )
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(
        visualTheme === 'radiograph' ? 0x38bdf8 : 0xfff6ea,
        visualTheme === 'radiograph' ? 2.5 : 2.20
      )
      keyLight.position.set(3, 4, 3.5)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.0005
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(
        visualTheme === 'radiograph' ? 0x0284c7 : 0x93c5fd,
        visualTheme === 'radiograph' ? 1.3 : 0.85
      )
      fillLight.position.set(-3.5, 2, 2.5)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(
        visualTheme === 'radiograph' ? 0x7dd3fc : 0xbfdbfe,
        visualTheme === 'radiograph' ? 1.6 : 1.35
      )
      rimLight.position.set(0, -3, -3)
      scene.add(rimLight)

      // ── Dynamic Equirectangular Studio Reflection Map ───────────────────────
      const pmrem = new THREE.PMREMGenerator(renderer)
      pmrem.compileEquirectangularShader()
      const envCanvas = document.createElement('canvas')
      envCanvas.width = 512
      envCanvas.height = 256
      const envCtx = envCanvas.getContext('2d')
      if (envCtx) {
        const grad = envCtx.createLinearGradient(0, 0, 0, 256)
        if (visualTheme === 'radiograph') {
          grad.addColorStop(0, '#020617')
          grad.addColorStop(0.4, '#0c4a6e')
          grad.addColorStop(0.7, '#075985')
          grad.addColorStop(1, '#020617')
        } else {
          grad.addColorStop(0, '#475569')
          grad.addColorStop(0.35, '#334155')
          grad.addColorStop(0.65, '#1e293b')
          grad.addColorStop(1, '#0f172a')
        }
        envCtx.fillStyle = grad
        envCtx.fillRect(0, 0, 512, 256)

        // Studio key softbox reflection highlight
        envCtx.fillStyle = visualTheme === 'radiograph' ? '#38bdf8' : '#ffffff'
        envCtx.beginPath()
        envCtx.ellipse(256, 70, 180, 50, 0, 0, Math.PI * 2)
        envCtx.fill()
      }
      const envTex = new THREE.CanvasTexture(envCanvas)
      envTex.mapping = THREE.EquirectangularReflectionMapping
      const envRT = pmrem.fromEquirectangular(envTex)
      scene.environment = envRT.texture

      // Soft Ground Contact Shadow Disk (visible in studio mode)
      const shadowGeo = new THREE.CircleGeometry(1.35, 48)
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x090d14,
        transparent: true,
        opacity: visualTheme === 'radiograph' ? 0.0 : 0.35,
      })
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
      shadowPlane.rotation.x = -Math.PI / 2
      shadowPlane.position.y = -1.02
      shadowPlane.visible = visualTheme === 'studio'
      scene.add(shadowPlane)

      // Master Groups
      const masterGroup = new THREE.Group()
      masterGroup.name = 'HumanSkeletonMaster'
      scene.add(masterGroup)

      const beaconsGroup = new THREE.Group()
      beaconsGroup.name = 'BeaconsGroup'
      scene.add(beaconsGroup)

      // ── Physical Bone Material (Warm Cortical Tone) ────────────────────────
      const isRad = visualTheme === 'radiograph'
      const boneMat = new THREE.MeshPhysicalMaterial({
        color: isRad ? 0x67e8f9 : 0xd8c7a3,
        roughness: isRad ? 0.28 : 0.38,
        metalness: isRad ? 0.08 : 0.02,
        clearcoat: isRad ? 0.0 : 0.18,
        clearcoatRoughness: 0.35,
        reflectivity: 0.40,
        sheen: isRad ? 0.0 : 0.20,
        sheenColor: new THREE.Color('#fff2db'),
        emissive: isRad ? new THREE.Color(0x0369a1) : new THREE.Color(0x000000),
        emissiveIntensity: isRad ? 0.42 : 0.0,
        transparent: isRad,
        opacity: isRad ? 0.90 : 1.0,
      })

      // ── Anatomical Joint Camera Framing Targets on 3D Human Skeleton ───────
      const jointFraming: Record<AnatomyType, { camPos: [number, number, number]; target: [number, number, number] }> = {
        knee: { camPos: [-0.07, -0.39, 0.65], target: [-0.07, -0.39, 0.005] },
        hip: { camPos: [-0.09, 0.05, 0.65], target: [-0.09, 0.05, 0.005] },
        shoulder: { camPos: [-0.18, 0.66, 0.65], target: [-0.18, 0.66, 0.015] },
        spine: { camPos: [0.005, 0.28, 0.65], target: [0.005, 0.28, 0.005] },
        sports: { camPos: [-0.07, -0.39, 0.65], target: [-0.07, -0.39, 0.005] },
        prp: { camPos: [-0.07, -0.39, 0.65], target: [-0.07, -0.39, 0.005] },
        trauma: { camPos: [-0.11, -0.15, 0.65], target: [-0.11, -0.15, 0.005] },
      }

      let pinAnchors: { id: string; mesh: THREE.Mesh; worldPos: THREE.Vector3; color: string; title: string }[] = []

      // ── Function to Populate Anatomical Pin Beacons ────────────────────────
      function rebuildPins(currentType: AnatomyType, currentMode: 'surgical' | 'biological') {
        while (beaconsGroup.children.length > 0) {
          beaconsGroup.remove(beaconsGroup.children[0])
        }
        pinAnchors = []

        const currentCallouts = (currentMode === 'biological' || isRecovery)
          ? CALLOUTS_DATA[currentType].recovery
          : CALLOUTS_DATA[currentType].surgical

        currentCallouts.forEach((c) => {
          const beacon = new THREE.Group()
          beacon.position.set(...c.pos)

          // Small Refined Glowing Jewel Sphere Core
          const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.006, 16, 16),
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(c.color),
              emissive: new THREE.Color(c.color),
              emissiveIntensity: visualTheme === 'radiograph' ? 1.4 : 1.0,
              roughness: 0.1,
              depthTest: false,
            })
          )
          beacon.add(orb)

          // Subtle Outer Ring
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(0.009, 0.015, 24),
            new THREE.MeshBasicMaterial({
              color: new THREE.Color(c.color),
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.75,
              depthTest: false,
            })
          )
          beacon.add(ring)

          beaconsGroup.add(beacon)

          pinAnchors.push({
            id: c.id,
            mesh: orb,
            worldPos: new THREE.Vector3(...c.pos),
            color: c.color,
            title: c.title,
          })
        })
      }

      // ── Function to Focus Camera ──────────────────────────────────────────
      function applyCameraFocus(currentType: AnatomyType, cv: 'joint' | 'skeleton') {
        if (cv === 'skeleton') {
          camera.position.set(0, 0.05, 2.5)
          cameraTarget.set(0, 0.05, 0)
        } else {
          const framing = jointFraming[currentType] || jointFraming.knee
          camera.position.set(...framing.camPos)
          cameraTarget.set(...framing.target)
        }
        controls.target.copy(cameraTarget)
        controls.update()
      }

      // ── Load Realistic Human Skeleton 3D Model ────────────────────────────
      gltfLoader.load(
        '/models/human_skeleton.glb',
        (gltf) => {
          if (disposed) return
          const model = gltf.scene

          const box = new THREE.Box3().setFromObject(model)
          const size = new THREE.Vector3()
          box.getSize(size)
          const center = new THREE.Vector3()
          box.getCenter(center)

          const targetHeight = 2.0
          const scale = targetHeight / (size.y || 1)
          model.scale.setScalar(scale)
          model.position.x = -center.x * scale
          model.position.y = -center.y * scale
          model.position.z = -center.z * scale

          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              child.material = boneMat
            }
          })

          masterGroup.add(model)
          setIsLoading(false)

          // Initial Camera & Pins Setup
          rebuildPins(activeType, viewMode)
          applyCameraFocus(activeType, cameraView)
        },
        undefined,
        (err) => {
          console.error('Error loading human_skeleton in JointAnatomy3D:', err)
          setIsLoading(false)
        }
      )

      stateRef.current.rebuildPins = (type, mode) => rebuildPins(type, mode)
      stateRef.current.focusJoint = (type) => applyCameraFocus(type, cameraView)
      stateRef.current.setCameraView = (cv) => applyCameraFocus(activeType, cv)
      stateRef.current.resetCam = () => applyCameraFocus(activeType, cameraView)
      stateRef.current.zoom = (delta: number) => {
        camera.position.z = Math.max(0.35, Math.min(4.5, camera.position.z + delta))
        controls.update()
      }
      stateRef.current.setAutoRotate = (enabled: boolean) => {
        controls.autoRotate = enabled
      }

      // ── Main Render & Projection Loop ─────────────────────────────────────
      const tempVec = new THREE.Vector3()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        controls.update()

        // Project 3D Pin Anchors to 2D Screen Space
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const newPins: ProjectedPin[] = []

          pinAnchors.forEach((pin, idx) => {
            tempVec.copy(pin.worldPos)
            tempVec.project(camera)

            const isFront = tempVec.z < 1.0
            const x = (tempVec.x * 0.5 + 0.5) * rect.width
            const y = (-(tempVec.y * 0.5) + 0.5) * rect.height

            newPins.push({
              id: pin.id,
              title: pin.title,
              color: pin.color,
              index: idx + 1,
              x,
              y,
              visible: isFront && x >= 15 && x <= rect.width - 15 && y >= 15 && y <= rect.height - 15,
            })
          })

          setProjectedPins(newPins)
        }

        renderer.render(scene, camera)
      }

      animate()

      // Handle Resize
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
        envRT.dispose()
      }
    }

    const cleanupPromise = init()

    return () => {
      disposed = true
      cleanupPromise.then((cleanup) => cleanup && cleanup())
    }
  }, [visualTheme, isRecovery]) // Re-init on theme or recovery mode change

  // React to activeType changes
  useEffect(() => {
    if (stateRef.current.rebuildPins && stateRef.current.focusJoint) {
      stateRef.current.rebuildPins(activeType, viewMode)
      stateRef.current.focusJoint(activeType)
    }
  }, [activeType, viewMode])

  // React to cameraView changes
  useEffect(() => {
    if (stateRef.current.setCameraView) {
      stateRef.current.setCameraView(cameraView)
    }
  }, [cameraView])

  function handleTypeChange(newType: AnatomyType) {
    setActiveType(newType)
  }

  function handleCameraViewChange(newCv: 'joint' | 'skeleton') {
    setCameraView(newCv)
  }

  function handleModeChange(newMode: 'surgical' | 'biological') {
    setViewMode(newMode)
  }

  function handleThemeChange(newTheme: 'studio' | 'radiograph') {
    setVisualTheme(newTheme)
  }

  function toggleAutoRotate() {
    const next = !autoRotate
    setAutoRotate(next)
    if (stateRef.current.setAutoRotate) {
      stateRef.current.setAutoRotate(next)
    }
  }

  const currentConfig = TYPE_CONFIG[activeType] || TYPE_CONFIG.knee
  const isDark = visualTheme === 'radiograph'

  return (
    <div
      className={`w-full rounded-3xl border shadow-xl overflow-hidden my-8 sm:my-12 transition-colors duration-500 ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* Top Clinical Header Bar */}
      <div
        className={`p-5 sm:p-7 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-500 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-100'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#059B8F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#059B8F]">
              {isRecovery ? 'Clinical Rehabilitation & Bone Healing 3D' : 'Precision 3D Surgical Reconstruction'}
            </span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-serif font-bold transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {title || (isRecovery ? `${currentConfig.label} Recovery Model` : `${currentConfig.label} 3D Anatomy`)}
          </h3>
          <p
            className={`text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed transition-colors ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {subtitle || (isRecovery
              ? 'Inspect structural joint stability, Day-1 walking alignment, and progressive tissue remodeling in interactive 3D.'
              : 'Rotate the high-resolution 3D medical skeleton 360° to inspect bone landmarks, precision surgical implants, and tissue-sparing techniques.')}
          </p>
        </div>

        {/* View Mode & Contrast Theme Selectors */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
          {/* Camera Framing: Focus Joint vs Full Skeleton */}
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl border shadow-2xs transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => handleCameraViewChange('joint')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                cameraView === 'joint'
                  ? 'bg-[#059B8F] text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🎯</span>
              <span>Focus Joint</span>
            </button>
            <button
              type="button"
              onClick={() => handleCameraViewChange('skeleton')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                cameraView === 'skeleton'
                  ? 'bg-[#059B8F] text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🔄</span>
              <span>Full Skeleton</span>
            </button>
          </div>

          {/* Studio Dark Grey vs Digital Radiograph Theme */}
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl border shadow-2xs transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => handleThemeChange('studio')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                !isDark
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🏛️</span>
              <span>Studio Dark Grey</span>
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange('radiograph')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🔬</span>
              <span>Digital X-Ray</span>
            </button>
          </div>

          {/* Surgical vs Biological Toggle */}
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl border shadow-2xs transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => handleModeChange('surgical')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'surgical'
                  ? 'bg-[#059B8F] text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRecovery ? 'Load Stabilization' : 'Surgical Reconstruction'}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('biological')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'biological'
                  ? 'bg-[#059B8F] text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRecovery ? 'Biological Tissue Healing' : 'Native Bone Anatomy'}
            </button>
          </div>
        </div>
      </div>

      {/* Optional Joint Type Selector for Recovery Hub */}
      {allowTypeSwitch && (
        <div
          className={`px-5 sm:px-7 py-3 border-b flex items-center gap-2 overflow-x-auto scrollbar-none transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'
          }`}
        >
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isCur
                    ? 'bg-teal-500/20 text-[#02BAB9] border-[#02BAB9] shadow-xs'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
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
          className={`lg:col-span-8 relative min-h-[440px] sm:min-h-[520px] lg:min-h-[560px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none overflow-hidden transition-colors duration-500 ${
            isDark ? 'bg-[#050a14]' : 'bg-[#181e28]'
          }`}
        >
          {/* Loading Indicator */}
          {isLoading && (
            <div
              className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 backdrop-blur-sm transition-colors ${
                isDark ? 'bg-[#050a14]/95 text-white' : 'bg-[#181e28]/95 text-slate-100'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-3 border-teal-500/20 border-t-[#02BAB9] animate-spin" />
                <span className="absolute font-sans text-xs font-bold text-[#02BAB9]">3D</span>
              </div>
              <p className="font-serif font-bold text-sm">Loading 3D Anatomical Human Skeleton...</p>
            </div>
          )}

          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Interactive Non-Overlapping Numbered Pin Hotspots */}
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
                  className="-translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20"
                >
                  <button
                    type="button"
                    onClick={() => matchingCallout && setActiveCallout(matchingCallout)}
                    className={`group relative flex items-center transition-all duration-200 cursor-pointer ${
                      isSelected ? 'z-30 scale-110' : 'z-10 hover:scale-110'
                    }`}
                  >
                    {/* Compact Numbered Circle Badge */}
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black shadow-lg backdrop-blur-md transition-all border-2 ${
                        isSelected
                          ? 'text-white'
                          : 'text-slate-100 group-hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isSelected ? pin.color : '#0f172ae6',
                        borderColor: pin.color,
                        boxShadow: isSelected ? `0 0 14px ${pin.color}` : '0 2px 8px rgba(0,0,0,0.5)',
                      }}
                    >
                      {pin.index}
                    </div>

                    {/* Clean Expanded Pill: Always Visible for Active, or on Hover */}
                    <div
                      className={`absolute left-8.5 px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-bold shadow-xl backdrop-blur-md transition-all pointer-events-none border ${
                        isSelected
                          ? 'opacity-100 translate-x-0 bg-slate-900/95 border-slate-700 text-white'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 bg-slate-900/90 border-slate-700 text-slate-200'
                      }`}
                      style={{
                        borderLeftColor: pin.color,
                        borderLeftWidth: '3px',
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pin.color }} />
                        <span>{pin.title}</span>
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {/* On-Canvas Camera Floating Control Bar */}
          <div
            className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-sm backdrop-blur-md transition-colors ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-900/80 border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => stateRef.current.zoom && stateRef.current.zoom(-0.35)}
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base transition-colors bg-slate-800 hover:bg-slate-700 text-slate-100 cursor-pointer shadow-2xs border border-slate-700/50"
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => stateRef.current.zoom && stateRef.current.zoom(0.35)}
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base transition-colors bg-slate-800 hover:bg-slate-700 text-slate-100 cursor-pointer shadow-2xs border border-slate-700/50"
              title="Zoom Out"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => stateRef.current.resetCam && stateRef.current.resetCam()}
              className="px-2.5 h-8 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-100 cursor-pointer shadow-2xs border border-slate-700/50"
              title="Reset Joint Camera Framing"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={toggleAutoRotate}
              className={`px-2.5 h-8 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs border ${
                autoRotate
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700/50'
              }`}
              title="Toggle Turntable 360° Rotation"
            >
              {autoRotate ? 'Rotating' : 'Paused'}
            </button>
          </div>

          {/* Interactive Drag Hint */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span
              className={`text-[11px] font-medium px-3.5 py-1 rounded-full border shadow-xs backdrop-blur-md ${
                isDark
                  ? 'bg-slate-900/90 text-slate-300 border-slate-700'
                  : 'bg-slate-900/85 text-slate-200 border-slate-700'
              }`}
            >
              Hover / Click pins &bull; Drag 360° to orbit &bull; Scroll to zoom
            </span>
          </div>
        </div>

        {/* Anatomical & Clinical Information Sidebar */}
        <div
          className={`lg:col-span-4 p-5 sm:p-7 border-t lg:border-t-0 lg:border-l flex flex-col justify-between space-y-6 transition-colors duration-500 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                {isRecovery ? 'Rehabilitation Anchors' : 'Key Anatomical Structures'}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'text-cyan-300 bg-slate-800 border-slate-700'
                    : 'text-[#059B8F] bg-white border-slate-200'
                }`}
              >
                {callouts.length} Checkpoints
              </span>
            </div>

            {/* Callouts Pill Selectors */}
            <div className="space-y-2.5">
              {callouts.map((point, idx) => {
                const isSelected = activeCallout.id === point.id
                return (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => setActiveCallout(point)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-slate-800/90 border-cyan-400 shadow-md ring-1 ring-cyan-400/30'
                          : 'bg-white border-[#059B8F] shadow-md ring-1 ring-[#059B8F]/20'
                        : isDark
                        ? 'bg-slate-850/60 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                        : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black text-white shadow-xs mt-0.5"
                      style={{ backgroundColor: point.color }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {point.title}
                        </h4>
                        {isSelected && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-cyan-300' : 'text-[#059B8F]'}`}>
                            Active
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[11px] sm:text-xs line-clamp-2 mt-0.5 leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {point.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Focused Callout Detailed Card */}
          <div
            className={`p-4 rounded-2xl border shadow-sm space-y-2 transition-colors ${
              isDark ? 'bg-slate-850 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeCallout.color }}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Clinical Detail
              </span>
            </div>
            <h4
              className={`text-sm font-serif font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {activeCallout.title}
            </h4>
            <p
              className={`text-xs leading-relaxed font-sans ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {activeCallout.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
