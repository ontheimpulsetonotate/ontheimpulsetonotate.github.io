import { FONT_SIZES, SIZES } from '../constants/stylesConstants'
import { getPx, getVh, getVw } from './sizeUtils'


export const extractStyle = (key, fallbackString) => props =>
  fallbackString ? (props[key] ?? fallbackString) : props[key]

export const conditionalStyle = (key, string) => props =>
  props[key] ? string : ''

export const toggleStyle = (key, styleIfTrue, styleIfFalse) => props =>
  props[key] ? styleIfTrue : styleIfFalse

export const spanCol = (colCount, additionalGaps = 0, marginCount = 0) =>
  `calc((100vw - ${SIZES.PAGE_MARGIN} * 2 - ${SIZES.ELEM_MARGIN} * ${SIZES.GRID_COUNT - 1}) /${SIZES.GRID_COUNT} * ${colCount} + ${Math.max(Math.ceil(colCount) - 1 + additionalGaps, 0)} * ${SIZES.ELEM_MARGIN} + ${marginCount} * ${SIZES.PAGE_MARGIN})`

const {
  PAGE_MARGIN,
  CLOSED_INDEX_LEFT_VALUE: OPENED_INDEX_LEFT_VALUE,
  ORDERED_COL_GAP,
  ORDERED_COL_TOP_PADDING,
  getImgViewFigureSize: getImgMaxSize
} = SIZES

export const getMainContainer = () => ({
  left: getPx(PAGE_MARGIN),
  right: getVw(OPENED_INDEX_LEFT_VALUE) - getPx(PAGE_MARGIN),
  top: getPx(ORDERED_COL_TOP_PADDING) + getPx(PAGE_MARGIN) + getPx(FONT_SIZES.REGULAR),
  bottom: getVh()
})

export const getOrderedData = () => {
  const maxSize = getImgMaxSize()
  const { left, right, top } = getMainContainer()
  const width = right - left

  const gap = getPx(ORDERED_COL_GAP)

  return {
    gap,
    leftMargin: getPx(PAGE_MARGIN),
    topMargin: top,
    colCount: Math.floor((width - maxSize) / (maxSize + gap)) + 1,
    rowHeight: getPx(FONT_SIZES.SMALL) * 2 + SIZES.getImgViewFigureSize(),
    getRowHeight: proportion =>
      getPx(FONT_SIZES.SMALL) * 2 + SIZES.getImgViewFigureSize() * proportion,
  }
}
