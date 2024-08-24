import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import TruncateMarkup from 'react-truncate-markup'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import parserServices from '../../../services/parserServices'
import mixins from '../../../utils/mixins'
import { extractStyle } from '../../../utils/styleUtils'
import ExpandButton from './expandButton'
import TextHeader from './textHeader'


const Text = ({
  text,
  type,
  sectionTitle,
  onHover,
  onRender,
  onCollapse,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleButtonClick = expand => {
    setIsExpanded(expand)
    if (!expand) {
      onHover(false)
      onCollapse()
    }
  }
  useEffect(() => onRender(), [])

  const getParsed = truncate => parserServices.parseTextView(text, { truncate, handleButtonClick })
  const truncated = useMemo(() => (
    <TruncateMarkup
      lines={4}
      tokenize='words'
      ellipsis={<ExpandButton isExpanded={isExpanded} handleClick={handleButtonClick} />}>
      {getParsed(true)}
    </TruncateMarkup>
  ), [text])

  return (
    <TextContainer {..._.omit(props, ['index'])} $color={type === 'interview' ? COLORS.BLUE : COLORS.BROWN}>
      <TextHeader>{sectionTitle}</TextHeader>
      <TextBodyContainer>
        {isExpanded ? getParsed(false) : truncated}
      </TextBodyContainer>
    </TextContainer>
  )
}


const TextContainer = styled.div`
  ${({ $color }) => mixins.border(1, { isBottom: false, color: $color })}
  width: ${SIZES.TEXT_WIDTH};
  padding: ${SIZES.ELEM_MARGIN};
  background-color: white;

  &, * {
    color: ${extractStyle('$color')};
  }
`

const TextBodyContainer = styled.div`
  p {
   ${mixins.paragraphSpacing(FONT_SIZES.LEADING_M)}
  }

  button {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: 500;
    pointer-events: all;
  }
`


export default Text