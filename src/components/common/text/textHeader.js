import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES_RESPONSIVE, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import { conditionalStyle } from '../../../utils/styleUtils'
import useIsMobile from '../../../hooks/useIsMobile'

const TextHeader = ({ inline, ...rest }) => {
  const isMobile = useIsMobile()
  return <Header {...rest} $isMobile={isMobile} $inline={inline} />
}

const Header = styled.h3`
  ${({ $isMobile }) => mixins
    .dynamicSizes({
      fontSize: FONT_SIZES_RESPONSIVE.TEXT_HEADER,
      lineHeight: FONT_SIZES_RESPONSIVE.LEADING_M,
      marginBottom: SIZES_RESPONSIVE.TEXT_HEADER_MARGIN
    }, $isMobile)}
  font-family: ${FONT_FAMILIES.APERCU_COND};
  display: ${conditionalStyle('$inline', 'inline')};
`

export default TextHeader