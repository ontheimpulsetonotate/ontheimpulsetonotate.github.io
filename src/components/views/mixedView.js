import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import { SIZES } from '../../constants/stylesConstants'
import dataServices from '../../services/dataServices'
import { stringsAreEqual } from '../../utils/commonUtils'
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

  const renderTexts = () => {
    let isLeft = false

    return dataServices.textData.map(({ sectionTitle, ...rest }, i) => {
      const data = dataServices.getNodeByTitle(sectionTitle)
      if (data.length) isLeft = !isLeft

      const associatedInterviews =
        dataServices.categorizedData.interview.filter(data =>
          stringsAreEqual(data.interview, sectionTitle))
      return (
        <React.Fragment key={i}>
          <MixedViewSection
            {...rest}
            index={i}
            type='main'
            sectionTitle={sectionTitle}
            data={data}
            containerY={containerY}
            isLeft={isLeft} />
          {
            associatedInterviews
              .map(({ interviewPrefix, imgNum, sectionTitle, ...rest }, ii) => {
                const data = dataServices.getNodeByTitle(sectionTitle)
                if (data.length) isLeft = !isLeft
                return <MixedViewSection
                  {...rest}
                  key={ii}
                  index={parseInt(imgNum)}
                  interviewIndex={ii}
                  type='interview'
                  sectionTitle={sectionTitle}
                  data={[data[ii]]}
                  containerY={containerY}
                  isLeft={isLeft} />
              })
          }
        </React.Fragment>
      )
    })
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
