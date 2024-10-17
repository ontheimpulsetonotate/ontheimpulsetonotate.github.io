import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import _ from 'lodash'
import { useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
import { COLORS, FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS, SIZES } from '../../constants/stylesConstants'
import useIsMobile from '../../hooks/useIsMobile'
import Header from '../common/header/header'
import Desktop from './desktop'
import Mobile from './mobile'

gsap.registerPlugin(useGSAP)

const App = () => {
  const [mixedViewIndex, setMixedViewIndex] = useState()
  const isMobile = useIsMobile()
  const Device = isMobile ? Mobile : Desktop
  const [aboutIsOpened, setAboutIsOpened] = useState(false)
  const [isInBlueInsights, setIsInBlueInsights] = useState(false)

  const handleIndexRowClick = (i, navigate = _.noop) => {
    setMixedViewIndex(i)
    navigate(views.mixed.url)
  }

  return (
    <HashRouter>
      <GlobalStyle />
      <Device
        aboutIsOpened={aboutIsOpened}
        mixedViewIndex={mixedViewIndex}
        isInBlueInsights={isInBlueInsights}
        handleBlueInsightsIntersect={isIn => setIsInBlueInsights(isIn)}
        onSetMixedViewIndex={setMixedViewIndex}
        handleAboutToggle={shouldOpen => setAboutIsOpened(shouldOpen)}
        handleIndexRowClick={handleIndexRowClick} />
    </HashRouter>
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
    letter-spacing: 0.02em;
    color: ${COLORS.BROWN};
  }

  h1, h2, h3, ${Header} button, a {
    font-weight: ${FONT_WEIGHTS.BOLD};
    font-family: ${FONT_FAMILIES.APERCU};
    text-transform: uppercase;
  }

  a {
    text-decoration: inherit;
  }

  p {
    font-family: ${FONT_FAMILIES.BRADFORD};

    -webkit-hyphens: auto;
    -webkit-hyphenate-limit-before: 3;
    -webkit-hyphenate-limit-after: 3;
    -webkit-hyphenate-limit-chars: 5 3 3;
    -webkit-hyphenate-limit-lines: 2;
    -webkit-hyphenate-limit-last: always;
    -webkit-hyphenate-limit-zone: 8%;
    -moz-hyphens: auto;
    -moz-hyphenate-limit-chars: 5 3 3;
    -moz-hyphenate-limit-lines: 2;
    -moz-hyphenate-limit-last: always;
    -moz-hyphenate-limit-zone: 8%;
    -ms-hyphens: auto;
    -ms-hyphenate-limit-chars: 5 3 3;
    -ms-hyphenate-limit-lines: 2;
    -ms-hyphenate-limit-last: always;
    -ms-hyphenate-limit-zone: 8%;
    hyphens: auto;
    hyphenate-limit-chars: 5 3 3;
    hyphenate-limit-lines: 2;
    hyphenate-limit-last: always;
    hyphenate-limit-zone: 8%;
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

  > div {
    position: relative;
  }

  ${Header} {
    a {
      margin-right: ${SIZES.HEADER_INNER_MARGIN.css};
    }
  }
`


export default App
