import _ from 'lodash'
import { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import useIsMobile from '../../../hooks/useIsMobile'
import { padNumber } from '../../../utils/commonUtils'
import { extract, styleIf } from '../../../utils/styleUtils'
import FilteredImg from './filteredImg'


const Figure = forwardRef(function Figure({
  nodeData,
  style,
  color,
  maxSize,
  maxWidth,
  maxHeight,
  width,
  height,
  bracketNumbers = false,
  noCaption = false,
  noFade = false,
  ...rest
}, ref) {
  const { imgNum, imgLink, interviewPrefix, isInterview } = nodeData
  const [isLoaded, setIsLoaded] = useState(false)
  let imgNotation = interviewPrefix ?
    `DIALOGUE ${interviewPrefix}${imgNum}` :
    imgNum.map(num => padNumber(num)).join('—')
  if (bracketNumbers) imgNotation = `[${imgNotation}]`

  const isMobile = useIsMobile()
  color ??= isInterview ? COLORS.BLUE : COLORS.BROWN
  return (
    <ImgContainer
      {...rest}
      ref={ref}
      style={{
        opacity: noFade ? 1 : isLoaded ? undefined : 0,
        ...style,
      }}
      $color={color}
      $isMobile={isMobile}>
      <FilteredImg
        src={imgLink}
        backgroundColor={color}
        maxWidth={maxWidth ?? maxSize}
        maxHeight={maxHeight ?? maxSize}
        width={width}
        height={height}
        handleLoad={() => setIsLoaded(true)} />
      <figcaption><p>{imgNotation}</p></figcaption>
    </ImgContainer>
  )
})

const ImgContainer = styled.figure`
  > figcaption > p {
    font-size: ${FONT_SIZES.SMALL.css};
    color: ${extract('$color')};
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: 500;
    margin-top: ${styleIf('$isMobile', SIZES.FIGURE_MARGIN_TOP_MOBILE.css, SIZES.FIGURE_MARGIN_TOP.css)};
  }
`

export default Figure