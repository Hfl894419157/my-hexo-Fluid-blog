import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import sharp from 'sharp'
import {
  homeHeroLottieSource,
  prepareHomeHeroLottie
} from './prepare-home-lottie.mjs'

const hueBucket = (red, green, blue) => {
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min
  if (!delta) return 0
  let hue
  if (max === red) hue = (60 * ((green - blue) / delta) + 360) % 360
  else if (max === green) hue = 60 * ((blue - red) / delta + 2)
  else hue = 60 * ((red - green) / delta + 4)
  return Math.floor(hue / 45)
}

const collectHueBuckets = async (animation) => {
  const buckets = new Set()
  for (const asset of animation.assets || []) {
    if (!String(asset.p || '').startsWith('data:image/png;base64,')) continue
    const source = Buffer.from(asset.p.split(',', 2)[1], 'base64')
    const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    for (let offset = 0; offset < data.length; offset += info.channels) {
      if (data[offset + 3] < 220) continue
      const chroma = Math.max(data[offset], data[offset + 1], data[offset + 2])
        - Math.min(data[offset], data[offset + 1], data[offset + 2])
      if (chroma >= 40) buckets.add(hueBucket(data[offset], data[offset + 1], data[offset + 2]))
    }
  }
  return buckets
}

test('首页 Lottie 生成浅色与深色主题并保留原始动画结构', async () => {
  const outputDirectory = await mkdtemp(path.join(os.tmpdir(), 'liuli-lottie-'))
  try {
    const source = JSON.parse(await readFile(homeHeroLottieSource, 'utf8'))
    const outputs = await prepareHomeHeroLottie({ outputDirectory })
    assert.equal(outputs.length, 2)

    const themedAnimations = []
    for (const output of outputs) {
      const themed = JSON.parse(await readFile(output, 'utf8'))
      themedAnimations.push(themed)
      assert.equal(themed.w, 800)
      assert.equal(themed.h, 800)
      assert.equal(themed.fr, 30)
      assert.equal(themed.op, 90)
      assert.equal(themed.layers.length, source.layers.length)
      assert.ok(themed.assets.some((asset) => String(asset.p || '').startsWith('data:image/png;base64,')))
      assert.notEqual(themed.assets[0].p, source.assets[0].p)
      assert.ok((await collectHueBuckets(themed)).size >= 4, '主题版本应保留蓝、绿、黄和肤色层次')
    }
    assert.notEqual(themedAnimations[0].assets[1].p, themedAnimations[1].assets[1].p)
  } finally {
    await rm(outputDirectory, { recursive: true, force: true })
  }
})
