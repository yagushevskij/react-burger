import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css'
import useInput from '../../services/customHooks/useInput'
import usePrivatePass from '../../services/customHooks/usePrivatePass'
import { register } from '../../services/actions/thunk/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import AuthForm from '../../components/auth-form/auth-form'

const Register = () => {
  const dispatch = useDispatch()
  const { data, handleInputChange } = useInput()
  const { email = '', password = '', name = '' } = data
  const { inputData, onIconClick, inputRef } = usePrivatePass()
  const user = useSelector(state => state.auth.user)

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      dispatch(register(data))
    },
    [data, dispatch]
  )

  console.log(new Date())

  if (user) return <Navigate to={'/'} />

  return (
    <section className={`${styles.main} text text_type_main-default`}>
      <AuthForm onSubmit={onSubmit} title='Регистрация' buttonText={'Зарегистрироваться'}>
        <>
          <Input type={'name'} placeholder={'Имя'} onChange={event => handleInputChange(event)} name={'name'} error={false} size={'default'} value={name} errorText={'Ошибка'} />
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
            type={inputData.type}
            placeholder={'Пароль'}
            onChange={event => handleInputChange(event)}
            icon={inputData.icon}
            name={'password'}
            error={false}
            size={'default'}
            ref={inputRef}
            onIconClick={onIconClick}
            value={password}
            errorText={'Ошибка'}
          />
        </>
      </AuthForm>
      <div className={`${styles.line} mt-20`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Уже зарегистрированы?</p>
        <Link className={styles.line} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  )
}

export default Register
