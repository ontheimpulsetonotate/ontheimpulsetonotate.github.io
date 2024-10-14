import styled from 'styled-components'
import { styleIf } from '../../utils/styleUtils'

const Paragraph = ({ hang, children, ...props }) =>
  <StyledParagraph {...props} $hang={hang}>
    {hang && <span>“</span>}{children}
  </StyledParagraph>




const StyledParagraph = styled.p`
  text-indent: ${styleIf('$hang', '-0.4em')};
  span:first-child {
    font-kerning: ${styleIf('$hang', 'none')};
  }
`

export default Paragraph