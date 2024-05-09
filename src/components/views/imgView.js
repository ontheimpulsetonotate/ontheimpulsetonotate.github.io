import dataServices from '../../services/dataServices'
import DragContainer from '../common/containers/dragContainer'
import Img from '../common/img/img'


const refWithImg = dataServices.parsedData.filter(({ imgLink }) => imgLink)
const ImgView = () => {
  return (
    <DragContainer contents={refWithImg} element={Img} />
  )
}

export default ImgView