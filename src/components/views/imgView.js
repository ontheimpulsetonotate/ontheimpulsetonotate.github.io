import _ from 'lodash'
import { SIZES } from '../../constants/stylesConstants'
import dataServices from '../../services/dataServices'
import { getOrderedData } from '../../utils/sizeUtils'
import DragContainer from '../common/containers/dragContainer'
import Img from '../common/img/img'


const refWithImg = dataServices.parsedData.filter(({ imgLink }) => imgLink)
const ImgView = ({ isOrdered }) => {
  const imgSize = SIZES.getImgMaxSize()

  const handleOrder = index => {
    const { colCount, rowHeight, gap, leftMargin, topMargin } = getOrderedData()
    return {
      x: index % colCount * (SIZES.getImgMaxSize() + gap) + leftMargin,
      y: Math.floor(index / colCount) * (rowHeight + gap) + topMargin
    }
  }

  return (
    <DragContainer
      contents={refWithImg.map(ref => _.pick(ref, ['imgLink', 'imgNum']))}
      elemW={imgSize}
      elemH={imgSize}
      isOrdered={isOrdered}
      element={Img}
      handleOrder={handleOrder} />
  )
}

export default ImgView