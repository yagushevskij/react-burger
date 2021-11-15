import styles from './forgot-password.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import ForgotPasswordForm from '../../components/forgot-password-form/forgot-password-form'

const ForgotPassword = () => {
  const isRequestSuccess = useSelector(state => state.restorePass.success)

  if (isRequestSuccess) {
    return <Navigate replace to={'/reset-password'} />
  }

  return (
    <section className={`${styles.main} text text_type_main-default`}>
        <ForgotPasswordForm />
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
