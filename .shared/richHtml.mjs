import { load } from 'cheerio'
import sanitizeHtml from 'sanitize-html'
import { articleImageSizes } from './markdownImages.mjs'
import { partitionJustifiedRows } from './justifiedGallery.mjs'

const safeLength = /^(?:0|[1-9]\d{0,2}(?:\.\d+)?(?:px|rem|em|%))$/i
const safeSpacing = /^(?:0|[1-9]\d{0,2}(?:\.\d+)?(?:px|rem|em|%))(?:\s+(?:0|[1-9]\d{0,2}(?:\.\d+)?(?:px|rem|em|%))){0,3}$/i
const safeColor = /^(?:#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|transparent|currentcolor|inherit)$/i
const safeBorder = /^(?:0|none|[1-9]\d?px\s+(?:solid|dashed|dotted)\s+(?:#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)))$/i

export const richHtmlAllowedTags = [
  'article', 'section', 'div', 'span', 'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'small', 'sub', 'sup',
  'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  'figure', 'figcaption', 'picture', 'source', 'img', 'a'
]

export const sanitizeRichHtml = (value = '') => sanitizeHtml(String(value || ''), {
  allowedTags: richHtmlAllowedTags,
  allowedAttributes: {
    '*': ['style', 'title', 'class'],
    a: ['href', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding', 'fetchpriority'],
    source: ['srcset', 'sizes', 'type'],
    code: ['class'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan']
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  allowedStyles: {
    '*': {
      color: [safeColor],
      'background-color': [safeColor],
      'text-align': [/^(?:left|right|center|justify|start|end)$/i],
      'font-size': [safeLength],
      'font-weight': [/^(?:normal|bold|[1-9]00)$/i],
      'font-style': [/^(?:normal|italic|oblique)$/i],
      'text-decoration': [/^(?:none|underline|line-through)(?:\s+(?:underline|line-through))*$/i],
      'line-height': [/^(?:normal|[1-3](?:\.\d{1,2})?|[1-9]\d{0,2}(?:\.\d+)?(?:px|%))$/i],
      'letter-spacing': [safeLength],
      margin: [safeSpacing],
      'margin-top': [safeLength],
      'margin-right': [safeLength],
      'margin-bottom': [safeLength],
      'margin-left': [safeLength],
      padding: [safeSpacing],
      'padding-top': [safeLength],
      'padding-right': [safeLength],
      'padding-bottom': [safeLength],
      'padding-left': [safeLength],
      width: [safeLength, /^auto$/i],
      'max-width': [safeLength, /^none$/i],
      height: [safeLength, /^auto$/i],
      border: [safeBorder],
      'border-top': [safeBorder],
      'border-right': [safeBorder],
      'border-bottom': [safeBorder],
      'border-left': [safeBorder],
      'border-radius': [safeSpacing],
      display: [/^(?:block|inline|inline-block|flex|grid)$/i],
      'justify-content': [/^(?:start|end|center|space-between|space-around)$/i],
      'align-items': [/^(?:start|end|center|stretch)$/i],
      gap: [safeLength]
    }
  },
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        ...(attribs.target === '_blank' ? { rel: 'noopener noreferrer' } : {})
      }
    })
  },
  nonTextTags: ['style', 'script', 'textarea', 'option', 'noscript'],
  enforceHtmlBoundary: true
})

const normalizeImageKey = (src) => {
  const pathOnly = String(src || '').split(/[?#]/, 1)[0]
  if (!pathOnly.startsWith('/')) return null
  try {
    return decodeURI(pathOnly).normalize('NFC')
  } catch {
    return pathOnly.normalize('NFC')
  }
}

const slugifyHeading = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .replace(/<[^>]+>/g, '')
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .replace(/\s+/g, '-') || 'section'

const addSource = ($, picture, type, variants) => {
  if (!variants?.length) return
  const source = $('<source>')
    .attr('type', type)
    .attr('srcset', variants.map((variant) => `${variant.src} ${variant.width}w`).join(', '))
    .attr('sizes', articleImageSizes)
  picture.prepend(source)
}

export const renderRichHtml = (value, imageManifest = {}, env = {}) => {
  const safe = sanitizeRichHtml(value)
  const $ = load(safe, null, false)
  env.headingCounts ||= new Map()
  env.contentImageIndex ||= 0

  $('h1, h2, h3, h4, h5, h6').each((_, element) => {
    const heading = $(element)
    const base = slugifyHeading(heading.text())
    const count = env.headingCounts.get(base) || 0
    env.headingCounts.set(base, count + 1)
    heading.attr('id', count ? `${base}-${count + 1}` : base)
  })

  $('img').each((_, element) => {
    const image = $(element)
    const source = image.attr('src') || ''
    const key = normalizeImageKey(source)
    const entry = key ? imageManifest.images?.[key] : null
    const isFirstContentImage = env.contentImageIndex === 0
    env.contentImageIndex += 1

    image
      .attr('loading', isFirstContentImage ? 'eager' : 'lazy')
      .attr('decoding', 'async')
      .attr('fetchpriority', isFirstContentImage ? 'high' : 'auto')
    if (!image.attr('alt')) image.attr('alt', '')
    if (entry?.width && entry?.height) {
      image.attr('width', String(entry.width)).attr('height', String(entry.height))
    }

    const originalParent = image.parent()
    const substantiveSiblings = originalParent.contents().filter((_, node) =>
      node.type === 'tag' || (node.type === 'text' && Boolean(node.data?.trim())))
    if (['p', 'figure', 'div', 'section'].includes(originalParent.get(0)?.tagName) && substantiveSiblings.length === 1) {
      originalParent.addClass('content-rich-media-row')
    }

    if (!entry || originalParent.is('picture')) return
    image.wrap('<picture class="responsive-image responsive-image--content"></picture>')
    const picture = image.parent()
    addSource($, picture, 'image/webp', entry.variants)
    addSource($, picture, 'image/avif', entry.avifVariants)
  })

  // Group adjacent single-image containers into justified gallery rows
  const imageContainers = $('.content-rich-media-row').toArray()
  let currentGroup = []

  const flushGroup = () => {
    if (currentGroup.length >= 2) {
      const items = currentGroup.map((el) => {
        const $el = $(el)
        const $img = $el.find('img')
        const src = $img.attr('src') || ''
        const width = Number($img.attr('width')) || 0
        const height = Number($img.attr('height')) || 0
        return { el, $el, src, width, height }
      })

      const rows = partitionJustifiedRows(items, imageManifest)
      for (const row of rows) {
        if (row.length > 1) {
          const rowWrapper = $('<div class="portfolio-gallery-row portfolio-gallery-row--multi"></div>')
          row[0].$el.before(rowWrapper)
          for (const item of row) {
            item.$el.css({
              flex: `${item.ratio} ${item.ratio} 0%`,
              'aspect-ratio': `${item.ratio}`
            })
            rowWrapper.append(item.$el)
          }
        }
      }
    }
    currentGroup = []
  }

  for (let i = 0; i < imageContainers.length; i++) {
    const current = $(imageContainers[i])
    const prev = currentGroup.length ? $(currentGroup[currentGroup.length - 1]) : null
    if (prev && current.prev().get(0) === prev.get(0)) {
      currentGroup.push(imageContainers[i])
    } else {
      flushGroup()
      currentGroup = [imageContainers[i]]
    }
  }
  flushGroup()

  // Wrap standalone <pre> blocks with language container and inject copy button
  $('pre').each((_, element) => {
    const pre = $(element)
    if (pre.parent().is('div[class*="language-"]')) return
    const lang = pre.find('code').attr('class')?.match(/language-(\S+)/)?.[1] || 'text'
    pre.wrap(`<div class="language-${lang}"></div>`)
    pre.parent().prepend('<button class="copy" title="复制代码"></button>')
  })

  return $.html()
}

export const richHtmlSearchText = (value = '') => {
  const $ = load(sanitizeRichHtml(value), null, false)
  return $.text().replace(/\s+/g, ' ').trim()
}

export const richHtmlImageSources = (value = '') => {
  return richHtmlImages(value).map((image) => image.src)
}

export const richHtmlImages = (value = '') => {
  const $ = load(sanitizeRichHtml(value), null, false)
  return $('img').map((_, element) => ({
    src: $(element).attr('src') || '',
    alt: $(element).attr('alt') || ''
  })).get().filter((image) => image.src)
}
