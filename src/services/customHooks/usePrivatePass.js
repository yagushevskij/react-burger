import { useRef, useState } from 'react'

const usePrivatePass = () => {
  const inputRef = useRef(null)
  const [inputState, setInputState] = useState({ icon: 'ShowIcon', type: 'password' })
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    inputState.type === 'password' && setInputState({ icon: 'HideIcon', type: 'text' })
    inputState.type === 'text' && setInputState({ icon: 'ShowIcon', type: 'password' })
  }
  return [inputState.type, inputState.icon, onIconClick, inputRef]
}

export default usePrivatePass
