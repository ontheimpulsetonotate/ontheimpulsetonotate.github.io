import { FONT_SIZES, FONT_SIZES_RESPONSIVE, SIZES, SIZES_RESPONSIVE } from '../constants/stylesConstants'
import { getBreakpt, getSize, getVh, getVw } from './sizeUtils'
import Size from './helpers/size'


export const extractStyle = (key, fallbackString) => props =>
  fallbackString ? (props[key] ?? fallbackString) : props[key]

export const conditionalStyle = (key, string) => props =>
  props[key] ? string : ''

export const toggleStyle = (key, styleIfTrue, styleIfFalse) => props =>
  props[key] ? styleIfTrue : styleIfFalse

export const spanCol = (isMobile, colCount, additionalGaps = 0, marginCount = 0) => {
  const pageMargin = isMobile ? SIZES.PAGE_MARGIN_MOBILE : SIZES.PAGE_MARGIN_DESKTOP
  const elemMargin = isMobile ? SIZES.ELEM_MARGIN_MOBILE : SIZES.ELEM_MARGIN_DESKTOP
  const gridCount = isMobile ? SIZES.GRID_COUNT_MOBILE : SIZES.GRID_COUNT_DESKTOP
  return Size
    .subFromFullWidth(pageMargin.mult(2))
    .sub(elemMargin.mult(gridCount - 1))
    .div(gridCount)
    .mult(colCount)
    .add(elemMargin.mult(Math.max(Math.ceil(colCount) - 1 + additionalGaps, 0)))
    .add(pageMargin.mult(marginCount))
}

const {
  PAGE_MARGIN_DESKTOP,
  CLOSED_INDEX_LEFT_VALUE,
  ORDERED_COL_TOP_PADDING
} = SIZES

export const getImgViewFigureSize = () =>
  getBreakptSize(SIZES_RESPONSIVE.IMG_VIEW_FIGURE_SIZE)


export const getMainContainer = () => ({
  left: PAGE_MARGIN_DESKTOP.value,
  right: CLOSED_INDEX_LEFT_VALUE.value - PAGE_MARGIN_DESKTOP.value,
  top: ORDERED_COL_TOP_PADDING.add(PAGE_MARGIN_DESKTOP).add(FONT_SIZES.REGULAR).value,
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
    leftMargin: PAGE_MARGIN_DESKTOP.value,
    topMargin: top,
    colCount: Math.floor((width - maxSize) / (maxSize + horizontalGap)) + 1,
    getRowHeight: proportion =>
      verticalGap * 3 + getImgViewFigureSize() * proportion,
  }
}

// TODO: consolidate with mixins
// TODO: include between s - m
export const getSizes = sizes => {
  let fallbackValue
  return ['s', 'm', 'l', 'xl', 'xxl'].reduce((result, breakpoint, i, breakpoints) => {
    const sizeValue = sizes[i] ?? fallbackValue
    fallbackValue = sizeValue
    const nextSizeValue = sizes[i + 1]

    result[breakpoint] = nextSizeValue ?
      getSize({ [breakpoints[i]]: sizeValue, [breakpoints[i + 1]]: nextSizeValue }) :
      new Size(sizeValue)
    return result
  }, {})
}

const getBreakptSize = sizes => {
  const breakpt = getBreakpt()
  console.log(sizes, breakpt)
  return getSizes(sizes)[breakpt].value
}

export const convertVisualEssayImgSize = (size, isMobile, isBlueInsights) =>
  isMobile ?
    Math.max(size - (isBlueInsights ? 2153 : 1886), 0) * getVw() / 393 :
    Math.max(size - 990, 0) * getVw() / 1512

export const getTextContainerSize = () =>
  getBreakptSize(FONT_SIZES_RESPONSIVE.REGULAR) * 2 +
  getBreakptSize(FONT_SIZES_RESPONSIVE.LEADING_M) * 5 +
  getBreakptSize(SIZES_RESPONSIVE.TEXT_HEADER_MARGIN)
