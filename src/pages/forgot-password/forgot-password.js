import styles from './forgot-password.module.css'
import useInput from '../../services/customHooks/useInput'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import AuthForm from '../../components/auth-form/auth-form'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restorePass } from '../../services/actions/thunk/restore-pass'
import { Navigate } from 'react-router-dom'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { success: isRequestSuccess, request: isRequest } = useSelector(state => state.restorePass)
  const { data, handleInputChange } = useInput()
  const { email = '' } = data

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      dispatch(restorePass(data))
    },
    [data, dispatch]
  )

  return isRequestSuccess ? (
    <Navigate replace to={'/reset-password'} />
  ) : (
    <section className={`${styles.main} text text_type_main-default`}>
      <AuthForm title='Восстановление пароля' buttonText='Восстановить' onSubmit={onSubmit}>
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
      <div className={`${styles.line} mt-20`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</p>
        <Link className={styles.line} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  )
}

export default ForgotPassword
