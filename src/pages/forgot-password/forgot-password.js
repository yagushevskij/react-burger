import styles from './forgot-password.module.css'
import useInput from '../../services/customHooks/useInput'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import AuthForm from '../../components/auth-form/auth-form'

const ForgotPassword = () => {
  const { data, handleInputChange } = useInput()
  const { email = '' } = data

  return (
    <section className={`${styles.main} text text_type_main-default`}>
      <AuthForm title='Восстановление пароля' buttonText='Восстановить' onChange={''}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={event => handleInputChange(event)}
          name={'email'}
          error={false}
          size={'default'}
          value={email}
          errorText={'Ошибка'}
        />
      </AuthForm>
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
