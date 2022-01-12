export const RESTORE_PASS_REQUEST: 'RESTORE_PASS_REQUEST' = 'RESTORE_PASS_REQUEST'
export const RESTORE_PASS_REQUEST_SUCCESS: 'RESTORE_PASS_REQUEST_SUCCESS' = 'RESTORE_PASS_REQUEST_SUCCESS'
export const RESTORE_PASS_REQUEST_FAILED: 'RESTORE_PASS_REQUEST_FAILED' = 'RESTORE_PASS_REQUEST_FAILED'
export const SET_INIT_STATE_RESTORE_PASS: 'SET_INIT_STATE_RESTORE_PASS' = 'SET_INIT_STATE_RESTORE_PASS'

interface IRestorePassRequestAction {
  readonly type: typeof RESTORE_PASS_REQUEST
}
interface IRestorePassRequestSuccessAction {
  readonly type: typeof RESTORE_PASS_REQUEST_SUCCESS
}
interface IRestorePassRequestFailedAction {
  readonly type: typeof RESTORE_PASS_REQUEST_FAILED
  payload?: {
    message: string
  }
}
interface ISetInitStateRestorePassAction {
  readonly type: typeof SET_INIT_STATE_RESTORE_PASS
}

export type TRestorePassActions =
  | IRestorePassRequestAction
  | IRestorePassRequestFailedAction
  | IRestorePassRequestSuccessAction
  | ISetInitStateRestorePassAction
