import dataServices from '../../services/dataServices'
import Text from '../common/text/text'
import DragContainer from '../common/containers/dragContainer'

const TextView = () => {
  return (
    <DragContainer contents={dataServices.textData} element={Text} />
  )
}


export default TextView