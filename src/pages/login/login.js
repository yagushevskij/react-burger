import styles from './login.module.css'
import useInput from '../../services/customHooks/useInput'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import usePrivatePass from '../../services/customHooks/usePrivatePass'


const Login = () => {
  const { data, handleInputChange } = useInput()
  const { email = '', password = '' } = data
  const {inputData, onIconClick, inputRef} = usePrivatePass()

  return (
    <section className={`${styles.main} text text_type_main-default`}>
      <h1 className={styles.title}>Вход</h1>
      <form className={`${styles.form} mt-6`}>
        <div className={styles.inputs}>
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
        </div>
        <div className='mt-6'>
          <Button type='primary' size='medium'>
            Войти
          </Button>
        </div>
      </form>
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
