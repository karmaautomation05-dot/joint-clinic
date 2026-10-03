'use client'

import { useEffect, useRef } from 'react'

export default function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animFrameId: number
    let three: typeof import('three') | null = null

    async function init() {
      if (!canvasRef.current) return
      three = await import('three')
      const { Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, Float32BufferAttribute,
              PointsMaterial, Points, SphereGeometry,
              LineSegments, EdgesGeometry, LineBasicMaterial, Color,
              AdditiveBlending } = three

      const canvas = canvasRef.current
      const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      const scene = new Scene()
      const camera = new PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
      camera.position.set(0, 0, 6)

      // ── Outer wireframe sphere (joint ball)
      const sphereGeo = new SphereGeometry(1.8, 18, 12)
      const edgesGeo = new EdgesGeometry(sphereGeo)
      const wireMat = new LineBasicMaterial({ color: 0x059B8F, transparent: true, opacity: 0.18 })
      const wireSphere = new LineSegments(edgesGeo, wireMat)
      scene.add(wireSphere)

      // ── Inner wireframe sphere (smaller, different axis)
      const innerGeo = new SphereGeometry(1.1, 12, 8)
      const innerEdges = new EdgesGeometry(innerGeo)
      const innerMat = new LineBasicMaterial({ color: 0x0A7C97, transparent: true, opacity: 0.14 })
      const innerWire = new LineSegments(innerEdges, innerMat)
      innerWire.rotation.z = 0.7
      scene.add(innerWire)

      // ── Floating dot cloud (particles)
      const particleCount = 180
      const positions: number[] = []
      const colors: number[] = []
      const tealColor = new Color(0x059B8F)
      const aquaColor = new Color(0x01B3BF)
      for (let i = 0; i < particleCount; i++) {
        // Random points on sphere surface
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 1.9 + Math.random() * 1.2
        positions.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
        const mix = Math.random()
        const c = tealColor.clone().lerp(aquaColor, mix)
        colors.push(c.r, c.g, c.b)
      }
      const ptGeo = new BufferGeometry()
      ptGeo.setAttribute('position', new Float32BufferAttribute(positions, 3))
      ptGeo.setAttribute('color', new Float32BufferAttribute(colors, 3))
      const ptMat = new PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: AdditiveBlending,
        depthWrite: false,
      })
      const particles = new Points(ptGeo, ptMat)
      scene.add(particles)

      // ── Axis rings (equatorial + polar)
      function makeRing(radius: number, axis: 'x' | 'y' | 'z', color: number, opacity: number) {
        const seg = 64
        const positions: number[] = []
        for (let i = 0; i <= seg; i++) {
          const a = (i / seg) * Math.PI * 2
          if (axis === 'z') positions.push(Math.cos(a) * radius, Math.sin(a) * radius, 0)
          if (axis === 'x') positions.push(0, Math.cos(a) * radius, Math.sin(a) * radius)
          if (axis === 'y') positions.push(Math.cos(a) * radius, 0, Math.sin(a) * radius)
        }
        const rGeo = new BufferGeometry()
        rGeo.setAttribute('position', new Float32BufferAttribute(positions, 3))
        const rMat = new LineBasicMaterial({ color, transparent: true, opacity })
        return new LineSegments(rGeo, rMat)
      }
      scene.add(makeRing(1.8, 'z', 0x059B8F, 0.35))
      scene.add(makeRing(1.8, 'x', 0x0A7C97, 0.25))
      scene.add(makeRing(1.2, 'y', 0x02BAB9, 0.20))

      // ── Resize handler
      function onResize() {
        if (!canvasRef.current) return
        const w = canvasRef.current.clientWidth
        const h = canvasRef.current.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)
      onResize()

      // ── Mouse parallax
      let mouseX = 0, mouseY = 0
      function onMouse(e: MouseEvent) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // ── Animate
      function animate() {
        animFrameId = requestAnimationFrame(animate)
        const t = Date.now() * 0.001
        wireSphere.rotation.y = t * 0.08 + mouseX * 0.15
        wireSphere.rotation.x = t * 0.04 + mouseY * 0.08
        innerWire.rotation.y = -t * 0.12 + mouseX * 0.10
        innerWire.rotation.x = t * 0.06
        particles.rotation.y = t * 0.06
        particles.rotation.z = t * 0.02
        // Subtle camera sway
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03
        camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.03
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }
      animate()

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('mousemove', onMouse)
        cancelAnimationFrame(animFrameId)
        renderer.dispose()
      }
    }

    const cleanup = init()
    return () => { cleanup.then(fn => fn?.()) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
