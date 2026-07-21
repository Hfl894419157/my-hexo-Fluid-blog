/**
 * 批量上传图片工具 — 支持子文件夹
 *
 * 用法：
 *   把你本地的图片文件夹（含子文件夹）一次性上传到 Pages CMS 图库
 *
 *   在终端运行（项目根目录 F:/My Blog）：
 *     node scripts/batch-upload-images.mjs --dir "D:/我的作品图片"
 *
 *   你的本地文件夹结构会原样保留到 Pages CMS 图库中：
 *     D:/我的作品图片/
 *       ├── 品牌设计/
 *       │    ├── logo-1.jpg
 *       │    └── logo-2.jpg
 *       ├── 3D作品/
 *       │    └── render.png
 *       └── 封面图.jpg
 *     →
 *     public/images/uploads/
 *       ├── 品牌设计/
 *       │    ├── logo-1.jpg
 *       │    └── logo-2.jpg
 *       ├── 3D作品/
 *       │    └── render.png
 *       └── 封面图.jpg
 *
 * 参数：
 *   --dir     图片根文件夹路径（必填）
 *   --ext     允许的文件类型，默认 jpg,png,webp,gif,svg
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'

// ===== 配置 =====
const UPLOAD_ROOT = path.resolve('public/images/uploads')
const allowedExts = new Set()

// ===== 解析参数 =====
const args = process.argv.slice(2)
const readArg = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : ''
}

const sourceDir = readArg('--dir')
;(readArg('--ext') || 'jpg,png,webp,gif,svg').split(',').forEach(s => allowedExts.add(s.trim().toLowerCase()))

if (!sourceDir) {
  console.error('❌ 请提供图片文件夹路径：')
  console.error('   node scripts/batch-upload-images.mjs --dir "D:/我的作品图片"')
  process.exit(1)
}

if (!existsSync(sourceDir)) {
  console.error(`❌ 文件夹不存在：${sourceDir}`)
  process.exit(1)
}

// ===== 递归扫描所有图片文件 =====
const allFiles = []

function scanDir(dir, relativePath = '') {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      scanDir(fullPath, relPath)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase().replace('.', '')
      if (allowedExts.has(ext)) {
        allFiles.push({ fullPath, relPath, name: entry.name })
      }
    }
  }
}

console.log('🔍 正在扫描图片...')
scanDir(sourceDir)

if (allFiles.length === 0) {
  console.error(`❌ 在 "${sourceDir}" 中没有找到图片文件（支持格式：${[...allowedExts].join(', ')}）`)
  process.exit(1)
}

console.log(`\n📸 共找到 ${allFiles.length} 张图片：`)
for (const file of allFiles) {
  const folder = path.dirname(file.relPath)
  const prefix = folder === '.' ? '' : `  ${folder}/`
  console.log(`   · ${prefix}${file.name}`)
}

// ===== 复制文件到上传目录，保留文件夹结构 =====
console.log('\n📋 正在复制图片到 public/images/uploads/ ...')
const copied = []
for (const file of allFiles) {
  const destRelPath = file.relPath  // 保留相对路径
  const destFullPath = path.join(UPLOAD_ROOT, destRelPath)
  const destDir = path.dirname(destFullPath)

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true })
  }

  copyFileSync(file.fullPath, destFullPath)
  copied.push(destRelPath)
  console.log(`   ✅ ${file.relPath}`)
}

// ===== Git 操作 =====
console.log('\n📦 正在提交到 Git...')

try {
  execSync('git rev-parse --git-dir', { stdio: 'ignore' })
} catch {
  console.error('❌ 当前目录不是 Git 仓库，请在项目根目录运行')
  process.exit(1)
}

// Git add 所有新图片
execSync(`git add "public/images/uploads/"`, { stdio: 'pipe' })

// 检查是否有变化
const status = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim()
if (!status) {
  console.log('⚠️  没有新的图片需要提交（可能已存在）')
  process.exit(0)
}

const fileCount = status.split('\n').length

// 一次提交，包含所有图片
execSync(`git commit -m "批量上传 ${fileCount} 个文件"`, { stdio: 'pipe' })
console.log(`   ✅ 已创建 1 个提交，包含 ${fileCount} 个文件`)

// 推送
console.log('\n☁️  正在推送到 GitHub...')
execSync('git push', { stdio: 'pipe' })
console.log('   ✅ 推送成功！')

console.log(`\n🎉 完成！${fileCount} 个文件已全部上传到 GitHub`)
console.log(`   打开 Pages CMS → 点"图片"按钮 → 就能看到这些图片了`)
console.log(`   你的文件夹分类原样保留，可以直接选图插入文章`)
