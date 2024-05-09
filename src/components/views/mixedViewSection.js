import styled from 'styled-components'
import parse, { domToReact } from 'html-react-parser'
import { COLORS, FONT_SIZES, SIZES } from '../../constants/stylesConstants'
import { remify, toggleStyle } from '../../utils/styleUtils'
import TextHeader from '../common/text/textHeader'
import mixins from '../../utils/mixins'
import { useMemo } from 'react'
import Figure from '../common/img/figure'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import Citation from '../common/text/citation'

const MixedViewSection = ({ index, text, sectionTitle, imgData, isLeft, footnotes }) => {

  // TODO: merge
  const getParsed = () => {
    let footnoteIndex = 0
    let html = `<p>${text}</p>`
      .replace(/<br>$/, '')
      .replaceAll(/<br>/g, '</p><p>')
    const options = {
      replace: domNode => {
        if (domNode.tagName === 'span') {
          const { attribs, children } = domNode
          attribs.style += 'text-decoration: none; color:inherit;'
          if (attribs.style.match('text-decoration:underline')) {
            const text = children[0]?.data
            if (text)
              return <Citation footnote={footnotes[footnoteIndex++]}>{text.replace(/ \[[0-9]+\]$/, '')}</Citation>
          }
        }
        if (domNode.tagName === 'a')
          return <>{domToReact(domNode.children)}</>
      }
    }

    return parse(
      html.replaceAll(/&lt;br&gt;/g, ''),
      options
    )
  }

  const imgs = useMemo(() =>
    imgData?.map(({ imgLink, imgNum }, i) =>
      // TODO
      <Figure key={i} backgroundColor={COLORS.BROWN} src={imgLink} maxSize={SIZES.IMG_MAX_SIZE + 'px'} imgNum={imgNum} />
    ), [imgData])

  return (
    <SectionContainer id={`${FRAGMENT_ID_PREFIX}${index + 1}`}>
      <ImgContainer $isLeft={isLeft}>
        {isLeft && imgs}
      </ImgContainer>
      <TextContainer>
        <TextHeader>{sectionTitle}</TextHeader>
        {getParsed()}
      </TextContainer>
      <ImgContainer $isLeft={isLeft}>
        {!isLeft && imgs}
      </ImgContainer>
    </SectionContainer>
  )
}

const padding = remify(15)
const ImgContainer = styled.div`
  ${({ $isLeft }) => {
    const flex = `flex-${$isLeft ? 'end' : 'start'}`
    return mixins.flex(flex, flex)
  }}

  width: 100%;
  box-sizing: border-box;
  padding-right: ${toggleStyle('$isLeft', padding, '')};
  padding-left: ${toggleStyle('$isLeft', '', padding)};
  flex-direction: column;

  > figure {
    margin-top: ${padding};
  }
`

const PADDING_SIDE = remify(40)
const TextContainer = styled.div`
  background-color: ${COLORS.LIGHT_BEIGE};
  padding: ${remify(120)} ${PADDING_SIDE} 0;
  height: 100%;
  box-sizing: border-box;
  ${mixins.flex('initial', 'flex-end')}
  flex-direction: column;

  p {
    font-size: ${FONT_SIZES.MIXED};
    ${mixins.paragraphSpacing(FONT_SIZES.LEADING_DL)}
  }
`


const SectionContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: calc((92.5vw - 500px) / 2) 500px 1fr; // TODO

  &:not(:first-child){
    ${TextContainer} {
      padding-top: ${remify(150)};
    }
  }
`

export default MixedViewSection