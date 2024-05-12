import { forwardRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import { conditionalStyle, extractStyle, toggleStyle, } from '../../../utils/styleUtils'
import { TIMINGS } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import usePrevious from '../../../hooks/usePrevious'
import useMergedRef from '../../../hooks/useMergedRef'


const DraggableContainer = forwardRef(({
  index,
  render,
  zIndex,
  mappedPosition,
  orderedPosition,
  isOrdered,
  isHovering,
  handleClick,
  handleHover,
  handleDragEnd
}, ref) => {
  const draggableRef = useRef()
  const innerRef = useMergedRef(ref)
  const [forcePosition, setForcePosition] = useState(true)

  const [isOrdering, setIsOrdering] = useState(false)
  const prevIsOrdered = usePrevious(isOrdered)

  // scaling
  const prevIsHovering = usePrevious(isHovering)
  const [shouldScale, setShouldScale] = useState(false)
  const [isScaling, setIsScaling] = useState(false)

  useEffect(() => {
    if (isOrdered) return
    if (isHovering) {
      setShouldScale(true)
      setIsScaling(true)
    } else if (prevIsHovering !== null)
      setIsScaling(true)
  }, [prevIsHovering, isHovering, isOrdered])

  useEffect(() => {
    if (!isHovering && !isScaling)
      setShouldScale(false)
  }, [isHovering, isScaling])

  useEffect(() => {
    if (prevIsOrdered !== null) setIsOrdering(true)
  }, [prevIsOrdered, isOrdered])

  useEffect(() => setForcePosition(true), [mappedPosition])

  const onClick = () => {
    if (isOrdered) return
    handleClick(index)
    setForcePosition(false)
  }

  return (
    <Draggable
      defaultPosition={mappedPosition}
      position={orderedPosition || (forcePosition ? mappedPosition : undefined)}
      ref={draggableRef}
      disabled={isOrdered || isOrdering}
      onMouseDown={onClick}
      onStop={() => handleDragEnd(index, draggableRef.current.state)}>
      <InnerContainer
        ref={innerRef}
        onClick={() => console.log(index)}
        onTransitionEnd={() => setIsOrdering(false)}
        $zIndex={zIndex}
        $isOrdered={isOrdered}
        $transition={isOrdering}
        $shouldScale={shouldScale && !isOrdered}>
        {render({
          onMouseOver: () => handleHover(true),
          onMouseOut: () => handleHover(false),
          onTransitionEnd: () => setIsScaling(false)
        })}
      </InnerContainer>
    </Draggable >
  )
})

const InnerContainer = styled.div`
 ${mixins.draggable}
  z-index: ${extractStyle('$zIndex')};
  transition: ${conditionalStyle('$transition', `transform ${TIMINGS.ORDER}ms ease-in-out`)};
  cursor: ${toggleStyle('$isOrdered', 'initial', 'move')};

  * {
    pointer-events: none;
  }

  > * {
    transform: scale(${toggleStyle('$shouldScale', 1.225, 1)});
    transition: transform 150ms ease-in-out;
  }
`

export default DraggableContainer