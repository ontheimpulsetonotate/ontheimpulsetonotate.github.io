import { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ImgView from './views/imgView'
import MixedView from './views/mixedView'
import TextView from './views/textView'
import IndexTab from './indexTab'
import Header from './common/header'
import { conditionalStyle, remify } from '../utils/styleUtils'
import mixins from '../utils/mixins'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../constants/stylesConstants'

gsap.registerPlugin(useGSAP)

const App = () => {
  const [mode, setMode] = useState(1)
  const [targetFragmentIndex, setTargetFragmentIndex] = useState()
  const [isOrdered, setIsOrdered] = useState(false)

  useEffect(() => setIsOrdered(false), [mode])

  const menuButtons = [
    { text: 'Text', component: TextView },
    { text: 'Image', component: ImgView },
    { text: 'Text+Image', component: MixedView },
  ]

  const handleIndexRowClick = i => {
    setTargetFragmentIndex(i)
    setMode(2)
  }

  const handleFragmentScroll = () => setTargetFragmentIndex()

  const View = menuButtons[mode].component
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <HeaderContainer>
          <h1>On the Impulse to Notate</h1>
          <menu>
            {menuButtons.map(({ text }, i) =>
              <HeaderButton
                key={i}
                onClick={() => setMode(i)}
                $underline={i === mode}>
                {text}
              </HeaderButton>
            )}
          </menu>
          {mode !== 2 &&
            <HeaderButton
              onClick={() => setIsOrdered(!isOrdered)}
              $underline={isOrdered}>
              Order
            </HeaderButton>}
        </HeaderContainer>
        <View
          isOrdered={isOrdered}
          targetFragmentIndex={targetFragmentIndex}
          handleFragmentScroll={handleFragmentScroll} />
        <IndexTab onRowClick={handleIndexRowClick} />
      </MainContainer >
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, p, button, menu {
    margin: 0;
  }

  h1, h2, h3, button,menu {
    line-height: ${FONT_SIZES.LEADING_S};
  }

  h1, h2, h3, p, button {
    color: ${COLORS.BROWN};
    font-size: ${FONT_SIZES.REGULAR};
    letter-spacing: 0.02em;
  }

  h1, h2, h3, ${Header} button {
    font-weight: 500;
    font-family: ${FONT_FAMILIES.APERCU};
    text-transform: uppercase;
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
  margin: 0 calc(${SIZES.PAGE_MARGIN} + ${100 - SIZES.OPENED_INDEX_LEFT_VALUE}vw) 0 ${SIZES.PAGE_MARGIN};
`

const HeaderContainer = styled(Header)`
  ${mixins.highZIndex(1)}
  position: relative;
  display: grid;
  grid-template-columns: ${remify(240)} 1fr 1fr;

  :nth-child(3) {
    justify-self: end;
  }

  menu {
    :not(:last-child) {
      margin-right: 0.75em;
    }
  }
`

const HeaderButton = styled.button`
  ${conditionalStyle('$underline', mixins.underline)};
`

export default App
