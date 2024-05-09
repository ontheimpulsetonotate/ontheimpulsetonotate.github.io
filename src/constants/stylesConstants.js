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

const MARGIN = remify(30)
const OPEN_INDEX_LEFT_VALUE = 92.5
export const SIZES = {
  MARGIN,
  OPEN_INDEX_LEFT_VALUE,
  TEXT_WIDTH: remify(400),
  ARROW_PADDING: '0.25em',
  IMG_MAX_SIZE: 250,
  INDEX_STICKY_TOP: '400px',
  getMainContainer: () => ({
    left: getPx(MARGIN),
    right: vw(OPEN_INDEX_LEFT_VALUE) - getPx(MARGIN),
    top: getPx(MARGIN),
    bottom: vh()
  })
}

export const DEV_TEST_SRC = 'https://ucc8984c429afa034616491197f9.previews.dropboxusercontent.com/p/thumb/ACQP5WV98Z-0BJTA4F2kYvunvEY86YwzAWeXoB39AhoxzwBVMoQ56UZjvi_Uj_Dy9OOLnZ7wAzKa-NuaUh_w-QHKmCq1iJ0Mq5bk0mQhoCyQon0tNxcFg9xFh3zPb0RtgmTlfNF-2tHQUo3I4gvX6O0HoGCV9oMThRWnJ1is1dxpuJy3KsrgRqzLelb8tOFNwIH-zB7EZXOfvej5KxODPzNXutN6EaP4dUkSkMarmRFusjKluzOpiJv-UpNuYFDSa3_jO912GVyGXAit6f3EFIJx-MLXtW4a4S9Cv2DBTsim7hN14DP15Jh_zHwjY-Ppb6hlKRpkxMw1yIaRw5LKB-7MaEjPo-EMHGxlE-w-dMsZcCOVYDCi4wdwocQZyB9-8z0zb-6bdmuvAfweKmfmFGcA/p.jpeg'