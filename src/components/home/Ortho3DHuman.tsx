'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import type * as THREE from 'three'

export interface Joint3DInfo {
  id: string
  label: string
  boneName: string
  surfaceOffset: [number, number, number] // Offset from bone to sit on skin/clothing surface
  camOffset: [number, number, number]    // Camera focus offset
  color: string
}

export const JOINTS_3D_DATA: Joint3DInfo[] = [
  {
    id: 'knee',
    label: 'Knee',
    boneName: 'RightLeg',
    surfaceOffset: [0, 0.02, 0.11], // Front patellar surface of right knee
    camOffset: [0, 0.02, 0.85],
    color: '#02BAB9',
  },
  {
    id: 'hip',
    label: 'Hip',
    boneName: 'RightUpLeg',
    surfaceOffset: [-0.08, 0.02, 0.08], // Lateral/front right hip joint
    camOffset: [0, 0.02, 0.95],
    color: '#F18712',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    boneName: 'LeftArm',
    surfaceOffset: [0.08, 0.02, 0.06], // Left shoulder deltoid surface
    camOffset: [0, 0.02, 0.90],
    color: '#059B8F',
  },
  {
    id: 'spine',
    label: 'Spine',
    boneName: 'Spine1',
    surfaceOffset: [0, 0.0, -0.14], // Posterior surface of spine (back)
    camOffset: [0.10, 0.02, -0.95],
    color: '#01B3BF',
  },
  {
    id: 'elbow',
    label: 'Elbow',
    boneName: 'LeftForeArm',
    surfaceOffset: [0.07, 0.02, 0.02], // Lateral left elbow joint
    camOffset: [0, 0.02, 0.85],
    color: '#0A7C97',
  },
  {
    id: 'ankle',
    label: 'Ankle',
    boneName: 'RightFoot',
    surfaceOffset: [-0.04, 0.04, 0.06], // Lateral right ankle malleolus
    camOffset: [0, 0.05, 0.80],
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

      // ── Scene & Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
      camera.position.set(0, 0.0, 2.5)

      const cameraTarget = new THREE.Vector3(0, 0.0, 0)
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
      // `characterGroup` holds the model and all attached joint pins rigidly
      const characterGroup = new THREE.Group()
      scene.add(characterGroup)

      // Raycasting hit testing list
      const clickableObjects: THREE.Object3D[] = []
      const jointAnchorMap: Record<string, { group: THREE.Group; orb: THREE.Mesh; ring: THREE.Mesh; glow: THREE.Mesh; sprite: THREE.Sprite }> = {}
      const jointCoordinates: Record<string, THREE.Vector3> = {}

      // Helper to generate a crisp 3D Canvas Sprite Badge stuck to the joint
      function createLabelSprite(text: string, color: string) {
        const c = document.createElement('canvas')
        c.width = 256
        c.height = 80
        const ctx = c.getContext('2d')!

        // Rounded pill badge with shadow
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
          depthTest: true,
          depthWrite: false,
          transparent: true,
        })
        const sprite = new THREE.Sprite(mat)
        sprite.scale.set(0.22, 0.07, 1)
        return sprite
      }

      // Attach real 3D marker pins rigidly to the character
      function create3DPin(j: Joint3DInfo, pos: THREE.Vector3) {
        const pinGroup = new THREE.Group()
        pinGroup.position.copy(pos)
        pinGroup.name = j.id

        const jColor = new THREE.Color(j.color)

        // 1. Center Spherical Jewel Pin
        const orbGeo = new THREE.SphereGeometry(0.026, 16, 16)
        const orbMat = new THREE.MeshStandardMaterial({
          color: jColor,
          emissive: jColor,
          emissiveIntensity: 0.8,
          roughness: 0.2,
          metalness: 0.3,
        })
        const orb = new THREE.Mesh(orbGeo, orbMat)
        orb.userData = { jointId: j.id }
        pinGroup.add(orb)

        // 2. Pulse Radar Ring
        const ringGeo = new THREE.RingGeometry(0.038, 0.048, 32)
        const ringMat = new THREE.MeshBasicMaterial({
          color: jColor,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        pinGroup.add(ring)

        // 3. Glow Halo Sphere
        const glowGeo = new THREE.SphereGeometry(0.046, 14, 14)
        const glowMat = new THREE.MeshBasicMaterial({
          color: jColor,
          transparent: true,
          opacity: 0.28,
        })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        pinGroup.add(glow)

        // 4. Stuck 3D Sprite Label (Anchored rigidly beside the pin)
        const sprite = createLabelSprite(j.label, j.color)
        sprite.position.set(0.12, 0.04, 0)
        sprite.userData = { jointId: j.id }
        pinGroup.add(sprite)

        // Invisible larger hit box for easy clicking directly on the body part
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

          // Attach each 3D Pin RIGIDLY directly to the exact bone surface
          JOINTS_3D_DATA.forEach((j) => {
            const bone = boneMap[j.boneName]
            const pinPos = new THREE.Vector3()

            if (bone) {
              bone.getWorldPosition(pinPos)
              characterGroup.worldToLocal(pinPos)
              // Apply surface offset so the pin sits right on the skin/clothing
              pinPos.x += j.surfaceOffset[0]
              pinPos.y += j.surfaceOffset[1]
              pinPos.z += j.surfaceOffset[2]
            } else {
              // Safe default position if bone not resolved
              if (j.id === 'knee') pinPos.set(-0.11, -0.34, 0.11)
              if (j.id === 'hip') pinPos.set(-0.14, 0.08, 0.09)
              if (j.id === 'shoulder') pinPos.set(0.25, 0.44, 0.06)
              if (j.id === 'spine') pinPos.set(0.0, 0.28, -0.14)
              if (j.id === 'elbow') pinPos.set(0.42, 0.22, 0.02)
              if (j.id === 'ankle') pinPos.set(-0.12, -0.78, 0.06)
            }

            create3DPin(j, pinPos)
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

        const jointPos = jointCoordinates[jointId]
        if (!jointPos) return

        // Compute camera destination relative to the joint
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

        // Animate 3D Hotspot Pins (Locked to character)
        JOINTS_3D_DATA.forEach((j, idx) => {
          const pin = jointAnchorMap[j.id]
          if (pin) {
            // Billboard the radar ring so it faces camera
            pin.ring.lookAt(camera.position)

            const wave = (elapsedTime * 1.5 + idx * 0.35) % 1
            pin.ring.scale.setScalar(1 + wave * 1.5)
            ;(pin.ring.material as THREE.MeshBasicMaterial).opacity = (1 - wave) * 0.8

            const isSelected = j.id === activeJointId
            const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * (isSelected ? 0.25 : 0.1)
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
          Drag to rotate 360° • Click any joint pin on the body to inspect
        </span>
      </div>
    </div>
  )
}
