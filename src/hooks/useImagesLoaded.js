import _ from 'lodash'
import { useEffect, useState } from 'react'


const useImagesLoaded = (...sources) => {
  const [loadedSources, setLoadedSources] = useState(new Set())
  const [loaded, setLoaded] = useState(false)
  const [proportions, setProportions] = useState({})

  useEffect(() => {
    sources.forEach(src => {
      const img = document.createElement('img')

      img.onload = () => {
        setLoadedSources(prev => new Set(prev).add(src))
        setProportions(prev => ({ ...prev, [src]: img.height / img.width }))
      }
      img.onerror = err => console.log(err, src)
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (loadedSources.size === _.uniq(sources).length)
      setLoaded(true)
  }, [sources, loadedSources])

  return { loaded, proportions }
}

export default useImagesLoaded