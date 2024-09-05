import { useCallback, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import { COLORS, FONT_SIZES, FONT_SIZES_RESPONSIVE, SIZES, TIMINGS } from '../../constants/stylesConstants'
import parserServices from '../../services/parserServices'
import { validateString } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { conditionalStyle } from '../../utils/styleUtils'
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
  const imgs = useMemo(() =>
    nodeData.getImgNodes().map((imgNodes, i) =>
      <MixedViewImg
        key={i}
        nodeData={imgNodes}
        containerY={containerY} />
    ), [nodeData, containerY])
  const title = `${sectionTitle}, P. ${pageNum.join('-')}`.toLocaleUpperCase()

  const renderImgContainer = useCallback(isLeftContainer => (
    <ImgContainer
      style={{
        paddingLeft: validateString(!isLeft, SIZES.MIXED_VIEW_FIGURE_MARGIN),
        paddingRight: validateString(isLeft, SIZES.MIXED_VIEW_FIGURE_MARGIN),
      }}
      $isLeft={isLeft} >
      {(isLeftContainer ? isLeft : !isLeft) && imgs}
    </ImgContainer>
  ), [isLeft, imgs])


  return (
    <SectionContainer
      $isInterview={isInterview}
      $isFirstInterview={!interviewIndex}
      $beforeVisualEssay={beforeVisualEssay}
      $afterVisualEssay={afterVisualEssay}
      id={index ? `${FRAGMENT_ID_PREFIX}${index}` : undefined}
      ref={containerRef}>
      {renderImgContainer(true)}
      <TextContainer>
        {parserServices.parseTextView(text, {
          title,
          footnotes,
          projects,
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

  width: 100%;
  height: 0;
  box-sizing: border-box;
  flex-direction: column;


 figure {
    transition: opacity ${TIMINGS.MIXED_FIGURE_OPACITY}ms ease-in-out;

    &:not(:first-child) {
      margin-top: ${SIZES.MIXED_VIEW_FIGURE_MARGIN};
    }
  }
`

const TextContainer = styled.div`
  ${mixins.flex('initial', 'flex-start')}
  background-color: ${COLORS.LIGHT_BEIGE};
  padding-left: ${SIZES.MIXED_VIEW_TEXT_PADDING};
  padding-right: ${SIZES.MIXED_VIEW_TEXT_PADDING};
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;

  p {
    ${mixins.chain()
    .dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.LARGE })
    .paragraphSpacing(FONT_SIZES_RESPONSIVE.LEADING_DL)}
  }
`

const getPadding = ({ $isInterview, $isFirstInterview }) =>
  !$isInterview ? SIZES.MIXED_VIEW_PADDING_TOP :
    ($isFirstInterview ?
      `calc(${SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP} * 2.5)` :
      SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP)

const SectionContainer = styled.div`
  ${mixins.grid}
  width: 100%;
  border-top: ${conditionalStyle('$afterVisualEssay', `1px solid ${COLORS.BROWN}`)};
  border-bottom: ${conditionalStyle('$beforeVisualEssay', `1px solid ${COLORS.BROWN}`)};

  ${TextContainer} {
    padding-top: ${getPadding};
    padding-bottom: ${({ $beforeVisualEssay, ...rest }) => $beforeVisualEssay ? getPadding({ ...rest }) : undefined};

    &, * {
      color: ${conditionalStyle('$isInterview', COLORS.BLUE)};
    }
  }

  ${ImgContainer} {
    padding-top: ${getPadding};
  }
`

export default MixedViewSection