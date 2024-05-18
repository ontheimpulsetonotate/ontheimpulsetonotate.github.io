import _ from 'lodash'
import { COLORS, SIZES } from '../constants/stylesConstants'
import { loopObject, validateString } from './commonUtils'

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

const paragraphSpacing = lineHeight => `
  line-height: ${lineHeight};

  &:not(:first-of-type){
    padding-top: ${lineHeight};
  }
`

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

const mixins = {
  flex,
  highZIndex,
  draggable,
  paragraphSpacing,
  noScrollBar,
  underline,
  border,
  grid,
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