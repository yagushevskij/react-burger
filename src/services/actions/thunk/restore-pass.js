import { API_URL } from '../../../utils/config'
import { RESTORE_PASS_REQUEST, RESTORE_PASS_REQUEST_SUCCESS, RESTORE_PASS_REQUEST_FAILED } from '../restore-pass.js'

export const restorePass = data => {
  return async function (dispatch) {
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
      if (res && res.ok) {
        dispatch({
          type: RESTORE_PASS_REQUEST_SUCCESS
        })
      } else {
        dispatch({
          type: RESTORE_PASS_REQUEST_FAILED,
          payload: { errorMessage: 'Возникла ошибка при восстановлении пароля. Пожалуйста, попробуйте позже' }
        })
      }
    } catch (e) {
      dispatch({
        type: RESTORE_PASS_REQUEST_FAILED,
        payload: { errorMessage: 'Возникла ошибка при восстановлении пароля. Пожалуйста, попробуйте позже' }
      })
      console.log(e)
    }
  }
}
