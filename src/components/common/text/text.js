import _ from 'lodash'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import TruncateMarkup from 'react-truncate-markup'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, FONT_SIZES_RESPONSIVE, SIZES, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import parserServices from '../../../services/parserServices'
import mixins from '../../../utils/mixins'
import { extract } from '../../../utils/styleUtils'
import ExpandButton from './expandButton'
import TextHeader from './textHeader'


const Text = ({
  id,
  index,
  nodeData,
  onHover,
  onRender,
  onCollapse,
  onMouseOver,
  onMouseOut,
  handleLayoutShift,
  handleCitationOver
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { text, sectionTitle, footnotes, projects, isInterview } = nodeData

  const handleButtonClick = expand => {
    setIsExpanded(expand)
    if (!expand) {
      onHover(false)
      onCollapse()
    }
  }

  useEffect(() => handleLayoutShift(index, isExpanded), [isExpanded])
  useEffect(() => onRender(), [])

  const getParsed = truncate => parserServices
    .parseTextView(text, {
      truncate,
      footnotes,
      projects,
      handleButtonClick,
      onHover: handleCitationOver
    })
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
      className='text-node'
      $color={isInterview ? COLORS.TEXT_BLUE : COLORS.BROWN}
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

  &, > *, p, button {
    color: ${extract('$color')};
  }
`

const TextBodyContainer = styled.div`
  p {
   ${mixins.paragraphSpacing(FONT_SIZES_RESPONSIVE.LEADING_M)}
   span {
    pointer-events: all;
   }
  }

  button {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: 500;
    pointer-events: all;
  }
`


export default Text