export const RESET_PASS_REQUEST: 'RESET_PASS_REQUEST' = 'RESET_PASS_REQUEST'
export const RESET_PASS_REQUEST_SUCCESS: 'RESET_PASS_REQUEST_SUCCESS' = 'RESET_PASS_REQUEST_SUCCESS'
export const RESET_PASS_REQUEST_FAILED: 'RESET_PASS_REQUEST_FAILED' = 'RESET_PASS_REQUEST_FAILED'
export const SET_INIT_STATE_RESET_PASS: 'SET_INIT_STATE_RESET_PASS' = 'SET_INIT_STATE_RESET_PASS'

interface IResetPassRequestAction {
  readonly type: typeof RESET_PASS_REQUEST
}
interface IResetPassRequestSuccessAction {
  readonly type: typeof RESET_PASS_REQUEST_SUCCESS
}
interface IResetPassRequestFailedAction {
  readonly type: typeof RESET_PASS_REQUEST_FAILED
  payload?: {
    message: string
  }
}
interface ISetInitStateResetPassAction {
  readonly type: typeof SET_INIT_STATE_RESET_PASS
}

export type TResetPassActions =
  | IResetPassRequestAction
  | IResetPassRequestSuccessAction
  | IResetPassRequestFailedAction
  | ISetInitStateResetPassAction
