import styled from 'styled-components'
import mixins from '../../../utils/mixins'
import { SIZES } from '../../../constants/stylesConstants'
import useIsMobile from '../../../hooks/useIsMobile'
import { styleIf } from '../../../utils/styleUtils'
import useIsAbout from '../../../hooks/useIsAbout'

const RightSideNav = ({ children }) => {
  const isMobile = useIsMobile()
  const isAbout = useIsAbout()
  return <StyledRightSideNav $hasPadding={!isMobile && !isAbout}>{children}</StyledRightSideNav>
}

const StyledRightSideNav = styled.div`
  flex-grow: 999;
  height: fit-content;
  ${mixins.flex('initial', 'flex-end')}
  padding-right: ${styleIf('$hasPadding', SIZES.PAGE_MARGIN_DESKTOP.css)};
  div a {
    margin-right: 0;
  }
`
export default RightSideNav