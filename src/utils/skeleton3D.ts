import type * as THREE_TYPES from 'three'

/**
 * Procedural Medical Anatomical Human Skeleton & Implants for Three.js
 * Creates a smooth, anatomically-accurate human skeleton attached directly
 * to the rig bones of human-male.glb, ensuring 100% synchronized posing and motion.
 */

export interface SkeletonBuildResult {
  skeletonGroup: THREE_TYPES.Group
  jointImplants: Record<string, THREE_TYPES.Group>
  jointBones: Record<string, THREE_TYPES.Group>
}

export function buildFullBodySkeleton(
  THREE: typeof import('three'),
  boneMap: Record<string, any>
): SkeletonBuildResult {
  const skeletonGroup = new THREE.Group()
  skeletonGroup.name = 'FullBodySkeleton'

  // ── High-Grade Medical Materials ──────────────────────────────────────────
  // Cortical bone ivory with natural subsurface gloss
  const boneMat = new THREE.MeshStandardMaterial({
    color: 0xf5f1e8,
    roughness: 0.28,
    metalness: 0.05,
    name: 'CorticalBoneIvory',
  })

  // Translucent articular cartilage (subtle sky/pearl tint)
  const cartilageMat = new THREE.MeshStandardMaterial({
    color: 0xbae6fd,
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.75,
    name: 'ArticularCartilage',
  })

  // Surgical Grade Cobalt-Chrome (mirror luster)
  const coCrMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.12,
    name: 'CobaltChromeImplant',
  })

  // Surgical Titanium (matte porous titanium)
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.82,
    roughness: 0.28,
    name: 'TitaniumAlloy',
  })

  // Medical UHMWPE Polyethylene (smooth milky white)
  const polyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.22,
    metalness: 0.02,
    transparent: true,
    opacity: 0.88,
    name: 'UHMWPE_Polymer',
  })

  const jointImplants: Record<string, THREE_TYPES.Group> = {}
  const jointBones: Record<string, THREE_TYPES.Group> = {}

  // ── 1. SKULL & CRANIUM (Attached to 'Head') ───────────────────────────────
  if (boneMap['Head']) {
    const skullGroup = new THREE.Group()
    skullGroup.name = 'Skull'

    // Cranial Vault (Neurocranium)
    const craniumGeo = new THREE.SphereGeometry(0.084, 24, 20)
    craniumGeo.scale(0.92, 1.14, 1.08)
    const cranium = new THREE.Mesh(craniumGeo, boneMat)
    cranium.position.set(0, 0.088, 0.01)
    skullGroup.add(cranium)

    // Facial Skeleton / Orbits / Zygomatic arches
    const faceGeo = new THREE.CylinderGeometry(0.052, 0.038, 0.075, 16)
    faceGeo.scale(1.15, 1, 0.85)
    const face = new THREE.Mesh(faceGeo, boneMat)
    face.position.set(0, 0.045, 0.062)
    face.rotation.x = 0.12
    skullGroup.add(face)

    // Left & Right Orbital cavities (recessed eye sockets)
    ;[-0.032, 0.032].forEach((xSide) => {
      const orbitRingGeo = new THREE.TorusGeometry(0.016, 0.0035, 10, 16)
      const orbitRing = new THREE.Mesh(orbitRingGeo, boneMat)
      orbitRing.position.set(xSide, 0.065, 0.075)
      skullGroup.add(orbitRing)
    })

    // Mandible (Jawbone)
    const jawCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.045, 0.04, 0.02),
      new THREE.Vector3(-0.038, 0.01, 0.06),
      new THREE.Vector3(0, 0.005, 0.075),
      new THREE.Vector3(0.038, 0.01, 0.06),
      new THREE.Vector3(0.045, 0.04, 0.02),
    ])
    const jaw = new THREE.Mesh(new THREE.TubeGeometry(jawCurve, 16, 0.007, 8, false), boneMat)
    skullGroup.add(jaw)

    boneMap['Head'].add(skullGroup)
    skeletonGroup.add(skullGroup)
  }

  // ── 2. CERVICAL SPINE (Attached to 'Neck') ────────────────────────────────
  if (boneMap['Neck']) {
    const cervicalGroup = new THREE.Group()
    cervicalGroup.name = 'CervicalSpine'
    for (let c = 0; c < 7; c++) {
      const y = (c / 7) * 0.11
      const vertGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12)
      const vert = new THREE.Mesh(vertGeo, boneMat)
      vert.position.set(0, y, -0.006)
      cervicalGroup.add(vert)

      // Spinous process
      const spinousGeo = new THREE.ConeGeometry(0.006, 0.016, 6)
      const spinous = new THREE.Mesh(spinousGeo, boneMat)
      spinous.position.set(0, y, -0.022)
      spinous.rotation.x = -Math.PI / 2
      cervicalGroup.add(spinous)
    }
    boneMap['Neck'].add(cervicalGroup)
    skeletonGroup.add(cervicalGroup)
  }

  // ── 3. THORACIC RIBCAGE & STERNUM (Attached to 'Spine2') ───────────────────
  if (boneMap['Spine2']) {
    const thoraxGroup = new THREE.Group()
    thoraxGroup.name = 'ThoraxRibcage'

    // Sternum (Chest bone)
    const sternumGeo = new THREE.BoxGeometry(0.032, 0.16, 0.012)
    const sternum = new THREE.Mesh(sternumGeo, boneMat)
    sternum.position.set(0, -0.01, 0.12)
    thoraxGroup.add(sternum)

    // 10 Anatomical Rib Pairs (Smooth 3D CatmullRom splines)
    for (let i = 0; i < 10; i++) {
      const frac = i / 10
      const yOffset = 0.07 - i * 0.022
      const ribW = 0.085 + Math.sin(frac * Math.PI) * 0.048
      const ribD = 0.080 + Math.sin(frac * Math.PI) * 0.042

      ;[-1, 1].forEach((side) => {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.018, yOffset + 0.01, -ribD * 0.65),
          new THREE.Vector3(side * ribW * 0.72, yOffset + 0.005, -ribD * 0.50),
          new THREE.Vector3(side * ribW, yOffset - 0.008, 0.01),
          new THREE.Vector3(side * ribW * 0.75, yOffset - 0.022, ribD * 0.62),
          new THREE.Vector3(side * 0.022, yOffset - 0.030, ribD * 0.78),
        ])
        const ribMesh = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 14, 0.0048, 8, false),
          boneMat
        )
        thoraxGroup.add(ribMesh)
      })
    }

    // Thoracic vertebrae column
    for (let t = 0; t < 10; t++) {
      const y = 0.07 - t * 0.022
      const vert = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.016, 14), boneMat)
      vert.position.set(0, y, -0.08)
      thoraxGroup.add(vert)
    }

    boneMap['Spine2'].add(thoraxGroup)
    skeletonGroup.add(thoraxGroup)
  }

  // ── 4. LUMBAR SPINE (Attached to 'Spine1' & 'Spine') ───────────────────────
  const spineJointGroup = new THREE.Group()
  spineJointGroup.name = 'LumbarSpineStructure'

  if (boneMap['Spine1']) {
    for (let l = 0; l < 4; l++) {
      const y = (l / 4) * 0.11
      const vertGeo = new THREE.CylinderGeometry(0.026, 0.028, 0.022, 16)
      const vert = new THREE.Mesh(vertGeo, boneMat)
      vert.position.set(0, y, -0.04)
      spineJointGroup.add(vert)

      // Intervertebral disc space
      if (l < 3) {
        const discGeo = new THREE.CylinderGeometry(0.027, 0.027, 0.008, 16)
        const disc = new THREE.Mesh(discGeo, cartilageMat)
        disc.position.set(0, y + 0.015, -0.04)
        spineJointGroup.add(disc)
      }

      // Spinous process
      const spinous = new THREE.Mesh(new THREE.ConeGeometry(0.010, 0.026, 8), boneMat)
      spinous.position.set(0, y, -0.065)
      spinous.rotation.x = -Math.PI / 2
      spineJointGroup.add(spinous)
    }
    boneMap['Spine1'].add(spineJointGroup)
    skeletonGroup.add(spineJointGroup)
    jointBones['spine'] = spineJointGroup

    // Spine Surgical Implant: Titanium Interbody Cage & Pedicle Fixation
    const spineImplant = new THREE.Group()
    spineImplant.name = 'SpineImplant'
    const cageGeo = new THREE.BoxGeometry(0.038, 0.014, 0.034)
    const cage = new THREE.Mesh(cageGeo, titaniumMat)
    cage.position.set(0, 0.045, -0.04)
    spineImplant.add(cage)

    ;[-0.026, 0.026].forEach((xSide) => {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.08, 12), coCrMat)
      rod.position.set(xSide, 0.045, -0.055)
      spineImplant.add(rod)
    })
    spineImplant.visible = false
    boneMap['Spine1'].add(spineImplant)
    jointImplants['spine'] = spineImplant
  }

  // ── 5. PELVIS & SACRUM (Attached to 'Hips') ───────────────────────────────
  if (boneMap['Hips']) {
    const pelvisGroup = new THREE.Group()
    pelvisGroup.name = 'PelvicGirdle'

    // Sacrum central wedge
    const sacrumGeo = new THREE.ConeGeometry(0.048, 0.12, 14)
    const sacrum = new THREE.Mesh(sacrumGeo, boneMat)
    sacrum.position.set(0, 0.01, -0.045)
    sacrum.rotation.x = Math.PI
    pelvisGroup.add(sacrum)

    // Left & Right Iliac Blades (Pelvic Wings)
    ;[-1, 1].forEach((side) => {
      const iliumShape = new THREE.Shape()
      iliumShape.moveTo(0, 0)
      iliumShape.quadraticCurveTo(side * 0.08, 0.06, side * 0.11, 0.10)
      iliumShape.quadraticCurveTo(side * 0.12, 0.15, side * 0.06, 0.16)
      iliumShape.quadraticCurveTo(0, 0.12, 0, 0)

      const extrudeSettings = { depth: 0.016, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.004, bevelThickness: 0.004 }
      const iliumMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(iliumShape, extrudeSettings), boneMat)
      iliumMesh.position.set(0, -0.04, -0.02)
      pelvisGroup.add(iliumMesh)

      // Acetabular socket
      const acetabulum = new THREE.Mesh(new THREE.SphereGeometry(0.034, 16, 16, 0, Math.PI), boneMat)
      acetabulum.position.set(side * 0.095, -0.02, 0.01)
      acetabulum.rotation.y = side * Math.PI * 0.5
      pelvisGroup.add(acetabulum)
    })

    boneMap['Hips'].add(pelvisGroup)
    skeletonGroup.add(pelvisGroup)
  }

  // ── 6. SHOULDER & ARMS (Left & Right) ─────────────────────────────────────
  ;['Left', 'Right'].forEach((side) => {
    const isLeft = side === 'Left'
    const xMult = isLeft ? 1 : -1

    // Clavicle & Scapula (Attached to Shoulder)
    const shoulderBone = boneMap[`${side}Shoulder`]
    if (shoulderBone) {
      const shGroup = new THREE.Group()
      // Clavicle (S-curved tube)
      const clavCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xMult * 0.01, 0, 0),
        new THREE.Vector3(xMult * 0.06, 0.015, -0.01),
        new THREE.Vector3(xMult * 0.13, 0.01, -0.02),
      ])
      const clavicle = new THREE.Mesh(new THREE.TubeGeometry(clavCurve, 12, 0.006, 8, false), boneMat)
      shGroup.add(clavicle)

      // Scapula (Shoulder blade plate)
      const scapulaGeo = new THREE.CylinderGeometry(0.045, 0.015, 0.11, 8)
      scapulaGeo.scale(1, 1, 0.25)
      const scapula = new THREE.Mesh(scapulaGeo, boneMat)
      scapula.position.set(xMult * 0.09, -0.04, -0.04)
      shGroup.add(scapula)

      shoulderBone.add(shGroup)
      skeletonGroup.add(shGroup)
    }

    // Humerus (Upper Arm) - length ~0.285 along local Y
    const armBone = boneMap[`${side}Arm`]
    if (armBone) {
      const humerusGroup = new THREE.Group()
      humerusGroup.name = `${side}Humerus`

      // Proximal Humeral Head (Shoulder ball)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.028, 18, 18), boneMat)
      head.position.set(0, 0.01, 0)
      humerusGroup.add(head)

      // Articular Cartilage on head
      const headCart = new THREE.Mesh(new THREE.SphereGeometry(0.0285, 18, 18, 0, Math.PI), cartilageMat)
      headCart.position.set(0, 0.01, 0)
      humerusGroup.add(headCart)

      // Humerus Bone Shaft
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.015, 0.24, 16), boneMat)
      shaft.position.set(0, 0.14, 0)
      humerusGroup.add(shaft)

      // Distal Epicondyles at Elbow
      const epicondyle = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.022, 0.024), boneMat)
      epicondyle.position.set(0, 0.275, 0)
      humerusGroup.add(epicondyle)

      armBone.add(humerusGroup)
      skeletonGroup.add(humerusGroup)

      if (isLeft) {
        jointBones['shoulder'] = humerusGroup

        // Shoulder Surgical Anchor & Rotator Cuff Repair Construct
        const shoulderImplant = new THREE.Group()
        shoulderImplant.name = 'ShoulderImplant'
        const anchor1 = new THREE.Mesh(new THREE.ConeGeometry(0.005, 0.018, 8), titaniumMat)
        anchor1.position.set(0.025, 0.03, 0.01)
        anchor1.rotation.z = -0.5
        shoulderImplant.add(anchor1)

        const anchor2 = new THREE.Mesh(new THREE.ConeGeometry(0.005, 0.018, 8), titaniumMat)
        anchor2.position.set(-0.022, 0.03, 0.01)
        anchor2.rotation.z = 0.5
        shoulderImplant.add(anchor2)

        shoulderImplant.visible = false
        armBone.add(shoulderImplant)
        jointImplants['shoulder'] = shoulderImplant
      }
    }

    // Forearm (Radius & Ulna) - length ~0.252 along local Y
    const foreArmBone = boneMap[`${side}ForeArm`]
    if (foreArmBone) {
      const foreGroup = new THREE.Group()
      foreGroup.name = `${side}Forearm`

      // Ulna (Medial / Olecranon beak at elbow)
      const olecranon = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.028, 0.024), boneMat)
      olecranon.position.set(-0.008, 0.01, -0.005)
      foreGroup.add(olecranon)

      const ulnaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.007, 0.22, 12), boneMat)
      ulnaShaft.position.set(-0.008, 0.12, 0)
      foreGroup.add(ulnaShaft)

      // Radius (Lateral bone)
      const radiusHead = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.012, 14), boneMat)
      radiusHead.position.set(0.012, 0.01, 0)
      foreGroup.add(radiusHead)

      const radiusShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.22, 12), boneMat)
      radiusShaft.position.set(0.012, 0.12, 0)
      foreGroup.add(radiusShaft)

      foreArmBone.add(foreGroup)
      skeletonGroup.add(foreGroup)

      if (isLeft) {
        jointBones['elbow'] = foreGroup

        // Elbow Surgical Titanium Locking Plate
        const elbowImplant = new THREE.Group()
        elbowImplant.name = 'ElbowImplant'
        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.075, 0.004), titaniumMat)
        plate.position.set(-0.014, 0.04, -0.012)
        elbowImplant.add(plate)

        for (let s = 0; s < 3; s++) {
          const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.018, 8), coCrMat)
          screw.position.set(-0.014, 0.018 + s * 0.022, -0.005)
          screw.rotation.x = Math.PI / 2
          elbowImplant.add(screw)
        }
        elbowImplant.visible = false
        foreArmBone.add(elbowImplant)
        jointImplants['elbow'] = elbowImplant
      }
    }

    // Hand & Wrist Bones (Attached to Hand)
    const handBone = boneMap[`${side}Hand`]
    if (handBone) {
      const handGroup = new THREE.Group()
      // Carpal cluster
      const carpal = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.024, 0.016), boneMat)
      carpal.position.set(0, 0.015, 0)
      handGroup.add(carpal)

      // 5 Metacarpals
      for (let m = -2; m <= 2; m++) {
        const meta = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.05, 8), boneMat)
        meta.position.set(m * 0.008, 0.048, 0)
        handGroup.add(meta)
      }

      handBone.add(handGroup)
      skeletonGroup.add(handGroup)
    }
  })

  // ── 7. LEGS & LOWER EXTREMITIES (Left & Right) ─────────────────────────────
  ;['Left', 'Right'].forEach((side) => {
    const isRight = side === 'Right'
    const xMult = isRight ? 1 : -1

    // Femur (Upper Leg) - length ~0.458 along local Y
    const upLegBone = boneMap[`${side}UpLeg`]
    if (upLegBone) {
      const femurGroup = new THREE.Group()
      femurGroup.name = `${side}Femur`

      // Femoral Head (Spherical ball)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.028, 20, 20), boneMat)
      head.position.set(xMult * 0.028, 0.022, 0.005)
      femurGroup.add(head)

      // Articular Cartilage layer
      const headCart = new THREE.Mesh(new THREE.SphereGeometry(0.0285, 18, 18), cartilageMat)
      headCart.position.set(xMult * 0.028, 0.022, 0.005)
      femurGroup.add(headCart)

      // Femoral Neck (Angled at 130 degrees)
      const neckCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xMult * 0.028, 0.022, 0.005),
        new THREE.Vector3(xMult * 0.014, 0.012, 0),
        new THREE.Vector3(0, 0, 0),
      ])
      const neck = new THREE.Mesh(new THREE.TubeGeometry(neckCurve, 8, 0.013, 10, false), boneMat)
      femurGroup.add(neck)

      // Greater Trochanter
      const trochanter = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.038, 0.032), boneMat)
      trochanter.position.set(-xMult * 0.016, 0.015, -0.005)
      femurGroup.add(trochanter)

      // Femoral Shaft (Strongest bone in human body)
      const shaftCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0.22, 0.012),
        new THREE.Vector3(0, 0.43, 0),
      ])
      const shaft = new THREE.Mesh(new THREE.TubeGeometry(shaftCurve, 14, 0.016, 14, false), boneMat)
      femurGroup.add(shaft)

      // Distal Femoral Bicondyles (Knee Articulation)
      ;[-0.018, 0.018].forEach((cSide) => {
        const condyle = new THREE.Mesh(new THREE.SphereGeometry(0.020, 16, 16), boneMat)
        condyle.position.set(cSide, 0.445, -0.005)
        condyle.scale.set(1, 1.2, 1.4)
        femurGroup.add(condyle)

        const cCart = new THREE.Mesh(new THREE.SphereGeometry(0.0205, 16, 16), cartilageMat)
        cCart.position.set(cSide, 0.445, -0.005)
        cCart.scale.set(1, 1.2, 1.4)
        femurGroup.add(cCart)
      })

      // Patella (Kneecap)
      const patella = new THREE.Mesh(new THREE.SphereGeometry(0.018, 14, 14), boneMat)
      patella.scale.set(1, 1.2, 0.6)
      patella.position.set(0, 0.435, 0.032)
      femurGroup.add(patella)

      upLegBone.add(femurGroup)
      skeletonGroup.add(femurGroup)

      if (isRight) {
        jointBones['hip'] = femurGroup
        jointBones['knee'] = femurGroup

        // Hip Total Arthroplasty Implant (Titanium stem + BIOLOX Ceramic head)
        const hipImplant = new THREE.Group()
        hipImplant.name = 'HipImplant'

        const ceramicHead = new THREE.Mesh(
          new THREE.SphereGeometry(0.029, 20, 20),
          new THREE.MeshStandardMaterial({ color: 0xff8c42, roughness: 0.08, metalness: 0.1 })
        )
        ceramicHead.position.set(xMult * 0.028, 0.022, 0.005)
        hipImplant.add(ceramicHead)

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.008, 0.18, 12), titaniumMat)
        stem.position.set(0, 0.08, 0)
        hipImplant.add(stem)

        hipImplant.visible = false
        upLegBone.add(hipImplant)
        jointImplants['hip'] = hipImplant

        // Knee Arthroplasty Implant (Cobalt-Chrome Femoral Shield)
        const kneeFemoralImplant = new THREE.Group()
        kneeFemoralImplant.name = 'KneeFemoralImplant'
        const shieldGeo = new THREE.CylinderGeometry(0.036, 0.036, 0.046, 16, 1, false, 0, Math.PI)
        const shield = new THREE.Mesh(shieldGeo, coCrMat)
        shield.position.set(0, 0.445, 0.005)
        shield.rotation.z = Math.PI / 2
        kneeFemoralImplant.add(shield)

        kneeFemoralImplant.visible = false
        upLegBone.add(kneeFemoralImplant)
        jointImplants['knee_femur'] = kneeFemoralImplant
      }
    }

    // Tibia & Fibula (Lower Leg) - length ~0.444 along local Y
    const legBone = boneMap[`${side}Leg`]
    if (legBone) {
      const tibiaGroup = new THREE.Group()
      tibiaGroup.name = `${side}TibiaFibula`

      // Tibial Plateau (Articular Knee surface)
      const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.024, 0.024, 16), boneMat)
      plateau.position.set(0, 0.012, 0)
      tibiaGroup.add(plateau)

      // Meniscal Cartilage Cushions
      const meniscus = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.005, 8, 16), cartilageMat)
      meniscus.rotation.x = Math.PI / 2
      meniscus.position.set(0, 0.004, 0)
      tibiaGroup.add(meniscus)

      // Tibial Shaft (Sharp anterior crest)
      const tibiaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.014, 0.38, 14), boneMat)
      tibiaShaft.position.set(0, 0.20, 0)
      tibiaGroup.add(tibiaShaft)

      // Medial Malleolus at Ankle
      const medMalleolus = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.028, 0.024), boneMat)
      medMalleolus.position.set(-xMult * 0.014, 0.42, 0)
      tibiaGroup.add(medMalleolus)

      // Fibula (Slender lateral bone)
      const fibulaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.39, 10), boneMat)
      fibulaShaft.position.set(xMult * 0.024, 0.21, 0)
      tibiaGroup.add(fibulaShaft)

      // Lateral Malleolus
      const latMalleolus = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 10), boneMat)
      latMalleolus.position.set(xMult * 0.024, 0.425, 0)
      tibiaGroup.add(latMalleolus)

      legBone.add(tibiaGroup)
      skeletonGroup.add(tibiaGroup)

      if (isRight) {
        jointBones['ankle'] = tibiaGroup

        // Knee Tibial Tray & Polyethylene Insert
        const kneeTibialImplant = new THREE.Group()
        kneeTibialImplant.name = 'KneeTibialImplant'

        const polyInsert = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.009, 16), polyMat)
        polyInsert.position.set(0, 0.006, 0)
        kneeTibialImplant.add(polyInsert)

        const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.007, 16), titaniumMat)
        tray.position.set(0, 0.015, 0)
        kneeTibialImplant.add(tray)

        const keel = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.004, 0.04, 12), titaniumMat)
        keel.position.set(0, 0.035, 0)
        kneeTibialImplant.add(keel)

        kneeTibialImplant.visible = false
        legBone.add(kneeTibialImplant)
        jointImplants['knee'] = kneeTibialImplant

        // Ankle Surgical Fixation Screws
        const ankleImplant = new THREE.Group()
        ankleImplant.name = 'AnkleImplant'
        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.065, 0.004), titaniumMat)
        plate.position.set(0.026, 0.38, 0)
        ankleImplant.add(plate)

        for (let s = 0; s < 3; s++) {
          const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.024, 8), coCrMat)
          screw.position.set(0.018, 0.36 + s * 0.02, 0)
          screw.rotation.z = Math.PI / 2
          ankleImplant.add(screw)
        }
        ankleImplant.visible = false
        legBone.add(ankleImplant)
        jointImplants['ankle'] = ankleImplant
      }
    }

    // Foot (Talus, Calcaneus, Metatarsals)
    const footBone = boneMap[`${side}Foot`]
    if (footBone) {
      const footGroup = new THREE.Group()
      footGroup.name = `${side}Foot`

      // Talus (Ankle dome)
      const talus = new THREE.Mesh(new THREE.SphereGeometry(0.022, 14, 14), boneMat)
      talus.position.set(0, 0.015, 0.015)
      footGroup.add(talus)

      // Calcaneus (Heel bone)
      const calcaneus = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.032, 0.065), boneMat)
      calcaneus.position.set(0, 0.025, -0.035)
      footGroup.add(calcaneus)

      // 5 Metatarsal Rays
      for (let m = -2; m <= 2; m++) {
        const ray = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.08, 8), boneMat)
        ray.position.set(m * 0.008, 0.01, 0.07)
        ray.rotation.x = Math.PI / 2
        footGroup.add(ray)
      }

      footBone.add(footGroup)
      skeletonGroup.add(footGroup)
    }
  })

  // Initially full skeleton is hidden until Skeleton/X-Ray mode is activated or a joint is inspected
  skeletonGroup.visible = false

  return {
    skeletonGroup,
    jointImplants,
    jointBones,
  }
}
