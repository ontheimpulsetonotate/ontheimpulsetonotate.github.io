import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import { SIZES } from '../../constants/stylesConstants'
import dataServices from '../../services/dataServices'
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

    return dataServices.textData.map(({ text, sectionTitle, footnotes, pageNum }, i) => {
      const imgData = dataServices.getImgsByTitle(sectionTitle)
      if (imgData.length) isLeft = !isLeft
      return (
        <MixedViewSection
          key={i}
          index={i}
          text={text}
          sectionTitle={sectionTitle}
          footnotes={footnotes}
          pageNum={pageNum}
          imgData={imgData}
          containerY={containerY}
          isLeft={isLeft} />
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
