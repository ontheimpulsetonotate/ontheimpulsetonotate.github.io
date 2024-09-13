
import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { views } from '../../constants/reactConstants'
import useIsAbout from '../../hooks/useIsAbout'
import mixins from '../../utils/mixins'
import About from '../about/about'
import MenuMobile from '../common/header/menuMobile'
import IndexMobile from '../indices/indexMobile'
import MixedView from '../views/mixedview/mixedView'
import Home from './home'


const Mobile = ({ mixedViewIndex, handleIndexRowClick }) => {
  const [indexIsOpened, setIndexIsOpened] = useState(false)
  const isAbout = useIsAbout() && !indexIsOpened

  const handleClose = () => setIndexIsOpened(false)
  const navigate = useNavigate()
  const onIndexRowClick = index => handleIndexRowClick(index, navigate)
  return (
    <>
      <DeviceStyle $isAbout={isAbout} />
      <div>
        <MenuMobile
          indexIsOpened={indexIsOpened}
          onToggleIndex={newState => setIndexIsOpened(newState)} />
        <Routes>
          <Route path={`/${views.mixed.url}`} element={
            <Home
              view={MixedView}
              mixedViewFragmentIndex={mixedViewIndex}
              handleFragmentScroll={() => onIndexRowClick()} />
          } />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to={`/${views.mixed.url}`} replace />} />
        </Routes>
        {indexIsOpened && <IndexMobile onRowClick={onIndexRowClick} onClose={handleClose} />}
      </div >
    </>
  )
}


const DeviceStyle = createGlobalStyle`
  ${mixins.about}
  div {
    overflow-x: hidden;
  }
`


export default Mobile