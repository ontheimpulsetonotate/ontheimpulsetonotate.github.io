import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { views } from '../../../constants/reactConstants'
import { SIZES } from '../../../constants/stylesConstants'
import useIsAbout from '../../../hooks/useIsAbout'
import mixins from '../../../utils/mixins'
import AboutButton from '../../about/aboutButton'
import Header from './header'
import HeaderButton from './headerButton'
import RightSideNav from './rightSideNav'
import SiteHeader from './siteHeader'

const MenuDesktop = ({ isOrdered, handleOrder }) => {
  const isAbout = useIsAbout()

  return (
    <HeaderContainer>
      <SiteHeader defaultPath={views.text.url} />
      <menu>
        {Object.values(views).map(({ text, url }, i) =>
          <HeaderButton
            key={i}
            as={Link}
            to={`/${url}`}
            $underline={`#/${url}` === location.hash}>
            {text}
          </HeaderButton>
        )}
      </menu>
      <RightSideNav>
        {
          !isAbout &&
          `#/${views.mixed.url}` !== location.hash &&
          <HeaderButton
            onClick={handleOrder}
            $underline={isOrdered}>
            Order
          </HeaderButton>
        }
        <AboutButton />
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