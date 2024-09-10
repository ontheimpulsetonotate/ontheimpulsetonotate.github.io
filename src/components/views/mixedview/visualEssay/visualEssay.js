import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useMemo } from 'react'
import styled from 'styled-components'
import { VISUAL_ESSAY_TITLE } from '../../../../constants/apiConstants'
import { COLORS, SIZES } from '../../../../constants/stylesConstants'
import useIsMobile from '../../../../hooks/useIsMobile'
import parserServices from '../../../../services/parserServices'
import mixins from '../../../../utils/mixins'
import { convertVisualEssayImgSize, extractStyle, toggleStyle } from '../../../../utils/styleUtils'
import VisualEssayImg from './visualEssayImg'


const VisualEssay = ({ data, isBlueInsights }) => {
  const isMobile = useIsMobile()
  const { width } = useWindowSize()
  const parsedData = useMemo(() =>
    parserServices.parseVisualEssay(data, isMobile), [data, width])

  const LAST_IMAGE_PROPORTION = isBlueInsights ? 1.4805 : 1.261

  const color = isBlueInsights ? COLORS.BLUE : COLORS.BROWN
  const backgroundColor = isBlueInsights ? COLORS.LIGHT_BLUE : COLORS.LIGHT_BEIGE

  const lastImg = _.maxBy(parsedData, img => img.top.value)
  const height = lastImg.top
    .add(lastImg.width.div(LAST_IMAGE_PROPORTION))
    .add(SIZES.MIXED_VIEW_PADDING_BOTTOM).css

  return (
    <Container
      $isMobile={isMobile}
      $height={height}
      $color={color}
      $backgroundColor={backgroundColor}>
      {parsedData.map((data, i) =>
        <VisualEssayImg key={i} data={data} color={color} />)}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;

  box-sizing: border-box;
  height: ${extractStyle('$height')};
  position: relative;

  ${mixins.border(1, { isBottom: false })};
  border-color: ${extractStyle('$color')};
  background-color: ${extractStyle('$backgroundColor')};

  margin: ${SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP.css} 0;
  padding: 0 ${toggleStyle('$isMobile', SIZES.PAGE_MARGIN_MOBILE.css, SIZES.PAGE_MARGIN_DESKTOP.css)};

  figure {
    position: absolute;
    min-width: 0;
  }
`

export default VisualEssay