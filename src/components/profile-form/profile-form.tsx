import styles from './profile-form.module.css'
import EditInput from '../input/edit-input/edit-input'
import useInput from '../../services/customHooks/useInput'
import { useDispatch } from 'react-redux'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUser } from '../../services/actions/thunk/user'
import { useCallback, useState } from 'react'
import type { TOnSubmitCallback } from '../../utils/types'
import useAppSelector from '../../services/customHooks/useAppSelector'

const initialInputsState = {
  name: { isDisabled: true },
  email: { isDisabled: true },
  password: { isDisabled: true }
}

const ProfileForm = () => {
  const dispatch = useDispatch()
  const user = useAppSelector(state => state.user.data)
  const { name = '', email = '' } = user
  const isUserRequest = useAppSelector(state => state.user.request)

  const { data: inputedData, handleInputChange, resetInputedData } = useInput({name : '', email: '', password: ''})
  const { name: inputedName , email: inputedEmail , password: inputedPassword } = inputedData

  const [inputsDisableState, setInputsDisableState] = useState(initialInputsState)
  const [isFormEdited, setIsFormEdited] = useState<boolean>(false)

  const setInitialFormState = useCallback(() => {
    setInputsDisableState(initialInputsState)
    resetInputedData()
    setIsFormEdited(false)
  }, [resetInputedData])

  const onSubmit =
    useCallback <
    TOnSubmitCallback >
    (event => {
      event.preventDefault()
      dispatch(updateUser(inputedData))
      setInitialFormState()
    },
    [dispatch, inputedData, setInitialFormState])

  if (isUserRequest) {
    return null
  }

  return (
    <form className={`${styles.form} ml-15 mt-30`} onSubmit={onSubmit}>
      <div className={styles.inputs}>
        <EditInput
          type={'text'}
          placeholder={'Имя'}
          onChange={event => {
            handleInputChange(event)
            setIsFormEdited(true)
          }}
          name={'name'}
          error={false}
          size={'default'}
          value={inputedName || name}
          errorText={'Ошибка'}
          disabled={inputsDisableState.name.isDisabled}
        />
        <EditInput
          type={'email'}
          placeholder={'Логин'}
          onChange={event => {
            handleInputChange(event)
            setIsFormEdited(true)
          }}
          name={'email'}
          error={false}
          size={'default'}
          value={inputedEmail || email}
          errorText={'Ошибка'}
          disabled={inputsDisableState.email.isDisabled}
        />
        <EditInput
          type={'password'}
          placeholder={'Пароль'}
          onChange={event => {
            handleInputChange(event)
            setIsFormEdited(true)
          }}
          name={'password'}
          error={false}
          size={'default'}
          value={inputedPassword}
          errorText={'Ошибка'}
          disabled={inputsDisableState.password.isDisabled}
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
