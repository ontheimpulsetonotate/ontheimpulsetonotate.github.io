import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { VISUAL_ESSAY_IMG_NUM } from '../../../constants/apiConstants'
import { FRAGMENT_ID_PREFIX } from '../../../constants/reactConstants'
import { CLS_ID, SIZES } from '../../../constants/stylesConstants'
import visualEssays from '../../../data/visualEssays'
import useIsMobile from '../../../hooks/useIsMobile'
import { addEventListener, getScrolling } from '../../../utils/reactUtils'
import FullContainer from '../../common/containers/fullContainer'
import PopUpCitation from '../../common/text/popUpCitation'
import MixedViewSection from './mixedViewSection'
import VisualEssay from './visualEssay/visualEssay'

const MixedView = ({
  data,
  aboutIsOpened,
  fragmentIndex,
  handleBlueInsightsIntersect,
  handleFragmentScroll
}) => {
  const containerRef = useRef()
  const device = useIsMobile() ? 'mobile' : 'desktop'
  const [sectionHeights, setSectionHeights] = useState(
    new Array(data.mixed.length).fill(undefined)
  )
  const [citation, setCitation] = useState()
  const isMobile = useIsMobile()
  const memoizedScrollRef = useRef()

  useEffect(() => {
    if (aboutIsOpened) return
    if (memoizedScrollRef.current)
      document.documentElement.scrollTop = memoizedScrollRef.current
    return addEventListener(getScrolling(isMobile), 'scroll', () =>
      memoizedScrollRef.current = document.documentElement.scrollTop)
  }, [aboutIsOpened])

  useEffect(() => {
    const container = containerRef.current
    const section = container?.querySelector(`#${FRAGMENT_ID_PREFIX}${fragmentIndex}`)
    if (!section) return
    const { top } = section.getBoundingClientRect()
    if (isMobile) section.scrollIntoView({ behavior: 'smooth' })
    else container.scrollBy({ top, behavior: 'smooth' })
    handleFragmentScroll()
  }, [fragmentIndex])


  const mixedViewContent = useMemo(() => {
    let isLeft = false
    let willBeAfterVisualEssay = false
    return data.mixed.map((nodeData, i) => {
      const { imgNum, isImgNode, isInterview, isOrphan } = nodeData

      const hasVisualEssay = imgNum[0] === VISUAL_ESSAY_IMG_NUM.BLUE_INSIGHTS ||
        (isInterview && imgNum[0] === VISUAL_ESSAY_IMG_NUM.SURFACE_MANIPULATION)
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
            data={data}
            index={!isInterview && !isOrphan ? imgNum[0] : undefined}
            nodeData={nodeData}
            isLeft={isLeft}
            beforeVisualEssay={hasVisualEssay}
            afterVisualEssay={afterVisualEssay}
            sectionHeights={sectionHeights.slice(i, i + 3)}
            onSetHeight={handleSetHeight}
            onHoverCitation={citation => setCitation(citation)} />
          {hasVisualEssay && <VisualEssay
            data={data}
            sizeData={isBlueInsights ?
              visualEssays.blueInsights[device] :
              visualEssays.surfaceManipulation[device]}
            isBlueInsights={isBlueInsights}
            handleBlueInsightsIntersect={handleBlueInsightsIntersect} />}
        </React.Fragment>
      )
    })

  }, [sectionHeights])

  const Container = isMobile ? MobileContainer : DesktopContainer
  return (
    <Container
      ref={containerRef}
      id={CLS_ID.MAIN}
      style={{ display: isMobile && aboutIsOpened ? 'none' : '' }}>
      {mixedViewContent}
      <PopUpCitation {...citation} />
    </Container>
  )
}

const BasedContainer = styled(FullContainer)`
  > div:last-of-type  {
    > :nth-child(2) {
      padding-bottom: ${SIZES.MIXED_VIEW_PADDING_BOTTOM.mult(6).css};
    }
  }
`

const DesktopContainer = styled(BasedContainer)`
  overflow-y: scroll;
`

const MobileContainer = styled(BasedContainer)`
  overflow-y: hidden;
  height: fit-content;
  position: relative;
`

export default MixedView
