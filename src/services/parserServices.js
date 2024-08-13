import parse, { domToReact } from 'html-react-parser'
import Citation from '../components/common/text/citation'
import ExpandButton from '../components/common/text/expandButton'
import TextHeader from '../components/common/text/textHeader'

const parseTextView = (text, {
  title,
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
            const data = text.replace(/ \[[0-9]+\]$/, '')
            if (parseCitation)
              return <Citation footnote={footnotes[footnoteIndex++]}>{data}</Citation>
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

const parserServices = {
  parseTextView
}

export default parserServices