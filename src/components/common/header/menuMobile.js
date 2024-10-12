import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as BarsSvg } from '../../../assets/svg/bars.svg'
import { views } from '../../../constants/reactConstants'
import { COLORS, FONT_SIZES, SIZES } from '../../../constants/stylesConstants'
import useIsAbout from '../../../hooks/useIsAbout'
import mixins from '../../../utils/mixins'
import AboutButton from '../../about/aboutButton'
import Header from './header'

import SiteHeader from './siteHeader'
import RightSideNav from './rightSideNav'

const MenuMobile = ({ indexIsOpened, onToggleIndex }) => {
  const isAbout = useIsAbout()
  return (
    <HeaderContainer $isAbout={isAbout} $isIndex={indexIsOpened} >
      <SiteHeader defaultPath={views.mixed.url} onClick={() => {
        onToggleIndex(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }} />
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
  ${({ $isAbout, $isIndex }) => mixins
    .chain()
    .highZIndex(5)
    .flex('center', 'initial')
    .border(1, { color: $isAbout && !$isIndex ? 'white' : COLORS.BROWN })}

  width: 100vw;
  font-size: ${FONT_SIZES.REGULAR.css};
  padding: ${SIZES.PAGE_MARGIN_MOBILE.sub(SIZES.HEADER_BUTTON_PADDING).css};
  box-sizing: border-box;
  position: fixed;
  background-color: ${({ $isAbout, $isIndex }) => $isIndex ? COLORS.BEIGE : $isAbout ? COLORS.BROWN : 'white'};

  a, button {
    padding: ${SIZES.HEADER_BUTTON_PADDING.css};
  }

  svg {
    height: 0.7em;
    color: ${({ $isAbout, $isIndex }) => $isAbout && !$isIndex ? 'white' : COLORS.BROWN};
    justify-self: flex-start;

    line {
      stroke-width: 25px;
    }
  }

  div:last-child > button {
    padding-bottom: ${SIZES.HEADER_BUTTON_PADDING.mult(1.1).css};
  }
`

export default MenuMobile