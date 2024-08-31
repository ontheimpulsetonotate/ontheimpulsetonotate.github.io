import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import { SIZES } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import { arrayify } from '../../utils/commonUtils'
import { addEventListener } from '../../utils/reactUtils'
import FullContainer from '../common/containers/fullContainer'
import MixedViewSection from './mixedViewSection'

const MixedView = ({ fragmentIndex, handleFragmentScroll }) => {
  const containerRef = useRef()
  const [containerY, setContainerY] = useState(0)

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
    return apiServices.mixedData.map((textOrInterviews, i) =>
      arrayify(textOrInterviews).map((nodeData, ii) => {
        const { imgNum, isImgNode, isInterview, isOrphan } = nodeData
        if (isImgNode) isLeft = !isLeft
        return <MixedViewSection
          key={`${i}-${ii}`}
          index={!isInterview && !isOrphan ? imgNum[0] : undefined}
          nodeData={nodeData}
          containerY={containerY}
          isLeft={isLeft} />
      })
    )
  }, [containerY])

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
      padding-bottom: ${SIZES.MIXED_VIEW_PADDING_BOTTOM};
    }
  }
`


export default MixedView
