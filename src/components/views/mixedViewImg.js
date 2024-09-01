import { useEffect, useRef, useState } from 'react'
import { COLORS, SIZES } from '../../constants/stylesConstants'
import useImagesLoaded from '../../hooks/useImagesLoaded'
import { vh } from '../../utils/styleUtils'
import Figure from '../common/img/figure'
import Citation from '../common/text/citation'
import ProjectCitation from '../common/text/projectCitation'

const MixedViewImg = ({ nodeData, containerY }) => {


  const { imgLink, isInterview } = nodeData
  const imgRef = useRef()
  const [isShowing, setIsShowing] = useState(false)
  const { loaded } = useImagesLoaded(imgLink)

  useEffect(() => {
    const { top } = imgRef.current.getBoundingClientRect()
    if (top <= vh(60)) setIsShowing(true)
    else setIsShowing(false)
  }, [containerY])

  const opacity = isShowing && loaded ? 1 : 0

  return (
    <Citation
      color={isInterview ? COLORS.BLUE : COLORS.BROWN}
      footnote={opacity ? <ProjectCitation {...nodeData} /> : null}
      imgRef={imgRef}>
      <Figure
        style={{ opacity }}
        nodeData={nodeData}
        ref={imgRef}
        maxSize={SIZES.MIXED_VIEW_FIGURUE_SIZE}
        bracketNumbers />
    </Citation>
  )
}


export default MixedViewImg