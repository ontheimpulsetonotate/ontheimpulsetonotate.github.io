import parse, { domToReact } from 'html-react-parser'
import Citation from '../components/common/text/citation'
import ExpandButton from '../components/common/text/expandButton'

const parseTextView = (text, {
  truncate,
  parseCitation,
  footnotes,
  handleButtonClick,
} = {}) => {
  let footnoteIndex = 0
  const trimSpace = '(<br>|\\s|&#8202;)+'
  const regex = new RegExp(`(^${trimSpace}|${trimSpace}$)`, 'g')
  const html = `<p>${text.replaceAll(regex, '')}</p>`
    .replaceAll(/<br>/g, truncate ? ' ' : '</p><p>')
  const options = {
    replace: domNode => {
      if (domNode.tagName === 'span') {
        const { attribs, children } = domNode
        attribs.style += 'text-decoration: none; color:inherit;'
        if (attribs.style.match('text-decoration:underline')) {
          const text = children[0]?.data
          if (text) {
            const data = text.replace(/ \[[0-9]+\]$/, '')
            if (parseCitation)
              return <Citation footnote={footnotes[footnoteIndex++]}>{data}</Citation>
            children[0].data = data
          }
        }
      }
      if (domNode.tagName === 'a')
        return <>{domToReact(domNode.children)}</>
      if (truncate === false && domNode.tagName === 'p' && !domNode.next)
        return (
          <p>
            {domToReact(domNode.children, options)}
            <ExpandButton isExpanded={true} handleClick={handleButtonClick} />
          </p>
        )
    }
  }

  return parse(
    html.replaceAll(/&lt;br&gt;/g, ''),
    options
  )
}

const parserServices = {
  parseTextView
}

export default parserServices