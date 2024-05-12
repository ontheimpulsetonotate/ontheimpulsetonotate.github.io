import styled from 'styled-components'
import dataServices from '../../services/dataServices'
import FullContainer from '../common/containers/fullContainer'
import MixedViewSection from './mixedViewSection'
import { remify } from '../../utils/styleUtils'
import { useEffect, useRef, useState } from 'react'
import { FRAGMENT_ID_PREFIX } from '../../constants/reactConstants'
import { addEventListener } from '../../utils/reactUtils'

const MixedView = ({ targetFragmentIndex, handleFragmentScroll }) => {
  const containerRef = useRef()
  const [containerY, setContainerY] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const section = container?.querySelector(`#${FRAGMENT_ID_PREFIX}${targetFragmentIndex + 1}`)
    if (!section) return
    const { top } = section.getBoundingClientRect()
    container.scrollBy({ top, behavior: 'smooth' })
    handleFragmentScroll()
  }, [targetFragmentIndex])

  useEffect(() => addEventListener(containerRef.current, 'scroll', () =>
    setContainerY(containerRef.current.scrollTop)
  ), [])

  const renderTexts = () => {
    let isLeft = false

    return dataServices.textData.map(({ text, sectionTitle, footnotes }, i) => {
      const imgData = dataServices.getImgsByTitle(sectionTitle)
      if (imgData.length) isLeft = !isLeft
      return (
        <MixedViewSection
          key={i}
          index={i}
          text={text}
          sectionTitle={sectionTitle}
          footnotes={footnotes}
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
      padding-bottom: ${remify(150)};
    }
  }
`


export default MixedView
