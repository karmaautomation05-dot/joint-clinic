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

export type ScanMode = 'normal' | 'skeleton'

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

  // View Mode: 'normal' (Full Body Clothed) | 'skeleton' (Full High-Definition Medical Skeleton)
  const [internalViewMode, setInternalViewMode] = useState<ScanMode>('normal')
  const viewMode = propViewMode ?? internalViewMode
  const setViewMode = useCallback(
    (mode: ScanMode) => {
      setInternalViewMode(mode)
      onToggleViewMode?.(mode)
    },
    [onToggleViewMode]
  )

  const [showImplant, setShowImplant] = useState(false)

  useEffect(() => {
    setShowImplant(false)
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
    applyVisualMode?: (mode: ScanMode, activeJoint: string | null, implant: boolean) => void
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

          // Enable shadows and configure distinguished Indian middle-aged orthopedic surgeon aesthetic
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true

              // Morph targets for Indian facial structure: expressive eyes, distinguished jawline
              if (child.morphTargetDictionary && child.morphTargetInfluences) {
                const dict = child.morphTargetDictionary
                const infl = child.morphTargetInfluences
                if (dict['eyeWideLeft'] !== undefined) infl[dict['eyeWideLeft']] = 0.22
                if (dict['eyeWideRight'] !== undefined) infl[dict['eyeWideRight']] = 0.22
                if (dict['eyeSquintLeft'] !== undefined) infl[dict['eyeSquintLeft']] = 0.0
                if (dict['eyeSquintRight'] !== undefined) infl[dict['eyeSquintRight']] = 0.0
                if (dict['browInnerUp'] !== undefined) infl[dict['browInnerUp']] = 0.08
                if (dict['jawForward'] !== undefined) infl[dict['jawForward']] = 0.12
                if (dict['mouthSmile'] !== undefined) infl[dict['mouthSmile']] = 0.09
              }

              if (child.material) {
                if (child.name === 'Wolf3D_Hair') {
                  // Natural Indian deep black with subtle mature charcoal luster
                  child.material.color.setHex(0x18181b)
                  child.material.roughness = 0.72
                  child.material.metalness = 0.04
                } else if (
                  child.name === 'Wolf3D_Head' ||
                  child.name === 'Wolf3D_Body' ||
                  child.material.name === 'Wolf3D_Skin' ||
                  child.material.name === 'Wolf3D_Body'
                ) {
                  // Authentic warm Indian wheatish-caramel skin tone with healthy warm bronze undertones
                  child.material.color.setHex(0xb87548)
                  child.material.roughness = 0.52
                  child.material.metalness = 0.0
                } else if (
                  child.name === 'EyeLeft' ||
                  child.name === 'EyeRight' ||
                  child.material.name === 'Wolf3D_Eye'
                ) {
                  // Deep warm espresso Indian eyes
                  child.material.color.setHex(0x2d1b10)
                  child.material.roughness = 0.10
                  child.material.metalness = 0.0
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

          // Build ultra-high-resolution anatomical skeleton and surgical implants matching Artec HD reference
          const skeletonResult = buildFullBodySkeleton(THREE as any, boneMap, characterGroup)
          characterGroup.add(skeletonResult.skeletonGroup)

          function applyVisualMode(
            mode: ScanMode,
            jointId: string | null,
            implant: boolean
          ) {
            if (mode === 'normal' && !jointId) {
              // 1. FULL BODY CLOTHED (Indian orthopedic surgeon gentleman, pure white clinical studio background)
              scene.background = new THREE.Color(0xffffff)
              shadowMesh.visible = true
              model.visible = true
              skeletonResult.skeletonGroup.visible = false
            } else {
              // 2. FULL SKELETON (Deep black radiograph background, glowing Artec HD skeleton)
              scene.background = new THREE.Color(0x050a14)
              shadowMesh.visible = false
              model.visible = false
              skeletonResult.skeletonGroup.visible = true

              // Surgical Implants visibility
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
          applyVisualMode(viewMode, activeJointId, showImplant)

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
  // React to viewMode, activeJointId, showImplant changes
  useEffect(() => {
    if (stateRef.current.applyVisualMode) {
      stateRef.current.applyVisualMode(viewMode, activeJointId, showImplant)
    }
  }, [viewMode, activeJointId, showImplant])

  const handleResetCamera = useCallback(() => {
    onSelectJoint(null)
    if (stateRef.current.resetView) {
      stateRef.current.resetView()
    }
  }, [onSelectJoint])

  const activeJointInfo = activeJointId ? JOINTS_3D_DATA.find((j) => j.id === activeJointId) : null

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

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* 2-Mode Switcher: Full Body (Clothed) | Full Skeleton (Artec HD Reference) */}
      <div className="absolute top-4 left-4 z-20 flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-xl">
        <button
          type="button"
          onClick={() => setViewMode('normal')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'normal'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Full Body Clothed View"
        >
          <span>👤 Full Body</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('skeleton')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            viewMode === 'skeleton'
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Full High-Definition Medical Skeleton"
        >
          <span>🦴 Full Skeleton</span>
        </button>
      </div>

      {/* Active Joint Digital X-Ray HUD (Top Center) */}
      {activeJointId && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-400/40 shadow-lg text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-bold tracking-wider text-sky-300">HIGH-DEF ANATOMY</span>
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
          <span>↺ Reset View</span>
        </button>
      </div>

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
      {!activeJointId && (
        <div className="absolute bottom-3 inset-x-0 pointer-events-none text-center hidden sm:block z-10">
          <span className="text-[11px] font-medium text-slate-500 bg-white/90 px-3.5 py-1 rounded-full border border-slate-200/80 shadow-xs">
            Drag to rotate 360° • Click any joint to inspect detailed anatomy &amp; implants
          </span>
        </div>
      )}
    </div>
  )
}
