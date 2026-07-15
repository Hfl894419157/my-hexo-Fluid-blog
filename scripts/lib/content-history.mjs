import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { repoRoot } from '../../.shared/contentCatalog.mjs'

const managedPatterns = [
  /^portfolio\/[a-z0-9-]+\.md$/,
  /^aigc\/[a-z0-9-]+\.md$/,
  /^knowledge\/(?:learning-observation|methods|resources)\/[a-z0-9-]+\.md$/
]

const toPosix = (value = '') => String(value).replace(/\\/g, '/')

export const isManagedHistoryPath = (sourcePath = '') =>
  managedPatterns.some((pattern) => pattern.test(toPosix(sourcePath)))

export const sourcePathToUrl = (sourcePath = '') => `/${toPosix(sourcePath).replace(/\.md$/, '')}`

export const parseRenameLog = (output = '') => String(output)
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => line.split('\t'))
  .filter(([status, from, to]) => /^R\d+$/.test(status || '') && from && to)
  .map(([, from, to]) => ({ from: toPosix(from), to: toPosix(to) }))
  .filter(({ from, to }) => isManagedHistoryPath(from) && isManagedHistoryPath(to))

export const resolveRenameChains = (renames = []) => {
  const nextPath = new Map()
  for (const { from, to } of renames) {
    if (!nextPath.has(from)) nextPath.set(from, to)
  }
  const resolved = new Map()

  for (const from of nextPath.keys()) {
    const visited = new Set([from])
    let target = nextPath.get(from)
    while (target && nextPath.has(target) && !visited.has(target)) {
      visited.add(target)
      target = nextPath.get(target)
    }
    if (target && target !== from && !visited.has(target)) resolved.set(from, target)
  }

  return resolved
}

const readRenameLog = (root) => execFileSync(
  'git',
  [
    'log',
    '--format=',
    '--name-status',
    '--find-renames=50%',
    '--diff-filter=R',
    '--',
    'portfolio',
    'aigc',
    'knowledge/learning-observation',
    'knowledge/methods',
    'knowledge/resources'
  ],
  { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
)

export const collectContentRedirects = ({ root = repoRoot, logOutput } = {}) => {
  let output = logOutput
  if (output === undefined) {
    try {
      output = readRenameLog(root)
    } catch {
      output = ''
    }
  }

  const redirects = []
  for (const [fromSourcePath, toSourcePath] of resolveRenameChains(parseRenameLog(output))) {
    const oldFile = path.join(root, fromSourcePath)
    const targetFile = path.join(root, toSourcePath)
    if (existsSync(oldFile) || !existsSync(targetFile)) continue
    redirects.push({
      fromSourcePath,
      toSourcePath,
      fromUrl: sourcePathToUrl(fromSourcePath),
      toUrl: sourcePathToUrl(toSourcePath)
    })
  }

  return redirects.sort((left, right) => left.fromUrl.localeCompare(right.fromUrl))
}
