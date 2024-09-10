import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, FONT_SIZES_RESPONSIVE, SIZES } from '../../constants/stylesConstants'
import useIsAbout from '../../hooks/useIsAbout'
import Size from '../../utils/helpers/size'
import mixins from '../../utils/mixins'
import { toggleStyle } from '../../utils/styleUtils'
import About from '../about/about'
import AboutButton from '../about/aboutButton'
import Header from '../common/header'
import HeaderButton from '../common/headerButton'
import IndexDesktop from '../indices/indexDesktop'
import ImgView from '../views/imgView'
import MixedView from '../views/mixedview/mixedView'
import TextView from '../views/textView'
import Home from './home'

const Desktop = () => {
  const [mixedViewFragmentIndex, setMixedViewFragmentIndex] = useState()
  const [isOrdered, setIsOrdered] = useState(false)
  const isAbout = useIsAbout()
  const [memoizedNodeData, setMemoizedPositions] = useState(Array(2))

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => setIsOrdered(false), [location.pathname])

  const views = {
    text: { text: 'Text', component: TextView, url: 'text' },
    image: { text: 'Image', component: ImgView, url: 'image' },
    mixed: { text: 'Text+Image', component: MixedView, url: 'text-image' },
  }

  const handleIndexRowClick = i => {
    setMixedViewFragmentIndex(i)
    navigate(views.mixed.url)
  }

  const handleMemoizeNodeData = (index, nodeData) =>
    setMemoizedPositions(prev => {
      const newPositions = [...prev]
      newPositions[index] = nodeData
      return newPositions
    })

  return (
    <>
      <GlobalStyle $isAbout={isAbout} />
      <MainContainer $isAbout={isAbout}>
        <HeaderContainer>
          <h1>
            <Link to={`/${views.text.url}`}>
              On the Impulse to Notate
            </Link>
          </h1>
          <menu>
            {Object.values(views).map(({ text, url }, i) =>
              <HeaderButton
                key={i}
                as={Link}
                to={`/${url}`}
                $underline={`/${url}` === location.pathname}>
                {text}
              </HeaderButton>
            )}
          </menu>
          <RightSideNavContainer>
            {
              !isAbout &&
              `/${views.mixed.url}` !== location.pathname &&
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
          {Object.values(views).map((data, i) =>
            <Route
              key={data.url}
              path={`/${data.url}`}
              element={
                <Home
                  view={data.component}
                  memoizedNodeData={memoizedNodeData[i]}
                  isOrdered={isOrdered}
                  mixedViewFragmentIndex={mixedViewFragmentIndex}
                  handleMemoizeNodeData={nodeData => handleMemoizeNodeData(i, nodeData)}
                  handleFragmentScroll={() => setMixedViewFragmentIndex()} />
              } />
          )}
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to={`/${views.text.url}`} replace />} />
        </Routes>
        {!isAbout && <IndexDesktop onRowClick={handleIndexRowClick} />}
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

  p {
    &, & button {
      ${mixins.dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.REGULAR })}
    }
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
    ${toggleStyle('$isAbout', SIZES.PAGE_MARGIN_DESKTOP.css, SIZES.PAGE_MARGIN_DESKTOP.add(Size.subFromFullWidth(SIZES.CLOSED_INDEX_LEFT_VALUE)).css)}
    0
    ${SIZES.PAGE_MARGIN_DESKTOP.css};
`

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

  a {
    margin-right: ${SIZES.HEADER_INNER_MARGIN.css};
  }

  :nth-child(3) {
    justify-self: end;
    margin-right: 0;
  }
`

const RightSideNavContainer = styled.div`
  ${mixins.flex('initial', 'flex-end')}
  flex-grow: 999;
  height: fit-content;
  div a {
    margin-right: 0;
  }
`

export default Desktop