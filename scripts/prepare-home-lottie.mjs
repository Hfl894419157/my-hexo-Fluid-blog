import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptPath = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(scriptPath)
const repoRoot = path.resolve(scriptDir, '..')

export const homeHeroLottieSource = path.join(repoRoot, 'public', 'animations', 'home-hero-source.json')
export const homeHeroLottieOutput = path.join(repoRoot, 'public', '_generated', 'animations')

export const homeHeroThemeStyles = {
  light: {
    brightness: 1,
    contrast: 1,
    tones: {
      blue: { target: [83, 117, 185], amount: 0.04 },
      green: { target: [157, 201, 179], amount: 0.06 },
      yellow: { target: [215, 160, 67], amount: 0.08 },
      skin: { target: [231, 158, 139], amount: 0.04 },
      neutral: { target: [247, 242, 234], amount: 0.05 }
    }
  },
  dark: {
    brightness: 0.94,
    contrast: 1.02,
    tones: {
      blue: { target: [105, 137, 205], amount: 0.12 },
      green: { target: [137, 185, 162], amount: 0.14 },
      yellow: { target: [207, 154, 70], amount: 0.14 },
      skin: { target: [222, 151, 132], amount: 0.08 },
      neutral: { target: [238, 232, 221], amount: 0.1 }
    }
  }
}

const clampChannel = (value) => Math.max(0, Math.min(255, Math.round(value)))

const getHue = (red, green, blue) => {
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min
  if (!delta) return 0
  if (max === red) return (60 * ((green - blue) / delta) + 360) % 360
  if (max === green) return 60 * ((blue - red) / delta + 2)
  return 60 * ((red - green) / delta + 4)
}

const getTone = (red, green, blue) => {
  const chroma = Math.max(red, green, blue) - Math.min(red, green, blue)
  if (chroma < 20) return 'neutral'
  const hue = getHue(red, green, blue)
  if (hue >= 190 && hue <= 265) return 'blue'
  if (hue >= 105 && hue < 190) return 'green'
  if (hue >= 25 && hue < 70) return 'yellow'
  if (hue < 25 || hue >= 345) return 'skin'
  return null
}

const tuneChannel = (value, target, amount, style) => {
  const contrasted = (value - 128) * style.contrast + 128
  const adjusted = contrasted * style.brightness
  return clampChannel(adjusted + (target - adjusted) * amount)
}

export const tuneEmbeddedPng = async (dataUrl, style) => {
  if (!String(dataUrl).startsWith('data:image/png;base64,')) return dataUrl

  const source = Buffer.from(dataUrl.split(',', 2)[1], 'base64')
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let offset = 0; offset < data.length; offset += info.channels) {
    if (data[offset + 3] === 0) continue
    const tone = getTone(data[offset], data[offset + 1], data[offset + 2])
    const treatment = tone ? style.tones[tone] : { target: [0, 0, 0], amount: 0 }
    data[offset] = tuneChannel(data[offset], treatment.target[0], treatment.amount, style)
    data[offset + 1] = tuneChannel(data[offset + 1], treatment.target[1], treatment.amount, style)
    data[offset + 2] = tuneChannel(data[offset + 2], treatment.target[2], treatment.amount, style)
  }

  const output = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels }
  }).png({ compressionLevel: 9 }).toBuffer()

  return `data:image/png;base64,${output.toString('base64')}`
}

export const buildThemedHomeHero = async (source, style) => {
  const animation = structuredClone(source)
  for (const asset of animation.assets || []) {
    if (asset?.p) asset.p = await tuneEmbeddedPng(asset.p, style)
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
  for (const [theme, style] of Object.entries(homeHeroThemeStyles)) {
    const animation = await buildThemedHomeHero(source, style)
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
