import { API_URL } from '../../../utils/config'
import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_FAILED, LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILED } from '../auth'
import { setCookie, getCookie } from '../../../utils/helpers'
import { deleteCookie } from '../../../utils/helpers'
import { SET_USER } from '../user'
import { checkReponse } from '../../../utils/helpers'

export const register = data => {
  return dispatch => {
    const url = API_URL + 'auth/register'
    auth(data, url, dispatch)
  }
}

export const login = data => {
  return dispatch => {
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
    const resData = await checkReponse(res)
    const accessToken = resData.accessToken.split('Bearer ')[1]
    const refreshToken = resData.refreshToken
    setCookie('accessToken', accessToken)
    setCookie('refreshToken', refreshToken)
    dispatch({
      type: AUTH_REQUEST_SUCCESS
    })
    dispatch({
      type: SET_USER,
      payload: { data: resData.user }
    })
  } catch (e) {
    dispatch({
      type: AUTH_REQUEST_FAILED,
      payload: { errorMessage: 'Возникла ошибка при выполнении запроса. Пожалуйста, попробуйте позже' }
    })
    console.log(e)
  }
}

export const logout = () => {
  return async dispatch => {
    const url = API_URL + 'auth/logout'
    const data = { token: getCookie('refreshToken') }
    dispatch({
      type: LOGOUT_REQUEST
    })
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const resData = await checkReponse(res)
      resData &&
        dispatch({
          type: LOGOUT_REQUEST_SUCCESS
        })
    } catch (e) {
      dispatch({
        type: LOGOUT_REQUEST_FAILED,
        payload: { errorMessage: 'Возникла ошибка при выполнении запроса. Пожалуйста, попробуйте позже' }
      })
      console.log(e)
    } finally {
      deleteCookie('accessToken')
      dispatch({
        type: SET_USER,
        payload: { data: {} }
      })
    }
  }
}
