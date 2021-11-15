import AuthForm from "../auth-form/auth-form"
import Input from "../input/input"
import useInput from '../../services/customHooks/useInput'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restorePass } from '../../services/actions/thunk/restore-pass'

const ForgotPasswordForm = () => {
  const dispatch = useDispatch()
  const isRequest = useSelector(state => state.restorePass.request)
  const { data, handleInputChange } = useInput()
  const { email = '' } = data

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      dispatch(restorePass(data))
    },
    [data, dispatch]
  )
  return (
    <AuthForm title='Восстановление пароля' buttonText='Восстановить' onSubmit={onSubmit} isButtonDisabled={isRequest}>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        onChange={event => handleInputChange(event)}
        name={'email'}
        error={false}
        size={'default'}
        value={email}
        errorText={'Ошибка'}
      />
    </AuthForm>
  )
}

export default ForgotPasswordForm
