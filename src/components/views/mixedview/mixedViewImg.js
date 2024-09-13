import { useEffect, useRef, useState } from 'react'
import { COLORS, SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import useImagesLoaded from '../../../hooks/useImagesLoaded'
import { getVh } from '../../../utils/sizeUtils'
import Figure from '../../common/img/figure'
import Citation from '../../common/text/citation'
import ProjectCitation from '../../common/text/projectCitation'
import useIsMobile from '../../../hooks/useIsMobile'

const MixedViewImg = ({ nodeData, containerY, onLoad }) => {
  const { imgLink, isInterview } = nodeData
  const imgRef = useRef()

  const isMobile = useIsMobile()
  const [isShowing, setIsShowing] = useState(false)
  const { loaded } = useImagesLoaded(imgLink)

  useEffect(() => {
    if (loaded) onLoad()
  }, [loaded])

  useEffect(() => {
    const { top } = imgRef.current.getBoundingClientRect()
    if (top <= getVh(60)) setIsShowing(true)
    else setIsShowing(false)
  }, [containerY])

  const opacity = (isShowing || isMobile) && loaded ? 1 : 0

  return (
    <Citation
      color={isInterview ? COLORS.BLUE : COLORS.BROWN}
      footnote={opacity ? <ProjectCitation {...nodeData} /> : null}
      imgRef={imgRef}>
      <Figure
        style={{ opacity: isMobile ? undefined : opacity }}
        nodeData={nodeData}
        width={isMobile ? '100%' : undefined}
        ref={imgRef}
        maxSize={isMobile ? undefined : SIZES_RESPONSIVE.MIXED_VIEW_FIGURUE_SIZE}
        bracketNumbers />
    </Citation>
  )
}


export default MixedViewImg