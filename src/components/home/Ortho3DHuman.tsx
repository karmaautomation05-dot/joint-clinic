'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import type * as THREE from 'three'

export interface Joint3DInfo {
  id: string
  label: string
  boneNodeName: string
  fallbackPos: [number, number, number]
  camOffset: [number, number, number]
  color: string
}

export const JOINTS_3D_DATA: Joint3DInfo[] = [
  {
    id: 'cranium',
    label: 'Cranium & Skull',
    boneNodeName: 'Cranium',
    fallbackPos: [0.012, 1.000, 0.120],
    camOffset: [0, 0.04, 0.65],
    color: '#02BAB9',
  },
  {
    id: 'cervical',
    label: 'Cervical Spine',
    boneNodeName: 'c4',
    fallbackPos: [-0.004, 0.863, 0.080],
    camOffset: [0, 0.02, 0.60],
    color: '#0A7C97',
  },
  {
    id: 'clavicle',
    label: 'Clavicle',
    boneNodeName: 'r_clavicle',
    fallbackPos: [-0.100, 0.782, 0.090],
    camOffset: [0, 0.02, 0.65],
    color: '#059B8F',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    boneNodeName: 'r_scapula',
    fallbackPos: [-0.145, 0.759, 0.080],
    camOffset: [0, 0.02, 0.70],
    color: '#02BAB9',
  },
  {
    id: 'sternum',
    label: 'Ribcage & Sternum',
    boneNodeName: 'Sternum',
    fallbackPos: [-0.005, 0.677, 0.140],
    camOffset: [0, 0.02, 0.80],
    color: '#F18712',
  },
  {
    id: 'elbow',
    label: 'Elbow',
    boneNodeName: 'r_ulna',
    fallbackPos: [-0.298, 0.325, 0.060],
    camOffset: [0, 0.02, 0.65],
    color: '#0A7C97',
  },
  {
    id: 'spine',
    label: 'Lumbar Spine',
    boneNodeName: 'l3',
    fallbackPos: [-0.009, 0.357, 0.060],
    camOffset: [0, 0.02, 0.75],
    color: '#01B3BF',
  },
  {
    id: 'wrist',
    label: 'Wrist & Hand',
    boneNodeName: 'r_metacarpal3',
    fallbackPos: [-0.377, 0.057, 0.080],
    camOffset: [0, 0.02, 0.55],
    color: '#059B8F',
  },
  {
    id: 'pelvis',
    label: 'Pelvis & Sacrum',
    boneNodeName: 'Sacrum',
    fallbackPos: [-0.006, 0.224, 0.080],
    camOffset: [0, 0.02, 0.80],
    color: '#0A7C97',
  },
  {
    id: 'hip',
    label: 'Hip',
    boneNodeName: 'r_femur',
    fallbackPos: [-0.108, -0.149, 0.080],
    camOffset: [0, 0.02, 0.75],
    color: '#F18712',
  },
  {
    id: 'knee',
    label: 'Knee',
    boneNodeName: 'r_patella',
    fallbackPos: [-0.081, -0.356, 0.080],
    camOffset: [0, 0.02, 0.65],
    color: '#02BAB9',
  },
  {
    id: 'ankle',
    label: 'Ankle & Foot',
    boneNodeName: 'r_talus',
    fallbackPos: [-0.050, -0.881, 0.080],
    camOffset: [0, 0.04, 0.60],
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

  // Visual Theme: 'studio' (Pure White Background) | 'radiograph' (Deep Black Background)
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

  // Camera initial full-skeleton view: fits 2.0 unit skeleton from head to toe
  const FULL_SKELETON_CAM: [number, number, number] = [0, 0.05, 3.20]
  const FULL_SKELETON_TARGET: [number, number, number] = [0, 0.0, 0]

  const transitionRef = useRef({
    currentCamPos: [...FULL_SKELETON_CAM] as [number, number, number],
    targetCamPos: [...FULL_SKELETON_CAM] as [number, number, number],
    currentLookAt: [...FULL_SKELETON_TARGET] as [number, number, number],
    targetLookAt: [...FULL_SKELETON_TARGET] as [number, number, number],
    isTransitioning: false,
  })

  const stateRef = useRef<{
    selectJoint?: (id: string | null) => void
    resetView?: () => void
    setTheme?: (t: SkeletonTheme) => void
    setAutoRotate?: (enabled: boolean) => void
  }>({})

  useEffect(() => {
    let animId: number
    let disposed = false

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      renderer.setClearColor(theme === 'radiograph' ? 0x050a14 : 0xffffff, 1)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = theme === 'radiograph' ? 1.35 : 1.15

      // ── Scene & Camera Setup ──────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(theme === 'radiograph' ? 0x050a14 : 0xffffff)

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
      camera.position.set(...FULL_SKELETON_CAM)
      const cameraTarget = new THREE.Vector3(...FULL_SKELETON_TARGET)
      camera.lookAt(cameraTarget)

      // ── OrbitControls with Physics Damping ─────────────────────────────────
      const controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      controls.dampingFactor = 0.06
      controls.enablePan = false
      controls.minDistance = 1.0
      controls.maxDistance = 5.2
      controls.minPolarAngle = Math.PI * 0.15
      controls.maxPolarAngle = Math.PI * 0.85
      controls.target.copy(cameraTarget)
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 0.85

      let isInteracting = false
      controls.addEventListener('start', () => { isInteracting = true })
      controls.addEventListener('end', () => { isInteracting = false })

      // ── Studio & Radiograph Lighting ───────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(
        theme === 'radiograph' ? 0x0c4a6e : 0xffffff,
        theme === 'radiograph' ? 1.8 : 1.45
      )
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(
        theme === 'radiograph' ? 0x38bdf8 : 0xfff8ee,
        theme === 'radiograph' ? 2.5 : 2.2
      )
      keyLight.position.set(3, 4, 3.5)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.0005
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(
        theme === 'radiograph' ? 0x0284c7 : 0xe0f2fe,
        1.3
      )
      fillLight.position.set(-3.5, 2, 2.5)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(
        theme === 'radiograph' ? 0x7dd3fc : 0xccfbf1,
        theme === 'radiograph' ? 1.6 : 1.1
      )
      rimLight.position.set(0, -3, -3)
      scene.add(rimLight)

      // Contact Ground Shadow Disc (Studio mode)
      const shadowGeo = new THREE.CircleGeometry(0.75, 48)
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: theme === 'radiograph' ? 0.0 : 0.20,
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
      const studioBoneMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#faf5ea'), // Warm clinical ivory cortical bone
        roughness: 0.42,
        metalness: 0.04,
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
          sprite: THREE.Sprite
          pinPos: THREE.Vector3
        }
      > = {}
      const jointCoordinates: Record<string, THREE.Vector3> = {}

      function makePinSprite(text: string, color: string) {
        const pinCanvas = document.createElement('canvas')
        pinCanvas.width = 256
        pinCanvas.height = 64
        const ctx = pinCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.88)'
          ctx.roundRect(4, 8, 248, 48, 24)
          ctx.fill()
          ctx.strokeStyle = color
          ctx.lineWidth = 3
          ctx.roundRect(4, 8, 248, 48, 24)
          ctx.stroke()
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 20px system-ui, -apple-system, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(text, 128, 32)
        }
        const texture = new THREE.CanvasTexture(pinCanvas)
        texture.minFilter = THREE.LinearFilter
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.scale.set(0.24, 0.06, 1)
        return sprite
      }

      function create3DPin(j: Joint3DInfo, pos: THREE.Vector3) {
        const pinGroup = new THREE.Group()
        pinGroup.position.copy(pos)

        // Pulsing radar ring
        const ringGeo = new THREE.RingGeometry(0.024, 0.038, 32)
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(j.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
          depthTest: false,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        pinGroup.add(ring)

        // Solid core orb
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

        // Soft outer glow halo
        const glowGeo = new THREE.SphereGeometry(0.026, 16, 16)
        const glowMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(j.color),
          transparent: true,
          opacity: 0.25,
          depthTest: false,
        })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        pinGroup.add(glow)

        // Label sprite floating just above the pin
        const sprite = makePinSprite(j.label, j.color)
        sprite.position.set(0, 0.05, 0)
        pinGroup.add(sprite)

        scene.add(pinGroup)

        jointAnchorMap[j.id] = { group: pinGroup, orb, ring, glow, sprite, pinPos: pos.clone() }
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

          // Index all named bones in the skeleton
          const boneNodeMap: Record<string, THREE.Object3D> = {}
          const allSkeletonMeshes: THREE.Mesh[] = []

          model.traverse((child: any) => {
            if (child.name) {
              boneNodeMap[child.name] = child
            }
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              child.material = currentBoneMat
              allSkeletonMeshes.push(child)
            }
          })

          // Place 3D Pins precisely on each anatomical bone
          JOINTS_3D_DATA.forEach((j) => {
            let pinPos = new THREE.Vector3(...j.fallbackPos)
            const targetNode = boneNodeMap[j.boneNodeName]

            if (targetNode) {
              const bBox = new THREE.Box3().setFromObject(targetNode)
              const bCenter = new THREE.Vector3()
              bBox.getCenter(bCenter)

              // Adjust anterior offset so pin rests smoothly on the visible bone face
              if (bCenter.lengthSq() > 0.001) {
                pinPos = bCenter.clone()
                pinPos.z += 0.04
              }
            }

            create3DPin(j, pinPos)
          })

          setIsLoading(false)

          // If a joint was initially selected, fly in, otherwise full skeleton
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
        (err) => {
          console.error('Error loading human_skeleton.glb:', err)
          setIsLoading(false)
        }
      )

      // ── Smooth Camera Transition Helpers ──────────────────────────────────
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
        transitionRef.current.targetCamPos = [...FULL_SKELETON_CAM]
        transitionRef.current.targetLookAt = [...FULL_SKELETON_TARGET]
        transitionRef.current.isTransitioning = true
      }

      function applyTheme(newTheme: SkeletonTheme) {
        const isRad = newTheme === 'radiograph'
        renderer.setClearColor(isRad ? 0x050a14 : 0xffffff, 1)
        scene.background = new THREE.Color(isRad ? 0x050a14 : 0xffffff)
        shadowMesh.visible = !isRad
        ambientLight.color.setHex(isRad ? 0x0c4a6e : 0xffffff)
        ambientLight.intensity = isRad ? 1.8 : 1.45
        keyLight.color.setHex(isRad ? 0x38bdf8 : 0xfff8ee)
        rimLight.color.setHex(isRad ? 0x7dd3fc : 0xccfbf1)

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
        controls.autoRotate = enabled
      }

      // ── Raycaster for Direct Clicking on 3D Pins ───────────────────────────
      const raycaster = new THREE.Raycaster()
      const mouseVec = new THREE.Vector2()

      function getPointerPos(e: MouseEvent) {
        const rect = canvas.getBoundingClientRect()
        return {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        }
      }

      function onCanvasClick(e: MouseEvent) {
        const pos = getPointerPos(e)
        mouseVec.set(pos.x, pos.y)
        raycaster.setFromCamera(mouseVec, camera)

        const interactiveMeshes = Object.values(jointAnchorMap).map((item) => item.orb)
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

        const interactiveMeshes = Object.values(jointAnchorMap).map((item) => item.orb)
        const intersects = raycaster.intersectObjects(interactiveMeshes, false)

        if (intersects.length > 0) {
          canvas.style.cursor = 'pointer'
        } else if (!isInteracting) {
          canvas.style.cursor = 'grab'
        }
      }

      canvas.addEventListener('click', onCanvasClick)
      canvas.addEventListener('mousemove', onCanvasMouseMove)

      // ── Main Animation Render Loop ─────────────────────────────────────────
      const clock = new THREE.Clock()

      function animate() {
        if (disposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()
        controls.update()

        // Smooth camera lerping when transitioning
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
          controls.target.copy(cameraTarget)

          const dist = Math.hypot(
            trans.targetCamPos[0] - camera.position.x,
            trans.targetCamPos[1] - camera.position.y,
            trans.targetCamPos[2] - camera.position.z
          )
          if (dist < 0.006) {
            camera.position.set(...trans.targetCamPos)
            cameraTarget.set(...trans.targetLookAt)
            camera.lookAt(cameraTarget)
            controls.target.copy(cameraTarget)
            trans.isTransitioning = false
          }
        }

        // Animate Hotspot Pins
        JOINTS_3D_DATA.forEach((j, idx) => {
          const pin = jointAnchorMap[j.id]
          if (pin) {
            pin.ring.lookAt(camera.position)

            const wave = (elapsedTime * 1.5 + idx * 0.25) % 1
            pin.ring.scale.setScalar(1 + wave * 1.5)
            ;(pin.ring.material as THREE.MeshBasicMaterial).opacity = (1 - wave) * 0.8

            const isSelected = j.id === activeJointId
            const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * (isSelected ? 0.25 : 0.08)
            pin.orb.scale.setScalar(pulse)

            if (isSelected) {
              pin.glow.scale.setScalar(1.6 + Math.sin(elapsedTime * 4) * 0.2)
              ;(pin.glow.material as THREE.MeshBasicMaterial).opacity = 0.45
              ;(pin.orb.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.3
              pin.sprite.scale.set(0.28, 0.07, 1)
            } else {
              pin.glow.scale.setScalar(1.2)
              ;(pin.glow.material as THREE.MeshBasicMaterial).opacity = 0.20
              ;(pin.orb.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8
              pin.sprite.scale.set(0.24, 0.06, 1)
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
        canvas.removeEventListener('click', onCanvasClick)
        canvas.removeEventListener('mousemove', onCanvasMouseMove)
        ro.disconnect()
        controls.dispose()
        renderer.dispose()
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[540px] sm:h-[620px] md:h-[680px] rounded-3xl overflow-hidden transition-colors duration-500 shadow-xl select-none border ${
        isDark ? 'bg-[#050a14] border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 backdrop-blur-sm transition-colors ${
            isDark ? 'bg-[#050a14]/95 text-white' : 'bg-white/95 text-slate-800'
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

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-sm backdrop-blur-md transition-colors bg-white/90 border-slate-200">
        {/* Reset Camera Button */}
        <button
          type="button"
          onClick={handleResetCamera}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          title="Reset to Full Skeleton View"
        >
          <span>🔄</span>
          <span className="hidden sm:inline">Full Skeleton</span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          type="button"
          onClick={toggleAutoRotate}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs ${
            autoRotate
              ? 'bg-teal-50 text-[#059B8F]'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
          title="Toggle Turntable 360° Rotation"
        >
          <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
        </button>
      </div>

      {/* Bottom Hint Overlay */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span
          className={`text-[11px] font-medium px-3.5 py-1.5 rounded-full border shadow-xs backdrop-blur-md transition-colors ${
            isDark
              ? 'bg-slate-900/90 text-slate-300 border-slate-700'
              : 'bg-white/95 text-slate-600 border-slate-200'
          }`}
        >
          🦴 Click any glowing bone pin &bull; Drag 360° to orbit &bull; Scroll to zoom
        </span>
      </div>
    </div>
  )
}
