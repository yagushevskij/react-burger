import { useRef, useState } from 'react'

const useInputDisabled = () => {
  const inputRef = useRef(null)
  const [inputState, setInputState] = useState({ disabled: true, icon: 'EditIcon' })
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    if (inputState.disabled) {
      setInputState({ disabled: false, icon: 'CloseIcon' })
    } else {
      setInputState({ disabled: true, icon: 'EditIcon' })
    }
  }
  return [inputState.disabled, inputState.icon, onIconClick, inputRef]
}

export default useInputDisabled
