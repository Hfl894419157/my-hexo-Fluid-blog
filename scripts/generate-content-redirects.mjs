import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectContentRedirects } from './lib/content-history.mjs'
import { legacyRedirects, redirectOutputPath } from './lib/legacy-redirects.mjs'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const distDir = path.join(repoRoot, '.vitepress', 'dist')
const siteOrigin = 'https://liulicc.cn'

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const redirectHtml = (toUrl) => {
  const safeUrl = escapeHtml(toUrl)
  const canonical = `${siteOrigin}${safeUrl}`
  const scriptTarget = JSON.stringify(toUrl).replaceAll('<', '\\u003c')
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,follow">
    <meta http-equiv="refresh" content="0;url=${safeUrl}">
    <link rel="canonical" href="${canonical}">
    <title>页面已迁移</title>
    <script>location.replace(${scriptTarget} + location.search + location.hash)</script>
  </head>
  <body>
    <p>页面已迁移到 <a href="${safeUrl}">${safeUrl}</a>。</p>
  </body>
</html>
`
}

if (!existsSync(distDir)) throw new Error('未找到 .vitepress/dist，请先运行 VitePress 构建。')

let written = 0
let skipped = 0
const redirectMap = new Map()
for (const redirect of [...legacyRedirects, ...collectContentRedirects({ root: repoRoot })]) {
  if (!redirectMap.has(redirect.fromUrl)) redirectMap.set(redirect.fromUrl, redirect)
}

for (const redirect of redirectMap.values()) {
  const outputFile = path.join(distDir, redirectOutputPath(redirect.fromUrl))
  const targetFile = path.join(distDir, redirectOutputPath(redirect.toUrl))
  if (existsSync(outputFile) || !existsSync(targetFile)) {
    skipped += 1
    continue
  }
  mkdirSync(path.dirname(outputFile), { recursive: true })
  writeFileSync(outputFile, redirectHtml(redirect.toUrl), 'utf8')
  written += 1
}

console.log(`旧网址跳转生成完成：${written} 个，跳过已存在或未公开页面 ${skipped} 个。`)
