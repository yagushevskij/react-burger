import { Input as InputLibraryElem } from '@ya.praktikum/react-developer-burger-ui-components'
import useInputDisabled from '../../services/customHooks/useEditInput'
import usePrivatePass from '../../services/customHooks/usePrivatePass'

const Input = ({ subType, toggleDisable, ...params }) => {
  const [onEditIconClick, editInputRef] = useInputDisabled()
  const [type, passIcon, onPassIconClick, passInputRef] = usePrivatePass()

  const toggleDisableHadle = () => {
    toggleDisable(params.name)
    onEditIconClick()
  }

  const editInputOptions = { icon: params.disabled ? 'EditIcon' : 'CloseIcon', ref: editInputRef, onIconClick: toggleDisableHadle }
  const passInputOptions = { type, icon: passIcon, ref: passInputRef, onIconClick: onPassIconClick }

  const options = subType === 'edit' ? { ...params, ...editInputOptions } : subType === 'password' ? { ...params, ...passInputOptions } : params


  return <InputLibraryElem {...options} />
}

export default Input
