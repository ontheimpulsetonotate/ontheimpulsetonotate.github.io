import _ from 'lodash'
import { SIZES } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import DragContainer from '../common/containers/dragContainer'
import Text from '../common/text/text'
import { DATA_KEYS, FRAGMENT_TYPES } from '../../constants/apiConstants'

const TextView = ({ isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const { w, h } = SIZES.getTextContainerSize()
  return (
    <DragContainer
      contents={
        _.shuffle(apiServices.allData
          .filter(({ text, type }) => text && type !== FRAGMENT_TYPES.ORPHAN)
          .map(ref => _.pick(ref, [
            DATA_KEYS.TEXT,
            DATA_KEYS.SECTION_TITLE,
            DATA_KEYS.TYPE,
          ])))
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