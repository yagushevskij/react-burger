import { FC, useState } from 'react'
import Input from '../input'
import type { TInputProps } from '../input'

type TPassInputProps = Omit<TInputProps, 'onIconClick'>
type TFieldType = 'password' | 'text'

const PassInput: FC<TPassInputProps> = ({ ...props }) => {
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const onIconClick = () => {
    setIsHidden(!isHidden)
  }
  const icon = isHidden ? 'ShowIcon' : 'HideIcon'
  const type: TFieldType = isHidden ? 'password' : 'text'
  const params = { icon, type, onIconClick, ...props }

  return <Input {...params} />
}

export default PassInput
