import styles from './login.module.css'
import { Link, Navigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import LoginForm from '../../components/login-form/login-form'

const Login = () => {
  const user = useSelector(state => state.auth.user)

  if (user) return <Navigate to={'/'} />

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
