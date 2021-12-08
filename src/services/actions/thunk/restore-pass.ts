import { API_URL } from '../../../utils/config'
import { RESTORE_PASS_REQUEST, RESTORE_PASS_REQUEST_SUCCESS, RESTORE_PASS_REQUEST_FAILED } from '../restore-pass'
import { checkReponse } from '../../../utils/helpers'

interface IRestorePassData {
  email: string;
}

export const restorePass = (data: IRestorePassData) => {
  return async function (dispatch: any) {
    dispatch({
      type: RESTORE_PASS_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const resData = await checkReponse(res)
      resData &&
        dispatch({
          type: RESTORE_PASS_REQUEST_SUCCESS
        })
    } catch (e) {
      dispatch({
        type: RESTORE_PASS_REQUEST_FAILED,
        payload: { errorMessage: 'Возникла ошибка при восстановлении пароля. Пожалуйста, попробуйте позже' }
      })
      console.log(e)
    }
  }
}
