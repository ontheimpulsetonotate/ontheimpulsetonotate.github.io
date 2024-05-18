import styled from 'styled-components'
import { useState } from 'react'
import _ from 'lodash'

const FilteredImg = ({ backgroundColor, maxSize, width, height, handleLoad = _.noop, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const onLoad = () => {
    handleLoad()
    setIsLoaded(true)
  }
  return (
    <FilterImgContainer
      $backgroundColor={backgroundColor}
      $width={width}
      $height={height}
      $maxSize={maxSize}
      style={{
        backgroundColor,
        opacity: isLoaded ? 1 : 0,
      }}>
      <StyledImg
        alt=''
        {...rest}
        style={{
          width,
          height,
          maxWidth: maxSize,
          maxHeight: maxSize
        }}
        onLoad={onLoad} />
    </FilterImgContainer>
  )
}

export const FilterImgContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
`

const StyledImg = styled.img`
  object-fit: cover;
  filter: grayscale(100%);
  mix-blend-mode: screen;
`

export default FilteredImg