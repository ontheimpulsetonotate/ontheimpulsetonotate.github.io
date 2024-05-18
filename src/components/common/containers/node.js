import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import _ from 'lodash'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import { SIZES, TIMINGS } from '../../../constants/stylesConstants'
import useMergedRef from '../../../hooks/useMergedRef'
import { validateString } from '../../../utils/commonUtils'
import mixins from '../../../utils/mixins'
import { getPx } from '../../../utils/styleUtils'

const Node = forwardRef(function Node({
  index,
  render,
  zIndex,
  isOrdered,
  shouldAnimate,
  mappedPosition,
  orderedPosition,
  handleToTop,
  handleUnmap,
  handleRender = _.noop,
  handleAnimate,
  ...rest
}, ref) {
  const draggableRef = useRef()
  const scaleTimelineRef = useRef()

  const innerRef = useMergedRef(ref)
  const [useMappedPosition, setUseMappedPosition] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isOrdering, setIsOrdering] = useState(true)

  const [hasAnimated, setHasAnimated] = useState(false)
  const [childRendered, setChildRendered] = useState(false)

  const containerId = useMemo(() => `node-${_.uniqueId()}`, [])
  const id = `#${containerId}`

  useEffect(() => setUseMappedPosition(true), [mappedPosition])

  useEffect(() => {
    if (isOrdered) setIsOrdering(true)
  }, [isOrdered])

  useGSAP(
    () => {
      if (!childRendered) return

      const animation = gsap
        .timeline()
        .to(id,
          {
            opacity: 1,
            duration: shouldAnimate ? 0.25 : 0,
            ease: 'back.out(2)',
            delay: shouldAnimate ? _.random(0.25, 2, true) : 0,
            // onComplete: () => handleToTop(index) // TODO
            onComplete: handleAnimate
          })

      if (shouldAnimate) {
        animation.fromTo(id,
          { scale: _.random(1.25, 2.25, true) },
          {
            scale: 1,
            duration: _.random(0.3, 0.5, true),
            ease: 'back.out(2)',
            onComplete: () => setHasAnimated(true),
            delay: -0.25
          })
      } else setHasAnimated(true)
    },
    {
      scope: innerRef,
      dependencies: [childRendered]
    }
  )


  useGSAP(
    () => {
      if (!childRendered || !hasAnimated) return
      const timeline = (scaleTimelineRef.current ??= gsap.timeline())
      if (isHovering) timeline.clear()
      timeline.to(id, {
        scale: isHovering ? 1.225 : 1,
        duration: TIMINGS.NODE_SCALE / 1000,
        ease: 'power1.inOut'
      })
    },
    {
      scope: innerRef,
      dependencies: [childRendered, isHovering]
    }
  )

  const onClick = () => {
    if (isOrdered) return
    handleToTop(index)
    setUseMappedPosition(false)
  }

  const onHover = isHovering => {
    if (!hasAnimated || isOrdered) return
    setIsHovering(isHovering)
    setIsOrdering(false)
  }

  const onUnmap = () => handleUnmap(index, draggableRef.current.state)

  const onCollapse = () => {
    const { y } = draggableRef.current.state
    const newY = getPx(SIZES.PAGE_MARGIN)
    if (-y >= SIZES.getTextContainerSize().h - newY * 2) {
      draggableRef.current.state.y = newY
      onUnmap()
    }
  }

  return (
    <Draggable
      defaultPosition={mappedPosition}
      position={orderedPosition || (useMappedPosition ? mappedPosition : undefined)}
      ref={draggableRef}
      disabled={isOrdered || isOrdering}
      onMouseDown={onClick}
      onStop={onUnmap}>
      <InnerContainer
        ref={innerRef}
        style={{
          zIndex,
          transition: validateString(isOrdered || isOrdering, `transform ${TIMINGS.ORDER}ms ease-in-out`),
          cursor: isOrdered ? 'initial' : 'move'
        }}>
        {render({
          ...rest,
          index,
          id: containerId,
          onMouseOver: () => onHover(true),
          onMouseOut: () => onHover(false),
          onHover,
          onCollapse,
          onRender: (...props) => {
            setChildRendered(true)
            handleRender(...props)
          }
        })}
      </InnerContainer>
    </Draggable >
  )
})

const InnerContainer = styled.div`
 ${mixins.draggable}
  * {
    pointer-events: none;
  }

  > * {
    opacity: 0;
  }
`

export default Node