import { SIZES } from '../../constants/stylesConstants'
import dataServices from '../../services/dataServices'
import Node from '../common/containers/node'
import Img from '../common/img/img'


const refWithImg = dataServices.parsedData.filter(({ imgLink }) => imgLink)
const ImgView = ({ isOrdered }) => {
  const imgSize = SIZES.getImgMaxSize()
  return (
    <Node
      contents={refWithImg}
      elemW={imgSize}
      elemH={imgSize}
      isOrdered={isOrdered}
      element={Img} />
  )
}

export default ImgView