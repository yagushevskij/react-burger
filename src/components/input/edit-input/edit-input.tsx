import { FC, useState } from 'react'
import Input from '../input'
import type { TInputProps } from '../input'
import { IDisableHandleData } from '../../forms/profile-form/profile-form'

type TEditInputProps = Omit<TInputProps, 'onIconClick'> & { disableHandle: (data: IDisableHandleData) => void }

const EditInput: FC<TEditInputProps> = ({ disableHandle, disabled = true, name, ...props }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled)

  const onIconClick = () => {
    disableHandle({ [name]: !isDisabled })
    setIsDisabled(!isDisabled)
  }
  const icon = isDisabled ? 'EditIcon' : 'CloseIcon'
  const params = { name, disabled, icon, onIconClick, ...props }

  return <Input {...params} />
}

export default EditInput
