import parse, { domToReact } from 'html-react-parser'
import Citation from '../components/common/text/citation'
import ExpandButton from '../components/common/text/expandButton'
import ProjectCitation from '../components/common/text/projectCitation'
import TextHeader from '../components/common/text/textHeader'
import { BLEED_DIRECTIONS } from '../constants/apiConstants'
import { COLORS } from '../constants/stylesConstants'
import { getVw } from '../utils/sizeUtils'
import { spanCol } from '../utils/styleUtils'
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
  parseCitation,
  footnotes,
  projects,
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
        if (attribs.style.match('text-decoration:underline')) {
          const text = children[0]?.data
          if (text) {
            const data = text.replace(/ \[[0-9]+\]/, '')
            if (parseCitation) {
              const project = projects?.[footnoteIndex + 1]

              const citation =
                <Citation
                  color={COLORS.BLUE}
                  footnote={project ?
                    parseProject(project) :
                    footnotes?.[footnoteIndex + 1]}>
                  {data}
                </Citation>
              footnoteIndex++
              return citation
            }
            children[0].data = data
          }
        }
      }

      if (domNode.tagName === 'a') // TODO: ?
        return <>{domToReact(children)}</>

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

const parseVisualEssay = visualEssay =>
  visualEssay.map(([imgNum, colStart, colEnd, top, alignBottom, bleedDirection]) => {
    const nodeData = apiServices
      .visualEssayData
      .find(data => data.imgNum[0] === imgNum)
    nodeData.imgLink = nodeData.imgLinks[0]
    const colSpan = [colStart, colEnd]
    const width = spanCol(colSpan[1] - colSpan[0], bleedDirection ? 1 : 0)
    const left = spanCol(
      colSpan[0] - 1,
      colSpan[0] % 1 ? 0 : bleedDirection === BLEED_DIRECTIONS.LEFT ? 0 : 1,
      1
    )
    return {
      nodeData,
      top: Math.max(top - 990, 0) * getVw() / 1512, // TODO
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