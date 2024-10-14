import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
import { FONT_SIZES_RESPONSIVE, SIZES } from '../../constants/stylesConstants'
import useIsAbout from '../../hooks/useIsAbout'
import Size from '../../utils/helpers/size'
import mixins from '../../utils/mixins'
import { styleIf } from '../../utils/styleUtils'
import About from '../about/about'
import MenuDesktop from '../common/header/menuDesktop'
import IndexDesktop from '../indices/indexDesktop'
import Home from './home'

const Desktop = ({ mixedViewIndex, handleIndexRowClick }) => {
  const [isOrdered, setIsOrdered] = useState(false)
  const [memoizedNodeData, setMemoizedNodeData] = useState(Array(2))
  const isAbout = useIsAbout()

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
      <DeviceStyle $isAbout={isAbout} />
      <MainContainer $isAbout={isAbout}>
        <MenuDesktop
          isOrdered={isOrdered}
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
                  handleMemoizeNodeData={nodeData => handleMemoizeNodeData(i, nodeData)}
                  handleFragmentScroll={() => onIndexRowClick()} />
              } />
          )}
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to={`/${views.text.url}`} replace />} />
        </Routes>
        {!isAbout && <IndexDesktop onRowClick={onIndexRowClick} />}
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
    ${styleIf('$isAbout', SIZES.PAGE_MARGIN_DESKTOP.css, SIZES.PAGE_MARGIN_DESKTOP.add(Size.subFromFullWidth(SIZES.CLOSED_INDEX_LEFT_VALUE)).css)}
    0
    ${SIZES.PAGE_MARGIN_DESKTOP.css};
`


export default Desktop