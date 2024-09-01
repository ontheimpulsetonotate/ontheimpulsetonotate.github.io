import { useHover, useMouse } from '@uidotdev/usehooks'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import parserServices from '../../../services/parserServices'
import { extractStyle, toggleStyle } from '../../../utils/styleUtils'

const Citation = ({ children, footnote, color, imgRef }) => {
  const [hoverRef, isHovering] = useHover()
  const [mouse] = useMouse()

  const isLeft = mouse.x <= window.innerWidth / 2
  const isTop = mouse.y <= window.innerHeight / 2

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
            left: !isLeft ? undefined : `calc(${mouse.x}px + ${SIZES.CITATION_OFFSET})`,
            right: isLeft ? undefined : `calc(100vw - ${mouse.x}px + ${SIZES.CITATION_OFFSET})`,
            top: !isTop ? undefined : `calc(${mouse.y}px + ${SIZES.CITATION_OFFSET})`,
            bottom: isTop ? undefined : `calc(100vh - ${mouse.y}px + ${SIZES.CITATION_OFFSET})`,
            width: imgRef?.current ?
              imgRef?.current?.getBoundingClientRect().width :
              '25em' // TODO
          }}
          $color={color}>
          {typeof footnote === 'string' ? parserServices.parse(footnote) : footnote}
        </PopUpCitation>
      }
    </>
  )
}

const CitationSpan = styled.span`
  color: ${COLORS.BLUE};
  height: fit-content;
  cursor: default;
`

const PopUpCitation = styled.span`
  ${mixins
    .chain()
    .highZIndex(2)
    .border(1, { isBottom: false })}
  border-color: ${extractStyle('$color')};
  position: fixed;
  display: block;
  background-color: white;
  max-width: ${SIZES.CITATION_MAX_WIDTH};
  padding: ${SIZES.CITATION_PADDING};

  &, * {
    color: ${extractStyle('$color')};
  }

  font-family: ${FONT_FAMILIES.APERCU};
  font-size: ${FONT_SIZES.SMALL};
  &, p {
    line-height: ${FONT_SIZES.LEADING_S};
  }
`

export default Citation