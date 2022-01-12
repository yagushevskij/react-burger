import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import useInput from '../../../services/custom-hooks/use-input'
import React, { useCallback, FC } from 'react'
import AuthForm from '../auth-form'

import { restorePass } from '../../../services/actions/thunk/restore-pass'
import { useAppSelector, useAppDispatch } from '../../../services/custom-hooks/redux-hooks'
import type { TOnSubmitCallback } from '../../../utils/types'

const ForgotPasswordForm: FC = () => {
  const dispatch = useAppDispatch()
  const isRequest = useAppSelector(state => state.restorePass.request)
  const { data, handleInputChange } = useInput({ email: '' })
  const { email } = data

  const onSubmit = useCallback<TOnSubmitCallback>(
    event => {
      event.preventDefault()
      dispatch(restorePass(data))
    },
    [data, dispatch],
  )
  return (
    <AuthForm title="Восстановление пароля" buttonText="Восстановить" onSubmit={onSubmit} isButtonDisabled={isRequest}>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
        name={'email'}
        error={false}
        size={'default'}
        value={email}
        errorText={'Ошибка'}
      />
    </AuthForm>
  )
}

export default ForgotPasswordForm
