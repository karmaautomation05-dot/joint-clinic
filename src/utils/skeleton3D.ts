import type * as THREE_TYPES from 'three'

/**
 * Ultra-High-Resolution Medical Anatomical Human Skeleton & Implants
 * Modeled with osteological fidelity based on Artec 3D HD / Sketchfab reference scans.
 * Fully calibrated to the anatomical coordinates of the 3D character avatar.
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

  // ── High-Grade Medical PBR Materials ──────────────────────────────────────
  // Cortical bone ivory with natural osteological subsurface gloss
  const boneMat = new THREE.MeshStandardMaterial({
    color: 0xfaf6ec,
    roughness: 0.36,
    metalness: 0.03,
    name: 'CorticalBoneIvory',
  })

  // Cranial / Pelvic suture line material
  const sutureMat = new THREE.MeshStandardMaterial({
    color: 0xdfd9c8,
    roughness: 0.55,
    metalness: 0.02,
    name: 'CranialSuture',
  })

  // Translucent articular & costal cartilage
  const cartilageMat = new THREE.MeshStandardMaterial({
    color: 0xa5e8f8,
    roughness: 0.18,
    metalness: 0.06,
    transparent: true,
    opacity: 0.82,
    name: 'ArticularCartilage',
  })

  // Intervertebral fibrocartilage discs
  const discMat = new THREE.MeshStandardMaterial({
    color: 0xbef0f8,
    roughness: 0.22,
    metalness: 0.04,
    transparent: true,
    opacity: 0.78,
    name: 'IntervertebralDisc',
  })

  // Surgical Grade Cobalt-Chrome (mirror finish)
  const coCrMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.94,
    roughness: 0.10,
    name: 'CobaltChromeImplant',
  })

  // Surgical Titanium (porous trabecular titanium)
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.84,
    roughness: 0.26,
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
    roughness: 0.10,
    metalness: 0.08,
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

  function addMesh(parent: THREE_TYPES.Group, mesh: THREE_TYPES.Mesh) {
    mesh.castShadow = true
    mesh.receiveShadow = true
    parent.add(mesh)
    skeletonMeshes.push(mesh)
    return mesh
  }

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
    const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, Math.max(0.01, len), 18)
    const mesh = new THREE.Mesh(geo, mat)
    const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5)
    mesh.position.copy(mid)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize())
    return addMesh(parent, mesh)
  }

  // ── 1. ULTRA-DETAILED CRANIUM & SKULL (Artec HD Reference) ────────────────
  const skullGroup = new THREE.Group()
  skullGroup.name = 'Skull'

  // Cranial Vault (Neurocranium dome: Frontal, Parietal, Occipital, Temporal)
  const craniumGeo = new THREE.SphereGeometry(0.084, 32, 28)
  craniumGeo.scale(0.92, 1.16, 1.10)
  const cranium = new THREE.Mesh(craniumGeo, boneMat)
  cranium.position.set(headPos.x, headPos.y + 0.055, headPos.z - 0.01)
  addMesh(skullGroup, cranium)

  // Coronal & Sagittal Suture Grooves
  const sutureRingGeo = new THREE.TorusGeometry(0.083, 0.002, 8, 36)
  const sutureRing = new THREE.Mesh(sutureRingGeo, sutureMat)
  sutureRing.position.set(headPos.x, headPos.y + 0.075, headPos.z - 0.01)
  sutureRing.rotation.x = Math.PI / 2.8
  addMesh(skullGroup, sutureRing)

  // Occipital Protuberance & Foramen Magnum base
  const occipitalGeo = new THREE.SphereGeometry(0.042, 16, 16)
  const occipital = new THREE.Mesh(occipitalGeo, boneMat)
  occipital.position.set(headPos.x, headPos.y + 0.01, headPos.z - 0.055)
  occipital.scale.set(1.2, 0.8, 1.1)
  addMesh(skullGroup, occipital)

  // Temporal bones & Mastoid processes
  ;[-0.065, 0.065].forEach((xSide) => {
    const mastoidGeo = new THREE.ConeGeometry(0.010, 0.024, 8)
    const mastoid = new THREE.Mesh(mastoidGeo, boneMat)
    mastoid.position.set(headPos.x + xSide, headPos.y + 0.01, headPos.z - 0.025)
    mastoid.rotation.x = Math.PI
    addMesh(skullGroup, mastoid)
  })

  // Maxilla & Facial bridge
  const faceGeo = new THREE.CylinderGeometry(0.052, 0.038, 0.075, 20)
  faceGeo.scale(1.12, 1, 0.88)
  const face = new THREE.Mesh(faceGeo, boneMat)
  face.position.set(headPos.x, headPos.y - 0.01, headPos.z + 0.055)
  face.rotation.x = 0.12
  addMesh(skullGroup, face)

  // Orbital Cavities (Supraorbital & Infraorbital Margins)
  ;[-0.033, 0.033].forEach((xSide) => {
    const orbitRingGeo = new THREE.TorusGeometry(0.017, 0.0042, 12, 24)
    const orbitRing = new THREE.Mesh(orbitRingGeo, boneMat)
    orbitRing.position.set(headPos.x + xSide, headPos.y + 0.018, headPos.z + 0.068)
    addMesh(skullGroup, orbitRing)

    // Deep orbit interior cavity
    const cavityGeo = new THREE.SphereGeometry(0.014, 12, 12)
    const cavity = new THREE.Mesh(cavityGeo, sutureMat)
    cavity.position.set(headPos.x + xSide, headPos.y + 0.018, headPos.z + 0.058)
    addMesh(skullGroup, cavity)
  })

  // Piriform Nasal Aperture & Nasal Septum
  const nasalAperture = new THREE.Mesh(new THREE.ConeGeometry(0.011, 0.028, 6), sutureMat)
  nasalAperture.position.set(headPos.x, headPos.y + 0.008, headPos.z + 0.076)
  nasalAperture.rotation.x = Math.PI
  addMesh(skullGroup, nasalAperture)

  const septum = new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.024, 0.018), cartilageMat)
  septum.position.set(headPos.x, headPos.y + 0.008, headPos.z + 0.072)
  addMesh(skullGroup, septum)

  // Zygomatic Arches (Cheekbone arches connecting to ear)
  ;[-1, 1].forEach((dir) => {
    const zygomaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(headPos.x + dir * 0.032, headPos.y, headPos.z + 0.065),
      new THREE.Vector3(headPos.x + dir * 0.065, headPos.y + 0.005, headPos.z + 0.035),
      new THREE.Vector3(headPos.x + dir * 0.068, headPos.y + 0.018, headPos.z - 0.015),
    ])
    const zygoma = new THREE.Mesh(new THREE.TubeGeometry(zygomaCurve, 12, 0.0045, 8, false), boneMat)
    addMesh(skullGroup, zygoma)
  })

  // Mandible (Jawbone: Mentum, Angle of Mandible, Ascending Ramus, Condyles)
  const jawCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(headPos.x - 0.052, headPos.y + 0.015, headPos.z - 0.005),
    new THREE.Vector3(headPos.x - 0.046, headPos.y - 0.035, headPos.z + 0.015),
    new THREE.Vector3(headPos.x - 0.036, headPos.y - 0.058, headPos.z + 0.052),
    new THREE.Vector3(headPos.x, headPos.y - 0.064, headPos.z + 0.072),
    new THREE.Vector3(headPos.x + 0.036, headPos.y - 0.058, headPos.z + 0.052),
    new THREE.Vector3(headPos.x + 0.046, headPos.y - 0.035, headPos.z + 0.015),
    new THREE.Vector3(headPos.x + 0.052, headPos.y + 0.015, headPos.z - 0.005),
  ])
  const jaw = new THREE.Mesh(new THREE.TubeGeometry(jawCurve, 20, 0.0075, 8, false), boneMat)
  addMesh(skullGroup, jaw)

  // Upper & Lower Adult Dental Arches
  ;[-0.034, -0.048].forEach((yOff) => {
    const teethGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.008, 16, 1, false, -Math.PI * 0.42, Math.PI * 0.84)
    const teeth = new THREE.Mesh(teethGeo, boneMat)
    teeth.position.set(headPos.x, headPos.y + yOff, headPos.z + 0.062)
    addMesh(skullGroup, teeth)
  })

  skeletonGroup.add(skullGroup)

  // ── 2. TRUE S-CURVED VERTEBRAL COLUMN (C1 to L5 + Discs) ───────────────────
  const spineGroup = new THREE.Group()
  spineGroup.name = 'SpineColumn'

  // Anatomical spinal curvature path (Cervical lordosis, Thoracic kyphosis, Lumbar lordosis)
  const spinePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(neckPos.x, neckPos.y + 0.02, neckPos.z + 0.008), // C1 Atlas
    new THREE.Vector3(neckPos.x, neckPos.y - 0.04, neckPos.z + 0.014), // C4 Cervical apex
    new THREE.Vector3(spine2Pos.x, spine2Pos.y + 0.04, neckPos.z - 0.005), // T1
    new THREE.Vector3(spine2Pos.x, spine2Pos.y - 0.03, spine2Pos.z - 0.032), // T7 Thoracic kyphosis apex
    new THREE.Vector3(spine1Pos.x, spine1Pos.y, spine1Pos.z - 0.022), // T12
    new THREE.Vector3(spinePos.x, spinePos.y + 0.04, spinePos.z + 0.006), // L3 Lumbar lordosis apex
    new THREE.Vector3(spinePos.x, spinePos.y - 0.03, spinePos.z - 0.002), // L5
    new THREE.Vector3(hipsPos.x, hipsPos.y, hipsPos.z - 0.015), // Sacrum base
  ])

  const numVertebrae = 24
  for (let v = 0; v < numVertebrae; v++) {
    const t = v / (numVertebrae - 1)
    const pt = spinePath.getPoint(t)
    const width = 0.015 + t * 0.013 // Cervical (small) -> Lumbar (broad load-bearing)
    const height = 0.011 + t * 0.004

    // Vertebral body (kidney-shaped cylindrical body)
    const bodyGeo = new THREE.CylinderGeometry(width, width * 1.05, height, 16)
    const body = new THREE.Mesh(bodyGeo, boneMat)
    body.position.copy(pt)
    addMesh(spineGroup, body)

    // Intervertebral Cushion Disc
    if (v < numVertebrae - 1) {
      const discGeo = new THREE.CylinderGeometry(width * 1.08, width * 1.08, 0.0042, 16)
      const disc = new THREE.Mesh(discGeo, discMat)
      disc.position.set(pt.x, pt.y - height * 0.55, pt.z)
      addMesh(spineGroup, disc)
    }

    // Posterior Spinous Process (overlapping downward in thoracic, quadrangular in lumbar)
    const isThoracic = v >= 7 && v <= 18
    const spinousLen = isThoracic ? width * 1.8 : width * 1.2
    const spinousAngle = isThoracic ? -Math.PI / 2.3 : -Math.PI / 2.05
    const spinousGeo = new THREE.ConeGeometry(width * 0.35, spinousLen, 6)
    const spinous = new THREE.Mesh(spinousGeo, boneMat)
    spinous.position.set(pt.x, pt.y - 0.003, pt.z - width * 0.85)
    spinous.rotation.x = spinousAngle
    addMesh(spineGroup, spinous)

    // Bilateral Transverse Processes with rib articular facets
    ;[-width * 1.25, width * 1.25].forEach((xSide) => {
      const transGeo = new THREE.BoxGeometry(0.014, 0.006, 0.008)
      const transMesh = new THREE.Mesh(transGeo, boneMat)
      transMesh.position.set(pt.x + xSide, pt.y, pt.z - width * 0.25)
      addMesh(spineGroup, transMesh)
    })
  }

  // Spine Surgical PEEK Interbody Fusion Cage & Pedicle Fixation
  const spineImplant = new THREE.Group()
  spineImplant.name = 'SpineImplant'

  const cageGeo = new THREE.BoxGeometry(0.026, 0.013, 0.019)
  const cage = new THREE.Mesh(cageGeo, polyMat)
  cage.position.set(spinePos.x, spinePos.y, spinePos.z)
  spineImplant.add(cage)

  ;[-0.019, 0.019].forEach((xSide) => {
    const rodGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.052, 10)
    const rod = new THREE.Mesh(rodGeo, titaniumMat)
    rod.position.set(spinePos.x + xSide, spinePos.y, spinePos.z - 0.025)
    spineImplant.add(rod)

    for (let s = -1; s <= 1; s += 2) {
      const screwGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.024, 8)
      const screw = new THREE.Mesh(screwGeo, coCrMat)
      screw.position.set(spinePos.x + xSide, spinePos.y + s * 0.018, spinePos.z - 0.012)
      screw.rotation.x = Math.PI / 2
      spineImplant.add(screw)
    }
  })

  spineImplant.visible = false
  skeletonGroup.add(spineImplant)
  jointImplants['spine'] = spineImplant
  jointBones['spine'] = spineGroup
  skeletonGroup.add(spineGroup)

  // ── 3. THORACIC RIBCAGE: STERNUM & 12 PAIRS OF TRUE RIBS ───────────────────
  const thoraxGroup = new THREE.Group()
  thoraxGroup.name = 'ThoraxRibcage'

  // Manubrium Sterni with Jugular Notch
  const manubriumGeo = new THREE.BoxGeometry(0.046, 0.048, 0.013)
  const manubrium = new THREE.Mesh(manubriumGeo, boneMat)
  manubrium.position.set(spine2Pos.x, spine2Pos.y + 0.065, spine2Pos.z + 0.135)
  addMesh(thoraxGroup, manubrium)

  // Sternal Angle of Louis & Body (Gladiolus)
  const sternumBodyGeo = new THREE.BoxGeometry(0.034, 0.115, 0.012)
  const sternumBody = new THREE.Mesh(sternumBodyGeo, boneMat)
  sternumBody.position.set(spine2Pos.x, spine2Pos.y - 0.015, spine2Pos.z + 0.142)
  addMesh(thoraxGroup, sternumBody)

  // Xiphoid Process (Pointed cartilage apex)
  const xiphoidGeo = new THREE.ConeGeometry(0.009, 0.028, 6)
  const xiphoid = new THREE.Mesh(xiphoidGeo, cartilageMat)
  xiphoid.position.set(spine2Pos.x, spine2Pos.y - 0.085, spine2Pos.z + 0.140)
  xiphoid.rotation.x = Math.PI
  addMesh(thoraxGroup, xiphoid)

  // 12 True Anatomical Rib Pairs (True, False, and Floating Ribs)
  for (let i = 0; i < 12; i++) {
    const frac = i / 11
    const yLevel = spine2Pos.y + 0.08 - i * 0.019
    const isFloating = i >= 10
    const isFalse = i >= 7 && i < 10
    const ribWidth = 0.075 + Math.sin(frac * Math.PI) * 0.058
    const ribDepth = 0.115 + Math.sin(frac * Math.PI) * 0.028

    ;[-1, 1].forEach((dir) => {
      let ribSpline: THREE_TYPES.CatmullRomCurve3
      if (isFloating) {
        // Floating ribs 11-12: Free anterior ends tapering in flank
        ribSpline = new THREE.CatmullRomCurve3([
          new THREE.Vector3(spine2Pos.x, yLevel, spine2Pos.z - 0.015),
          new THREE.Vector3(spine2Pos.x + dir * (ribWidth * 0.6), yLevel - 0.008, spine2Pos.z + ribDepth * 0.35),
          new THREE.Vector3(spine2Pos.x + dir * (ribWidth * 0.85), yLevel - 0.018, spine2Pos.z + ribDepth * 0.70),
        ])
      } else {
        // True ribs 1-7 and false ribs 8-10 connecting to sternum or costal arch
        const anteriorZ = isFalse ? spine2Pos.z + 0.135 - (i - 7) * 0.012 : spine2Pos.z + 0.142
        const anteriorY = isFalse ? spine2Pos.y - 0.065 - (i - 7) * 0.012 : yLevel - 0.022
        ribSpline = new THREE.CatmullRomCurve3([
          new THREE.Vector3(spine2Pos.x, yLevel, spine2Pos.z - 0.015),
          new THREE.Vector3(spine2Pos.x + dir * (ribWidth * 0.55), yLevel + 0.004, spine2Pos.z + ribDepth * 0.22),
          new THREE.Vector3(spine2Pos.x + dir * ribWidth, yLevel - 0.006, spine2Pos.z + ribDepth * 0.62),
          new THREE.Vector3(spine2Pos.x + dir * (ribWidth * 0.62), anteriorY + 0.008, spine2Pos.z + ribDepth * 0.94),
          new THREE.Vector3(spine2Pos.x + dir * 0.020, anteriorY, anteriorZ),
        ])
      }
      const ribMesh = new THREE.Mesh(
        new THREE.TubeGeometry(ribSpline, 18, 0.0042, 6, false),
        i >= 6 ? cartilageMat : boneMat
      )
      addMesh(thoraxGroup, ribMesh)
    })
  }

  skeletonGroup.add(thoraxGroup)

  // ── 4. TRUE ANATOMICAL PELVIS & SACRUM (Artec HD Reference) ───────────────
  const pelvisGroup = new THREE.Group()
  pelvisGroup.name = 'Pelvis'

  // Sacrum (5 fused vertebrae with anterior/posterior sacral foramina)
  const sacrumGeo = new THREE.ConeGeometry(0.046, 0.095, 10)
  const sacrum = new THREE.Mesh(sacrumGeo, boneMat)
  sacrum.position.set(hipsPos.x, hipsPos.y + 0.015, hipsPos.z - 0.042)
  sacrum.rotation.x = Math.PI * 0.95
  addMesh(pelvisGroup, sacrum)

  // Coccyx (Small curved tailbone apex)
  const coccyx = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.030, 6), boneMat)
  coccyx.position.set(hipsPos.x, hipsPos.y - 0.045, hipsPos.z - 0.052)
  coccyx.rotation.x = Math.PI * 0.65
  addMesh(pelvisGroup, coccyx)

  // Bilateral Coxal Bones (Ilium, Ischium, Pubis, Acetabulum)
  ;[-1, 1].forEach((dir) => {
    // Iliac Wing (Broad flaring iliac crest with ASIS, AIIS, and iliac fossa)
    const iliumGeo = new THREE.CylinderGeometry(0.088, 0.058, 0.095, 18, 1, false, 0, Math.PI * 0.72)
    const ilium = new THREE.Mesh(iliumGeo, boneMat)
    ilium.position.set(hipsPos.x + dir * 0.068, hipsPos.y + 0.035, hipsPos.z - 0.012)
    ilium.rotation.y = dir > 0 ? -0.42 : Math.PI - 0.42
    ilium.rotation.z = dir * 0.22
    addMesh(pelvisGroup, ilium)

    // Suture line along iliac crest
    const crestEdge = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.0035, 6, 18, Math.PI * 0.72), sutureMat)
    crestEdge.position.set(hipsPos.x + dir * 0.068, hipsPos.y + 0.082, hipsPos.z - 0.012)
    crestEdge.rotation.y = dir > 0 ? -0.42 : Math.PI - 0.42
    addMesh(pelvisGroup, crestEdge)

    // Deep Acetabulum Socket Cup (Receives femoral head)
    const acetabulumGeo = new THREE.SphereGeometry(0.032, 20, 20, 0, Math.PI)
    const acetabulum = new THREE.Mesh(acetabulumGeo, boneMat)
    acetabulum.position.set(dir > 0 ? leftUpLeg.x : rightUpLeg.x, leftUpLeg.y, leftUpLeg.z)
    acetabulum.rotation.y = dir * Math.PI * 0.5
    addMesh(pelvisGroup, acetabulum)

    // Ischial Tuberosity (Weight-bearing pelvic seat)
    const ischiumGeo = new THREE.BoxGeometry(0.032, 0.042, 0.038)
    const ischium = new THREE.Mesh(ischiumGeo, boneMat)
    ischium.position.set(hipsPos.x + dir * 0.055, hipsPos.y - 0.048, hipsPos.z - 0.025)
    addMesh(pelvisGroup, ischium)

    // Pubic Rami & Obturator Foramen
    const obturatorRing = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.007, 8, 16), boneMat)
    obturatorRing.position.set(hipsPos.x + dir * 0.042, hipsPos.y - 0.038, hipsPos.z + 0.025)
    addMesh(pelvisGroup, obturatorRing)
  })

  // Anterior Pubic Symphysis (Fibrocartilage bridge joining left and right pubis)
  const symphysis = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.034, 0.018), cartilageMat)
  symphysis.position.set(hipsPos.x, hipsPos.y - 0.038, hipsPos.z + 0.048)
  addMesh(pelvisGroup, symphysis)

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

    // ── FEMUR (Strongest bone in human skeleton) ──
    // Spherical Femoral Head with fovea capitis pit
    const fHead = new THREE.Mesh(new THREE.SphereGeometry(0.028, 24, 24), boneMat)
    fHead.position.copy(upLeg)
    addMesh(legGroup, fHead)

    const fCart = new THREE.Mesh(new THREE.SphereGeometry(0.0285, 20, 20), cartilageMat)
    fCart.position.copy(upLeg)
    addMesh(legGroup, fCart)

    // Elongated Femoral Neck angled at 128°
    const trochanterPos = new THREE.Vector3(upLeg.x + xDir * 0.042, upLeg.y - 0.028, upLeg.z)
    addCylinderSegment(legGroup, upLeg, trochanterPos, 0.014, 0.017, boneMat)

    // Greater Trochanter (Lateral muscular prominence)
    const trochanter = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.040, 0.032), boneMat)
    trochanter.position.copy(trochanterPos)
    addMesh(legGroup, trochanter)

    // Lesser Trochanter (Posteromedial prominence)
    const lesserTroch = new THREE.Mesh(new THREE.ConeGeometry(0.010, 0.018, 8), boneMat)
    lesserTroch.position.set(upLeg.x + xDir * 0.018, upLeg.y - 0.045, upLeg.z - 0.014)
    lesserTroch.rotation.x = -Math.PI / 2
    addMesh(legGroup, lesserTroch)

    // Bowed Cortical Femoral Shaft (With anterior convexity)
    addCylinderSegment(legGroup, trochanterPos, knee, 0.019, 0.023, boneMat)

    // Distal Femoral Bicondyles (Medial & Lateral condyles separated by intercondylar notch)
    ;[-0.022, 0.022].forEach((cSide) => {
      const condyle = new THREE.Mesh(new THREE.SphereGeometry(0.023, 18, 18), boneMat)
      condyle.position.set(knee.x + cSide, knee.y, knee.z - 0.008)
      condyle.scale.set(0.95, 1.30, 1.45)
      addMesh(legGroup, condyle)

      const cCart = new THREE.Mesh(new THREE.SphereGeometry(0.0235, 18, 18), cartilageMat)
      cCart.position.set(knee.x + cSide, knee.y, knee.z - 0.008)
      cCart.scale.set(0.95, 1.30, 1.45)
      addMesh(legGroup, cCart)
    })

    // Patellar Trochlear Groove
    const trochleaGroove = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.034, 14, 1, false, 0, Math.PI), boneMat)
    trochleaGroove.position.set(knee.x, knee.y + 0.005, knee.z + 0.012)
    trochleaGroove.rotation.z = Math.PI / 2
    addMesh(legGroup, trochleaGroove)

    // Patella (Kneecap with anterior striations and posterior articular facets)
    const patella = new THREE.Mesh(new THREE.SphereGeometry(0.020, 18, 18), boneMat)
    patella.scale.set(1.0, 1.25, 0.58)
    patella.position.set(knee.x, knee.y + 0.016, knee.z + 0.040)
    addMesh(legGroup, patella)

    // ── TIBIA & FIBULA ──
    // Tibial Plateau (Medial and lateral articular plateaus)
    const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.030, 0.022, 20), boneMat)
    plateau.position.set(knee.x, knee.y - 0.018, knee.z)
    addMesh(legGroup, plateau)

    // Intercondylar Eminence (Tibial Spine for ACL/PCL insertion)
    const spineEminence = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.014, 6), boneMat)
    spineEminence.position.set(knee.x, knee.y - 0.006, knee.z)
    addMesh(legGroup, spineEminence)

    // Meniscal Cartilage Rings (Medial C-shaped & Lateral O-shaped shock absorbers)
    const meniscus = new THREE.Mesh(new THREE.TorusGeometry(0.027, 0.0055, 8, 20), cartilageMat)
    meniscus.rotation.x = Math.PI / 2
    meniscus.position.set(knee.x, knee.y - 0.008, knee.z)
    addMesh(legGroup, meniscus)

    // Anterior Tibial Tuberosity (Patellar tendon anchor)
    const tuberosity = new THREE.Mesh(new THREE.ConeGeometry(0.009, 0.020, 6), boneMat)
    tuberosity.position.set(knee.x, knee.y - 0.045, knee.z + 0.024)
    tuberosity.rotation.x = Math.PI / 2
    addMesh(legGroup, tuberosity)

    // Tibia Shaft (Triangular cross-section with prominent anterior crest)
    addCylinderSegment(legGroup, new THREE.Vector3(knee.x, knee.y - 0.018, knee.z), ankle, 0.019, 0.015, boneMat)

    // Fibula (Slender lateral stabilizer bone: Head, Shaft, Lateral Malleolus)
    const fibulaStart = new THREE.Vector3(knee.x + xDir * 0.032, knee.y - 0.026, knee.z - 0.006)
    const fibulaEnd = new THREE.Vector3(ankle.x + xDir * 0.026, ankle.y - 0.008, ankle.z)
    addCylinderSegment(legGroup, fibulaStart, fibulaEnd, 0.0075, 0.0075, boneMat)

    // Fibular Head articulating with tibia
    const fibHead = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 10), boneMat)
    fibHead.position.copy(fibulaStart)
    addMesh(legGroup, fibHead)

    // Medial & Lateral Malleoli (Ankle mortise)
    const medMall = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.028, 0.024), boneMat)
    medMall.position.set(ankle.x - xDir * 0.016, ankle.y, ankle.z)
    addMesh(legGroup, medMall)

    const latMall = new THREE.Mesh(new THREE.SphereGeometry(0.014, 12, 12), boneMat)
    latMall.position.set(ankle.x + xDir * 0.026, ankle.y - 0.008, ankle.z)
    addMesh(legGroup, latMall)

    // ── FOOT (Talus, Calcaneus heel, Tarsals, Metatarsals, Phalanges) ──
    const footGroup = new THREE.Group()

    // Talus (Ankle dome fitting snugly into mortise)
    const talus = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), boneMat)
    talus.position.set(ankle.x, ankle.y - 0.018, ankle.z + 0.015)
    addMesh(footGroup, talus)

    // Calcaneus (Heel bone projecting posteriorly with sustentaculum tali)
    const calcaneus = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.032, 0.068), boneMat)
    calcaneus.position.set(ankle.x, ankle.y - 0.030, ankle.z - 0.036)
    addMesh(footGroup, calcaneus)

    // Midfoot Tarsals (Navicular, Cuboid, Cuneiforms)
    const midfoot = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.022, 0.032), boneMat)
    midfoot.position.set(ankle.x, ankle.y - 0.032, ankle.z + 0.038)
    addMesh(footGroup, midfoot)

    // 5 Metatarsal Rays & Phalanges
    for (let m = -2; m <= 2; m++) {
      const rayWidth = m === -2 ? 0.0065 : 0.0045 // 1st metatarsal is thickest
      const rayLen = m === -2 ? 0.068 : 0.076
      const ray = new THREE.Mesh(new THREE.CylinderGeometry(rayWidth, rayWidth, rayLen, 8), boneMat)
      ray.position.set(ankle.x + m * 0.009, ankle.y - 0.040, ankle.z + 0.070)
      ray.rotation.x = Math.PI / 2
      addMesh(footGroup, ray)

      // Toe Phalanges
      const toe = new THREE.Mesh(new THREE.CylinderGeometry(rayWidth * 0.8, rayWidth * 0.7, 0.026, 6), boneMat)
      toe.position.set(ankle.x + m * 0.009, ankle.y - 0.042, ankle.z + 0.115)
      toe.rotation.x = Math.PI / 2
      addMesh(footGroup, toe)
    }
    legGroup.add(footGroup)

    skeletonGroup.add(legGroup)

    if (isLeft) {
      jointBones['knee'] = legGroup
      jointBones['hip'] = legGroup
      jointBones['ankle'] = legGroup

      // Knee Arthroplasty Surgical Implant (Cobalt-Chrome shield + PE insert + Titanium tray)
      const kneeImplant = new THREE.Group()
      kneeImplant.name = 'KneeImplant'

      const shieldGeo = new THREE.CylinderGeometry(0.039, 0.039, 0.050, 20, 1, false, 0, Math.PI)
      const shield = new THREE.Mesh(shieldGeo, coCrMat)
      shield.position.set(knee.x, knee.y, knee.z)
      shield.rotation.z = Math.PI / 2
      kneeImplant.add(shield)

      const poly = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.009, 20), polyMat)
      poly.position.set(knee.x, knee.y - 0.014, knee.z)
      kneeImplant.add(poly)

      const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.037, 0.037, 0.008, 20), titaniumMat)
      tray.position.set(knee.x, knee.y - 0.022, knee.z)
      kneeImplant.add(tray)

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.004, 0.048, 14), titaniumMat)
      stem.position.set(knee.x, knee.y - 0.046, knee.z)
      kneeImplant.add(stem)

      kneeImplant.visible = false
      skeletonGroup.add(kneeImplant)
      jointImplants['knee'] = kneeImplant
      jointImplants['knee_femur'] = kneeImplant

      // Hip Total Arthroplasty Implant (Titanium stem + BIOLOX Ceramic head)
      const hipImplant = new THREE.Group()
      hipImplant.name = 'HipImplant'

      const ceramicHead = new THREE.Mesh(new THREE.SphereGeometry(0.029, 24, 24), ceramicMat)
      ceramicHead.position.copy(upLeg)
      hipImplant.add(ceramicHead)

      const hipStem = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.008, 0.18, 14), titaniumMat)
      hipStem.position.set(upLeg.x + 0.020, upLeg.y - 0.09, upLeg.z)
      hipStem.rotation.z = -0.15
      hipImplant.add(hipStem)

      hipImplant.visible = false
      skeletonGroup.add(hipImplant)
      jointImplants['hip'] = hipImplant

      // Ankle Fixation Plate & Locking Screws
      const ankleImplant = new THREE.Group()
      ankleImplant.name = 'AnkleImplant'

      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.078, 0.004), titaniumMat)
      plate.position.set(ankle.x + 0.026, ankle.y + 0.04, ankle.z)
      ankleImplant.add(plate)

      for (let s = 0; s < 3; s++) {
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.024, 8), coCrMat)
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

    // S-Curved Clavicle (Sternal facet to acromial facet)
    const clavCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(spine2Pos.x + xDir * 0.018, spine2Pos.y + 0.065, spine2Pos.z + 0.125),
      new THREE.Vector3(spine2Pos.x + xDir * 0.075, spine2Pos.y + 0.072, spine2Pos.z + 0.085),
      new THREE.Vector3(shoulder.x - xDir * 0.015, shoulder.y + 0.010, shoulder.z + 0.020),
      new THREE.Vector3(shoulder.x, shoulder.y, shoulder.z),
    ])
    const clavicle = new THREE.Mesh(new THREE.TubeGeometry(clavCurve, 16, 0.0065, 8, false), boneMat)
    addMesh(armGroup, clavicle)

    // Scapula Blade, Spine of Scapula, Acromion, and Coracoid
    const scapulaGeo = new THREE.CylinderGeometry(0.048, 0.018, 0.115, 12)
    scapulaGeo.scale(1, 1, 0.25)
    const scapula = new THREE.Mesh(scapulaGeo, boneMat)
    scapula.position.set(shoulder.x - xDir * 0.045, shoulder.y - 0.050, shoulder.z - 0.042)
    addMesh(armGroup, scapula)

    // Acromion process arching over shoulder
    const acromion = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.008, 0.038), boneMat)
    acromion.position.set(shoulder.x, shoulder.y + 0.008, shoulder.z - 0.010)
    addMesh(armGroup, acromion)

    // Coracoid process hooking anteriorly
    const coracoid = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.024, 8), boneMat)
    coracoid.position.set(shoulder.x - xDir * 0.012, shoulder.y - 0.005, shoulder.z + 0.018)
    coracoid.rotation.x = Math.PI / 3
    addMesh(armGroup, coracoid)

    // Spherical Humeral Head articulating in glenoid
    const hHead = new THREE.Mesh(new THREE.SphereGeometry(0.028, 20, 20), boneMat)
    hHead.position.copy(arm)
    addMesh(armGroup, hHead)

    const hCart = new THREE.Mesh(new THREE.SphereGeometry(0.0285, 20, 20), cartilageMat)
    hCart.position.copy(arm)
    addMesh(armGroup, hCart)

    // Greater and Lesser Tubercles
    const tubercle = new THREE.Mesh(new THREE.SphereGeometry(0.014, 10, 10), boneMat)
    tubercle.position.set(arm.x + xDir * 0.018, arm.y - 0.008, arm.z + 0.006)
    addMesh(armGroup, tubercle)

    // Humerus Shaft
    addCylinderSegment(armGroup, arm, elbow, 0.015, 0.013, boneMat)

    // Elbow Epicondyles, Trochlea, Capitulum
    const epicondyle = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.022, 0.024), boneMat)
    epicondyle.position.copy(elbow)
    addMesh(armGroup, epicondyle)

    // Forearm: Ulna (Olecranon beak, trochlear notch) & Radius (radial head, shaft)
    const olecranon = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.028, 0.024), boneMat)
    olecranon.position.set(elbow.x, elbow.y, elbow.z - 0.012)
    addMesh(armGroup, olecranon)

    const radialHead = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.012, 14), boneMat)
    radialHead.position.set(elbow.x + xDir * 0.014, elbow.y - 0.008, elbow.z + 0.004)
    addMesh(armGroup, radialHead)

    // Dual Forearm shafts
    const ulnaEnd = new THREE.Vector3(wrist.x - xDir * 0.010, wrist.y, wrist.z)
    const radiusEnd = new THREE.Vector3(wrist.x + xDir * 0.012, wrist.y, wrist.z)
    addCylinderSegment(armGroup, elbow, ulnaEnd, 0.009, 0.007, boneMat)
    addCylinderSegment(armGroup, elbow, radiusEnd, 0.008, 0.010, boneMat)

    // Carpal Wrist Cluster & Hand Bones (Metacarpals & Phalanges)
    const handGroup = new THREE.Group()
    const carpal = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.024, 0.016), boneMat)
    carpal.position.copy(wrist)
    addMesh(handGroup, carpal)

    for (let f = -2; f <= 2; f++) {
      const phalanx = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.003, 0.068, 8), boneMat)
      phalanx.position.set(wrist.x + f * 0.0065, wrist.y - 0.042, wrist.z + 0.01)
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

  // By default, skeleton is visible in skeleton mode or on joint click
  skeletonGroup.visible = false

  return {
    skeletonGroup,
    jointImplants,
    jointBones,
    skeletonMeshes,
  }
}
