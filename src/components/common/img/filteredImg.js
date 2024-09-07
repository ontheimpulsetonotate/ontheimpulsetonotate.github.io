import styled from 'styled-components'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import mixins from '../../../utils/mixins'
import { extractStyle } from '../../../utils/styleUtils'

const FilteredImg = ({ backgroundColor, maxSize, width, height, handleLoad = _.noop, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // useEffect(() => console.log(width), [])

  const onLoad = () => {
    handleLoad()
    setIsLoaded(true)
  }
  return (
    <FilterImgContainer
      style={{
        backgroundColor,
        opacity: isLoaded ? 1 : 0,
      }}>
      <StyledImg
        alt=''
        {...rest}
        $width={width}
        $height={height}
        $maxSize={maxSize}
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
  ${({ $width, $height, $maxSize }) => mixins
    .dynamicSizes({
      width: $width,
      height: $height,
      maxWidth: $maxSize,
      maxHeight: $maxSize
    })}
`

export default FilteredImg