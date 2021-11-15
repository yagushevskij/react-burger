import styles from './reset-password.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import ResetPasswordForm from '../../components/reset-password-form/reset-password-form'

const ResetPassword = () => {
  const isRequestSuccess = useSelector(state => state.resetPass.success)

  if (isRequestSuccess) {
    return <Navigate replace to={'/'} />
  }

  return (
    <section className={`${styles.main} text text_type_main-default`}>
        <ResetPasswordForm />
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
