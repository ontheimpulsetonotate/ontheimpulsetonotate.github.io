import _ from 'lodash'
import { useEffect, useState } from 'react'


const useImagesLoaded = (...sources) => {
  const [loadedSources, setLoadedSources] = useState(new Set())
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    sources.forEach(src => {
      const img = document.createElement('img')

      img.onload = () => setLoadedSources(prev => new Set(prev).add(src))
      img.onerror = err => console.log(err, src)
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (loadedSources.size === _.uniq(sources).length)
      setAllLoaded(true)
  }, [sources, loadedSources])

  return allLoaded
}

export default useImagesLoaded