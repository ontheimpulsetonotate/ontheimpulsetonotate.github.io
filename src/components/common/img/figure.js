import _ from 'lodash'
import { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import FilteredImg from './filteredImg'


const Figure = forwardRef(function Figure({
  imgNum,
  style,
  src,
  backgroundColor,
  maxSize,
  width,
  height,
  bracketNumbers,
  ...rest
}, ref) {
  const [isLoaded, setIsLoaded] = useState(false)
  let imgNotation = imgNum.map(num => _.padStart(num, 3, '0')).join('—')
  if (bracketNumbers) imgNotation = `[${imgNotation}]`

  return (
    <ImgContainer
      {...rest}
      ref={ref}
      style={{
        opacity: isLoaded ? undefined : 0,
        ...style,
      }}>
      <FilteredImg
        src={src}
        backgroundColor={backgroundColor}
        maxSize={maxSize}
        width={width}
        height={height}
        handleLoad={() => setIsLoaded(true)} />
      <figcaption><p>{imgNotation}</p></figcaption>
    </ImgContainer>
  )
})

const ImgContainer = styled.figure`
  > figcaption > p {
    font-size: ${FONT_SIZES.SMALL};
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: 500;
    margin-top: ${SIZES.FIGURE_MARGIN_TOP};
  }
`

export default Figure