import { useRef } from 'react'

const useEditInput = () => {
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
  }
  return [onIconClick, inputRef]
}

export default useEditInput
