import _ from 'lodash'
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

  &:not(:first-child){
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

const mixins = {
  flex,
  highZIndex,
  draggable,
  paragraphSpacing,
  noScrollBar,
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