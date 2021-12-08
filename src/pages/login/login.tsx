import styles from './login.module.css'
import { Link, Navigate, useLocation } from 'react-router-dom'
import LoginForm from '../../components/login-form/login-form'
import { useSelector } from 'react-redux'
import useAppSelector from '../../services/customHooks/useAppSelector'
import { FC } from 'react'

const Login: FC = () => {
  const { data: user } = useAppSelector(state => state.user)
  const isAuth = Object.keys(user).length !== 0
  const state = useLocation().state

  if (isAuth) return <Navigate to={state?.from.pathname || '/'} />

  return (
    <section className={`${styles.main} text text_type_main-default`}>
      <LoginForm />
      <div className={`${styles.line} mt-20`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Вы — новый пользователь?</p>
        <Link className={styles.line} to='/register'>
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${styles.line} mt-4`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Забыли пароль?</p>
        <Link className={styles.line} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </div>
    </section>
  )
}

export default Login
