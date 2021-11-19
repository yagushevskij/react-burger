import { GET_USER_REQUEST, GET_USER_REQUEST_SUCCESS, GET_USER_REQUEST_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_REQUEST_SUCCESS, UPDATE_USER_REQUEST_FAILED } from '../user'
import { API_URL } from '../../../utils/config'
import { getCookie, setCookie } from '../../../utils/helpers'

const checkReponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const retriableFetch = async (url, options = {}) => {
  let accessToken = getCookie('accessToken')
  try {
    const res = await fetch(url, options)
    const result = await checkReponse(res)
    return result
  } catch (err) {
    if (!accessToken || err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      // console.log({refreshData})
      const updatedAccessToken = refreshData.accessToken.split('Bearer ')[1]
      console.log({updatedAccessToken})
      setCookie('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', updatedAccessToken, {expires: 1200})
      // options.headers ??= {}
      options.headers.authorization = 'Bearer ' + updatedAccessToken
      // console.log({options})
      const res = await fetch(url, options)
      return await checkReponse(res)
    } else {
      throw err
    }
  }
}

export const getUser = () => {
  let accessToken = getCookie('accessToken')
  return async function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    try {
    const res = await retriableFetch(API_URL + 'auth/user', {
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

export const updateUser = data => {
  return async function (dispatch) {
    let accessToken = getCookie('accessToken')
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    try {
      const res = await retriableFetch(API_URL + 'auth/user', {
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

export const refreshToken = async () => {
  let refreshToken = getCookie('refreshToken')
  const data = { token: refreshToken }
  console.log(data)
  const res = await fetch(API_URL + 'auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await checkReponse(res)
}
