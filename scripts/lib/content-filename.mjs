import { pinyin } from 'pinyin-pro'

const MAX_SLUG_LENGTH = 72

export const toReadableContentSlug = (value) => {
  const source = String(value || '').trim()
  if (!source) return 'content'

  const romanized = pinyin(source, {
    toneType: 'none',
    nonZh: 'consecutive'
  })
  const slug = romanized
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/g, '')

  return slug || 'content'
}

export const createContentFilename = (title, date = new Date()) => {
  const timestamp = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
    '-',
    String(date.getUTCHours()).padStart(2, '0'),
    String(date.getUTCMinutes()).padStart(2, '0'),
    String(date.getUTCSeconds()).padStart(2, '0'),
    String(date.getUTCMilliseconds()).padStart(3, '0')
  ].join('')

  return `${toReadableContentSlug(title)}-${timestamp}`
}
