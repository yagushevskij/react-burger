import { GET_USER_REQUEST, GET_USER_REQUEST_SUCCESS, GET_USER_REQUEST_FAILED } from '../user'
import { API_URL } from '../../../utils/config'
import { getCookie } from '../../../utils/helpers'

export const getUser = () => {
  console.log('Bearer ' + getCookie('accessToken'))
  return async function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('accessToken')
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