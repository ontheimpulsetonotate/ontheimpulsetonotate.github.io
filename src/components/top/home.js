const Home = ({
  view: View,
  memoizedNodeData,
  isOrdered,
  aboutIsOpened,
  mixedViewFragmentIndex,
  handleBlueInsightsIntersect,
  handleFragmentScroll,
  handleMemoizeNodeData,
}) => {
  return <View
    isOrdered={isOrdered}
    aboutIsOpened={aboutIsOpened}
    memoizedNodeData={memoizedNodeData}
    fragmentIndex={mixedViewFragmentIndex}
    handleBlueInsightsIntersect={handleBlueInsightsIntersect}
    handleMemoizeNodeData={handleMemoizeNodeData}
    handleFragmentScroll={handleFragmentScroll} />
}

export default Home