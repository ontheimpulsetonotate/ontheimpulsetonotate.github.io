import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import { COLORS, FONT_SIZES, SIZES, TIMINGS } from '../../constants/stylesConstants'
import useImagesLoaded from '../../hooks/useImagesLoaded'
import parserServices from '../../services/parserServices'
import { validateString } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { getPx, vh } from '../../utils/styleUtils'
import Figure from '../common/img/figure'
import TextHeader from '../common/text/textHeader'


const MixedViewSection = ({
  index,
  text,
  sectionTitle,
  imgData,
  containerY,
  footnotes,
  isLeft
}) => {
  const containerRef = useRef()
  const [showImg, setShowImg] = useState(false)
  const imgSrcs = useMemo(() => imgData.map(({ imgLink }) => imgLink), [imgData])

  const { loaded } = useImagesLoaded(...imgSrcs)

  useEffect(() => {
    const { top } = containerRef.current.getBoundingClientRect()
    const headerTop = top + getPx(SIZES.MIXED_VIEW_PADDING_TOP)
    if (headerTop <= vh(40)) setShowImg(true)
    else setShowImg(false)
  }, [containerY])

  const imgs = useMemo(() =>
    imgData?.map(({ imgLink, imgNum }, i) =>
      <Figure
        key={i}
        backgroundColor={COLORS.BROWN}
        src={imgLink}
        maxSize={SIZES.MIXED_VIEW_FIGURUE_SIZE}
        imgNum={imgNum} />
    ), [imgData])

  const renderImgContainer = useCallback(isLeftContainer => (
    <ImgContainer
      style={{
        opacity: showImg && loaded ? 1 : 0,
        paddingLeft: validateString(!isLeft, SIZES.MIXED_VIEW_FIGURE_MARGIN),
        paddingRight: validateString(isLeft, SIZES.MIXED_VIEW_FIGURE_MARGIN),
      }}
      $isLeft={isLeft} >
      {(isLeftContainer ? isLeft : !isLeft) && imgs}
    </ImgContainer>
  ), [isLeft, loaded, showImg, imgs])

  return (
    <SectionContainer id={`${FRAGMENT_ID_PREFIX}${index + 1}`} ref={containerRef}>
      {renderImgContainer(true)}
      <TextContainer>
        <TextHeader>{sectionTitle}</TextHeader>
        {parserServices.parseTextView(text, {
          footnotes,
          parseCitation: true,
        })}
      </TextContainer>
      {renderImgContainer(false)}
    </SectionContainer>
  )
}


const ImgContainer = styled.div`
  ${({ $isLeft }) => {
    const flex = `flex-${$isLeft ? 'end' : 'start'}`
    return mixins.flex(flex, 'flex-start')
  }}

  transition: opacity ${TIMINGS.MIXED_FIGURE_OPACITY}ms ease-in-out;
  width: 100%;
  height: 0;
  box-sizing: border-box;
  flex-direction: column;

  padding-top: calc(
    ${SIZES.MIXED_VIEW_PADDING_TOP} + ${FONT_SIZES.LEADING_M} + ${SIZES.ELEM_MARGIN}
  );

  > figure:not(:first-child) {
    margin-top: ${SIZES.MIXED_VIEW_FIGURE_MARGIN};
  }
`

const TextContainer = styled.div`
  ${mixins.flex('initial', 'flex-start')}
  background-color: ${COLORS.LIGHT_BEIGE};
  padding: ${SIZES.MIXED_VIEW_SECTION_PADDING_TOP} ${SIZES.MIXED_VIEW_TEXT_PADDING} 0; // TODO
  // padding-top: ${SIZES.MIXED_VIEW_SECTION_PADDING_TOP};
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;

  p {
    font-size: ${FONT_SIZES.LARGE};
    ${mixins.paragraphSpacing(FONT_SIZES.LEADING_DL)}
  }
`


const SectionContainer = styled.div`
  ${mixins.grid}
  width: 100%;

  ${TextContainer} {
    padding-top: ${SIZES.MIXED_VIEW_PADDING_TOP};
  }
`

export default MixedViewSection