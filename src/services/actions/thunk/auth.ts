import { API_URL } from '../../../utils/config'
import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_FAILED, LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILED } from '../auth'
import { setCookie, getCookie, deleteCookie, checkReponse } from '../../../utils/helpers'
import { SET_USER } from '../user'
import type { TAppDispatch } from '../../../utils/types'

export interface ILoginData {
  email: string
  password: string
}
export interface IRegisterData extends ILoginData {
  name: string
}

interface IAuthResp {
  accessToken: string
  refreshToken: string
  user: {
    name: string
    email: string
  }
}

interface ILogoutResp {
  token: string
}

export const register = (data: IRegisterData) => {
  return (dispatch: TAppDispatch) => {
    const url = API_URL + 'auth/register'
    auth(data, url, dispatch)
  }
}

export const login = (data: ILoginData) => {
  return (dispatch: TAppDispatch) => {
    const url = API_URL + 'auth/login'
    auth(data, url, dispatch)
  }
}

const auth = async (data: IRegisterData | ILoginData, url: string, dispatch: TAppDispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  })
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const resData = await checkReponse<IAuthResp>(res)
    const accessToken = resData.accessToken.split('Bearer ')[1]
    const refreshToken = resData.refreshToken
    setCookie('accessToken', accessToken, null)
    setCookie('refreshToken', refreshToken, null)
    dispatch({
      type: AUTH_REQUEST_SUCCESS,
    })
    dispatch({
      type: SET_USER,
      payload: { data: resData.user },
    })
  } catch (e) {
    dispatch({
      type: AUTH_REQUEST_FAILED,
      payload: { errorMessage: 'Возникла ошибка при выполнении запроса. Пожалуйста, попробуйте позже' },
    })
    console.log(e)
  }
}

export const logout = () => {
  return async (dispatch: TAppDispatch) => {
    const url = API_URL + 'auth/logout'
    const data = { token: getCookie('refreshToken') }
    dispatch({
      type: LOGOUT_REQUEST,
    })
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const resData = await checkReponse<ILogoutResp>(res)
      resData &&
        dispatch({
          type: LOGOUT_REQUEST_SUCCESS,
        })
    } catch (e) {
      dispatch({
        type: LOGOUT_REQUEST_FAILED,
        payload: { message: 'Возникла ошибка при выполнении запроса. Пожалуйста, попробуйте позже' },
      })
      console.log(e)
    } finally {
      deleteCookie('accessToken')
      dispatch({
        type: SET_USER,
        payload: { data: {} },
      })
    }
  }
}
