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
    id: 'knee',
    label: 'Knee',
    pos: [0.38, -0.68, 0.12],
    camPos: [0.38, -0.68, 1.6],
    target: [0.38, -0.68, 0.12],
    color: '#02BAB9',
  },
  {
    id: 'hip',
    label: 'Hip',
    pos: [0.44, 0.12, 0.12],
    camPos: [0.44, 0.12, 1.7],
    target: [0.44, 0.12, 0.12],
    color: '#F18712',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    pos: [-0.85, 1.28, 0.08],
    camPos: [-0.85, 1.28, 1.65],
    target: [-0.85, 1.28, 0.08],
    color: '#059B8F',
  },
  {
    id: 'spine',
    label: 'Spine',
    pos: [0.0, 0.72, -0.16],
    camPos: [0.25, 0.72, -1.75],
    target: [0.0, 0.72, -0.16],
    color: '#01B3BF',
  },
  {
    id: 'elbow',
    label: 'Elbow',
    pos: [-1.08, 0.72, 0.08],
    camPos: [-1.08, 0.72, 1.55],
    target: [-1.08, 0.72, 0.08],
    color: '#0A7C97',
  },
  {
    id: 'ankle',
    label: 'Ankle',
    pos: [0.36, -1.54, 0.08],
    camPos: [0.36, -1.54, 1.5],
    target: [0.36, -1.54, 0.08],
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

  const [screenPins, setScreenPins] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([])

  // Store transition targets
  const transitionRef = useRef({
    currentCamPos: [0, 0.1, 4.8] as [number, number, number],
    targetCamPos: [0, 0.1, 4.8] as [number, number, number],
    currentLookAt: [0, 0.05, 0] as [number, number, number],
    targetLookAt: [0, 0.05, 0] as [number, number, number],
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

      const canvas = canvasRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── Renderer (Pure White Background) ─────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      renderer.setClearColor(0xffffff, 1) // Clean pure white studio background
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      // ── Scene & Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
      camera.position.set(0, 0.1, 4.8)

      const cameraTarget = new THREE.Vector3(0, 0.05, 0)
      camera.lookAt(cameraTarget)

      // ── Studio High-Key Lighting ─────────────────────────────────────────
      // Ambient illumination (soft warm white)
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
      scene.add(ambientLight)

      // Key light from top-front-right
      const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.8)
      keyLight.position.set(4, 5, 5)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.bias = -0.001
      scene.add(keyLight)

      // Fill light from left (cool medical tint)
      const fillLight = new THREE.DirectionalLight(0xe6f7f7, 1.1)
      fillLight.position.set(-4, 3, 3)
      scene.add(fillLight)

      // Rim light from behind for silhouette pop on white background
      const rimLight = new THREE.DirectionalLight(0xcdeeee, 1.2)
      rimLight.position.set(0, 3, -4)
      scene.add(rimLight)

      // Soft ground bounce light
      const groundBounce = new THREE.DirectionalLight(0xf1f5f9, 0.6)
      groundBounce.position.set(0, -3, 2)
      scene.add(groundBounce)

      // ── Master Character Group ──────────────────────────────────────────
      const characterGroup = new THREE.Group()
      scene.add(characterGroup)

      // ── Materials ───────────────────────────────────────────────────────
      // Realistic healthy human male skin
      const skinMat = new THREE.MeshStandardMaterial({
        color: 0xdfad94, // Warm natural male skin tone
        roughness: 0.55,
        metalness: 0.04,
      })

      // Modern dark hair
      const hairMat = new THREE.MeshStandardMaterial({
        color: 0x221c19, // Deep dark espresso/black hair
        roughness: 0.7,
        metalness: 0.05,
      })

      // Clothed: Athletic Medical Teal Fitted T-Shirt
      const shirtMat = new THREE.MeshStandardMaterial({
        color: 0x059b8f, // Signature Medical Teal
        roughness: 0.65,
        metalness: 0.08,
      })

      // Collar & Trim Accent
      const shirtTrimMat = new THREE.MeshStandardMaterial({
        color: 0x0a7c97, // Ocean blue collar accent
        roughness: 0.55,
        metalness: 0.1,
      })

      // Clothed: Athletic Training Shorts (Dark Charcoal Slate)
      const shortsMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b, // Charcoal slate shorts
        roughness: 0.75,
        metalness: 0.05,
      })

      // Athletic Shoes (Crisp white with teal accents)
      const shoeMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc, // White sneaker upper
        roughness: 0.35,
        metalness: 0.1,
      })

      const soleMat = new THREE.MeshStandardMaterial({
        color: 0x02bab9, // Teal sole accent
        roughness: 0.5,
        metalness: 0.1,
      })

      // Helper to add parts
      function addPart(geom: any, mat: any, pos: [number, number, number], rot?: [number, number, number], scale?: [number, number, number], parent: any = characterGroup) {
        const mesh = new THREE.Mesh(geom, mat)
        mesh.position.set(pos[0], pos[1], pos[2])
        if (rot) mesh.rotation.set(rot[0], rot[1], rot[2])
        if (scale) mesh.scale.set(scale[0], scale[1], scale[2])
        mesh.castShadow = true
        mesh.receiveShadow = true
        parent.add(mesh)
        return mesh
      }

      // ── MODELING THE CLOTHED HUMAN MALE ─────────────────────────────────

      // 1. HEAD & FACE
      // Cranium / Face structure
      const headGeo = new THREE.SphereGeometry(0.24, 28, 24)
      headGeo.scale(0.85, 1.15, 0.95)
      addPart(headGeo, skinMat, [0, 1.95, 0])

      // Jaw & chin volume
      const chinGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.14, 16)
      chinGeo.scale(0.82, 1, 0.85)
      addPart(chinGeo, skinMat, [0, 1.82, 0.05], [0.12, 0, 0])

      // Neck
      const neckGeo = new THREE.CylinderGeometry(0.125, 0.14, 0.22, 20)
      addPart(neckGeo, skinMat, [0, 1.70, -0.01])

      // Modern stylish textured hair (side-fade volume)
      const hairMainGeo = new THREE.SphereGeometry(0.25, 24, 20)
      hairMainGeo.scale(0.88, 1.12, 0.98)
      addPart(hairMainGeo, hairMat, [0, 2.01, -0.03])

      const hairTopGeo = new THREE.BoxGeometry(0.36, 0.12, 0.38)
      addPart(hairTopGeo, hairMat, [0, 2.12, 0.02], [-0.08, 0, 0])

      // Ears (Left & Right)
      const earGeo = new THREE.SphereGeometry(0.045, 12, 12)
      earGeo.scale(0.4, 1.2, 0.8)
      addPart(earGeo, skinMat, [-0.22, 1.94, -0.01])
      addPart(earGeo, skinMat, [0.22, 1.94, -0.01])

      // 2. TORSO (CLOTHED: FITTED TEAL ATHLETIC SHIRT)
      // Main chest & upper torso
      const chestGeo = new THREE.CylinderGeometry(0.46, 0.40, 0.54, 28)
      chestGeo.scale(1.02, 1, 0.72)
      addPart(chestGeo, shirtMat, [0, 1.35, 0.02], [-0.04, 0, 0])

      // Midriff & waist (tucked shirt)
      const waistGeo = new THREE.CylinderGeometry(0.40, 0.38, 0.44, 28)
      waistGeo.scale(0.96, 1, 0.70)
      addPart(waistGeo, shirtMat, [0, 0.94, 0.01])

      // Shirt crew-neck collar ring
      const collarGeo = new THREE.TorusGeometry(0.14, 0.024, 12, 24)
      addPart(collarGeo, shirtTrimMat, [0, 1.59, 0.02], [Math.PI / 2 + 0.1, 0, 0])

      // 3. SHOULDERS & ARMS (CLOTHED SLEEVES + EXPOSED MUSCULAR ARMS)
      const sides = [-1, 1] // -1 = Left arm, 1 = Right arm

      sides.forEach((s) => {
        // T-Shirt Short Sleeve (Shoulder deltoid cap)
        const sleeveGeo = new THREE.SphereGeometry(0.19, 20, 18)
        sleeveGeo.scale(1, 1.2, 1)
        addPart(sleeveGeo, shirtMat, [s * 0.56, 1.40, 0.02], [0, 0, s * 0.2])

        // Sleeve hem cuff
        const cuffGeo = new THREE.CylinderGeometry(0.13, 0.14, 0.22, 20)
        addPart(cuffGeo, shirtMat, [s * 0.68, 1.25, 0.03], [0, 0, s * 0.28])

        // Bicep / Tricep (Skin exposed below short sleeve)
        const bicepGeo = new THREE.CylinderGeometry(0.105, 0.095, 0.34, 18)
        addPart(bicepGeo, skinMat, [s * 0.78, 0.98, 0.04], [0, 0, s * 0.22])

        // Elbow joint
        const elbowGeo = new THREE.SphereGeometry(0.095, 16, 16)
        addPart(elbowGeo, skinMat, [s * 0.85, 0.78, 0.05])

        // Forearm (tapering to wrist)
        const forearmGeo = new THREE.CylinderGeometry(0.09, 0.075, 0.42, 18)
        addPart(forearmGeo, skinMat, [s * 0.92, 0.52, 0.06], [0, 0, s * 0.14])

        // Wrist
        const wristGeo = new THREE.SphereGeometry(0.07, 14, 14)
        addPart(wristGeo, skinMat, [s * 0.98, 0.28, 0.06])

        // Hand & fingers (relaxed anatomical pose)
        const handGeo = new THREE.BoxGeometry(0.08, 0.18, 0.12)
        addPart(handGeo, skinMat, [s * 1.01, 0.15, 0.06], [0, 0, s * 0.08])
      })

      // 4. PELVIS & SHORTS (CLOTHED: CHARCOAL ATHLETIC TRAINING SHORTS)
      // Main shorts hip volume
      const shortsHipGeo = new THREE.CylinderGeometry(0.41, 0.43, 0.36, 28)
      shortsHipGeo.scale(0.98, 1, 0.76)
      addPart(shortsHipGeo, shortsMat, [0, 0.58, 0.02])

      // Shorts waistband trim
      const waistbandGeo = new THREE.TorusGeometry(0.40, 0.022, 10, 28)
      waistbandGeo.scale(0.98, 0.76, 1)
      addPart(waistbandGeo, shirtTrimMat, [0, 0.73, 0.02], [Math.PI / 2, 0, 0])

      // Shorts leg openings (Left & Right)
      sides.forEach((s) => {
        const shortLegGeo = new THREE.CylinderGeometry(0.23, 0.21, 0.44, 22)
        shortLegGeo.scale(1, 1, 0.94)
        addPart(shortLegGeo, shortsMat, [s * 0.24, 0.26, 0.04], [0.06, 0, s * -0.06])
      })

      // 5. LOWER LIMBS: MUSCULAR LEGS, KNEES & CALVES
      sides.forEach((s) => {
        // Lower Thigh (peeking out from shorts above knee)
        const thighGeo = new THREE.CylinderGeometry(0.18, 0.155, 0.32, 20)
        addPart(thighGeo, skinMat, [s * 0.24, -0.04, 0.05], [0.05, 0, s * -0.04])

        // Knee joint complex (defined patella, femoral condyles shape)
        const kneeGeo = new THREE.SphereGeometry(0.155, 20, 20)
        kneeGeo.scale(0.95, 1.15, 1.05)
        addPart(kneeGeo, skinMat, [s * 0.24, -0.28, 0.06])

        // Patellar kneecap prominence
        const patellaCap = new THREE.SphereGeometry(0.065, 14, 14)
        patellaCap.scale(1, 1.25, 0.6)
        addPart(patellaCap, skinMat, [s * 0.24, -0.27, 0.16])

        // Calf & Shin (muscular gastrocnemius curve)
        const calfGeo = new THREE.CylinderGeometry(0.145, 0.105, 0.76, 20)
        calfGeo.scale(0.94, 1, 1.08)
        addPart(calfGeo, skinMat, [s * 0.23, -0.74, 0.04], [-0.03, 0, 0])

        // Ankle joint (medial/lateral malleolus)
        const ankleGeo = new THREE.SphereGeometry(0.105, 16, 16)
        addPart(ankleGeo, skinMat, [s * 0.23, -1.18, 0.04])

        // 6. ATHLETIC SNEAKERS (WHITE UPPER WITH TEAL DETAIL)
        // Sneaker upper body
        const shoeUpperGeo = new THREE.BoxGeometry(0.18, 0.14, 0.44)
        shoeUpperGeo.scale(0.95, 1, 1)
        addPart(shoeUpperGeo, shoeMat, [s * 0.23, -1.30, 0.12], [0.08, 0, 0])

        // Sneaker sole (Teal bounce layer)
        const shoeSoleGeo = new THREE.BoxGeometry(0.20, 0.055, 0.48)
        addPart(shoeSoleGeo, soleMat, [s * 0.23, -1.38, 0.13])

        // Sneaker toe cap curve
        const toeGeo = new THREE.SphereGeometry(0.09, 14, 14)
        toeGeo.scale(1.05, 0.7, 1.2)
        addPart(toeGeo, shoeMat, [s * 0.23, -1.32, 0.28])
      })

      // ── SOFT GROUND STUDIO SHADOW ─────────────────────────────────────────
      // High-resolution soft radial shadow disc beneath character feet
      const shadowCanvas = document.createElement('canvas')
      shadowCanvas.width = 256
      shadowCanvas.height = 256
      const sCtx = shadowCanvas.getContext('2d')!
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120)
      sGrad.addColorStop(0, 'rgba(15, 23, 42, 0.28)')
      sGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.15)')
      sGrad.addColorStop(0.8, 'rgba(15, 23, 42, 0.04)')
      sGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      sCtx.fillStyle = sGrad
      sCtx.fillRect(0, 0, 256, 256)

      const shadowTex = new THREE.CanvasTexture(shadowCanvas)
      const shadowPlaneGeo = new THREE.PlaneGeometry(3.2, 3.2)
      const shadowPlaneMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
      })
      const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat)
      shadowMesh.rotation.x = -Math.PI / 2
      shadowMesh.position.y = -1.41
      scene.add(shadowMesh)

      // ── 3D FLOATING JOINT HOTSPOT PINS ────────────────────────────────────
      const pinsGroup = new THREE.Group()
      characterGroup.add(pinsGroup)

      const pinMeshes: Record<string, { orb: any; ring: any; glow: any }> = {}

      JOINTS_3D_DATA.forEach((j) => {
        const jColor = new THREE.Color(j.color)

        // Center jewel sphere
        const orbGeo = new THREE.SphereGeometry(0.065, 18, 18)
        const orbMat = new THREE.MeshStandardMaterial({
          color: jColor,
          emissive: jColor,
          emissiveIntensity: 0.6,
          roughness: 0.2,
          metalness: 0.2,
        })
        const orb = new THREE.Mesh(orbGeo, orbMat)
        orb.position.set(...j.pos)
        pinsGroup.add(orb)

        // Pulsing radar ring
        const ringGeo = new THREE.RingGeometry(0.09, 0.115, 32)
        const ringMat = new THREE.MeshBasicMaterial({
          color: jColor,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.set(...j.pos)
        pinsGroup.add(ring)

        // Soft outer glow halo
        const glowGeo = new THREE.SphereGeometry(0.12, 14, 14)
        const glowMat = new THREE.MeshBasicMaterial({
          color: jColor,
          transparent: true,
          opacity: 0.25,
        })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        glow.position.set(...j.pos)
        pinsGroup.add(glow)

        pinMeshes[j.id] = { orb, ring, glow }
      })

      // ── CAMERA FLIGHT / ZOOM TO JOINT ─────────────────────────────────────
      function flyToJoint(jointId: string) {
        const joint = JOINTS_3D_DATA.find((j) => j.id === jointId)
        if (!joint) return

        transitionRef.current.targetCamPos = [...joint.camPos]
        transitionRef.current.targetLookAt = [...joint.target]
        transitionRef.current.isTransitioning = true
      }

      function resetView() {
        transitionRef.current.targetCamPos = [0, 0.1, 4.8]
        transitionRef.current.targetLookAt = [0, 0.05, 0]
        transitionRef.current.isTransitioning = true
      }

      stateRef.current.selectJoint = flyToJoint
      stateRef.current.resetView = resetView

      // Fly to initial active joint
      flyToJoint(activeJointId)

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
        const zoomDelta = e.deltaY * 0.002
        const currentDist = camera.position.distanceTo(cameraTarget)
        const newDist = Math.max(1.4, Math.min(6.0, currentDist + zoomDelta))
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
          targetRotY += 0.0018
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
          if (posDist < 0.015) {
            trans.isTransitioning = false
          }
        }

        // Animate Hotspot Pins
        JOINTS_3D_DATA.forEach((j, idx) => {
          const pin = pinMeshes[j.id]
          if (pin) {
            pin.ring.lookAt(camera.position)

            const wave = (elapsedTime * 1.6 + idx * 0.35) % 1
            pin.ring.scale.setScalar(1 + wave * 1.6)
            pin.ring.material.opacity = (1 - wave) * 0.75

            const isSelected = j.id === activeJointId
            const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * (isSelected ? 0.2 : 0.1)
            pin.orb.scale.setScalar(pulse)

            if (isSelected) {
              pin.glow.scale.setScalar(1.5 + Math.sin(elapsedTime * 4) * 0.2)
              pin.glow.material.opacity = 0.4
              pin.orb.material.emissiveIntensity = 1.0
            } else {
              pin.glow.scale.setScalar(1.0)
              pin.glow.material.opacity = 0.2
              pin.orb.material.emissiveIntensity = 0.4
            }
          }
        })

        // Subtle breathing expansion on chest
        const breathe = 1 + Math.sin(elapsedTime * 1.5) * 0.01
        chestGeo.scale(1.02 * breathe, 1, 0.72 * breathe)

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
      {/* 3D WebGL Canvas (Pure White Background) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Clean Subtle Reset Button (Top Right) */}
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
            className={`absolute z-30 flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
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
