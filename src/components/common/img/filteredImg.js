import styled from 'styled-components'
import { extractStyle } from '../../../utils/styleUtils'
import { useState } from 'react'
import _ from 'lodash'

const FilteredImg = ({ backgroundColor, maxSize, handleLoad = _.noop, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const onLoad = () => {
    handleLoad()
    setIsLoaded(true)
  }
  return (
    <FilterImgContainer
      $backgroundColor={backgroundColor}
      $maxSize={maxSize}
      $opacity={isLoaded ? 1 : 0}>
      <StyledImg alt='' {...rest} onLoad={onLoad} />
    </FilterImgContainer>
  )
}

export const FilterImgContainer = styled.div`
  display: flex;
  background-color: ${extractStyle('$backgroundColor')};
  width: fit-content;
  height: fit-content;
  opacity: ${extractStyle('$opacity')};

  img {
    max-width: ${extractStyle('$maxSize')};
    max-height: ${extractStyle('$maxSize')};
  }
`

const StyledImg = styled.img`
  object-fit: cover;
  filter: grayscale(100%);
  mix-blend-mode: screen;
`

export default FilteredImg