import dataServices from '../../services/dataServices'
import Text from '../common/text/text'
import DragContainer from '../common/containers/dragContainer'
import { SIZES } from '../../constants/stylesConstants'

const TextView = () => {
  const { w, h } = SIZES.getTextContainerSize()
  return (
    <DragContainer
      contents={dataServices.textData}
      elemW={w}
      elemH={h}
      element={Text} />
  )
}


export default TextView