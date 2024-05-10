import dataServices from '../../services/dataServices'
import DragContainer from '../common/containers/dragContainer'
import Img from '../common/img/img'


const refWithImg = dataServices.parsedData.filter(({ imgLink }) => imgLink)
const ImgView = ({ isOrdered }) => {
  return (
    <DragContainer
      contents={refWithImg}
      isOrdered={isOrdered}
      element={Img} />
  )
}

export default ImgView