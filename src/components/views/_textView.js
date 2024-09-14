import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useMemo } from 'react'
import { SIZES_RESPONSIVE } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import { getTextContainerSize } from '../../utils/styleUtils'
import DragContainer from '../common/containers/dragContainer'
import Text from '../common/text/text'

const TextView = ({ isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const { width } = useWindowSize()
  const height = useMemo(getTextContainerSize, [width])

  return (
    <DragContainer
      contents={apiServices.textData}
      elemW={SIZES_RESPONSIVE.TEXT_WIDTH[0]}
      elemH={height}
      element={Text}
      isOrdered={undefined}
      memoizedNodeData={memoizedNodeData}
      handleMemoizeNodeData={handleMemoizeNodeData} />
  )
}


export default TextView