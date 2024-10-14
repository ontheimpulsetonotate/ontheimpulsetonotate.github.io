const Home = ({
  view: View,
  memoizedNodeData,
  isOrdered,
  aboutIsOpened,
  mixedViewFragmentIndex,
  handleFragmentScroll,
  handleMemoizeNodeData,
}) => {
  return <View
    isOrdered={isOrdered}
    aboutIsOpened={aboutIsOpened}
    memoizedNodeData={memoizedNodeData}
    fragmentIndex={mixedViewFragmentIndex}
    handleMemoizeNodeData={handleMemoizeNodeData}
    handleFragmentScroll={handleFragmentScroll} />
}

export default Home