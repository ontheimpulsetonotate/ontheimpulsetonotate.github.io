import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import { extractStyle, getPx, } from '../../../utils/styleUtils'
import { COLORS, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import { randLocation } from '../../../utils/commonUtils'
import Figure from './figure'
import { getMainContainer, getOrderedData } from '../../../utils/sizeUtils'


const Img = ({ index, isOrdered, zIndex, imgNum, imgLink, handleClick }) => {
  const draggableRef = useRef()
  const maxSize = parseFloat(SIZES.IMG_MAX_SIZE)
  const halfSize = maxSize / 2
  const defaultPosition = useMemo(() =>
    randLocation(getMainContainer(), {
      x: maxSize,
      y: maxSize
    }),
    []
  )

  const [position, setPosition] = useState()
  const prevPositionRef = useRef()

  useEffect(() => {
    if (!isOrdered) return
    const { x, y } = draggableRef.current.state
    prevPositionRef.current = { x, y }
  }, [isOrdered])

  useEffect(() => {
    if (!isOrdered)
      return setPosition(prevPositionRef.current)

    const { colCount, rowHeight, gap, leftMargin, topMargin } = getOrderedData()
    setPosition({
      x: index % colCount * (maxSize + gap) + leftMargin,
      y: Math.floor(index / colCount) * (rowHeight + gap) + topMargin
    })
  }, [isOrdered, index])

  // TODO on window resize

  return (
    <Draggable
      defaultPosition={{
        x: defaultPosition.x - halfSize,
        y: defaultPosition.y - halfSize
      }}
      ref={draggableRef}
      disabled={isOrdered}
      position={position}
      onMouseDown={() => handleClick(index)}>
      <DraggableFigure backgroundColor={COLORS.BROWN} src={imgLink} maxSize={SIZES.IMG_MAX_SIZE} imgNum={imgNum} $zIndex={zIndex} />
    </Draggable >
  )
}

const DraggableFigure = styled(Figure)`
  ${mixins.draggable}
  z-index: ${extractStyle('$zIndex')};

  div {
    pointer-events: none;
  }
`



export default Img