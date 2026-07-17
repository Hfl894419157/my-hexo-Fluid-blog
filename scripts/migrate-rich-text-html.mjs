import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import MarkdownIt from 'markdown-it'
import { configureInlineFormatting } from '../.shared/markdownFormatting.mjs'
import { sanitizeRichHtml } from '../.shared/richHtml.mjs'

const root = process.cwd()
const checkOnly = process.argv.includes('--check')
const renderer = new MarkdownIt({ html: false, linkify: true, typographer: false })
configureInlineFormatting(renderer)

const listMarkdown = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await listMarkdown(absolutePath))
    else if (entry.name.endsWith('.md')) files.push(absolutePath)
  }
  return files
}

const normalizeDates = (value) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalizeDates)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, normalizeDates(child)]))
}

const migrateBlock = (block) => {
  if (block?.type !== 'richText' || String(block.html || '').trim()) return { block, changed: false }
  const legacyMarkdown = String(block.legacyMarkdown || block.markdown || '')
  if (!legacyMarkdown.trim()) return { block, changed: false }
  const next = {
    ...block,
    format: 'html',
    html: sanitizeRichHtml(renderer.render(legacyMarkdown)),
    legacyMarkdown
  }
  delete next.markdown
  return { block: next, changed: true }
}

const files = (await Promise.all([
  listMarkdown(path.join(root, 'portfolio')),
  listMarkdown(path.join(root, 'aigc')),
  listMarkdown(path.join(root, 'knowledge'))
])).flat()

let changedFiles = 0
let changedBlocks = 0
for (const absolutePath of files) {
  const source = await readFile(absolutePath, 'utf8')
  const parsed = matter(source)
  if (!Array.isArray(parsed.data.contentBlocks)) continue
  let fileChanged = false
  parsed.data.contentBlocks = parsed.data.contentBlocks.map((block) => {
    const migrated = migrateBlock(block)
    if (migrated.changed) {
      fileChanged = true
      changedBlocks += 1
    }
    return migrated.block
  })
  if (!fileChanged) continue
  changedFiles += 1
  if (checkOnly) continue
  const data = normalizeDates(parsed.data)
  const frontmatter = yaml.dump(data, { lineWidth: -1, noRefs: true, sortKeys: false })
  await writeFile(absolutePath, `---\n${frontmatter}---\n${parsed.content || ''}`, 'utf8')
}

console.log(JSON.stringify({ checkOnly, changedFiles, changedBlocks }, null, 2))
if (checkOnly && changedBlocks > 0) process.exitCode = 1
