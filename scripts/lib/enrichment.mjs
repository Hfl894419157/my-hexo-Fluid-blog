import { createHash } from 'node:crypto'
import { promises as dns } from 'node:dns'
import { mkdir, writeFile } from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'

export const enrichmentModes = new Set(['fill_empty', 'refresh_auto', 'overwrite_all'])

const videoDomains = {
  youtube: ['youtube.com', 'youtu.be', 'youtube-nocookie.com'],
  bilibili: ['bilibili.com', 'b23.tv'],
  tencent: ['v.qq.com'],
  youku: ['youku.com'],
  douyin: ['douyin.com'],
  xiaohongshu: ['xiaohongshu.com', 'xhslink.com'],
  wechat: ['channels.weixin.qq.com', 'weixin.qq.com']
}

const downloadDomains = {
  baidu: ['pan.baidu.com'],
  aliyun: ['aliyundrive.com', 'alipan.com'],
  quark: ['pan.quark.cn'],
  pan123: ['123pan.com', '123684.com'],
  lanzou: ['lanzou.com', 'lanzoui.com', 'lanzoux.com', 'lanzouu.com']
}

const metadataDomains = [
  'youtube.com', 'youtu.be', 'bilibili.com', 'b23.tv', 'api.bilibili.com'
]

const imageDomains = [
  'i.ytimg.com', 'img.youtube.com', 'hdslb.com', 'bfsstatic.com'
]

const automatedFields = {
  video: ['url', 'platform', 'title', 'summary', 'tags', 'platformCover', 'duration', 'aspect'],
  download: ['url', 'platform', 'code', 'name', 'summary', 'format', 'size', 'platformCover']
}

const hostMatches = (hostname, domain) => hostname === domain || hostname.endsWith(`.${domain}`)

export const isAllowedHostname = (hostname, domains) => {
  const normalized = String(hostname || '').toLowerCase().replace(/\.$/, '')
  return domains.some((domain) => hostMatches(normalized, domain))
}

export const isPrivateAddress = (address) => {
  const value = String(address || '').toLowerCase().split('%', 1)[0]
  if (net.isIPv4(value)) {
    const parts = value.split('.').map(Number)
    return parts[0] === 0
      || parts[0] === 10
      || parts[0] === 127
      || (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127)
      || (parts[0] === 169 && parts[1] === 254)
      || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
      || (parts[0] === 192 && parts[1] === 168)
      || (parts[0] === 198 && (parts[1] === 18 || parts[1] === 19))
      || parts[0] >= 224
  }
  if (net.isIPv6(value)) {
    if (value === '::' || value === '::1' || value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe8') || value.startsWith('fe9') || value.startsWith('fea') || value.startsWith('feb')) return true
    const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
    return mapped ? isPrivateAddress(mapped[1]) : false
  }
  return true
}

const validateRemoteUrl = (rawUrl, domains) => {
  let url
  try {
    url = new URL(rawUrl)
  } catch {
    throw new Error('链接格式无效')
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('只允许 HTTP(S) 链接')
  if (url.username || url.password) throw new Error('链接不能包含认证信息')
  if (!isAllowedHostname(url.hostname, domains)) throw new Error(`不允许访问域名：${url.hostname}`)
  return url
}

const assertPublicDns = async (url, lookupImpl = dns.lookup) => {
  if (net.isIP(url.hostname)) {
    if (isPrivateAddress(url.hostname)) throw new Error('已拦截私有网络地址')
    return
  }
  const addresses = await lookupImpl(url.hostname, { all: true, verbatim: true })
  if (!addresses.length || addresses.some((entry) => isPrivateAddress(entry.address))) {
    throw new Error('域名解析到了私有或无效地址')
  }
}

const readLimitedBody = async (response, maxBytes) => {
  const declared = Number(response.headers.get('content-length') || 0)
  if (declared > maxBytes) throw new Error(`响应超过 ${maxBytes} 字节限制`)
  if (!response.body) return new Uint8Array()
  const reader = response.body.getReader()
  const chunks = []
  let length = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    length += value.byteLength
    if (length > maxBytes) {
      await reader.cancel()
      throw new Error(`响应超过 ${maxBytes} 字节限制`)
    }
    chunks.push(value)
  }
  const output = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) {
    output.set(chunk, offset)
    offset += chunk.byteLength
  }
  return output
}

export const safeRequest = async (rawUrl, {
  domains = metadataDomains,
  fetchImpl = globalThis.fetch,
  lookupImpl = dns.lookup,
  timeoutMs = 5000,
  maxBytes = 1024 * 1024,
  maxRedirects = 3,
  readBody = true
} = {}) => {
  if (typeof fetchImpl !== 'function') throw new Error('当前 Node 环境不支持 fetch')
  let url = validateRemoteUrl(rawUrl, domains)
  for (let redirect = 0; redirect <= maxRedirects; redirect += 1) {
    await assertPublicDns(url, lookupImpl)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    let response
    try {
      response = await fetchImpl(url, {
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'user-agent': 'LiuliContentEnrichment/1.0 (+https://liulicc.cn)' }
      })
    } finally {
      clearTimeout(timeout)
    }
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location')
      if (!location) throw new Error('重定向缺少目标地址')
      if (redirect === maxRedirects) throw new Error('重定向次数过多')
      url = validateRemoteUrl(new URL(location, url).toString(), domains)
      continue
    }
    if (!response.ok) throw new Error(`远端返回 HTTP ${response.status}`)
    if (!readBody) {
      await response.body?.cancel()
      return { url: url.toString(), response, bytes: new Uint8Array() }
    }
    return { url: url.toString(), response, bytes: await readLimitedBody(response, maxBytes) }
  }
  throw new Error('重定向次数过多')
}

const extractUrls = (text) => [...String(text || '').matchAll(/https?:\/\/[^\s<>"']+/gi)]
  .map((match) => match[0].replace(/[，。；;、）)\]】}>]+$/g, ''))

const uniqueUrls = (block) => {
  const values = [block.url, ...extractUrls(block.rawInput)].filter(Boolean)
  return [...new Set(values.map((value) => {
    const text = String(value).trim()
    try {
      return new URL(text).toString()
    } catch {
      return text
    }
  }))]
}

const classifyUrl = (rawUrl, groups) => {
  let hostname
  try {
    hostname = new URL(rawUrl).hostname.toLowerCase()
  } catch {
    return ''
  }
  return Object.entries(groups).find(([, domains]) => isAllowedHostname(hostname, domains))?.[0] || ''
}

export const classifyVideoUrl = (url) => classifyUrl(url, videoDomains)
export const classifyDownloadUrl = (url) => classifyUrl(url, downloadDomains)

export const parseYoutubeId = (rawUrl) => {
  try {
    const url = new URL(rawUrl)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || ''
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') return url.searchParams.get('v') || ''
      return url.pathname.match(/^\/(?:shorts|embed)\/([\w-]{6,})/)?.[1] || ''
    }
  } catch {}
  return ''
}

export const parseBilibiliId = (rawValue) => {
  const value = String(rawValue || '')
  const bvid = value.match(/\b(BV[0-9A-Za-z]+)\b/i)?.[1]
  if (bvid) return { bvid }
  const aid = value.match(/(?:\bav|\/video\/av)(\d+)\b/i)?.[1]
  return aid ? { aid } : {}
}

export const parseAccessCode = (text) => {
  const matches = [...String(text || '').matchAll(/(?:提取码|密码|访问码|code|pwd)\s*[:：=]?\s*([0-9A-Za-z]{2,12})/gi)]
  const values = [...new Set(matches.map((match) => match[1]))]
  return values.length === 1 ? values[0] : ''
}

const parseExplicitField = (text, labels, valuePattern = '[^\r\n]+') => {
  const pattern = new RegExp(`(?:${labels.join('|')})\\s*[:：=]\\s*(${valuePattern})`, 'i')
  return String(text || '').match(pattern)?.[1]?.trim() || ''
}

const formatDuration = (seconds) => {
  const value = Number(seconds)
  if (!Number.isFinite(value) || value <= 0) return ''
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const secs = Math.floor(value % 60)
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}` : `${minutes}:${String(secs).padStart(2, '0')}`
}

const jsonFromBytes = (bytes) => JSON.parse(new TextDecoder().decode(bytes))

const downloadCover = async (remoteUrl, { repoRoot, fetchImpl, lookupImpl }) => {
  if (!remoteUrl || !repoRoot) return ''
  const result = await safeRequest(remoteUrl, {
    domains: imageDomains,
    fetchImpl,
    lookupImpl,
    maxBytes: 2 * 1024 * 1024,
    timeoutMs: 5000,
    maxRedirects: 2
  })
  const contentType = result.response.headers.get('content-type')?.split(';', 1)[0].toLowerCase()
  const bytes = result.bytes
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  const isPng = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value)
  const isWebp = new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP'
  const extension = isJpeg ? 'jpg' : isPng ? 'png' : isWebp ? 'webp' : ''
  const expectedType = extension === 'jpg' ? 'image/jpeg' : extension ? `image/${extension}` : ''
  if (!extension || contentType !== expectedType) throw new Error(`不允许或内容不符的封面格式：${contentType || 'unknown'}`)
  const hash = createHash('sha256').update(result.bytes).digest('hex').slice(0, 20)
  const directory = path.join(repoRoot, 'public', 'images', 'uploads', 'auto')
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, `${hash}.${extension}`), result.bytes)
  return `/images/uploads/auto/${hash}.${extension}`
}

const fetchYoutubeMetadata = async (url, options) => {
  const id = parseYoutubeId(url)
  if (!id) throw new Error('无法识别 YouTube 视频 ID')
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`
  const result = await safeRequest(endpoint, { ...options, domains: metadataDomains })
  const data = jsonFromBytes(result.bytes)
  return { title: data.title || '', summary: '', remoteCover: data.thumbnail_url || '' }
}

const fetchBilibiliMetadata = async (url, options) => {
  let canonicalUrl = url
  if (isAllowedHostname(new URL(url).hostname, ['b23.tv'])) {
    const resolved = await safeRequest(url, { ...options, domains: metadataDomains, readBody: false })
    canonicalUrl = resolved.url
  }
  const ids = parseBilibiliId(canonicalUrl)
  if (!ids.bvid && !ids.aid) throw new Error('无法识别哔哩哔哩 BV/AV 号')
  const query = ids.bvid ? `bvid=${encodeURIComponent(ids.bvid)}` : `aid=${encodeURIComponent(ids.aid)}`
  const result = await safeRequest(`https://api.bilibili.com/x/web-interface/view?${query}`, { ...options, domains: metadataDomains })
  const payload = jsonFromBytes(result.bytes)
  if (payload.code !== 0 || !payload.data) throw new Error(payload.message || '哔哩哔哩未返回视频信息')
  return {
    canonicalUrl,
    title: payload.data.title || '',
    summary: payload.data.desc || '',
    duration: formatDuration(payload.data.duration),
    remoteCover: payload.data.pic || ''
  }
}

const isEmpty = (value) => value == null || value === '' || (Array.isArray(value) && value.length === 0)
const equalValue = (left, right) => JSON.stringify(left ?? null) === JSON.stringify(right ?? null)
const emptyValue = (field) => field === 'tags' ? [] : ''

export const applyCandidate = (block, candidate, mode) => {
  if (!enrichmentModes.has(mode)) throw new Error(`不支持识别模式：${mode}`)
  const output = structuredClone(block)
  const previousAuto = block._enrichment?.autoValues || {}
  const fields = automatedFields[block.type] || []
  const autoValues = structuredClone(previousAuto)

  for (const field of Object.keys(autoValues)) {
    if (!equalValue(output[field], autoValues[field])) delete autoValues[field]
  }

  for (const field of fields) {
    const hasCandidate = Object.hasOwn(candidate, field) && !isEmpty(candidate[field])
    if (mode === 'fill_empty') {
      if (isEmpty(output[field]) && hasCandidate) {
        output[field] = candidate[field]
        autoValues[field] = candidate[field]
      }
      continue
    }
    if (mode === 'refresh_auto') {
      const canUpdate = isEmpty(output[field]) || (Object.hasOwn(previousAuto, field) && equalValue(output[field], previousAuto[field]))
      if (canUpdate && (hasCandidate || Object.hasOwn(previousAuto, field))) {
        output[field] = hasCandidate ? candidate[field] : emptyValue(field)
        autoValues[field] = output[field]
      }
      continue
    }
    output[field] = hasCandidate ? candidate[field] : emptyValue(field)
    autoValues[field] = output[field]
  }
  return { block: output, autoValues }
}

const stateFor = (block, rawSource, status, message, autoValues = block._enrichment?.autoValues || {}) => ({
  ...block,
  _enrichment: {
    sourceHash: createHash('sha256').update(rawSource).digest('hex'),
    status,
    message,
    autoValues
  }
})

const enrichVideo = async (block, mode, options) => {
  const urls = uniqueUrls(block)
  const rawSource = `${block.rawInput || ''}\n${block.url || ''}`
  if (!urls.length) return stateFor(block, rawSource, 'skipped', '未找到视频链接')
  if (urls.length > 1) return stateFor(block, rawSource, 'needs_confirmation', `检测到 ${urls.length} 个链接，请保留一个后重试`)
  const url = urls[0]
  const platform = classifyVideoUrl(url)
  if (!platform) return stateFor(block, rawSource, 'skipped', '链接不属于允许的视频平台')

  const candidate = { url, platform }
  let status = 'success'
  let message = '已识别平台与链接'
  try {
    let metadata = {}
    if (platform === 'youtube') metadata = await fetchYoutubeMetadata(url, options)
    if (platform === 'bilibili') metadata = await fetchBilibiliMetadata(url, options)
    if (metadata.canonicalUrl) candidate.url = metadata.canonicalUrl
    for (const field of ['title', 'summary', 'duration']) {
      if (metadata[field]) candidate[field] = metadata[field]
    }
    if (metadata.remoteCover) {
      candidate.platformCover = await downloadCover(metadata.remoteCover, options)
    }
    if (platform === 'youtube' || platform === 'bilibili') message = '已获取可验证的视频信息'
    else {
      status = 'partial'
      message = '该平台使用外链卡片，不加载站内播放器'
    }
  } catch (error) {
    status = 'partial'
    message = `已识别链接，远端信息获取失败：${error.message}`
  }
  const applied = applyCandidate(block, candidate, mode)
  return stateFor(applied.block, rawSource, status, message, applied.autoValues)
}

const enrichDownload = async (block, mode) => {
  const urls = uniqueUrls(block)
  const rawSource = `${block.rawInput || ''}\n${block.url || ''}`
  if (!urls.length) return stateFor(block, rawSource, 'skipped', '未找到网盘链接')
  if (urls.length > 1) return stateFor(block, rawSource, 'needs_confirmation', `检测到 ${urls.length} 个链接，请确认后重试`)
  const url = urls[0]
  const platform = classifyDownloadUrl(url)
  if (!platform) return stateFor(block, rawSource, 'skipped', '链接不属于允许的网盘平台')
  const text = block.rawInput || ''
  const candidate = { url, platform }
  const code = parseAccessCode(text)
  const name = parseExplicitField(text, ['资源名称', '文件名', '名称'])
  const format = parseExplicitField(text, ['文件格式', '格式'], '[0-9A-Za-z.]{1,12}')
  const size = parseExplicitField(text, ['文件大小', '大小'], '[0-9.]+\\s*(?:KB|MB|GB|TB)')
  const summary = parseExplicitField(text, ['资源说明', '说明', '简介'])
  if (code) candidate.code = code
  if (name) candidate.name = name
  if (format) candidate.format = format
  if (size) candidate.size = size
  if (summary) candidate.summary = summary
  const applied = applyCandidate(block, candidate, mode)
  return stateFor(applied.block, rawSource, 'success', '已识别明确的网盘分享信息', applied.autoValues)
}

export const enrichContentBlocks = async (blocks, mode = 'fill_empty', options = {}) => {
  if (!enrichmentModes.has(mode)) throw new Error(`不支持识别模式：${mode}`)
  const output = []
  const report = []
  for (const block of blocks || []) {
    let updated = block
    if (block.type === 'video') updated = await enrichVideo(block, mode, options)
    if (block.type === 'download') updated = await enrichDownload(block, mode)
    output.push(updated)
    if (updated._enrichment) report.push({ id: block.id, type: block.type, status: updated._enrichment.status, message: updated._enrichment.message })
  }
  return { blocks: output, report }
}
