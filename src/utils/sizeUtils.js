import { FONT_SIZES, SIZES } from '../constants/stylesConstants'
import { getPx, vh, vw } from './styleUtils'


const {
  PAGE_MARGIN,
  OPENED_INDEX_LEFT_VALUE,
  ORDERED_COL_GAP,
  ORDERED_COL_TOP_PADDING,
  getImgMaxSize
} = SIZES

export const getMainContainer = () => ({
  left: getPx(PAGE_MARGIN),
  right: vw(OPENED_INDEX_LEFT_VALUE) - getPx(PAGE_MARGIN),
  top: getPx(ORDERED_COL_TOP_PADDING) + getPx(PAGE_MARGIN) + getPx(FONT_SIZES.REGULAR),
  bottom: vh()
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
    rowHeight: getPx(FONT_SIZES.SMALL) * 2 + SIZES.getImgMaxSize()
  }
}