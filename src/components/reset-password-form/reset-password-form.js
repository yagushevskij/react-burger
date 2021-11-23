import useInput from '../../services/customHooks/useInput'
import Input from '../input/input'
import AuthForm from '../../components/auth-form/auth-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetPass } from '../../services/actions/thunk/reset-pass'
import { useCallback } from 'react'

const ResetPasswordForm = () => {
  const dispatch = useDispatch()
  const isRequest = useSelector(state => state.resetPass.request)
  const { data, handleInputChange } = useInput()
  const { token = '', password = '' } = data

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      dispatch(resetPass(data))
    },
    [data, dispatch]
  )
  return (
    <AuthForm title='Восстановление пароля' buttonText='Восстановить' onSubmit={onSubmit} isButtonDisabled={isRequest}>
      <>
        <Input
          type={'password'}
          subType={'password'}
          placeholder={'Введите новый пароль'}
          onChange={event => handleInputChange(event)}
          name={'password'}
          error={false}
          size={'default'}
          value={password}
          errorText={'Ошибка'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={event => handleInputChange(event)}
          name={'token'}
          error={false}
          size={'default'}
          value={token}
          errorText={'Ошибка'}
        />
      </>
    </AuthForm>
  )
}

export default ResetPasswordForm
