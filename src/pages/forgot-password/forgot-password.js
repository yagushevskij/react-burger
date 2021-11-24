import styles from './forgot-password.module.css'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ForgotPasswordForm from '../../components/forgot-password-form/forgot-password-form'
import { SET_INIT_STATE_RESTORE_PASS } from '../../services/actions/restore-pass'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isRequestSuccess = useSelector(state => state.restorePass.success)

  useEffect(() => {
    return () => {
      dispatch({ type: SET_INIT_STATE_RESTORE_PASS })
    }
  }, [dispatch])

  if (isRequestSuccess) {
    return <Navigate replace to={'/reset-password'} state={{ from: location }} />
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
