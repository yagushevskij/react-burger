import { Input as InputLibraryElem } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useRef } from 'react'

export type TInputProps = {
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  error?: boolean
  size: 'small' | 'default' | undefined
  value: string
  errorText?: string
  icon?: any
  onIconClick?: () => void
  disabled?: boolean
}

const Input: FC<TInputProps> = ({ onIconClick, ...props }) => {
  const ref = useRef<HTMLInputElement>(null)

  const onIconClickHandle = () => {
    setTimeout(() => ref.current?.focus(), 0)
    onIconClick && onIconClick()
  }

  const params = { ref, onIconClick: onIconClickHandle, ...props }

  return <InputLibraryElem {...params} />
}

export default Input
