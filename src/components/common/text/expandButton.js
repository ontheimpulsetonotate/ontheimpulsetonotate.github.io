import styled from 'styled-components'


const ExpandButton = ({ isExpanded, handleClick }) => {
  return (
    <ButtonContainer>
      {isExpanded ? ' ' : '... '}
      <button onClick={() => handleClick(!isExpanded)}>
        [{isExpanded ? 'COLLAPSE' : 'EXPAND'}]
      </button>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.span`
  button {
    font-weight: normal;
  }
`


export default ExpandButton