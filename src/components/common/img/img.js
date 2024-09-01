import _ from 'lodash'
import { useEffect } from 'react'
import { SIZES } from '../../../constants/stylesConstants'
import useImagesLoaded from '../../../hooks/useImagesLoaded'
import Figure from './figure'


const Img = ({
  nodeData,
  id,
  index,
  onRender,
  onMouseOver,
  onMouseOut,
  isOrdered
}) => {
  const { imgLink } = nodeData
  const { loaded, proportions } = useImagesLoaded(imgLink)

  useEffect(() => {
    if (loaded) onRender(index, proportions)
  }, [loaded])

  return (
    <Figure
      id={id}
      nodeData={nodeData}
      src={imgLink}
      width={SIZES.IMG_VIEW_FIGURE_SIZE}
      noCaption={!isOrdered}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut} />
  )
}

export default Img