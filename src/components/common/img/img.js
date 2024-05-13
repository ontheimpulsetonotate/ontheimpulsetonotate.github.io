import { useEffect } from 'react'
import { COLORS, SIZES } from '../../../constants/stylesConstants'
import useImagesLoaded from '../../../hooks/useImagesLoaded'
import Figure from './figure'


const Img = ({ imgLink, imgNum, onRender, ...props }) => {
  const isLoaded = useImagesLoaded(imgLink)
  useEffect(() => {
    if (isLoaded) onRender()
  }, [isLoaded])
  return (
    <Figure
      {...props}
      backgroundColor={COLORS.BROWN}
      src={imgLink}
      maxSize={SIZES.IMG_MAX_SIZE}
      imgNum={imgNum} />
  )

}

export default Img