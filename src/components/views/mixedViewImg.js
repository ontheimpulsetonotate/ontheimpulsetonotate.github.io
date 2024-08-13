import { useEffect, useRef, useState } from 'react'
import { COLORS, SIZES } from '../../constants/stylesConstants'
import Figure from '../common/img/figure'
import { vh } from '../../utils/styleUtils'
import useImagesLoaded from '../../hooks/useImagesLoaded'

const MixedViewImg = ({ src, imgNum, containerY }) => {
  const imgRef = useRef()
  const [isShowing, setIsShowing] = useState(false)
  const { loaded } = useImagesLoaded(src)

  useEffect(() => {
    const { top } = imgRef.current.getBoundingClientRect()
    if (top <= vh(60)) setIsShowing(true)
    else setIsShowing(false)
  }, [containerY])

  return (
    <Figure
      style={{
        opacity: isShowing && loaded ? 1 : 0,
      }}
      ref={imgRef}
      backgroundColor={COLORS.BROWN}
      src={src}
      maxSize={SIZES.MIXED_VIEW_FIGURUE_SIZE}
      imgNum={imgNum}
      bracketNumbers />
  )
}

export default MixedViewImg