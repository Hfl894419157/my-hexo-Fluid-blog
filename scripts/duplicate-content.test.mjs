import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import matter from 'gray-matter'
import { duplicateContentData, duplicateContentFile, validateDuplicateInput } from './duplicate-content.mjs'

test('复制内容会重建编号并强制生成安全草稿', () => {
  const source = {
    contentId: '3b346090-470d-48a6-aba6-c9b910769816',
    meta: { title: '原标题', description: '摘要', tags: ['标签'] },
    publishing: { createdAt: '2026-01-01', status: 'published', verificationStatus: '已验证', showInRecentUpdates: true },
    seo: { title: '自定义 SEO', description: '自定义描述' },
    project: { role: '设计师' },
    contentBlocks: [{ id: 'c7b8ee84-2946-4a02-98c2-5d03b66d8728', type: 'richText', markdown: '正文', _enrichment: { status: 'done' } }]
  }
  const copy = duplicateContentData(source, { title: '新标题', date: '2026-07-16' })

  assert.notEqual(copy.contentId, source.contentId)
  assert.equal(copy.meta.title, '新标题')
  assert.equal(copy.publishing.status, 'draft')
  assert.equal(copy.publishing.createdAt, '2026-07-16')
  assert.equal(copy.publishing.verificationStatus, '探索中')
  assert.equal(copy.publishing.showInRecentUpdates, false)
  assert.deepEqual(copy.seo, {})
  assert.deepEqual(copy.project, source.project)
  assert.notEqual(copy.contentBlocks[0].id, source.contentBlocks[0].id)
  assert.equal(copy.contentBlocks[0]._enrichment, undefined)
})

test('复制文件自动生成可读且唯一的文件名，并兼容旧的手工文件名', () => {
  assert.throws(() => validateDuplicateInput({ source: 'aigc/source.md', title: '标题', filename: 'Bad Name' }), /新文件名/)
  const root = mkdtempSync(path.join(os.tmpdir(), 'duplicate-content-'))
  try {
    mkdirSync(path.join(root, 'aigc'))
    writeFileSync(path.join(root, 'aigc', 'source.md'), matter.stringify('', {
      contentId: '3b346090-470d-48a6-aba6-c9b910769816',
      meta: { title: '源文章' },
      publishing: { status: 'published' },
      contentBlocks: []
    }))
    const destination = duplicateContentFile({ root, source: 'aigc/source.md', title: 'AI 副本', date: '2026-07-16' })
    assert.equal(destination, 'aigc/ai-fu-ben-20260716-000000000.md')
    assert.equal(matter(readFileSync(path.join(root, destination), 'utf8')).data.publishing.status, 'draft')
    const secondDestination = duplicateContentFile({ root, source: 'aigc/source.md', title: 'AI 副本', date: '2026-07-16' })
    assert.equal(secondDestination, 'aigc/ai-fu-ben-20260716-000000000-2.md')
    const legacyDestination = duplicateContentFile({ root, source: 'aigc/source.md', title: '副本', filename: 'safe-copy' })
    assert.equal(legacyDestination, 'aigc/safe-copy.md')
    assert.throws(() => duplicateContentFile({ root, source: 'aigc/source.md', title: '副本', filename: 'safe-copy' }), /已存在/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
