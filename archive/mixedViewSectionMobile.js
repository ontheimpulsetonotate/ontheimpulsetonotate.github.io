import { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../../constants/reactConstants'
import { COLORS, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import apiServices from '../../../services/apiServices'
import parserServices from '../../../services/parserServices'

import mixins from '../../../utils/mixins'
import { conditionalStyle } from '../../../utils/styleUtils'
import MixedViewImg from './mixedViewImg'


const MixedViewSectionMobile = ({
  index,
  nodeData,
  containerY,
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
    nodeData.getImgNodes(apiServices.mainData).map((imgNodes, i) =>
      <MixedViewImg
        key={i}
        nodeData={imgNodes}
        containerY={containerY} />
    ), [nodeData, containerY])
  const title = `${sectionTitle}, P. ${pageNum.join('-')}`.toLocaleUpperCase()

  return (
    <SectionContainer
      $isInterview={isInterview}
      $isFirstInterview={!interviewIndex}
      $beforeVisualEssay={beforeVisualEssay}
      $afterVisualEssay={afterVisualEssay}
      id={index ? `${FRAGMENT_ID_PREFIX}${index}` : undefined}
      ref={containerRef}>
      <TextContainer>
        {parserServices.parseTextView(text, {
          title,
          footnotes,
          projects,
          parseCitation: true,
        })}
      </TextContainer>
      <ImgContainer>
        {imgs}
      </ImgContainer>
    </SectionContainer>
  )
}

const ImgContainer = styled.div`
  background-color: ${COLORS.LIGHT_BEIGE};
  width: 100%;
  padding: 0 ${SIZES.PAGE_MARGIN_MOBILE.css};
  box-sizing: border-box;
  padding-top: ${SIZES.PAGE_MARGIN_MOBILE.css};

  span {
    display: block;
  }

  > span:not(:first-child) {
    margin-top: ${SIZES.PAGE_MARGIN_MOBILE.css};
  }
`

const TextContainer = styled.div`
  background-color: ${COLORS.LIGHT_BEIGE};
  padding: 0 ${SIZES.PAGE_MARGIN_MOBILE.css};

  box-sizing: border-box;
  width: 100%;

  > p {
    ${mixins.paragraphSpacing([FONT_SIZES.LEADING_L.value], true)} // TODO
    font-size: ${FONT_SIZES.REGULAR.css}; // TODO
  }
`

const getPadding = ({ $isInterview }) =>
  !$isInterview ?
    SIZES.MIXED_VIEW_PADDING_TOP_MOBILE.css :
    SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP_MOBILE.css

const SectionContainer = styled.div`
  width: 100%;
  border-top: ${conditionalStyle('$afterVisualEssay', `1px solid ${COLORS.BROWN}`)};
  border-bottom: ${conditionalStyle('$beforeVisualEssay', `1px solid ${COLORS.BROWN}`)};

  &:first-child {
    ${TextContainer} {
      padding-top: ${SIZES.PAGE_MARGIN_TOP.css};
    }
  }

  &:not(:first-child) {
    ${TextContainer} {
      padding-top: ${getPadding};
    }
  }

  ${TextContainer} {
    &, * {
      color: ${conditionalStyle('$isInterview', COLORS.BLUE)};
    }
  }

  >:last-child {
    padding-bottom: ${({ $beforeVisualEssay, ...rest }) => $beforeVisualEssay ? getPadding({ ...rest }) : undefined};
  }
`

export default MixedViewSectionMobile