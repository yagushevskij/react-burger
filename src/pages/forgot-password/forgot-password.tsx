import styles from './forgot-password.module.css'
import { Link, useLocation, Navigate } from 'react-router-dom'

import { useEffect, FC } from 'react'
import ForgotPasswordForm from '../../components/forms/forgot-password-form/forgot-password-form'
import { restorePassActions } from '../../services/actions/restore-pass'
import { useAppSelector, useAppDispatch } from '../../services/custom-hooks/redux-hooks'

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isRequestSuccess = useAppSelector(state => state.restorePass.success)

  useEffect(() => {
    return () => {
      dispatch(restorePassActions.setInitState)
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
        <Link className={styles.line} to="/login">
          Войти
        </Link>
      </div>
    </section>
  )
}

export default ForgotPassword
