'use client'

import React, { useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'

interface CalloutPoint {
  id: string
  title: string
  desc: string
  pos: [number, number, number]
  color: string
}

const CALLOUTS: CalloutPoint[] = [
  {
    id: 'femoral',
    title: 'Femoral Component',
    desc: 'Anatomically contoured cobalt-chrome femoral shield replicating natural condylar curvature.',
    pos: [0, 0.42, 0.48],
    color: '#02BAB9',
  },
  {
    id: 'poly',
    title: 'UHMWPE Articular Bearing',
    desc: 'Highly cross-linked polyethylene shock-absorbing insert for frictionless gliding and 25+ year durability.',
    pos: [0, 0.08, 0.52],
    color: '#F18712',
  },
  {
    id: 'tibial',
    title: 'Tibial Baseplate',
    desc: 'Titanium alloy tibial tray providing sub-millimeter fixation to the proximal tibial bone bed.',
    pos: [0, -0.22, 0.46],
    color: '#059B8F',
  },
  {
    id: 'patella',
    title: 'Patellar Tracking',
    desc: 'Preserved native kneecap with optimized trochlear groove tracking for natural, pain-free stair climbing.',
    pos: [0, 0.28, 0.65],
    color: '#0A7C97',
  },
]

export default function JointAnatomy3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [activeCallout, setActiveCallout] = useState<CalloutPoint>(CALLOUTS[0])
  const [viewMode, setViewMode] = useState<'implant' | 'natural'>('implant')

  const stateRef = useRef<{
    setMode?: (mode: 'implant' | 'natural') => void
  }>({})

  useEffect(() => {
    let animId: number
    let disposed = false

    async function init() {
      if (!canvasRef.current || !containerRef.current || disposed) return

      const THREE = await import('three')

      const canvas = canvasRef.current
      const container = containerRef.current
      const width = container.clientWidth
      const height = container.clientHeight

      // ── Renderer ────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      renderer.setClearColor(0xffffff, 1) // 100% Solid White
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      // ── Scene & Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
      camera.position.set(0, 0.15, 3.2)

      const cameraTarget = new THREE.Vector3(0, 0.1, 0)
      camera.lookAt(cameraTarget)

      // ── Studio High-Key Lighting ─────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.0)
      keyLight.position.set(3, 4, 4)
      keyLight.castShadow = true
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.2)
      fillLight.position.set(-3, 2, 3)
      scene.add(fillLight)

      const backLight = new THREE.DirectionalLight(0xccfbf1, 1.0)
      backLight.position.set(0, 3, -3)
      scene.add(backLight)

      // ── Soft Ground Shadow Disc ─────────────────────────────────────────
      const shadowCanvas = document.createElement('canvas')
      shadowCanvas.width = 256
      shadowCanvas.height = 256
      const sCtx = shadowCanvas.getContext('2d')!
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120)
      sGrad.addColorStop(0, 'rgba(15, 23, 42, 0.25)')
      sGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.12)')
      sGrad.addColorStop(0.8, 'rgba(15, 23, 42, 0.02)')
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
      shadowMesh.position.y = -1.25
      scene.add(shadowMesh)

      // ── Master Joint Assembly ───────────────────────────────────────────
      const jointGroup = new THREE.Group()
      scene.add(jointGroup)

      // ── Materials ───────────────────────────────────────────────────────
      // Anatomical Bone Material (Smooth medical ceramic bone)
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xf1ece4,
        roughness: 0.35,
        metalness: 0.08,
      })

      // Metallic Titanium / Cobalt-Chrome Implant Material
      const metalImplantMat = new THREE.MeshStandardMaterial({
        color: 0xdde6ed,
        roughness: 0.15,
        metalness: 0.85,
      })

      // Articular Polyethylene Bearing Material (Translucent clean white-cyan)
      const polyMat = new THREE.MeshPhysicalMaterial({
        color: 0xecfeff,
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.6,
        transparent: true,
        opacity: 0.85,
        ior: 1.3,
      })

      // Muscle & Tendon Material (Warm natural muscular red-crimson)
      const tendonMat = new THREE.MeshStandardMaterial({
        color: 0xbe3a34,
        roughness: 0.45,
        metalness: 0.05,
      })

      // Cartilage / Meniscus Material (Natural cartilage teal-blue)
      const cartilageMat = new THREE.MeshStandardMaterial({
        color: 0x02bab9,
        roughness: 0.25,
        metalness: 0.2,
        emissive: 0x016b6a,
        emissiveIntensity: 0.3,
      })

      // ── 1. FEMUR BONE (Thigh Bone) ──────────────────────────────────────
      const femurGroup = new THREE.Group()
      jointGroup.add(femurGroup)

      // Femur Shaft
      const femurShaftGeo = new THREE.CylinderGeometry(0.19, 0.22, 1.1, 24)
      femurShaftGeo.scale(1.0, 1.0, 0.85)
      const femurShaft = new THREE.Mesh(femurShaftGeo, boneMat)
      femurShaft.position.set(0, 0.95, -0.05)
      femurShaft.castShadow = true
      femurGroup.add(femurShaft)

      // Femoral Supracondylar Flare
      const flareGeo = new THREE.ConeGeometry(0.38, 0.45, 24)
      flareGeo.scale(1.15, 1.0, 0.9)
      const flare = new THREE.Mesh(flareGeo, boneMat)
      flare.position.set(0, 0.45, -0.02)
      flare.rotation.x = Math.PI
      femurGroup.add(flare)

      // Dual Femoral Condyles (Medial & Lateral)
      const condyleMedialGeo = new THREE.SphereGeometry(0.24, 20, 20)
      condyleMedialGeo.scale(0.85, 1.15, 1.35)
      const condyleMedial = new THREE.Mesh(condyleMedialGeo, boneMat)
      condyleMedial.position.set(-0.22, 0.32, 0.02)
      condyleMedial.castShadow = true
      femurGroup.add(condyleMedial)

      const condyleLateralGeo = new THREE.SphereGeometry(0.24, 20, 20)
      condyleLateralGeo.scale(0.85, 1.15, 1.35)
      const condyleLateral = new THREE.Mesh(condyleLateralGeo, boneMat)
      condyleLateral.position.set(0.22, 0.32, 0.02)
      condyleLateral.castShadow = true
      femurGroup.add(condyleLateral)

      // ── 2. TIBIA BONE (Shin Bone) ───────────────────────────────────────
      const tibiaGroup = new THREE.Group()
      jointGroup.add(tibiaGroup)

      // Tibial Plateau (Top bone surface)
      const plateauGeo = new THREE.CylinderGeometry(0.44, 0.36, 0.24, 24)
      plateauGeo.scale(1.1, 1.0, 0.88)
      const plateau = new THREE.Mesh(plateauGeo, boneMat)
      plateau.position.set(0, -0.22, 0)
      plateau.castShadow = true
      tibiaGroup.add(plateau)

      // Tibial Tuberosity (Front bone ridge)
      const tuberosityGeo = new THREE.BoxGeometry(0.16, 0.32, 0.18)
      const tuberosity = new THREE.Mesh(tuberosityGeo, boneMat)
      tuberosity.position.set(0, -0.32, 0.16)
      tuberosity.rotation.x = 0.25
      tibiaGroup.add(tuberosity)

      // Tibia Shaft
      const tibiaShaftGeo = new THREE.CylinderGeometry(0.22, 0.17, 1.0, 24)
      tibiaShaftGeo.scale(0.9, 1.0, 1.1)
      const tibiaShaft = new THREE.Mesh(tibiaShaftGeo, boneMat)
      tibiaShaft.position.set(0, -0.75, 0)
      tibiaShaft.castShadow = true
      tibiaGroup.add(tibiaShaft)

      // Fibula Head (Lateral slender bone)
      const fibulaHeadGeo = new THREE.SphereGeometry(0.12, 16, 16)
      const fibulaHead = new THREE.Mesh(fibulaHeadGeo, boneMat)
      fibulaHead.position.set(0.42, -0.32, -0.10)
      tibiaGroup.add(fibulaHead)

      const fibulaShaftGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.85, 14)
      const fibulaShaft = new THREE.Mesh(fibulaShaftGeo, boneMat)
      fibulaShaft.position.set(0.44, -0.75, -0.10)
      tibiaGroup.add(fibulaShaft)

      // ── 3. PATELLA & EXTENSOR MECHANISM ─────────────────────────────────
      const patellaGroup = new THREE.Group()
      jointGroup.add(patellaGroup)

      // Patella Bone (Kneecap)
      const patellaGeo = new THREE.SphereGeometry(0.16, 18, 18)
      patellaGeo.scale(1.05, 1.25, 0.55)
      const patella = new THREE.Mesh(patellaGeo, boneMat)
      patella.position.set(0, 0.26, 0.44)
      patella.castShadow = true
      patellaGroup.add(patella)

      // Patellar Tendon (Ligament connecting patella to tibia)
      const tendonGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.48, 16)
      tendonGeo.scale(1.2, 1.0, 0.5)
      const tendon = new THREE.Mesh(tendonGeo, tendonMat)
      tendon.position.set(0, 0.02, 0.38)
      tendon.rotation.x = 0.22
      patellaGroup.add(tendon)

      // Quadriceps Tendon (Extending upward into thigh)
      const quadTendonGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.55, 16)
      quadTendonGeo.scale(1.2, 1.0, 0.5)
      const quadTendon = new THREE.Mesh(quadTendonGeo, tendonMat)
      quadTendon.position.set(0, 0.58, 0.34)
      quadTendon.rotation.x = -0.12
      patellaGroup.add(quadTendon)

      // ── 4. ARTHROPLASTY PROSTHETIC IMPLANT ASSEMBLY ─────────────────────
      const implantGroup = new THREE.Group()
      jointGroup.add(implantGroup)

      // Femoral Metallic Shield
      const femShieldGeo = new THREE.TorusGeometry(0.32, 0.08, 16, 32, Math.PI * 1.1)
      femShieldGeo.scale(1.15, 1.0, 1.35)
      const femShield = new THREE.Mesh(femShieldGeo, metalImplantMat)
      femShield.position.set(0, 0.32, 0.08)
      femShield.rotation.x = Math.PI / 2 + 0.2
      implantGroup.add(femShield)

      // Titanium Tibial Baseplate Tray
      const trayGeo = new THREE.CylinderGeometry(0.42, 0.40, 0.06, 24)
      trayGeo.scale(1.08, 1.0, 0.85)
      const tray = new THREE.Mesh(trayGeo, metalImplantMat)
      tray.position.set(0, -0.06, 0.02)
      implantGroup.add(tray)

      // Polyethylene Insert (Bearing Cushion)
      const polyInsertGeo = new THREE.CylinderGeometry(0.40, 0.41, 0.08, 24)
      polyInsertGeo.scale(1.06, 1.0, 0.84)
      const polyInsert = new THREE.Mesh(polyInsertGeo, polyMat)
      polyInsert.position.set(0, 0.02, 0.02)
      implantGroup.add(polyInsert)

      // ── 5. NATURAL ANATOMY MODE (Meniscus Cartilage & Cruciates) ─────────
      const naturalGroup = new THREE.Group()
      naturalGroup.visible = false
      jointGroup.add(naturalGroup)

      // Medial Meniscus C-ring
      const meniscusMedialGeo = new THREE.TorusGeometry(0.20, 0.045, 12, 24, Math.PI * 1.3)
      const meniscusMedial = new THREE.Mesh(meniscusMedialGeo, cartilageMat)
      meniscusMedial.position.set(-0.16, 0.02, 0)
      meniscusMedial.rotation.x = Math.PI / 2
      naturalGroup.add(meniscusMedial)

      // Lateral Meniscus O-ring
      const meniscusLateralGeo = new THREE.TorusGeometry(0.18, 0.045, 12, 24, Math.PI * 1.4)
      const meniscusLateral = new THREE.Mesh(meniscusLateralGeo, cartilageMat)
      meniscusLateral.position.set(0.16, 0.02, 0)
      meniscusLateral.rotation.x = Math.PI / 2
      naturalGroup.add(meniscusLateral)

      // Anterior Cruciate Ligament (ACL)
      const aclCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, 0.22, -0.05),
        new THREE.Vector3(0.02, 0.12, 0.02),
        new THREE.Vector3(-0.06, 0.01, 0.08),
      ])
      const aclGeo = new THREE.TubeGeometry(aclCurve, 16, 0.038, 8, false)
      const acl = new THREE.Mesh(aclGeo, tendonMat)
      naturalGroup.add(acl)

      // ── 6. 3D INTERACTIVE CALLOUT PINS ──────────────────────────────────
      const pinsGroup = new THREE.Group()
      jointGroup.add(pinsGroup)

      const pinMap: Record<string, { orb: THREE.Mesh; ring: THREE.Mesh; sprite: THREE.Sprite }> = {}

      function createBadge(text: string, color: string) {
        const c = document.createElement('canvas')
        c.width = 256
        c.height = 76
        const ctx = c.getContext('2d')!

        ctx.fillStyle = '#ffffff'
        ctx.strokeStyle = color
        ctx.lineWidth = 4

        const r = 20
        const x = 6
        const y = 6
        const w = 244
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

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(32, 38, 9, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#0f172a'
        ctx.font = 'bold 26px system-ui, -apple-system, sans-serif'
        ctx.fillText(text, 54, 46)

        const tex = new THREE.CanvasTexture(c)
        const mat = new THREE.SpriteMaterial({
          map: tex,
          depthTest: false,
          depthWrite: false,
          transparent: true,
        })
        const s = new THREE.Sprite(mat)
        s.renderOrder = 1000
        s.scale.set(0.38, 0.11, 1)
        return s
      }

      CALLOUTS.forEach((c) => {
        const pColor = new THREE.Color(c.color)
        const pGroup = new THREE.Group()
        pGroup.position.set(...c.pos)

        // Jewel orb
        const orbGeo = new THREE.SphereGeometry(0.038, 16, 16)
        const orbMat = new THREE.MeshStandardMaterial({
          color: pColor,
          emissive: pColor,
          emissiveIntensity: 0.9,
          polygonOffset: true,
          polygonOffsetFactor: -4,
          polygonOffsetUnits: -4,
        })
        const orb = new THREE.Mesh(orbGeo, orbMat)
        orb.renderOrder = 998
        pGroup.add(orb)

        // Pulse ring
        const ringGeo = new THREE.RingGeometry(0.05, 0.065, 32)
        const ringMat = new THREE.MeshBasicMaterial({
          color: pColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.renderOrder = 999
        pGroup.add(ring)

        // Sprite badge
        const sprite = createBadge(c.title, c.color)
        sprite.position.set(0.24, 0.05, 0)
        pGroup.add(sprite)

        pinsGroup.add(pGroup)
        pinMap[c.id] = { orb, ring, sprite }
      })

      // Switch mode handler
      stateRef.current.setMode = (mode: 'implant' | 'natural') => {
        if (mode === 'implant') {
          implantGroup.visible = true
          naturalGroup.visible = false
        } else {
          implantGroup.visible = false
          naturalGroup.visible = true
        }
      }

      // ── MOUSE / TOUCH DRAG ORBIT ─────────────────────────────────────────
      let isDragging = false
      let prevX = 0
      let prevY = 0
      let targetRotY = 0.25
      let targetRotX = 0.08
      const rotSpeed = 0.007

      function onMouseDown(e: MouseEvent) {
        if (e.button !== 0) return
        isDragging = true
        prevX = e.clientX
        prevY = e.clientY
      }

      function onMouseMove(e: MouseEvent) {
        if (!isDragging) return
        const dx = e.clientX - prevX
        const dy = e.clientY - prevY
        prevX = e.clientX
        prevY = e.clientY

        targetRotY += dx * rotSpeed
        targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + dy * rotSpeed * 0.5))
      }

      function onMouseUp() {
        isDragging = false
      }

      function onWheel(e: WheelEvent) {
        e.preventDefault()
        const zoomDelta = e.deltaY * 0.0015
        const curDist = camera.position.distanceTo(cameraTarget)
        const newDist = Math.max(1.8, Math.min(4.8, curDist + zoomDelta))
        const dir = camera.position.clone().sub(cameraTarget).normalize()
        camera.position.copy(cameraTarget.clone().add(dir.multiplyScalar(newDist)))
      }

      const cEl = canvasRef.current
      cEl.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      cEl.addEventListener('wheel', onWheel, { passive: false })

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

        // Smooth rotation damping
        jointGroup.rotation.y += (targetRotY - jointGroup.rotation.y) * 0.08
        jointGroup.rotation.x += (targetRotX - jointGroup.rotation.x) * 0.08

        // Animate pins
        CALLOUTS.forEach((c, idx) => {
          const p = pinMap[c.id]
          if (p) {
            p.ring.lookAt(camera.position)
            const wave = (elapsedTime * 1.5 + idx * 0.4) % 1
            p.ring.scale.setScalar(1 + wave * 1.5)
            ;(p.ring.material as THREE.MeshBasicMaterial).opacity = (1 - wave) * 0.8
          }
        })

        renderer.render(scene, camera)
      }
      animate()

      return () => {
        disposed = true
        cancelAnimationFrame(animId)
        cEl.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        cEl.removeEventListener('wheel', onWheel)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }

    const cleanupPromise = init()
    return () => {
      disposed = true
      cleanupPromise.then((fn) => fn?.())
    }
  }, [])

  const handleModeSwitch = (mode: 'implant' | 'natural') => {
    setViewMode(mode)
    if (stateRef.current.setMode) {
      stateRef.current.setMode(mode)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl select-none"
    >
      {/* Three.js Canvas (Pure 100% Solid White) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Mode Switcher Buttons (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <button
          onClick={() => handleModeSwitch('implant')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            viewMode === 'implant'
              ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          Prosthetic Implant
        </button>
        <button
          onClick={() => handleModeSwitch('natural')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            viewMode === 'natural'
              ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          Natural Cartilage
        </button>
      </div>

      {/* Drag Hint (Bottom Center) */}
      <div className="absolute bottom-3 inset-x-0 pointer-events-none text-center hidden sm:block z-10">
        <span className="text-[11px] font-medium text-slate-500 bg-white/95 px-3.5 py-1 rounded-full border border-slate-200 shadow-xs">
          Drag to rotate 360° • Inspect sub-millimeter joint reconstruction
        </span>
      </div>
    </div>
  )
}
