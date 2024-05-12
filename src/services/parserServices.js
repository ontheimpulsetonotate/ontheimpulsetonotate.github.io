import parse, { domToReact } from 'html-react-parser'
import ExpandButton from '../components/common/text/expandButton'

export const parseTextView = (text, handleButtonClick, truncate) => {
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