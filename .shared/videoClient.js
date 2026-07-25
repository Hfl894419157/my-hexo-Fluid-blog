const BV_PATTERN = /\b(BV[0-9A-Za-z]{10})\b/i

export const extractBilibiliId = (value = '') => {
  const text = String(value).trim()
  if (!text) return ''

  const direct = text.match(/^BV[0-9A-Za-z]{10}$/i)
  if (direct) return direct[0].replace(/^bv/i, 'BV')

  let url
  try {
    url = new URL(text)
  } catch {
    return ''
  }

  const hostname = url.hostname.toLowerCase().replace(/^www\./, '')
  if (!['bilibili.com', 'm.bilibili.com', 'b23.tv'].includes(hostname)) return ''
  const match = `${url.pathname}${url.search}${url.hash}`.match(BV_PATTERN)
  return match ? match[1].replace(/^bv/i, 'BV') : ''
}

export const buildBilibiliEmbedUrl = (value = '', options = {}) => {
  const bvid = extractBilibiliId(value)
  if (!bvid) return ''
  const { autoplay = true, muted = false } = options
  const params = new URLSearchParams({
    bvid,
    page: '1',
    high_quality: '1',
    danmaku: '0',
    autoplay: autoplay ? '1' : '0',
    muted: muted ? '1' : '0'
  })
  return `https://player.bilibili.com/player.html?${params.toString()}`
}

export const normalizeHomeVideoCases = (items = []) => {
  if (!Array.isArray(items)) return []
  return items
    .filter((item) => {
      if (!item?.published) return false
      if (!String(item.id || '').trim()) return false
      if (!String(item.title || '').trim()) return false
      if (!String(item.category || '').trim()) return false
      if (!String(item.description || '').trim()) return false
      if (!String(item.poster || '').trim()) return false
      return Boolean(extractBilibiliId(item.url))
    })
    .slice(0, 4)
    .map((item) => ({
      id: String(item.id),
      title: String(item.title).trim(),
      category: String(item.category).trim(),
      description: String(item.description).trim(),
      poster: String(item.poster).trim(),
      url: String(item.url).trim(),
      duration: String(item.duration || '').trim(),
      bvid: extractBilibiliId(item.url)
    }))
}

export const normalizeHomeVideoPlaceholderCases = (items = []) => {
  if (!Array.isArray(items)) return []
  return items
    .filter((item) => {
      if (!String(item?.id || '').trim()) return false
      if (!String(item?.title || '').trim()) return false
      if (!String(item?.category || '').trim()) return false
      if (!String(item?.description || '').trim()) return false
      return Boolean(String(item?.poster || '').trim())
    })
    .slice(0, 4)
    .map((item) => ({
      id: String(item.id),
      title: String(item.title).trim(),
      category: String(item.category).trim(),
      description: String(item.description).trim(),
      poster: String(item.poster).trim(),
      url: '',
      duration: String(item.duration || '').trim(),
      bvid: ''
    }))
}
