import { useHover, useMouse } from '@uidotdev/usehooks'
import parse from 'html-react-parser'
import { useMemo } from 'react'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'

const Citation = ({ children, footnote, imgRef }) => {
  const [hoverRef, isHovering] = useHover()
  const [mouse] = useMouse()

  const getMouseQuadrant = () => [mouse.x <= window.innerWidth / 2, mouse.y <= window.innerHeight / 2]
  const getPosition = isX => {
    const [isLeft, isTop] = [mouse.x <= window.innerWidth / 2, mouse.y <= window.innerHeight / 2]
    // return `
    //   calc(
    //     ${isX ? mouse.x : mouse.y}px -
    //     ${isX ? (isLeft ? '25em' : 0) : }
    //   +
    //   ${isX ? (isLeft ? -1 : 1) : (isTop ? -1 : 1)} *
    //    ${SIZES.CITATION_OFFSET})
    // `
    return `calc(${isX ? mouse.x : mouse.y}px + ${SIZES.CITATION_OFFSET})`
  }

  // const isLeft = useMemo(() => mouse.x <= window.innerWidth / 2, [mouse.x])
  // const isTop = useMemo(() => mouse.y <= window.innerHeight / 2, [mouse.y])
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
            left: isLeft ? undefined : `calc(${mouse.x}px + ${SIZES.CITATION_OFFSET})`,
            right: !isLeft ? undefined : `calc(100vw - ${mouse.x}px + ${SIZES.CITATION_OFFSET})`,
            top: !isTop ? undefined : `calc(${mouse.y}px + ${SIZES.CITATION_OFFSET})`,
            bottom: isTop ? undefined : `calc(100vh - ${mouse.y}px + ${SIZES.CITATION_OFFSET})`,
            width: imgRef?.current ?
              imgRef?.current?.getBoundingClientRect().width :
              '25em' // TODO
          }}
          $isImg={!!imgRef}>
          {typeof footnote === 'string' ? parse(footnote) : footnote}
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
  ${({ $isImg }) => mixins
    .chain()
    .highZIndex(2)
    .border(1, { isBottom: false, color: $isImg ? COLORS.BROWN : COLORS.BLUE })()}
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