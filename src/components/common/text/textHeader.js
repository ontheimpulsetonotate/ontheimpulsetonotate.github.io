import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import { conditionalStyle } from '../../../utils/styleUtils'

const TextHeader = ({ inline, ...rest }) => <Header {...rest} $inline={inline} />

const Header = styled.h3`
  line-height: ${FONT_SIZES.LEADING_M};
  font-family: ${FONT_FAMILIES.APERCU_COND};
  margin-bottom: ${SIZES.ELEM_MARGIN};
  display: ${conditionalStyle('$inline', 'inline')};
`

export default TextHeader