export const AUTH_REQUEST: 'AUTH_REQUEST' = 'AUTH_REQUEST'
export const AUTH_REQUEST_SUCCESS: 'AUTH_REQUEST_SUCCESS' = 'AUTH_REQUEST_SUCCESS'
export const AUTH_REQUEST_FAILED: 'AUTH_REQUEST_FAILED' = 'AUTH_REQUEST_FAILED'

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST'
export const LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS' = 'LOGOUT_REQUEST_SUCCESS'
export const LOGOUT_REQUEST_FAILED: 'LOGOUT_REQUEST_FAILED' = 'LOGOUT_REQUEST_FAILED'

export const authActions = {
  request: { type: AUTH_REQUEST },
  requestSuccess: { type: AUTH_REQUEST_SUCCESS },
  requestFailed: (errorMessage: string) => ({ type: AUTH_REQUEST_FAILED, payload: { errorMessage } }),
}

export const logoutActions = {
  request: { type: LOGOUT_REQUEST },
  requestSuccess: { type: LOGOUT_REQUEST_SUCCESS },
  requestFailed: (errorMessage: string) => ({ type: LOGOUT_REQUEST_FAILED, payload: { errorMessage } }),
}

interface IAuthRequestAction {
  readonly type: typeof AUTH_REQUEST
}
interface ILogoutRequestSuccessAction {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS
}
interface ILogoutRequestFailedAction {
  readonly type: typeof LOGOUT_REQUEST_FAILED
  readonly payload?: { errorMessage: string }
}
interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST
}
interface IAuthRequestSuccessAction {
  readonly type: typeof AUTH_REQUEST_SUCCESS
}
interface IAuthRequestFailedAction {
  readonly type: typeof AUTH_REQUEST_FAILED
  readonly payload?: { errorMessage: string }
}

export type TAuthActions =
  | IAuthRequestAction
  | ILogoutRequestSuccessAction
  | ILogoutRequestFailedAction
  | ILogoutRequestAction
  | IAuthRequestSuccessAction
  | IAuthRequestFailedAction
