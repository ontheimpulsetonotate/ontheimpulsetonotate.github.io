import styled from 'styled-components'
import mixins from '../../../utils/mixins'
import { useEffect, useRef, useState } from 'react'
import { quickArray } from '../../../utils/commonUtils'
import _ from 'lodash'
import FullContainer from './fullContainer'
import { SIZES } from '../../../constants/stylesConstants'
import { getPx } from '../../../utils/styleUtils'
import { getOrderedData } from '../../../utils/sizeUtils'

const DragContainer = ({ contents, isOrdered, element: Element }) => {
  const [indices, setIndices] = useState(quickArray(contents.length))
  const handleClick = i => setIndices(prev => [..._.without(prev, i), i])
  const [scrollSize, setScrollSize] = useState()

  useEffect(() => {
    if (!isOrdered) return

    const { topMargin, rowHeight, colCount, gap } = getOrderedData()
    const rowCount = Math.ceil(contents.length / colCount)
    setScrollSize(topMargin + rowHeight * rowCount + gap * rowCount)
  }, [isOrdered])

  return (
    <StyledContainer $isOrdered={isOrdered}>
      {contents.map((content, i) =>
        <Element
          {...content}
          key={i}
          index={i}
          isOrdered={isOrdered}
          zIndex={indices.indexOf(i) + 1}
          handleClick={handleClick} />
      )}
      {isOrdered && <ScrollSizer style={{ height: `${scrollSize}px` }} />}
    </StyledContainer>
  )
}

const StyledContainer = styled(FullContainer)`
  ${mixins.highZIndex(3)}
  pointer-events: none;
  overflow-y: scroll;

  div, figure {
    pointer-events: initial;
  }
`

const ScrollSizer = styled.div`
  width: 100vw;
  pointer-events: none !important; // TODO
`

export default DragContainer