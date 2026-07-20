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
    const remaining = list.length - i
    const item1 = list[i]

    if (item1.breakBefore && i > 0) {
      // Break handled by previous iteration
    }

    if (item1.fullRow) {
      rows.push([item1])
      i += 1
      continue
    }

    if (remaining === 1) {
      rows.push([item1])
      i += 1
      continue
    }

    const item2 = list[i + 1]
    if (item2.breakBefore) {
      rows.push([item1])
      i += 1
      continue
    }

    if (remaining === 2) {
      const ratioDiff = Math.max(item1.ratio / item2.ratio, item2.ratio / item1.ratio)
      if (ratioDiff > 1.75 || item2.fullRow) {
        rows.push([item1])
        i += 1
      } else {
        rows.push([item1, item2])
        i += 2
      }
      continue
    }

    // remaining >= 3
    const item3 = list[i + 2]
    if (item3.breakBefore || item3.fullRow) {
      const ratioDiff = Math.max(item1.ratio / item2.ratio, item2.ratio / item1.ratio)
      if (ratioDiff > 1.75 || item2.fullRow) {
        rows.push([item1])
        i += 1
      } else {
        rows.push([item1, item2])
        i += 2
      }
      continue
    }

    const r1 = item1.ratio
    const r2 = item2.ratio
    const r3 = item3.ratio

    // Check 3-item patterns:
    // 1. 1 Landscape + 2 Portraits (e.g. r1 >= 1.15, r2 < 1.05, r3 < 1.05)
    if (r1 >= 1.15 && r2 < 1.05 && r3 < 1.05) {
      rows.push([item1])
      i += 1
      continue
    }

    // 2. 2 Portraits + 1 Landscape (e.g. r1 < 1.05, r2 < 1.05, r3 >= 1.15)
    if (r1 < 1.05 && r2 < 1.05 && r3 >= 1.15) {
      rows.push([item1, item2])
      i += 2
      continue
    }

    // 3. 3 similar aspect ratios (e.g., all 3 portrait or all 3 moderate landscape)
    const minR = Math.min(r1, r2, r3)
    const maxR = Math.max(r1, r2, r3)
    if (maxR / minR < 1.5 && (r1 + r2 + r3) <= 4.2) {
      rows.push([item1, item2, item3])
      i += 3
      continue
    }

    // Default 3+ item fallback: pair two or take single if ratio mismatch
    const pairRatioDiff = Math.max(r1 / r2, r2 / r1)
    if (pairRatioDiff > 1.75 || r1 > 1.4) {
      rows.push([item1])
      i += 1
    } else {
      rows.push([item1, item2])
      i += 2
    }
  }

  return rows
}
