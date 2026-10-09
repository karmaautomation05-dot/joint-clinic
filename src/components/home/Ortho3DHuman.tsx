'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import type * as THREE from 'three'

export interface Joint3DInfo {
  id: string
  label: string
  pos: [number, number, number]
  camOffset: [number, number, number]
  color: string
}

// Perfectly staggered anatomical landmarks distributed across left, right, and center
// so NO two pins or markers ever overlap!
export const JOINTS_3D_DATA: Joint3DInfo[] = [
  {
    id: 'cervical',
    label: 'Cervical Spine',
    pos: [0.0, 0.74, 0.06],
    camOffset: [0, 0.02, 0.60],
    color: '#0A7C97',
  },
  {
    id: 'shoulder',
    label: 'Shoulder Joint',
    pos: [-0.19, 0.67, 0.06],
    camOffset: [0, 0.02, 0.65],
    color: '#02BAB9',
  },
  {
    id: 'elbow',
    label: 'Elbow Joint',
    pos: [0.24, 0.33, 0.04],
    camOffset: [0, 0.02, 0.65],
    color: '#0A7C97',
  },
  {
    id: 'spine',
    label: 'Lumbar Spine',
    pos: [0.0, 0.27, 0.03],
    camOffset: [0, 0.02, 0.70],
    color: '#01B3BF',
  },
  {
    id: 'wrist',
    label: 'Wrist & Hand',
    pos: [-0.31, 0.07, 0.08],
    camOffset: [0, 0.02, 0.55],
    color: '#059B8F',
  },
  {
    id: 'hip',
    label: 'Hip Joint',
    pos: [0.10, 0.06, 0.04],
    camOffset: [0, 0.02, 0.70],
    color: '#F18712',
  },
  {
    id: 'knee',
    label: 'Knee Joint',
    pos: [-0.07, -0.39, 0.04],
    camOffset: [0, 0.02, 0.65],
    color: '#02BAB9',
  },
  {
    id: 'ankle',
    label: 'Ankle & Foot',
    pos: [0.04, -0.88, 0.03],
    camOffset: [0, 0.03, 0.60],
    color: '#059B8F',
  },
]

export type SkeletonTheme = 'studio' | 'radiograph'

interface Ortho3DHumanProps {
  activeJointId: string | null
  onSelectJoint: (id: string | null) => void
  activeColor: string
  theme?: SkeletonTheme
  onToggleTheme?: (theme: SkeletonTheme) => void
}

export default function Ortho3DHuman({
  activeJointId,
  onSelectJoint,
  activeColor,
  theme: propTheme,
  onToggleTheme,
}: Ortho3DHumanProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [hoveredJoint, setHoveredJoint] = useState<string | null>(null)

  // Visual Theme: 'studio' (Pure White) | 'radiograph' (Deep Black)
  const [internalTheme, setInternalTheme] = useState<SkeletonTheme>('studio')
  const theme = propTheme ?? internalTheme
  const setTheme = useCallback(
    (newTheme: SkeletonTheme) => {
      setInternalTheme(newTheme)
      onToggleTheme?.(newTheme)
    },
    [onToggleTheme]
  )

  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const autoRotateRef = useRef<boolean>(true)

  // Camera initial full-skeleton view: fits 2.0 unit skeleton head-to-toe
  const FULL_SKELETON_CAM: [number, number, number] = [0, 0.05, 3.20]
  const FULL_SKELETON_TARGET: [number, number, number] = [0, 0.0, 0]

  const stateRef = useRef<{
    selectJoint?: (id: string | null) => void
    resetView?: () => void
    setTheme?: (t: SkeletonTheme) => void
    setAutoRotate?: (enabled: boolean) => void
  }>({})

  useEffect(() => {
    let animId: number
    let disposed = false
    let currentHoveredId: string | null = null

    async function init3D() {
      if (!canvasRef.current || !containerRef.current || disposed) return

      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')

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
      renderer.setClearColor(theme === 'radiograph' ? 0x050a14 : 0x181e28, 1)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = theme === 'radiograph' ? 1.35 : 1.25

      // ── Scene & Camera Setup ──────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(theme === 'radiograph' ? 0x050a14 : 0x181e28)

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
      camera.position.set(...FULL_SKELETON_CAM)
      const cameraTarget = new THREE.Vector3(...FULL_SKELETON_TARGET)
      camera.lookAt(cameraTarget)

      // ── OrbitControls with Physics Damping ─────────────────────────────────
      const controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      controls.dampingFactor = 0.06
      controls.enablePan = false
      controls.minDistance = 0.35
      controls.maxDistance = 6.0
      controls.minPolarAngle = Math.PI * 0.10
      controls.maxPolarAngle = Math.PI * 0.90
      controls.target.copy(cameraTarget)
      controls.autoRotate = autoRotateRef.current
      controls.autoRotateSpeed = 1.4

      let isInteracting = false
      controls.addEventListener('start', () => {
        isInteracting = true
        camTransition.active = false
      })
      controls.addEventListener('end', () => {
        isInteracting = false
        if (autoRotateRef.current && currentActiveJointId === null) {
          controls.autoRotate = true
        }
      })

      // ── Gradient Studio Reflection Environment (PMREM) ─────────────────────
      const pmrem = new THREE.PMREMGenerator(renderer)
      pmrem.compileEquirectangularShader()
      const envCanvas = document.createElement('canvas')
      envCanvas.width = 512
      envCanvas.height = 256
      const envCtx = envCanvas.getContext('2d')
      if (envCtx) {
        const grad = envCtx.createLinearGradient(0, 0, 0, 256)
        if (theme === 'radiograph') {
          grad.addColorStop(0, '#020617')
          grad.addColorStop(0.4, '#0c4a6e')
          grad.addColorStop(0.7, '#075985')
          grad.addColorStop(1, '#020617')
        } else {
          grad.addColorStop(0, '#1e293b')
          grad.addColorStop(0.35, '#334155')
          grad.addColorStop(0.65, '#1e293b')
          grad.addColorStop(1, '#0f172a')
        }
        envCtx.fillStyle = grad
        envCtx.fillRect(0, 0, 512, 256)

        // Studio key softbox reflection highlight
        envCtx.fillStyle = theme === 'radiograph' ? '#38bdf8' : '#ffffff'
        envCtx.beginPath()
        envCtx.ellipse(256, 60, 180, 45, 0, 0, Math.PI * 2)
        envCtx.fill()
      }
      const envTex = new THREE.CanvasTexture(envCanvas)
      envTex.mapping = THREE.EquirectangularReflectionMapping
      const envRT = pmrem.fromEquirectangular(envTex)
      scene.environment = envRT.texture

      // ── Studio & Radiograph Lighting ───────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(
        theme === 'radiograph' ? 0x0c4a6e : 0xfffaf0,
        theme === 'radiograph' ? 1.8 : 1.15
      )
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(
        theme === 'radiograph' ? 0x38bdf8 : 0xfff6ea,
        theme === 'radiograph' ? 2.5 : 2.20
      )
      keyLight.position.set(3, 4, 3.5)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.0005
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(
        theme === 'radiograph' ? 0x0284c7 : 0x93c5fd,
        theme === 'radiograph' ? 1.3 : 0.85
      )
      fillLight.position.set(-3.5, 2, 2.5)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(
        theme === 'radiograph' ? 0x7dd3fc : 0xbfdbfe,
        theme === 'radiograph' ? 1.6 : 1.35
      )
      rimLight.position.set(0, -3, -3)
      scene.add(rimLight)

      // Contact Ground Shadow Disc (Studio mode)
      const shadowGeo = new THREE.CircleGeometry(0.75, 48)
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x090d14,
        transparent: true,
        opacity: theme === 'radiograph' ? 0.0 : 0.35,
      })
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
      shadowMesh.rotation.x = -Math.PI / 2
      shadowMesh.position.y = -1.02
      shadowMesh.visible = theme === 'studio'
      scene.add(shadowMesh)

      // Master Skeleton Group
      const skeletonGroup = new THREE.Group()
      skeletonGroup.name = 'HighResolutionSkeleton'
      scene.add(skeletonGroup)

      // ── Physical Materials for Cortical Bone ───────────────────────────────
      const studioBoneMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#d8c7a3'), // Warm realistic cortical bone tone
        roughness: 0.38,
        metalness: 0.02,
        clearcoat: 0.18,
        clearcoatRoughness: 0.35,
        reflectivity: 0.40,
        sheen: 0.20,
        sheenColor: new THREE.Color('#fff2db'),
      })

      const radiographBoneMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#67e8f9'), // Luminescent X-ray cyan
        emissive: new THREE.Color('#0284c7'),
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.08,
        transparent: true,
        opacity: 0.92,
      })

      const currentBoneMat = theme === 'radiograph' ? radiographBoneMat : studioBoneMat

      const jointAnchorMap: Record<
        string,
        {
          group: THREE.Group
          orb: THREE.Mesh
          ring: THREE.Mesh
          glow: THREE.Mesh
          hitSphere: THREE.Mesh
          sprite: THREE.Sprite
          pinPos: THREE.Vector3
        }
      > = {}
      const jointCoordinates: Record<string, THREE.Vector3> = {}

      // High-resolution Canvas Sprite Badge: Only displayed on hover or when active!
      function makePinSprite(text: string, color: string) {
        const pinCanvas = document.createElement('canvas')
        pinCanvas.width = 640
        pinCanvas.height = 160
        const ctx = pinCanvas.getContext('2d')
        if (ctx) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.65)'
          ctx.shadowBlur = 16
          ctx.shadowOffsetY = 6

          // Sleek dark frosted glass pill
          ctx.fillStyle = 'rgba(15, 23, 42, 0.96)'
          ctx.beginPath()
          ctx.roundRect(14, 18, 612, 124, 62)
          ctx.fill()

          ctx.shadowBlur = 0
          ctx.shadowOffsetY = 0
          ctx.strokeStyle = color
          ctx.lineWidth = 5
          ctx.beginPath()
          ctx.roundRect(14, 18, 612, 124, 62)
          ctx.stroke()

          // Vibrant accent indicator dot
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(68, 80, 16, 0, Math.PI * 2)
          ctx.fill()

          // Joint title text - Large, bold, crystal-clear!
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 38px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(text, 104, 80)
        }
        const texture = new THREE.CanvasTexture(pinCanvas)
        texture.minFilter = THREE.LinearFilter
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.scale.set(0, 0, 1)
        sprite.visible = false
        return sprite
      }

      function create3DPin(j: Joint3DInfo, pos: THREE.Vector3) {
        const pinGroup = new THREE.Group()
        pinGroup.position.copy(pos)

        // Pulsing radar ripple ring
        const ringGeo = new THREE.RingGeometry(0.020, 0.034, 32)
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(j.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75,
          depthTest: false,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        pinGroup.add(ring)

        // Luminous core jewel orb
        const orbGeo = new THREE.SphereGeometry(0.016, 16, 16)
        const orbMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(j.color),
          emissive: new THREE.Color(j.color),
          emissiveIntensity: 0.9,
          roughness: 0.1,
          metalness: 0.2,
          depthTest: false,
        })
        const orb = new THREE.Mesh(orbGeo, orbMat)
        orb.userData = { jointId: j.id, isHotspot: true }
        pinGroup.add(orb)

        // Soft outer glow aura
        const glowGeo = new THREE.SphereGeometry(0.026, 16, 16)
        const glowMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(j.color),
          transparent: true,
          opacity: 0.25,
          depthTest: false,
        })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        pinGroup.add(glow)

        // Large invisible hit target for effortless clicking & hovering
        const hitGeo = new THREE.SphereGeometry(0.075, 8, 8)
        const hitMat = new THREE.MeshBasicMaterial({ visible: false })
        const hitSphere = new THREE.Mesh(hitGeo, hitMat)
        hitSphere.userData = { jointId: j.id, isHotspot: true }
        pinGroup.add(hitSphere)

        // Floating label sprite: only revealed on hover or when active!
        const sprite = makePinSprite(j.label, j.color)
        sprite.position.set(0, 0.055, 0)
        pinGroup.add(sprite)

        scene.add(pinGroup)

        jointAnchorMap[j.id] = { group: pinGroup, orb, ring, glow, hitSphere, sprite, pinPos: pos.clone() }
        jointCoordinates[j.id] = pos.clone()
      }

      // ── LOAD REAL HIGH-RESOLUTION CT SKELETON GLB ─────────────────────────
      const loader = new GLTFLoader()

      loader.load(
        '/models/human_skeleton.glb',
        (gltf) => {
          if (disposed) return
          const model = gltf.scene

          // Compute bounding box & normalize to exactly 2.0m height
          const box = new THREE.Box3().setFromObject(model)
          const size = new THREE.Vector3()
          box.getSize(size)
          const center = new THREE.Vector3()
          box.getCenter(center)

          const targetHeight = 2.0
          const scale = targetHeight / (size.y || 1)
          model.scale.setScalar(scale)

          // Center horizontally and vertically
          model.position.x = -center.x * scale
          model.position.y = -center.y * scale
          model.position.z = -center.z * scale

          skeletonGroup.add(model)
          model.updateMatrixWorld(true)

          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              child.material = currentBoneMat
            }
          })

          // Place 3D Pins precisely using the staggered coordinates
          JOINTS_3D_DATA.forEach((j) => {
            const pinPos = new THREE.Vector3(...j.pos)
            create3DPin(j, pinPos)
          })

          setIsLoading(false)

          // If a joint was initially selected, fly in, otherwise enable auto-rotate
          if (activeJointId) {
            flyToJoint(activeJointId)
          } else {
            currentActiveJointId = null
            controls.autoRotate = autoRotateRef.current
          }
        },
        (xhr) => {
          if (xhr.lengthComputable && xhr.total > 0) {
            setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100))
          }
        },
        (err) => {
          console.error('Error loading human_skeleton.glb:', err)
          setIsLoading(false)
        }
      )

      // ── Smooth Camera Transition Helpers ──────────────────────────────────
      let currentActiveJointId: string | null = activeJointId

      const camTransition = {
        active: false,
        startPos: new THREE.Vector3(),
        targetPos: new THREE.Vector3(),
        startTarget: new THREE.Vector3(),
        targetLookAt: new THREE.Vector3(),
        startTime: 0,
        duration: 0.85,
      }

      function startCameraTransition(
        targetPos: [number, number, number],
        targetLook: [number, number, number],
        duration = 0.85
      ) {
        camTransition.startPos.copy(camera.position)
        camTransition.targetPos.set(...targetPos)
        camTransition.startTarget.copy(controls.target)
        camTransition.targetLookAt.set(...targetLook)
        camTransition.startTime = clock.getElapsedTime()
        camTransition.duration = duration
        camTransition.active = true
        controls.autoRotate = false
      }

      function flyToJoint(jointId: string | null) {
        currentActiveJointId = jointId
        if (!jointId) {
          resetView()
          return
        }

        const joint = JOINTS_3D_DATA.find((j) => j.id === jointId)
        if (!joint) return

        const jointPos = jointCoordinates[jointId]
        if (!jointPos) return

        startCameraTransition(
          [
            jointPos.x + joint.camOffset[0],
            jointPos.y + joint.camOffset[1],
            jointPos.z + joint.camOffset[2],
          ],
          [jointPos.x, jointPos.y, jointPos.z],
          0.85
        )
      }

      function resetView() {
        currentActiveJointId = null
        startCameraTransition(
          [...FULL_SKELETON_CAM],
          [...FULL_SKELETON_TARGET],
          0.85
        )
      }

      function applyTheme(newTheme: SkeletonTheme) {
        const isRad = newTheme === 'radiograph'
        const studioBg = 0x181e28
        renderer.setClearColor(isRad ? 0x050a14 : studioBg, 1)
        scene.background = new THREE.Color(isRad ? 0x050a14 : studioBg)
        shadowMesh.visible = !isRad
        ambientLight.color.setHex(isRad ? 0x0c4a6e : 0xfffaf0)
        ambientLight.intensity = isRad ? 1.8 : 1.15
        keyLight.color.setHex(isRad ? 0x38bdf8 : 0xfff6ea)
        keyLight.intensity = isRad ? 2.5 : 2.20
        fillLight.color.setHex(isRad ? 0x0284c7 : 0x93c5fd)
        fillLight.intensity = isRad ? 1.3 : 0.85
        rimLight.color.setHex(isRad ? 0x7dd3fc : 0xbfdbfe)
        rimLight.intensity = isRad ? 1.6 : 1.35

        skeletonGroup.traverse((child: any) => {
          if (child.isMesh) {
            child.material = isRad ? radiographBoneMat : studioBoneMat
          }
        })
      }

      stateRef.current.selectJoint = flyToJoint
      stateRef.current.resetView = resetView
      stateRef.current.setTheme = applyTheme
      stateRef.current.setAutoRotate = (enabled: boolean) => {
        autoRotateRef.current = enabled
        if (!camTransition.active) {
          controls.autoRotate = enabled && currentActiveJointId === null
        }
      }

      // ── Raycaster for Direct Clicking & Hovering on 3D Pins ────────────────
      const raycaster = new THREE.Raycaster()
      const mouseVec = new THREE.Vector2()

      let pointerDownPos = { x: 0, y: 0 }
      let hasDragged = false

      function onPointerDown(e: PointerEvent) {
        pointerDownPos = { x: e.clientX, y: e.clientY }
        hasDragged = false
        camTransition.active = false
      }

      function onPointerMove(e: PointerEvent) {
        if (Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y) > 6) {
          hasDragged = true
        }
      }

      function getPointerPos(e: MouseEvent) {
        const rect = canvas.getBoundingClientRect()
        return {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        }
      }

      function onCanvasClick(e: MouseEvent) {
        if (hasDragged) return // User was dragging/orbiting the camera, NOT clicking a pin!
        const pos = getPointerPos(e)
        mouseVec.set(pos.x, pos.y)
        raycaster.setFromCamera(mouseVec, camera)

        const interactiveMeshes = Object.values(jointAnchorMap).map((item) => item.hitSphere)
        const intersects = raycaster.intersectObjects(interactiveMeshes, false)

        if (intersects.length > 0) {
          const hit = intersects[0]
          const jId = hit.object.userData?.jointId
          if (jId) {
            onSelectJoint(jId)
          }
        }
      }

      function onCanvasMouseMove(e: MouseEvent) {
        const pos = getPointerPos(e)
        mouseVec.set(pos.x, pos.y)
        raycaster.setFromCamera(mouseVec, camera)

        const interactiveMeshes = Object.values(jointAnchorMap).map((item) => item.hitSphere)
        const intersects = raycaster.intersectObjects(interactiveMeshes, false)

        if (intersects.length > 0) {
          canvas.style.cursor = 'pointer'
          const hitId = intersects[0].object.userData?.jointId || null
          if (hitId !== currentHoveredId) {
            currentHoveredId = hitId
            setHoveredJoint(hitId)
          }
        } else {
          if (currentHoveredId !== null) {
            currentHoveredId = null
            setHoveredJoint(null)
          }
          if (!isInteracting) {
            canvas.style.cursor = 'grab'
          }
        }
      }

      canvas.addEventListener('pointerdown', onPointerDown)
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('click', onCanvasClick)
      canvas.addEventListener('mousemove', onCanvasMouseMove)

      // ── Main Animation Render Loop ─────────────────────────────────────────
      const clock = new THREE.Clock()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        // Handle smooth camera fly-to transition
        if (camTransition.active && !isInteracting) {
          const elapsed = elapsedTime - camTransition.startTime
          const rawProgress = Math.min(elapsed / camTransition.duration, 1)
          // Smooth ease-in-out cubic curve
          const t =
            rawProgress < 0.5
              ? 4 * rawProgress * rawProgress * rawProgress
              : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2

          camera.position.lerpVectors(camTransition.startPos, camTransition.targetPos, t)
          cameraTarget.lerpVectors(camTransition.startTarget, camTransition.targetLookAt, t)
          camera.lookAt(cameraTarget)
          controls.target.copy(cameraTarget)

          if (rawProgress >= 1) {
            camTransition.active = false
            if (autoRotateRef.current && currentActiveJointId === null) {
              controls.autoRotate = true
            }
          }
        } else {
          // Standard OrbitControls update (smooth inertia damping & turntable auto-rotate)
          controls.update()
        }

        // Animate Hotspot Pins
        JOINTS_3D_DATA.forEach((j, idx) => {
          const pin = jointAnchorMap[j.id]
          if (pin) {
            pin.ring.lookAt(camera.position)

            const isSelected = j.id === currentActiveJointId
            const isHovered = j.id === currentHoveredId

            // Pulsing radar ring
            const wave = (elapsedTime * 1.5 + idx * 0.25) % 1
            pin.ring.scale.setScalar(1 + wave * 1.4)
            ;(pin.ring.material as THREE.MeshBasicMaterial).opacity = (1 - wave) * (isSelected || isHovered ? 0.9 : 0.6)

            // Core orb pulse & scale
            const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * (isSelected ? 0.25 : isHovered ? 0.20 : 0.08)
            pin.orb.scale.setScalar(pulse * (isHovered ? 1.5 : isSelected ? 1.4 : 1.0))

            // Only show floating text sprite on HOVER or when ACTIVE!
            // This prevents overlapping text clutter across the skeleton!
            if (isSelected || isHovered) {
              pin.glow.scale.setScalar(1.8 + Math.sin(elapsedTime * 4) * 0.2)
              ;(pin.glow.material as THREE.MeshBasicMaterial).opacity = 0.55
              ;(pin.orb.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5

              pin.sprite.visible = true

              // Distance from camera to pin position
              const dist = camera.position.distanceTo(pin.pinPos)
              const isFullView = currentActiveJointId === null

              // When in Full Skeleton view, scale up significantly so it is big, bold, and easily readable!
              const baseHeight = isFullView ? 0.082 : isSelected ? 0.065 : 0.055
              const targetScaleY = dist * baseHeight
              const targetScaleX = targetScaleY * 4.0 // 4:1 aspect ratio matching 640x160 canvas

              pin.sprite.scale.x += (targetScaleX - pin.sprite.scale.x) * 0.25
              pin.sprite.scale.y += (targetScaleY - pin.sprite.scale.y) * 0.25

              // Offset vertically so it floats cleanly above the pin & bone
              const targetPosY = targetScaleY * 0.85 + 0.035
              pin.sprite.position.y += (targetPosY - pin.sprite.position.y) * 0.25
            } else {
              pin.glow.scale.setScalar(1.1)
              ;(pin.glow.material as THREE.MeshBasicMaterial).opacity = 0.2
              ;(pin.orb.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8

              pin.sprite.visible = false
              pin.sprite.scale.set(0, 0, 1)
            }
          }
        })

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
        canvas.removeEventListener('pointerdown', onPointerDown)
        canvas.removeEventListener('pointermove', onPointerMove)
        canvas.removeEventListener('click', onCanvasClick)
        canvas.removeEventListener('mousemove', onCanvasMouseMove)
        ro.disconnect()
        controls.dispose()
        renderer.dispose()
        pmrem.dispose()
        envTex.dispose()
        envRT.dispose()
      }
    }

    const cleanupPromise = init3D()
    return () => {
      disposed = true
      cleanupPromise.then((fn) => fn?.())
    }
  }, []) // Initialize once

  // React to external active joint change
  useEffect(() => {
    if (stateRef.current.selectJoint) {
      stateRef.current.selectJoint(activeJointId)
    }
  }, [activeJointId])

  // React to theme change
  useEffect(() => {
    if (stateRef.current.setTheme) {
      stateRef.current.setTheme(theme)
    }
  }, [theme])

  const toggleAutoRotate = () => {
    const next = !autoRotate
    setAutoRotate(next)
    autoRotateRef.current = next
    if (stateRef.current.setAutoRotate) {
      stateRef.current.setAutoRotate(next)
    }
  }

  const handleResetCamera = useCallback(() => {
    onSelectJoint(null)
    if (stateRef.current.resetView) {
      stateRef.current.resetView()
    }
  }, [onSelectJoint])

  const isDark = theme === 'radiograph'
  const activeJointInfo = activeJointId ? JOINTS_3D_DATA.find((j) => j.id === activeJointId) : null
  const hoveredJointInfo = hoveredJoint ? JOINTS_3D_DATA.find((j) => j.id === hoveredJoint) : null

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[540px] sm:h-[620px] md:h-[680px] rounded-3xl overflow-hidden transition-colors duration-500 shadow-2xl select-none border ${
        isDark ? 'bg-[#050a14] border-slate-800' : 'bg-[#181e28] border-slate-700/80'
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 backdrop-blur-sm transition-colors ${
            isDark ? 'bg-[#050a14]/95 text-white' : 'bg-[#181e28]/95 text-slate-100'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-3 border-teal-500/20 border-t-[#02BAB9] animate-spin" />
            <span className="absolute font-sans text-xs font-bold text-[#02BAB9]">
              {loadProgress > 0 ? `${loadProgress}%` : '3D'}
            </span>
          </div>
          <div className="text-center">
            <p className="font-serif font-bold text-base">
              Loading 3D Medical Human Skeleton...
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              High-Resolution CT Anatomical Scan &bull; 206 Articulated Bones
            </p>
          </div>
        </div>
      )}

      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Top Left: Clean Active / Hover Status Pill */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        {activeJointInfo ? (
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-md backdrop-blur-md transition-all ${
              isDark ? 'bg-slate-900/90 border-cyan-500/40 text-white' : 'bg-slate-900/85 border-slate-700 text-white'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-xs"
              style={{ backgroundColor: activeJointInfo.color }}
            />
            <span className="text-xs font-bold tracking-wide">
              {activeJointInfo.label}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              &bull; Active View
            </span>
          </div>
        ) : hoveredJointInfo ? (
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full border-2 shadow-xl backdrop-blur-md transition-all ${
              isDark ? 'bg-slate-900/95 border-cyan-400/80 text-white shadow-cyan-500/20' : 'bg-slate-900/95 border-teal-400/80 text-white shadow-teal-500/20'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full animate-ping shadow-sm"
              style={{ backgroundColor: hoveredJointInfo.color }}
            />
            <span className="text-sm sm:text-base font-extrabold tracking-wide text-white">
              {hoveredJointInfo.label}
            </span>
            <span className="text-xs text-teal-300 font-bold ml-0.5">
              &bull; Click to Inspect
            </span>
          </div>
        ) : (
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-medium backdrop-blur-md ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-400'
                : 'bg-slate-900/80 border-slate-700 text-slate-300'
            }`}
          >
            <span>🦴 3D Skeleton Overview</span>
          </div>
        )}
      </div>

      {/* Top Right: Floating Camera & Turntable Control Bar */}
      <div className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-md backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-800'
          : 'bg-slate-900/80 border-slate-700'
      }`}>
        {/* Reset Camera Button */}
        <button
          type="button"
          onClick={handleResetCamera}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs border border-slate-700/50"
          title="Reset to Full Skeleton View"
        >
          <span>🔄</span>
          <span className="hidden sm:inline">Full Skeleton</span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          type="button"
          onClick={toggleAutoRotate}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs border ${
            autoRotate
              ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border-slate-700/50'
          }`}
          title="Toggle Turntable 360° Rotation"
        >
          <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
        </button>
      </div>

      {/* Bottom Center: Minimalist Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 pointer-events-none">
        <span
          className={`text-[11px] font-medium px-4 py-1.5 rounded-full border shadow-xs backdrop-blur-md transition-colors whitespace-nowrap ${
            isDark
              ? 'bg-slate-900/90 text-slate-300 border-slate-700'
              : 'bg-slate-900/85 text-slate-200 border-slate-700'
          }`}
        >
          Hover or click any glowing pin &bull; Drag 360° to orbit &bull; Scroll to zoom
        </span>
      </div>
    </div>
  )
}
