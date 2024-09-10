
import { useRef } from 'react'
import useImagesLoaded from '../../../../hooks/useImagesLoaded'

import Figure from '../../../common/img/figure'
import Citation from '../../../common/text/citation'
import ProjectCitation from '../../../common/text/projectCitation'


const VisualEssayImg = ({ data, color }) => {
  const { nodeData, width, top, left, alignBottom, } = data
  const { proportions } = useImagesLoaded(nodeData.imgLink)
  const imgRef = useRef()

  return (
    <Citation
      color={color}
      footnote={<ProjectCitation {...nodeData} />}
      imgRef={imgRef}
      fixedSize>
      <Figure
        ref={imgRef}
        nodeData={nodeData}
        width={width.css}
        style={{
          left: left.css,
          top: alignBottom ?
            top.sub(width.mult(proportions?.[0] ?? 1)).css :
            top.css,
        }}
        color={color}
        noFade
        bracketNumbers />
    </Citation>
  )
}

export default VisualEssayImg