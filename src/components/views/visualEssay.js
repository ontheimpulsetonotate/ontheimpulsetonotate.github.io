import _ from 'lodash'
import { useMemo } from 'react'
import styled from 'styled-components'
import { VISUAL_ESSAY_TITLE } from '../../constants/apiConstants'
import { COLORS, SIZES } from '../../constants/stylesConstants'
import parserServices from '../../services/parserServices'
import mixins from '../../utils/mixins'
import { extractStyle } from '../../utils/styleUtils'
import VisualEssayImg from './visualEssayImg'


const VisualEssay = ({ data }) => {
  const parsedData = useMemo(() =>
    parserServices.parseVisualEssay(data), [data])
  const isBlueInsights = parsedData[0].nodeData?.sectionTitle === VISUAL_ESSAY_TITLE.BLUE_INSIGHTS

  const LAST_IMAGE_PROPORTION = isBlueInsights ? 1.4805 : 1.261

  const color = isBlueInsights ? COLORS.BLUE : COLORS.BROWN
  const backgroundColor = isBlueInsights ? COLORS.LIGHT_BLUE : COLORS.LIGHT_BEIGE

  const lastImg = _.maxBy(parsedData, 'top')
  const height = `calc(${lastImg.top}px + ${lastImg.width} / ${LAST_IMAGE_PROPORTION} + ${SIZES.VISUAL_ESSAY_BOTTOM_PADDING})`
  return (
    <Container
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

  margin: ${SIZES.MIXED_VIEW_INTERVIEW_PADDING_TOP} 0;
  padding: 0 ${SIZES.PAGE_MARGIN};
  display: grid;
  grid-template-columns: repeat(${SIZES.GRID_COUNT}, 1fr);
  column-gap: ${SIZES.ELEM_MARGIN};

  figure {
    position: absolute;
    min-width: 0;
  }
`

export default VisualEssay