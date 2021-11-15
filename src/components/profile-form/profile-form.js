import styles from './profile-form.module.css'
import Input from '../input/input'
import useInput from '../../services/customHooks/useInput'
import { useSelector } from 'react-redux'

const ProfileForm = () => {
  const data = useSelector(state => state.user.data)
  const { name = '', email = '' } = data
  const { data: inputedData, handleInputChange } = useInput()
  const { name: inputedName = '', email: inputedEmail = '', password: inputedPassword = '' } = inputedData
  return (
    <form className={`${styles.form} ml-15`}>
      <div className={styles.inputs}>
        <Input
          type={'text'}
          subType={'edit'}
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
          subType={'edit'}
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
          subType={'edit'}
          placeholder={'Пароль'}
          onChange={event => handleInputChange(event)}
          icon={'EditIcon'}
          name={'password'}
          error={false}
          size={'default'}
          value={inputedPassword}
          errorText={'Ошибка'}
        />
      </div>
    </form>
  )
}

export default ProfileForm