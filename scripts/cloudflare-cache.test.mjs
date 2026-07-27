import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { buildPurgeUrls, chunkPurgeUrls } from './cloudflare-cache.mjs'

test('Cloudflare 清理清单只包含页面和 sitemap，不包含静态资源', async (context) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'liuli-purge-'))
  context.after(() => rm(directory, { recursive: true, force: true }))

  mkdirSync(path.join(directory, 'portfolio'), { recursive: true })
  writeFileSync(path.join(directory, 'index.html'), '')
  writeFileSync(path.join(directory, 'resume.html'), '')
  writeFileSync(path.join(directory, 'portfolio', 'index.html'), '')
  writeFileSync(path.join(directory, 'app.js'), '')

  const urls = buildPurgeUrls(directory, 'https://liulicc.cn')

  assert.deepEqual(urls, [
    'https://liulicc.cn/',
    'https://liulicc.cn/index.html',
    'https://liulicc.cn/portfolio/',
    'https://liulicc.cn/portfolio/index.html',
    'https://liulicc.cn/resume',
    'https://liulicc.cn/resume.html',
    'https://liulicc.cn/sitemap.xml'
  ])
  assert.ok(urls.every((url) => !url.endsWith('.js')))
})

test('Cloudflare 页面地址按每批最多 30 条分组', () => {
  const urls = Array.from({ length: 61 }, (_, index) => `https://liulicc.cn/${index}`)
  assert.deepEqual(chunkPurgeUrls(urls).map((batch) => batch.length), [30, 30, 1])
  assert.throws(() => chunkPurgeUrls(urls, 0), /正整数/)
})
