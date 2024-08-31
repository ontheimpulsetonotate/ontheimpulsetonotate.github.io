import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FRAGMENT_TYPES } from '../../constants/apiConstants'
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
    const section = container?.querySelector(`#${FRAGMENT_ID_PREFIX}${fragmentIndex + 1}`)
    if (!section) return
    const { top } = section.getBoundingClientRect()
    container.scrollBy({ top, behavior: 'smooth' })
    handleFragmentScroll()
  }, [fragmentIndex])

  useEffect(() => addEventListener(containerRef.current, 'scroll', () =>
    setContainerY(containerRef.current.scrollTop)
  ), [])

  // TODO: memoize?
  const renderTexts = () => {
    let isLeft = false

    return apiServices.mixedData
      .flat()
      .filter(node => Array.isArray(node) ? node.length : node?.text)
      .map((nodeData, i) =>
        arrayify(nodeData)
          .map(({ sectionTitle, type, imgNum, ...rest }, ii) => {
            const data = apiServices.getNodeByTitle(sectionTitle)
            if (data.map(data => data.imgLink).filter(l => l).length)
              isLeft = !isLeft
            const isInterview = type === FRAGMENT_TYPES.INTERVIEW
            return <MixedViewSection
              {...rest}
              key={`${i}-${ii}`}
              index={isInterview ? parseInt(imgNum) : i} // TODO
              interviewIndex={isInterview ? ii : undefined}
              type={
                isInterview ?
                  FRAGMENT_TYPES.INTERVIEW :
                  FRAGMENT_TYPES.TEXT
              }
              sectionTitle={sectionTitle}
              data={isInterview ? [data[ii]] : data}
              containerY={containerY}
              isLeft={isLeft} />
          })
      )
  }

  return (
    <Container ref={containerRef}>
      {renderTexts()}
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
