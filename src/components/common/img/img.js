import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import { conditionalStyle, extractStyle, toggleStyle, } from '../../../utils/styleUtils'
import { COLORS, SIZES, TIMINGS } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import Figure from './figure'
import { getOrderedData } from '../../../utils/sizeUtils'
import { useHover, useWindowSize } from '@uidotdev/usehooks'
import usePrevious from '../../../hooks/usePrevious'

const maxSize = SIZES.getImgMaxSize()

const Img = ({ index, isOrdered, zIndex, mappedPosition, imgNum, imgLink, handleClick, handleDrag }) => {
  const draggableRef = useRef()
  const [forcePosition, setForcePosition] = useState(true)

  const [isOrdering, setIsOrdering] = useState(false)
  const prevIsOrdered = usePrevious(isOrdered)

  const [scaleRef, isHovering] = useHover()
  const prevIsHovering = usePrevious(isHovering)
  const [shouldScale, setShouldScale] = useState(false)
  const [isScaling, setIsScaling] = useState(false)

  const [orderedPosition, setOrderedPosition] = useState()

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

  const { width } = useWindowSize()

  useEffect(() => {
    if (!isOrdered) return setOrderedPosition()

    const { colCount, rowHeight, gap, leftMargin, topMargin } = getOrderedData()
    setOrderedPosition({
      x: index % colCount * (maxSize + gap) + leftMargin,
      y: Math.floor(index / colCount) * (rowHeight + gap) + topMargin
    })
  }, [isOrdered, index, width])

  const onClick = () => {
    if (isOrdered) return
    handleClick(index)
    setForcePosition(false)
  }

  useEffect(() => setForcePosition(true), [mappedPosition])

  return (
    <Draggable
      defaultPosition={mappedPosition}
      position={orderedPosition || (forcePosition ? mappedPosition : undefined)}
      ref={draggableRef}
      disabled={isOrdered || isOrdering}
      onMouseDown={onClick}
      onStop={() => handleDrag(index, draggableRef.current.state)}>
      <InnerContainer
        onTransitionEnd={() => setIsOrdering(false)}
        $zIndex={zIndex}
        $isOrdered={isOrdered}
        $transition={isOrdering}>
        <ScaleFigure
          ref={scaleRef}
          backgroundColor={COLORS.BROWN}
          src={imgLink}
          maxSize={SIZES.IMG_MAX_SIZE}
          imgNum={imgNum}
          onTransitionEnd={() => setIsScaling(false)}
          $shouldScale={shouldScale && !isOrdered} />
      </InnerContainer>
    </Draggable >
  )
}

const InnerContainer = styled.div`
 ${mixins.draggable}
  z-index: ${extractStyle('$zIndex')};
  transition: ${conditionalStyle('$transition', `transform ${TIMINGS.ORDER}ms ease-in-out`)};
  cursor: ${toggleStyle('$isOrdered', 'initial', 'move')};

  * {
    pointer-events: none;
  }
`

const ScaleFigure = styled(Figure)`
  transform: scale(${toggleStyle('$shouldScale', 1.25, 1)});
  transition: transform 200ms ease-in-out;
`

export default Img