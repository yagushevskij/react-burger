import { API_URL } from '../../../utils/config'
import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_FAILED } from '../auth'
import { setCookie, getExpiredDate } from '../../../utils/helpers'

export const register = data => {
  return (dispatch) => {
    const url = API_URL + 'auth/register'
    auth(data, url, dispatch)
  }
}

export const login = data => {
  return (dispatch) => {
    const url = API_URL + 'auth/login'
    auth(data, url, dispatch)
  }
}

const auth = async (data, url, dispatch) => {
  dispatch({
    type: AUTH_REQUEST
  })
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res && res.ok) {
      const resData = await res.json()
      const accessToken = resData.accessToken.split('Bearer ')[1];
      const refreshToken = resData.refreshToken
      if (accessToken) {
        setCookie('accessToken', accessToken, {expires: 1200});
        setCookie('refreshToken', refreshToken);
        localStorage.setItem('accessTokenExpiration', getExpiredDate(1200))
      }
      dispatch({
        type: AUTH_REQUEST_SUCCESS,
        payload: { user: resData.user }
      })
    } else {
      dispatch({
        type: AUTH_REQUEST_FAILED,
        payload: {errorMessage: 'Возникла ошибка при регистрации. Пожалуйста, попробуйте позже'}
      })
    }
  } catch (e) {
    dispatch({
      type: AUTH_REQUEST_FAILED,
      payload: {errorMessage: 'Возникла ошибка при регистрации. Пожалуйста, попробуйте позже'}
    })
    console.log(e)
  }
}
