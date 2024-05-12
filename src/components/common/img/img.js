import { useEffect, useState } from 'react'
import { COLORS, SIZES, } from '../../../constants/stylesConstants'
import Figure from './figure'
import { getOrderedData } from '../../../utils/sizeUtils'
import { useWindowSize } from '@uidotdev/usehooks'
import DraggableContainer from '../containers/draggableContainer'


const Img = ({ imgNum, imgLink, ...rest }) => {
  const { index, isOrdered } = rest
  const [orderedPosition, setOrderedPosition] = useState()
  const [isHovering, setIsHovering] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    if (!isOrdered) return setOrderedPosition()

    const { colCount, rowHeight, gap, leftMargin, topMargin } = getOrderedData()
    setOrderedPosition({
      x: index % colCount * (SIZES.getImgMaxSize() + gap) + leftMargin,
      y: Math.floor(index / colCount) * (rowHeight + gap) + topMargin
    })
  }, [isOrdered, index, width])


  return (
    <DraggableContainer
      {...rest}
      orderedPosition={orderedPosition}
      isHovering={isHovering}
      handleHover={setIsHovering}
      render={props => (
        <Figure
          {...props}
          backgroundColor={COLORS.BROWN}
          src={imgLink}
          maxSize={SIZES.IMG_MAX_SIZE}
          imgNum={imgNum} />
      )} />
  )
}

export default Img