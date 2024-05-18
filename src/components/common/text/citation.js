import { useHover, useMouse } from '@uidotdev/usehooks'
import parse from 'html-react-parser'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'

const Citation = ({ children, footnote }) => {
  const [hoverRef, isHovering] = useHover()
  const [mouse] = useMouse()

  const getPosition = isX => `calc(${isX ? mouse.x : mouse.y}px + ${SIZES.CITATION_OFFSET})`
  return (
    <>
      <CitationSpan ref={hoverRef}>
        {children}
      </CitationSpan>
      {
        isHovering &&
        footnote &&
        <PopUpCitation
          style={{
            left: getPosition(true),
            top: getPosition(false),
          }}>
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
  ${mixins
    .chain()
    .highZIndex(2)
    .border(1, { isBottom: false, color: COLORS.BLUE })}
  position: fixed;
  display: block;
  background-color: white;
  max-width: ${SIZES.CITATION_MAX_WIDTH};
  padding: ${SIZES.CITATION_PADDING};
  color: ${COLORS.BLUE};
  font-family: ${FONT_FAMILIES.APERCU};
  font-size: ${FONT_SIZES.MEDIUM};
  line-height: ${FONT_SIZES.LEADING_S};
`

export default Citation