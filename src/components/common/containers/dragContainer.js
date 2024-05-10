import styled from 'styled-components'
import mixins from '../../../utils/mixins'
import { useEffect, useRef, useState } from 'react'
import { quickArray } from '../../../utils/commonUtils'
import _ from 'lodash'
import FullContainer from './fullContainer'
import { SIZES } from '../../../constants/stylesConstants'
import { getPx } from '../../../utils/styleUtils'

const DragContainer = ({ contents, isOrdered, element: Element }) => {
  const [indices, setIndices] = useState(quickArray(contents.length))
  const handleClick = i => setIndices(prev => [..._.without(prev, i), i])
  const containerRef = useRef() // TODO: remove

  return (
    <StyledContainer ref={containerRef}>
      {contents.map((content, i) =>
        <Element
          {...content}
          key={i}
          index={i}
          isOrdered={isOrdered}
          zIndex={indices.indexOf(i) + 1}
          handleClick={handleClick} />
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled(FullContainer)`
  ${mixins.highZIndex(3)}
  pointer-events: none;

  div, figure {
    pointer-events: initial;
  }
`

export default DragContainer