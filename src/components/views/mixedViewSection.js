import { useCallback, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { FRAGMENT_TYPES } from '../../constants/apiConstants'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import { COLORS, FONT_SIZES, SIZES, TIMINGS } from '../../constants/stylesConstants'
import parserServices from '../../services/parserServices'
import { validateString } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { conditionalStyle } from '../../utils/styleUtils'
import MixedViewImg from './mixedViewImg'


const MixedViewSection = ({
  index,
  interviewIndex,
  type,
  text,
  sectionTitle,
  pageNum,
  data,
  containerY,
  footnotes,
  projects,
  isLeft
}) => {
  const containerRef = useRef()
  const imgs = useMemo(() =>
    data?.map((data, i) =>
      <MixedViewImg
        key={i}
        type={type}
        data={data}
        containerY={containerY} />
    ), [data])
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
      $isInterview={type === FRAGMENT_TYPES.INTERVIEW}
      $isFirstInterview={!interviewIndex}
      id={`${FRAGMENT_ID_PREFIX}${index + 1}`}
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
    font-size: ${FONT_SIZES.LARGE};
    ${mixins.paragraphSpacing(FONT_SIZES.LEADING_DL)}
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

  ${TextContainer} {
    padding-top: ${getPadding};

    &, * {
      color: ${conditionalStyle('$isInterview', COLORS.BLUE)};
    }
  }

  ${ImgContainer} {
    padding-top: ${getPadding};
  }
`

export default MixedViewSection