import { useClickAway } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../constants/stylesConstants'
import useIsMobile from '../../../hooks/useIsMobile'

import useWindowMouse from '../../../hooks/useWindowMouse'
import { addEventListener } from '../../../utils/reactUtils'
import PopUpCitation from './popUpCitation'


const Citation = ({ children, footnote, color, imgRef, fixedSize, onHover, style }) => {
  const [isHovering, setIsHovering] = useState(false)
  const mouse = useWindowMouse()
  const ref = useClickAway(() => setIsHovering(false))
  const isMobile = useIsMobile()
  const [touched, setIsTouched] = useState(false)


  useEffect(() => {
    if (!onHover) return
    onHover(
      !isHovering ? null :
        { children: footnote, color, imgRef, fixedSize })
  }, [!!footnote, color, imgRef, fixedSize, isHovering])

  useEffect(() => setIsHovering(isHovering), [isHovering])
  useEffect(() => addEventListener(window, 'scroll', () => {
    if (isMobile && touched) setIsHovering(false)
  }), [])
  useEffect(() => addEventListener(window, 'scrollend', () => {
    if (isMobile && touched) setIsHovering(false)
  }), [])

  return (
    <>
      <CitationSpan
        ref={ref}
        style={style}
        onTouchStart={() => setIsTouched(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}>
        {children}
      </CitationSpan>
      {isHovering &&
        !onHover &&
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