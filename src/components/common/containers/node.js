import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { conditionalStyle, extractStyle, toggleStyle, } from '../../../utils/styleUtils'
import { TIMINGS } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import usePrevious from '../../../hooks/usePrevious'
import useMergedRef from '../../../hooks/useMergedRef'
import _ from 'lodash'
import { useWindowSize } from '@uidotdev/usehooks'

const Node = forwardRef(({
  index,
  render,
  zIndex,
  mappedPosition,
  isOrdered,
  handleToTop,
  handleDragEnd,
  handleOrder,
  ...rest
}, ref) => {
  const draggableRef = useRef()
  const innerRef = useMergedRef(ref)
  const [forcePosition, setForcePosition] = useState(true)

  const [isOrdering, setIsOrdering] = useState(false)
  const prevIsOrdered = usePrevious(isOrdered)
  const [orderedPosition, setOrderedPosition] = useState()

  // scaling
  const [isHovering, setIsHovering] = useState(false)
  const prevIsHovering = usePrevious(isHovering)
  const [shouldScale, setShouldScale] = useState(false)
  const [isScaling, setIsScaling] = useState(false)

  const [hasAnimated, setHasAnimated] = useState(false)
  const containerId = useMemo(() => `node-${_.uniqueId()}`, [])

  const [childRendered, setChildRendered] = useState(false)

  const { width } = useWindowSize()
  useEffect(() => {
    if (!handleOrder) return
    if (!isOrdered) return setOrderedPosition()
    setOrderedPosition(handleOrder(index))
  }, [isOrdered, index, width])

  useGSAP(
    () => {
      if (!childRendered || hasAnimated) return
      const id = `#${containerId}`

      gsap
        .timeline()
        .to(id, {
          opacity: 1,
          duration: 0,
          delay: _.random(0, 1.5, true),
          onComplete: () => handleToTop(index)
        })
        .to(id, {
          scale: 1,
          duration: _.random(0.15, 0.2, true),
          ease: 'back.out(2)',
          onComplete: () => setHasAnimated(true)
        })
    },
    {
      scope: innerRef,
      dependencies: [childRendered]
    }
  )

  useEffect(() => {
    if (isOrdered || !hasAnimated) return
    if (isHovering) {
      setShouldScale(true)
      setIsScaling(true)
    } else if (prevIsHovering !== null)
      setIsScaling(true)
  }, [prevIsHovering, isHovering, isOrdered, hasAnimated])

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
    handleToTop(index)
    setForcePosition(false)
  }

  const onHover = isHovering => {
    if (!hasAnimated) return
    setIsHovering(isHovering)
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
        onTransitionEnd={() => setIsOrdering(false)}
        $zIndex={zIndex}
        $isOrdered={isOrdered}
        $transition={isOrdering}>
        {render({
          ...rest,
          onMouseOver: () => onHover(true),
          onMouseOut: () => onHover(false),
          onTransitionEnd: () => setIsScaling(false),
          onHover,
          onRender: () => setChildRendered(true),
          id: containerId,
          style: {
            transform: `scale(${hasAnimated ? ((shouldScale && !isOrdered) ? 1.225 : 1) : _.random(1.1, 1.2, true)})`
          }
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
    opacity: 0;
    transition: transform 150ms ease-in-out;
  }
`

export default Node