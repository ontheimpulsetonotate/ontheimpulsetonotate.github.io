import { useHover, useMouse } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../constants/stylesConstants'
import PopUpCitation from './popUpCitation'


const Citation = ({ children, footnote, color, imgRef, fixedSize, onHover }) => {
  const [hoverRef, isHovering] = useHover()
  const [mouse] = useMouse()

  useEffect(() => {
    if (!onHover) return
    onHover(
      !isHovering ? null :
        { children: footnote, color, imgRef, fixedSize })
  }, [footnote, color, imgRef, fixedSize, isHovering])

  return (
    <>
      <CitationSpan ref={hoverRef}>
        {children}
      </CitationSpan >
      {isHovering && !onHover &&
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