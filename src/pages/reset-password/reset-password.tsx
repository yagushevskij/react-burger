import styles from './reset-password.module.css'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useEffect, FC } from 'react'
import ResetPasswordForm from '../../components/forms/reset-password-form/reset-password-form'
import { resetPassActions } from '../../services/actions/reset-pass'
import { useAppSelector, useAppDispatch } from '../../services/custom-hooks/redux-hooks'

const ResetPassword: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const state = location.state
  const isRequestSuccess = useAppSelector(state => state.resetPass.success)

  useEffect(() => {
    return () => {
      dispatch(resetPassActions.setInitState)
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
        <Link className={styles.line} to="/login">
          Войти
        </Link>
      </div>
    </section>
  )
}

export default ResetPassword
