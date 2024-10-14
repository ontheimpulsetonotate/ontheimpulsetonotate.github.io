import styled from 'styled-components'
import { COLORS } from '../../constants/stylesConstants'

const Anchor = ({ to, children }) => {
  return (
    <StyledAnchor href={to} target='_blank'>
      {children}
    </StyledAnchor>
  )
}

const StyledAnchor = styled.a`
  color: ${COLORS.BLUE};
`

export default Anchor