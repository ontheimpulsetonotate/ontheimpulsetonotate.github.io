import { useHover, useMouse, useWindowScroll } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import TruncateMarkup from 'react-truncate-markup'
import styled from 'styled-components'
import { COLORS } from '../../../constants/stylesConstants'
import PopUpCitation from './popUpCitation'


const Citation = ({ children, footnote, color, imgRef, fixedSize, onHover, style }) => {
  const [hoverRef, isHovering] = useHover()
  const [isShown, setIsShown] = useState(false)
  const [mouse] = useMouse()

  useEffect(() => {
    if (!onHover) return
    onHover(
      !isShown ? null :
        { children: footnote, color, imgRef, fixedSize })
  }, [!!footnote, color, imgRef, fixedSize, isHovering])


  useEffect(() => setIsShown(isHovering), [isHovering])


  return (
    <>
      <CitationSpan ref={hoverRef} style={style}>
        {children}
      </CitationSpan>
      {isShown && !onHover &&
        <PopUpCitation
          mouse={mouse}
          color={color}
          imgRef={imgRef}
          fixedSize={fixedSize}>
          {footnote}
        </PopUpCitation>}
    </>
  )
}

const CitationSpan = styled.span`
  color: ${COLORS.BLUE};
  height: fit-content;
  cursor: default;
`

export default Citation