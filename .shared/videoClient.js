const BV_PATTERN = /\b(BV[0-9A-Za-z]{10})\b/i
const OSS_VIDEO_HOSTNAME = 'video.liulicc.cn'
const OSS_VIDEO_PATH = /^\/videos\/[a-f0-9]{2}\/[a-f0-9]{64}\.mp4$/i

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

export const extractOssVideoUrl = (value = '') => {
  const text = String(value).trim()
  if (!text) return ''

  try {
    const url = new URL(text)
    if (url.protocol !== 'https:') return ''
    if (url.hostname.toLowerCase() !== OSS_VIDEO_HOSTNAME) return ''
    if (!OSS_VIDEO_PATH.test(url.pathname)) return ''
    if (url.search || url.hash) return ''
    return url.toString()
  } catch {
    return ''
  }
}

export const resolveHomeVideoSource = (value = '') => {
  const url = String(value).trim()
  const bvid = extractBilibiliId(url)
  if (bvid) return { sourceType: 'bilibili', url, bvid }

  const ossUrl = extractOssVideoUrl(url)
  if (ossUrl) return { sourceType: 'oss', url: ossUrl, bvid: '' }

  return { sourceType: '', url: '', bvid: '' }
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
      return Boolean(resolveHomeVideoSource(item.url).sourceType)
    })
    .slice(0, 4)
    .map((item) => {
      const source = resolveHomeVideoSource(item.url)
      return {
        id: String(item.id),
        title: String(item.title).trim(),
        category: String(item.category).trim(),
        description: String(item.description).trim(),
        poster: String(item.poster).trim(),
        url: source.url,
        duration: String(item.duration || '').trim(),
        sourceType: source.sourceType,
        bvid: source.bvid
      }
    })
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
      sourceType: '',
      bvid: ''
    }))
}
