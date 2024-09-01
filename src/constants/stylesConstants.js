import { getEmifiedPx, getPx, remify } from '../utils/styleUtils'

export const FONT_FAMILIES = {
  APERCU: '"Apercu", sans-serif',
  APERCU_MONO: 'Apercu Mono, Monospace',
  APERCU_COND: 'Apercu Condensed Pro, sans-serif',
  BRADFORD: 'Bradford LL, serif'
}

export const FONT_SIZES = {
  SMALL: remify(11),
  MEDIUM: remify(13),
  REGULAR: remify(15),
  LARGE: remify(16),

  LEADING_S: remify(15),
  LEADING_M: remify(18),
  LEADING_DL: remify(20),
  LEADING_L: remify(40),
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


const IMG_VIEW_FIGURE_SIZE = '100px'
const TEXT_WIDTH = remify(300)
export const SIZES = {
  GRID_COUNT: 9,
  PAGE_MARGIN: remify(30),

  UNDERLINE_OFFSET: remify(6),

  OPENED_INDEX_LEFT_VALUE: 27.5,
  CLOSED_INDEX_LEFT_VALUE: 92.5,
  INDEX_STICKY_TOP: 'calc(180px + 20vh)',
  INDEX_TAB_FIGURE_SIZE: '250px',
  INDEX_ARTIST_WIDTH: '35%',
  INDEX_MEDIUM_WIDTH: '25%',
  INDEX_PAGE_NUM_WIDTH: remify(100),
  ARROW_PADDING: '0.25em',

  ELEM_MARGIN: remify(20),
  HEADER_MARGIN: remify(30),
  HEADER_INNER_MARGIN: '0.75em',
  HOME_BUTTON_WIDTH: remify(240),
  TEXT_WIDTH,
  FIGURE_MARGIN_TOP: remify(8),

  IMG_VIEW_FIGURE_SIZE,

  getImgViewFigureSize: () => parseFloat(IMG_VIEW_FIGURE_SIZE),
  getTextContainerSize: () => ({
    w: getPx(TEXT_WIDTH),
    h: getEmifiedPx(20) * 3 + getPx(FONT_SIZES.LEADING_M) * 6
  }),

  ORDERED_COL_GAP: remify(18),
  ORDERED_COL_TOP_PADDING: remify(45),

  MIXED_VIEW_PADDING_TOP: remify(225),
  MIXED_VIEW_INTERVIEW_PADDING_TOP: remify(30),
  MIXED_VIEW_PADDING_BOTTOM: remify(150),
  MIXED_VIEW_SECTION_WIDTH: remify(500),
  MIXED_VIEW_FIGURUE_SIZE: '300px',
  MIXED_VIEW_FIGURE_MARGIN: remify(15),
  MIXED_VIEW_TEXT_PADDING: remify(40),
  CITATION_MAX_WIDTH: remify(400),
  CITATION_PADDING: remify(10),
  CITATION_OFFSET: remify(10),

  ABOUT_SECTION_TOP: remify(250),
  ABOUT_SECTION_DIVIDER_MARGIN: remify(35),

  VISUAL_ESSAY_BOTTOM_PADDING: remify(180),
}

export const TIMINGS = {
  ORDER: 500,
  NODE_SCALE: 300,
  MIXED_FIGURE_OPACITY: 200,
  INDEX_SLIDE: 600
}