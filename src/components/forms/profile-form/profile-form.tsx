import styles from './profile-form.module.css'
import EditInput from '../../input/edit-input/edit-input'
import useInput from '../../../services/custom-hooks/use-input'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUser } from '../../../services/actions/thunk/user'
import { useCallback, useState } from 'react'
import type { TOnSubmitCallback } from '../../../utils/types'
import { useAppSelector, useAppDispatch } from '../../../services/custom-hooks/redux-hooks'

export interface IDisableHandleData {
  [key: string]: boolean;
}

const initialDisableState = {
  name: true,
  email: true,
  password: true
}

const ProfileForm = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.data)
  const isUserRequest = useAppSelector(state => state.user.request)

  const { data: inputedData, handleInputChange, resetInputedData } = useInput(user)

  const [inputsDisableState, setInputsDisableState] = useState(initialDisableState)
  const [isFormEdited, setIsFormEdited] = useState<boolean>(false)

  const setInitialFormState = useCallback(() => {
    setInputsDisableState(initialDisableState)
    resetInputedData()
    setIsFormEdited(false)
  }, [resetInputedData])

  const onSubmit = useCallback<TOnSubmitCallback>(
    event => {
      event.preventDefault()
      dispatch(updateUser(inputedData))
      setInitialFormState()
    },
    [dispatch, inputedData, setInitialFormState]
  )

  const disableHandler = (data: IDisableHandleData) => {
    setInputsDisableState({ ...inputsDisableState, ...data })
  }

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
          value={inputedData.name || ''}
          errorText={'Ошибка'}
          disabled={inputsDisableState.name}
          disableHandle={disableHandler}
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
          value={inputedData.email || ''}
          errorText={'Ошибка'}
          disabled={inputsDisableState.email}
          disableHandle={disableHandler}
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
          value={inputedData.password || ''}
          errorText={'Ошибка'}
          disabled={inputsDisableState.password}
          disableHandle={disableHandler}
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
