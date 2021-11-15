import { Link } from 'react-router-dom'
import styles from './register.module.css'
import { Navigate } from 'react-router-dom'
import RegisterForm from '../../components/register-form/register-form'
import { useSelector } from 'react-redux'

const Register = () => {
  const user = useSelector(state => state.auth.user)

  if (user) return <Navigate to={'/'} />

  return (
    <section className={`${styles.main} text text_type_main-default`}>
      <RegisterForm />
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
