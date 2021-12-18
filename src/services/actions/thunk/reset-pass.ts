import { API_URL } from '../../../utils/config'
import { RESET_PASS_REQUEST, RESET_PASS_REQUEST_SUCCESS, RESET_PASS_REQUEST_FAILED } from '../reset-pass'
import { checkReponse } from '../../../utils/helpers'
import type { TAppDispatch } from '../../../utils/types'

interface IResetPassData {
  token: string;
  password: string;
}

export const resetPass = (data: IResetPassData) => {
  return async function (dispatch: TAppDispatch) {
    dispatch({
      type: RESET_PASS_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const resData = await checkReponse(res)
      resData &&
        dispatch({
          type: RESET_PASS_REQUEST_SUCCESS
        })
    } catch (e) {
      dispatch({
        type: RESET_PASS_REQUEST_FAILED,
        payload: { message: 'Возникла ошибка при восстановлении пароля. Пожалуйста, попробуйте позже' }
      })
      console.log(e)
    }
  }
}
