export const vw = (percentage = 100) => percentage / 100 * window.innerWidth
export const vh = (percentage = 100) => percentage / 100 * window.innerHeight

export const remify = px => `${px / 16}rem`

export const extractStyle = (key, fallbackStyle) => props =>
  fallbackStyle ? (props[key] ?? fallbackStyle) : props[key]

export const conditionalStyle = (key, style) => props =>
  props[key] ? style : ''

export const toggleStyle = (key, styleIfTrue, styleIfFalse) => props =>
  props[key] ? styleIfTrue : styleIfFalse

export const getEm = (em = 1) => parseInt(getComputedStyle(document.body).fontSize) * em
export const getPx = emString => parseFloat(emString.replace(/em$/, '')) * getEm()
export const getEmifiedPx = px => getPx(remify(px))