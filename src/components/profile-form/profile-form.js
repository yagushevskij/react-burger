import styles from './profile-form.module.css'
import Input from '../input/input'
import useInput from '../../services/customHooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUser } from '../../services/actions/thunk/user'
import { useCallback, useState } from 'react'

const initialInputsState = {
  name: { isDisabled: true },
  email: { isDisabled: true },
  password: { isDisabled: true }
}

const ProfileForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.data)
  const { name = '', email = '' } = user
  const isUserRequest = useSelector(state => state.user.request)

  const { data: inputedData, handleInputChange, resetInputedData } = useInput()
  const { name: inputedName = '', email: inputedEmail = '', password: inputedPassword = '' } = inputedData

  const [inputsDisableState, setInputsDisableState] = useState(initialInputsState)
  const [isFormEdited, setIsFormEdited] = useState(false)

  const setInitialFormState = useCallback(() => {
    setInputsDisableState(initialInputsState)
    resetInputedData()
    setIsFormEdited(false)
  }, [resetInputedData])

  const toggleDisable = name => {
    setInputsDisableState({ ...inputsDisableState, [name]: { isDisabled: !inputsDisableState[name].isDisabled } })
  }

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      const combinedData = Object.assign({}, user, inputedData)
      dispatch(updateUser(combinedData))
      setInitialFormState()
    },
    [dispatch, user, inputedData, setInitialFormState]
  )

  if (isUserRequest) {
    return null
  }

  return (
    <form className={`${styles.form} ml-15 mt-30`} onSubmit={onSubmit}>
      <div className={styles.inputs}>
        <Input
          type={'text'}
          subType={'edit'}
          placeholder={'Имя'}
          onChange={event => {
            handleInputChange(event)
            setIsFormEdited(true)
          }}
          icon={'EditIcon'}
          name={'name'}
          error={false}
          size={'default'}
          value={inputedName || name}
          errorText={'Ошибка'}
          disabled={inputsDisableState.name.isDisabled}
          toggleDisable={toggleDisable}
        />
        <Input
          type={'email'}
          subType={'edit'}
          placeholder={'Логин'}
          onChange={event => {
            handleInputChange(event)
            setIsFormEdited(true)
          }}
          icon={'EditIcon'}
          name={'email'}
          error={false}
          size={'default'}
          value={inputedEmail || email}
          errorText={'Ошибка'}
          disabled={inputsDisableState.email.isDisabled}
          toggleDisable={toggleDisable}
        />
        <Input
          type={'password'}
          subType={'edit'}
          placeholder={'Пароль'}
          onChange={event => {
            handleInputChange(event)
            setIsFormEdited(true)
          }}
          icon={'EditIcon'}
          name={'password'}
          error={false}
          size={'default'}
          value={inputedPassword}
          errorText={'Ошибка'}
          disabled={inputsDisableState.password.isDisabled}
          toggleDisable={toggleDisable}
        />
      </div>
      {isFormEdited && (
        <div className={`${styles.submit} mt-6`}>
          <p className={`${styles.link} text text_type_main-default mr-7`} onClick={setInitialFormState}>
            Отмена
          </p>
          <Button type='primary' size='medium' disabled={isUserRequest}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}

export default ProfileForm
