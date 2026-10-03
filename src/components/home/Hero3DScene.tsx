'use client'

import { useEffect, useRef } from 'react'

export default function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animFrameId: number
    let disposed = false

    async function init() {
      if (!canvasRef.current || disposed) return
      const THREE = await import('three')

      const canvas = canvasRef.current
      const W = canvas.clientWidth
      const H = canvas.clientHeight

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H, false)
      renderer.setClearColor(0x000000, 0)
      renderer.shadowMap.enabled = false

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200)
      camera.position.set(0, 0, 7)

      // ── Helpers ─────────────────────────────────────────────────────────────

      function makeWireSphere(radius: number, wSeg: number, hSeg: number, color: number, opacity: number) {
        const geo = new THREE.EdgesGeometry(new THREE.SphereGeometry(radius, wSeg, hSeg))
        const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, linewidth: 1 })
        return new THREE.LineSegments(geo, mat)
      }

      function makeRing(radius: number, axis: 'x' | 'y' | 'z', color: number, opacity: number, seg = 128) {
        const pos: number[] = []
        for (let i = 0; i <= seg; i++) {
          const a = (i / seg) * Math.PI * 2
          if (axis === 'z') pos.push(Math.cos(a) * radius, Math.sin(a) * radius, 0)
          else if (axis === 'x') pos.push(0, Math.cos(a) * radius, Math.sin(a) * radius)
          else pos.push(Math.cos(a) * radius, 0, Math.sin(a) * radius)
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
        const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
        return new THREE.LineSegments(geo, mat)
      }

      // ── Root group (everything rotates together) ─────────────────────────────
      const root = new THREE.Group()
      scene.add(root)

      // 1 — Outer wireframe sphere — main joint ball
      const outerSphere = makeWireSphere(2.0, 24, 16, 0x059B8F, 0.22)
      root.add(outerSphere)

      // 2 — Mid sphere (slightly different tilt) — inner joint surface
      const midSphere = makeWireSphere(1.35, 16, 10, 0x0A7C97, 0.16)
      midSphere.rotation.z = 0.55
      midSphere.rotation.x = 0.25
      root.add(midSphere)

      // 3 — Small inner core — femoral head
      const innerSphere = makeWireSphere(0.65, 10, 7, 0x02BAB9, 0.28)
      root.add(innerSphere)

      // 4 — Equatorial & polar rings (anatomical axes)
      const ringZ = makeRing(2.0, 'z', 0x059B8F, 0.55) // equatorial
      const ringX = makeRing(2.0, 'x', 0x0A7C97, 0.40) // coronal
      const ringY = makeRing(2.0, 'y', 0x01B3BF, 0.30) // sagittal
      const ringMid = makeRing(1.35, 'z', 0x02BAB9, 0.35)
      ringMid.rotation.x = 0.6
      root.add(ringZ, ringX, ringY, ringMid)

      // 5 — Arc connector lines (like cartilage gap lines on an ortho x-ray)
      function makeArc(radius: number, startAngle: number, endAngle: number, tiltX: number, tiltY: number, color: number, opacity: number) {
        const seg = 48
        const pos: number[] = []
        for (let i = 0; i <= seg; i++) {
          const a = startAngle + (i / seg) * (endAngle - startAngle)
          pos.push(Math.cos(a) * radius, Math.sin(a) * radius, 0)
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
        const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
        const arc = new THREE.LineSegments(geo, mat)
        arc.rotation.x = tiltX
        arc.rotation.y = tiltY
        return arc
      }
      root.add(makeArc(2.5, 0.2, Math.PI * 0.9,  0.8, 0.3,  0x059B8F, 0.15))
      root.add(makeArc(2.5, Math.PI, Math.PI * 1.85, -0.6, -0.4, 0x0A7C97, 0.12))
      root.add(makeArc(1.8, 0.4, Math.PI * 1.2,  -0.4, 0.7, 0x02BAB9, 0.18))

      // 6 — Particle cloud
      const N = 240
      const pPos: number[] = []
      const pCol: number[] = []
      const colA = new THREE.Color(0x059B8F)
      const colB = new THREE.Color(0x01B3BF)
      const colC = new THREE.Color(0xF18712)
      for (let i = 0; i < N; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 2.15 + Math.random() * 1.6  // shell between 2.15 and 3.75
        pPos.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
        const t = Math.random()
        const c = t < 0.6 ? colA.clone().lerp(colB, t / 0.6) : colB.clone().lerp(colC, (t - 0.6) / 0.4)
        pCol.push(c.r, c.g, c.b)
      }
      const ptGeo = new THREE.BufferGeometry()
      ptGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3))
      ptGeo.setAttribute('color', new THREE.Float32BufferAttribute(pCol, 3))
      const ptMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      })
      const pts = new THREE.Points(ptGeo, ptMat)
      scene.add(pts)  // particles in world space (slow drift independent of root)

      // 7 — Floating cross-section disc (like an MRI slice indicator)
      const discGeo = new THREE.RingGeometry(1.38, 1.42, 64)
      const discMat = new THREE.MeshBasicMaterial({ color: 0x059B8F, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
      const disc = new THREE.Mesh(discGeo, discMat)
      disc.rotation.x = Math.PI / 2
      root.add(disc)

      // ── Mouse tracking ───────────────────────────────────────────────────────
      let mouseX = 0, mouseY = 0
      let targetX = 0, targetY = 0
      function onMouse(e: MouseEvent) {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // ── Resize ───────────────────────────────────────────────────────────────
      function onResize() {
        if (!canvasRef.current) return
        const w = canvasRef.current.clientWidth
        const h = canvasRef.current.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      // ── Animate ──────────────────────────────────────────────────────────────
      let lastTime = 0
      function animate(now: number) {
        if (disposed) return
        animFrameId = requestAnimationFrame(animate)
        const dt = Math.min((now - lastTime) / 1000, 0.05)
        lastTime = now
        const t = now * 0.001

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.04
        targetY += (mouseY - targetY) * 0.04

        // Root group rotation — slow, organic
        root.rotation.y = t * 0.09  + targetX * 0.22
        root.rotation.x = t * 0.04  + targetY * 0.12
        root.rotation.z = t * 0.018

        // Mid sphere counter-rotates for parallax depth
        midSphere.rotation.y = -t * 0.14
        midSphere.rotation.z = 0.55 + Math.sin(t * 0.3) * 0.08

        // Inner core breathes (scale pulse)
        const breathe = 1 + Math.sin(t * 1.4) * 0.04
        innerSphere.scale.setScalar(breathe)

        // Disc MRI indicator tilts gently
        disc.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.12
        disc.rotation.z = t * 0.07

        // Particles drift independently
        pts.rotation.y = t * 0.04
        pts.rotation.x = Math.sin(t * 0.15) * 0.08

        // Camera gentle float
        camera.position.x += (targetX * 0.4  - camera.position.x) * 0.025
        camera.position.y += (-targetY * 0.25 - camera.position.y) * 0.025
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }
      requestAnimationFrame(animate)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('mousemove', onMouse)
        cancelAnimationFrame(animFrameId)
        renderer.dispose()
        disposed = true
      }
    }

    const cleanup = init()
    return () => { disposed = true; cleanup.then(fn => fn?.()) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
