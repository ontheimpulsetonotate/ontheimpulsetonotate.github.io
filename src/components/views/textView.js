import dataServices from '../../services/dataServices'
import DragContainer from '../common/containers/dragContainer'
import { SIZES } from '../../constants/stylesConstants'
import Text from '../common/text/text'

const TextView = ({ isOrdered }) => {
  const { w, h } = SIZES.getTextContainerSize()
  return (
    <DragContainer
      contents={dataServices.textData}
      elemW={w}
      elemH={h}
      isOrdered={undefined}
      element={Text} />
  )
}


export default TextView