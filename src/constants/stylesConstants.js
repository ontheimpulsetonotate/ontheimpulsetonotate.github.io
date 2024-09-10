import Size from '../utils/helpers/size'
import { getBreakpt, getEmifiedPx, getPx, getSize, remify } from '../utils/sizeUtils'

export const FONT_FAMILIES = {
  APERCU: '"Apercu", sans-serif',
  APERCU_MONO: 'Apercu Mono, Monospace',
  APERCU_COND: 'Apercu Condensed Pro, sans-serif',
  BRADFORD: 'Bradford LL, serif'
}

export const FONT_SIZES = {
  SMALL: new Size(11),
  REGULAR: new Size(15),
  LEADING_S: new Size(15),
  LEADING_M: new Size(18),
  LEADING_L: new Size(20),
}

export const FONT_SIZES_RESPONSIVE = {
  SMALL: [10.75, 11],
  REGULAR: [14, 15],
  TEXT_HEADER: [14.25, 15],
  LARGE: [15.75, 16, 16.25, 16.5],
  LEADING_XS: [12.75, 13],
  LEADING_S: [14, 15],
  LEADING_M: [17, 18],
  LEADING_DL: [19.75, 20, 20.25, 20.5],

  // mobile
  MOBILE_REGULAR: [15, 16],
  MOBILE_LEADING: [19, 20],
}

export const COLORS = {
  GRAY: '#DEDAD7',
  BROWN: '#A1752A',
  BLUE: '#2583BE',
  LIGHT_BLUE: '#D3E6F2',
  BEIGE: '#FFF3DE',
  DARK_BEIGE: '#EAE1D0',
  LIGHT_BEIGE: '#F6F2EB',
}

const PAGE_MARGIN_MOBILE = new Size(25)
export const SIZES = {
  GRID_COUNT_DESKTOP: 9,
  GRID_COUNT_MOBILE: 5,

  PAGE_MARGIN_DESKTOP: new Size(30),
  PAGE_MARGIN_MOBILE,
  ELEM_MARGIN_DESKTOP: new Size(20),
  ELEM_MARGIN_MOBILE: new Size(10),

  UNDERLINE_OFFSET: new Size(6),

  OPENED_INDEX_LEFT_VALUE: new Size({ vw: 30 }),
  CLOSED_INDEX_LEFT_VALUE: new Size({ vw: 91.5 }),
  INDEX_STICKY_TOP: new Size({ rem: 11.25, vh: 20 }),
  INDEX_ARTIST_WIDTH: '35%',
  INDEX_MEDIUM_WIDTH: '25%',
  INDEX_PAGE_NUM_WIDTH: new Size(100),
  ARROW_PADDING: new Size(4),

  HEADER_INNER_MARGIN: new Size(12),
  FIGURE_MARGIN_TOP: new Size(10),

  ORDERED_COL_TOP_PADDING: new Size(45),

  MIXED_VIEW_FIRST_PADDING_TOP: new Size(250),
  MIXED_VIEW_PADDING_TOP: new Size(400),
  MIXED_VIEW_PADDING_TOP_MOBILE: new Size(150),
  MIXED_VIEW_INTERVIEW_PADDING_TOP: new Size(30),
  MIXED_VIEW_INTERVIEW_PADDING_TOP_MOBILE: new Size(75),
  MIXED_VIEW_PADDING_BOTTOM: new Size(150),
  MIXED_VIEW_FIGURE_MARGIN: new Size(15),
  MIXED_VIEW_TEXT_PADDING: new Size(40),

  CITATION_MAX_WIDTH: new Size(400),
  CITATION_PADDING: new Size(10),
  CITATION_OFFSET: new Size(10),

  // mobile
  HEADER_BUTTON_PADDING: new Size(5),
  HEADER_BARS_HEIGHT: new Size(12.5),
  PAGE_MARGIN_TOP: FONT_SIZES.LEADING_S.add(PAGE_MARGIN_MOBILE.mult(3)),
  PAGE_MAX_WIDTH: new Size(650),
  IMG_MAX_WIDTH: new Size(650)
}

export const SIZES_RESPONSIVE = {
  TEXT_WIDTH: [270, 320, 370],
  TEXT_PADDING: [15, 17.5, 20],
  TEXT_HEADER_MARGIN: [25, 30],
  IMG_VIEW_FIGURE_SIZE: [85, 100, 115],
  ORDERED_COL_GAP: [15, 18],
  MIXED_VIEW_SECTION_WIDTH: [450, 475, 500],
  MIXED_VIEW_FIGURUE_SIZE: [210, 230, 300],
  INDEX_TAB_FIGURE_SIZE: [200, 225, 250],
  CITATION_WIDTH: [250, 275],
}

export const TIMINGS = {
  ORDER: 500,
  NODE_SCALE: 300,
  MIXED_FIGURE_OPACITY: 200,
  INDEX_SLIDE: 600
}