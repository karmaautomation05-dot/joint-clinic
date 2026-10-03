'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import type * as THREE from 'three'

export interface Joint3DInfo {
  id: string
  label: string
  boneName: string
  fallbackPos: [number, number, number]
  camOffset: [number, number, number]
  color: string
}

export const JOINTS_3D_DATA: Joint3DInfo[] = [
  {
    id: 'knee',
    label: 'Knee',
    boneName: 'RightLeg',
    fallbackPos: [-0.12, -0.34, 0.04],
    camOffset: [0, 0.05, 0.95],
    color: '#02BAB9',
  },
  {
    id: 'hip',
    label: 'Hip',
    boneName: 'RightUpLeg',
    fallbackPos: [-0.12, 0.08, 0.02],
    camOffset: [0, 0.05, 1.05],
    color: '#F18712',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    boneName: 'LeftArm',
    fallbackPos: [0.24, 0.44, 0.0],
    camOffset: [0, 0.05, 1.0],
    color: '#059B8F',
  },
  {
    id: 'spine',
    label: 'Spine',
    boneName: 'Spine1',
    fallbackPos: [0.0, 0.28, -0.06],
    camOffset: [0.15, 0.05, -1.05],
    color: '#01B3BF',
  },
  {
    id: 'elbow',
    label: 'Elbow',
    boneName: 'LeftForeArm',
    fallbackPos: [0.42, 0.24, 0.0],
    camOffset: [0, 0.05, 0.95],
    color: '#0A7C97',
  },
  {
    id: 'ankle',
    label: 'Ankle',
    boneName: 'RightFoot',
    fallbackPos: [-0.12, -0.78, 0.02],
    camOffset: [0, 0.08, 0.9],
    color: '#059B8F',
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

  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [screenPins, setScreenPins] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([])

  // Store transition targets
  const transitionRef = useRef({
    currentCamPos: [0, 0.0, 2.5] as [number, number, number],
    targetCamPos: [0, 0.0, 2.5] as [number, number, number],
    currentLookAt: [0, 0.0, 0] as [number, number, number],
    targetLookAt: [0, 0.0, 0] as [number, number, number],
    isTransitioning: false,
  })

  const stateRef = useRef<{
    selectJoint?: (id: string) => void
    resetView?: () => void
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

      // ── Renderer (Pure White Clean Background) ───────────────────────────
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

      // ── Scene & Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
      camera.position.set(0, 0.0, 2.5)

      const cameraTarget = new THREE.Vector3(0, 0.0, 0)
      camera.lookAt(cameraTarget)

      // ── Studio High-Key Lighting ─────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
      scene.add(ambientLight)

      // Soft Key Light from front-right
      const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.0)
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

      // Backlight for realistic silhouette separation
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
      const shadowPlaneGeo = new THREE.PlaneGeometry(2.2, 2.2)
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

      const pinsGroup = new THREE.Group()
      characterGroup.add(pinsGroup)

      const jointWorldPositions: Record<string, THREE.Vector3> = {}
      const pinMeshes: Record<string, { orb: any; ring: any; glow: any }> = {}

      // Initialize default fallback positions
      JOINTS_3D_DATA.forEach((j) => {
        jointWorldPositions[j.id] = new THREE.Vector3(...j.fallbackPos)
      })

      // Setup 3D Hotspot Pins
      function setupPins() {
        JOINTS_3D_DATA.forEach((j) => {
          const jColor = new THREE.Color(j.color)
          const pos = jointWorldPositions[j.id] || new THREE.Vector3(...j.fallbackPos)

          // Center jewel sphere
          const orbGeo = new THREE.SphereGeometry(0.032, 16, 16)
          const orbMat = new THREE.MeshStandardMaterial({
            color: jColor,
            emissive: jColor,
            emissiveIntensity: 0.7,
            roughness: 0.2,
            metalness: 0.2,
          })
          const orb = new THREE.Mesh(orbGeo, orbMat)
          orb.position.copy(pos)
          pinsGroup.add(orb)

          // Pulsing radar ring
          const ringGeo = new THREE.RingGeometry(0.045, 0.058, 32)
          const ringMat = new THREE.MeshBasicMaterial({
            color: jColor,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
          })
          const ring = new THREE.Mesh(ringGeo, ringMat)
          ring.position.copy(pos)
          pinsGroup.add(ring)

          // Glow halo
          const glowGeo = new THREE.SphereGeometry(0.065, 14, 14)
          const glowMat = new THREE.MeshBasicMaterial({
            color: jColor,
            transparent: true,
            opacity: 0.25,
          })
          const glow = new THREE.Mesh(glowGeo, glowMat)
          glow.position.copy(pos)
          pinsGroup.add(glow)

          pinMeshes[j.id] = { orb, ring, glow }
        })
      }

      setupPins()

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

          // Enable shadows and configure high quality rendering
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              if (child.material) {
                child.material.roughness = Math.max(0.35, child.material.roughness || 0.4)
                child.material.metalness = Math.min(0.25, child.material.metalness || 0.1)
                child.material.needsUpdate = true
              }
            }
          })

          characterGroup.add(model)
          model.updateMatrixWorld(true)

          // Extract exact anatomical bone positions
          const boneMap: Record<string, any> = {}
          model.traverse((child: any) => {
            if (child.isBone) {
              boneMap[child.name] = child
            }
          })

          // Update joint pin positions from real model bones
          JOINTS_3D_DATA.forEach((j) => {
            const bone = boneMap[j.boneName]
            if (bone) {
              const worldPos = new THREE.Vector3()
              bone.getWorldPosition(worldPos)
              // Convert to local position in characterGroup
              characterGroup.worldToLocal(worldPos)

              // Subtle natural surface offsets so pins sit on skin/clothing surface
              if (j.id === 'knee') worldPos.z += 0.08
              if (j.id === 'hip') worldPos.z += 0.08
              if (j.id === 'shoulder') worldPos.z += 0.06
              if (j.id === 'elbow') worldPos.z += 0.05
              if (j.id === 'ankle') worldPos.z += 0.06
              if (j.id === 'spine') worldPos.z -= 0.08

              jointWorldPositions[j.id].copy(worldPos)

              const pin = pinMeshes[j.id]
              if (pin) {
                pin.orb.position.copy(worldPos)
                pin.ring.position.copy(worldPos)
                pin.glow.position.copy(worldPos)
              }
            }
          })

          setIsLoading(false)

          // Fly to active joint on initial load
          flyToJoint(activeJointId)
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
      function flyToJoint(jointId: string) {
        const joint = JOINTS_3D_DATA.find((j) => j.id === jointId)
        if (!joint) return

        const jointPos = jointWorldPositions[jointId] || new THREE.Vector3(...joint.fallbackPos)

        // Target camera position offset from the joint
        transitionRef.current.targetCamPos = [
          jointPos.x + joint.camOffset[0],
          jointPos.y + joint.camOffset[1],
          jointPos.z + joint.camOffset[2],
        ]
        transitionRef.current.targetLookAt = [jointPos.x, jointPos.y, jointPos.z]
        transitionRef.current.isTransitioning = true
      }

      function resetView() {
        transitionRef.current.targetCamPos = [0, 0.0, 2.5]
        transitionRef.current.targetLookAt = [0, 0.0, 0]
        transitionRef.current.isTransitioning = true
      }

      stateRef.current.selectJoint = flyToJoint
      stateRef.current.resetView = resetView

      // ── 360° MOUSE & TOUCH ORBIT CONTROLS ─────────────────────────────────
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
      }

      function onWheel(e: WheelEvent) {
        e.preventDefault()
        const zoomDelta = e.deltaY * 0.0015
        const currentDist = camera.position.distanceTo(cameraTarget)
        const newDist = Math.max(0.8, Math.min(3.8, currentDist + zoomDelta))
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
      canvasEl.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      canvasEl.addEventListener('wheel', onWheel, { passive: false })
      canvasEl.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchend', onTouchEnd)

      // ── SCREEN PROJECTION FOR 2D JOINT HOTSPOT TAGS ───────────────────────
      const tempVec = new THREE.Vector3()

      function updateScreenPins() {
        const pins = JOINTS_3D_DATA.map((j) => {
          const pos = jointWorldPositions[j.id] || new THREE.Vector3(...j.fallbackPos)
          tempVec.copy(pos)
          tempVec.applyMatrix4(characterGroup.matrixWorld)
          tempVec.project(camera)

          const isVisible = tempVec.z < 1.0 && Math.abs(tempVec.x) < 1.1 && Math.abs(tempVec.y) < 1.1
          const x = (tempVec.x * 0.5 + 0.5) * width
          const y = (-(tempVec.y * 0.5) + 0.5) * height

          return { id: j.id, x, y, visible: isVisible }
        })
        setScreenPins(pins)
      }

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

      // ── ANIMATION LOOP ────────────────────────────────────────────────────
      let clock = new THREE.Clock()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        // Gentle idle character sway
        if (!isDragging) {
          targetRotY += 0.0016
        }

        // Smooth rotation interpolation
        characterGroup.rotation.y += (targetRotY - characterGroup.rotation.y) * 0.08
        characterGroup.rotation.x += (targetRotX - characterGroup.rotation.x) * 0.08

        // Smooth 3D Camera Glide
        const trans = transitionRef.current
        if (trans.isTransitioning) {
          camera.position.x += (trans.targetCamPos[0] - camera.position.x) * 0.065
          camera.position.y += (trans.targetCamPos[1] - camera.position.y) * 0.065
          camera.position.z += (trans.targetCamPos[2] - camera.position.z) * 0.065

          cameraTarget.x += (trans.targetLookAt[0] - cameraTarget.x) * 0.065
          cameraTarget.y += (trans.targetLookAt[1] - cameraTarget.y) * 0.065
          cameraTarget.z += (trans.targetLookAt[2] - cameraTarget.z) * 0.065

          camera.lookAt(cameraTarget)

          const posDist = Math.hypot(
            trans.targetCamPos[0] - camera.position.x,
            trans.targetCamPos[1] - camera.position.y,
            trans.targetCamPos[2] - camera.position.z
          )
          if (posDist < 0.012) {
            trans.isTransitioning = false
          }
        }

        // Animate Hotspot Pins
        JOINTS_3D_DATA.forEach((j, idx) => {
          const pin = pinMeshes[j.id]
          if (pin) {
            pin.ring.lookAt(camera.position)

            const wave = (elapsedTime * 1.5 + idx * 0.35) % 1
            pin.ring.scale.setScalar(1 + wave * 1.5)
            pin.ring.material.opacity = (1 - wave) * 0.75

            const isSelected = j.id === activeJointId
            const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * (isSelected ? 0.2 : 0.1)
            pin.orb.scale.setScalar(pulse)

            if (isSelected) {
              pin.glow.scale.setScalar(1.5 + Math.sin(elapsedTime * 4) * 0.2)
              pin.glow.material.opacity = 0.4
              pin.orb.material.emissiveIntensity = 1.1
            } else {
              pin.glow.scale.setScalar(1.0)
              pin.glow.material.opacity = 0.2
              pin.orb.material.emissiveIntensity = 0.4
            }
          }
        })

        // Update 2D Screen Hotspot Tags
        updateScreenPins()

        renderer.render(scene, camera)
      }
      animate()

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
      cleanupPromise.then((fn) => fn?.())
    }
  }, [activeJointId])

  // React to external active joint change
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[600px] md:h-[660px] rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl select-none"
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

      {/* Clean Reset Button (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={handleResetCamera}
          className="bg-white/95 hover:bg-slate-50 text-slate-700 hover:text-brand-700 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>↺ Reset View</span>
        </button>
      </div>

      {/* Subtle Drag Hint (Bottom Center) */}
      <div className="absolute bottom-3 inset-x-0 pointer-events-none text-center hidden sm:block z-10">
        <span className="text-[11px] font-medium text-slate-500 bg-white/90 px-3.5 py-1 rounded-full border border-slate-200/80 shadow-xs">
          Drag to rotate 360° • Click any joint to inspect
        </span>
      </div>

      {/* ── 2D SCREEN-PROJECTED HOTSPOT BADGES (Clean White/Teal Style) ── */}
      {screenPins.map((pin) => {
        if (!pin.visible) return null
        const isSelected = pin.id === activeJointId
        const jointData = JOINTS_3D_DATA.find((j) => j.id === pin.id)
        if (!jointData) return null

        return (
          <button
            key={pin.id}
            onClick={() => onSelectJoint(pin.id)}
            className={`absolute z-20 flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
              isSelected
                ? 'scale-110 shadow-md ring-2 ring-brand-500'
                : 'hover:scale-105 opacity-90 hover:opacity-100 shadow-xs'
            }`}
            style={{
              left: `${pin.x}px`,
              top: `${pin.y}px`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
              border: `1.5px solid ${isSelected ? jointData.color : '#e2e8f0'}`,
              boxShadow: isSelected ? `0 4px 14px ${jointData.color}40` : '0 2px 6px rgba(0,0,0,0.06)',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                backgroundColor: jointData.color,
                boxShadow: isSelected ? `0 0 8px ${jointData.color}` : 'none',
              }}
            />
            <span
              className="text-xs font-bold whitespace-nowrap"
              style={{ color: isSelected ? '#0f172a' : '#334155' }}
            >
              {jointData.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
