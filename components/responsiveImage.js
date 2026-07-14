import { withBase } from 'vitepress'
import imageManifest from '../.vitepress/cache/image-manifest.json'

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

export const resolveResponsiveImage = (src) => {
  const key = resolveLocalKey(src)
  const entry = key ? imageManifest.images?.[key] : null

  return {
    src: resolveUrl(src),
    width: entry?.width,
    height: entry?.height,
    webpSrcset: entry?.variants?.length
      ? entry.variants.map((variant) => `${resolveUrl(variant.src)} ${variant.width}w`).join(', ')
      : ''
  }
}
