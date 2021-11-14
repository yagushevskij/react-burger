import styles from './login.module.css'
import useInput from '../../services/customHooks/useInput'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import usePrivatePass from '../../services/customHooks/usePrivatePass'
import AuthForm from '../../components/auth-form/auth-form'

const Login = () => {
  const { data, handleInputChange } = useInput()
  const { email = '', password = '' } = data
  const { inputData, onIconClick, inputRef } = usePrivatePass()

  return (
    <section className={`${styles.main} text text_type_main-default`}>
      <AuthForm title='Вход' buttonText='Войти' onChange={''}>
        <>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={event => handleInputChange(event)}
            name={'email'}
            error={false}
            size={'default'}
            value={email}
            errorText={'Ошибка'}
          />
          <Input
            type={inputData.type}
            placeholder={'Пароль'}
            onChange={event => handleInputChange(event)}
            icon={inputData.icon}
            name={'password'}
            error={false}
            size={'default'}
            ref={inputRef}
            onIconClick={onIconClick}
            value={password}
            errorText={'Ошибка'}
          />
        </>
      </AuthForm>
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
