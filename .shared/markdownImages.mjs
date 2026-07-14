export const articleImageSizes = '(max-width: 640px) calc(100vw - 32px), 760px'

const escapeAttribute = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

const normalizeImageKey = (src) => {
  const pathOnly = String(src || '').split(/[?#]/, 1)[0]
  if (!pathOnly.startsWith('/')) return null
  try {
    return decodeURI(pathOnly).normalize('NFC')
  } catch {
    return pathOnly.normalize('NFC')
  }
}

export const configureResponsiveMarkdownImages = (md, imageManifest) => {
  const defaultImageRenderer = md.renderer.rules.image
    || ((tokens, index, options, env, renderer) => renderer.renderToken(tokens, index, options))

  md.renderer.rules.image = (tokens, index, options, env, renderer) => {
    const token = tokens[index]
    const source = token.attrGet('src') || ''
    const key = normalizeImageKey(source)
    const entry = key ? imageManifest.images?.[key] : null

    token.attrSet('loading', 'lazy')
    token.attrSet('decoding', 'async')
    token.attrSet('fetchpriority', 'auto')
    if (entry?.width && entry?.height) {
      token.attrSet('width', String(entry.width))
      token.attrSet('height', String(entry.height))
    }

    const imageHtml = defaultImageRenderer(tokens, index, options, env, renderer)
    if (!entry?.variants?.length) return imageHtml

    const srcset = entry.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')
    return `<picture class="responsive-image responsive-image--content"><source type="image/webp" srcset="${escapeAttribute(srcset)}" sizes="${escapeAttribute(articleImageSizes)}">${imageHtml}</picture>`
  }
}
