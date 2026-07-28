import assert from 'node:assert/strict'
import test from 'node:test'
import {
  normalizeImageAssetBaseUrl,
  resolveGeneratedImageAssetUrl
} from '../.shared/imageAssetUrls.mjs'

test('normalizes the image asset origin without changing an empty configuration', () => {
  assert.equal(normalizeImageAssetBaseUrl(' https://img.liulicc.cn/// '), 'https://img.liulicc.cn')
  assert.equal(normalizeImageAssetBaseUrl(''), '')
})

test('rewrites only generated image variants to the configured asset origin', () => {
  assert.equal(
    resolveGeneratedImageAssetUrl('/_generated/images/hash/760.avif', 'https://img.liulicc.cn/'),
    'https://img.liulicc.cn/_generated/images/hash/760.avif'
  )
  assert.equal(
    resolveGeneratedImageAssetUrl('/_generated/images/hash/760.webp?v=1', 'https://img.liulicc.cn'),
    'https://img.liulicc.cn/_generated/images/hash/760.webp?v=1'
  )
  assert.equal(
    resolveGeneratedImageAssetUrl('/images/uploads/original.jpg', 'https://img.liulicc.cn'),
    '/images/uploads/original.jpg'
  )
  assert.equal(
    resolveGeneratedImageAssetUrl('https://example.com/image.avif', 'https://img.liulicc.cn'),
    'https://example.com/image.avif'
  )
})
