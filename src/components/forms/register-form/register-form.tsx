import Input from '../../input/input'
import AuthForm from '../auth-form'
import useInput from '../../../services/custom-hooks/use-input'
import { register } from '../../../services/actions/thunk/auth'

import { useCallback } from 'react'
import type { TOnSubmitCallback } from '../../../utils/types'
import { useAppSelector, useAppDispatch } from '../../../services/custom-hooks/redux-hooks'
import type { IRegisterData } from '../../../services/actions/thunk/auth'

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const isRequest = useAppSelector(state => state.auth.request)
  const { data, handleInputChange } = useInput<IRegisterData>({ email: '', password: '', name: '' })
  const { email, password, name } = data

  const onSubmit = useCallback<TOnSubmitCallback>(
    event => {
      event.preventDefault()
      dispatch(register(data))
    },
    [data, dispatch]
  )

  return (
    <AuthForm onSubmit={onSubmit} title='Регистрация' buttonText={'Зарегистрироваться'} isButtonDisabled={isRequest}>
      <>
        <Input type={'text'} placeholder={'Имя'} onChange={event => handleInputChange(event)} name={'name'} error={false} size={'default'} value={name} errorText={'Ошибка'} />
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
        <Input
          type='password'
          placeholder={'Пароль'}
          onChange={event => handleInputChange(event)}
          name={'password'}
          error={false}
          size={'default'}
          value={password}
          errorText={'Ошибка'}
        />
      </>
    </AuthForm>
  )
}

export default RegisterForm
