import { API_URL } from '../../../utils/config'
import { restorePassActions } from '../restore-pass'
import { checkReponse } from '../../../utils/helpers'
import type { TAppDispatch } from '../../custom-hooks/redux-hooks'

interface IRestorePassData {
  email: string
}

export const restorePass = (data: IRestorePassData) => {
  return async function (dispatch: TAppDispatch) {
    dispatch(restorePassActions.request)
    try {
      const res = await fetch(API_URL + 'password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const resData = await checkReponse(res)
      resData && dispatch(restorePassActions.requestSuccess)
    } catch (e) {
      dispatch(restorePassActions.requestFailed('Возникла ошибка при восстановлении пароля. Пожалуйста, попробуйте позже'))
      console.log(e)
    }
  }
}
