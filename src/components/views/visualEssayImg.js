import { useWindowSize } from '@uidotdev/usehooks'
import { useMemo, useRef } from 'react'
import useImagesLoaded from '../../hooks/useImagesLoaded'
import { getVw } from '../../utils/sizeUtils'
import Figure from '../common/img/figure'
import Citation from '../common/text/citation'
import ProjectCitation from '../common/text/projectCitation'

const VisualEssayImg = ({ data, color }) => {
  const { width: vw } = useWindowSize()
  const { nodeData, width, left, alignBottom, } = data
  const top = useMemo(() => Math.max(data.top - 990, 0) * getVw() / 1512, [vw]) // TODO
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