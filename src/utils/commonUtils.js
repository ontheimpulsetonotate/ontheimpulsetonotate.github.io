import _ from 'lodash'

export const validateString = (validatorOrString, string) => {
  if (!string) return validatorOrString || ''
  return validatorOrString ? string : ''
}

export const loopObject = (object, callback) => {
  Object.keys(object).forEach(key => {
    const value = object[key]
    callback(key, value, object)
  })
  return object
}

export const quickArray = (length, callback = i => i) => Array(length).fill(0).map((_, i) => callback(i))

export const getDataStringSorter = key => (a, b) => {
  if (!a[key]) return 1
  if (!b[key]) return -1
  return a[key].localeCompare(b[key])
}

export const randLocation = ({ left, right, top, bottom }, { x, y } = { x: 0, y: 0 }) => {
  const mapBound = 0.975
  const stddevX = 0.5
  const stddevY = 0.6
  const paddingBoundFactor = 0.5

  return {
    x: _.clamp(
      map(gaussianRandom(0, stddevX), -mapBound, mapBound, left + x, right - x),
      left + x * paddingBoundFactor,
      right - x * paddingBoundFactor
    ),
    y: _.clamp(
      map(gaussianRandom(0, stddevY), -mapBound, mapBound, top + y, bottom - y),
      top + y * paddingBoundFactor,
      bottom - y * paddingBoundFactor
    )
  }
}

const gaussianRandom = (mean = 0, stdev = 1) => {
  const u = 1 - Math.random() // Converting [0,1) to (0,1]
  const v = Math.random()
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean
}

const map = (value, inMin, inMax, outMin = 0, outMax = 1) =>
  (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
