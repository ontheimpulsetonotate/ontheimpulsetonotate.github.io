import { useEffect, useRef, useState } from 'react'
import { COLORS, SIZES } from '../../constants/stylesConstants'
import useImagesLoaded from '../../hooks/useImagesLoaded'
import { vh } from '../../utils/styleUtils'
import Figure from '../common/img/figure'
import Citation from '../common/text/citation'
import ProjectCitation from '../common/text/projectCitation'

const MixedViewImg = ({ data, containerY }) => {
  const { imgLink, imgNum, artistFirstName, artistLastName, medium, workDetails, copyright } = data
  const imgRef = useRef()
  const [isShowing, setIsShowing] = useState(false)
  const { loaded } = useImagesLoaded(imgLink)

  useEffect(() => {
    const { top } = imgRef.current.getBoundingClientRect()
    if (top <= vh(60)) setIsShowing(true)
    else setIsShowing(false)
  }, [containerY])

  return (
    <Citation
      footnote={<ProjectCitation {...data} />}
      imgRef={imgRef}>
      <Figure
        style={{
          opacity: isShowing && loaded ? 1 : 0,
        }}
        ref={imgRef}
        backgroundColor={COLORS.BROWN}
        src={imgLink}
        maxSize={SIZES.MIXED_VIEW_FIGURUE_SIZE}
        imgNum={imgNum}
        bracketNumbers />
    </Citation>
  )
}


export default MixedViewImg