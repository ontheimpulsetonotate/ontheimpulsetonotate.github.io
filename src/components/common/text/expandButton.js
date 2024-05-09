

const ExpandButton = ({ isExpanded, handleClick }) => {
  return (
    <span>
      {isExpanded ? '... ' : ' '}
      <button onClick={() => handleClick(!isExpanded)}>
        [{isExpanded ? 'EXPAND' : 'COLLAPSE'}]
      </button>
    </span>
  )
}

export default ExpandButton