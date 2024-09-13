import { useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../../constants/reactConstants'
import { COLORS, FONT_SIZES_RESPONSIVE, SIZES, SIZES_RESPONSIVE, TIMINGS } from '../../../constants/stylesConstants'
import useIsMobile from '../../../hooks/useIsMobile'
import apiServices from '../../../services/apiServices'
import parserServices from '../../../services/parserServices'
import { validateString } from '../../../utils/commonUtils'
import mixins from '../../../utils/mixins'
import { conditionalStyle } from '../../../utils/styleUtils'
import PopUpCitation from '../../common/text/popUpCitation'
import MixedViewImg from './mixedViewImg'


const MixedViewSection = ({
  index,
  nodeData,
  containerY,
  isLeft,
  beforeVisualEssay,
  afterVisualEssay,
}) => {
  const {
    text,
    sectionTitle,
    interviewIndex,
    pageNum,
    footnotes,
    projects,
    isInterview
  } = nodeData
  const containerRef = useRef()
  const isMobile = useIsMobile()
  const imgs = useMemo(() =>
    nodeData.getImgNodes(apiServices.mainData).map((imgNodes, i) =>
      <MixedViewImg
        key={i}
        nodeData={imgNodes}
        containerY={containerY} />
    ), [nodeData, containerY])
  const title = `${sectionTitle}, P. ${pageNum.join('-')}`.toLocaleUpperCase()
  const [citation, setCitation] = useState()

  const imgMargin = SIZES.MIXED_VIEW_FIGURE_MARGIN.css
  const ImgContainer = isMobile ? MobileImgContainer : DesktopImgContainer
  const TextContainer = isMobile ? MobileTextContainer : DesktopTextContainer
  const SectionContainer = isMobile ? MobileSectionContainer : DesktopSectionContainer

  const renderImgContainer = useCallback(isLeftContainer => (
    <ImgContainer
      style={{
        paddingLeft: validateString(!isLeft, imgMargin),
        paddingRight: validateString(isLeft, imgMargin),
      }}
      $isLeft={isLeft} >
      {(isLeftContainer ? isLeft : !isLeft) && imgs}
    </ImgContainer>
  ), [isLeft, imgs])

  const handleHover = citation => setCitation(citation)

  return (
    <SectionContainer
      $isMobile={isMobile}
      $isInterview={isInterview}
      $isFirstInterview={!interviewIndex}
      $beforeVisualEssay={beforeVisualEssay}
      $afterVisualEssay={afterVisualEssay}
      id={index ? `${FRAGMENT_ID_PREFIX}${index}` : undefined}
      ref={containerRef}>
      {!isMobile && renderImgContainer(true)}
      <TextContainer $isMobile={isMobile}>
        {parserServices.parseTextView(text, {
          title,
          footnotes,
          projects,
          parseCitation: true,
          onHover: handleHover
        })}

      </TextContainer>
      <PopUpCitation {...citation} />
      {!isMobile && renderImgContainer(false)}
      {isMobile &&
        <ImgContainer>
          {imgs}
        </ImgContainer>}
    </SectionContainer>
  )
}

const BaseImgContainer = styled.div`
 width: 100%;
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
`

const DesktopImgContainer = styled(BaseImgContainer)`
  ${({ $isLeft }) => {
    const flex = `flex-${$isLeft ? 'end' : 'start'}`
    return mixins.flex(flex, 'flex-start')
  }}

  height: 0;

  > span:not(:first-child) {
    margin-top: ${SIZES.ELEM_MARGIN_DESKTOP.css};
  }

 figure {
    transition: opacity ${TIMINGS.MIXED_FIGURE_OPACITY}ms ease-in-out;
    &:not(:first-child) {
      margin-top: ${SIZES.MIXED_VIEW_FIGURE_MARGIN.css};
    }
  }
`

const MobileImgContainer = styled(BaseImgContainer)`
  background-color: ${COLORS.LIGHT_BEIGE};
  padding: ${SIZES.PAGE_MARGIN_MOBILE.css} ${SIZES.PAGE_MARGIN_MOBILE.css} 0;
  box-sizing: border-box;

  > span {
    width: 100%;
    &:not(:first-child) {
      margin-top: ${SIZES.PAGE_MARGIN_MOBILE.css};
    }
  }
`

const getDesktopPadding = ({ $isInterview, $isFirstInterview } = {}) =>
  !$isInterview ?
    SIZES.MIXED_VIEW_PADDING_TOP.css :
    SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP.mult($isFirstInterview ? 2.5 : 1).css
const getMobilePadding = ({ $isInterview }) =>
  !$isInterview ?
    SIZES.MIXED_VIEW_PADDING_TOP_MOBILE.css :
    SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP_MOBILE.css

const BaseTextContainer = styled.div`
  background-color: ${COLORS.LIGHT_BEIGE};
  box-sizing: border-box;
`

const DesktopTextContainer = styled(BaseTextContainer)`
  ${mixins
    .chain()
    .flex('initial', 'flex-start')
    .dynamicSizes({
      width: SIZES_RESPONSIVE.MIXED_VIEW_SECTION_WIDTH
    })}

  height: 100%;
  padding-left: ${SIZES.MIXED_VIEW_TEXT_PADDING.css};
  padding-right: ${SIZES.MIXED_VIEW_TEXT_PADDING.css};
  flex-direction: column;
  flex: none;

  > p {
    ${mixins
    .chain()
    .dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.LARGE },)
    .paragraphSpacing(FONT_SIZES_RESPONSIVE.LEADING_DL)}
    }
`

const MobileTextContainer = styled(BaseTextContainer)`
  padding: 0 ${SIZES.PAGE_MARGIN_MOBILE.css};
  width: 100%;

  > p {
    ${mixins
    .chain()
    .dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.MOBILE_REGULAR }, true)
    .paragraphSpacing(FONT_SIZES_RESPONSIVE.MOBILE_LEADING, true)}
  }
`

const BaseSectionContainer = styled.div`
  width: 100%;
  border-top: ${conditionalStyle('$afterVisualEssay', `1px solid ${COLORS.BROWN}`)};
  border-bottom: ${conditionalStyle('$beforeVisualEssay', `1px solid ${COLORS.BROWN}`)};
  ${BaseTextContainer} {
    &, * {
      color: ${conditionalStyle('$isInterview', COLORS.BLUE)};
    }
  }
`

const DesktopSectionContainer = styled(BaseSectionContainer)`
  display: flex;

  &:first-child {
    ${BaseTextContainer},
    ${BaseImgContainer} {
      padding-top: ${SIZES.MIXED_VIEW_FIRST_PADDING_TOP.css};
    }
  }

  &:not(:first-child) {
    ${BaseTextContainer},
    ${BaseImgContainer} {
      padding-top: ${getDesktopPadding};
    }
  }

  ${BaseTextContainer} {
    padding-bottom: ${({ $beforeVisualEssay }) =>
    $beforeVisualEssay ? getDesktopPadding() : undefined};
  }
`


const MobileSectionContainer = styled(BaseSectionContainer)`
  ${mixins.flex('center', 'initial')}
  flex-direction: column;
  background-color: ${COLORS.LIGHT_BEIGE};

  ${BaseTextContainer} {
    padding-top: ${SIZES.PAGE_MARGIN_TOP.css};
  }

  &:not(:last-child) {
    >:last-child {
      padding-bottom: calc(${getMobilePadding} - ${SIZES.PAGE_MARGIN_TOP.css});
    }
  }

  >:last-child {
    padding-bottom: ${({ $beforeVisualEssay, ...rest }) =>
    $beforeVisualEssay ?
      getMobilePadding({ ...rest }) :
      undefined};
  }

  > div {
    max-width: ${SIZES.PAGE_MAX_WIDTH.css};
  }
`

export default MixedViewSection