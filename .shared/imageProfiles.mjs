export const focalPointValues = [
  'top-left',
  'top',
  'top-right',
  'left',
  'center',
  'right',
  'bottom-left',
  'bottom',
  'bottom-right'
]

const focalCoordinates = {
  'top-left': [0, 0],
  top: [0.5, 0],
  'top-right': [1, 0],
  left: [0, 0.5],
  center: [0.5, 0.5],
  right: [1, 0.5],
  'bottom-left': [0, 1],
  bottom: [0.5, 1],
  'bottom-right': [1, 1]
}

export const imageProfileDefinitions = {
  card: { aspect: 16 / 9, widths: [320, 480, 760] },
  homeCase: { aspect: 16 / 9, widths: [480, 760, 1080] },
  homeDesktop: { aspect: 1, widths: [480, 760, 1080] },
  homeMobile: { aspect: 16 / 10, widths: [320, 480, 760, 1080] }
}

export const normalizeFocalPoint = (value) =>
  focalPointValues.includes(String(value || '')) ? String(value) : 'center'

export const focalPointCss = (value) => {
  const [x, y] = focalCoordinates[normalizeFocalPoint(value)]
  return `${x * 100}% ${y * 100}%`
}

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

export const getCropBox = (sourceWidth, sourceHeight, targetAspect, focalPoint = 'center') => {
  const width = Math.max(1, Math.round(Number(sourceWidth) || 1))
  const height = Math.max(1, Math.round(Number(sourceHeight) || 1))
  const aspect = Number(targetAspect) > 0 ? Number(targetAspect) : width / height
  const [focusX, focusY] = focalCoordinates[normalizeFocalPoint(focalPoint)]
  const sourceAspect = width / height

  if (sourceAspect > aspect) {
    const cropWidth = Math.min(width, Math.max(1, Math.round(height * aspect)))
    const left = clamp(Math.round(focusX * width - cropWidth / 2), 0, width - cropWidth)
    return { left, top: 0, width: cropWidth, height }
  }

  const cropHeight = Math.min(height, Math.max(1, Math.round(width / aspect)))
  const top = clamp(Math.round(focusY * height - cropHeight / 2), 0, height - cropHeight)
  return { left: 0, top, width, height: cropHeight }
}
