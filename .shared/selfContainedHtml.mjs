import { load } from 'cheerio'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import valueParser from 'postcss-value-parser'
import { renderRichHtml, sanitizeRichHtml } from './richHtml.mjs'

const maxArticleCssLength = 200_000
const allowedAtRules = new Set(['media', 'supports', 'container', 'keyframes', '-webkit-keyframes'])
const forbiddenProperties = new Set(['behavior', '-moz-binding'])
const forbiddenShadowPseudos = new Set([':host', ':host-context', '::slotted', '::part'])

const cssError = (message) => new Error(`文章 CSS 无法安全处理：${message}`)

const decodeCssEscapes = (value = '') => String(value).replace(
  /\\([0-9a-f]{1,6}\s?|.)/gi,
  (_, escaped) => {
    const hex = escaped.trim()
    return /^[0-9a-f]+$/i.test(hex)
      ? String.fromCodePoint(Number.parseInt(hex, 16))
      : escaped
  }
)

const isSafeCssUrl = (rawValue = '') => {
  const value = decodeCssEscapes(String(rawValue).trim().replace(/^(['"])(.*)\1$/s, '$2'))
  if (!value) return false
  if (/^(?:#|\/|\.\/|\.\.\/)/.test(value)) return true
  if (/^https?:\/\//i.test(value)) return true
  return /^data:image\/(?:png|jpe?g|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i.test(value)
}

const selectorProcessor = selectorParser((selectors) => {
  selectors.walkPseudos((pseudo) => {
    const name = decodeCssEscapes(pseudo.value).toLowerCase()
    if (name === ':root') {
      pseudo.replaceWith(selectorParser.attribute({ attribute: 'data-article-root' }))
      return
    }
    if (forbiddenShadowPseudos.has(name)) {
      throw cssError(`${pseudo.value} 不允许选择文章容器之外的节点`)
    }
  })
  selectors.walkTags((tag) => {
    if (['html', 'body'].includes(decodeCssEscapes(tag.value).toLowerCase())) {
      throw cssError(`${tag.value} 选择器不适用于文章片段，请改用 [data-article-root]`)
    }
  })
})

const isKeyframeRule = (rule) => {
  let parent = rule.parent
  while (parent) {
    if (parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return true
    parent = parent.parent
  }
  return false
}

const validateDeclaration = (declaration) => {
  const property = decodeCssEscapes(declaration.prop).toLowerCase()
  if (forbiddenProperties.has(property)) {
    throw cssError(`不允许使用 ${declaration.prop}`)
  }

  const parsed = valueParser(declaration.value)
  parsed.walk((node) => {
    if (node.type !== 'function') return
    const functionName = decodeCssEscapes(node.value).toLowerCase()
    if (functionName === 'expression') throw cssError('不允许使用 expression()')
    if (functionName !== 'url') return
    const target = valueParser.stringify(node.nodes)
    if (!isSafeCssUrl(target)) throw cssError(`不安全的 url(${target})`)
  })
}

export const compileArticleCss = (value = '') => {
  const source = String(value || '')
  if (!source.trim()) return ''
  if (source.length > maxArticleCssLength) throw cssError(`样式超过 ${maxArticleCssLength} 字符`)

  const root = postcss.parse(source, { from: undefined })
  root.walkAtRules((atRule) => {
    const name = decodeCssEscapes(atRule.name).toLowerCase()
    if (!allowedAtRules.has(name)) throw cssError(`不允许使用 @${atRule.name}`)
  })
  root.walkRules((rule) => {
    if (isKeyframeRule(rule)) return
    rule.selector = selectorProcessor.processSync(rule.selector)
  })
  root.walkDecls(validateDeclaration)
  return root.toString()
}

const ensureArticleRoot = (value = '') => {
  const $ = load(String(value || ''), null, false)
  const meaningful = $.root().contents().filter((_, node) =>
    node.type === 'tag' || (node.type === 'text' && Boolean(node.data?.trim())))
  const soleRoot = meaningful.length === 1
    && meaningful.get(0)?.type === 'tag'
    && $(meaningful.get(0)).is('[data-article-root]')

  if (soleRoot) return $.html()
  $('[data-article-root]').removeAttr('data-article-root')
  return `<article data-article-root>${$.html()}</article>`
}

export const prepareSelfContainedHtml = (value = '') => {
  const $ = load(String(value || ''), null, false)
  const cssSource = $('style[data-article-style]').map((_, element) => $(element).html() || '').get().join('\n')
  $('style').remove()

  const sanitized = sanitizeRichHtml($.html(), {
    allowIframes: false,
    allowArticleRoot: true
  })
  const html = ensureArticleRoot(sanitized)

  try {
    return { html, css: compileArticleCss(cssSource), fallback: false, error: '' }
  } catch (error) {
    return {
      html,
      css: '',
      fallback: true,
      error: error instanceof Error ? error.message : '未知 CSS 解析错误'
    }
  }
}

export const renderSelfContainedHtml = (
  value,
  imageManifest = {},
  env = {},
  { assetBaseUrl = process.env.IMAGE_ASSET_BASE_URL || '' } = {}
) => {
  const prepared = prepareSelfContainedHtml(value)
  return {
    ...prepared,
    html: renderRichHtml(prepared.html, imageManifest, env, {
      assetBaseUrl,
      allowEmbeds: false,
      allowArticleRoot: true,
      layoutEnhancements: false
    })
  }
}
