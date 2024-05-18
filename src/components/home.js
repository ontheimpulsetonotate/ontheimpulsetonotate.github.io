import { useState } from 'react'
import AboutButton from './aboutButton'



const Home = ({
  view: View,
  mode,
  isOrdered,
  mixedViewFragmentIndex,
  handleFragmentScroll,
  handleUnsetMode
}) => {
  const [memoizedNodeData, setMemoizedPositions] = useState(Array(2))

  const handleMemoizeNodeData = nodeData =>
    setMemoizedPositions(prev => {
      const newPositions = [...prev]
      newPositions[mode] = nodeData
      return newPositions
    })

  return (
    <>
      <View
        isOrdered={isOrdered}
        memoizedNodeData={memoizedNodeData[mode]}
        fragmentIndex={mixedViewFragmentIndex}
        handleMemoizeNodeData={handleMemoizeNodeData}
        handleFragmentScroll={handleFragmentScroll} />
      <AboutButton onClick={handleUnsetMode} />
    </>
  )
}

export default Home