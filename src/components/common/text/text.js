import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import TruncateMarkup from 'react-truncate-markup'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, FONT_SIZES_RESPONSIVE, SIZES, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import parserServices from '../../../services/parserServices'
import mixins from '../../../utils/mixins'
import { extractStyle } from '../../../utils/styleUtils'
import ExpandButton from './expandButton'
import TextHeader from './textHeader'


const Text = ({
  id,
  nodeData,
  onHover,
  onRender,
  onCollapse,
  onMouseOver,
  onMouseOut
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { text, sectionTitle, isInterview } = nodeData

  const handleButtonClick = expand => {
    setIsExpanded(expand)
    if (!expand) {
      onHover(false)
      onCollapse()
    }
  }
  useEffect(() => onRender(), [])

  const getParsed = truncate => parserServices
    .parseTextView(text, { truncate, handleButtonClick })
  const truncated = useMemo(() => (
    <TruncateMarkup
      lines={4}
      tokenize='words'
      ellipsis={<ExpandButton isExpanded={isExpanded} handleClick={handleButtonClick} />}>
      {getParsed(true)}
    </TruncateMarkup>
  ), [text])

  return (
    <TextContainer
      id={id}
      $color={isInterview ? COLORS.BLUE : COLORS.BROWN}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}>
      <TextHeader>{sectionTitle}</TextHeader>
      <TextBodyContainer>
        {isExpanded ? getParsed(false) : truncated}
      </TextBodyContainer>
    </TextContainer>
  )
}

const TextContainer = styled.div`
  ${({ $color }) => mixins
    .chain()
    .border(1, { isBottom: false, color: $color })
    .dynamicSizes({
      width: SIZES_RESPONSIVE.TEXT_WIDTH,
      padding: SIZES_RESPONSIVE.TEXT_PADDING
    })}
  box-sizing: border-box;
  background-color: white;

  &, * {
    color: ${extractStyle('$color')};
  }
`

const TextBodyContainer = styled.div`
  p {
   ${mixins.paragraphSpacing(FONT_SIZES_RESPONSIVE.LEADING_M)}
  }

  button {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: 500;
    pointer-events: all;
  }
`


export default Text