import styled from 'styled-components'
import mixins from '../../../utils/mixins'
import { useEffect, useMemo, useState } from 'react'
import { UNMAPPED_BOUNDS, map, mapPoisson, quickArray } from '../../../utils/commonUtils'
import _ from 'lodash'
import FullContainer from './fullContainer'
import { extractStyle, toggleStyle, vh, vw } from '../../../utils/styleUtils'
import { getMainContainer, getOrderedData } from '../../../utils/sizeUtils'
import { FONT_SIZES, SIZES, TIMINGS } from '../../../constants/stylesConstants'
import { useWindowSize } from '@uidotdev/usehooks'


const Node = ({ contents, elemW, elemH, isOrdered, element: Element }) => {
  const [indices, setIndices] = useState(quickArray(contents.length))
  const handleClick = i => setIndices(prev => [..._.without(prev, i), i])
  const [scrollSize, setScrollSize] = useState()
  const { width, height } = useWindowSize()

  const defaultUnmappedPositions = useMemo(() => mapPoisson(
    contents.length,
    (vw() / vh()) / (elemW / elemH)
  ), [])

  const [unmappedPositions, setUnmappedPositions] = useState(defaultUnmappedPositions)

  const getPageBounds = () => {
    const { left, right, top, bottom } = getMainContainer()
    const MARGIN_PERCENTAGE = 0.8
    const halfElemW = elemW / 2
    const halfElemH = elemH / 2
    const marginX = halfElemW * MARGIN_PERCENTAGE
    const marginY = halfElemH * MARGIN_PERCENTAGE
    return {
      boundsX: [left + marginX - halfElemW, right - marginX - halfElemW],
      boundsY: [top + marginY - halfElemH, bottom - marginY - halfElemH]
    }
  }

  const convertCoors = ({ x, y }, isMap) => {
    const { boundsX, boundsY } = getPageBounds()
    const allBoundsX = isMap ? [UNMAPPED_BOUNDS, boundsX] : [boundsX, UNMAPPED_BOUNDS]
    const allBoundsY = isMap ? [UNMAPPED_BOUNDS, boundsY] : [boundsY, UNMAPPED_BOUNDS]
    return {
      x: map(x, ...allBoundsX.flat()),
      y: map(y, ...allBoundsY.flat()),
    }
  }

  const mappedPositions = useMemo(() =>
    unmappedPositions.map(({ x, y }) =>
      convertCoors({ x, y }, true)), [width, height, isOrdered]
  )

  useEffect(() => {
    if (!isOrdered) return
    const { topMargin, rowHeight, colCount, gap } = getOrderedData()
    const rowCount = Math.ceil(contents.length / colCount)
    setScrollSize(topMargin + rowHeight * rowCount + gap * rowCount)
  }, [width, isOrdered])

  const handleUnmap = (i, coors) =>
    setUnmappedPositions(prev => {
      const newPositions = [...prev]
      newPositions[i] = convertCoors(coors, false)
      return newPositions
    })

  return (
    <StyledContainer $isOrdered={isOrdered}>
      {contents.map((content, i) =>
        <Element
          {...content}
          key={i}
          index={i}
          isOrdered={isOrdered}
          mappedPosition={mappedPositions[i]}
          zIndex={indices.indexOf(i) + 1}
          handleClick={handleClick}
          handleDragEnd={handleUnmap} />
      )}
      <ScrollSizer $height={isOrdered ? `${scrollSize}px` : '100vh'} />
    </StyledContainer>
  )
}

const StyledContainer = styled(FullContainer)`
  ${({ $isOrdered }) => mixins.highZIndex($isOrdered ? 0 : 3)}
  pointer-events: none;
  overflow-y: ${toggleStyle('$isOrdered', 'scroll', 'hidden')};

  div, figure {
    pointer-events: initial;
  }
`

const marginTop = `calc(${SIZES.ORDERED_COL_TOP_PADDING} + ${SIZES.PAGE_MARGIN} + ${FONT_SIZES.REGULAR})`
const ScrollSizer = styled.div`
  width: 100vw;
  height: calc(${extractStyle('$height')} - ${marginTop});
  margin-top: ${marginTop};
  transition: height ${TIMINGS.ORDER}ms ease-in-out;
`

export default Node
