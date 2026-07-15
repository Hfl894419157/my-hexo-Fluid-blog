import { withBase } from 'vitepress'
import imageManifest from '../.vitepress/cache/image-manifest.json'
import { normalizeFocalPoint } from '../.shared/imageProfiles.mjs'

const externalPattern = /^(?:https?:)?\/\//

const resolveLocalKey = (src) => {
  if (!src || externalPattern.test(src) || /^(?:data|blob):/.test(src)) return null
  const pathOnly = src.split(/[?#]/, 1)[0]
  if (!pathOnly.startsWith('/')) return null
  try {
    return decodeURI(pathOnly).normalize('NFC')
  } catch {
    return pathOnly.normalize('NFC')
  }
}

const resolveUrl = (src) => {
  if (!src || externalPattern.test(src) || /^(?:data|blob):/.test(src)) return src
  return withBase(src)
}

const resolveProfile = (entry, profile, focalPoint) => {
  if (!entry) return null
  if (profile === 'original') return entry.profiles?.original || entry
  const profiles = entry.profiles?.[profile]
  return profiles?.[normalizeFocalPoint(focalPoint)] || profiles?.center || entry.profiles?.original || entry
}

const toSrcset = (variants) => variants?.length
  ? variants.map((variant) => `${resolveUrl(variant.src)} ${variant.width}w`).join(', ')
  : ''

export const resolveResponsiveImage = (src, { profile = 'original', focalPoint = 'center' } = {}) => {
  const key = resolveLocalKey(src)
  const entry = key ? imageManifest.images?.[key] : null
  const selected = resolveProfile(entry, profile, focalPoint)
  const croppedFallback = profile !== 'original' ? selected?.variants?.at(-1)?.src : ''

  return {
    src: resolveUrl(croppedFallback || src),
    width: selected?.width || entry?.width,
    height: selected?.height || entry?.height,
    avifSrcset: toSrcset(selected?.avifVariants),
    webpSrcset: toSrcset(selected?.variants)
  }
}
