import { SIZES } from '../../constants/stylesConstants'
import dataServices from '../../services/dataServices'
import DragContainer from '../common/containers/dragContainer'
import Img from '../common/img/img'


const refWithImg = dataServices.parsedData.filter(({ imgLink }) => imgLink)
const ImgView = ({ isOrdered }) => {
  const imgSize = SIZES.getImgMaxSize()
  return (
    <DragContainer
      contents={refWithImg}
      elemW={imgSize}
      elemH={imgSize}
      isOrdered={isOrdered}
      element={Img} />
  )
}

export default ImgView