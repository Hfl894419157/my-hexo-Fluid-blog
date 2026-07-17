import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptPath = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(scriptPath)
const repoRoot = path.resolve(scriptDir, '..')

export const homeHeroLottieSource = path.join(repoRoot, 'public', 'animations', 'home-hero-source.json')
export const homeHeroLottieOutput = path.join(repoRoot, 'public', '_generated', 'animations')

export const homeHeroPalettes = {
  light: {
    ink: [23, 19, 15],
    accent: [138, 79, 45],
    soft: [224, 199, 174]
  },
  dark: {
    ink: [244, 241, 234],
    accent: [195, 149, 85],
    soft: [105, 78, 51]
  }
}

const mix = (from, to, amount) => from.map((value, index) =>
  Math.round(value + (to[index] - value) * amount)
)

const mapLuminance = (luminance, palette) => {
  if (luminance <= 0.5) return mix(palette.ink, palette.accent, luminance / 0.5)
  return mix(palette.accent, palette.soft, (luminance - 0.5) / 0.5)
}

export const recolorEmbeddedPng = async (dataUrl, palette) => {
  if (!String(dataUrl).startsWith('data:image/png;base64,')) return dataUrl

  const source = Buffer.from(dataUrl.split(',', 2)[1], 'base64')
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let offset = 0; offset < data.length; offset += info.channels) {
    if (data[offset + 3] === 0) continue
    const luminance = (
      data[offset] * 0.2126
      + data[offset + 1] * 0.7152
      + data[offset + 2] * 0.0722
    ) / 255
    const [red, green, blue] = mapLuminance(luminance, palette)
    data[offset] = red
    data[offset + 1] = green
    data[offset + 2] = blue
  }

  const output = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels }
  }).png({ compressionLevel: 9 }).toBuffer()

  return `data:image/png;base64,${output.toString('base64')}`
}

export const buildThemedHomeHero = async (source, palette) => {
  const animation = structuredClone(source)
  for (const asset of animation.assets || []) {
    if (asset?.p) asset.p = await recolorEmbeddedPng(asset.p, palette)
  }
  return animation
}

export const prepareHomeHeroLottie = async ({
  sourcePath = homeHeroLottieSource,
  outputDirectory = homeHeroLottieOutput
} = {}) => {
  const source = JSON.parse(await readFile(sourcePath, 'utf8'))
  await mkdir(outputDirectory, { recursive: true })

  const outputs = []
  for (const [theme, palette] of Object.entries(homeHeroPalettes)) {
    const animation = await buildThemedHomeHero(source, palette)
    const outputPath = path.join(outputDirectory, `home-hero-${theme}.json`)
    await writeFile(outputPath, JSON.stringify(animation))
    outputs.push(outputPath)
  }
  return outputs
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  const outputs = await prepareHomeHeroLottie()
  console.log(`首页 Lottie 主题资源准备完成：${outputs.length} 个文件`)
}
