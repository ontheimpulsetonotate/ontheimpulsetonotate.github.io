import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { HashRouter } from 'react-router-dom'

import Main from './main'

gsap.registerPlugin(useGSAP)

const App = () => {

  return (
    <HashRouter>
      <Main />
    </HashRouter>
  )
}



export default App
