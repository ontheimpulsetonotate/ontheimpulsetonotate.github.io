import _ from 'lodash'
import { SIZES } from '../../constants/stylesConstants'
import dataServices from '../../services/dataServices'
import DragContainer from '../common/containers/dragContainer'
import Text from '../common/text/text'

const TextView = ({ isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const { w, h } = SIZES.getTextContainerSize()
  return (
    <DragContainer
      contents={dataServices.textData.map(ref => _.pick(ref, ['text', 'sectionTitle']))}
      elemW={w}
      elemH={h}
      element={Text}
      isOrdered={undefined}
      memoizedNodeData={memoizedNodeData}
      handleMemoizeNodeData={handleMemoizeNodeData} />
  )
}


export default TextView