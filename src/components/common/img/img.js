import { useMemo } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import { extractStyle, } from '../../../utils/styleUtils'
import { COLORS, SIZES } from '../../../constants/stylesConstants'
import mixins from '../../../utils/mixins'
import { randLocation } from '../../../utils/commonUtils'
import Figure from './figure'


const Img = ({ index, zIndex, imgNum, imgLink, handleClick }) => {
  const halfSize = SIZES.IMG_MAX_SIZE / 2
  const defaultPosition = useMemo(() =>
    randLocation(SIZES.getMainContainer(), {
      x: SIZES.IMG_MAX_SIZE,
      y: SIZES.IMG_MAX_SIZE
    }),
    []
  )

  return (
    <Draggable
      defaultPosition={{
        x: defaultPosition.x - halfSize,
        y: defaultPosition.y - halfSize
      }}
      onMouseDown={() => handleClick(index)}>
      <DraggableFigure backgroundColor={COLORS.BROWN} src={imgLink} maxSize='250px' imgNum={imgNum} $zIndex={zIndex} />
    </Draggable >
  )
}

const DraggableFigure = styled(Figure)`
  ${mixins.draggable}
  z-index: ${extractStyle('$zIndex')};

  div {
    pointer-events: none;
  }
`



export default Img