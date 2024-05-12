import _ from 'lodash'
import { loopObject, validateString } from './commonUtils'
import { remify } from './styleUtils'
import { COLORS } from '../constants/stylesConstants'

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
  text-underline-offset: ${remify(6)};
`

const border = (strokeWidth, isBottom = true) => `
  border${validateString(isBottom, '-bottom')}: ${COLORS.BROWN} ${strokeWidth}px solid;
`

const mixins = {
  flex,
  highZIndex,
  draggable,
  paragraphSpacing,
  noScrollBar,
  underline,
  border,
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