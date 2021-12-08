import { FC, useState } from 'react'
import Input from '../input'
import type { TInputProps } from '../input'

type TEditInputProps = Omit<TInputProps, 'onIconClick'>

const EditInput: FC<TEditInputProps> = ({ disabled = true, ...props }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled)

  const onIconClick = () => {
    setIsDisabled(!isDisabled)
  }
  const icon = isDisabled ? 'EditIcon' : 'CloseIcon'
  const params = { disabled: isDisabled, icon, onIconClick, ...props }

  return <Input {...params} />
}

export default EditInput
