import useInput from '../../services/customHooks/useInput'
import Input from '../input/input'
import AuthForm from '../auth-form/auth-form'
import { useDispatch } from 'react-redux'
import { resetPass } from '../../services/actions/thunk/reset-pass'
import { useCallback, FC } from 'react'
import useAppSelector from '../../services/customHooks/useAppSelector'
import type { TOnSubmitCallback } from '../../utils/types'

const ResetPasswordForm: FC = () => {
  const dispatch = useDispatch()
  const isRequest = useAppSelector(state => state.resetPass.request)
  const { data, handleInputChange } = useInput({ token: '', password: '' })
  const { token, password } = data

  const onSubmit = useCallback<TOnSubmitCallback>(
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
