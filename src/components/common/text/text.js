import { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import TruncateMarkup from 'react-truncate-markup'
import { FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import ExpandButton from './expandButton'
import TextHeader from './textHeader'
import { parseTextView } from '../../../services/parserServices'
import DraggableContainer from '../containers/draggableContainer'


const Text = ({ sectionTitle, text, ...rest }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleButtonClick = expand => {
    setIsExpanded(expand)
    if (!expand) setIsHovering(false)
  }
  const getParsed = truncate => parseTextView(text, handleButtonClick, truncate)
  const containerRef = useRef()

  const truncated = useMemo(() => (
    <TruncateMarkup
      lines={4}
      tokenize='words'
      ellipsis={<ExpandButton isExpanded={isExpanded} handleClick={handleButtonClick} />}>
      {getParsed(true)}
    </TruncateMarkup>
  ), [text])


  return (
    <DraggableContainer
      {...rest}
      ref={containerRef}
      isOrdered={undefined}
      isHovering={isHovering}
      handleHover={setIsHovering}
      render={props => (
        <TextContainer {...props}>
          <TextHeader>{sectionTitle}</TextHeader>
          <TextBodyContainer>
            {isExpanded ? getParsed(false) : truncated}
          </TextBodyContainer>
        </TextContainer>
      )} />
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