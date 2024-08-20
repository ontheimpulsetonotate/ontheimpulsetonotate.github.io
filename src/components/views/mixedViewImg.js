import parse from 'html-react-parser'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../constants/stylesConstants'
import useImagesLoaded from '../../hooks/useImagesLoaded'
import { vh } from '../../utils/styleUtils'
import Figure from '../common/img/figure'
import Citation from '../common/text/citation'

const MixedViewImg = ({ data, containerY }) => {
  const { imgLink, imgNum, artistFirstName, artistLastName, medium, workDetails, copyright } = data
  const imgRef = useRef()
  const [isShowing, setIsShowing] = useState(false)
  const { loaded } = useImagesLoaded(imgLink)

  useEffect(() => {
    const { top } = imgRef.current.getBoundingClientRect()
    if (top <= vh(60)) setIsShowing(true)
    else setIsShowing(false)
  }, [containerY])

  return (
    <Citation footnote={
      <Footnote>
        <h3>{artistLastName} {artistFirstName}</h3>
        <h3>{medium}</h3>
        <p><span>{parse(workDetails)}</span> <span>{parse(copyright)}</span></p>
      </Footnote>
    } imgRef={imgRef}>
      <Figure
        style={{
          opacity: isShowing && loaded ? 1 : 0,
        }}
        ref={imgRef}
        backgroundColor={COLORS.BROWN}
        src={imgLink}
        maxSize={SIZES.MIXED_VIEW_FIGURUE_SIZE}
        imgNum={imgNum}
        bracketNumbers />
    </Citation>
  )
}

const Footnote = styled.div`
  h3 {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-size: ${FONT_SIZES.SMALL};
  }

  p {
    padding-top: 1em;
    font-size: ${FONT_SIZES.SMALL};
    font-family: ${FONT_FAMILIES.APERCU};
  }
`

export default MixedViewImg