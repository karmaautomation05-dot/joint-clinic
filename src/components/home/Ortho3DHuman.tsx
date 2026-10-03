'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

export interface Joint3DInfo {
  id: string
  label: string
  pos: [number, number, number]
  camPos: [number, number, number]
  target: [number, number, number]
  color: string
}

export const JOINTS_3D_DATA: Joint3DInfo[] = [
  {
    id: 'shoulder',
    label: 'Shoulder Joint',
    pos: [-0.95, 1.35, 0.05],
    camPos: [-0.95, 1.35, 1.7],
    target: [-0.95, 1.35, 0.05],
    color: '#059B8F',
  },
  {
    id: 'elbow',
    label: 'Elbow Joint',
    pos: [-1.22, 0.78, 0.05],
    camPos: [-1.22, 0.78, 1.6],
    target: [-1.22, 0.78, 0.05],
    color: '#0A7C97',
  },
  {
    id: 'hip',
    label: 'Hip Arthroplasty',
    pos: [0.52, 0.15, 0.08],
    camPos: [0.52, 0.15, 1.8],
    target: [0.52, 0.15, 0.08],
    color: '#F18712',
  },
  {
    id: 'knee',
    label: 'Knee Arthroplasty',
    pos: [0.46, -0.72, 0.1],
    camPos: [0.46, -0.72, 1.7],
    target: [0.46, -0.72, 0.1],
    color: '#02BAB9',
  },
  {
    id: 'ankle',
    label: 'Ankle Joint',
    pos: [0.44, -1.62, 0.05],
    camPos: [0.44, -1.62, 1.6],
    target: [0.44, -1.62, 0.05],
    color: '#059B8F',
  },
  {
    id: 'spine',
    label: 'Spinal Column',
    pos: [0.0, 0.75, -0.12],
    camPos: [0.2, 0.75, -1.8],
    target: [0.0, 0.75, -0.12],
    color: '#01B3BF',
  },
]

interface Ortho3DHumanProps {
  activeJointId: string
  onSelectJoint: (id: string) => void
  activeColor: string
}

export default function Ortho3DHuman({
  activeJointId,
  onSelectJoint,
  activeColor,
}: Ortho3DHumanProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isRotating, setIsRotating] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [viewMode, setViewMode] = useState<'anatomy' | 'xray' | 'heatmap'>('anatomy')
  const [hudAngles, setHudAngles] = useState({ yaw: 0, pitch: 0 })
  const [screenPins, setScreenPins] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([])

  // Store transition targets
  const transitionRef = useRef({
    currentCamPos: [0, 0.1, 4.8] as [number, number, number],
    targetCamPos: [0, 0.1, 4.8] as [number, number, number],
    currentLookAt: [0, 0.1, 0] as [number, number, number],
    targetLookAt: [0, 0.1, 0] as [number, number, number],
    isTransitioning: false,
  })

  // Reference to 3D internal state
  const stateRef = useRef<{
    selectJoint?: (id: string) => void
    resetView?: () => void
    changeMode?: (mode: 'anatomy' | 'xray' | 'heatmap') => void
  }>({})

  useEffect(() => {
    let animId: number
    let disposed = false

    async function init3D() {
      if (!canvasRef.current || !containerRef.current || disposed) return
      const THREE = await import('three')

      const canvas = canvasRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── Renderer ────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      renderer.setClearColor(0x000000, 0)

      // ── Scene & Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
      camera.position.set(0, 0.1, 4.8)

      const cameraTarget = new THREE.Vector3(0, 0.1, 0)
      camera.lookAt(cameraTarget)

      // ── Lighting ────────────────────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xd4f6f6, 1.2)
      scene.add(ambientLight)

      const mainLight = new THREE.DirectionalLight(0xffffff, 2.4)
      mainLight.position.set(3, 4, 5)
      scene.add(mainLight)

      const rimLight1 = new THREE.DirectionalLight(0x02bab9, 2.0)
      rimLight1.position.set(-4, 2, -4)
      scene.add(rimLight1)

      const rimLight2 = new THREE.DirectionalLight(0x0a7c97, 1.8)
      rimLight2.position.set(4, -3, -3)
      scene.add(rimLight2)

      const bottomGlow = new THREE.PointLight(0x059b8f, 2.5, 8)
      bottomGlow.position.set(0, -2.5, 1)
      scene.add(bottomGlow)

      // ── Master Character Group ──────────────────────────────────────────
      const characterGroup = new THREE.Group()
      scene.add(characterGroup)

      // ── Materials ───────────────────────────────────────────────────────
      // Bone Material (Medical Ceramic/Bone Texture with specular sheen)
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xebf4f6,
        roughness: 0.28,
        metalness: 0.12,
      })

      // Cartilage / Articular Joint Material (Luminescent Teal)
      const jointMat = new THREE.MeshStandardMaterial({
        color: 0x02bab9,
        emissive: 0x018b8a,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.3,
      })

      // Active Highlight Material
      const activeJointMat = new THREE.MeshStandardMaterial({
        color: 0xf18712,
        emissive: 0xd36e09,
        emissiveIntensity: 1.2,
        roughness: 0.1,
      })

      // Translucent Body Envelope Material (Fresnel/X-Ray silhouette)
      const silhouetteMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a2238,
        emissive: 0x044055,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.28,
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.65,
        ior: 1.2,
      })

      // Wireframe / Edge Material for holographic effect
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x059b8f,
        transparent: true,
        opacity: 0.22,
      })

      // ── PROCEDURAL 3D ANATOMICAL SKELETON ───────────────────────────────
      const skeletonGroup = new THREE.Group()
      characterGroup.add(skeletonGroup)

      // Helper for mirrored limbs
      function addBone(geom: any, mat: any, pos: [number, number, number], rot?: [number, number, number], parent: any = skeletonGroup) {
        const mesh = new THREE.Mesh(geom, mat)
        mesh.position.set(pos[0], pos[1], pos[2])
        if (rot) mesh.rotation.set(rot[0], rot[1], rot[2])
        parent.add(mesh)
        return mesh
      }

      // 1. CRANIUM & SKULL
      const craniumGeo = new THREE.SphereGeometry(0.24, 24, 20)
      craniumGeo.scale(0.88, 1.1, 0.95)
      addBone(craniumGeo, boneMat, [0, 1.95, 0])

      // Facial / Jaw structure
      const jawGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.16, 12)
      jawGeo.scale(0.8, 1, 0.8)
      addBone(jawGeo, boneMat, [0, 1.80, 0.05], [0.15, 0, 0])

      // 2. CERVICAL SPINE (Neck)
      for (let i = 0; i < 6; i++) {
        const vertGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.03, 14)
        addBone(vertGeo, i % 2 === 0 ? boneMat : jointMat, [0, 1.70 - i * 0.038, -0.01])
      }

      // 3. CLAVICLES (Collarbones)
      const clavicleCurveLeft = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 1.48, 0.08),
        new THREE.Vector3(-0.35, 1.50, 0.05),
        new THREE.Vector3(-0.65, 1.46, -0.02),
        new THREE.Vector3(-0.95, 1.38, 0.0)
      )
      const clavicleGeoLeft = new THREE.TubeGeometry(clavicleCurveLeft, 16, 0.032, 8, false)
      addBone(clavicleGeoLeft, boneMat, [0, 0, 0])

      const clavicleCurveRight = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 1.48, 0.08),
        new THREE.Vector3(0.35, 1.50, 0.05),
        new THREE.Vector3(0.65, 1.46, -0.02),
        new THREE.Vector3(0.95, 1.38, 0.0)
      )
      const clavicleGeoRight = new THREE.TubeGeometry(clavicleCurveRight, 16, 0.032, 8, false)
      addBone(clavicleGeoRight, boneMat, [0, 0, 0])

      // 4. STERNUM (Breastbone)
      const sternumGeo = new THREE.BoxGeometry(0.09, 0.38, 0.03)
      addBone(sternumGeo, boneMat, [0, 1.25, 0.17], [-0.05, 0, 0])

      // 5. RIBCAGE (10 Anatomical Rib Pairs)
      for (let r = 0; r < 9; r++) {
        const yPos = 1.40 - r * 0.055
        const scaleW = 0.38 + Math.sin((r / 8) * Math.PI) * 0.14
        const scaleD = 0.22 + Math.sin((r / 8) * Math.PI) * 0.07

        // Elliptical rib ring
        const ribCurve = new THREE.EllipseCurve(0, 0, scaleW, scaleD, 0, Math.PI * 2, false, 0)
        const pts = ribCurve.getPoints(36)
        const rib3DPoints = pts.map(p => new THREE.Vector3(p.x, yPos + p.y * 0.2, p.y + 0.04))
        const ribSpline = new THREE.CatmullRomCurve3(rib3DPoints, true)
        const ribMeshGeo = new THREE.TubeGeometry(ribSpline, 32, 0.016, 6, true)
        addBone(ribMeshGeo, boneMat, [0, 0, 0])
      }

      // 6. FULL VERTEBRAL COLUMN (Thoracic & Lumbar Spine)
      const spineVertebrae: any[] = []
      for (let v = 0; v < 18; v++) {
        const t = v / 17
        // Spinal curvature (kyphosis & lordosis)
        const y = 1.42 - v * 0.062
        const z = -0.04 + Math.sin(t * Math.PI * 2) * 0.055
        const vertGeo = new THREE.CylinderGeometry(0.075, 0.078, 0.038, 12)
        const m = addBone(vertGeo, v % 2 === 0 ? boneMat : jointMat, [0, y, z], [0.1, 0, 0])
        spineVertebrae.push(m)
      }

      // 7. PELVIS & SACRUM
      // Sacrum wedge
      const sacrumGeo = new THREE.ConeGeometry(0.16, 0.25, 8)
      addBone(sacrumGeo, boneMat, [0, 0.32, -0.08], [Math.PI, 0, 0])

      // Iliac wings (Left & Right)
      const iliumLeftGeo = new THREE.TorusGeometry(0.24, 0.055, 10, 16, Math.PI * 1.1)
      addBone(iliumLeftGeo, boneMat, [-0.34, 0.32, 0], [0.4, 0.4, -0.6])

      const iliumRightGeo = new THREE.TorusGeometry(0.24, 0.055, 10, 16, Math.PI * 1.1)
      addBone(iliumRightGeo, boneMat, [0.34, 0.32, 0], [0.4, -0.4, 0.6])

      // Pubic Arch
      const pubicGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.32, 8)
      addBone(pubicGeo, boneMat, [0, 0.12, 0.08], [0, 0, Math.PI / 2])

      // 8. UPPER LIMBS (LEFT & RIGHT)
      const sideFactors = [-1, 1] // -1 = Left (viewer's left), 1 = Right

      sideFactors.forEach((s) => {
        // Shoulder Ball Joint (Glenohumeral)
        const shoulderGeo = new THREE.SphereGeometry(0.08, 16, 16)
        addBone(shoulderGeo, jointMat, [s * 0.95, 1.35, 0.05])

        // Scapula (back shoulder blade)
        const scapGeo = new THREE.BoxGeometry(0.18, 0.24, 0.03)
        addBone(scapGeo, boneMat, [s * 0.58, 1.32, -0.16], [0.1, s * 0.3, s * 0.2])

        // Humerus (Upper arm bone)
        const humerusGeo = new THREE.CylinderGeometry(0.046, 0.042, 0.52, 12)
        addBone(humerusGeo, boneMat, [s * 1.08, 1.05, 0.04], [0, 0, s * 0.18])

        // Elbow Joint (Trochlea)
        const elbowGeo = new THREE.SphereGeometry(0.065, 14, 14)
        addBone(elbowGeo, jointMat, [s * 1.22, 0.78, 0.05])

        // Forearm (Radius & Ulna pair)
        const radiusGeo = new THREE.CylinderGeometry(0.035, 0.03, 0.46, 10)
        addBone(radiusGeo, boneMat, [s * 1.30, 0.52, 0.06], [0, 0, s * 0.14])

        const ulnaGeo = new THREE.CylinderGeometry(0.032, 0.026, 0.46, 10)
        addBone(ulnaGeo, boneMat, [s * 1.36, 0.52, 0.01], [0, 0, s * 0.14])

        // Wrist & Hand
        const wristGeo = new THREE.SphereGeometry(0.048, 12, 12)
        addBone(wristGeo, jointMat, [s * 1.40, 0.26, 0.05])

        const handGeo = new THREE.BoxGeometry(0.08, 0.18, 0.03)
        addBone(handGeo, boneMat, [s * 1.43, 0.14, 0.05], [0, 0, s * 0.1])
      })

      // 9. LOWER LIMBS (HIP, FEMUR, KNEE, TIBIA, ANKLE, FOOT)
      const jointMeshes: Record<string, any> = {}

      sideFactors.forEach((s) => {
        const sidePrefix = s === 1 ? 'right' : 'left'

        // Hip Joint Ball (Femoral Head & Acetabulum)
        const hipHeadGeo = new THREE.SphereGeometry(0.09, 18, 18)
        const hipMesh = addBone(hipHeadGeo, jointMat, [s * 0.52, 0.15, 0.08])
        if (s === 1) jointMeshes['hip'] = hipMesh

        // Femoral Neck Angled
        const neckGeo = new THREE.CylinderGeometry(0.048, 0.055, 0.16, 12)
        addBone(neckGeo, boneMat, [s * 0.59, 0.08, 0.08], [0, 0, s * 0.7])

        // Greater Trochanter
        const trochGeo = new THREE.SphereGeometry(0.075, 12, 12)
        addBone(trochGeo, boneMat, [s * 0.65, 0.07, 0.08])

        // Femur Bone Shaft (Thigh bone)
        const femurGeo = new THREE.CylinderGeometry(0.058, 0.052, 0.74, 14)
        addBone(femurGeo, boneMat, [s * 0.55, -0.32, 0.09], [0.05, 0, s * -0.06])

        // ── KNEE JOINT ARTHROPLASTY APPARATUS ──
        // Femoral Condyles (dual lateral & medial curved heads)
        const condyleLeftGeo = new THREE.SphereGeometry(0.065, 14, 14)
        condyleLeftGeo.scale(0.8, 1, 1.2)
        addBone(condyleLeftGeo, boneMat, [s * 0.42, -0.68, 0.09])

        const condyleRightGeo = new THREE.SphereGeometry(0.065, 14, 14)
        condyleRightGeo.scale(0.8, 1, 1.2)
        addBone(condyleRightGeo, boneMat, [s * 0.50, -0.68, 0.09])

        // Meniscus Cartilage Disc (Cushion)
        const meniscusGeo = new THREE.CylinderGeometry(0.095, 0.095, 0.03, 16)
        const kneeMesh = addBone(meniscusGeo, jointMat, [s * 0.46, -0.72, 0.1])
        if (s === 1) jointMeshes['knee'] = kneeMesh

        // Patella (Kneecap)
        const patellaGeo = new THREE.SphereGeometry(0.052, 14, 14)
        patellaGeo.scale(1, 1.2, 0.5)
        addBone(patellaGeo, boneMat, [s * 0.46, -0.68, 0.17])

        // Tibial Plateau (Shin top shelf)
        const plateauGeo = new THREE.CylinderGeometry(0.085, 0.07, 0.05, 14)
        addBone(plateauGeo, boneMat, [s * 0.46, -0.76, 0.1])

        // Tibia (Main shin bone)
        const tibiaGeo = new THREE.CylinderGeometry(0.055, 0.046, 0.76, 12)
        addBone(tibiaGeo, boneMat, [s * 0.45, -1.18, 0.09])

        // Fibula (Slender lateral bone)
        const fibulaGeo = new THREE.CylinderGeometry(0.024, 0.022, 0.74, 8)
        addBone(fibulaGeo, boneMat, [s * (0.45 + s * 0.09), -1.18, 0.06])

        // Ankle Joint (Malleolus)
        const ankleGeo = new THREE.SphereGeometry(0.065, 14, 14)
        const ankleMesh = addBone(ankleGeo, jointMat, [s * 0.44, -1.62, 0.05])
        if (s === 1) jointMeshes['ankle'] = ankleMesh

        // Foot & Calcaneus
        const footGeo = new THREE.BoxGeometry(0.12, 0.08, 0.32)
        addBone(footGeo, boneMat, [s * 0.44, -1.72, 0.16], [0.15, 0, 0])
      })

      // Store other joint keys
      jointMeshes['shoulder'] = addBone(new THREE.SphereGeometry(0.1, 16, 16), jointMat, [-0.95, 1.35, 0.05])
      jointMeshes['elbow'] = addBone(new THREE.SphereGeometry(0.085, 14, 14), jointMat, [-1.22, 0.78, 0.05])
      jointMeshes['spine'] = spineVertebrae[9] // mid lumbar

      // ── TRANSLUCENT ANATOMICAL SILHOUETTE ENVELOPE ──────────────────────
      const envelopeGroup = new THREE.Group()
      characterGroup.add(envelopeGroup)

      // Torso body contour
      const torsoGeo = new THREE.CylinderGeometry(0.48, 0.38, 1.35, 24, 6)
      torsoGeo.scale(1.0, 1.0, 0.65)
      const torsoMesh = new THREE.Mesh(torsoGeo, silhouetteMat)
      torsoMesh.position.set(0, 0.95, 0.02)
      envelopeGroup.add(torsoMesh)

      // Head silhouette
      const headEnv = new THREE.SphereGeometry(0.28, 20, 20)
      headEnv.scale(0.9, 1.15, 0.95)
      const headMesh = new THREE.Mesh(headEnv, silhouetteMat)
      headMesh.position.set(0, 1.95, 0)
      envelopeGroup.add(headMesh)

      // Thigh silhouettes
      sideFactors.forEach(s => {
        const thighEnv = new THREE.CylinderGeometry(0.19, 0.13, 0.82, 16)
        thighEnv.scale(1, 1, 0.9)
        const tm = new THREE.Mesh(thighEnv, silhouetteMat)
        tm.position.set(s * 0.55, -0.32, 0.08)
        envelopeGroup.add(tm)

        const calfEnv = new THREE.CylinderGeometry(0.13, 0.09, 0.82, 16)
        calfEnv.scale(1, 1, 0.9)
        const cm = new THREE.Mesh(calfEnv, silhouetteMat)
        cm.position.set(s * 0.45, -1.18, 0.08)
        envelopeGroup.add(cm)
      })

      // Wireframe overlay on envelope for holographic medical grid
      const torsoWire = new THREE.LineSegments(new THREE.EdgesGeometry(torsoGeo, 25), wireMat)
      torsoWire.position.copy(torsoMesh.position)
      envelopeGroup.add(torsoWire)

      // ── MEDICAL HUD & 3D GROUND GRID ────────────────────────────────────
      const gridHelper = new THREE.GridHelper(4.5, 18, 0x059b8f, 0x0a2238)
      gridHelper.position.y = -1.82
      scene.add(gridHelper)

      // Concentric rings on floor
      const ringGeo1 = new THREE.RingGeometry(0.8, 0.83, 48)
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x059b8f, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
      const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat)
      ringMesh1.rotation.x = Math.PI / 2
      ringMesh1.position.y = -1.81
      scene.add(ringMesh1)

      const ringGeo2 = new THREE.RingGeometry(1.6, 1.63, 64)
      const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat)
      ringMesh2.rotation.x = Math.PI / 2
      ringMesh2.position.y = -1.81
      scene.add(ringMesh2)

      // ── 3D PINS & PULSE RINGS AT JOINTS ─────────────────────────────────
      const pinsGroup = new THREE.Group()
      characterGroup.add(pinsGroup)

      const pinObjects: Record<string, { orb: any; ring1: any; ring2: any; beacon: any }> = {}

      JOINTS_3D_DATA.forEach(j => {
        const jColor = new THREE.Color(j.color)

        // Center glowing orb
        const orbGeo = new THREE.SphereGeometry(0.055, 16, 16)
        const orbMat = new THREE.MeshBasicMaterial({ color: jColor })
        const orb = new THREE.Mesh(orbGeo, orbMat)
        orb.position.set(...j.pos)
        pinsGroup.add(orb)

        // Pulse ring 1
        const ringGeo = new THREE.RingGeometry(0.08, 0.095, 32)
        const pRingMat = new THREE.MeshBasicMaterial({ color: jColor, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
        const ring1 = new THREE.Mesh(ringGeo, pRingMat)
        ring1.position.set(...j.pos)
        pinsGroup.add(ring1)

        // Pulse ring 2
        const ring2 = new THREE.Mesh(ringGeo.clone(), pRingMat.clone())
        ring2.position.set(...j.pos)
        pinsGroup.add(ring2)

        // Vertical Laser Beacon
        const beaconGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.45, 8)
        const beaconMat = new THREE.MeshBasicMaterial({ color: jColor, transparent: true, opacity: 0.6 })
        const beacon = new THREE.Mesh(beaconGeo, beaconMat)
        beacon.position.set(j.pos[0], j.pos[1] + 0.24, j.pos[2])
        pinsGroup.add(beacon)

        pinObjects[j.id] = { orb, ring1, ring2, beacon }
      })

      // ── CAMERA INTERPOLATION LOGIC ──────────────────────────────────────
      function flyToJoint(jointId: string) {
        const joint = JOINTS_3D_DATA.find(j => j.id === jointId)
        if (!joint) return

        transitionRef.current.targetCamPos = [...joint.camPos]
        transitionRef.current.targetLookAt = [...joint.target]
        transitionRef.current.isTransitioning = true

        // Highlight active joint in 3D
        Object.entries(jointMeshes).forEach(([id, m]) => {
          if (m && m.material) {
            m.material = id === jointId ? activeJointMat : jointMat
          }
        })
      }

      function resetView() {
        transitionRef.current.targetCamPos = [0, 0.1, 4.8]
        transitionRef.current.targetLookAt = [0, 0.1, 0]
        transitionRef.current.isTransitioning = true
      }

      stateRef.current.selectJoint = flyToJoint
      stateRef.current.resetView = resetView

      // Fly to initial active joint
      flyToJoint(activeJointId)

      // ── MOUSE & TOUCH ORBIT CONTROLS ────────────────────────────────────
      let isDragging = false
      let prevMouseX = 0
      let prevMouseY = 0
      let rotSpeed = 0.006
      let targetRotY = 0
      let targetRotX = 0

      function onMouseDown(e: MouseEvent) {
        if (e.button !== 0) return
        isDragging = true
        setIsRotating(true)
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }

      function onMouseMove(e: MouseEvent) {
        if (!isDragging) return
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        prevMouseX = e.clientX
        prevMouseY = e.clientY

        targetRotY += deltaX * rotSpeed
        targetRotX = Math.max(-0.45, Math.min(0.45, targetRotX + deltaY * rotSpeed * 0.6))
      }

      function onMouseUp() {
        isDragging = false
        setIsRotating(false)
      }

      function onWheel(e: WheelEvent) {
        e.preventDefault()
        const zoomDelta = e.deltaY * 0.002
        const currentDist = camera.position.distanceTo(cameraTarget)
        const newDist = Math.max(1.2, Math.min(6.5, currentDist + zoomDelta))
        const dir = camera.position.clone().sub(cameraTarget).normalize()
        camera.position.copy(cameraTarget.clone().add(dir.multiplyScalar(newDist)))
      }

      // Touch handlers
      let touchStartX = 0
      let touchStartY = 0
      function onTouchStart(e: TouchEvent) {
        if (e.touches.length === 1) {
          isDragging = true
          setIsRotating(true)
          touchStartX = e.touches[0].clientX
          touchStartY = e.touches[0].clientY
        }
      }

      function onTouchMove(e: TouchEvent) {
        if (!isDragging || e.touches.length !== 1) return
        const deltaX = e.touches[0].clientX - touchStartX
        const deltaY = e.touches[0].clientY - touchStartY
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY

        targetRotY += deltaX * rotSpeed * 1.2
        targetRotX = Math.max(-0.45, Math.min(0.45, targetRotX + deltaY * rotSpeed * 0.8))
      }

      function onTouchEnd() {
        isDragging = false
        setIsRotating(false)
      }

      const canvasEl = canvasRef.current
      canvasEl.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      canvasEl.addEventListener('wheel', onWheel, { passive: false })
      canvasEl.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchend', onTouchEnd)

      // ── SCREEN PROJECTION FOR 2D LABELS ─────────────────────────────────
      const tempVec = new THREE.Vector3()

      function updateScreenPins() {
        const pins = JOINTS_3D_DATA.map(j => {
          // Transform joint position with characterGroup rotation
          tempVec.set(...j.pos)
          tempVec.applyMatrix4(characterGroup.matrixWorld)
          tempVec.project(camera)

          const isVisible = tempVec.z < 1.0 && Math.abs(tempVec.x) < 1.1 && Math.abs(tempVec.y) < 1.1
          const x = (tempVec.x * 0.5 + 0.5) * width
          const y = (-(tempVec.y * 0.5) + 0.5) * height

          return { id: j.id, x, y, visible: isVisible }
        })
        setScreenPins(pins)
      }

      // ── RESIZE HANDLER ──────────────────────────────────────────────────
      function onResize() {
        if (!containerRef.current || !canvasRef.current) return
        const w = containerRef.current.clientWidth
        const h = containerRef.current.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      // ── ANIMATION LOOP ──────────────────────────────────────────────────
      let clock = new THREE.Clock()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        // Auto rotate when idle
        if (autoRotate && !isDragging) {
          targetRotY += 0.003
        }

        // Smooth character rotation
        characterGroup.rotation.y += (targetRotY - characterGroup.rotation.y) * 0.08
        characterGroup.rotation.x += (targetRotX - characterGroup.rotation.x) * 0.08

        // Update HUD angles
        const yawDeg = Math.round(((characterGroup.rotation.y * 180) / Math.PI) % 360)
        const pitchDeg = Math.round((characterGroup.rotation.x * 180) / Math.PI)
        setHudAngles({ yaw: yawDeg >= 0 ? yawDeg : 360 + yawDeg, pitch: pitchDeg })

        // 3D Camera Glide Transition
        const trans = transitionRef.current
        if (trans.isTransitioning) {
          camera.position.x += (trans.targetCamPos[0] - camera.position.x) * 0.06
          camera.position.y += (trans.targetCamPos[1] - camera.position.y) * 0.06
          camera.position.z += (trans.targetCamPos[2] - camera.position.z) * 0.06

          cameraTarget.x += (trans.targetLookAt[0] - cameraTarget.x) * 0.06
          cameraTarget.y += (trans.targetLookAt[1] - cameraTarget.y) * 0.06
          cameraTarget.z += (trans.targetLookAt[2] - cameraTarget.z) * 0.06

          camera.lookAt(cameraTarget)

          const posDist = Math.hypot(
            trans.targetCamPos[0] - camera.position.x,
            trans.targetCamPos[1] - camera.position.y,
            trans.targetCamPos[2] - camera.position.z
          )
          if (posDist < 0.015) {
            trans.isTransitioning = false
          }
        }

        // Animate Hotspot Pins
        JOINTS_3D_DATA.forEach((j, idx) => {
          const pin = pinObjects[j.id]
          if (pin) {
            // Billboard pulse rings to face camera
            pin.ring1.lookAt(camera.position)
            pin.ring2.lookAt(camera.position)

            // Pulse ring scale & opacity
            const wave1 = (elapsedTime * 1.8 + idx * 0.4) % 1
            const wave2 = (elapsedTime * 1.8 + idx * 0.4 + 0.5) % 1

            pin.ring1.scale.setScalar(1 + wave1 * 1.8)
            pin.ring1.material.opacity = (1 - wave1) * 0.7

            pin.ring2.scale.setScalar(1 + wave2 * 1.8)
            pin.ring2.material.opacity = (1 - wave2) * 0.7

            // Orb breathing
            const orbPulse = 1 + Math.sin(elapsedTime * 3 + idx) * 0.15
            pin.orb.scale.setScalar(orbPulse)

            // Active joint halo boost
            if (j.id === activeJointId) {
              pin.beacon.scale.set(1.4, 1.3, 1.4)
              pin.orb.material.color.setHex(0xf18712)
            } else {
              pin.beacon.scale.set(1, 1, 1)
              pin.orb.material.color.set(j.color)
            }
          }
        })

        // Gentle breathing animation on ribcage
        const breathe = 1 + Math.sin(elapsedTime * 1.4) * 0.012
        skeletonGroup.scale.set(breathe, 1, breathe)

        // Ground rings rotation
        ringMesh1.rotation.z = elapsedTime * 0.08
        ringMesh2.rotation.z = -elapsedTime * 0.05

        // Update 2D Screen-Pinned HTML Hotspot Coordinates
        updateScreenPins()

        renderer.render(scene, camera)
      }
      animate()

      // ── Mode Switcher Logic ─────────────────────────────────────────────
      stateRef.current.changeMode = (mode: 'anatomy' | 'xray' | 'heatmap') => {
        if (mode === 'xray') {
          silhouetteMat.opacity = 0.55
          silhouetteMat.color.setHex(0x02bab9)
          boneMat.roughness = 0.1
          boneMat.metalness = 0.8
        } else if (mode === 'heatmap') {
          silhouetteMat.opacity = 0.15
          boneMat.roughness = 0.4
          boneMat.metalness = 0.1
        } else {
          // Default medical anatomy
          silhouetteMat.opacity = 0.28
          silhouetteMat.color.setHex(0x0a2238)
          boneMat.roughness = 0.28
          boneMat.metalness = 0.12
        }
      }

      // Cleanup
      return () => {
        disposed = true
        cancelAnimationFrame(animId)
        canvasEl.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        canvasEl.removeEventListener('wheel', onWheel)
        canvasEl.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }

    const cleanupPromise = init3D()
    return () => {
      disposed = true
      cleanupPromise.then(fn => fn?.())
    }
  }, [activeJointId, autoRotate])

  // React to prop change for active joint
  useEffect(() => {
    if (stateRef.current.selectJoint) {
      stateRef.current.selectJoint(activeJointId)
    }
  }, [activeJointId])

  const handleResetCamera = useCallback(() => {
    if (stateRef.current.resetView) {
      stateRef.current.resetView()
    }
  }, [])

  const handleModeChange = useCallback((mode: 'anatomy' | 'xray' | 'heatmap') => {
    setViewMode(mode)
    if (stateRef.current.changeMode) {
      stateRef.current.changeMode(mode)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] sm:h-[620px] md:h-[680px] rounded-3xl overflow-hidden border border-slate-700/60 bg-gradient-to-b from-[#06111f] via-[#081729] to-[#040c17] select-none shadow-2xl"
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* ── ORTHORACLE-STYLE CLINICAL HUD OVERLAYS ── */}

      {/* Top Left: System Status & Diagnostic Header */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none z-20">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-brand-300 uppercase">
            ORTHORACLE 3D ATLAS // CLINICAL ANATOMY
          </span>
        </div>
        <div className="text-white text-base sm:text-lg font-serif font-bold tracking-tight">
          Human Musculoskeletal Framework
        </div>
        <div className="font-mono text-[10px] text-slate-400">
          SURGEON-DIRECTED MODEL • SUB-MILLIMETER JOINT ALIGNMENT
        </div>
      </div>

      {/* Top Right: Real-time 3D Rotation Angle & Reset Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col items-end gap-2 z-20">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 font-mono text-[11px] text-slate-300 flex items-center gap-2">
          <span className="text-brand-400">3D ORIENT:</span>
          <span>Y: {hudAngles.yaw}°</span>
          <span className="text-slate-600">|</span>
          <span>X: {hudAngles.pitch}°</span>
        </div>

        <button
          onClick={handleResetCamera}
          className="bg-brand-600/30 hover:bg-brand-600/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-400/40 text-brand-200 text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        >
          <span>↺ Reset 3D View</span>
        </button>
      </div>

      {/* Bottom Left: Visual Mode Switcher (Anatomy / X-Ray / Heatmap) */}
      <div className="absolute bottom-5 left-4 sm:left-6 z-20 flex flex-wrap gap-1.5">
        {(['anatomy', 'xray', 'heatmap'] as const).map(m => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-3 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === m
                ? 'bg-brand-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            {m === 'anatomy' ? 'Skeletal Anatomy' : m === 'xray' ? 'CT / X-Ray' : 'Joint Heatmap'}
          </button>
        ))}

        <button
          onClick={() => setAutoRotate(prev => !prev)}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
            autoRotate
              ? 'bg-slate-800 text-brand-300 border border-brand-400/40'
              : 'bg-slate-900/60 text-slate-500 border border-slate-700/50'
          }`}
          title="Toggle 360° Auto-Rotation"
        >
          {autoRotate ? '⏸ Auto-Spin' : '▶ Auto-Spin'}
        </button>
      </div>

      {/* Bottom Center: Gesture & Mouse Guidance */}
      <div className="absolute bottom-3 inset-x-0 pointer-events-none text-center hidden sm:block z-10">
        <span className="font-mono text-[10.5px] text-slate-400 bg-slate-950/70 px-4 py-1 rounded-full border border-slate-800/80 backdrop-blur-sm">
          🖱 Drag to rotate 360° • 🔍 Scroll / Pinch to zoom • 📍 Tap pins to focus joint
        </span>
      </div>

      {/* ── 2D SCREEN-PROJECTED HOTSPOT BADGES (Synced to 3D Coordinates) ── */}
      {screenPins.map(pin => {
        if (!pin.visible) return null
        const isSelected = pin.id === activeJointId
        const jointData = JOINTS_3D_DATA.find(j => j.id === pin.id)
        if (!jointData) return null

        return (
          <button
            key={pin.id}
            onClick={() => onSelectJoint(pin.id)}
            className={`absolute z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
              isSelected
                ? 'scale-110 shadow-lg ring-2 ring-amber-400'
                : 'hover:scale-105 opacity-85 hover:opacity-100'
            }`}
            style={{
              left: `${pin.x}px`,
              top: `${pin.y}px`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(10, 25, 40, 0.82)',
              border: `1.5px solid ${isSelected ? '#F18712' : jointData.color}`,
              boxShadow: isSelected ? '0 0 16px rgba(241, 135, 18, 0.6)' : `0 0 10px ${jointData.color}40`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: isSelected ? '#F18712' : jointData.color,
                boxShadow: `0 0 6px ${isSelected ? '#F18712' : jointData.color}`,
              }}
            />
            <span
              className="text-[11px] font-bold tracking-tight whitespace-nowrap"
              style={{ color: isSelected ? '#ffffff' : jointData.color }}
            >
              {jointData.label}
            </span>
          </button>
        )
      })}

      {/* Viewport Corner Brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-500/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-500/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-500/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-500/40 pointer-events-none" />
    </div>
  )
}
