export const legacyRedirects = [
  { fromUrl: '/blog/', toUrl: '/knowledge/methods' },
  { fromUrl: '/blog/aigc-workflow-system', toUrl: '/knowledge/methods' },
  { fromUrl: '/blog/ai-designer-positioning', toUrl: '/knowledge/learning-observation' },
  { fromUrl: '/blog/personal-resource-library', toUrl: '/knowledge/learning-observation' },
  { fromUrl: '/resources/', toUrl: '/knowledge/resources' },
  { fromUrl: '/resources/mj-prompt', toUrl: '/knowledge/resources' },
  { fromUrl: '/resources/notion', toUrl: '/knowledge/resources' }
]

export const redirectOutputPath = (url) => {
  const pathname = String(url || '').replace(/^\/+/, '')
  if (!pathname || pathname.endsWith('/')) return `${pathname}index.html`
  return `${pathname}.html`
}
