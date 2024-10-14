import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { views } from '../../../constants/reactConstants'
import { SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import AboutButton from '../../about/aboutButton'
import Header from './header'
import HeaderButton from './headerButton'
import RightSideNav from './rightSideNav'
import SiteHeader from './siteHeader'

const MenuDesktop = ({ aboutIsOpened, isOrdered, handleAboutToggle, handleOrder }) => {
  return (
    <HeaderContainer>
      <SiteHeader
        defaultPath={views.text.url}
        onClick={() => handleAboutToggle(false)} />
      <menu>
        {!aboutIsOpened && Object.values(views).map(({ text, url }, i) =>
          <HeaderButton
            key={i}
            as={Link}
            to={`/${url}`}
            $underline={`#/${url}` === location.hash}>
            {text}
          </HeaderButton>
        )}
      </menu>
      <RightSideNav aboutIsOpened={aboutIsOpened}>
        {
          !aboutIsOpened &&
          `#/${views.mixed.url}` !== location.hash &&
          <HeaderButton
            onClick={handleOrder}
            $underline={isOrdered}>
            Order
          </HeaderButton>
        }
        <AboutButton isOpen={aboutIsOpened} handleToggle={handleAboutToggle} />
      </RightSideNav>
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Header)`
  ${mixins
    .chain()
    .highZIndex(1)
    .flex('center', 'initial')}
  position: relative;
  menu {
    padding-left: 0;
  }

  &, menu {
    pointer-events: none;
  }

  a, button {
    pointer-events: initial;
  }

  h1 {
    margin-right: ${SIZES.HEADER_INNER_MARGIN.mult(3).css};
  }

  :nth-child(3) {
    justify-self: end;
    margin-right: 0;
  }
`

export default MenuDesktop