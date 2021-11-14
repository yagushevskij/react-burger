import styles from './reset-password.module.css'
import useInput from '../../services/customHooks/useInput'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import AuthForm from '../../components/auth-form/auth-form'
import usePrivatePass from '../../services/customHooks/usePrivatePass'
import { useDispatch, useSelector } from 'react-redux'
import { resetPass } from '../../services/actions/thunk/reset-pass'
import { Navigate } from 'react-router-dom'
import { useCallback } from 'react'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const { success: isRequestSuccess, request: isRequest } = useSelector(state => state.resetPass)
  const { data, handleInputChange } = useInput()
  const {code = '', password = '' } = data
  const { inputData, onIconClick, inputRef } = usePrivatePass()

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      dispatch(resetPass(data))
    },
    [data, dispatch]
  )

  return isRequestSuccess ? (
    <Navigate replace to={'/'} />
  ) : (
    <section className={`${styles.main} text text_type_main-default`}>
      <AuthForm title='Восстановление пароля' buttonText='Восстановить' onSubmit={onSubmit}>
        <>
        <Input
            type={inputData.type}
            placeholder={'Введите новый пароль'}
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
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={event => handleInputChange(event)}
            name={'code'}
            error={false}
            size={'default'}
            value={code}
            errorText={'Ошибка'}
          />
        </>
      </AuthForm>
      <div className={`${styles.line} mt-20`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</p>
        <Link className={styles.line} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  )
}

export default ResetPassword
