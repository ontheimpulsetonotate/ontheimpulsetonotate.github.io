import styled from 'styled-components'
import _ from 'lodash'
import { extractStyle, remify } from '../../../utils/styleUtils'
import { FONT_FAMILIES, FONT_SIZES } from '../../../constants/stylesConstants'
import FilteredImg from './filteredImg'
import { forwardRef, useState } from 'react'


const Figure = forwardRef(({ imgNum, src, backgroundColor, maxSize, ...rest }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <ImgContainer
      {...rest}
      ref={ref}
      $opacity={isLoaded ? 1 : 0}>
      <FilteredImg
        src={src}
        backgroundColor={backgroundColor}
        maxSize={maxSize}
        handleLoad={() => setIsLoaded(true)} />
      <figcaption><p>REF {imgNum.map(num => _.padStart(num, 3, '0')).join('—')}</p></figcaption>
    </ImgContainer>
  )
})

const ImgContainer = styled.figure`
  opacity: ${extractStyle('$opacity')};

  > figcaption > p {
    font-size: ${FONT_SIZES.SMALL};
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: 500;
    margin-top: ${remify(8)};
  }
`

export default Figure