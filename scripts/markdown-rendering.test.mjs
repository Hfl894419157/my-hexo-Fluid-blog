import assert from 'node:assert/strict'
import test from 'node:test'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'
import { configureInlineFormatting, configureManagedHtmlPolicy } from '../.shared/markdownFormatting.mjs'
import { configureResponsiveMarkdownImages } from '../.shared/markdownImages.mjs'
import { renderRichHtml, richHtmlSearchText, sanitizeRichHtml } from '../.shared/richHtml.mjs'

const imageManifest = {
  images: {
    '/images/uploads/test.jpg': {
      width: 1600,
      height: 900,
      variants: [{ src: '/generated/test-760.webp', width: 760, height: 428 }],
      avifVariants: [{ src: '/generated/test-760.avif', width: 760, height: 428 }]
    }
  }
}

test('内容模块复用 VitePress 代码容器并渲染完整 Markdown 格式', async () => {
  disposeMdItInstance()
  const md = await createMarkdownRenderer(process.cwd(), {
    html: true,
    headers: true,
    defaultHighlightLang: 'text',
    codeCopyButtonTitle: '复制代码',
    config(renderer) {
      configureManagedHtmlPolicy(renderer)
      configureInlineFormatting(renderer)
      configureResponsiveMarkdownImages(renderer, imageManifest)
    }
  })
  const source = [
    '## 二级标题',
    '',
    '**粗体**、++下划线++、==重点高亮==、*斜体*',
    '',
    '> 引用内容',
    '',
    '- 列表内容',
    '',
    '```',
    '一段很长的无语言提示词',
    '```',
    '',
    '```js',
    "console.log('==代码内保持原样==')",
    '```'
  ].join('\n')
  const html = md.render(source, { contentImageIndex: 0, managedContent: true })

  assert.match(html, /<h2[^>]+id="二级标题"/)
  assert.match(html, /<strong>粗体<\/strong>/)
  assert.match(html, /<u>下划线<\/u>/)
  assert.match(html, /<mark>重点高亮<\/mark>/)
  assert.match(html, /<em>斜体<\/em>/)
  assert.match(html, /<blockquote>/)
  assert.match(html, /<ul>/)
  assert.match(html, /class="language-text[^\"]*"/)
  assert.match(html, /class="language-js[^\"]*"/)
  assert.match(html, /class="copy"/)
  assert.ok(!html.includes('++下划线++'))
  assert.ok(!html.includes('==重点高亮=='))
  assert.ok(html.includes('==代码内保持原样=='))
  assert.ok(!/^<pre[ >]/m.test(html), '代码块不应输出为裸 pre')
})

test('正文首图高优先级，其余图片懒加载，并输出 AVIF 与 WebP', async () => {
  const md = await createMarkdownRenderer(process.cwd())
  const html = md.render([
    '![首图](/images/uploads/test.jpg)',
    '',
    '![第二张](/images/uploads/test.jpg)'
  ].join('\n'), { contentImageIndex: 0 })
  const tags = [...html.matchAll(/<img[^>]+>/g)].map((match) => match[0])

  assert.equal(tags.length, 2)
  assert.match(tags[0], /loading="eager"/)
  assert.match(tags[0], /fetchpriority="high"/)
  assert.match(tags[1], /loading="lazy"/)
  assert.match(tags[1], /fetchpriority="auto"/)
  assert.equal((html.match(/type="image\/avif"/g) || []).length, 2)
  assert.equal((html.match(/type="image\/webp"/g) || []).length, 2)
})

test('managed heading anchors keep the VitePress zero-width symbol invisible', async () => {
  disposeMdItInstance()
  const md = await createMarkdownRenderer(process.cwd(), {
    html: true,
    headers: true,
    config(renderer) {
      configureManagedHtmlPolicy(renderer)
    }
  })
  const html = md.render('## Heading', { managedContent: true })

  assert.match(html, /class="header-anchor"/)
  assert.ok(html.includes('&ZeroWidthSpace;'))
  assert.ok(!html.includes('&amp;ZeroWidthSpace;'))
})

test('高保真 HTML 保留安全排版并移除脚本、事件和危险定位', () => {
  const source = [
    '<section style="padding: 24px; background-color: #f2f2f2; position: fixed">',
    '<h2 style="text-align: center; color: #8a4f2d">整篇导入</h2>',
    '<p onclick="alert(1)" style="font-size: 18px; line-height: 1.8">保留正文</p>',
    '<a href="javascript:alert(1)">危险链接</a>',
    '<script>alert(1)</script>',
    '</section>'
  ].join('')
  const html = sanitizeRichHtml(source)

  assert.match(html, /padding:24px/)
  assert.match(html, /text-align:center/)
  assert.match(html, /font-size:18px/)
  assert.doesNotMatch(html, /position:fixed|onclick|javascript:|script/i)
  assert.equal(richHtmlSearchText(html), '整篇导入保留正文危险链接')
})

test('高保真 HTML 图片复用响应式产物并标记独立图文间距', () => {
  const html = renderRichHtml(
    '<p><img src="/images/uploads/test.jpg" alt="测试图片"></p><p>图片后的正文</p>',
    imageManifest,
    { headingCounts: new Map(), contentImageIndex: 0 }
  )

  assert.match(html, /class="content-rich-media-row"/)
  assert.match(html, /class="responsive-image responsive-image--content"/)
  assert.match(html, /type="image\/avif"/)
  assert.match(html, /type="image\/webp"/)
  assert.match(html, /loading="eager"/)
  assert.match(html, /width="1600"/)
  assert.match(html, /height="900"/)
})

test('rich HTML strips data image URLs at the rendering boundary', () => {
  const html = sanitizeRichHtml('<p><img src="data:image/png;base64,AAAA" alt="inline"></p>')
  assert.doesNotMatch(html, /data:image\//i)
})
