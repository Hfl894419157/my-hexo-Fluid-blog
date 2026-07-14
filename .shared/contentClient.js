export const visibleContent = (items = []) => items.filter((item) => ['published', 'planned'].includes(item.status))

export const publishedContent = (items = []) => items.filter((item) => item.status === 'published')

export const resolveSelections = (items = [], selectedPaths = [], limit = Infinity) => {
  const byPath = new Map(items.map((item) => [item.sourcePath, item]))
  return selectedPaths
    .map((sourcePath) => byPath.get(sourcePath))
    .filter((item) => item?.status === 'published')
    .slice(0, limit)
}

export const formatCardNumber = (value) => String(value).padStart(2, '0')
