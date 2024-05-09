import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES } from '../../../constants/stylesConstants'
import { remify } from '../../../utils/styleUtils'

const TextHeader = styled.h3`
  &h3 {
    line-height: ${FONT_SIZES.LEADING_M};
    font-family: ${FONT_FAMILIES.APERCU_COND};
    margin-bottom: ${remify(20)}; // TODO
  }

  line-height: ${FONT_SIZES.LEADING_M};
  font-family: ${FONT_FAMILIES.APERCU_COND};
  margin-bottom: ${remify(20)}; // TODO
`

export default TextHeader