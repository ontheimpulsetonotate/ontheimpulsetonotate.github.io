import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES, FONT_SIZES_RESPONSIVE, SIZES } from '../../../constants/stylesConstants'
import { conditionalStyle } from '../../../utils/styleUtils'
import mixins from '../../../utils/mixins'

const TextHeader = ({ inline, ...rest }) => <Header {...rest} $inline={inline} />

const Header = styled.h3`
  ${mixins.dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.TEXT_HEADER })}
  line-height: ${FONT_SIZES.LEADING_M};
  font-family: ${FONT_FAMILIES.APERCU_COND};
  margin-bottom: ${SIZES.TEXT_HEADER_MARGIN};
  display: ${conditionalStyle('$inline', 'inline')};
`

export default TextHeader