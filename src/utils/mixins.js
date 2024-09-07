import * as changeCase from 'change-case'
import _ from 'lodash'
import { COLORS, SIZES } from '../constants/stylesConstants'
import { arrayify, loopObject, validateString } from './commonUtils'
import { getSize, desktopQueries } from './sizeUtils'
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
  ${dynamicSizes({

})}
  grid-template-columns: 1fr ${SIZES.MIXED_VIEW_SECTION_WIDTH} 1fr;
`

const dynamicSizes = config => {
  const fallbackValues = {}
  return ['m', 'l', 'xl', 'xxl'].reduce((cssStatement, _, i, breakpoints) => {
    let cssStyles = ''
    loopObject(config, (styleName, sizes) => {
      styleName = changeCase.kebabCase(styleName)
      sizes = arrayify(sizes)
      const sizeValue = sizes[i] ?? fallbackValues[styleName]
      fallbackValues[styleName] = sizeValue

      if (!sizeValue) return
      if (typeof sizeValue === 'string')
        return cssStyles += (`${styleName}: ${sizeValue};`)

      const nextSizeValue = sizes[i + 1]

      const size = nextSizeValue ?
        getSize({ [breakpoints[i]]: sizeValue, [breakpoints[i + 1]]: nextSizeValue }) :
        new Size(sizeValue)

      cssStyles += (`${styleName}: ${validateString(size?.css)};`)
    })
    return cssStatement += `@media screen and ${desktopQueries[i]} {${cssStyles}};`
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