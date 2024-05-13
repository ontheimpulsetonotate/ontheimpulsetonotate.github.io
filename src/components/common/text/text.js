import TruncateMarkup from 'react-truncate-markup'
import parserServices from '../../../services/parserServices'
import TextHeader from './textHeader'
import ExpandButton from './expandButton'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import mixins from '../../../utils/mixins'
import { FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'


const Text = ({ text, sectionTitle, onHover, onRender, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleButtonClick = expand => {
    setIsExpanded(expand)
    if (!expand) onHover(false)
  }
  useEffect(() => onRender(), [])

  const getParsed = truncate => parserServices.parseTextView(text, handleButtonClick, truncate)
  const truncated = useMemo(() => (
    <TruncateMarkup
      lines={4}
      tokenize='words'
      ellipsis={<ExpandButton isExpanded={isExpanded} handleClick={handleButtonClick} />}>
      {getParsed(true)}
    </TruncateMarkup>
  ), [text])

  return (
    <TextContainer {...props}>
      <TextHeader>{sectionTitle}</TextHeader>
      <TextBodyContainer>
        {isExpanded ? getParsed(false) : truncated}
      </TextBodyContainer>
    </TextContainer>
  )
}


const TextContainer = styled.div`
  ${mixins.border(1, false)}
  width: ${SIZES.TEXT_WIDTH};
  padding: ${SIZES.ELEM_MARGIN};
  background-color: white;
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