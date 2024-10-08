import parse, { domToReact } from 'html-react-parser'
import TruncateMarkup from 'react-truncate-markup'
import Citation from '../components/common/text/citation'
import ExpandButton from '../components/common/text/expandButton'
import ProjectCitation from '../components/common/text/projectCitation'
import TextHeader from '../components/common/text/textHeader'
import { BLEED_DIRECTIONS } from '../constants/apiConstants'
import { COLORS } from '../constants/stylesConstants'
import Size from '../utils/helpers/size'
import { getVw } from '../utils/sizeUtils'
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
  let footnoteIndex = 0
  const trimSpace = '(<br>|\\s|&#8202;)+'
  const regex = new RegExp(`(^${trimSpace}|${trimSpace}$)`, 'g')
  const html = `<p>${text.replaceAll(regex, '')}</p>`
    .replaceAll(/<br>/g, truncate ? ' ' : '</p><p>')
    .replaceAll(/&lt;br&gt;/g, '')

  const options = {
    replace: domNode => {
      const { children } = domNode

      if (domNode.tagName === 'h3')
        return <></>

      if (domNode.tagName === 'span') {
        const { attribs } = domNode
        attribs.style += 'text-decoration: none; color:inherit;'
        const { style } = attribs
        if (style.match('text-decoration:underline')) {
          const text = children[0]?.data
          if (text) {
            const data = text.replace(/ \[[0-9]+\]/, '')
            if (footnotes || projects) {
              const project = projects?.[footnoteIndex + 1]
              const citation =
                <TruncateMarkup.Atom>
                  <Citation
                    style={{ fontStyle: style.match('font-style:italic') ? 'italic' : undefined }}
                    color={COLORS.BLUE}
                    footnote={project ?
                      parseProject(project) :
                      footnotes?.[footnoteIndex + 1]}
                    onHover={onHover}>
                    {data}
                  </Citation>
                </TruncateMarkup.Atom>
              footnoteIndex++
              return citation
            }
            children[0].data = data
          }
        }
      }

      if (!domNode.next && domNode.tagName === 'p') {
        if (truncate === false)
          return (
            <p>
              {domToReact(children, options)}
              <ExpandButton isExpanded={true} handleClick={handleButtonClick} />
            </p>
          )
        else if (title) return (
          <p>
            {domToReact(children, options)}
            <TextHeader inline> {title}</TextHeader>
          </p >
        )
      }

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