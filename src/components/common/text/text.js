import { useMemo, useState } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import TruncateMarkup from 'react-truncate-markup'
import { remify, extractStyle, getEmifiedPx, getPx } from '../../../utils/styleUtils'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import parse, { domToReact } from 'html-react-parser'
import ExpandButton from './expandButton'
import TextHeader from './textHeader'
import { randLocation } from '../../../utils/commonUtils'
import { getMainContainer } from '../../../utils/sizeUtils'


const Text = ({ index, zIndex, sectionTitle, text, handleClick }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleButtonClick = expand => setIsExpanded(expand)
  const getParsed = truncate => {
    let html = `<p>${text}</p>`
      .replace(/<br>$/, '')
      .replaceAll(/<br>/g, truncate ? '</p><p>' : ' ')
    const options = {
      replace: domNode => {
        if (domNode.tagName === 'span') {
          const { attribs, children } = domNode
          attribs.style += 'text-decoration: none; color:inherit;'
          if (attribs.style.match('text-decoration:underline')) {
            const text = children[0]?.data
            if (text) children[0].data = text.replace(/ \[[0-9]+\]$/, '')
          }
        }
        if (domNode.tagName === 'a')
          return <>{domToReact(domNode.children)}</>
        if (truncate && domNode.tagName === 'p' && !domNode.next)
          return (
            <p>
              {domToReact(domNode.children, options)}
              <ExpandButton isExpanded={false} handleClick={handleButtonClick} />
            </p>
          )
      }
    }

    return parse(
      html.replaceAll(/&lt;br&gt;/g, ''),
      options
    )
  }

  const truncated = useMemo(() => (
    <TruncateMarkup
      lines={5}
      tokenize='words'
      ellipsis={<ExpandButton isExpanded={isExpanded} handleClick={handleButtonClick} />}>
      {getParsed(false)}
    </TruncateMarkup>
  ), [text])

  const containerW = getPx(SIZES.TEXT_WIDTH)
  const containerH = getEmifiedPx(20) * 3 + getPx(FONT_SIZES.LEADING_M) * 6
  const marginPercentage = 0.8
  const defaultPosition = useMemo(() =>
    randLocation(getMainContainer(), {
      x: containerW * marginPercentage,
      y: containerH * marginPercentage
    }),
    [containerW, containerH]
  )

  return (
    <Draggable
      defaultPosition={{
        x: defaultPosition.x - containerW / 2,
        y: defaultPosition.y - containerH / 2
      }}
      onMouseDown={() => handleClick(index)}>
      <TextContainer $zIndex={zIndex}>
        <TextHeader>{sectionTitle}</TextHeader>
        <TextBodyContainer>
          {isExpanded ? truncated : getParsed(true)}
        </TextBodyContainer>
      </TextContainer>
    </Draggable >
  )
}

const TextContainer = styled.div`
  ${mixins.draggable}

  width: ${SIZES.TEXT_WIDTH};
  padding: ${remify(20)} ${remify(20)}; // TODO
  z-index: ${extractStyle('$zIndex')};

  border: ${COLORS.BROWN} 1px solid;
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