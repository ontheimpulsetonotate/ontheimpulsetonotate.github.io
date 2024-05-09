import styled from 'styled-components'
import mixins from '../../../utils/mixins'
import { useState } from 'react'
import { quickArray } from '../../../utils/commonUtils'
import _ from 'lodash'
import FullContainer from './fullContainer'

const DragContainer = ({ contents, element: Element }) => {
  const [indices, setIndices] = useState(quickArray(contents.length))
  const handleClick = i => setIndices(prev => [..._.without(prev, i), i])

  return (
    <StyledContainer>
      {contents.map((content, i) =>
        <Element
          {...content}
          key={i}
          index={i}
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