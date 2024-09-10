
import { useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { ReactComponent as BarsSvg } from '../../assets/svg/bars.svg'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../../constants/stylesConstants'
import useIsAbout from '../../hooks/useIsAbout'
import mixins from '../../utils/mixins'
import { toggleStyle } from '../../utils/styleUtils'
import About from '../about/about'
import AboutButton from '../about/aboutButton'
import Header from '../common/header'
import IndexMobile from '../indices/indexMobile'
import ImgView from '../views/imgView'
import MixedView from '../views/mixedview/mixedView'
import TextView from '../views/textView'
import Home from './home'


const Mobile = () => {
  const [mixedViewFragmentIndex, setMixedViewFragmentIndex] = useState()
  const [indexIsOpened, setIndexIsOpened] = useState(false)
  const isAbout = useIsAbout() && !indexIsOpened
  const navigate = useNavigate()

  const views = {
    text: { text: 'Text', component: TextView, url: 'text' },
    image: { text: 'Image', component: ImgView, url: 'image' },
    mixed: { text: 'Text+Image', component: MixedView, url: 'text-image' },
  }

  const handleClose = () => setIndexIsOpened(false)

  const handleIndexRowClick = i => {
    setMixedViewFragmentIndex(i)
    navigate(views.mixed.url)
  }


  return (
    <>
      <GlobalStyle $isAbout={isAbout} />
      <MainContainer>
        <HeaderContainer $isAbout={isAbout} $isIndex={indexIsOpened} >
          <h1>
            <Link to={`/${views.mixed.url}`} onClick={() => setIndexIsOpened(false)}>
              On the Impulse to Notate
            </Link>
          </h1>
          <div>
            <button onClick={() => setIndexIsOpened(prev => !prev)}>
              <BarsSvg />
            </button>

          </div>
          <RightSideNavContainer>
            <AboutButton
              mobileIndexIsOpen={indexIsOpened}
              mobileOnClick={() => setIndexIsOpened(false)} />
          </RightSideNavContainer>
        </HeaderContainer>
        <Routes>
          <Route path={`/${views.mixed.url}`} element={
            <Home
              view={MixedView}
              mixedViewFragmentIndex={mixedViewFragmentIndex}
              handleFragmentScroll={() => setMixedViewFragmentIndex()} />
          } />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to={`/${views.mixed.url}`} replace />} />
        </Routes>
        {indexIsOpened && <IndexMobile onRowClick={handleIndexRowClick} onClose={handleClose} />}
      </MainContainer >
    </>
  )
}


const GlobalStyle = createGlobalStyle`
  h1, h2, h3, p, button, menu {
    margin: 0;
  }

  h1, h2, h3, button, a {
    font-size: ${FONT_SIZES.REGULAR.css};
    line-height: ${FONT_SIZES.LEADING_S.css};
  }

  h1, h2, h3, p, button, a {
    color: ${toggleStyle('$isAbout', COLORS.LIGHT_BEIGE, COLORS.BROWN)};
  }

  h1, h2, h3, p, button, a {
    letter-spacing: 0.02em;
  }

  h1, h2, h3, ${Header} button, a {
    font-weight: 500;
    font-family: ${FONT_FAMILIES.APERCU};
    text-transform: uppercase;
  }

  a {
    text-decoration: inherit;
  }

  p {
    font-family: ${FONT_FAMILIES.BRADFORD};
  }

  button {
    padding: 0;
    border: none;
    background-color: inherit;
    width: fit-content;
    user-select: none;
    cursor: pointer;
  }

  figure {
    margin: 0;
  }

  div {
    overflow-x: hidden;
  }
`

const MainContainer = styled.div`
  position: relative;

`

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

  a {
    margin-right: ${SIZES.HEADER_INNER_MARGIN.css};
  }

  a, button {
    padding: ${SIZES.HEADER_BUTTON_PADDING.css};
  }

  svg {
    height: ${SIZES.HEADER_BARS_HEIGHT.css};
    color: ${toggleStyle('$isAbout', 'white', COLORS.BROWN)};;
    justify-self: flex-start;
  }
`

const RightSideNavContainer = styled.div`
  height: fit-content;
  ${mixins.flex('initial', 'flex-end')}
  flex-grow: 999;

  div a {
    margin-right: 0;
  }
`

export default Mobile