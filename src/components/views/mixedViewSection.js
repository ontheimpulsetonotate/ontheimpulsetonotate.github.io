import styled from 'styled-components'
import parse, { domToReact } from 'html-react-parser'
import { COLORS, FONT_SIZES, SIZES } from '../../constants/stylesConstants'
import { getPx, remify, toggleStyle, vh } from '../../utils/styleUtils'
import TextHeader from '../common/text/textHeader'
import mixins from '../../utils/mixins'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Figure from '../common/img/figure'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import Citation from '../common/text/citation'
import useImagesLoaded from '../../hooks/useImagesLoaded'


const MixedViewSection = ({ index, text, sectionTitle, footnotes, imgData, containerY, isLeft }) => {
  const containerRef = useRef()
  const [showImg, setShowImg] = useState(false)
  const imgSrcs = useMemo(() => imgData.map(({ imgLink }) => imgLink), [imgData])

  const allLoaded = useImagesLoaded(...imgSrcs)

  useEffect(() => {
    const { top } = containerRef.current.getBoundingClientRect()
    const headerTop = top + getPx(SIZES.MIXED_VIEW_SECTION_PADDING_TOP)
    if (headerTop <= vh(40)) setShowImg(true)
    else setShowImg(false)
  }, [containerY])


  // TODO: merge
  const getParsed = () => {
    let footnoteIndex = 0
    let html = `<p>${text}</p>`
      .replace(/<br>$/, '')
      .replaceAll(/<br>/g, '</p><p>')
    const options = {
      replace: domNode => {
        if (domNode.tagName === 'span') {
          const { attribs, children } = domNode
          attribs.style += 'text-decoration: none; color:inherit;'
          if (attribs.style.match('text-decoration:underline')) {
            const text = children[0]?.data
            if (text)
              return <Citation footnote={footnotes[footnoteIndex++]}>{text.replace(/ \[[0-9]+\]$/, '')}</Citation>
          }
        }
        if (domNode.tagName === 'a')
          return <>{domToReact(domNode.children)}</>
      }
    }

    return parse(
      html.replaceAll(/&lt;br&gt;/g, ''),
      options
    )
  }

  const imgs = useMemo(() =>
    imgData?.map(({ imgLink, imgNum }, i) =>
      <Figure key={i} backgroundColor={COLORS.BROWN} src={imgLink} maxSize={SIZES.IMG_MAX_SIZE} imgNum={imgNum} />
    ), [imgData])

  const renderImgContainer = useCallback(isLeftContainer => (
    <ImgContainer $isLeft={isLeft} $showImg={showImg && allLoaded}>
      {(isLeftContainer ? isLeft : !isLeft) && imgs}
    </ImgContainer>
  ), [isLeft, allLoaded, showImg, imgs])

  return (
    <SectionContainer id={`${FRAGMENT_ID_PREFIX}${index + 1}`} ref={containerRef}>
      {renderImgContainer(true)}
      <TextContainer>
        <TextHeader>{sectionTitle}</TextHeader>
        {getParsed()}
      </TextContainer>
      {renderImgContainer(false)}
    </SectionContainer>
  )
}

const padding = remify(15)
const ImgContainer = styled.div`
  ${({ $isLeft }) => {
    const flex = `flex-${$isLeft ? 'end' : 'start'}`
    return mixins.flex(flex, 'flex-start')
  }}

  opacity: ${toggleStyle('$showImg', 1, 0)};
  transition: opacity 100ms ease-in-out;
  width: 100%;
  height: 0;
  box-sizing: border-box;
  padding-right: ${toggleStyle('$isLeft', padding, '')};
  padding-left: ${toggleStyle('$isLeft', '', padding)};
  flex-direction: column;

  padding-top: calc(
    ${SIZES.MIXED_VIEW_SECTION_PADDING_TOP} + ${FONT_SIZES.LEADING_M} + ${SIZES.ELEM_MARGIN}
  ); // TODO

  > figure:not(:first-child) {
    margin-top: ${padding};
  }
`

const PADDING_SIDE = remify(40)
const TextContainer = styled.div`
  ${mixins.flex('initial', 'flex-start')}
  background-color: ${COLORS.LIGHT_BEIGE};
  padding: ${remify(120)} ${PADDING_SIDE} 0;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;

  p {
    font-size: ${FONT_SIZES.MIXED};
    ${mixins.paragraphSpacing(FONT_SIZES.LEADING_DL)}
  }
`


const SectionContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: calc((92.5vw - 500px) / 2) 500px 1fr; // TODO

  ${TextContainer} {
    padding-top: ${SIZES.MIXED_VIEW_SECTION_PADDING_TOP};
  }
`

export default MixedViewSection