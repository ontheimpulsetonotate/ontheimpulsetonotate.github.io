import { SIZES } from '../constants/stylesConstants'

export const vw = (percentage = 100) => percentage / 100 * window.innerWidth
export const vh = (percentage = 100) => percentage / 100 * window.innerHeight

export const remify = px => `${px / 16}rem` // parseInt(getComputedStyle(document.body).fontSize)

export const getRem = (rem = 1) => parseInt(getComputedStyle(document.body).fontSize) * rem
export const getPx = emString => parseFloat(emString.replace(/rem$/, '')) * getRem()
export const getEmifiedPx = px => getPx(remify(px))

export const extractStyle = (key, fallbackString) => props =>
  fallbackString ? (props[key] ?? fallbackString) : props[key]

export const conditionalStyle = (key, string) => props =>
  props[key] ? string : ''

export const toggleStyle = (key, styleIfTrue, styleIfFalse) => props =>
  props[key] ? styleIfTrue : styleIfFalse

export const spanCol = (colCount, additionalGaps = 0, marginCount = 0) =>
  `calc((100vw - ${SIZES.PAGE_MARGIN} * 2 - ${SIZES.ELEM_MARGIN} * ${SIZES.GRID_COUNT - 1}) /${SIZES.GRID_COUNT} * ${colCount} + ${Math.max(Math.ceil(colCount) - 1 + additionalGaps, 0)} * ${SIZES.ELEM_MARGIN} + ${marginCount} * ${SIZES.PAGE_MARGIN})`