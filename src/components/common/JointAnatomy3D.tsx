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
      { id: 'femoral', title: 'Femoral Component', desc: 'Anatomically contoured cobalt-chrome femoral shield replicating natural condylar curvature and trochlear groove.', pos: [0, 0.42, 0.46], color: '#02BAB9' },
      { id: 'poly', title: 'UHMWPE Bearing Insert', desc: 'Highly cross-linked polyethylene shock-absorbing insert for frictionless gliding and 25+ year durability.', pos: [0, 0.08, 0.50], color: '#F18712' },
      { id: 'tibial', title: 'Tibial Baseplate', desc: 'Titanium alloy tibial tray providing sub-millimeter fixation to the proximal tibial bone bed with central keel.', pos: [0, -0.20, 0.45], color: '#059B8F' },
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
      { id: 'head', title: 'Ceramic Femoral Ball', desc: 'High-hardness BIOLOX Delta ceramic head providing micro-smooth articulation and low friction.', pos: [0.12, 0.32, 0.20], color: '#F18712' },
      { id: 'neck', title: 'Anatomical Offset Neck', desc: '128° angle of inclination restores exact limb length and abductor muscle biomechanics.', pos: [-0.06, 0.18, 0.16], color: '#0A7C97' },
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
      { id: 'vertebra', title: 'Lumbar Motion Segment', desc: 'Preserved L4-L5 vertebral bodies and facet joints providing natural rotational and flexion stability.', pos: [0, 0.40, 0.22], color: '#0A7C97' },
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
  const [modelView, setModelView] = useState<'joint' | 'skeleton'>('joint')
  const [viewMode, setViewMode] = useState<'surgical' | 'biological'>(isRecovery ? 'biological' : 'surgical')
  const [visualTheme, setVisualTheme] = useState<'studio' | 'radiograph'>('studio')
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
    setTheme?: (theme: 'studio' | 'radiograph') => void
    setModelView?: (mv: 'joint' | 'skeleton') => void
    rebuild?: (type: AnatomyType, mv?: 'joint' | 'skeleton') => void
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      renderer.setClearColor(visualTheme === 'radiograph' ? 0x050a14 : 0xffffff, 1)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = visualTheme === 'radiograph' ? 1.35 : 1.15

      // ── Scene & Camera ─────────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(visualTheme === 'radiograph' ? 0x050a14 : 0xffffff)

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
      camera.position.set(0, 0.15, 3.2)
      const cameraTarget = new THREE.Vector3(0, 0.05, 0)
      camera.lookAt(cameraTarget)

      // ── OrbitControls with Physics Damping ─────────────────────────────────
      const controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      controls.dampingFactor = 0.06
      controls.enablePan = false
      controls.minDistance = 0.5
      controls.maxDistance = 6.0
      controls.minPolarAngle = Math.PI * 0.10
      controls.maxPolarAngle = Math.PI * 0.90
      controls.target.copy(cameraTarget)
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 0.85

      let isInteracting = false
      controls.addEventListener('start', () => { isInteracting = true })
      controls.addEventListener('end', () => { isInteracting = false })

      // ── Studio High-Key & Radiograph Dual Lighting Setup ───────────────────
      const ambientLight = new THREE.AmbientLight(
        visualTheme === 'radiograph' ? 0x0c4a6e : 0xfffaf0,
        visualTheme === 'radiograph' ? 1.8 : 0.95
      )
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(
        visualTheme === 'radiograph' ? 0x38bdf8 : 0xfff5e4,
        visualTheme === 'radiograph' ? 2.5 : 1.75
      )
      keyLight.position.set(3, 4, 3.5)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.0005
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(
        visualTheme === 'radiograph' ? 0x0284c7 : 0xe2e8f0,
        visualTheme === 'radiograph' ? 1.3 : 0.75
      )
      fillLight.position.set(-3.5, 2, 2.5)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(
        visualTheme === 'radiograph' ? 0x7dd3fc : 0xcbd5e1,
        visualTheme === 'radiograph' ? 1.6 : 0.65
      )
      rimLight.position.set(0, -3, -3)
      scene.add(rimLight)

      // Gradient studio reflection environment
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
          grad.addColorStop(0, '#ffffff')
          grad.addColorStop(0.35, '#f8fafc')
          grad.addColorStop(0.65, '#e2e8f0')
          grad.addColorStop(1, '#cbd5e1')
        }
        envCtx.fillStyle = grad
        envCtx.fillRect(0, 0, 512, 256)

        // Softbox specular highlight
        envCtx.fillStyle = visualTheme === 'radiograph' ? '#38bdf8' : '#ffffff'
        envCtx.beginPath()
        envCtx.ellipse(256, 70, 180, 50, 0, 0, Math.PI * 2)
        envCtx.fill()
      }
      const envTex = new THREE.CanvasTexture(envCanvas)
      envTex.mapping = THREE.EquirectangularReflectionMapping
      const envRT = pmrem.fromEquirectangular(envTex)
      scene.environment = envRT.texture

      // Soft Ground Contact Shadow Disk (visible in studio mode only)
      const shadowGeo = new THREE.CircleGeometry(1.35, 48)
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: visualTheme === 'radiograph' ? 0.0 : 0.16,
      })
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
      shadowPlane.rotation.x = -Math.PI / 2
      shadowPlane.position.y = -1.25
      shadowPlane.visible = visualTheme === 'studio'
      scene.add(shadowPlane)

      // Master Root Group
      const jointGroup = new THREE.Group()
      scene.add(jointGroup)

      // ── Physical Materials (Studio vs Radiograph) ───────────────────────────
      const isRad = visualTheme === 'radiograph'

      // Cortical bone material - warm yellowish realistic bone tone (#cfbd92)
      const boneMat = new THREE.MeshStandardMaterial({
        color: isRad ? 0x67e8f9 : 0xcfbd92,
        roughness: isRad ? 0.28 : 0.50,
        metalness: isRad ? 0.08 : 0.02,
        emissive: isRad ? new THREE.Color(0x0369a1) : new THREE.Color(0x000000),
        emissiveIntensity: isRad ? 0.42 : 0.0,
        transparent: isRad,
        opacity: isRad ? 0.90 : 1.0,
      })

      // Surgical metal (radio-dense bright white in radiograph)
      const metalMat = new THREE.MeshStandardMaterial({
        color: isRad ? 0xffffff : 0xdce5ec,
        roughness: isRad ? 0.08 : 0.12,
        metalness: isRad ? 0.96 : 0.94,
        emissive: isRad ? new THREE.Color(0xe0f2fe) : new THREE.Color(0x000000),
        emissiveIntensity: isRad ? 0.72 : 0.0,
      })

      // BIOLOX Delta ceramic
      const ceramicMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.05,
        metalness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        emissive: isRad ? new THREE.Color(0xffffff) : new THREE.Color(0x000000),
        emissiveIntensity: isRad ? 0.85 : 0.0,
      })

      // UHMWPE polymer bearing
      const polyMat = new THREE.MeshPhysicalMaterial({
        color: isRad ? 0x38bdf8 : 0xecfeff,
        roughness: 0.18,
        metalness: 0.08,
        transmission: isRad ? 0.50 : 0.70,
        transparent: true,
        opacity: isRad ? 0.75 : 0.90,
        ior: 1.46,
      })

      // Muscle and tendon bands
      const tendonMat = new THREE.MeshPhysicalMaterial({
        color: isRad ? 0x0284c7 : 0xb92b27,
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        emissive: isRad ? new THREE.Color(0x075985) : new THREE.Color(0x000000),
        emissiveIntensity: isRad ? 0.35 : 0.0,
      })

      // Articular & meniscal cartilage
      const cartilageMat = new THREE.MeshPhysicalMaterial({
        color: isRad ? 0x06b6d4 : 0x02bab9,
        roughness: 0.22,
        metalness: 0.12,
        transmission: 0.45,
        transparent: true,
        opacity: 0.92,
        emissive: isRad ? new THREE.Color(0x0891b2) : new THREE.Color(0x016b6a),
        emissiveIntensity: isRad ? 0.45 : 0.22,
      })

      // Lumbar spinal nerve root
      const nerveMat = new THREE.MeshStandardMaterial({
        color: 0xf5cd09,
        roughness: 0.28,
        metalness: 0.05,
        emissive: new THREE.Color(0xd97706),
        emissiveIntensity: isRad ? 0.65 : 0.38,
      })

      // Titanium locking compression plate
      const plateMat = new THREE.MeshStandardMaterial({
        color: isRad ? 0xffffff : 0x64748b,
        roughness: 0.18,
        metalness: 0.90,
        emissive: isRad ? new THREE.Color(0xe0f2fe) : new THREE.Color(0x000000),
        emissiveIntensity: isRad ? 0.65 : 0.0,
      })

      // Locking hex screws
      const screwMat = new THREE.MeshStandardMaterial({
        color: isRad ? 0x94a3b8 : 0x334155,
        roughness: 0.15,
        metalness: 0.94,
        emissive: isRad ? new THREE.Color(0x38bdf8) : new THREE.Color(0x000000),
        emissiveIntensity: isRad ? 0.45 : 0.0,
      })

      // PRP bioactive growth factors
      const goldBioMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.22,
        metalness: 0.35,
        emissive: new THREE.Color(0xb45309),
        emissiveIntensity: isRad ? 0.75 : 0.45,
      })

      let surgicalObjects: THREE.Object3D[] = []
      let biologicalObjects: THREE.Object3D[] = []
      let pinAnchors: { id: string; mesh: THREE.Mesh; worldPos: THREE.Vector3; color: string; title: string }[] = []

      // ── Anatomical Model Sculptor (Artec HD / Sketchfab Reference Standard) ──
      const jointFraming: Record<AnatomyType, { camPos: [number, number, number]; target: [number, number, number] }> = {
        knee: { camPos: [0, -0.38, 1.45], target: [0, -0.38, 0] },
        hip: { camPos: [0.14, -0.15, 1.45], target: [0.14, -0.15, 0] },
        shoulder: { camPos: [-0.24, 0.44, 1.45], target: [-0.24, 0.44, 0] },
        spine: { camPos: [0.0, 0.34, 1.45], target: [0.0, 0.34, 0] },
        sports: { camPos: [-0.10, -0.38, 1.45], target: [-0.10, -0.38, 0] },
        prp: { camPos: [0.0, -0.38, 1.45], target: [0.0, -0.38, 0] },
        trauma: { camPos: [0.18, 0.0, 1.45], target: [0.18, 0.0, 0] },
      }

      function buildModel(currentType: AnatomyType, currentModelView: 'joint' | 'skeleton' = modelView) {
        while (jointGroup.children.length > 0) {
          jointGroup.remove(jointGroup.children[0])
        }
        surgicalObjects = []
        biologicalObjects = []
        pinAnchors = []

        if (currentModelView === 'skeleton') {
          const framing = jointFraming[currentType] || jointFraming.knee
          camera.position.set(...framing.camPos)
          cameraTarget.set(...framing.target)
          controls.target.copy(cameraTarget)
          controls.update()

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
              jointGroup.add(model)
            },
            undefined,
            (err) => console.error('Error loading human_skeleton in JointAnatomy3D:', err)
          )
        } else {
          camera.position.set(0, 0.15, 3.2)
          cameraTarget.set(0, 0.05, 0)
          controls.target.copy(cameraTarget)
          controls.update()

          if (currentType === 'knee') {
            // ── KNEE: Distal Femur, Tibial Plateau, Patella & Implants ──────────
            // 1. Distal Femur Diaphysis & Metaphysis
            const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.15, 32), boneMat)
          femurShaft.position.set(0, 0.94, -0.04)
          femurShaft.castShadow = true
          jointGroup.add(femurShaft)

          // Epicondylar Metaphyseal Flare
          const flare = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.46, 32), boneMat)
          flare.position.set(0, 0.46, -0.02)
          flare.rotation.x = Math.PI
          jointGroup.add(flare)

          // Medial & Lateral Epicondyle Prominences
          const medEpicondyle = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), boneMat)
          medEpicondyle.position.set(-0.31, 0.36, -0.02)
          jointGroup.add(medEpicondyle)

          const latEpicondyle = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 20), boneMat)
          latEpicondyle.position.set(0.31, 0.36, -0.02)
          jointGroup.add(latEpicondyle)

          // Medial Condyle (Larger radius, posterior extension)
          const condyleM = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), boneMat)
          condyleM.scale.set(0.85, 1.30, 1.40)
          condyleM.position.set(-0.21, 0.30, 0.02)
          condyleM.castShadow = true
          jointGroup.add(condyleM)

          // Lateral Condyle
          const condyleL = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), boneMat)
          condyleL.scale.set(0.85, 1.30, 1.40)
          condyleL.position.set(0.21, 0.30, 0.02)
          condyleL.castShadow = true
          jointGroup.add(condyleL)

          // Anterior Patellar Surface (Trochlear Groove Bridge)
          const trochlea = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.28, 24, 1, false, 0, Math.PI), boneMat)
          trochlea.rotation.x = Math.PI / 2
          trochlea.position.set(0, 0.34, 0.16)
          jointGroup.add(trochlea)

          // 2. Proximal Tibia (Lower Leg Shin Bone)
          // Tibial Plateau (Medial & Lateral Articular Condyles)
          const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.38, 0.24, 36), boneMat)
          plateau.scale.set(1.10, 1.0, 0.92)
          plateau.position.set(0, -0.22, 0)
          plateau.castShadow = true
          jointGroup.add(plateau)

          // Intercondylar Eminence (Dual Tibial Spines)
          const spineM = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.16, 16), boneMat)
          spineM.position.set(-0.06, -0.04, 0.02)
          jointGroup.add(spineM)

          const spineL = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.16, 16), boneMat)
          spineL.position.set(0.06, -0.04, 0.02)
          jointGroup.add(spineL)

          // Anterior Tibial Tuberosity Prominence
          const tuberosity = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 20), boneMat)
          tuberosity.position.set(0, -0.32, 0.26)
          tuberosity.rotation.x = -Math.PI / 3
          jointGroup.add(tuberosity)

          // Tibial Diaphysis Shaft with Anterior Crest
          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.16, 1.05, 32), boneMat)
          tibiaShaft.position.set(0, -0.76, 0)
          tibiaShaft.castShadow = true
          jointGroup.add(tibiaShaft)

          // Proximal Fibular Head with Styloid Process
          const fibulaHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), boneMat)
          fibulaHead.position.set(0.42, -0.30, -0.08)
          jointGroup.add(fibulaHead)

          const fibulaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.95, 20), boneMat)
          fibulaShaft.position.set(0.42, -0.74, -0.08)
          jointGroup.add(fibulaShaft)

          // 3. Patella (Sesamoid Kneecap) & Quadriceps/Patellar Tendon
          const patella = new THREE.Mesh(new THREE.SphereGeometry(0.16, 28, 28), boneMat)
          patella.scale.set(1.0, 1.30, 0.65)
          patella.position.set(0, 0.28, 0.44)
          jointGroup.add(patella)

          const quadTendon = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.62, 20), tendonMat)
          quadTendon.position.set(0, 0.68, 0.36)
          jointGroup.add(quadTendon)

          const patellarTendon = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.46, 20), tendonMat)
          patellarTendon.position.set(0, -0.04, 0.38)
          jointGroup.add(patellarTendon)

          // 4. SURGICAL MODE: CoCr Femoral Component, UHMWPE Insert & Tibial Tray
          const sGroup = new THREE.Group()
          const femoralShield = new THREE.Mesh(
            new THREE.CylinderGeometry(0.40, 0.42, 0.42, 32, 1, false, -Math.PI / 2, Math.PI),
            metalMat
          )
          femoralShield.rotation.z = Math.PI / 2
          femoralShield.position.set(0, 0.30, 0.08)
          sGroup.add(femoralShield)

          // Anterior Patellar Flange on Femoral Shield
          const patellarFlange = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.34, 0.06), metalMat)
          patellarFlange.position.set(0, 0.45, 0.28)
          patellarFlange.rotation.x = -0.25
          sGroup.add(patellarFlange)

          // UHMWPE Articular Bearing Insert with dual dishes
          const polyBearing = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.12, 32), polyMat)
          polyBearing.position.set(0, 0.08, 0.02)
          sGroup.add(polyBearing)

          // Titanium Tibial Baseplate Tray & Keel
          const tibialPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.08, 32), metalMat)
          tibialPlate.position.set(0, -0.02, 0.02)
          sGroup.add(tibialPlate)

          const tibialStem = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.45, 20), metalMat)
          tibialStem.rotation.x = Math.PI
          tibialStem.position.set(0, -0.26, 0)
          sGroup.add(tibialStem)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // 5. BIOLOGICAL MODE: Menisci & Cruciate Ligaments
          const bGroup = new THREE.Group()
          const menM = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.06, 16, 32, Math.PI * 0.92), cartilageMat)
          menM.rotation.x = Math.PI / 2
          menM.position.set(-0.17, 0.02, 0.02)
          bGroup.add(menM)

          const menL = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.06, 16, 32, Math.PI * 0.95), cartilageMat)
          menL.rotation.x = Math.PI / 2
          menL.rotation.z = Math.PI
          menL.position.set(0.17, 0.02, 0.02)
          bGroup.add(menL)

          const acl = new THREE.Mesh(new THREE.CylinderGeometry(0.040, 0.040, 0.42, 16), tendonMat)
          acl.rotation.z = 0.52
          acl.rotation.y = 0.32
          acl.position.set(0.02, 0.14, 0.04)
          bGroup.add(acl)

          const pcl = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.42, 16), tendonMat)
          pcl.rotation.z = -0.48
          pcl.rotation.y = -0.30
          pcl.position.set(-0.02, 0.14, -0.04)
          bGroup.add(pcl)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)

        } else if (currentType === 'hip') {
          // ── HIP: Hemi-Pelvis, Acetabular Socket & 128° Femoral Neck ─────────
          // 1. Pelvic Iliac Wing Blade with ASIS & Crest
          const iliacWing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.18, 20, 36, Math.PI * 1.15), boneMat)
          iliacWing.position.set(0.18, 0.50, 0.0)
          iliacWing.rotation.z = -0.30
          jointGroup.add(iliacWing)

          const asis = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 20), boneMat)
          asis.position.set(0.44, 0.72, 0.08)
          jointGroup.add(asis)

          // Ischial Body & Tuberosity (Weight bearing base)
          const ischium = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.20, 0.55, 20), boneMat)
          ischium.position.set(0.32, 0.12, -0.12)
          ischium.rotation.z = 0.25
          jointGroup.add(ischium)

          // 2. Femoral Diaphysis Shaft
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.20, 1.25, 32), boneMat)
          femurShaft.position.set(-0.20, -0.46, 0)
          jointGroup.add(femurShaft)

          // Greater Trochanter with Trochanteric Fossa
          const trochanter = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), boneMat)
          trochanter.scale.set(0.85, 1.40, 0.88)
          trochanter.position.set(-0.26, 0.09, 0)
          jointGroup.add(trochanter)

          // Lesser Trochanter (Conical posteromedial projection)
          const lesserTroch = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.18, 16), boneMat)
          lesserTroch.rotation.z = -Math.PI / 3
          lesserTroch.position.set(-0.13, -0.10, -0.06)
          jointGroup.add(lesserTroch)

          // Anatomical 128° Inclined Femoral Neck
          const neckBone = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.44, 24), boneMat)
          neckBone.rotation.z = -0.78
          neckBone.position.set(-0.06, 0.20, 0.02)
          jointGroup.add(neckBone)

          // 3. SURGICAL: Titanium Porous Cup, BIOLOX Ceramic Ball & Stem
          const sGroup = new THREE.Group()
          const acetabularCup = new THREE.Mesh(
            new THREE.SphereGeometry(0.31, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55),
            metalMat
          )
          acetabularCup.position.set(0.15, 0.41, 0.04)
          acetabularCup.rotation.z = 2.38
          sGroup.add(acetabularCup)

          const ceramicBall = new THREE.Mesh(new THREE.SphereGeometry(0.23, 32, 32), ceramicMat)
          ceramicBall.position.set(0.11, 0.34, 0.04)
          sGroup.add(ceramicBall)

          const metalNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.105, 0.40, 20), metalMat)
          metalNeck.rotation.z = -0.78
          metalNeck.position.set(-0.06, 0.20, 0.02)
          sGroup.add(metalNeck)

          const metalStem = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.98, 20), metalMat)
          metalStem.position.set(-0.20, -0.24, 0.01)
          sGroup.add(metalStem)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // 4. BIOLOGICAL: Natural Femoral Head with Fovea Capitis & Labrum
          const bGroup = new THREE.Group()
          const naturalHead = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), boneMat)
          naturalHead.position.set(0.11, 0.34, 0.04)
          bGroup.add(naturalHead)

          // Fovea Capitis Depression
          const fovea = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), tendonMat)
          fovea.position.set(0.16, 0.42, 0.04)
          bGroup.add(fovea)

          const labrum = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.052, 16, 32), cartilageMat)
          labrum.position.set(0.15, 0.41, 0.04)
          labrum.rotation.z = 2.38
          bGroup.add(labrum)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)

        } else if (currentType === 'shoulder') {
          // ── SHOULDER: Scapula Blade, Acromion, Clavicle Arch & Humerus ──────
          // 1. Scapula Body Blade with Spine & Acromion
          const scapulaBlade = new THREE.Mesh(
            new THREE.CylinderGeometry(0.36, 0.48, 0.78, 24, 1, false, 0, Math.PI * 0.8),
            boneMat
          )
          scapulaBlade.rotation.y = Math.PI / 2
          scapulaBlade.position.set(-0.36, -0.10, -0.10)
          jointGroup.add(scapulaBlade)

          // Spine of Scapula Crest
          const scapularSpine = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.14), boneMat)
          scapularSpine.position.set(-0.22, 0.28, -0.06)
          scapularSpine.rotation.z = 0.20
          jointGroup.add(scapularSpine)

          // Broad Acromion Process Shelf
          const acromion = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.32), boneMat)
          acromion.position.set(0.06, 0.50, 0.10)
          acromion.rotation.y = 0.25
          jointGroup.add(acromion)

          // Coracoid Process Hook
          const coracoid = new THREE.Mesh(new THREE.TorusGeometry(0.10, 0.045, 12, 20, Math.PI * 0.7), boneMat)
          coracoid.rotation.x = Math.PI / 2
          coracoid.position.set(-0.08, 0.38, 0.20)
          jointGroup.add(coracoid)

          // Clavicular S-Curve
          const clavicle = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.92, 20), boneMat)
          clavicle.rotation.z = Math.PI / 2.3
          clavicle.position.set(0.04, 0.58, 0.04)
          jointGroup.add(clavicle)

          // Proximal Humerus Shaft & Spherical Head
          const humerusShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 1.15, 32), boneMat)
          humerusShaft.position.set(0.13, -0.42, 0)
          jointGroup.add(humerusShaft)

          const humeralHead = new THREE.Mesh(new THREE.SphereGeometry(0.30, 32, 32), boneMat)
          humeralHead.position.set(0.05, 0.18, 0.02)
          jointGroup.add(humeralHead)

          // Greater Tubercle & Bicipital Groove
          const greaterTubercle = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 20), boneMat)
          greaterTubercle.position.set(0.19, 0.26, 0.14)
          jointGroup.add(greaterTubercle)

          const glenoidRim = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.048, 16, 28), cartilageMat)
          glenoidRim.position.set(-0.16, 0.18, 0)
          glenoidRim.rotation.y = Math.PI / 2.2
          jointGroup.add(glenoidRim)

          // SURGICAL: Titanium Suture Anchors & Rotator Repair
          const sGroup = new THREE.Group()
          const anchor1 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.15, 10), screwMat)
          anchor1.position.set(0.16, 0.32, 0.16)
          sGroup.add(anchor1)

          const anchor2 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.15, 10), screwMat)
          anchor2.position.set(0.22, 0.22, 0.14)
          sGroup.add(anchor2)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Supraspinatus Tendon Band
          const bGroup = new THREE.Group()
          const supraspinatus = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.18, 0.58, 20), tendonMat)
          supraspinatus.rotation.z = 0.95
          supraspinatus.position.set(-0.04, 0.38, 0.12)
          bGroup.add(supraspinatus)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)

        } else if (currentType === 'spine') {
          // ── SPINE: L4-L5 Lumbar Vertebrae, Facet Joints, Discs & Nerves ─────
          // Superior L4 Vertebral Body (Reniform kidney shape)
          const l4 = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.36, 32), boneMat)
          l4.scale.set(1.16, 1.0, 0.88)
          l4.position.set(0, 0.40, 0)
          jointGroup.add(l4)

          // Inferior L5 Vertebral Body
          const l5 = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.46, 0.36, 32), boneMat)
          l5.scale.set(1.18, 1.0, 0.90)
          l5.position.set(0, -0.40, 0)
          jointGroup.add(l5)

          // Pedicles & Laminae Arch
          const l4PedicleR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.28, 16), boneMat)
          l4PedicleR.rotation.x = Math.PI / 2
          l4PedicleR.position.set(0.24, 0.40, -0.22)
          jointGroup.add(l4PedicleR)

          const l4PedicleL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.28, 16), boneMat)
          l4PedicleL.rotation.x = Math.PI / 2
          l4PedicleL.position.set(-0.24, 0.40, -0.22)
          jointGroup.add(l4PedicleL)

          // Spinous Processes extending posterior
          const l4Spinous = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.22, 0.48), boneMat)
          l4Spinous.position.set(0, 0.40, -0.44)
          jointGroup.add(l4Spinous)

          const l5Spinous = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.22, 0.48), boneMat)
          l5Spinous.position.set(0, -0.40, -0.44)
          jointGroup.add(l5Spinous)

          // Transverse Processes
          const l4TransR = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.42, 14), boneMat)
          l4TransR.rotation.z = Math.PI / 2
          l4TransR.position.set(0.44, 0.42, -0.16)
          jointGroup.add(l4TransR)

          const l4TransL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.42, 14), boneMat)
          l4TransL.rotation.z = Math.PI / 2
          l4TransL.position.set(-0.44, 0.42, -0.16)
          jointGroup.add(l4TransL)

          // Intervertebral Disc (Annulus Fibrosus & Nucleus)
          const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.18, 32), cartilageMat)
          disc.scale.set(1.15, 1.0, 0.88)
          disc.position.set(0, 0.0, 0)
          jointGroup.add(disc)

          // Thecal Sac Spinal Cord
          const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.25, 20), nerveMat)
          cord.position.set(0, 0.0, -0.16)
          jointGroup.add(cord)

          // Exiting Spinal Nerve Roots
          const nerveR = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.48, 14), nerveMat)
          nerveR.rotation.z = Math.PI / 3
          nerveR.position.set(0.25, -0.05, -0.08)
          jointGroup.add(nerveR)

          const nerveL = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.48, 14), nerveMat)
          nerveL.rotation.z = -Math.PI / 3
          nerveL.position.set(-0.25, -0.05, -0.08)
          jointGroup.add(nerveL)

          // SURGICAL: Microdiscectomy Retractor & PEEK Spacer
          const sGroup = new THREE.Group()
          const retractor = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.026, 10, 20, Math.PI), metalMat)
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
          // ── SPORTS: Flexed Knee, Cruciate Tunnels & Menisci ─────────────────
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.22, 0.85, 28), boneMat)
          femurShaft.position.set(0, 0.85, 0)
          jointGroup.add(femurShaft)

          const condyles = new THREE.Mesh(new THREE.SphereGeometry(0.36, 28, 28), boneMat)
          condyles.scale.set(1.2, 0.74, 1.0)
          condyles.position.set(0, 0.38, 0)
          jointGroup.add(condyles)

          const tibiaPlateau = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.37, 0.22, 28), boneMat)
          tibiaPlateau.position.set(0, -0.24, 0)
          jointGroup.add(tibiaPlateau)

          const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.17, 0.85, 28), boneMat)
          tibiaShaft.position.set(0, -0.74, 0)
          jointGroup.add(tibiaShaft)

          // Meniscus shock absorbers
          const menM = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.052, 14, 28, Math.PI * 0.92), cartilageMat)
          menM.rotation.x = Math.PI / 2
          menM.position.set(-0.16, -0.06, 0.02)
          jointGroup.add(menM)

          const menL = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.052, 14, 28, Math.PI * 0.92), cartilageMat)
          menL.rotation.x = Math.PI / 2
          menL.rotation.z = Math.PI
          menL.position.set(0.16, -0.06, 0.02)
          jointGroup.add(menL)

          // ACL Graft Bundle
          const aclGraft = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.52, 20), tendonMat)
          aclGraft.rotation.z = 0.52
          aclGraft.rotation.y = 0.32
          aclGraft.position.set(0.04, 0.08, 0.08)
          jointGroup.add(aclGraft)

          // SURGICAL: Titanium Interference Screws
          const sGroup = new THREE.Group()
          const screwF = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.038, 0.25, 14), screwMat)
          screwF.position.set(0.16, 0.36, 0.14)
          sGroup.add(screwF)

          const screwT = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.038, 0.25, 14), screwMat)
          screwT.position.set(-0.08, -0.24, 0.12)
          sGroup.add(screwT)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Collateral Ligaments
          const bGroup = new THREE.Group()
          const mcl = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.74, 12), tendonMat)
          mcl.position.set(-0.35, 0.05, 0.02)
          bGroup.add(mcl)

          const lcl = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.74, 12), tendonMat)
          lcl.position.set(0.35, 0.05, 0.02)
          bGroup.add(lcl)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)

        } else if (currentType === 'prp') {
          // ── PRP: Hyaline Cartilage Matrix & Synovial Bio-Fluid ──────────────
          const femurShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.23, 0.85, 28), boneMat)
          femurShaft.position.set(0, 0.85, 0)
          jointGroup.add(femurShaft)

          const condyles = new THREE.Mesh(new THREE.SphereGeometry(0.36, 28, 28), boneMat)
          condyles.scale.set(1.2, 0.8, 1.0)
          condyles.position.set(0, 0.38, 0)
          jointGroup.add(condyles)

          const femCartilage = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.40, 0.08, 32), cartilageMat)
          femCartilage.position.set(0, 0.18, 0)
          jointGroup.add(femCartilage)

          const tibCartilage = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.08, 32), cartilageMat)
          tibCartilage.position.set(0, -0.06, 0)
          jointGroup.add(tibCartilage)

          const tibiaPlateau = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.37, 0.22, 28), boneMat)
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
          const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.68, 14), metalMat)
          needle.rotation.z = -1.22
          needle.position.set(0.36, 0.18, 0.20)
          sGroup.add(needle)

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Platelet-Rich Plasma Bioactive Growth Factors
          const bGroup = new THREE.Group()
          for (let i = 0; i < 12; i++) {
            const p = new THREE.Mesh(new THREE.SphereGeometry(0.035, 14, 14), goldBioMat)
            const angle = (i / 12) * Math.PI * 2
            const r = 0.12 + (i % 3) * 0.05
            p.position.set(Math.cos(angle) * r, 0.06 + (i % 2 === 0 ? 0.02 : -0.02), Math.sin(angle) * r + 0.12)
            bGroup.add(p)
          }

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)

        } else if (currentType === 'trauma') {
          // ── TRAUMA: Cortical Bone Diaphysis & LC-DCP Locking Plate ─────────
          const boneUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.21, 0.74, 32), boneMat)
          boneUpper.position.set(0, 0.55, 0)
          jointGroup.add(boneUpper)

          const boneLower = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.20, 0.74, 32), boneMat)
          boneLower.position.set(0, -0.55, 0)
          jointGroup.add(boneLower)

          const fractureDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.035, 32), cartilageMat)
          fractureDisc.rotation.z = 0.28
          fractureDisc.position.set(0, 0.0, 0)
          jointGroup.add(fractureDisc)

          // SURGICAL: Titanium LC-DCP Locking Compression Plate & 6 Screws
          const sGroup = new THREE.Group()
          const plate = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.28, 0.040), plateMat)
          plate.position.set(0.18, 0.0, 0.16)
          sGroup.add(plate)

          const screwY = [0.46, 0.28, 0.10, -0.10, -0.28, -0.46]
          screwY.forEach((sy) => {
            const sc = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.40, 12), screwMat)
            sc.rotation.x = Math.PI / 2
            sc.position.set(0.18, sy, 0.06)
            sGroup.add(sc)

            const head = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.022, 12), plateMat)
            head.rotation.x = Math.PI / 2
            head.position.set(0.18, sy, 0.18)
            sGroup.add(head)
          })

          jointGroup.add(sGroup)
          surgicalObjects.push(sGroup)

          // BIOLOGICAL: Primary Callus Formation Collar
          const bGroup = new THREE.Group()
          const callus = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 24), boneMat)
          callus.scale.set(1.14, 0.58, 1.14)
          callus.position.set(0, 0.0, 0)
          bGroup.add(callus)

          jointGroup.add(bGroup)
          biologicalObjects.push(bGroup)
        }
      }

      // ── 3D Visual Glowing Beacon Anchors ──────────────────────────────────
      const currentCallouts = isRecovery
        ? CALLOUTS_DATA[currentType].recovery
        : CALLOUTS_DATA[currentType].surgical

      currentCallouts.forEach((c) => {
        const beaconGroup = new THREE.Group()
        const pinPos: [number, number, number] =
          currentModelView === 'skeleton'
            ? [
                (jointFraming[currentType]?.target[0] || 0) + c.pos[0] * 0.35,
                (jointFraming[currentType]?.target[1] || 0) + c.pos[1] * 0.35,
                c.pos[2] * 0.35 + 0.08,
              ]
            : c.pos
        beaconGroup.position.set(...pinPos)

        // Glowing Sphere
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.038, 16, 16),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(c.color),
            emissive: new THREE.Color(c.color),
            emissiveIntensity: visualTheme === 'radiograph' ? 1.2 : 0.8,
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
          worldPos: new THREE.Vector3(...pinPos),
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
    stateRef.current.setModelView = (mv: 'joint' | 'skeleton') => buildModel(activeType, mv)
    stateRef.current.rebuild = (type: AnatomyType, mv?: 'joint' | 'skeleton') => buildModel(type, mv ?? modelView)
    stateRef.current.resetCam = () => {
      if (modelView === 'skeleton') {
        const framing = jointFraming[activeType] || jointFraming.knee
        camera.position.set(...framing.camPos)
        cameraTarget.set(...framing.target)
      } else {
        camera.position.set(0, 0.15, 3.2)
        cameraTarget.set(0, 0.05, 0)
      }
      controls.target.copy(cameraTarget)
      controls.update()
    }
    stateRef.current.zoom = (delta: number) => {
      camera.position.z = Math.max(0.6, Math.min(5.5, camera.position.z + delta))
      controls.update()
    }
    stateRef.current.setAutoRotate = (enabled: boolean) => {
      controls.autoRotate = enabled
    }

    buildModel(activeType, modelView)

      // ── Main Render & Projection Loop ─────────────────────────────────────
      const clock = new THREE.Clock()
      const tempVec = new THREE.Vector3()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()
        controls.update()

        // Subtle floating when user is not actively interacting
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
  }, [activeType, isRecovery, viewMode, visualTheme, modelView])

  function handleTypeChange(newType: AnatomyType) {
    setActiveType(newType)
    if (stateRef.current.rebuild) {
      stateRef.current.rebuild(newType)
    }
  }

  function handleModelViewChange(newMv: 'joint' | 'skeleton') {
    setModelView(newMv)
    if (stateRef.current.setModelView) {
      stateRef.current.setModelView(newMv)
    }
  }

  function handleModeChange(newMode: 'surgical' | 'biological') {
    setViewMode(newMode)
    if (stateRef.current.setMode) {
      stateRef.current.setMode(newMode)
    }
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
              : 'Rotate the 3D model 360° to view bone landmarks, precision surgical implants, and tissue-sparing techniques.')}
          </p>
        </div>

        {/* View Mode & Contrast Theme Selectors */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
          {/* Model View: Joint Detail vs Full Skeleton HD */}
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl border shadow-2xs transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => handleModelViewChange('joint')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                modelView === 'joint'
                  ? 'bg-[#059B8F] text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🦴</span>
              <span>Joint Implants</span>
            </button>
            <button
              type="button"
              onClick={() => handleModelViewChange('skeleton')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                modelView === 'skeleton'
                  ? 'bg-[#059B8F] text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>💀</span>
              <span>Full Skeleton HD</span>
            </button>
          </div>

          {/* Studio vs Digital Radiograph Theme */}
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl border shadow-2xs transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => handleThemeChange('studio')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                !isDark
                  ? 'bg-[#059B8F] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>☀️</span>
              <span>Clinical Studio</span>
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange('radiograph')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isDark
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🔬</span>
              <span>Digital X-Ray</span>
            </button>
          </div>

          {/* Surgical vs Biological Toggle (Only shown when inspecting joint reconstruction) */}
          {modelView === 'joint' && (
            <div
              className={`flex items-center gap-1 p-1 rounded-2xl border shadow-2xs transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => handleModeChange('surgical')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'biological'
                    ? 'bg-[#059B8F] text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isRecovery ? 'Biological Tissue Healing' : 'Native Bone Anatomy'}
              </button>
            </div>
          )}
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
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
            isDark ? 'bg-[#050a14]' : 'bg-white'
          }`}
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
                        ? isDark
                          ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                          : 'bg-white border-[#059B8F] ring-2 ring-[#059B8F]/30 scale-105'
                        : isDark
                        ? 'bg-slate-900/90 border-slate-700 hover:border-cyan-400 hover:bg-slate-800'
                        : 'bg-white/95 border-slate-200 hover:border-[#059B8F] hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: pin.color }}
                    />
                    <span
                      className={`text-[11px] font-bold whitespace-nowrap leading-none ${
                        isDark ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {pin.title}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {/* On-Canvas Camera Floating Control Bar */}
          <div
            className={`absolute top-4 right-4 z-10 flex items-center gap-2 p-1.5 rounded-2xl border shadow-sm backdrop-blur-md transition-colors ${
              isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white/95 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => stateRef.current.zoom && stateRef.current.zoom(-0.4)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base transition-colors ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-100' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => stateRef.current.zoom && stateRef.current.zoom(0.4)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base transition-colors ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-100' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
              title="Zoom Out"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => stateRef.current.resetCam && stateRef.current.resetCam()}
              className={`px-2.5 h-8 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-100' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
              title="Reset Camera View"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={toggleAutoRotate}
              className={`px-2.5 h-8 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 ${
                autoRotate
                  ? isDark ? 'bg-cyan-950 text-cyan-300' : 'bg-teal-50 text-[#059B8F]'
                  : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-600'
              }`}
              title="Toggle Slow Turntable Rotation"
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
                  : 'bg-white/95 text-slate-500 border-slate-200'
              }`}
            >
              🖱️ Drag 360° to orbit &bull; Pinch/Scroll to zoom &bull; Click pins to inspect
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
              {callouts.map((point) => {
                const isSelected = activeCallout.id === point.id
                return (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => setActiveCallout(point)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
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
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-1 shadow-xs"
                      style={{ backgroundColor: point.color }}
                    />
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
