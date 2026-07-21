import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('首页使用单一静态 SVG，并完整移除 Lottie 构建链', () => {
  const hero = read('components/home/HomeHero.vue')
  const illustration = read('components/home/svg/SvgHeroIllustration.vue')
  const workflow = read('components/home/HomeWorkflowSection.vue')
  const pkg = JSON.parse(read('package.json'))

  assert.doesNotMatch(hero, /SvgHeroIllustration/)
  assert.doesNotMatch(hero, /HomeHeroLottie|home-hero-lottie/)
  assert.match(hero, /home-hero__actions/)
  assert.match(hero, /查看实践作品/)
  assert.match(hero, /进入知识系统/)  
  // SVG 插画文件保留（不再在 Hero 中使用，但被其他页面引用）
  assert.match(illustration, /viewBox="0 0 1024 1024"/)
  assert.doesNotMatch(workflow, /SELECTED WORKFLOWS/)
  assert.equal(pkg.dependencies?.['lottie-web'], undefined)
  assert.equal(pkg.scripts?.['animations:prepare'], undefined)
  assert.doesNotMatch(pkg.scripts?.['images:prepare'] || '', /animations:prepare/)

  for (const path of [
    'components/home/HomeHeroLottie.vue',
    'components/home/svg/SvgHeroVisual.vue',
    'public/animations/home-hero-source.json',
    'scripts/home-lottie.test.mjs',
    'scripts/prepare-home-lottie.mjs'
  ]) {
    assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), false, `${path} 应已删除`)
  }
})
