import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../constants/stylesConstants'
import useIsAbout from '../hooks/useIsAbout'
import mixins from '../utils/mixins'
import { toggleStyle } from '../utils/styleUtils'
import About from './about'
import AboutButton from './aboutButton'
import Header from './common/header'
import HeaderButton from './headerButton'
import Home from './home'
import IndexTab from './indexTab'
import ImgView from './views/imgView'
import MixedView from './views/mixedView'
import TextView from './views/textView'

const Main = () => {
  const [mode, setMode] = useState(2)
  const [mixedViewFragmentIndex, setMixedViewFragmentIndex] = useState()
  const [isOrdered, setIsOrdered] = useState(false)
  const isAbout = useIsAbout()

  useEffect(() => setIsOrdered(false), [mode])

  const menuButtons = [
    { text: 'Text', component: TextView },
    { text: 'Image', component: ImgView },
    { text: 'Text+Image', component: MixedView },
  ]

  const handleIndexRowClick = i => {
    setMixedViewFragmentIndex(i)
    setMode(2)
  }


  return (
    <>
      <GlobalStyle $isAbout={isAbout} />
      <MainContainer $isAbout={isAbout}>
        <HeaderContainer>
          <h1>
            <Link to='/' onClick={() => setMode(0)}>
              On the Impulse to Notate
            </Link>
          </h1>
          <menu>
            {menuButtons.map(({ text }, i) =>
              <HeaderButton
                key={i}
                as={Link}
                to='/'
                onClick={() => setMode(i)}
                $underline={i === mode}>
                {text}
              </HeaderButton>
            )}
          </menu>
          <RightSideNavContainer>
            {
              !isAbout && mode !== 2 &&
              <HeaderButton
                onClick={() => setIsOrdered(!isOrdered)}
                $underline={isOrdered}>
                Order
              </HeaderButton>
            }
            <AboutButton />
          </RightSideNavContainer>
        </HeaderContainer>
        <Routes>
          <Route path='/' element={
            <Home
              view={menuButtons[mode]?.component}
              mode={mode}
              isOrdered={isOrdered}
              mixedViewFragmentIndex={mixedViewFragmentIndex}
              handleFragmentScroll={() => setMixedViewFragmentIndex()}
              handleUnsetMode={() => setMode()} />
          } />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        {!isAbout && <IndexTab onRowClick={handleIndexRowClick} />}
      </MainContainer >
    </>
  )
}


const GlobalStyle = createGlobalStyle`
  h1, h2, h3, p, button, menu {
    margin: 0;
  }

  h1, h2, h3, button, a {
    line-height: ${FONT_SIZES.LEADING_S};
  }

  h1, h2, h3, p, button, a {
    color: ${toggleStyle('$isAbout', COLORS.LIGHT_BEIGE, COLORS.BROWN)};
  }

  h1, h2, h3, p, button, a {
    font-size: ${FONT_SIZES.REGULAR};
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
`

const MainContainer = styled.div`
  position: relative;
  margin:
    0
    ${toggleStyle('$isAbout', SIZES.PAGE_MARGIN, `calc(${SIZES.PAGE_MARGIN} + ${100 - SIZES.CLOSED_INDEX_LEFT_VALUE}vw)`)}
    0
    ${SIZES.PAGE_MARGIN};
`

const HeaderContainer = styled(Header)`
  ${mixins.highZIndex(1)}
  position: relative;
  display: grid;
  grid-template-columns: ${SIZES.HOME_BUTTON_WIDTH} 1fr 1fr;

  &, menu {
    pointer-events: none;
  }

  a, button {
    pointer-events: initial;
  }

  a {
    margin-right: ${SIZES.HEADER_INNER_MARGIN};
  }

  :nth-child(3) {
    justify-self: end;
    margin-right: 0;
  }
`

const RightSideNavContainer = styled.div`
  display: flex;
  height: fit-content;
  div a {
    margin-right: 0;
  }
`

export default Main