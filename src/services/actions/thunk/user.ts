import { userActions } from '../user'
import { API_URL } from '../../../utils/config'
import { getCookie } from '../../../utils/helpers'
import { retriableFetch } from '../../../utils/api'
import { IUserData } from '../user'
import type { TAppDispatch } from '../../custom-hooks/redux-hooks'

interface IUserResp {
  success: boolean
  user: IUserData
}

export const getUser = () => {
  const accessToken = getCookie('accessToken')
  return async function (dispatch: TAppDispatch) {
    dispatch(userActions.getUserReq)
    try {
      const res = await retriableFetch<IUserResp>(API_URL + 'auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
      })
      dispatch(userActions.getUserReqSuccess(res.user))
    } catch (e) {
      dispatch(userActions.getUserReqFailed('На сайте возникла ошибка. Пожалуйста, попробуйте позже'))
      console.log(e)
    }
  }
}

export const updateUser = (data: IUserData) => {
  return async function (dispatch: TAppDispatch) {
    const accessToken = getCookie('accessToken')
    dispatch(userActions.updateUserReq)
    try {
      const res = await retriableFetch<IUserResp>(API_URL + 'auth/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(data),
      })
      dispatch(userActions.updateUserReqSuccess(res.user))
    } catch (e) {
      dispatch(userActions.updateUserReqFailed('На сайте возникла ошибка. Пожалуйста, попробуйте позже'))
      console.log(e)
    }
  }
}
