import styles from './reset-password.module.css'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, FC } from 'react'
import ResetPasswordForm from '../../components/reset-password-form/reset-password-form'
import { SET_INIT_STATE_RESET_PASS } from '../../services/actions/reset-pass'
import useAppSelector from '../../services/custom-hooks/use-app-selector'

const ResetPassword: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const state = location.state
  const isRequestSuccess = useAppSelector(state => state.resetPass.success)

  useEffect(() => {
    return () => {
      dispatch({ type: SET_INIT_STATE_RESET_PASS })
    }
  }, [dispatch])

  if (isRequestSuccess) {
    return <Navigate replace to={'/login'} />
  }
  if (state?.from.pathname !== '/forgot-password') {
    return <Navigate replace to={'/forgot-password'} />
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
