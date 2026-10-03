export type AnatomyType = 'knee' | 'hip' | 'shoulder' | 'spine' | 'sports' | 'prp' | 'trauma'

export function getAnatomyType(slugOrCategory?: string): AnatomyType {
  if (!slugOrCategory) return 'knee'
  const s = slugOrCategory.toLowerCase()
  if (s.includes('hip') || s.includes('avn') || s.includes('pelvis')) return 'hip'
  if (s.includes('shoulder') || s.includes('rotator') || s.includes('cuff') || s.includes('elbow') || s.includes('arm')) return 'shoulder'
  if (s.includes('spine') || s.includes('disc') || s.includes('sciatica') || s.includes('cervical') || s.includes('spondylosis') || s.includes('neck')) return 'spine'
  if (s.includes('acl') || s.includes('pcl') || s.includes('ligament') || s.includes('meniscus') || s.includes('sports') || s.includes('sprain') || s.includes('ankle')) return 'sports'
  if (s.includes('prp') || s.includes('preservation') || s.includes('lubrication') || s.includes('cartilage') || s.includes('heel') || s.includes('fasciitis')) return 'prp'
  if (s.includes('fracture') || s.includes('trauma') || s.includes('plate') || s.includes('nonunion') || s.includes('accident') || s.includes('bone')) return 'trauma'
  return 'knee'
}
