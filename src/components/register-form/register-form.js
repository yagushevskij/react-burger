import Input from '../input/input'
import AuthForm from '../auth-form/auth-form'
import useInput from '../../services/customHooks/useInput'
import { register } from '../../services/actions/thunk/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const isRequest = useSelector(state => state.auth.request)
  const { data, handleInputChange } = useInput()
  const { email = '', password = '', name = '' } = data

  const onSubmit = useCallback(
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
          subType='password'
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
