const formats = {
  '++': { open: 'underline_open', close: 'underline_close', tag: 'u' },
  '==': { open: 'highlight_open', close: 'highlight_close', tag: 'mark' }
}

const escapeHtml = (value) => String(value || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

export const configureManagedHtmlPolicy = (md) => {
  if (md.__managedHtmlPolicyInstalled) return
  md.__managedHtmlPolicyInstalled = true
  const defaultHtmlBlock = md.renderer.rules.html_block || ((tokens, index) => tokens[index].content)
  const defaultHtmlInline = md.renderer.rules.html_inline || ((tokens, index) => tokens[index].content)

  md.renderer.rules.html_block = (tokens, index, options, env, renderer) => env.managedContent
    ? escapeHtml(tokens[index].content)
    : defaultHtmlBlock(tokens, index, options, env, renderer)
  md.renderer.rules.html_inline = (tokens, index, options, env, renderer) => {
    const token = tokens[index]
    const isVitePressPermalinkSymbol = token.meta?.isPermalinkSymbol === true
    return env.managedContent && !isVitePressPermalinkSymbol
      ? escapeHtml(token.content)
      : defaultHtmlInline(tokens, index, options, env, renderer)
  }
}

const countDelimiter = (children, delimiter) => children.reduce((count, token) => {
  if (token.type !== 'text') return count
  return count + (token.content.split(delimiter).length - 1)
}, 0)

export const configureInlineFormatting = (md) => {
  if (md.__managedInlineFormattingInstalled) return
  md.__managedInlineFormattingInstalled = true
  md.renderer.rules.underline_open = () => '<u>'
  md.renderer.rules.underline_close = () => '</u>'
  md.renderer.rules.highlight_open = () => '<mark>'
  md.renderer.rules.highlight_close = () => '</mark>'

  md.core.ruler.after('block', 'managed_default_fence_language', (state) => {
    for (const token of state.tokens) {
      if (token.type === 'fence' && !String(token.info || '').trim()) token.info = 'text'
    }
  })

  md.core.ruler.after('inline', 'managed_inline_formatting', (state) => {
    for (const inlineToken of state.tokens) {
      if (inlineToken.type !== 'inline' || !inlineToken.children?.length) continue

      const enabled = Object.keys(formats).filter((delimiter) => {
        const count = countDelimiter(inlineToken.children, delimiter)
        return count > 0 && count % 2 === 0
      })
      if (!enabled.length) continue

      const delimiterPattern = new RegExp(`(${enabled.map((value) => value.replace(/\+/g, '\\+')).join('|')})`, 'g')
      const open = Object.fromEntries(enabled.map((delimiter) => [delimiter, false]))
      const nextChildren = []

      for (const child of inlineToken.children) {
        if (child.type !== 'text') {
          nextChildren.push(child)
          continue
        }

        for (const part of child.content.split(delimiterPattern)) {
          if (!part) continue
          const format = formats[part]
          if (!format || !enabled.includes(part)) {
            const text = new state.Token('text', '', 0)
            text.content = part
            nextChildren.push(text)
            continue
          }

          const token = new state.Token(open[part] ? format.close : format.open, format.tag, open[part] ? -1 : 1)
          token.markup = part
          nextChildren.push(token)
          open[part] = !open[part]
        }
      }

      inlineToken.children = nextChildren
    }
  })
}
