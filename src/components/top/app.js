import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import _ from 'lodash'
import { useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
import { FONT_FAMILIES, FONT_SIZES, SIZES } from '../../constants/stylesConstants'
import useIsMobile from '../../hooks/useIsMobile'
import Header from '../common/header/header'
import Desktop from './desktop'
import Mobile from './mobile'

gsap.registerPlugin(useGSAP)

const App = () => {
  const [mixedViewIndex, setMixedViewIndex] = useState()
  const isMobile = useIsMobile()
  const Device = isMobile ? Mobile : Desktop

  const handleIndexRowClick = (i, navigate = _.noop) => {
    setMixedViewIndex(i)
    navigate(views.mixed.url)
  }

  return (
    <HashRouter>
      <GlobalStyle />
      <Device
        mixedViewIndex={mixedViewIndex}
        onSetMixedViewIndex={setMixedViewIndex}
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
