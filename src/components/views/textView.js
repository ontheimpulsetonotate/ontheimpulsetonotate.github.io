import dataServices from '../../services/dataServices'
import Text from '../common/text/text'
import Node from '../common/containers/node'
import { SIZES } from '../../constants/stylesConstants'

const TextView = ({ isOrdered }) => {
  const { w, h } = SIZES.getTextContainerSize()
  return (
    <Node
      contents={dataServices.textData}
      elemW={w}
      elemH={h}
      isOrdered={isOrdered}
      element={Text} />
  )
}


export default TextView