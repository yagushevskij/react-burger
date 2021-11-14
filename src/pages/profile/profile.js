import styles from './profile.module.css'
import { NavLink } from 'react-router-dom'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import useInput from '../../services/customHooks/useInput'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../services/actions/thunk/user'
import { useEffect } from 'react'

const navLinkStyle = ({ isActive }) => `${styles.link} text text_type_main-medium text_color_inactive ${isActive && styles.link_active}`

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [])
  const data = useSelector(state => state.user.data)
  const {name = '', email = ''} = data
  const { data: inputedData, handleInputChange } = useInput()
  const { name: inputedName = '', email: inputedEmail = '', password: inputedPassword = ''} = inputedData
  console.log(Object.assign({}, data, inputedData ))
  return (
    <section className={`${styles.main} mt-30`}>
      <nav className={styles.nav}>
        <NavLink className={navLinkStyle} to={`/profile`}>
          Профиль
        </NavLink>
        <NavLink className={navLinkStyle} to={`/profile/orders`}>
          История заказов
        </NavLink>
        <NavLink className={navLinkStyle} to={`/logout`}>
          Выход
        </NavLink>
      </nav>
      <form className={`${styles.form} ml-15`}>
        <div className={styles.inputs}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={event => handleInputChange(event)}
            icon={'EditIcon'}
            name={'name'}
            error={false}
            size={'default'}
            value={inputedName || name}
            errorText={'Ошибка'}
          />
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={event => handleInputChange(event)}
            icon={'EditIcon'}
            name={'email'}
            error={false}
            size={'default'}
            value={inputedEmail || email}
            errorText={'Ошибка'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={event => handleInputChange(event)}
            icon={'EditIcon'}
            name={'password'}
            error={false}
            size={'default'}
            // ref={inputRef}
            // onIconClick={onIconClick}
            value={inputedPassword}
            errorText={'Ошибка'}
          />
        </div>
      </form>
    </section>
  )
}

export default Profile
