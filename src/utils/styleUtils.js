import * as changeCase from 'change-case'
import { FONT_SIZES, FONT_SIZES_RESPONSIVE, SIZES, SIZES_RESPONSIVE } from '../constants/stylesConstants'
import { arrayify, loopObject, validateString } from './commonUtils'
import { getBreakpt, getPx, getSize, getVh, getVw, vw } from './sizeUtils'
import Size from './helpers/size'


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
  CLOSED_INDEX_LEFT_VALUE,
  ORDERED_COL_TOP_PADDING
} = SIZES

export const getImgViewFigureSize = () =>
  getBreakptSize(SIZES_RESPONSIVE.IMG_VIEW_FIGURE_SIZE)


export const getMainContainer = () => ({
  left: getPx(PAGE_MARGIN),
  right: getVw(CLOSED_INDEX_LEFT_VALUE) - getPx(PAGE_MARGIN),
  top: getPx(ORDERED_COL_TOP_PADDING) + getPx(PAGE_MARGIN) + getPx(FONT_SIZES.REGULAR),
  bottom: getVh()
})

export const getOrderedData = () => {
  const maxSize = getImgViewFigureSize()
  const { left, right, top } = getMainContainer()
  const width = right - left

  const horizontalGap = getBreakptSize(SIZES_RESPONSIVE.ORDERED_COL_GAP)
  const verticalGap = getBreakptSize(FONT_SIZES_RESPONSIVE.SMALL)

  return {
    gap: horizontalGap,
    leftMargin: getPx(PAGE_MARGIN),
    topMargin: top,
    colCount: Math.floor((width - maxSize) / (maxSize + horizontalGap)) + 1,
    getRowHeight: proportion =>
      verticalGap * 3 + getImgViewFigureSize() * proportion,
  }
}

// TODO: consolidate with mixins
export const getSizes = sizes => {
  let fallbackValue
  return ['m', 'l', 'xl', 'xxl'].reduce((result, breakpoint, i, breakpoints) => {
    const sizeValue = sizes[i] ?? fallbackValue
    fallbackValue = sizeValue
    const nextSizeValue = sizes[i + 1]

    result[breakpoint] = nextSizeValue ?
      getSize({ [breakpoints[i]]: sizeValue, [breakpoints[i + 1]]: nextSizeValue }) :
      new Size(sizeValue)
    return result
  }, {})
}

export const getBreakptSize = sizes => {
  const breakpt = getBreakpt()
  return getSizes(sizes)[breakpt].value
}