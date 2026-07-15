import assert from 'node:assert/strict'
import test from 'node:test'
import {
  focalPointCss,
  focalPointValues,
  getCropBox,
  imageProfileDefinitions,
  normalizeFocalPoint
} from '../.shared/imageProfiles.mjs'

test('九种焦点值均可用，未知值安全回退到居中', () => {
  assert.equal(focalPointValues.length, 9)
  assert.equal(normalizeFocalPoint('bottom-right'), 'bottom-right')
  assert.equal(normalizeFocalPoint('unknown'), 'center')
  assert.equal(focalPointCss('top-left'), '0% 0%')
  assert.equal(focalPointCss('bottom-right'), '100% 100%')
})

test('横图按左中右焦点生成不越界的正方形裁剪框', () => {
  assert.deepEqual(getCropBox(1600, 900, 1, 'left'), { left: 0, top: 0, width: 900, height: 900 })
  assert.deepEqual(getCropBox(1600, 900, 1, 'center'), { left: 350, top: 0, width: 900, height: 900 })
  assert.deepEqual(getCropBox(1600, 900, 1, 'right'), { left: 700, top: 0, width: 900, height: 900 })
})

test('竖图按上中下焦点生成 16:9 裁剪框', () => {
  const top = getCropBox(900, 1600, 16 / 9, 'top')
  const center = getCropBox(900, 1600, 16 / 9, 'center')
  const bottom = getCropBox(900, 1600, 16 / 9, 'bottom')
  assert.equal(top.top, 0)
  assert.equal(center.top, 547)
  assert.equal(bottom.top, 1094)
  assert.equal(top.width, 900)
  assert.equal(top.height, 506)
})

test('三个封面输出 profile 保持约定比例', () => {
  assert.equal(imageProfileDefinitions.card.aspect, 16 / 9)
  assert.equal(imageProfileDefinitions.homeDesktop.aspect, 1)
  assert.equal(imageProfileDefinitions.homeMobile.aspect, 16 / 10)
})
