const generatedImagePath = /^\/_generated\/images(?:\/|$)/
const externalUrl = /^(?:https?:)?\/\//

export const normalizeImageAssetBaseUrl = (value = '') =>
  String(value || '').trim().replace(/\/+$/, '')

export const resolveGeneratedImageAssetUrl = (src, assetBaseUrl = '') => {
  const value = String(src || '')
  if (!value || externalUrl.test(value) || !generatedImagePath.test(value.split(/[?#]/, 1)[0])) {
    return value
  }

  const baseUrl = normalizeImageAssetBaseUrl(assetBaseUrl)
  return baseUrl ? `${baseUrl}${value}` : value
}
