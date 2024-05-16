import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES } from '../../../constants/stylesConstants'
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
        isHovering &&
        footnote &&
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
  background-color: white;
  left: ${extractStyle('$x')}px;
  top: ${extractStyle('$y')}px;
  max-width: ${remify(400)};
  padding: ${remify(10)};
  color: ${COLORS.BLUE};
  border: 1px ${COLORS.BLUE} solid;
  font-family: ${FONT_FAMILIES.APERCU};
  font-size: ${FONT_SIZES.MEDIUM};
  line-height: ${FONT_SIZES.LEADING_S};
  ${mixins.highZIndex(2)}
`

export default Citation