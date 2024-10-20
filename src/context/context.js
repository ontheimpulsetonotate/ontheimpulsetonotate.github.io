import { createContext } from 'react'
import _ from 'lodash'

const DesktopContext = createContext({
  getButtonHoverHandlers: _.noop,
  getCitationHoverHandlers: _.noop
})

export default DesktopContext