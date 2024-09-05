import { BreakptSizer } from './helpers/breakptSizer'

export const breakptSorted = ['s', 'm', 'l', 'xl', 'xxl']

export const remify = px => `${px / getRem(1)}rem`
export const getPx = emString => parseFloat(emString.replace(/rem$/, '')) * getRem()
export const getEmifiedPx = px => getPx(remify(px))

export const Unit = {
  Vw: 'vw',
  Vh: 'vh',
  Dvw: 'dvw',
  Dvh: 'dvh',
  Px: 'px',
  '%': '%',
  Em: 'em',
  Rem: 'rem'
}

const createSuffixFunction = suffix => quantity => `${quantity}${suffix}`
export const px = createSuffixFunction(Unit.Px)
export const vw = createSuffixFunction(Unit.Vw)
export const vh = createSuffixFunction(Unit.Vh)
export const dvw = createSuffixFunction(Unit.Dvw)
export const dvh = createSuffixFunction(Unit.Dvh)
export const percent = createSuffixFunction(Unit['%'])
export const em = createSuffixFunction(Unit.Em)
export const rem = createSuffixFunction(Unit.Rem)

export const getVw = (percentage = 100) => percentage / 100 * window.innerWidth
export const getVh = (percentage = 100) => percentage / 100 * window.innerHeight
export const getRem = (multiplier = 1) => parseFloat(getComputedStyle(
  document.documentElement).fontSize) * multiplier

export const getSize = (breakptSizes) =>
  new BreakptSizer(breakptSizes).getSize(false)

export const getRemSize = (breakptSizes) =>
  new BreakptSizer(breakptSizes).getSize(true)