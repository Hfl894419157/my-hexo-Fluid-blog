import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { loadContentCatalog, loadHomeSelections, repoRoot } from '../.shared/contentCatalog.mjs'

const allowedStatuses = new Set(['draft', 'planned', 'published', 'archived'])
const catalog = loadContentCatalog()
const selections = loadHomeSelections()
const errors = []
const warnings = []

for (const item of catalog.all) {
  if (!item.title) errors.push(`${item.sourcePath}: 缺少 title`)
  if (!item.desc) errors.push(`${item.sourcePath}: 缺少 description`)
  if (!allowedStatuses.has(item.status)) errors.push(`${item.sourcePath}: status 必须是 draft / planned / published / archived`)
  if (item.createdAt === '2099-12-31') errors.push(`${item.sourcePath}: 缺少 createdAt`)
  if (!item.tags.length) warnings.push(`${item.sourcePath}: 建议至少填写一个 tag`)
  if (item.cover) {
    const coverPath = path.join(repoRoot, 'public', item.cover.replace(/^\//, ''))
    if (!existsSync(coverPath)) errors.push(`${item.sourcePath}: 找不到封面 ${item.cover}`)
  }
}

const duplicateUrls = catalog.all.filter((item, index, items) => items.findIndex((candidate) => candidate.url === item.url) !== index)
for (const item of duplicateUrls) errors.push(`${item.sourcePath}: 地址 ${item.url} 重复`)

const byPath = new Map(catalog.all.map((item) => [item.sourcePath, item]))
const checkSelected = (label, paths, max = Infinity, accepts = () => true) => {
  if (paths.length > max) errors.push(`${label}: 最多选择 ${max} 条，当前 ${paths.length} 条`)
  for (const selectedPath of paths) {
    const item = byPath.get(selectedPath)
    if (!item) errors.push(`${label}: 找不到 ${selectedPath}`)
    else if (item.status !== 'published') errors.push(`${label}: ${selectedPath} 尚未发布`)
    else if (!accepts(item)) errors.push(`${label}: ${selectedPath} 不属于该栏目`)
  }
}

checkSelected('首页案例精选', selections.featuredCases || [], Infinity, (item) => item.kind === 'case')
checkSelected('首页工作流精选', selections.featuredWorkflows || [], 3, (item) => item.kind === 'workflow')
checkSelected('首页学习与观察', selections.knowledge?.learning || [], 3, (item) => item.sections.includes('learning-observation'))
checkSelected('首页方法体系', selections.knowledge?.methods || [], 3, (item) => item.sections.includes('methods'))
checkSelected('首页资源库', selections.knowledge?.resources || [], 3, (item) => item.kind === 'resource')

for (const file of ['aboutCards.json', 'knowledgeHubCards.json']) {
  const source = JSON.parse(readFileSync(path.join(repoRoot, '.shared', 'content', file), 'utf8'))
  if (!Array.isArray(source.items)) errors.push(`${file}: items 必须是数组`)
}

for (const warning of warnings) console.warn(`WARN ${warning}`)
for (const error of errors) console.error(`ERROR ${error}`)

if (errors.length) process.exit(1)
console.log(`内容检查通过：${catalog.all.length} 条详情内容，${warnings.length} 条提醒。`)
