import { API_URL } from '../../../utils/config'
import { REGISTER_REQUEST, REGISTER_REQUEST_SUCCESS, REGISTER_REQUEST_FAILED } from '../auth'
import { setCookie } from '../../../utils/helpers'

export const register = data => {
  return async function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (res && res.ok) {
        const resData = await res.json()
        dispatch({
          type: REGISTER_REQUEST_SUCCESS,
          payload: { user: resData.user }
        })
        const authToken = resData.accessToken.split('Bearer ')[1];
        if (authToken) {
          setCookie('token', authToken);
        }
      } else {
        dispatch({
          type: REGISTER_REQUEST_FAILED,
          payload: {errorMessage: 'Возникла ошибка при регистрации. Пожалуйста, попробуйте позже'}
        })
      }
    } catch (e) {
      dispatch({
        type: REGISTER_REQUEST_FAILED,
        payload: {errorMessage: 'Возникла ошибка при регистрации. Пожалуйста, попробуйте позже'}
      })
      console.log(e)
    }
  }
}
