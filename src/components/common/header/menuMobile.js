import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as BarsSvg } from '../../../assets/svg/bars.svg'
import { views } from '../../../constants/reactConstants'
import { COLORS, SIZES } from '../../../constants/stylesConstants'
import useIsAbout from '../../../hooks/useIsAbout'
import mixins from '../../../utils/mixins'
import { toggleStyle } from '../../../utils/styleUtils'
import AboutButton from '../../about/aboutButton'
import Header from './header'
import RightSideNav from './rightSideNav'
import SiteHeader from './siteHeader'

const MenuMobile = ({ indexIsOpened, onToggleIndex }) => {
  const isAbout = useIsAbout()
  return (
    <HeaderContainer $isAbout={isAbout} $isIndex={indexIsOpened} >
      <SiteHeader defaultPath={views.mixed.url} onClick={() => onToggleIndex(false)} />
      <div>
        <button onClick={() => onToggleIndex(!indexIsOpened)}>
          <BarsSvg />
        </button>
      </div>
      <RightSideNav>
        <AboutButton
          mobileIndexIsOpen={indexIsOpened}
          mobileOnClick={() => onToggleIndex(false)} />
      </RightSideNav>
    </HeaderContainer>
  )
}


const HeaderContainer = styled(Header)`
  ${({ $isAbout }) => mixins
    .chain()
    .highZIndex(5)
    .flex('center', 'initial')
    .border(1, { color: $isAbout ? 'white' : COLORS.BROWN })}

  width: 100vw;
  padding: ${SIZES.PAGE_MARGIN_MOBILE.sub(SIZES.HEADER_BUTTON_PADDING).css};
  box-sizing: border-box;
  position: relative;
  background-color: ${({ $isAbout, $isIndex }) => $isAbout ? COLORS.BROWN : $isIndex ? COLORS.LIGHT_BEIGE : 'white'};

  a, button {
    padding: ${SIZES.HEADER_BUTTON_PADDING.css};
  }

  svg {
    height: ${SIZES.HEADER_BARS_HEIGHT.css};
    color: ${toggleStyle('$isAbout', 'white', COLORS.BROWN)};;
    justify-self: flex-start;
  }
`

export default MenuMobile