import _ from 'lodash'
import { SIZES } from '../../constants/stylesConstants'
import dataServices from '../../services/dataServices'
import DragContainer from '../common/containers/dragContainer'
import Text from '../common/text/text'

const TextView = ({ isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const { w, h } = SIZES.getTextContainerSize()
  return (
    <DragContainer
      contents={
        _.shuffle(dataServices.allData
          .filter(({ text }) => text)
          .map(ref => _.pick(ref, ['text', 'sectionTitle', 'type'])))
      }
      elemW={w}
      elemH={h}
      element={Text}
      isOrdered={undefined}
      memoizedNodeData={memoizedNodeData}
      handleMemoizeNodeData={handleMemoizeNodeData} />
  )
}


export default TextView