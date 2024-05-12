

const ExpandButton = ({ isExpanded, handleClick }) => {
  return (
    <span>
      {isExpanded ? ' ' : '... '}
      <button onClick={() => handleClick(!isExpanded)}>
        [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
      </button>
    </span>
  )
}

export default ExpandButton