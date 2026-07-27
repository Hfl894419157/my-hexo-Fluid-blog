import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const walkHtmlFiles = (directory, root = directory) => readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) return walkHtmlFiles(absolutePath, root)
    if (!entry.isFile() || !entry.name.endsWith('.html')) return []
    return [path.relative(root, absolutePath).replaceAll(path.sep, '/')]
  })

export const buildPurgeUrls = (distDirectory, baseUrl) => {
  const normalizedBase = new URL(baseUrl)
  const paths = new Set(['/sitemap.xml'])

  for (const relativePath of walkHtmlFiles(distDirectory)) {
    if (relativePath === 'index.html') {
      paths.add('/')
      paths.add('/index.html')
      continue
    }

    if (relativePath.endsWith('/index.html')) {
      const route = `/${relativePath.slice(0, -'index.html'.length)}`
      paths.add(route)
      paths.add(`/${relativePath}`)
      continue
    }

    const htmlPath = `/${relativePath}`
    paths.add(htmlPath)
    paths.add(htmlPath.slice(0, -'.html'.length))
  }

  return [...paths]
    .map((pathname) => new URL(pathname, normalizedBase).href)
    .sort()
}

export const chunkPurgeUrls = (urls, batchSize = 30) => {
  if (!Number.isInteger(batchSize) || batchSize < 1) {
    throw new TypeError('batchSize 必须是正整数')
  }

  const batches = []
  for (let index = 0; index < urls.length; index += batchSize) {
    batches.push(urls.slice(index, index + batchSize))
  }
  return batches
}

export const readPurgeManifest = (manifestPath) => {
  const parsed = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (!Array.isArray(parsed.urls) || parsed.urls.some((url) => typeof url !== 'string')) {
    throw new TypeError('Cloudflare 清理清单必须包含字符串 urls 数组')
  }
  return parsed.urls
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href

if (isDirectRun) {
  const manifestIndex = process.argv.indexOf('--manifest')
  const manifestPath = manifestIndex >= 0 ? process.argv[manifestIndex + 1] : ''
  const zoneId = process.env.CLOUDFLARE_ZONE_ID || ''
  const apiToken = process.env.CLOUDFLARE_API_TOKEN || ''

  if (!zoneId || !apiToken) {
    console.log('未配置 Cloudflare Secrets，跳过缓存清理。')
    process.exit(0)
  }

  if (!manifestPath) throw new Error('缺少 --manifest 参数')

  const urls = readPurgeManifest(manifestPath)
  if (urls.length === 0) throw new Error('Cloudflare 清理清单不能为空')

  for (const files of chunkPurgeUrls(urls)) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files })
      }
    )
    const body = await response.json()
    if (!response.ok || !body.success) {
      throw new Error(`Cloudflare 精确缓存清理失败：${JSON.stringify(body.errors || body)}`)
    }
    console.log(`已清理 ${files.length} 个页面缓存。`)
  }
}
