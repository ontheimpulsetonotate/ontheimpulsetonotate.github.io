import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { HashRouter } from 'react-router-dom'

import useIsMobile from '../../hooks/useIsMobile'
import Desktop from './desktop'
import Mobile from './mobile'

gsap.registerPlugin(useGSAP)

const App = () => {
  const isMobile = useIsMobile()
  return (
    <HashRouter>
      {isMobile ? <Mobile /> : <Desktop />}
    </HashRouter>
  )
}



export default App
