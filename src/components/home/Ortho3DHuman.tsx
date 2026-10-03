'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import type * as THREE from 'three'
import { buildFullBodySkeleton } from '@/utils/skeleton3D'

export interface Joint3DInfo {
  id: string
  label: string
  boneName: string
  surfaceOffset: [number, number, number]
  camOffset: [number, number, number]
  color: string
}

export const JOINTS_3D_DATA: Joint3DInfo[] = [
  {
    id: 'knee',
    label: 'Knee',
    boneName: 'RightLeg',
    surfaceOffset: [0, 0.02, 0.13],
    camOffset: [0, 0.02, 0.88],
    color: '#02BAB9',
  },
  {
    id: 'hip',
    label: 'Hip',
    boneName: 'RightUpLeg',
    surfaceOffset: [-0.07, 0.04, 0.17],
    camOffset: [0, 0.03, 1.05],
    color: '#F18712',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    boneName: 'LeftArm',
    surfaceOffset: [0.06, 0.03, 0.10],
    camOffset: [0, 0.02, 0.92],
    color: '#059B8F',
  },
  {
    id: 'spine',
    label: 'Spine',
    boneName: 'Spine1',
    surfaceOffset: [0, 0.0, -0.16],
    camOffset: [0.10, 0.02, -0.98],
    color: '#01B3BF',
  },
  {
    id: 'elbow',
    label: 'Elbow',
    boneName: 'LeftForeArm',
    surfaceOffset: [0.05, 0.02, 0.08],
    camOffset: [0, 0.02, 0.88],
    color: '#0A7C97',
  },
  {
    id: 'ankle',
    label: 'Ankle',
    boneName: 'RightFoot',
    surfaceOffset: [-0.04, 0.06, 0.16],
    camOffset: [0, 0.06, 0.82],
    color: '#059B8F',
  },
]

export type ScanMode = 'normal' | 'scanner' | 'skeleton'

interface Ortho3DHumanProps {
  activeJointId: string | null
  onSelectJoint: (id: string | null) => void
  activeColor: string
  viewMode?: ScanMode
  onToggleViewMode?: (mode: ScanMode) => void
}

export default function Ortho3DHuman({
  activeJointId,
  onSelectJoint,
  activeColor,
  viewMode: propViewMode,
  onToggleViewMode,
}: Ortho3DHumanProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  // View Mode: 'normal' (No Scanner) | 'scanner' (Interactive Beam) | 'skeleton' (Big Scanner)
  const [internalViewMode, setInternalViewMode] = useState<ScanMode>('scanner')
  const viewMode = propViewMode ?? internalViewMode
  const setViewMode = useCallback(
    (mode: ScanMode) => {
      setInternalViewMode(mode)
      onToggleViewMode?.(mode)
    },
    [onToggleViewMode]
  )

  // Scanner vertical center: range from -0.80 (feet) to +0.75 (head)
  const [scannerY, setScannerY] = useState(0.12)
  const [showImplant, setShowImplant] = useState(false)

  useEffect(() => {
    setShowImplant(false)
    if (activeJointId) {
      if (activeJointId === 'knee') setScannerY(-0.34)
      if (activeJointId === 'hip') setScannerY(0.08)
      if (activeJointId === 'shoulder') setScannerY(0.44)
      if (activeJointId === 'spine') setScannerY(0.28)
      if (activeJointId === 'elbow') setScannerY(0.18)
      if (activeJointId === 'ankle') setScannerY(-0.75)
    }
  }, [activeJointId])

  // Full body camera initial view: z = 3.10 perfectly fits 1.85m human male head-to-toe
  const FULL_BODY_CAM: [number, number, number] = [0, 0.0, 3.10]
  const FULL_BODY_TARGET: [number, number, number] = [0, 0.0, 0]

  const transitionRef = useRef({
    currentCamPos: [...FULL_BODY_CAM] as [number, number, number],
    targetCamPos: [...FULL_BODY_CAM] as [number, number, number],
    currentLookAt: [...FULL_BODY_TARGET] as [number, number, number],
    targetLookAt: [...FULL_BODY_TARGET] as [number, number, number],
    isTransitioning: false,
  })

  const stateRef = useRef<{
    selectJoint?: (id: string | null) => void
    resetView?: () => void
    applyVisualMode?: (mode: ScanMode, activeJoint: string | null, implant: boolean, yCenter: number) => void
    setTargetScannerY?: (y: number) => void
  }>({})

  useEffect(() => {
    let animId: number
    let disposed = false

    async function init3D() {
      if (!canvasRef.current || !containerRef.current || disposed) return

      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

      const canvas = canvasRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── Renderer (Pure White Studio Background) ───────────────────────────
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
      renderer.toneMappingExposure = 1.05

      // ── Scene & Camera (Starts in Full Body Overview) ─────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
      camera.position.set(...FULL_BODY_CAM)

      const cameraTarget = new THREE.Vector3(...FULL_BODY_TARGET)
      camera.lookAt(cameraTarget)

      // ── Studio High-Key Lighting ─────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.45)
      scene.add(ambientLight)

      // Soft Key Light from front-right
      const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.9)
      keyLight.position.set(2.5, 3.5, 3.0)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.001
      scene.add(keyLight)

      // Soft Fill Light from left
      const fillLight = new THREE.DirectionalLight(0xf0fdfa, 1.2)
      fillLight.position.set(-2.5, 2.5, 2.5)
      scene.add(fillLight)

      // Backlight for clean silhouette separation
      const backLight = new THREE.DirectionalLight(0xe0f2fe, 1.0)
      backLight.position.set(0, 2.0, -3.0)
      scene.add(backLight)

      // Ground bounce
      const groundLight = new THREE.DirectionalLight(0xf8fafc, 0.7)
      groundLight.position.set(0, -2.5, 1.5)
      scene.add(groundLight)

      // ── Soft Radial Ground Studio Shadow Disc ────────────────────────────
      const shadowCanvas = document.createElement('canvas')
      shadowCanvas.width = 256
      shadowCanvas.height = 256
      const sCtx = shadowCanvas.getContext('2d')!
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120)
      sGrad.addColorStop(0, 'rgba(15, 23, 42, 0.28)')
      sGrad.addColorStop(0.35, 'rgba(15, 23, 42, 0.14)')
      sGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.03)')
      sGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      sCtx.fillStyle = sGrad
      sCtx.fillRect(0, 0, 256, 256)

      const shadowTex = new THREE.CanvasTexture(shadowCanvas)
      const shadowPlaneGeo = new THREE.PlaneGeometry(2.4, 2.4)
      const shadowPlaneMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
      })
      const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat)
      shadowMesh.rotation.x = -Math.PI / 2
      shadowMesh.position.y = -0.96
      scene.add(shadowMesh)

      // ── Model & Pins Groups ──────────────────────────────────────────────
      const characterGroup = new THREE.Group()
      scene.add(characterGroup)

      const clickableObjects: THREE.Object3D[] = []
      const jointAnchorMap: Record<string, { group: THREE.Group; orb: THREE.Mesh; ring: THREE.Mesh; glow: THREE.Mesh; sprite: THREE.Sprite }> = {}
      const jointCoordinates: Record<string, THREE.Vector3> = {}

      // Helper to generate a crisp 3D Canvas Sprite Badge stuck to the joint
      function createLabelSprite(text: string, color: string) {
        const c = document.createElement('canvas')
        c.width = 256
        c.height = 80
        const ctx = c.getContext('2d')!

        ctx.fillStyle = 'rgba(255, 255, 255, 0.96)'
        ctx.strokeStyle = color
        ctx.lineWidth = 4

        const r = 24
        const x = 8
        const y = 8
        const w = 240
        const h = 64

        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.quadraticCurveTo(x + w, y, x + w, y + r)
        ctx.lineTo(x + w, y + h - r)
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
        ctx.lineTo(x + r, y + h)
        ctx.quadraticCurveTo(x, y + h, x, y + h - r)
        ctx.lineTo(x, y + r)
        ctx.quadraticCurveTo(x, y, x + r, y)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Colored dot
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(38, 40, 10, 0, Math.PI * 2)
        ctx.fill()

        // Bold Typography
        ctx.fillStyle = '#0f172a'
        ctx.font = 'bold 30px system-ui, -apple-system, sans-serif'
        ctx.fillText(text, 60, 50)

        const tex = new THREE.CanvasTexture(c)
        tex.minFilter = THREE.LinearFilter
        const mat = new THREE.SpriteMaterial({
          map: tex,
          depthTest: false,
          depthWrite: false,
          transparent: true,
        })
        const sprite = new THREE.Sprite(mat)
        sprite.renderOrder = 1000
        sprite.scale.set(0.22, 0.07, 1)
        return sprite
      }

      function create3DPin(j: Joint3DInfo, pos: THREE.Vector3) {
        const pinGroup = new THREE.Group()
        pinGroup.position.copy(pos)
        pinGroup.name = j.id
        pinGroup.renderOrder = 998

        const jColor = new THREE.Color(j.color)

        // 1. Center Spherical Jewel Pin
        const orbGeo = new THREE.SphereGeometry(0.028, 16, 16)
        const orbMat = new THREE.MeshStandardMaterial({
          color: jColor,
          emissive: jColor,
          emissiveIntensity: 0.9,
          roughness: 0.2,
          metalness: 0.3,
          polygonOffset: true,
          polygonOffsetFactor: -4,
          polygonOffsetUnits: -4,
        })
        const orb = new THREE.Mesh(orbGeo, orbMat)
        orb.renderOrder = 998
        orb.userData = { jointId: j.id }
        pinGroup.add(orb)

        // 2. Pulse Radar Ring
        const ringGeo = new THREE.RingGeometry(0.040, 0.052, 32)
        const ringMat = new THREE.MeshBasicMaterial({
          color: jColor,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -5,
          polygonOffsetUnits: -5,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.renderOrder = 999
        pinGroup.add(ring)

        // 3. Glow Halo Sphere
        const glowGeo = new THREE.SphereGeometry(0.048, 14, 14)
        const glowMat = new THREE.MeshBasicMaterial({
          color: jColor,
          transparent: true,
          opacity: 0.30,
          depthTest: false,
        })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        glow.renderOrder = 997
        pinGroup.add(glow)

        // 4. Stuck 3D Sprite Label
        const sprite = createLabelSprite(j.label, j.color)
        sprite.position.set(0.12, 0.04, 0)
        sprite.userData = { jointId: j.id }
        pinGroup.add(sprite)

        // Invisible larger hit sphere for direct click
        const hitGeo = new THREE.SphereGeometry(0.08, 8, 8)
        const hitMat = new THREE.MeshBasicMaterial({ visible: false })
        const hitMesh = new THREE.Mesh(hitGeo, hitMat)
        hitMesh.userData = { jointId: j.id }
        pinGroup.add(hitMesh)

        clickableObjects.push(hitMesh, orb, sprite)
        characterGroup.add(pinGroup)

        jointAnchorMap[j.id] = { group: pinGroup, orb, ring, glow, sprite }
        jointCoordinates[j.id] = pos.clone()
      }

      // Scanner animation state in init3D scope
      let currentScannerY = scannerY
      let targetScannerY = scannerY
      let updateScannerPlanesFn: ((y: number) => void) | null = null

      // ── LOAD REAL 3D CLOTHED HUMAN MALE GLB ──────────────────────────────
      const loader = new GLTFLoader()

      loader.load(
        '/models/human-male.glb',
        (gltf) => {
          if (disposed) return
          const model = gltf.scene

          // Compute bounding box & center character vertically
          const box = new THREE.Box3().setFromObject(model)
          const size = new THREE.Vector3()
          box.getSize(size)
          const center = new THREE.Vector3()
          box.getCenter(center)

          // Normalize height to ~1.85m within 3D world
          const targetHeight = 1.85
          const scale = targetHeight / (size.y || 1)
          model.scale.setScalar(scale)

          // Center the model horizontally and place feet at ground
          model.position.x = -center.x * scale
          model.position.y = -box.min.y * scale - 0.95
          model.position.z = -center.z * scale

          // Extract anatomical bones to pose armature into natural relaxed standing posture
          const boneMap: Record<string, any> = {}
          model.traverse((child: any) => {
            if (child.isBone) {
              boneMap[child.name] = child
            }
          })

          // Eliminate stiff dummy A-pose: pose arms to hang naturally at the sides of the thighs
          if (boneMap['LeftArm']) {
            boneMap['LeftArm'].rotation.x += 0.44
            boneMap['LeftArm'].rotation.z += 0.05
          }
          if (boneMap['RightArm']) {
            boneMap['RightArm'].rotation.x += 0.44
            boneMap['RightArm'].rotation.z -= 0.05
          }

          // Gentle natural elbow flexion (~10-15 degrees forward)
          if (boneMap['LeftForeArm']) {
            boneMap['LeftForeArm'].rotation.z += 0.14
            boneMap['LeftForeArm'].rotation.y += 0.04
          }
          if (boneMap['RightForeArm']) {
            boneMap['RightForeArm'].rotation.z -= 0.14
            boneMap['RightForeArm'].rotation.y -= 0.04
          }

          // Natural inward resting palm orientation toward the body
          if (boneMap['LeftHand']) {
            boneMap['LeftHand'].rotation.y += 0.18
            boneMap['LeftHand'].rotation.x += 0.05
          }
          if (boneMap['RightHand']) {
            boneMap['RightHand'].rotation.y -= 0.18
            boneMap['RightHand'].rotation.x += 0.05
          }

          // Relax shoulders down into confident clinical posture
          if (boneMap['LeftShoulder']) {
            boneMap['LeftShoulder'].rotation.z += 0.04
          }
          if (boneMap['RightShoulder']) {
            boneMap['RightShoulder'].rotation.z -= 0.04
          }

          // Upright, distinguished spine
          if (boneMap['Spine1']) {
            boneMap['Spine1'].rotation.x -= 0.03
          }

          // Enable shadows and configure distinguished middle-aged doctor / clinical aesthetic
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              if (child.material) {
                if (child.name === 'Wolf3D_Hair') {
                  // Mature salt-and-pepper / refined charcoal tone
                  child.material.color.setHex(0x52525b)
                  child.material.roughness = 0.85
                  child.material.metalness = 0.02
                } else if (child.name === 'Wolf3D_Outfit_Top') {
                  // Tailored deep navy clinical/orthopedic shirt
                  child.material.color.setHex(0x1e293b)
                  child.material.roughness = 0.75
                  child.material.metalness = 0.05
                } else if (child.name === 'Wolf3D_Outfit_Bottom') {
                  // Crisp formal slate trousers
                  child.material.color.setHex(0x334155)
                  child.material.roughness = 0.80
                  child.material.metalness = 0.02
                } else if (child.name === 'Wolf3D_Outfit_Footwear') {
                  // Polished black leather dress shoes
                  child.material.color.setHex(0x111827)
                  child.material.roughness = 0.35
                  child.material.metalness = 0.15
                } else if (child.name === 'Wolf3D_Skin' || child.name === 'Wolf3D_Body') {
                  // Natural mature skin tone with realistic subsurface roughness
                  child.material.roughness = 0.58
                  child.material.metalness = 0.0
                } else if (child.name === 'Wolf3D_Eye') {
                  child.material.roughness = 0.12
                  child.material.metalness = 0.0
                } else {
                  child.material.roughness = Math.max(0.35, child.material.roughness || 0.4)
                  child.material.metalness = Math.min(0.25, child.material.metalness || 0.1)
                }
                child.material.needsUpdate = true
              }
            }
          })

          characterGroup.add(model)
          model.updateMatrixWorld(true)

          // Dark Radiograph Film Backdrop Plane (Placed directly behind the body)
          // Clipped to the exact scanner window in 'scanner' mode, so inside the window is black radiograph!
          const backdropGeo = new THREE.PlaneGeometry(1.2, 2.3)
          const backdropMat = new THREE.MeshBasicMaterial({
            color: 0x050a14, // deep radiograph black
            side: THREE.DoubleSide,
            depthWrite: false,
          })
          const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat)
          backdropMesh.position.set(0, -0.05, -0.25)
          backdropMesh.renderOrder = -5
          characterGroup.add(backdropMesh)

          renderer.localClippingEnabled = true

          // Build smooth, realistic anatomical skeleton and surgical implants matching exact bone positions
          const skeletonResult = buildFullBodySkeleton(THREE as any, boneMap, characterGroup)
          characterGroup.add(skeletonResult.skeletonGroup)

          // Clipping planes for dynamic scanner beam window
          const scanHeight = 0.38
          const planeSkelTop = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.19)
          const planeSkelBottom = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.19)
          const planeClothesTop = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.19)
          const planeClothesBottom = new THREE.Plane(new THREE.Vector3(0, -1, 0), -0.19)

          // Store mesh material information for switching between Normal and Skeleton/X-Ray
          const avatarMeshes: Array<{
            mesh: any
            originalColor: THREE.Color
            originalRoughness: number
            originalMetalness: number
          }> = []

          model.traverse((child: any) => {
            if (child.isMesh && child.material) {
              avatarMeshes.push({
                mesh: child,
                originalColor: child.material.color.clone(),
                originalRoughness: child.material.roughness,
                originalMetalness: child.material.metalness,
              })
            }
          })

          function updateScannerPlanes(yCenter: number) {
            const yMin = yCenter - scanHeight / 2
            const yMax = yCenter + scanHeight / 2
            planeSkelTop.constant = yMax
            planeSkelBottom.constant = -yMin
            planeClothesTop.constant = -yMax
            planeClothesBottom.constant = yMin
          }
          updateScannerPlanesFn = updateScannerPlanes

          stateRef.current.setTargetScannerY = (y: number) => {
            targetScannerY = y
          }

          function applyVisualMode(
            mode: ScanMode,
            jointId: string | null,
            implant: boolean,
            yCenter: number
          ) {
            let activeY = yCenter
            if (jointId && jointCoordinates[jointId]) {
              activeY = jointCoordinates[jointId].y
              targetScannerY = activeY
            }

            if (mode === 'normal' && !jointId) {
              // 1. NO SCANNER (Normal Clothed Gentleman on White Background)
              scene.background = new THREE.Color(0xffffff)
              shadowMesh.visible = true
              backdropMesh.visible = false
              skeletonResult.skeletonGroup.visible = false
              avatarMeshes.forEach((item) => {
                const mat = item.mesh.material
                if (mat) {
                  mat.clippingPlanes = null
                  mat.transparent = false
                  mat.opacity = 1.0
                  mat.depthWrite = true
                  mat.color.copy(item.originalColor)
                  mat.roughness = item.originalRoughness
                  mat.metalness = item.originalMetalness
                  mat.needsUpdate = true
                }
              })
            } else if (mode === 'skeleton' && !jointId) {
              // 2. BIG SCANNER (Full Body Skeleton - Black Radiograph Suite!)
              scene.background = new THREE.Color(0x050a14)
              shadowMesh.visible = false
              backdropMesh.visible = false
              skeletonResult.skeletonGroup.visible = true
              skeletonResult.skeletonMeshes.forEach((m) => {
                const mat = m.material as any
                if (mat) {
                  mat.clippingPlanes = null
                  mat.needsUpdate = true
                }
              })
              avatarMeshes.forEach((item) => {
                const mat = item.mesh.material
                if (mat) {
                  mat.clippingPlanes = null
                  mat.transparent = true
                  mat.opacity = 0.16
                  mat.depthWrite = false
                  mat.color.setHex(0x38bdf8) // Cyan radiograph silhouette
                  mat.needsUpdate = true
                }
              })
            } else {
              // 3. DYNAMIC X-RAY SCANNER (White background with black beam window & glowing skeleton!)
              scene.background = new THREE.Color(0xffffff)
              shadowMesh.visible = true
              updateScannerPlanes(activeY)

              // Black radiograph backing plane active inside beam window
              backdropMesh.visible = true
              const bgMat = backdropMesh.material as any
              if (bgMat) {
                bgMat.clippingPlanes = [planeSkelTop, planeSkelBottom]
                bgMat.needsUpdate = true
              }

              skeletonResult.skeletonGroup.visible = true
              skeletonResult.skeletonMeshes.forEach((m) => {
                const mat = m.material as any
                if (mat) {
                  mat.clippingPlanes = [planeSkelTop, planeSkelBottom]
                  mat.clipIntersection = false
                  mat.needsUpdate = true
                }
              })

              avatarMeshes.forEach((item) => {
                const mat = item.mesh.material
                if (mat) {
                  mat.clippingPlanes = [planeClothesTop, planeClothesBottom]
                  mat.clipIntersection = true
                  mat.transparent = false
                  mat.opacity = 1.0
                  mat.depthWrite = true
                  mat.color.copy(item.originalColor)
                  mat.roughness = item.originalRoughness
                  mat.metalness = item.originalMetalness
                  mat.needsUpdate = true
                }
              })
            }

            // Update surgical implants
            Object.keys(skeletonResult.jointImplants).forEach((key) => {
              const imp = skeletonResult.jointImplants[key]
              if (imp) {
                if (jointId && implant) {
                  imp.visible = key === jointId || key === `${jointId}_femur`
                } else {
                  imp.visible = false
                }
              }
            })
          }

          // Attach each 3D Pin RIGIDLY directly to the exact bone surface
          JOINTS_3D_DATA.forEach((j) => {
            const bone = boneMap[j.boneName]
            const pinPos = new THREE.Vector3()

            if (bone) {
              bone.getWorldPosition(pinPos)
              characterGroup.worldToLocal(pinPos)
              pinPos.x += j.surfaceOffset[0]
              pinPos.y += j.surfaceOffset[1]
              pinPos.z += j.surfaceOffset[2]
            } else {
              if (j.id === 'knee') pinPos.set(-0.11, -0.34, 0.13)
              if (j.id === 'hip') pinPos.set(-0.14, 0.08, 0.17)
              if (j.id === 'shoulder') pinPos.set(0.24, 0.44, 0.10)
              if (j.id === 'spine') pinPos.set(0.0, 0.28, -0.16)
              if (j.id === 'elbow') pinPos.set(0.25, 0.14, 0.08)
              if (j.id === 'ankle') pinPos.set(-0.12, -0.78, 0.16)
            }

            create3DPin(j, pinPos)
          })

          stateRef.current.applyVisualMode = applyVisualMode
          applyVisualMode(viewMode, activeJointId, showImplant, scannerY)

          setIsLoading(false)

          // Initial load: ONLY zoom to joint if activeJointId was explicitly set, otherwise stay in FULL BODY view!
          if (activeJointId) {
            flyToJoint(activeJointId)
          } else {
            resetView()
          }
        },
        (xhr) => {
          if (xhr.lengthComputable && xhr.total > 0) {
            setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100))
          }
        },
        (error) => {
          console.error('Error loading 3D human model:', error)
          setIsLoading(false)
        }
      )

      // ── CAMERA FLIGHT / ZOOM TO JOINT ─────────────────────────────────────
      function flyToJoint(jointId: string | null) {
        if (!jointId) {
          resetView()
          return
        }

        const joint = JOINTS_3D_DATA.find((j) => j.id === jointId)
        if (!joint) return

        const jointPos = jointCoordinates[jointId]
        if (!jointPos) return

        transitionRef.current.targetCamPos = [
          jointPos.x + joint.camOffset[0],
          jointPos.y + joint.camOffset[1],
          jointPos.z + joint.camOffset[2],
        ]
        transitionRef.current.targetLookAt = [jointPos.x, jointPos.y, jointPos.z]
        transitionRef.current.isTransitioning = true
      }

      function resetView() {
        transitionRef.current.targetCamPos = [...FULL_BODY_CAM]
        transitionRef.current.targetLookAt = [...FULL_BODY_TARGET]
        transitionRef.current.isTransitioning = true
      }

      stateRef.current.selectJoint = flyToJoint
      stateRef.current.resetView = resetView

      // ── RAYCASTER FOR DIRECT CLICK & HOVER ON PINS ─────────────────────────
      const raycaster = new THREE.Raycaster()
      const mouseVec = new THREE.Vector2()

      function getPointerPos(e: MouseEvent) {
        const rect = canvas.getBoundingClientRect()
        mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      }

      function onClick(e: MouseEvent) {
        getPointerPos(e)
        raycaster.setFromCamera(mouseVec, camera)
        const intersects = raycaster.intersectObjects(clickableObjects, true)

        if (intersects.length > 0) {
          let hitObj: any = intersects[0].object
          while (hitObj && !hitObj.userData?.jointId && hitObj.parent) {
            hitObj = hitObj.parent
          }
          const jointId = hitObj?.userData?.jointId
          if (jointId) {
            onSelectJoint(jointId)
          }
        }
      }

      function onPointerMove(e: MouseEvent) {
        getPointerPos(e)
        raycaster.setFromCamera(mouseVec, camera)
        const intersects = raycaster.intersectObjects(clickableObjects, true)
        if (intersects.length > 0) {
          canvas.style.cursor = 'pointer'
        } else {
          canvas.style.cursor = isDragging ? 'grabbing' : 'grab'
        }
      }

      // ── 360° MOUSE & TOUCH ORBIT CONTROLS (NO AUTO-REVOLVE) ───────────────
      let isDragging = false
      let prevMouseX = 0
      let prevMouseY = 0
      let rotSpeed = 0.007
      let targetRotY = 0
      let targetRotX = 0

      function onMouseDown(e: MouseEvent) {
        if (e.button !== 0) return
        isDragging = true
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }

      function onMouseMove(e: MouseEvent) {
        onPointerMove(e)
        if (!isDragging) return
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        prevMouseX = e.clientX
        prevMouseY = e.clientY

        targetRotY += deltaX * rotSpeed
        targetRotX = Math.max(-0.35, Math.min(0.35, targetRotX + deltaY * rotSpeed * 0.5))
      }

      function onMouseUp() {
        isDragging = false
        canvas.style.cursor = 'grab'
      }

      function onWheel(e: WheelEvent) {
        e.preventDefault()
        const zoomDelta = e.deltaY * 0.0015
        const currentDist = camera.position.distanceTo(cameraTarget)
        const newDist = Math.max(0.8, Math.min(4.2, currentDist + zoomDelta))
        const dir = camera.position.clone().sub(cameraTarget).normalize()
        camera.position.copy(cameraTarget.clone().add(dir.multiplyScalar(newDist)))
      }

      // Touch handling for mobile
      let touchStartX = 0
      let touchStartY = 0
      function onTouchStart(e: TouchEvent) {
        if (e.touches.length === 1) {
          isDragging = true
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
        targetRotX = Math.max(-0.35, Math.min(0.35, targetRotX + deltaY * rotSpeed * 0.6))
      }

      function onTouchEnd() {
        isDragging = false
      }

      const canvasEl = canvasRef.current
      canvasEl.addEventListener('click', onClick)
      canvasEl.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      canvasEl.addEventListener('wheel', onWheel, { passive: false })
      canvasEl.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchend', onTouchEnd)

      // ── RESIZE HANDLER ────────────────────────────────────────────────────
      function onResize() {
        if (!containerRef.current || !canvasRef.current) return
        const w = containerRef.current.clientWidth
        const h = containerRef.current.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      // ── ANIMATION LOOP (STEADY POSE, ZERO AUTO-REVOLVING) ─────────────────
      let clock = new THREE.Clock()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        // Character stands completely still: targetRotY is ONLY modified by user drag
        characterGroup.rotation.y += (targetRotY - characterGroup.rotation.y) * 0.08
        characterGroup.rotation.x += (targetRotX - characterGroup.rotation.x) * 0.08

        // Smooth dynamic scanner motion interpolation
        if (Math.abs(targetScannerY - currentScannerY) > 0.001) {
          currentScannerY += (targetScannerY - currentScannerY) * 0.15
          updateScannerPlanesFn?.(currentScannerY)
        }

        // Buttery-smooth camera glide transition (exponential ease-out)
        const trans = transitionRef.current
        if (trans.isTransitioning) {
          const ease = 0.075
          camera.position.x += (trans.targetCamPos[0] - camera.position.x) * ease
          camera.position.y += (trans.targetCamPos[1] - camera.position.y) * ease
          camera.position.z += (trans.targetCamPos[2] - camera.position.z) * ease

          cameraTarget.x += (trans.targetLookAt[0] - cameraTarget.x) * ease
          cameraTarget.y += (trans.targetLookAt[1] - cameraTarget.y) * ease
          cameraTarget.z += (trans.targetLookAt[2] - cameraTarget.z) * ease

          camera.lookAt(cameraTarget)

          const posDist = Math.hypot(
            trans.targetCamPos[0] - camera.position.x,
            trans.targetCamPos[1] - camera.position.y,
            trans.targetCamPos[2] - camera.position.z
          )
          if (posDist < 0.005) {
            camera.position.set(trans.targetCamPos[0], trans.targetCamPos[1], trans.targetCamPos[2])
            cameraTarget.set(trans.targetLookAt[0], trans.targetLookAt[1], trans.targetLookAt[2])
            camera.lookAt(cameraTarget)
            trans.isTransitioning = false
          }
        }

        // Animate 3D Hotspot Pins
        JOINTS_3D_DATA.forEach((j, idx) => {
          const pin = jointAnchorMap[j.id]
          if (pin) {
            pin.ring.lookAt(camera.position)

            const wave = (elapsedTime * 1.5 + idx * 0.35) % 1
            pin.ring.scale.setScalar(1 + wave * 1.5)
            ;(pin.ring.material as THREE.MeshBasicMaterial).opacity = (1 - wave) * 0.8

            const isSelected = j.id === activeJointId
            const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * (isSelected ? 0.25 : 0.08)
            pin.orb.scale.setScalar(pulse)

            if (isSelected) {
              pin.glow.scale.setScalar(1.6 + Math.sin(elapsedTime * 4) * 0.2)
              ;(pin.glow.material as THREE.MeshBasicMaterial).opacity = 0.45
              ;(pin.orb.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.3
              pin.sprite.scale.set(0.26, 0.082, 1)
            } else {
              pin.glow.scale.setScalar(1.0)
              ;(pin.glow.material as THREE.MeshBasicMaterial).opacity = 0.2
              ;(pin.orb.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6
              pin.sprite.scale.set(0.22, 0.07, 1)
            }
          }
        })

        renderer.render(scene, camera)
      }
      animate()

      // Cleanup
      return () => {
        disposed = true
        cancelAnimationFrame(animId)
        canvasEl.removeEventListener('click', onClick)
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
      cleanupPromise.then((fn) => fn?.())
    }
  }, [activeJointId, onSelectJoint])

  // React to external active joint change
  useEffect(() => {
    if (stateRef.current.selectJoint) {
      stateRef.current.selectJoint(activeJointId)
    }
  }, [activeJointId])

  // React to viewMode, activeJointId, showImplant, or scannerY changes
  useEffect(() => {
    if (stateRef.current.setTargetScannerY) {
      stateRef.current.setTargetScannerY(scannerY)
    }
    if (stateRef.current.applyVisualMode) {
      stateRef.current.applyVisualMode(viewMode, activeJointId, showImplant, scannerY)
    }
  }, [viewMode, activeJointId, showImplant, scannerY])

  const handleResetCamera = useCallback(() => {
    onSelectJoint(null)
    if (stateRef.current.resetView) {
      stateRef.current.resetView()
    }
  }, [onSelectJoint])

  const activeJointInfo = activeJointId ? JOINTS_3D_DATA.find((j) => j.id === activeJointId) : null

  // Calculate vertical percentage for the floating scanner frame
  // scannerY ranges from -0.80 (feet) to +0.75 (head) -> screenTopPercent from 84% to 14%
  const clampedY = Math.max(-0.80, Math.min(0.75, scannerY))
  const t = (clampedY - -0.80) / 1.55
  const screenTopPercent = 84 - t * 70

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[600px] md:h-[660px] rounded-3xl overflow-hidden transition-colors duration-500 shadow-xl select-none ${
        viewMode === 'skeleton' ? 'bg-[#050a14] border-slate-800' : 'bg-white border-slate-200/90'
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-3 border-brand-200 border-t-brand-600 animate-spin" />
            <span className="absolute text-xs font-bold text-brand-600 font-sans">3D</span>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-slate-800">Loading 3D Anatomy Model...</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {loadProgress > 0 ? `${loadProgress}% loaded` : 'Preparing realistic human avatar'}
            </div>
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas (Pure White Background) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating Medical X-Ray Scanner Frame (Josetxu Style with Neon Cyan Glow) */}
      {(viewMode === 'scanner' || activeJointId) && (
        <div
          className="absolute inset-x-6 sm:inset-x-12 md:inset-x-20 pointer-events-none transition-all duration-150 ease-out z-10"
          style={{
            top: `${screenTopPercent}%`,
            transform: 'translateY(-50%)',
            height: activeJointId ? '32%' : '26%',
          }}
        >
          <div className="w-full h-full rounded-2xl border-2 sm:border-[3px] border-[#00ffea] shadow-[0_0_24px_rgba(0,255,234,0.45),_inset_0_0_16px_rgba(0,255,234,0.2)] bg-gradient-to-b from-[#00ffea]/10 via-transparent to-[#00ffea]/10 relative overflow-hidden backdrop-brightness-105">
            {/* Center animated laser scanning beam */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ffea] to-transparent shadow-[0_0_12px_#00ffea] animate-pulse top-1/2 -translate-y-1/2" />

            {/* Corner Bracket Reticles */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#00ffea]" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#00ffea]" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#00ffea]" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#00ffea]" />

            {/* Technical HUD Readout */}
            <div className="absolute top-2 left-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffea] animate-ping" />
              <span className="text-[10px] font-mono font-bold text-[#00ffea] tracking-wider uppercase">
                {activeJointId ? `${activeJointId.toUpperCase()} PROJECTION` : 'X-RAY SCANNER BEAM'}
              </span>
            </div>
            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-[#00ffea]/90 hidden sm:block">
              78 kVp • 12 mAs • DIGITAL RADIOGRAPHY
            </div>
          </div>
        </div>
      )}

      {/* 3-Mode Switcher: Clothed (No Scanner) | X-Ray Scanner | Full Skeleton (Big Scanner) */}
      <div className="absolute top-4 left-4 z-20 flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-xl">
        <button
          type="button"
          onClick={() => setViewMode('normal')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'normal'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="No Scanner: Normal Clothed Gentleman"
        >
          <span>👤 Clothed</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('scanner')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'scanner'
              ? 'bg-[#00ffea] text-slate-950 shadow-sm shadow-[#00ffea]/30'
              : 'text-slate-300 hover:text-[#00ffea] hover:bg-slate-800'
          }`}
          title="Dynamic Scanner: Interactive Sliding Beam"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ffea] animate-pulse" />
          <span>⚡ X-Ray Scanner</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('skeleton')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'skeleton'
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Big Scanner: Full Body Skeleton X-Ray"
        >
          <span>🦴 Full Skeleton</span>
        </button>
      </div>

      {/* Active Joint Digital X-Ray HUD (Top Center) */}
      {activeJointId && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-400/40 shadow-lg text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-bold tracking-wider text-sky-300">HIGH-DEF X-RAY</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-100 uppercase font-sans font-bold">
            {activeJointInfo?.label || activeJointId}
          </span>
        </div>
      )}

      {/* Clean Full Body / Reset Button (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={handleResetCamera}
          className={`px-3.5 py-1.5 rounded-full border shadow-sm text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            activeJointId === null
              ? 'bg-brand-600 text-white border-brand-600 shadow-brand-500/20'
              : 'bg-white/95 hover:bg-slate-50 text-slate-700 hover:text-brand-700 border-slate-200'
          }`}
        >
          <span>↺ Full Body</span>
        </button>
      </div>

      {/* 20-Zone Vertical Anatomical Scan Rail (Josetxu .x-ray Hover/Drag Zones) */}
      {viewMode === 'scanner' && !activeJointId && (
        <div className="absolute right-3.5 top-20 bottom-20 z-20 flex flex-col items-center justify-between pointer-events-auto select-none">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase -rotate-90 origin-center mb-4">
            HEAD
          </span>
          <div className="flex-1 w-6 relative flex flex-col justify-between py-2 bg-slate-900/60 backdrop-blur-md rounded-full border border-slate-700/80 p-1 shadow-lg">
            {Array.from({ length: 20 }).map((_, idx) => {
              const targetY = 0.75 - (idx / 19) * 1.50
              const isClose = Math.abs(scannerY - targetY) < 0.08
              return (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    setScannerY(targetY)
                    stateRef.current.setTargetScannerY?.(targetY)
                  }}
                  onClick={() => {
                    setScannerY(targetY)
                    stateRef.current.setTargetScannerY?.(targetY)
                  }}
                  className={`w-full h-1.5 rounded-full cursor-pointer transition-all ${
                    isClose
                      ? 'bg-[#00ffea] shadow-[0_0_8px_#00ffea] scale-x-125'
                      : 'bg-slate-400/40 hover:bg-[#00ffea]/80'
                  }`}
                  title={`Scan Height Level ${20 - idx}`}
                />
              )
            })}
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase -rotate-90 origin-center mt-4">
            FEET
          </span>
        </div>
      )}

      {/* Interactive Drag Scanner Bar & Level Readout (Bottom Center) */}
      {viewMode === 'scanner' && !activeJointId && (
        <div className="absolute bottom-3 inset-x-0 z-20 flex flex-col items-center justify-center gap-1.5 pointer-events-auto">
          <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 shadow-xl">
            <span className="text-[11px] font-mono font-bold text-[#00ffea]">↕ SCAN:</span>
            <input
              type="range"
              min="-0.75"
              max="0.75"
              step="0.01"
              value={scannerY}
              onChange={(e) => {
                const val = parseFloat(e.target.value)
                setScannerY(val)
                stateRef.current.setTargetScannerY?.(val)
              }}
              className="w-36 sm:w-56 accent-[#00ffea] cursor-pointer"
            />
            <span className="text-[10px] font-mono text-slate-300">
              {scannerY > 0.4 ? 'Head/Neck' : scannerY > 0.15 ? 'Chest/Ribs' : scannerY > -0.15 ? 'Pelvis/Hips' : scannerY > -0.5 ? 'Knee' : 'Ankles'}
            </span>
          </div>
        </div>
      )}

      {/* Joint Anatomy vs Surgical Implant Toggle (Bottom Center when Joint is Active) */}
      {activeJointId && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-slate-200/90 shadow-xl">
          <button
            type="button"
            onClick={() => setShowImplant(false)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              !showImplant
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>🦴 Natural Bone Anatomy</span>
          </button>
          <button
            type="button"
            onClick={() => setShowImplant(true)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              showImplant
                ? 'bg-brand-600 text-white shadow-xs shadow-brand-500/20'
                : 'text-slate-600 hover:text-brand-700 hover:bg-slate-100'
            }`}
          >
            <span>🦾 Surgical Reconstruction</span>
          </button>
        </div>
      )}

      {/* Subtle Drag Hint (Bottom Center when in Full Body Overview) */}
      {!activeJointId && viewMode !== 'scanner' && (
        <div className="absolute bottom-3 inset-x-0 pointer-events-none text-center hidden sm:block z-10">
          <span className="text-[11px] font-medium text-slate-500 bg-white/90 px-3.5 py-1 rounded-full border border-slate-200/80 shadow-xs">
            Drag to rotate 360° • Click any joint to inspect X-Ray &amp; Implants
          </span>
        </div>
      )}
    </div>
  )
}
