import { loadContentCatalog } from './contentCatalog.mjs'

export default {
  watch: [
    '../portfolio/*.md',
    '../aigc/*.md',
    '../knowledge/learning-observation/*.md',
    '../knowledge/methods/*.md',
    '../knowledge/resources/*.md'
  ],
  load(watchedFiles) {
    return loadContentCatalog({ files: watchedFiles })
  }
}
