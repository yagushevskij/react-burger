import { IOrder } from '../reducers/orders'
import type { IGetOrdersResp } from './thunk/order'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE'

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
  readonly payload: {
    url: string
  }
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
  readonly payload: {
    data: IOrder[]
    total: number
    totalToday: number
  }
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}
interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: IGetOrdersResp
}

export type TWsOrdersListActions =
  | typeof WS_CONNECTION_START
  | typeof WS_CONNECTION_SUCCESS
  | typeof WS_CONNECTION_ERROR
  | typeof WS_CONNECTION_CLOSED
  | typeof WS_GET_MESSAGE
export type TOrdersActions = IWsConnectionClosed | IWsConnectionError | IWsConnectionSuccess | IWsGetMessage | IWsConnectionStart
