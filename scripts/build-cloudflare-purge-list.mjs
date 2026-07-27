import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { buildPurgeUrls } from './cloudflare-cache.mjs'

const readArgument = (name) => {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : ''
}

const distDirectory = path.resolve(readArgument('--dist') || '.vitepress/dist')
const outputPath = path.resolve(
  readArgument('--output') || '.vitepress/cache/cloudflare-purge-urls.json'
)
const baseUrl = readArgument('--base-url') || 'https://liulicc.cn'
const urls = buildPurgeUrls(distDirectory, baseUrl)

if (urls.length === 0) throw new Error('未找到可清理的 HTML 页面')

mkdirSync(path.dirname(outputPath), { recursive: true })
writeFileSync(outputPath, `${JSON.stringify({ urls }, null, 2)}\n`)
console.log(`已生成 ${urls.length} 个 Cloudflare 页面缓存地址：${outputPath}`)
