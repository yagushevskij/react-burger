import useInput from '../../../services/custom-hooks/use-input'
import Input from '../../input/input'
import PassInput from '../../input/pass-input/pass-input'
import AuthForm from '../auth-form/auth-form'

import { useCallback, FC } from 'react'
import { login } from '../../../services/actions/thunk/auth'
import { useAppSelector, useAppDispatch } from '../../../services/custom-hooks/redux-hooks'
import type { TOnSubmitCallback } from '../../../utils/types'
import type { ILoginData } from '../../../services/actions/thunk/auth'

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const { data, handleInputChange } = useInput<ILoginData>({ email: '', password: '' })
  const { email, password } = data
  const isRequest = useAppSelector(state => state.auth.request)

  const onSubmit = useCallback<TOnSubmitCallback>(
    event => {
      event.preventDefault()
      dispatch(login(data))
    },
    [data, dispatch]
  )
  return (
    <AuthForm title='Вход' buttonText='Войти' onSubmit={onSubmit} isButtonDisabled={isRequest}>
      <>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={event => handleInputChange(event)}
          name={'email'}
          error={false}
          size={'default'}
          value={email}
          errorText={'Ошибка'}
        />
        <PassInput placeholder={'Пароль'} onChange={event => handleInputChange(event)} name={'password'} error={false} size={'default'} value={password} errorText={'Ошибка'} />
      </>
    </AuthForm>
  )
}

export default LoginForm
