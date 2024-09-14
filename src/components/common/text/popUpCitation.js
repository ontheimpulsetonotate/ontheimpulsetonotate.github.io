import { useHover, useMouse } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES_RESPONSIVE, SIZES, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import useIsMobile from '../../../hooks/useIsMobile'
import parserServices from '../../../services/parserServices'
import Size from '../../../utils/helpers/size'
import mixins from '../../../utils/mixins'
import { extractStyle } from '../../../utils/styleUtils'
import useWindowMouse from '../../../hooks/useWindowMouse'


const PopUpCitation = ({
  mouse,
  children,
  color,
  imgRef,
  fixedSize,
}) => {
  const _mouse = useWindowMouse()
  if (!mouse || (!mouse.x && !mouse.y)) mouse = _mouse
  const isMobile = useIsMobile()

  const isLeft = mouse.x <= window.innerWidth / 2
  const isTop = mouse.y <= window.innerHeight / 2

  const bounds = imgRef?.current?.getBoundingClientRect()
  const offset = SIZES.CITATION_OFFSET
  const leftSideOnly = isLeft || isMobile

  if (!children) return
  return (
    children &&
    <StyledPopUpCitation
      style={{
        left: leftSideOnly &&
          (isMobile ?
            Math.max(
              SIZES.PAGE_MARGIN_MOBILE.value,
              Size.subFromFullWidth(SIZES.IMG_MAX_WIDTH)
                .div(2).add(SIZES.PAGE_MARGIN_MOBILE).value) :
            offset.add(new Size(mouse.x)).css),
        right: !leftSideOnly &&
          offset.sub(new Size(mouse.x)).add(new Size({ vw: 100 })).css,
        top: isTop && offset.add(new Size(mouse.y)).css,

        bottom: !isTop && offset.sub(new Size(mouse.y)).add(new Size({ vh: 100 })).css,
        width: isMobile ?
          Size.subFromFullWidth(SIZES.PAGE_MARGIN_MOBILE.mult(2))
            .sub(SIZES.CITATION_PADDING.mult(2)).css :
          fixedSize ? SIZES.CITATION_MAX_WIDTH.css : bounds?.width,
        maxWidth: isMobile ?
          SIZES.IMG_MAX_WIDTH
            .sub(SIZES.CITATION_PADDING.mult(2))
            .sub(SIZES.PAGE_MARGIN_MOBILE.mult(2)).css :
          SIZES.CITATION_MAX_WIDTH.css,
        marginTop: 0
      }}
      $isMobile={isMobile}
      $color={color}>
      {typeof children === 'string' ? parserServices.parse(children) : children}
    </StyledPopUpCitation>
  )
}

const StyledPopUpCitation = styled.span`
  ${mixins
    .chain()
    .highZIndex(2)
    .border(1, { isBottom: false })
    .dynamicSizes({
      width: SIZES_RESPONSIVE.CITATION_WIDTH,
    })}
  border-color: ${extractStyle('$color')};
  position: fixed;
  background-color: white;
  padding: ${SIZES.CITATION_PADDING.css};
  font-family: ${FONT_FAMILIES.APERCU};

  &, * {
    color: ${extractStyle('$color')};
  }


  &, p {
    ${({ $isMobile }) => mixins.dynamicSizes({
      lineHeight: FONT_SIZES_RESPONSIVE.LEADING_XS,
      fontSize: FONT_SIZES_RESPONSIVE.SMALL
    }, $isMobile)}
  }
`

export default PopUpCitation