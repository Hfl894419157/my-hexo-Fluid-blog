export const visibleContent = (items = []) => items.filter((item) => ['published', 'planned'].includes(item.status))

export const publishedContent = (items = []) => items.filter((item) => item.status === 'published')

export const latestPublished = (items = [], limit = 6) => publishedContent(items)
  .slice()
  .sort((left, right) => String(right.updatedAt || '').localeCompare(String(left.updatedAt || '')) || String(right.createdAt || '').localeCompare(String(left.createdAt || '')))
  .slice(0, limit)

const asArray = (value) => Array.isArray(value) ? value : []

export const normalizeHomeSelections = (value = {}) => ({
  featuredCases: asArray(value?.featuredCases),
  featuredWorkflows: asArray(value?.featuredWorkflows),
  knowledge: {
    learning: asArray(value?.knowledge?.learning),
    methods: asArray(value?.knowledge?.methods),
    resources: asArray(value?.knowledge?.resources)
  }
})

export const resolveSelections = (items = [], selectedValues = [], limit = Infinity) => {
  const byValue = new Map()
  for (const item of items) {
    if (item.contentId) byValue.set(item.contentId, item)
    if (item.sourcePath) byValue.set(item.sourcePath, item)
  }
  return asArray(selectedValues)
    .map((selectedValue) => byValue.get(selectedValue))
    .filter((item) => item?.status === 'published')
    .slice(0, limit)
}

export const formatCardNumber = (value) => String(value).padStart(2, '0')
