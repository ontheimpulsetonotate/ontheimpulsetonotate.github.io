import styled from 'styled-components'
import mixins from '../../../utils/mixins'
import { SIZES } from '../../../constants/stylesConstants'
import useIsMobile from '../../../hooks/useIsMobile'
import { conditionalStyle, toggleStyle } from '../../../utils/styleUtils'

const RightSideNav = ({ children }) => {
  const isMobile = useIsMobile()
  return <StyledRightSideNav $isDesktop={!isMobile}>{children}</StyledRightSideNav>
}

const StyledRightSideNav = styled.div`
  flex-grow: 999;
  height: fit-content;
  ${mixins.flex('initial', 'flex-end')}
  padding-right: ${conditionalStyle('$isDesktop', SIZES.PAGE_MARGIN_DESKTOP.css)};
  div a {
    margin-right: 0;
  }
`
export default RightSideNav