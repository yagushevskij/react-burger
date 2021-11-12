import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css'
import useInput from '../../services/customHooks/useInput'
import usePrivatePass from '../../services/customHooks/usePrivatePass'

const Register = () => {
  const { data, handleInputChange } = useInput()
  const { email = '', password = '', name = '' } = data
  const {inputData, onIconClick, inputRef} = usePrivatePass()

  return (
    <section className={`${styles.main} text text_type_main-default`}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={`${styles.form} mt-6`}>
        <div className={styles.inputs}>
        <Input
            type={'name'}
            placeholder={'Имя'}
            onChange={event => handleInputChange(event)}
            name={'name'}
            error={false}
            size={'default'}
            value={name}
            errorText={'Ошибка'}
          />
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={`${styles.line} mt-20`}>
        <p className={`text text_type_main-default text_color_inactive mr-2`}>Уже зарегистрированы?</p>
        <Link className={styles.line} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  )
}

export default Register
