import { FONT_SIZES, SIZES } from '../constants/stylesConstants'
import { getPx, vh, vw } from './styleUtils'


const { MARGIN, OPEN_INDEX_LEFT_VALUE } = SIZES

export const getMainContainer = () => ({
  left: getPx(MARGIN),
  right: vw(OPEN_INDEX_LEFT_VALUE) - getPx(MARGIN),
  top: getPx(MARGIN),
  bottom: vh()
})

export const getOrderedData = () => {
  const { IMG_MAX_SIZE, ORDERED_COL_GAP, MARGIN, ORDERED_COL_TOP_PADDING } = SIZES
  const maxSize = parseFloat(IMG_MAX_SIZE)
  const { left, right } = getMainContainer()
  const width = right - left

  const gap = getPx(ORDERED_COL_GAP)
  const margin = getPx(MARGIN)

  return {
    gap,
    leftMargin: margin,
    topMargin: getPx(ORDERED_COL_TOP_PADDING) + margin + getPx(FONT_SIZES.REGULAR),
    colCount: Math.floor((width - maxSize) / (maxSize + gap)) + 1,
    rowHeight: getPx(FONT_SIZES.SMALL) * 2 + parseFloat(SIZES.IMG_MAX_SIZE)
  }
}