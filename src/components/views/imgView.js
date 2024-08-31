import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { SIZES } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import { quickArray } from '../../utils/commonUtils'
import { getOrderedData } from '../../utils/sizeUtils'
import DragContainer from '../common/containers/dragContainer'
import Img from '../common/img/img'


const ImgView = ({ isOrdered, memoizedNodeData, handleMemoizeNodeData }) => {
  const imgSize = SIZES.getImgViewFigureSize()
  const [proportions, setProportions] = useState(Array(apiServices.imgData.length))

  const { width } = useWindowSize()
  const { orderedPositions, scrollSize } = useMemo(() => {
    if (!isOrdered) return {}
    const { colCount, getRowHeight, gap, leftMargin, topMargin } = getOrderedData()
    let rows = _.chunk(proportions, colCount)
      .reduce((prev, curr, i) => {
        const nextY = getRowHeight(Math.max(...curr)) + gap + (prev[i - 1] ?? 0)
        prev.push(nextY)
        return prev
      }, [])

    rows.unshift(0)
    rows = rows.map(y => y + topMargin)

    const cols = quickArray(colCount)
      .map(col => col * (SIZES.getImgViewFigureSize() + gap) + leftMargin)

    return {
      orderedPositions: quickArray(proportions.length, i => ({
        x: cols[i % colCount],
        y: rows[Math.floor(i / colCount)],
      })),
      scrollSize: _.last(rows) - rows[0]
    }
  }, [isOrdered, width])


  const handleRender = (index, proportions) =>
    setProportions(prev => {
      const newState = [...prev]
      newState.splice(index, proportions.length, ...proportions)
      return newState
    })

  return (
    <DragContainer
      contents={apiServices.imgData}
      elemW={imgSize}
      elemH={imgSize}
      element={Img}
      isOrdered={isOrdered}
      memoizedNodeData={memoizedNodeData}
      orderedPositions={orderedPositions}
      scrollSize={scrollSize}
      handleRender={handleRender}
      handleMemoizeNodeData={handleMemoizeNodeData} />
  )
}

export default ImgView