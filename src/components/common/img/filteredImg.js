import styled from 'styled-components'
import { useState } from 'react'
import _ from 'lodash'
import mixins from '../../../utils/mixins'
import useIsMobile from '../../../hooks/useIsMobile'

const FilteredImg = ({
  backgroundColor,
  maxWidth,
  maxHeight,
  width,
  height,
  handleLoad = _.noop,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useIsMobile()

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
        $maxWidth={maxWidth}
        $maxHeight={maxHeight}
        $isMobile={isMobile}
        onLoad={onLoad} />
    </FilterImgContainer>
  )
}

export const FilterImgContainer = styled.div`
  display: flex;
`

const StyledImg = styled.img`
  object-fit: cover;

  mix-blend-mode: screen;
  ${({ $width, $height, $maxWidth, $maxHeight, $isMobile }) => mixins
    .dynamicSizes({
      width: $width,
      height: $height,
      maxWidth: $maxWidth,
      maxHeight: $maxHeight
    }, $isMobile)}
`

export default FilteredImg