import { Input as InputLibraryElem } from '@ya.praktikum/react-developer-burger-ui-components'
import useInputDisabled from '../../services/customHooks/useInputDisabled'
import usePrivatePass from '../../services/customHooks/usePrivatePass'

const Input = ({ subType, ...params }) => {
  const [disabled, editIcon, onEditIconClick, editInputRef] = useInputDisabled()
  const [ type, passIcon, onPassIconClick, passInputRef ] = usePrivatePass()
  const editInputOptions = { disabled, icon: editIcon, ref: editInputRef, onIconClick: onEditIconClick }
  const passInputOptions = { type, icon: passIcon, ref: passInputRef, onIconClick: onPassIconClick }
  const options = subType === 'edit' ? { ...params, ...editInputOptions } : subType === 'password' ? { ...params, ...passInputOptions } : params
console.log({ type, icon: passIcon, ref: passInputRef, onIconClick: onPassIconClick })
  return <InputLibraryElem {...options} />
}

export default Input
