import { GET_USER_REQUEST, GET_USER_REQUEST_SUCCESS, GET_USER_REQUEST_FAILED } from '../user'
import { API_URL } from '../../../utils/config'
import { getCookie, setCookie, isTokenExpired } from '../../../utils/helpers'

export const getUser = () => {
  return async function (dispatch) {
    let token = getCookie('accessToken')
    if (!token || isTokenExpired()) {
      token = await updateAccessToken()
    }
    dispatch({
      type: GET_USER_REQUEST
    })
    console.log(token)
    try {
      const res = await fetch(API_URL + 'auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      if (res && res.ok) {
        const resData = await res.json()
        dispatch({
          type: GET_USER_REQUEST_SUCCESS,
          payload: { user: resData.user }
        })
      } else {
        dispatch({
          type: GET_USER_REQUEST_FAILED,
          payload: {errorMessage: 'На сайте возникла ошибка. Пожалуйста, попробуйте позже'}
        })
      }
    } catch (e) {
      dispatch({
        type: GET_USER_REQUEST_FAILED,
        payload: {errorMessage: 'На сайте возникла ошибка. Пожалуйста, попробуйте позже'}
      })
      console.log(e)
    }
  }
}

export const updateAccessToken = async () => {
  const refreshToken = getCookie('refreshToken')
  const data = { "token": {refreshToken} } 
  console.log(data)
  try {
    const res = await fetch(API_URL + 'auth/token', {
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
      }
    } else {
      console.log('Ошибка при обновлении токена')
    }
  } catch (e) {
    console.log(e)
  }
}