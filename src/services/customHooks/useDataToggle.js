import { useRef, useEffect } from 'react'

const useDataToggle = (currData, direction) => {
  const prevDataRef = useRef()

  useEffect(() => {
    prevDataRef.current = currData
  })
  const prevData = prevDataRef.current

  console.log({prevData, currData})

  const isToggled = direction ? (!!prevData === false && !!currData === true) : (!!prevData === true && !!currData === false) 

  return [isToggled]
}

export default useDataToggle
