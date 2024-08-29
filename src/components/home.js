const Home = ({
  view: View,
  memoizedNodeData,
  isOrdered,
  mixedViewFragmentIndex,
  handleFragmentScroll,
  handleMemoizeNodeData,
}) => {
  return <View
    isOrdered={isOrdered}
    memoizedNodeData={memoizedNodeData}
    fragmentIndex={mixedViewFragmentIndex}
    handleMemoizeNodeData={handleMemoizeNodeData}
    handleFragmentScroll={handleFragmentScroll} />
}

export default Home