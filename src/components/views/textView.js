import _ from 'lodash'
import { SIZES } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import DragContainer from '../common/containers/dragContainer'
import Text from '../common/text/text'
import { DATA_KEYS } from '../../constants/apiConstants'

const TextView = ({ isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const { w, h } = SIZES.getTextContainerSize()
  return (
    <DragContainer
      contents={apiServices.textData}
      elemW={w}
      elemH={h}
      element={Text}
      isOrdered={undefined}
      memoizedNodeData={memoizedNodeData}
      handleMemoizeNodeData={handleMemoizeNodeData} />
  )
}


export default TextView