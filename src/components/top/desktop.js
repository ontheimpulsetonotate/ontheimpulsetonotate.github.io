import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
import { FONT_SIZES_RESPONSIVE, SIZES } from '../../constants/stylesConstants'
import Size from '../../utils/helpers/size'
import mixins from '../../utils/mixins'
import { styleIf } from '../../utils/styleUtils'
import About from '../about/about'
import MenuDesktop from '../common/header/menuDesktop'
import IndexDesktop from '../indices/indexDesktop'
import Home from './home'

const Desktop = ({
  aboutIsOpened,
  mixedViewIndex,
  isInBlueInsights,
  handleBlueInsightsIntersect,
  handleIndexRowClick,
  handleAboutToggle
}) => {
  const [isOrdered, setIsOrdered] = useState(false)
  const [memoizedNodeData, setMemoizedNodeData] = useState(Array(2))

  const location = useLocation()
  useEffect(() => setIsOrdered(false), [location.pathname])

  const handleMemoizeNodeData = (index, nodeData) =>
    setMemoizedNodeData(prev => {
      const newPositions = [...prev]
      newPositions[index] = nodeData
      return newPositions
    })

  const navigate = useNavigate()
  const onIndexRowClick = index => handleIndexRowClick(index, navigate)
  return (
    <>
      <DeviceStyle $isAbout={aboutIsOpened} />
      <MainContainer $aboutIsOpened={aboutIsOpened}>
        <MenuDesktop
          aboutIsOpened={aboutIsOpened}
          isOrdered={isOrdered}
          isInBlueInsights={isInBlueInsights}
          handleAboutToggle={handleAboutToggle}
          handleOrder={() => setIsOrdered(!isOrdered)} />
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
                  mixedViewFragmentIndex={mixedViewIndex}
                  handleBlueInsightsIntersect={handleBlueInsightsIntersect}
                  handleMemoizeNodeData={nodeData => handleMemoizeNodeData(i, nodeData)}
                  handleFragmentScroll={() => onIndexRowClick()} />
              } />
          )}
          <Route path='*' element={<Navigate to={`/${views.text.url}`} replace />} />
        </Routes>
        {aboutIsOpened && <About />}
        {!aboutIsOpened && <IndexDesktop onRowClick={onIndexRowClick} />}
      </MainContainer >
    </>
  )
}


const DeviceStyle = createGlobalStyle`
  ${mixins.about}
  p {
    &, & button {
      ${mixins.dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.REGULAR })}
    }
  }
`

const MainContainer = styled.div`
  margin:
    0
    ${styleIf('$aboutIsOpened', SIZES.PAGE_MARGIN_DESKTOP.css, SIZES.PAGE_MARGIN_DESKTOP.add(Size.subFromFullWidth(SIZES.CLOSED_INDEX_LEFT_VALUE)).css)}
    0
    ${SIZES.PAGE_MARGIN_DESKTOP.css};
`


export default Desktop