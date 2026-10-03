import type * as THREE_TYPES from 'three'

/**
 * Procedural Medical Anatomical Human Skeleton & Implants for Three.js
 * Creates a smooth, anatomically-accurate human skeleton positioned exactly
 * within the coordinates of the 3D character avatar.
 */

export interface SkeletonBuildResult {
  skeletonGroup: THREE_TYPES.Group
  jointImplants: Record<string, THREE_TYPES.Group>
  jointBones: Record<string, THREE_TYPES.Group>
  skeletonMeshes: THREE_TYPES.Mesh[]
}

export function buildFullBodySkeleton(
  THREE: typeof import('three'),
  boneMap: Record<string, any>,
  characterGroup?: THREE_TYPES.Group
): SkeletonBuildResult {
  const skeletonGroup = new THREE.Group()
  skeletonGroup.name = 'FullBodySkeleton'

  const skeletonMeshes: THREE_TYPES.Mesh[] = []

  // ── High-Grade Medical Materials ──────────────────────────────────────────
  // Cortical bone ivory with realistic medical PBR response
  const boneMat = new THREE.MeshStandardMaterial({
    color: 0xfbf8ee,
    roughness: 0.35,
    metalness: 0.04,
    name: 'CorticalBoneIvory',
  })

  // Translucent articular cartilage (sky-cyan radiograph tint)
  const cartilageMat = new THREE.MeshStandardMaterial({
    color: 0x93e6fb,
    roughness: 0.18,
    metalness: 0.08,
    transparent: true,
    opacity: 0.82,
    name: 'ArticularCartilage',
  })

  // Surgical Grade Cobalt-Chrome (mirror finish)
  const coCrMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.94,
    roughness: 0.12,
    name: 'CobaltChromeImplant',
  })

  // Surgical Titanium (matte porous titanium)
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.84,
    roughness: 0.28,
    name: 'TitaniumAlloy',
  })

  // Medical UHMWPE Polyethylene (smooth milky polymer)
  const polyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.20,
    metalness: 0.02,
    transparent: true,
    opacity: 0.88,
    name: 'UHMWPE_Polymer',
  })

  // BIOLOX Ceramic (ceramic femoral head)
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xff8c42,
    roughness: 0.12,
    metalness: 0.10,
    name: 'CeramicHead',
  })

  const jointImplants: Record<string, THREE_TYPES.Group> = {}
  const jointBones: Record<string, THREE_TYPES.Group> = {}

  // Helper to query bone world position converted to characterGroup local coordinates
  function getBonePos(name: string, fallback: THREE_TYPES.Vector3): THREE_TYPES.Vector3 {
    const b = boneMap[name]
    if (!b || !characterGroup) return fallback.clone()
    const p = new THREE.Vector3()
    b.getWorldPosition(p)
    characterGroup.worldToLocal(p)
    return p
  }

  // ── 0. Anatomical Key Landmarks ───────────────────────────────────────────
  const headPos = getBonePos('Head', new THREE.Vector3(0, 0.65, 0.02))
  const neckPos = getBonePos('Neck', new THREE.Vector3(0, 0.52, -0.01))
  const spine2Pos = getBonePos('Spine2', new THREE.Vector3(0, 0.38, -0.02))
  const spine1Pos = getBonePos('Spine1', new THREE.Vector3(0, 0.24, -0.01))
  const spinePos = getBonePos('Spine', new THREE.Vector3(0, 0.12, 0.0))
  const hipsPos = getBonePos('Hips', new THREE.Vector3(0, 0.03, 0.0))

  const leftUpLeg = getBonePos('LeftUpLeg', new THREE.Vector3(0.10, 0.03, 0.0))
  const rightUpLeg = getBonePos('RightUpLeg', new THREE.Vector3(-0.10, 0.03, 0.0))
  const leftKnee = getBonePos('LeftLeg', new THREE.Vector3(0.10, -0.34, 0.02))
  const rightKnee = getBonePos('RightLeg', new THREE.Vector3(-0.10, -0.34, 0.02))
  const leftAnkle = getBonePos('LeftFoot', new THREE.Vector3(0.10, -0.78, 0.04))
  const rightAnkle = getBonePos('RightFoot', new THREE.Vector3(-0.10, -0.78, 0.04))

  const leftShoulder = getBonePos('LeftShoulder', new THREE.Vector3(0.14, 0.44, 0.0))
  const rightShoulder = getBonePos('RightShoulder', new THREE.Vector3(-0.14, 0.44, 0.0))
  const leftArm = getBonePos('LeftArm', new THREE.Vector3(0.22, 0.42, 0.0))
  const rightArm = getBonePos('RightArm', new THREE.Vector3(-0.22, 0.42, 0.0))
  const leftElbow = getBonePos('LeftForeArm', new THREE.Vector3(0.25, 0.14, 0.06))
  const rightElbow = getBonePos('RightForeArm', new THREE.Vector3(-0.25, 0.14, 0.06))
  const leftWrist = getBonePos('LeftHand', new THREE.Vector3(0.26, -0.14, 0.10))
  const rightWrist = getBonePos('RightHand', new THREE.Vector3(-0.26, -0.14, 0.10))

  // Utility to register meshes for clipping planes
  function addMesh(parent: THREE_TYPES.Group, mesh: THREE_TYPES.Mesh) {
    mesh.castShadow = true
    mesh.receiveShadow = true
    parent.add(mesh)
    skeletonMeshes.push(mesh)
    return mesh
  }

  // Utility to create a tubular bone segment between two 3D points
  function addCylinderSegment(
    parent: THREE_TYPES.Group,
    pA: THREE_TYPES.Vector3,
    pB: THREE_TYPES.Vector3,
    radiusTop: number,
    radiusBottom: number,
    mat: THREE_TYPES.Material
  ): THREE_TYPES.Mesh {
    const v = new THREE.Vector3().subVectors(pB, pA)
    const len = v.length()
    const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, Math.max(0.01, len), 16)
    const mesh = new THREE.Mesh(geo, mat)
    const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5)
    mesh.position.copy(mid)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize())
    return addMesh(parent, mesh)
  }

  // ── 1. SKULL & CRANIUM (Anatomical Neurocranium + Orbits + Mandible) ────────
  const skullGroup = new THREE.Group()
  skullGroup.name = 'Skull'

  // Cranial Vault (Neurocranium dome)
  const craniumGeo = new THREE.SphereGeometry(0.082, 24, 20)
  craniumGeo.scale(0.92, 1.15, 1.08)
  const cranium = new THREE.Mesh(craniumGeo, boneMat)
  cranium.position.set(headPos.x, headPos.y + 0.055, headPos.z - 0.01)
  addMesh(skullGroup, cranium)

  // Maxilla & Facial bridge
  const faceGeo = new THREE.CylinderGeometry(0.052, 0.038, 0.075, 16)
  faceGeo.scale(1.12, 1, 0.88)
  const face = new THREE.Mesh(faceGeo, boneMat)
  face.position.set(headPos.x, headPos.y - 0.01, headPos.z + 0.055)
  face.rotation.x = 0.12
  addMesh(skullGroup, face)

  // Orbital Cavities (Recessed Eye Sockets)
  ;[-0.032, 0.032].forEach((xSide) => {
    const orbitRingGeo = new THREE.TorusGeometry(0.016, 0.004, 10, 18)
    const orbitRing = new THREE.Mesh(orbitRingGeo, boneMat)
    orbitRing.position.set(headPos.x + xSide, headPos.y + 0.018, headPos.z + 0.068)
    addMesh(skullGroup, orbitRing)
  })

  // Mandible (Jawbone)
  const jawCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(headPos.x - 0.044, headPos.y - 0.015, headPos.z + 0.01),
    new THREE.Vector3(headPos.x - 0.036, headPos.y - 0.055, headPos.z + 0.05),
    new THREE.Vector3(headPos.x, headPos.y - 0.060, headPos.z + 0.068),
    new THREE.Vector3(headPos.x + 0.036, headPos.y - 0.055, headPos.z + 0.05),
    new THREE.Vector3(headPos.x + 0.044, headPos.y - 0.015, headPos.z + 0.01),
  ])
  const jaw = new THREE.Mesh(new THREE.TubeGeometry(jawCurve, 16, 0.007, 8, false), boneMat)
  addMesh(skullGroup, jaw)

  // Teeth rows
  ;[-0.035, -0.048].forEach((yOff) => {
    const teethGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.007, 14, 1, false, -Math.PI * 0.4, Math.PI * 0.8)
    const teeth = new THREE.Mesh(teethGeo, boneMat)
    teeth.position.set(headPos.x, headPos.y + yOff, headPos.z + 0.06)
    addMesh(skullGroup, teeth)
  })

  skeletonGroup.add(skullGroup)

  // ── 2. VERTEBRAL COLUMN & INTERVERTEBRAL DISCS (C1 to L5) ─────────────────
  const spineGroup = new THREE.Group()
  spineGroup.name = 'SpineColumn'

  // Spine anchor trajectory
  const spinePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(neckPos.x, neckPos.y, neckPos.z),
    new THREE.Vector3(spine2Pos.x, spine2Pos.y, spine2Pos.z),
    new THREE.Vector3(spine1Pos.x, spine1Pos.y, spine1Pos.z),
    new THREE.Vector3(spinePos.x, spinePos.y, spinePos.z),
    new THREE.Vector3(hipsPos.x, hipsPos.y, hipsPos.z),
  ])

  const numVertebrae = 22
  for (let v = 0; v < numVertebrae; v++) {
    const t = v / (numVertebrae - 1)
    const pt = spinePath.getPoint(t)
    const scale = 0.016 + t * 0.010 // grows wider down the spine

    // Vertebral body
    const bodyGeo = new THREE.CylinderGeometry(scale, scale, 0.012, 14)
    const body = new THREE.Mesh(bodyGeo, boneMat)
    body.position.set(pt.x, pt.y, pt.z)
    addMesh(spineGroup, body)

    // Intervertebral Cushion Disc
    if (v < numVertebrae - 1) {
      const discGeo = new THREE.CylinderGeometry(scale * 1.05, scale * 1.05, 0.004, 14)
      const disc = new THREE.Mesh(discGeo, cartilageMat)
      disc.position.set(pt.x, pt.y - 0.008, pt.z)
      addMesh(spineGroup, disc)
    }

    // Posterior Spinous Process
    const spinousGeo = new THREE.ConeGeometry(scale * 0.4, scale * 1.4, 6)
    const spinous = new THREE.Mesh(spinousGeo, boneMat)
    spinous.position.set(pt.x, pt.y, pt.z - scale * 0.9)
    spinous.rotation.x = -Math.PI / 2
    addMesh(spineGroup, spinous)

    // Bilateral Transverse Processes
    ;[-scale * 1.2, scale * 1.2].forEach((xSide) => {
      const transGeo = new THREE.BoxGeometry(0.012, 0.006, 0.008)
      const transMesh = new THREE.Mesh(transGeo, boneMat)
      transMesh.position.set(pt.x + xSide, pt.y, pt.z - scale * 0.3)
      addMesh(spineGroup, transMesh)
    })
  }

  // Spine Surgical PEEK Interbody Fusion Cage & Pedicle Fixation
  const spineImplant = new THREE.Group()
  spineImplant.name = 'SpineImplant'

  const cageGeo = new THREE.BoxGeometry(0.024, 0.012, 0.018)
  const cage = new THREE.Mesh(cageGeo, polyMat)
  cage.position.set(spinePos.x, spinePos.y, spinePos.z)
  spineImplant.add(cage)

  // Pedicle Screws & Titanium Rods (Left & Right)
  ;[-0.018, 0.018].forEach((xSide) => {
    const rodGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.045, 10)
    const rod = new THREE.Mesh(rodGeo, titaniumMat)
    rod.position.set(spinePos.x + xSide, spinePos.y, spinePos.z - 0.025)
    spineImplant.add(rod)

    for (let s = -1; s <= 1; s += 2) {
      const screwGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.022, 8)
      const screw = new THREE.Mesh(screwGeo, coCrMat)
      screw.position.set(spinePos.x + xSide, spinePos.y + s * 0.016, spinePos.z - 0.012)
      screw.rotation.x = Math.PI / 2
      spineImplant.add(screw)
    }
  })

  spineImplant.visible = false
  skeletonGroup.add(spineImplant)
  jointImplants['spine'] = spineImplant
  jointBones['spine'] = spineGroup
  skeletonGroup.add(spineGroup)

  // ── 3. THORAX: STERNUM & 10 PAIRS OF CURVED RIBS ──────────────────────────
  const thoraxGroup = new THREE.Group()
  thoraxGroup.name = 'ThoraxRibcage'

  // Sternum (Chest bone at anterior thorax)
  const sternumGeo = new THREE.BoxGeometry(0.034, 0.17, 0.012)
  const sternum = new THREE.Mesh(sternumGeo, boneMat)
  sternum.position.set(spine2Pos.x, spine2Pos.y - 0.02, spine2Pos.z + 0.14)
  addMesh(thoraxGroup, sternum)

  // 10 Anatomical Rib Pairs (Curved 3D splines wrapping from spine to sternum)
  for (let i = 0; i < 10; i++) {
    const frac = i / 9
    const yLevel = spine2Pos.y + 0.06 - i * 0.022
    const ribWidth = 0.095 + Math.sin(frac * Math.PI) * 0.052
    const ribDepth = 0.125 + Math.sin(frac * Math.PI) * 0.020

    ;[-1, 1].forEach((dir) => {
      const ribSpline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(spine2Pos.x, yLevel, spine2Pos.z - 0.01),
        new THREE.Vector3(spine2Pos.x + dir * (ribWidth * 0.55), yLevel + 0.005, spine2Pos.z + ribDepth * 0.2),
        new THREE.Vector3(spine2Pos.x + dir * ribWidth, yLevel - 0.005, spine2Pos.z + ribDepth * 0.6),
        new THREE.Vector3(spine2Pos.x + dir * (ribWidth * 0.6), yLevel - 0.020, spine2Pos.z + ribDepth * 0.95),
        new THREE.Vector3(spine2Pos.x + dir * 0.022, yLevel - 0.025, spine2Pos.z + 0.14),
      ])
      const ribMesh = new THREE.Mesh(
        new THREE.TubeGeometry(ribSpline, 18, 0.0042, 6, false),
        i > 6 ? cartilageMat : boneMat
      )
      addMesh(thoraxGroup, ribMesh)
    })
  }

  skeletonGroup.add(thoraxGroup)

  // ── 4. PELVIS & SACRUM (Pelvic Girdle & Hip Sockets) ──────────────────────
  const pelvisGroup = new THREE.Group()
  pelvisGroup.name = 'Pelvis'

  // Sacrum & Coccyx
  const sacrumGeo = new THREE.ConeGeometry(0.042, 0.09, 8)
  const sacrum = new THREE.Mesh(sacrumGeo, boneMat)
  sacrum.position.set(hipsPos.x, hipsPos.y + 0.01, hipsPos.z - 0.04)
  sacrum.rotation.x = Math.PI
  addMesh(pelvisGroup, sacrum)

  // Bilateral Iliac Wings & Acetabular Sockets
  ;[-1, 1].forEach((dir) => {
    // Broad flaring iliac crest
    const iliumGeo = new THREE.CylinderGeometry(0.082, 0.055, 0.09, 14, 1, false, 0, Math.PI * 0.7)
    const ilium = new THREE.Mesh(iliumGeo, boneMat)
    ilium.position.set(hipsPos.x + dir * 0.065, hipsPos.y + 0.03, hipsPos.z - 0.01)
    ilium.rotation.y = dir > 0 ? -0.4 : Math.PI - 0.4
    ilium.rotation.z = dir * 0.2
    addMesh(pelvisGroup, ilium)

    // Acetabulum Socket Cup (houses the femoral head)
    const acetabulumGeo = new THREE.SphereGeometry(0.030, 16, 16, 0, Math.PI)
    const acetabulum = new THREE.Mesh(acetabulumGeo, boneMat)
    acetabulum.position.set(dir > 0 ? leftUpLeg.x : rightUpLeg.x, leftUpLeg.y, leftUpLeg.z)
    acetabulum.rotation.y = dir * Math.PI * 0.5
    addMesh(pelvisGroup, acetabulum)

    // Pubic & Ischial rings
    const pubicGeo = new THREE.TorusGeometry(0.024, 0.006, 8, 12)
    const pubic = new THREE.Mesh(pubicGeo, boneMat)
    pubic.position.set(hipsPos.x + dir * 0.038, hipsPos.y - 0.045, hipsPos.z + 0.03)
    addMesh(pelvisGroup, pubic)
  })

  skeletonGroup.add(pelvisGroup)

  // ── 5. LOWER EXTREMITIES (FEMURS, KNEES, TIBIAE, FIBULAE, ANKLES, FEET) ────
  const legPairs = [
    { side: 'Left', upLeg: leftUpLeg, knee: leftKnee, ankle: leftAnkle, isFocus: true },
    { side: 'Right', upLeg: rightUpLeg, knee: rightKnee, ankle: rightAnkle, isFocus: false },
  ]

  legPairs.forEach(({ side, upLeg, knee, ankle, isFocus }) => {
    const isLeft = side === 'Left'
    const xDir = isLeft ? 1 : -1

    const legGroup = new THREE.Group()
    legGroup.name = `${side}LegSkeleton`

    // ── FEMUR ──
    // Femoral Head (Ball in acetabulum)
    const fHead = new THREE.Mesh(new THREE.SphereGeometry(0.026, 20, 20), boneMat)
    fHead.position.copy(upLeg)
    addMesh(legGroup, fHead)

    const fCart = new THREE.Mesh(new THREE.SphereGeometry(0.0265, 18, 18), cartilageMat)
    fCart.position.copy(upLeg)
    addMesh(legGroup, fCart)

    // Femoral Neck (Angled from head to greater trochanter)
    const trochanterPos = new THREE.Vector3(upLeg.x + xDir * 0.038, upLeg.y - 0.025, upLeg.z)
    addCylinderSegment(legGroup, upLeg, trochanterPos, 0.013, 0.016, boneMat)

    // Greater Trochanter
    const trochanter = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.036, 0.030), boneMat)
    trochanter.position.copy(trochanterPos)
    addMesh(legGroup, trochanter)

    // Femoral Shaft (Strong cortical tube)
    addCylinderSegment(legGroup, trochanterPos, knee, 0.018, 0.022, boneMat)

    // Distal Femoral Bicondyles at Knee (Medial & Lateral condyles)
    ;[-0.020, 0.020].forEach((cSide) => {
      const condyle = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), boneMat)
      condyle.position.set(knee.x + cSide, knee.y, knee.z - 0.008)
      condyle.scale.set(1, 1.25, 1.4)
      addMesh(legGroup, condyle)

      const cCart = new THREE.Mesh(new THREE.SphereGeometry(0.0225, 16, 16), cartilageMat)
      cCart.position.set(knee.x + cSide, knee.y, knee.z - 0.008)
      cCart.scale.set(1, 1.25, 1.4)
      addMesh(legGroup, cCart)
    })

    // Patella (Kneecap)
    const patella = new THREE.Mesh(new THREE.SphereGeometry(0.019, 16, 16), boneMat)
    patella.scale.set(1, 1.2, 0.55)
    patella.position.set(knee.x, knee.y + 0.015, knee.z + 0.038)
    addMesh(legGroup, patella)

    // ── TIBIA & FIBULA ──
    // Tibial Plateau (Articular plateau directly beneath femoral condyles)
    const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.028, 0.020, 18), boneMat)
    plateau.position.set(knee.x, knee.y - 0.016, knee.z)
    addMesh(legGroup, plateau)

    // Meniscus Rings (Fibrocartilage shock absorbers)
    const meniscus = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.005, 8, 18), cartilageMat)
    meniscus.rotation.x = Math.PI / 2
    meniscus.position.set(knee.x, knee.y - 0.008, knee.z)
    addMesh(legGroup, meniscus)

    // Tibia Shaft (Main weight-bearing shin bone)
    addCylinderSegment(legGroup, new THREE.Vector3(knee.x, knee.y - 0.016, knee.z), ankle, 0.018, 0.014, boneMat)

    // Fibula Shaft (Slender lateral stabilizer bone)
    const fibulaStart = new THREE.Vector3(knee.x + xDir * 0.030, knee.y - 0.025, knee.z - 0.005)
    const fibulaEnd = new THREE.Vector3(ankle.x + xDir * 0.024, ankle.y, ankle.z)
    addCylinderSegment(legGroup, fibulaStart, fibulaEnd, 0.007, 0.007, boneMat)

    // Medial & Lateral Malleoli (Ankle mortise)
    const medMall = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.026, 0.022), boneMat)
    medMall.position.set(ankle.x - xDir * 0.016, ankle.y, ankle.z)
    addMesh(legGroup, medMall)

    const latMall = new THREE.Mesh(new THREE.SphereGeometry(0.013, 12, 12), boneMat)
    latMall.position.set(ankle.x + xDir * 0.024, ankle.y, ankle.z)
    addMesh(legGroup, latMall)

    // ── FOOT (Talus, Calcaneus heel, Metatarsals) ──
    const footGroup = new THREE.Group()
    const talus = new THREE.Mesh(new THREE.SphereGeometry(0.020, 14, 14), boneMat)
    talus.position.set(ankle.x, ankle.y - 0.018, ankle.z + 0.015)
    addMesh(footGroup, talus)

    const calcaneus = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.030, 0.065), boneMat)
    calcaneus.position.set(ankle.x, ankle.y - 0.028, ankle.z - 0.035)
    addMesh(footGroup, calcaneus)

    for (let m = -2; m <= 2; m++) {
      const ray = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.075, 8), boneMat)
      ray.position.set(ankle.x + m * 0.008, ankle.y - 0.040, ankle.z + 0.065)
      ray.rotation.x = Math.PI / 2
      addMesh(footGroup, ray)
    }
    legGroup.add(footGroup)

    skeletonGroup.add(legGroup)

    // Attach joint references for focus
    if (isLeft) {
      jointBones['knee'] = legGroup
      jointBones['hip'] = legGroup
      jointBones['ankle'] = legGroup

      // Knee Arthroplasty Surgical Implant (Cobalt-Chrome shield + PE insert + Titanium tray)
      const kneeImplant = new THREE.Group()
      kneeImplant.name = 'KneeImplant'

      // Femoral shield
      const shieldGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.048, 16, 1, false, 0, Math.PI)
      const shield = new THREE.Mesh(shieldGeo, coCrMat)
      shield.position.set(knee.x, knee.y, knee.z)
      shield.rotation.z = Math.PI / 2
      kneeImplant.add(shield)

      // UHMWPE Polyethylene insert
      const poly = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.008, 16), polyMat)
      poly.position.set(knee.x, knee.y - 0.014, knee.z)
      kneeImplant.add(poly)

      // Titanium Tibial Baseplate
      const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.007, 16), titaniumMat)
      tray.position.set(knee.x, knee.y - 0.022, knee.z)
      kneeImplant.add(tray)

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.004, 0.045, 12), titaniumMat)
      stem.position.set(knee.x, knee.y - 0.045, knee.z)
      kneeImplant.add(stem)

      kneeImplant.visible = false
      skeletonGroup.add(kneeImplant)
      jointImplants['knee'] = kneeImplant
      jointImplants['knee_femur'] = kneeImplant

      // Hip Total Arthroplasty Implant (Titanium stem + BIOLOX Ceramic head)
      const hipImplant = new THREE.Group()
      hipImplant.name = 'HipImplant'

      const ceramicHead = new THREE.Mesh(new THREE.SphereGeometry(0.028, 20, 20), ceramicMat)
      ceramicHead.position.copy(upLeg)
      hipImplant.add(ceramicHead)

      const hipStem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.008, 0.17, 12), titaniumMat)
      hipStem.position.set(upLeg.x + 0.020, upLeg.y - 0.09, upLeg.z)
      hipStem.rotation.z = -0.15
      hipImplant.add(hipStem)

      hipImplant.visible = false
      skeletonGroup.add(hipImplant)
      jointImplants['hip'] = hipImplant

      // Ankle Fixation Plate & Locking Screws
      const ankleImplant = new THREE.Group()
      ankleImplant.name = 'AnkleImplant'

      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.075, 0.004), titaniumMat)
      plate.position.set(ankle.x + 0.026, ankle.y + 0.04, ankle.z)
      ankleImplant.add(plate)

      for (let s = 0; s < 3; s++) {
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.022, 8), coCrMat)
        screw.position.set(ankle.x + 0.016, ankle.y + 0.02 + s * 0.022, ankle.z)
        screw.rotation.z = Math.PI / 2
        ankleImplant.add(screw)
      }

      ankleImplant.visible = false
      skeletonGroup.add(ankleImplant)
      jointImplants['ankle'] = ankleImplant
    }
  })

  // ── 6. UPPER EXTREMITIES (CLAVICLES, SCAPULAE, HUMERUS, FOREARM, HANDS) ────
  const armPairs = [
    { side: 'Left', shoulder: leftShoulder, arm: leftArm, elbow: leftElbow, wrist: leftWrist },
    { side: 'Right', shoulder: rightShoulder, arm: rightArm, elbow: rightElbow, wrist: rightWrist },
  ]

  armPairs.forEach(({ side, shoulder, arm, elbow, wrist }) => {
    const isLeft = side === 'Left'
    const xDir = isLeft ? 1 : -1

    const armGroup = new THREE.Group()
    armGroup.name = `${side}ArmSkeleton`

    // Clavicle (S-curved collarbone)
    const clavCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(spine2Pos.x + xDir * 0.015, spine2Pos.y + 0.06, spine2Pos.z + 0.12),
      new THREE.Vector3(spine2Pos.x + xDir * 0.07, spine2Pos.y + 0.07, spine2Pos.z + 0.08),
      new THREE.Vector3(shoulder.x, shoulder.y, shoulder.z),
    ])
    const clavicle = new THREE.Mesh(new THREE.TubeGeometry(clavCurve, 12, 0.006, 8, false), boneMat)
    addMesh(armGroup, clavicle)

    // Scapula (Shoulder blade plate behind the ribcage)
    const scapulaGeo = new THREE.CylinderGeometry(0.045, 0.018, 0.11, 8)
    scapulaGeo.scale(1, 1, 0.25)
    const scapula = new THREE.Mesh(scapulaGeo, boneMat)
    scapula.position.set(shoulder.x - xDir * 0.04, shoulder.y - 0.05, shoulder.z - 0.04)
    addMesh(armGroup, scapula)

    // Humeral Head (Shoulder ball)
    const hHead = new THREE.Mesh(new THREE.SphereGeometry(0.027, 18, 18), boneMat)
    hHead.position.copy(arm)
    addMesh(armGroup, hHead)

    const hCart = new THREE.Mesh(new THREE.SphereGeometry(0.0275, 18, 18), cartilageMat)
    hCart.position.copy(arm)
    addMesh(armGroup, hCart)

    // Humerus Shaft
    addCylinderSegment(armGroup, arm, elbow, 0.015, 0.013, boneMat)

    // Elbow Epicondyles
    const epicondyle = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.020, 0.022), boneMat)
    epicondyle.position.copy(elbow)
    addMesh(armGroup, epicondyle)

    // Forearm: Radius & Ulna
    const olecranon = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.026, 0.022), boneMat)
    olecranon.position.set(elbow.x, elbow.y, elbow.z - 0.010)
    addMesh(armGroup, olecranon)

    // Dual Forearm shafts
    const ulnaEnd = new THREE.Vector3(wrist.x - xDir * 0.010, wrist.y, wrist.z)
    const radiusEnd = new THREE.Vector3(wrist.x + xDir * 0.012, wrist.y, wrist.z)
    addCylinderSegment(armGroup, elbow, ulnaEnd, 0.009, 0.007, boneMat)
    addCylinderSegment(armGroup, elbow, radiusEnd, 0.008, 0.010, boneMat)

    // Carpal Wrist Cluster & Hand Bones
    const handGroup = new THREE.Group()
    const carpal = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.022, 0.014), boneMat)
    carpal.position.copy(wrist)
    addMesh(handGroup, carpal)

    for (let f = -2; f <= 2; f++) {
      const phalanx = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.003, 0.065, 8), boneMat)
      phalanx.position.set(wrist.x + f * 0.006, wrist.y - 0.040, wrist.z + 0.01)
      addMesh(handGroup, phalanx)
    }
    armGroup.add(handGroup)

    skeletonGroup.add(armGroup)

    if (isLeft) {
      jointBones['shoulder'] = armGroup
      jointBones['elbow'] = armGroup

      // Shoulder Rotator Cuff Titanium Anchor Screws
      const shoulderImplant = new THREE.Group()
      shoulderImplant.name = 'ShoulderImplant'

      const anchor1 = new THREE.Mesh(new THREE.ConeGeometry(0.005, 0.018, 8), titaniumMat)
      anchor1.position.set(arm.x + 0.025, arm.y + 0.015, arm.z + 0.01)
      anchor1.rotation.z = -0.5
      shoulderImplant.add(anchor1)

      const anchor2 = new THREE.Mesh(new THREE.ConeGeometry(0.005, 0.018, 8), titaniumMat)
      anchor2.position.set(arm.x - 0.022, arm.y + 0.015, arm.z + 0.01)
      anchor2.rotation.z = 0.5
      shoulderImplant.add(anchor2)

      shoulderImplant.visible = false
      skeletonGroup.add(shoulderImplant)
      jointImplants['shoulder'] = shoulderImplant

      // Elbow Surgical Locking Compression Plate
      const elbowImplant = new THREE.Group()
      elbowImplant.name = 'ElbowImplant'

      const ePlate = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.075, 0.004), titaniumMat)
      ePlate.position.set(elbow.x, elbow.y + 0.02, elbow.z - 0.014)
      elbowImplant.add(ePlate)

      for (let s = 0; s < 3; s++) {
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.018, 8), coCrMat)
        screw.position.set(elbow.x, elbow.y + s * 0.022, elbow.z - 0.006)
        screw.rotation.x = Math.PI / 2
        elbowImplant.add(screw)
      }

      elbowImplant.visible = false
      skeletonGroup.add(elbowImplant)
      jointImplants['elbow'] = elbowImplant
    }
  })

  // By default, skeleton is visible in scanner/skeleton modes
  skeletonGroup.visible = false

  return {
    skeletonGroup,
    jointImplants,
    jointBones,
    skeletonMeshes,
  }
}
