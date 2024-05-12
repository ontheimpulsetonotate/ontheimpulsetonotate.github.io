import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'

const TextHeader = styled.h3`
  line-height: ${FONT_SIZES.LEADING_M};
  font-family: ${FONT_FAMILIES.APERCU_COND};
  margin-bottom: ${SIZES.ELEM_MARGIN};
`

export default TextHeader