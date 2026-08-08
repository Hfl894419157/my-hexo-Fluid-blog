import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(projectRoot, '.vitepress', 'theme', 'custom.css')
const outputPath = path.join(projectRoot, 'public', '_generated', 'article-preview.css')

const source = await readFile(sourcePath, 'utf8')
const banner = '/* Generated from .vitepress/theme/custom.css. Do not edit directly. */\n'

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${banner}${source.trim()}\n`, 'utf8')

