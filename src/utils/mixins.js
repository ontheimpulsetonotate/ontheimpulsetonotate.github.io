import * as changeCase from 'change-case'
import _ from 'lodash'
import { COLORS, SIZES } from '../constants/stylesConstants'
import breakpts from '../data/breakpoints'
import { arrayify, loopObject, quickArray, validateString } from './commonUtils'
import { getSize } from './sizeUtils'
import Size from './helpers/size'

const flex = (
  alignItems = 'initial',
  justifyContent = 'initial',
  isInLine = false
) => `
  display: ${validateString(isInLine, 'inline-')}flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`

const highZIndex = level => `z-index: ${'9'.repeat(level)};`

const draggable = () => `
  cursor: move;
  user-select: none;
  position: absolute;
`

const paragraphSpacing = lineHeights => {
  const string = `
  ${dynamicSizes({ lineHeight: lineHeights })};

  &:not(:first-of-type){
    ${dynamicSizes({ paddingTop: lineHeights })};
  }
`
  return string
}

const noScrollBar = () => `
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const underline = () => `
  text-decoration: underline;
  text-underline-offset: ${SIZES.UNDERLINE_OFFSET};
`

const border = (strokeWidth = 1, { isBottom = true, color = COLORS.BROWN } = {}) => `
  border${validateString(isBottom, '-bottom')}: ${color} ${strokeWidth}px solid;
`

const grid = () => `
  display: grid;
  grid-template-columns: calc((${SIZES.CLOSED_INDEX_LEFT_VALUE}vw - ${SIZES.MIXED_VIEW_SECTION_WIDTH}) / 2) ${SIZES.MIXED_VIEW_SECTION_WIDTH} 1fr;
`

const dynamicSizes = config => {
  const fallbackValues = {}
  return ['m', 'l', 'xl', 'xxl'].reduce((cssStatement, _, i, breakpoints) => {
    let cssStyles = ''
    loopObject(config, (styleName, sizes) => {
      styleName = changeCase.kebabCase(styleName)
      const sizeValue = sizes[i] ?? fallbackValues[styleName]
      fallbackValues[styleName] = sizeValue

      const nextSizeValue = sizes[i + 1]

      const size = nextSizeValue ?
        getSize({ [breakpoints[i]]: sizeValue, [breakpoints[i + 1]]: nextSizeValue }) :
        new Size(sizeValue)

      cssStyles += (`${styleName}: ${validateString(size?.css)};`)
    })

    // TODO?
    const queries = [
      `(min-width: ${breakpts.m}px) and (max-width: ${breakpts.l - 1}px)`,
      `(min-width: ${breakpts.l}px) and (max-width: ${breakpts.xl - 1}px)`,
      `(min-width: ${breakpts.xl}px) and (max-width: ${breakpts.xxl - 1}px)`,
      `(min-width: ${breakpts.xxl}px)`,
    ]

    return cssStatement += `@media screen and ${queries[i]} {${cssStyles}};`
  }, '')
}

const mixins = {
  flex,
  highZIndex,
  draggable,

  paragraphSpacing,
  noScrollBar,
  underline,
  border,
  grid,
  dynamicSizes,
  chain: function () {
    const chainedObject = {}
    let accumulatedReturn = ''
    loopObject(_.omit(mixins, 'chain'), (mixinName, originalMixin) => {
      chainedObject[mixinName] = function (...args) {
        accumulatedReturn += originalMixin(...args)
        const returnFunction = () => accumulatedReturn
        return Object.assign(returnFunction, this)
      }
    })
    return chainedObject
  }
}

export default mixins