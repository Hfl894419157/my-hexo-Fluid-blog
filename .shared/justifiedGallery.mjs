export const getAspectRatio = (item, imageManifest = {}) => {
  if (item.width && item.height && Number(item.height) > 0) {
    return Number(item.width) / Number(item.height)
  }
  const key = item.src ? String(item.src).split(/[?#]/, 1)[0] : null
  const entry = key ? imageManifest.images?.[key] : null
  if (entry?.width && entry?.height && Number(entry.height) > 0) {
    return Number(entry.width) / Number(entry.height)
  }
  return 1.333
}

export const partitionJustifiedRows = (items = [], imageManifest = {}) => {
  if (!items.length) return []

  const list = items.map((item) => ({
    ...item,
    ratio: getAspectRatio(item, imageManifest)
  }))

  const rows = []
  let i = 0

  while (i < list.length) {
    const item = list[i]

    // 显式指定 fullRow 或 layout=full 的独立成行
    if (item.fullRow || item.layout === 'full') {
      rows.push([item])
      i += 1
      continue
    }

    const isLandscape = item.ratio >= 1.0

    if (isLandscape) {
      // 横版图：每行一张，满宽显示
      rows.push([item])
      i += 1
    } else {
      // 竖版图：尝试两两配对
      if (i + 1 < list.length) {
        const nextItem = list[i + 1]
        const nextIsLandscape = nextItem.ratio >= 1.0

        if (!nextIsLandscape && !nextItem.fullRow && nextItem.layout !== 'full') {
          // 两张竖版图配对一行
          rows.push([item, nextItem])
          i += 2
        } else {
          // 下一张是横版，当前竖版单独一行
          rows.push([item])
          i += 1
        }
      } else {
        // 最后一张竖版图，单独居中显示
        rows.push([item])
        i += 1
      }
    }
  }

  return rows
}
