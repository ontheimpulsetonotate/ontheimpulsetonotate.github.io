import _ from 'lodash'
import { useEffect } from 'react'
import { COLORS, SIZES } from '../../../constants/stylesConstants'
import useImagesLoaded from '../../../hooks/useImagesLoaded'
import Figure from './figure'


const Img = ({ type, imgLink, imgNum, interviewPrefix, onRender, ...props }) => {
  const { loaded, proportions } = useImagesLoaded(imgLink)
  useEffect(() => {
    if (loaded) onRender(props.index, proportions[imgLink])
  }, [loaded])

  return (
    <Figure
      {..._.omit(props, [
        'onHover',
        'index',
        'onCollapse'
      ])}
      type={type}
      interviewPrefix={interviewPrefix}
      src={imgLink}
      width={SIZES.IMG_VIEW_FIGURE_SIZE}
      imgNum={imgNum}
      noCaption />
  )

}

export default Img