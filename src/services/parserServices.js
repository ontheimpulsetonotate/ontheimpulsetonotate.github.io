import parse, { domToReact } from 'html-react-parser'
import TruncateMarkup from 'react-truncate-markup'
import ExternalLink from '../components/common/externalLink'
import Paragraph from '../components/common/paragraph'
import Citation from '../components/common/text/citation'
import ExpandButton from '../components/common/text/expandButton'
import ProjectCitation from '../components/common/text/projectCitation'
import TextHeader from '../components/common/text/textHeader'
import { BLEED_DIRECTIONS } from '../constants/apiConstants'
import { COLORS } from '../constants/stylesConstants'
import Size from '../utils/helpers/size'
import { convertVisualEssayImgSize, spanCol } from '../utils/styleUtils'
import apiServices from './apiServices'

const _parse = (text, options) => text ? parse(text, options) : undefined

const parseProject = text => {
  const [title, medium, workDetails] = text.split('<br>')
  return <ProjectCitation
    artistLastName={title}
    medium={medium}
    workDetails={workDetails} />
}

const parseTextView = (text, {
  title,
  truncate,
  footnotes,
  projects,
  onHover,
  handleButtonClick,
} = {}) => {
  const trimSpace = '(<br>|\\s|&#8202;)+'
  const regex = new RegExp(`(^${trimSpace}|${trimSpace}$)`, 'g')
  const html = `<p>${text.replaceAll(regex, '')}</p>`
    .replaceAll(/<br>/gm, truncate ? ' ' : '</p><p>')
    .replaceAll(/&lt;br&gt;/gm, '')
    .replaceAll(/-­/gm, '-')
    .replaceAll(/<\/a><\/span> +?(<span.*?>)?(\[[0-9]+\])(<\/span>)?/gm, ' $2</a></span>')

  const options = {
    replace: domNode => {
      const { tagName, attribs, children, next } = domNode

      if (tagName === 'h3')
        return <></>

      const isAnchor = tagName === 'a'
      if (tagName === 'span' || isAnchor) {
        attribs.style += 'text-decoration: none; color:inherit;'
        const { style } = attribs

        if (!isAnchor && !style.match('text-decoration:underline'))
          return

        const text = children[0]?.data
        if (!text) return

        const inlineCitaiton = text.replace(/ +?\[[0-9]+\]/, '')
        const citationNumber = text.match(/(?<=\[)[0-9](?=\])/)?.[0]

        const project = projects?.[citationNumber]
        const footnote = footnotes?.[citationNumber]

        if (!footnote && !project) {
          children[0].data = inlineCitaiton
          return
        }

        return <TruncateMarkup.Atom>
          <Citation
            style={{ fontStyle: style.match('font-style:italic') ? 'italic' : undefined }}
            color={COLORS.BLUE}
            footnote={project ? parseProject(project) : footnote}
            onHover={onHover}>
            {isAnchor ?
              <ExternalLink to={attribs.href}>{inlineCitaiton}</ExternalLink> :
              inlineCitaiton}
          </Citation>
        </TruncateMarkup.Atom>
      }

      if (tagName !== 'p') return
      const [firstChild] = children
      const quoteRegex = /^[“"]/
      const hang = firstChild?.type === 'text' && firstChild.data.match(quoteRegex)
      if (hang) domNode.children[0].data = firstChild.data.replace(quoteRegex, '')
      const reactChildren = domToReact(children, options)

      if (next) return <Paragraph hang={hang}>{reactChildren}</Paragraph>

      if (truncate === false) return (
        <Paragraph hang={hang}>
          {reactChildren}
          <ExpandButton isExpanded={true} handleClick={handleButtonClick} />
        </Paragraph>
      )

      if (title) return (
        <Paragraph hang={hang}>
          {reactChildren}
          <TextHeader inline>{title}</TextHeader>
        </Paragraph>
      )
    }
  }

  return parse(
    html,
    options
  )
}

const parseVisualEssay = (visualEssay, isMobile = false, isBlueInsights = false) =>
  visualEssay.map(([imgNum, colStart, colEnd, top, alignBottom, bleedDirection]) => {
    const nodeData = apiServices
      .visualEssayData
      .find(data => data.imgNum[0] === imgNum)
    nodeData.imgLink = nodeData.imgLinks[0]
    const colSpan = [colStart, colEnd]
    const width = spanCol(isMobile, colSpan[1] - colSpan[0], bleedDirection ? 1 : 0)
    const left = spanCol(
      isMobile,
      colSpan[0] - 1,
      colSpan[0] % 1 ? 0 : bleedDirection === BLEED_DIRECTIONS.LEFT ? 0 : 1,
      1
    )
    return {
      nodeData,
      top: new Size(convertVisualEssayImgSize(top, isMobile, isBlueInsights)),
      width,
      left,
      alignBottom,
    }
  })


const parserServices = {
  parse: _parse,
  parseTextView,
  parseVisualEssay
}

export default parserServices
