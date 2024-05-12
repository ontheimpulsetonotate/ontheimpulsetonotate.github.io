import { getEmifiedPx, getPx, remify } from '../utils/styleUtils'

export const FONT_FAMILIES = {
  APERCU: '"Apercu", sans-serif',
  APERCU_MONO: 'Apercu Mono, Monospace',
  APERCU_COND: 'Apercu Condensed Pro, sans-serif',
  BRADFORD: 'Bradford LL, serif'
}

export const FONT_SIZES = {
  SMALL: remify(10),
  MEDIUM: remify(13),
  REGULAR: remify(15),
  MIXED: remify(16),

  LEADING_S: remify(15),
  LEADING_M: remify(18),
  LEADING_DL: remify(20),
  LEADING_L: remify(40),
}

export const COLORS = {
  GRAY: '#DEDAD7',
  BROWN: '#A1752A',
  BLUE: '#2583BE',
  BEIGE: '#FFF3DE',
  DARK_BEIGE: '#EAE1D0',
  LIGHT_BEIGE: '#F6F2EB',
}


const IMG_MAX_SIZE = '250px'
const TEXT_WIDTH = remify(300)
export const SIZES = {
  PAGE_MARGIN: remify(30),

  OPENED_INDEX_LEFT_VALUE: 92.5,
  INDEX_STICKY_TOP: 'calc(180px + 20vh)',
  ARROW_PADDING: '0.25em',

  ELEM_MARGIN: remify(20),
  HEADER_MARGIN: remify(30),
  TEXT_WIDTH,

  IMG_MAX_SIZE,
  getImgMaxSize: () => parseFloat(IMG_MAX_SIZE),
  getTextContainerSize: () => ({
    w: getPx(TEXT_WIDTH),
    h: getEmifiedPx(20) * 3 + getPx(FONT_SIZES.LEADING_M) * 6
  }),

  ORDERED_COL_GAP: remify(18),
  ORDERED_COL_TOP_PADDING: remify(45),

  MIXED_VIEW_SECTION_PADDING_TOP: remify(225),
}

export const TIMINGS = {
  ORDER: 500,
}