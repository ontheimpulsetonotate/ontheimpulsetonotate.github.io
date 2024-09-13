import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { VISUAL_ESSAY_IMG_NUM } from '../../../constants/apiConstants'
import { FRAGMENT_ID_PREFIX } from '../../../constants/reactConstants'
import { SIZES } from '../../../constants/stylesConstants'
import visualEssays from '../../../data/visualEssays'
import useIsMobile from '../../../hooks/useIsMobile'
import apiServices from '../../../services/apiServices'
import { quickArray } from '../../../utils/commonUtils'
import { addEventListener } from '../../../utils/reactUtils'
import FullContainer from '../../common/containers/fullContainer'
import MixedViewSection from './mixedViewSection'
import VisualEssay from './visualEssay/visualEssay'

const MixedView = ({ fragmentIndex, handleFragmentScroll }) => {
  const containerRef = useRef()
  const [containerY, setContainerY] = useState(0)
  const device = useIsMobile() ? 'mobile' : 'desktop'
  const [sectionHeights, setSectionHeights] = useState(
    new Array(apiServices.mixedData.length).fill(undefined)
  )

  useEffect(() => {
    const container = containerRef.current
    const section = container?.querySelector(`#${FRAGMENT_ID_PREFIX}${fragmentIndex}`)
    if (!section) return
    const { top } = section.getBoundingClientRect()
    container.scrollBy({ top, behavior: 'smooth' })
    handleFragmentScroll()
  }, [fragmentIndex])

  useEffect(() => addEventListener(containerRef.current, 'scroll', () =>
    setContainerY(containerRef.current.scrollTop)
  ), [])

  const mixedViewContent = useMemo(() => {
    let isLeft = false
    let willBeAfterVisualEssay = false
    return apiServices.mixedData.map((nodeData, i) => {
      const { imgNum, isImgNode, isInterview, isOrphan } = nodeData
      const hasVisualEssay = [
        VISUAL_ESSAY_IMG_NUM.BLUE_INSIGHTS,
        VISUAL_ESSAY_IMG_NUM.SURFACE_MANIPULATION
      ].includes(imgNum[0])
      if (isImgNode) isLeft = !isLeft

      const afterVisualEssay = willBeAfterVisualEssay
      willBeAfterVisualEssay = hasVisualEssay
      const isBlueInsights = imgNum[0] === VISUAL_ESSAY_IMG_NUM.BLUE_INSIGHTS

      const handleSetHeight = height => setSectionHeights(prev => {
        const newHeights = [...prev]
        newHeights[i] = height
        return newHeights
      })

      return (
        <React.Fragment key={i}>
          <MixedViewSection
            index={!isInterview && !isOrphan ? imgNum[0] : undefined}
            nodeData={nodeData}
            containerY={containerY}
            isLeft={isLeft}
            beforeVisualEssay={hasVisualEssay}
            afterVisualEssay={afterVisualEssay}
            sectionHeights={sectionHeights.slice(i, i + 3)}
            onSetHeight={handleSetHeight} />
          {hasVisualEssay &&
            <VisualEssay
              data={
                isBlueInsights ?
                  visualEssays.blueInsights[device] :
                  visualEssays.surfaceManipulation[device]}
              isBlueInsights={isBlueInsights} />}
        </React.Fragment>
      )
    })
  }, [sectionHeights, containerY])

  return (
    <Container ref={containerRef}>
      {mixedViewContent}
    </Container>
  )
}

const Container = styled(FullContainer)`
  overflow-y: scroll;

  > div:last-child  {
    > :nth-child(2) {
      padding-bottom: ${SIZES.MIXED_VIEW_PADDING_BOTTOM.mult(6).css};
    }
  }
`


export default MixedView
