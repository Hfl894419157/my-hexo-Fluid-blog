import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { isManagedContentPath } from '../.shared/contentSchema.mjs'
import { enrichContentBlocks, enrichmentModes } from './lib/enrichment.mjs'

const args = process.argv.slice(2)
const readArg = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : ''
}

const repoRoot = process.cwd()
const inputPath = readArg('--file')
const mode = readArg('--mode') || 'fill_empty'
const dryRun = args.includes('--dry-run')

if (!inputPath) throw new Error('必须提供 --file')
if (!enrichmentModes.has(mode)) throw new Error(`模式无效：${mode}`)

const absolutePath = path.resolve(repoRoot, inputPath)
const relativePath = path.relative(repoRoot, absolutePath).replace(/\\/g, '/')
if (relativePath.startsWith('../') || path.isAbsolute(relativePath) || !isManagedContentPath(relativePath)) {
  throw new Error(`文件不属于受管内容目录：${inputPath}`)
}
if (!/^[a-z0-9-]+\.md$/.test(path.basename(relativePath))) throw new Error('文件名只能包含小写英文、数字和短横线')

const source = await readFile(absolutePath, 'utf8')
const parsed = matter(source)
if (!Array.isArray(parsed.data.contentBlocks)) throw new Error('文件缺少 contentBlocks')

const result = await enrichContentBlocks(parsed.data.contentBlocks, mode, { repoRoot })
const changed = JSON.stringify(result.blocks) !== JSON.stringify(parsed.data.contentBlocks)
if (changed && !dryRun) {
  parsed.data.contentBlocks = result.blocks
  await writeFile(absolutePath, matter.stringify(parsed.content, parsed.data), 'utf8')
}

console.log(JSON.stringify({ file: relativePath, mode, dryRun, changed, report: result.report }, null, 2))
