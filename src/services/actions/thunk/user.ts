import { GET_USER_REQUEST, GET_USER_REQUEST_SUCCESS, GET_USER_REQUEST_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_REQUEST_SUCCESS, UPDATE_USER_REQUEST_FAILED } from '../user'
import { API_URL } from '../../../utils/config'
import { getCookie } from '../../../utils/helpers'
import { retriableFetch } from '../../../utils/api'

interface IUserData {
  email?: string;
  password?: string;
  name?: string;
}

interface IUserResp {
  success: boolean;
  user: {
    email: string,
    name: string
  };
}

export const getUser = () => {
  const accessToken = getCookie('accessToken')
  return async function (dispatch: any) {
    dispatch({
      type: GET_USER_REQUEST
    })
    try {
      const res = await retriableFetch<IUserResp>(API_URL + 'auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken
        }
      })
      dispatch({
        type: GET_USER_REQUEST_SUCCESS,
        payload: { user: res.user }
      })
    } catch (e) {
      dispatch({
        type: GET_USER_REQUEST_FAILED,
        payload: { errorMessage: 'На сайте возникла ошибка. Пожалуйста, попробуйте позже' }
      })
      console.log(e)
    }
  }
}

export const updateUser = (data: IUserData) => {
  return async function (dispatch: any) {
    console.log(data)
    const accessToken = getCookie('accessToken')
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    try {
      const res = await retriableFetch<IUserResp>(API_URL + 'auth/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken
        },
        body: JSON.stringify(data)
      })
      dispatch({
        type: UPDATE_USER_REQUEST_SUCCESS,
        payload: { user: res.user }
      })
    } catch (e) {
      dispatch({
        type: UPDATE_USER_REQUEST_FAILED,
        payload: { errorMessage: 'На сайте возникла ошибка. Пожалуйста, попробуйте позже' }
      })
      console.log(e)
    }
  }
}
