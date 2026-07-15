import assert from 'node:assert/strict'
import { access, mkdtemp, readFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  applyCandidate,
  classifyDownloadUrl,
  classifyVideoUrl,
  enrichContentBlocks,
  isAllowedHostname,
  isPrivateAddress,
  parseAccessCode,
  parseBilibiliId,
  parseYoutubeId,
  safeRequest
} from './lib/enrichment.mjs'

const publicLookup = async () => [{ address: '8.8.8.8', family: 4 }]

test('识别 YouTube 普通、短链接、Shorts 和 embed 地址', () => {
  assert.equal(parseYoutubeId('https://www.youtube.com/watch?v=abcDEF12345'), 'abcDEF12345')
  assert.equal(parseYoutubeId('https://youtu.be/abcDEF12345?t=12'), 'abcDEF12345')
  assert.equal(parseYoutubeId('https://youtube.com/shorts/abcDEF12345'), 'abcDEF12345')
  assert.equal(parseYoutubeId('https://www.youtube.com/embed/abcDEF12345'), 'abcDEF12345')
})

test('识别哔哩哔哩 BV 和 AV 号', () => {
  assert.deepEqual(parseBilibiliId('https://www.bilibili.com/video/BV1xx411c7mD'), { bvid: 'BV1xx411c7mD' })
  assert.deepEqual(parseBilibiliId('https://www.bilibili.com/video/av170001'), { aid: '170001' })
})

test('只分类允许的视频和网盘域名', () => {
  assert.equal(classifyVideoUrl('https://m.youtube.com/watch?v=abcDEF12345'), 'youtube')
  assert.equal(classifyVideoUrl('https://www.bilibili.com/video/BV1xx411c7mD'), 'bilibili')
  assert.equal(classifyVideoUrl('https://v.douyin.com/example'), 'douyin')
  assert.equal(classifyVideoUrl('https://evil.example/youtube.com/video'), '')
  assert.equal(classifyDownloadUrl('https://pan.baidu.com/s/abcdef'), 'baidu')
  assert.equal(classifyDownloadUrl('https://www.aliyundrive.com/s/abcdef'), 'aliyun')
  assert.equal(classifyDownloadUrl('https://pan.quark.cn/s/abcdef'), 'quark')
  assert.equal(classifyDownloadUrl('https://www.123pan.com/s/abcdef'), 'pan123')
  assert.equal(classifyDownloadUrl('https://example.lanzoux.com/abcdef'), 'lanzou')
})

test('提取中文和英文访问码', () => {
  assert.equal(parseAccessCode('提取码：A1b2'), 'A1b2')
  assert.equal(parseAccessCode('pwd=9X7q'), '9X7q')
  assert.equal(parseAccessCode('密码：abcd\n访问码：efgh'), '')
})

test('网盘识别只填写明确出现的信息', async () => {
  const result = await enrichContentBlocks([{
    type: 'download', id: 'download-1', rawInput: '资源名称：品牌模板\n格式：ZIP\n大小：12.5 MB\n提取码：A1b2\nhttps://pan.baidu.com/s/example'
  }], 'fill_empty')
  const block = result.blocks[0]
  assert.equal(block.platform, 'baidu')
  assert.equal(block.code, 'A1b2')
  assert.equal(block.name, '品牌模板')
  assert.equal(block.format, 'ZIP')
  assert.equal(block.size, '12.5 MB')
  assert.equal(block.summary, undefined)
})

test('多链接时停止写入并提示确认', async () => {
  const original = { type: 'download', id: 'download-2', rawInput: 'https://pan.baidu.com/s/a https://pan.quark.cn/s/b', name: '人工名称' }
  const result = await enrichContentBlocks([original], 'fill_empty')
  const block = result.blocks[0]
  assert.equal(block.url, undefined)
  assert.equal(block.name, '人工名称')
  assert.equal(block._enrichment.status, 'needs_confirmation')
})

test('同一链接的标准化差异不会被误判为多链接', async () => {
  const result = await enrichContentBlocks([{
    type: 'download', id: 'download-normalized', url: 'https://pan.baidu.com', rawInput: 'https://pan.baidu.com/'
  }], 'fill_empty')
  assert.equal(result.blocks[0]._enrichment.status, 'success')
  assert.equal(result.blocks[0].platform, 'baidu')
})

test('仅补空白不会把人工字段标记为自动字段', () => {
  const applied = applyCandidate({ type: 'video', title: '人工标题' }, { title: '自动标题', platform: 'youtube' }, 'fill_empty')
  assert.equal(applied.block.title, '人工标题')
  assert.equal(applied.block.platform, 'youtube')
  assert.equal(applied.autoValues.title, undefined)
  assert.equal(applied.autoValues.platform, 'youtube')
})

test('更新自动字段会保护后来人工修改的值', () => {
  const automatic = applyCandidate({
    type: 'video', title: '旧自动标题', _enrichment: { autoValues: { title: '旧自动标题' } }
  }, { title: '新自动标题' }, 'refresh_auto')
  assert.equal(automatic.block.title, '新自动标题')

  const manual = applyCandidate({
    type: 'video', title: '人工改写标题', _enrichment: { autoValues: { title: '旧自动标题' } }
  }, { title: '新自动标题' }, 'refresh_auto')
  assert.equal(manual.block.title, '人工改写标题')
  assert.equal(manual.autoValues.title, undefined)
})

test('全部重新识别仍不覆盖自定义封面', () => {
  const applied = applyCandidate({ type: 'video', customCover: '/images/uploads/manual.jpg', title: '人工标题' }, { title: '自动标题' }, 'overwrite_all')
  assert.equal(applied.block.title, '自动标题')
  assert.equal(applied.block.customCover, '/images/uploads/manual.jpg')
})

test('YouTube 无密钥 oEmbed 只补充可验证字段', async () => {
  const fetchImpl = async (url) => {
    assert.match(String(url), /youtube\.com\/oembed/)
    return new Response(JSON.stringify({ title: '真实标题', thumbnail_url: 'https://i.ytimg.com/vi/abcDEF12345/hqdefault.jpg' }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })
  }
  const result = await enrichContentBlocks([{
    type: 'video', id: 'video-1', rawInput: 'https://youtu.be/abcDEF12345'
  }], 'fill_empty', { fetchImpl, lookupImpl: publicLookup })
  assert.equal(result.blocks[0].platform, 'youtube')
  assert.equal(result.blocks[0].title, '真实标题')
  assert.equal(result.blocks[0].duration, undefined)
})

test('哔哩哔哩短链接解析公开元数据', async () => {
  const fetchImpl = async (url) => {
    const value = String(url)
    if (value.startsWith('https://b23.tv/')) return new Response('', { status: 302, headers: { location: 'https://www.bilibili.com/video/BV1xx411c7mD' } })
    if (value.startsWith('https://www.bilibili.com/video/')) return new Response('<html></html>', { status: 200, headers: { 'content-type': 'text/html' } })
    if (value.startsWith('https://api.bilibili.com/')) {
      return new Response(JSON.stringify({ code: 0, data: { title: '哔哩哔哩标题', desc: '公开视频说明', duration: 125, pic: '' } }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    }
    throw new Error(`unexpected URL ${value}`)
  }
  const result = await enrichContentBlocks([{
    type: 'video', id: 'video-b23', rawInput: 'https://b23.tv/example'
  }], 'fill_empty', { fetchImpl, lookupImpl: publicLookup })
  assert.equal(result.blocks[0].platform, 'bilibili')
  assert.equal(result.blocks[0].url, 'https://www.bilibili.com/video/BV1xx411c7mD')
  assert.equal(result.blocks[0].title, '哔哩哔哩标题')
  assert.equal(result.blocks[0].duration, '2:05')
})

test('自动封面验证真实图片格式并保存到 auto 目录', async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'liuli-enrichment-'))
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64')
  const fetchImpl = async (url) => String(url).includes('/oembed')
    ? new Response(JSON.stringify({ title: '带封面视频', thumbnail_url: 'https://i.ytimg.com/vi/abcDEF12345/hqdefault.png' }), { status: 200 })
    : new Response(png, { status: 200, headers: { 'content-type': 'image/png', 'content-length': String(png.length) } })
  try {
    const result = await enrichContentBlocks([{
      type: 'video', id: 'video-cover', rawInput: 'https://youtu.be/abcDEF12345'
    }], 'fill_empty', { repoRoot: tempRoot, fetchImpl, lookupImpl: publicLookup })
    assert.match(result.blocks[0].platformCover, /^\/images\/uploads\/auto\/[0-9a-f]{20}\.png$/)
    await access(path.join(tempRoot, 'public', result.blocks[0].platformCover.replace(/^\//, '')))
  } finally {
    await rm(tempRoot, { recursive: true, force: true })
  }
})

test('外链视频平台不请求 iframe 元数据', async () => {
  let calls = 0
  const result = await enrichContentBlocks([{
    type: 'video', id: 'video-2', rawInput: 'https://v.qq.com/x/page/example.html'
  }], 'fill_empty', { fetchImpl: async () => { calls += 1 } })
  assert.equal(calls, 0)
  assert.equal(result.blocks[0].platform, 'tencent')
  assert.equal(result.blocks[0]._enrichment.status, 'partial')
})

test('视频播放器只有点击后才创建 iframe', async () => {
  const source = await readFile(new URL('../components/ContentVideo.vue', import.meta.url), 'utf8')
  assert.match(source, /v-if="activated && embedUrl"/)
  assert.match(source, /@click="activated = true"/)
  assert.doesNotMatch(source, /<img\b/)
})

test('域名匹配不能被伪造后缀绕过', () => {
  assert.equal(isAllowedHostname('api.bilibili.com', ['bilibili.com']), true)
  assert.equal(isAllowedHostname('bilibili.com.evil.example', ['bilibili.com']), false)
})

test('识别并拦截常见私网地址', () => {
  for (const address of ['127.0.0.1', '10.0.0.1', '172.16.0.1', '192.168.1.1', '169.254.1.1', '::1', 'fd00::1']) {
    assert.equal(isPrivateAddress(address), true, address)
  }
  assert.equal(isPrivateAddress('8.8.8.8'), false)
})

test('安全请求拒绝任意域名和私网 DNS 解析', async () => {
  await assert.rejects(() => safeRequest('https://example.com/data'), /不允许访问域名/)
  await assert.rejects(() => safeRequest('https://www.youtube.com/oembed', {
    lookupImpl: async () => [{ address: '127.0.0.1', family: 4 }],
    fetchImpl: async () => new Response('{}')
  }), /私有或无效地址/)
})

test('安全请求拒绝重定向到未允许域名', async () => {
  await assert.rejects(() => safeRequest('https://youtu.be/abcDEF12345', {
    lookupImpl: publicLookup,
    fetchImpl: async () => new Response('', { status: 302, headers: { location: 'https://evil.example/collect' } })
  }), /不允许访问域名/)
})

test('安全请求限制响应体大小', async () => {
  await assert.rejects(() => safeRequest('https://www.youtube.com/oembed', {
    lookupImpl: publicLookup,
    maxBytes: 4,
    fetchImpl: async () => new Response('12345', { status: 200, headers: { 'content-length': '5' } })
  }), /响应超过/)
})
