import { API_URL } from '../../../utils/config'
import { resetPassActions } from '../reset-pass'
import { checkReponse } from '../../../utils/helpers'
import type { TAppDispatch } from '../../custom-hooks/redux-hooks'

interface IResetPassData {
  token: string
  password: string
}

export const resetPass = (data: IResetPassData) => {
  return async function (dispatch: TAppDispatch) {
    dispatch(resetPassActions.request)
    try {
      const res = await fetch(API_URL + 'password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const resData = await checkReponse(res)
      resData && dispatch(resetPassActions.requestSuccess)
    } catch (e) {
      dispatch(resetPassActions.requestFailed('Возникла ошибка при восстановлении пароля. Пожалуйста, попробуйте позже'))
      console.log(e)
    }
  }
}
