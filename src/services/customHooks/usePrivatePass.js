import { useRef, useState } from "react"

const usePrivatePass = () => {
  const inputRef = useRef(null)
  const [inputData, setData] = useState({ icon: 'ShowIcon', type: 'password' })
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    inputData.type === 'password' && setData({ icon: 'HideIcon', type: 'text' })
    inputData.type === 'text' && setData({ icon: 'ShowIcon', type: 'password' })
  }
  return {inputData, onIconClick, inputRef}
}

export default usePrivatePass
