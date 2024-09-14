import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SIZES_RESPONSIVE } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import { getOrderedData, getTextContainerSize, getTextViewSize } from '../../utils/styleUtils'
import DragContainer from '../common/containers/dragContainer'
import Text from '../common/text/text'
import { quickArray } from '../../utils/commonUtils'
import PopUpCitation from '../common/text/popUpCitation'



const TextView = ({ isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const { width } = useWindowSize()
  const height = useMemo(getTextContainerSize, [width])
  const containerRef = useRef()
  const [layoutShifted, setLayoutShifted] = useState()
  const [citation, setCitation] = useState()

  const { orderedPositions, scrollSize } = useMemo(() => {
    if (!isOrdered || !containerRef.current) return {}
    const { nodeWidth, colCount, gap, leftMargin, topMargin } = getOrderedData(false)
    const cols = quickArray(colCount)
      .map(col => col * (getTextViewSize() + gap) + leftMargin)

    const heights = Array
      .from(containerRef.current.querySelectorAll('.text-node')) // Bad practice but sue me
      .map(elem => {
        const { height, width } = elem.getBoundingClientRect()
        const transformFactor = width / nodeWidth
        return height / transformFactor
      })

    const colAccumulator = quickArray(colCount, _ => topMargin)
    const rows = heights.map((height, i) => {
      const col = i % colCount
      const top = colAccumulator[col]

      colAccumulator[col] += height + gap
      return top
    })

    setLayoutShifted(false)
    return {
      orderedPositions: quickArray(heights.length, i => ({
        i,
        x: cols[i % colCount],
        y: rows[i],
      })),
      scrollSize: Math.max(...colAccumulator)
    }
  }, [isOrdered, width, layoutShifted?.[0], layoutShifted?.[1]])

  useEffect(() => {
    if (!isOrdered) setLayoutShifted()
  }, [isOrdered])

  const handleLayoutShift = (index, isExpanded) => {
    if (isOrdered) setLayoutShifted([index, isExpanded])
  }

  const handleCitationOver = citation => setCitation(citation)

  return (
    <>
      <DragContainer
        ref={containerRef}
        contents={apiServices.textData}
        elemW={SIZES_RESPONSIVE.TEXT_WIDTH[0]}
        elemH={height}
        element={Text}
        isOrdered={isOrdered}
        memoizedNodeData={memoizedNodeData}
        orderedPositions={orderedPositions}
        scrollSize={scrollSize}
        handleLayoutShift={handleLayoutShift}
        handleCitationOver={handleCitationOver}
        handleMemoizeNodeData={handleMemoizeNodeData} />
      <PopUpCitation {...citation} />
    </>
  )
}


export default TextView