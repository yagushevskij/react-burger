import useInput from '../../services/customHooks/useInput'
import Input from '../input/input'
import AuthForm from '../../components/auth-form/auth-form'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { login } from '../../services/actions/thunk/auth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { data, handleInputChange } = useInput()
  const { email = '', password = '' } = data
  const isRequest = useSelector(state => state.auth.request)

  const onSubmit = useCallback(
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
        <Input
          type={'password'}
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

export default LoginForm
