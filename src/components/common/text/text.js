import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import TruncateMarkup from 'react-truncate-markup'
import { conditionalStyle, extractStyle, toggleStyle } from '../../../utils/styleUtils'
import { FONT_FAMILIES, FONT_SIZES, SIZES, TIMINGS } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import ExpandButton from './expandButton'
import TextHeader from './textHeader'
import { parseTextView } from '../../../services/parserServices'


const Text = ({ index, zIndex, mappedPosition, sectionTitle, text, handleClick, handleDrag }) => {
  const draggableRef = useRef()
  const [isExpanded, setIsExpanded] = useState(true)
  const [forcePosition, setForcePosition] = useState(true)

  const handleButtonClick = expand => setIsExpanded(expand)
  const getParsed = truncate => parseTextView(text, handleButtonClick, truncate)

  const truncated = useMemo(() => (
    <TruncateMarkup
      lines={4}
      tokenize='words'
      ellipsis={<ExpandButton isExpanded={isExpanded} handleClick={handleButtonClick} />}>
      {getParsed(false)}
    </TruncateMarkup>
  ), [text])

  const onClick = () => {
    handleClick(index)
    setForcePosition(false)
  }

  useEffect(() => setForcePosition(true), [mappedPosition])

  return (
    <Draggable
      defaultPosition={mappedPosition}
      position={forcePosition ? mappedPosition : undefined}
      ref={draggableRef}
      onMouseDown={() => onClick()}
      onStop={() => handleDrag(index, draggableRef.current.state)}>
      <InnerContainer
        // onTransitionEnd={() => setIsOrdering(false)}
        // $isOrdered={isOrdered}
        // $transition={isOrdering}
        $zIndex={zIndex}>
        <TextContainer>
          <TextHeader>{sectionTitle}</TextHeader>
          <TextBodyContainer>
            {isExpanded ? truncated : getParsed(true)}
          </TextBodyContainer>
        </TextContainer>
      </InnerContainer>

    </Draggable >
  )
}

const InnerContainer = styled.div`
 ${mixins.draggable}
  z-index: ${extractStyle('$zIndex')};
  transition: ${conditionalStyle('$transition', `transform ${TIMINGS.ORDER}ms ease-in-out`)};
  cursor: ${toggleStyle('$isOrdered', 'initial', 'move')};

  * {
    pointer-events: none;
  }
`

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
  }
`



export default Text