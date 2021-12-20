import { useState, useEffect, useCallback } from 'react'

const useContainerHeight = (ref: React.RefObject<HTMLDivElement>): number[] => {
  const [height, setHeight] = useState<number>(0)

  const getHeight = useCallback(() => {
    const windowHeight = window.innerHeight
    const containerOffsetTop = ref.current?.offsetTop
    if (containerOffsetTop) {
      return windowHeight - containerOffsetTop
    }
    return 0
  }, [ref])

  useEffect(() => {
    setHeight(getHeight())
  }, [getHeight])

  return [height]
}

export default useContainerHeight
