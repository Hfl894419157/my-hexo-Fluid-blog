import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  homeHeroLottieSource,
  prepareHomeHeroLottie
} from './prepare-home-lottie.mjs'

test('首页 Lottie 生成浅色与深色主题并保留原始动画结构', async () => {
  const outputDirectory = await mkdtemp(path.join(os.tmpdir(), 'liuli-lottie-'))
  try {
    const source = JSON.parse(await readFile(homeHeroLottieSource, 'utf8'))
    const outputs = await prepareHomeHeroLottie({ outputDirectory })
    assert.equal(outputs.length, 2)

    for (const output of outputs) {
      const themed = JSON.parse(await readFile(output, 'utf8'))
      assert.equal(themed.w, 800)
      assert.equal(themed.h, 800)
      assert.equal(themed.fr, 30)
      assert.equal(themed.op, 90)
      assert.equal(themed.layers.length, source.layers.length)
      assert.ok(themed.assets.some((asset) => String(asset.p || '').startsWith('data:image/png;base64,')))
      assert.notEqual(themed.assets[0].p, source.assets[0].p)
    }
  } finally {
    await rm(outputDirectory, { recursive: true, force: true })
  }
})
