import { Link } from 'react-router-dom'
import styles from './register.module.css'
import RegisterForm from '../../components/register-form/register-form'

const Register = () => {
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
