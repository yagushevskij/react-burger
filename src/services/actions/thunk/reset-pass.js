import { API_URL } from '../../../utils/config'
import { RESET_PASS_REQUEST, RESET_PASS_REQUEST_SUCCESS, RESET_PASS_REQUEST_FAILED } from '../reset-pass.js'
import { checkReponse } from '../../../utils/helpers'

export const resetPass = data => {
  return async function (dispatch) {
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
        payload: { errorMessage: 'Возникла ошибка при восстановлении пароля. Пожалуйста, попробуйте позже' }
      })
      console.log(e)
    }
  }
}
