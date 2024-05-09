import styled from 'styled-components'
import { COLORS, FONT_FAMILIES } from '../../../constants/stylesConstants'
import { useEffect, useState } from 'react'
import { useHover, useMouse } from '@uidotdev/usehooks'
import { extractStyle, remify } from '../../../utils/styleUtils'
import parse from 'html-react-parser'
import mixins from '../../../utils/mixins'

const Citation = ({ children, footnote }) => {
  const [hoverRef, isHovering] = useHover()
  const [mouse] = useMouse()

  return (
    <>
      <CitationSpan ref={hoverRef}>
        {children}
      </CitationSpan>
      {
        isHovering && footnote &&
        <PopUpCitation
          $x={mouse.x + 20}
          $y={mouse.y + 20}>
          {parse(footnote)}
        </PopUpCitation>
      }
    </>
  )
}

const CitationSpan = styled.span`
  color: ${COLORS.BLUE};
  cursor: default;
`

const PopUpCitation = styled.span`
  position: fixed;
  display: block;
  background-color: ${COLORS.LIGHT_BEIGE};
  left: ${extractStyle('$x')}px;
  top: ${extractStyle('$y')}px;
  /* width: ${remify(200)}; */
  max-width: ${remify(400)};
  padding: ${remify(10)};
  color: ${COLORS.BLUE};
  border: 2px ${COLORS.BLUE} solid;
  font-family: ${FONT_FAMILIES.APERCU};
  ${mixins.highZIndex(2)}
`

export default Citation