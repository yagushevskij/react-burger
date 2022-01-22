export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED'
export const SET_INITIAL_ORDER_STATE: 'SET_INITIAL_ORDER_STATE' = 'SET_INITIAL_ORDER_STATE'

export const orderActions = {
  request: { type: GET_ORDER_REQUEST },
  requestSuccess: (orderNumber: number) => ({ type: GET_ORDER_SUCCESS, payload: { orderNumber } }),
  requestFailed: (message: string) => ({ type: GET_ORDER_FAILED, payload: { message } }),
  setInitialState: { type: SET_INITIAL_ORDER_STATE }
}

interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST
}
interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS
  payload: {
    orderNumber: number
  }
}
interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED
  payload?: {
    message: string
  }
}
interface ISetInitialOrderStateAction {
  readonly type: typeof SET_INITIAL_ORDER_STATE
}

export type TOrderActions = IGetOrderRequestAction | IGetOrderSuccessAction | IGetOrderFailedAction | ISetInitialOrderStateAction
