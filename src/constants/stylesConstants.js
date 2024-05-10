import { remify, getPx, vh, vw } from '../utils/styleUtils'

export const FONT_FAMILIES = {
  APERCU: 'Apercu',
  APERCU_MONO: 'Apercu Mono',
  APERCU_COND: 'Apercu Condensed Pro',
  BRADFORD: 'Bradford LL'
}

export const FONT_SIZES = {
  SMALL: remify(10),
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

export const SIZES = {
  MARGIN: remify(30),
  OPEN_INDEX_LEFT_VALUE: 92.5,
  TEXT_WIDTH: remify(400),
  ARROW_PADDING: '0.25em',
  IMG_MAX_SIZE: '250px',
  INDEX_STICKY_TOP: '400px',
  ORDERED_COL_GAP: remify(18),
  ORDERED_COL_TOP_PADDING: remify(45),
}
