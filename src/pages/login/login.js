import styles from './login.module.css'
import useInput from '../../services/customHooks/useInput'
import AppHeader from '../../components/app-header/app-header'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

const Login = () => {
  const inputRef = useRef(null)
  const [passInput, setPassInput] = useState({ icon: 'ShowIcon', type: 'password' })
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    passInput.type === 'password' && setPassInput({ icon: 'HideIcon', type: 'text' })
    passInput.type === 'text' && setPassInput({ icon: 'ShowIcon', type: 'password' })
  }
  const { data, handleInputChange } = useInput()
  const { email = '', password = '' } = data

  return (
    <>
      <AppHeader />
      <section className={`${styles.main} text text_type_main-default`}>
        <h1 className={styles.title}>Вход</h1>
        <form className={`${styles.form} mt-6`} action=''>
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
              type={passInput.type}
              placeholder={'Пароль'}
              onChange={event => handleInputChange(event)}
              icon={passInput.icon}
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
    </>
  )
}

export default Login
