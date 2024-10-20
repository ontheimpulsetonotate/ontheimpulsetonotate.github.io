import styled from 'styled-components'
import { COLORS } from '../../constants/stylesConstants'
import { styleIf } from '../../utils/styleUtils'

const ExternalLink = ({ to, children, noHighlight, ...props }) => {
  return (
    <StyledLink {...props} href={to} target='_blank' $noHighlight={noHighlight}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled.a`
  color: ${styleIf('$noHighlight', '', COLORS.BLUE)};
`

export default ExternalLink