import { useRef } from 'react'
import useImagesLoaded from '../../hooks/useImagesLoaded'
import Figure from '../common/img/figure'
import Citation from '../common/text/citation'
import ProjectCitation from '../common/text/projectCitation'

const VisualEssayImg = ({ data, color }) => {
  const { nodeData, top, width, left, alignBottom, } = data
  const { proportions } = useImagesLoaded(nodeData.imgLink)
  const imgRef = useRef()

  return (
    <Citation
      color={color}
      footnote={<ProjectCitation {...nodeData} />}
      imgRef={imgRef}>
      <Figure
        ref={imgRef}
        nodeData={nodeData}
        width={width}
        style={{
          left,
          top: alignBottom ? `calc(${top}px - ${width} * ${proportions?.[0] ?? 1})` : top,
        }}
        color={color}
        noFade />
    </Citation>
  )
}

export default VisualEssayImg