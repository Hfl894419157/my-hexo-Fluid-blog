import { randomUUID } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import matter from 'gray-matter'
import { createContentFilename } from './lib/content-filename.mjs'

const filenamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const allowedSourcePattern = /^(?:portfolio|aigc|knowledge\/(?:learning-observation|methods|resources))\/[a-z0-9-]+\.md$/

export const validateDuplicateInput = ({ source, title, filename }) => {
  if (!allowedSourcePattern.test(String(source || ''))) throw new Error('源文章路径不在允许范围')
  if (!String(title || '').trim()) throw new Error('新标题不能为空')
  if (filename && !filenamePattern.test(String(filename))) throw new Error('新文件名只能包含小写英文、数字和短横线')
}

export const duplicateContentData = (data, { title, date = new Date().toISOString().slice(0, 10) }) => {
  const next = structuredClone(data || {})
  next.contentId = randomUUID()
  next.meta = { ...(next.meta || {}), title: String(title).trim() }
  next.publishing = {
    ...(next.publishing || {}),
    createdAt: date,
    status: 'draft',
    verificationStatus: '探索中',
    showInRecentUpdates: false
  }
  next.seo = {}
  next.contentBlocks = Array.isArray(next.contentBlocks)
    ? next.contentBlocks.map((block) => {
      const copy = structuredClone(block)
      copy.id = randomUUID()
      delete copy._enrichment
      return copy
    })
    : []
  return next
}

export const duplicateContentFile = ({ root, source, title, filename, date }) => {
  validateDuplicateInput({ source, title, filename })
  const sourcePath = path.join(root, source)
  if (!existsSync(sourcePath)) throw new Error(`找不到源文章：${source}`)

  const requestedFilename = filename || createContentFilename(title, date ? new Date(`${date}T00:00:00.000Z`) : new Date())
  let availableFilename = requestedFilename
  let destination = path.join(path.dirname(sourcePath), `${availableFilename}.md`)
  let suffix = 2
  while (!filename && existsSync(destination)) {
    availableFilename = `${requestedFilename}-${suffix}`
    destination = path.join(path.dirname(sourcePath), `${availableFilename}.md`)
    suffix += 1
  }
  if (existsSync(destination)) throw new Error(`目标文件已存在：${path.relative(root, destination).replace(/\\/g, '/')}`)

  const parsed = matter(readFileSync(sourcePath, 'utf8'))
  const data = duplicateContentData(parsed.data, { title, date })
  writeFileSync(destination, matter.stringify(parsed.content || '', data), 'utf8')
  return path.relative(root, destination).replace(/\\/g, '/')
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isDirectRun) {
  const args = Object.fromEntries(process.argv.slice(2).map((value, index, values) => {
    if (!value.startsWith('--')) return null
    return [value.slice(2), values[index + 1]]
  }).filter(Boolean))
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const destination = duplicateContentFile({
    root,
    source: String(args.source || ''),
    title: String(args.title || ''),
    filename: String(args.filename || '') || undefined
  })
  process.stdout.write(destination)
}
