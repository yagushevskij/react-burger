import type { IGetOrdersResp } from './thunk/order'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE'

export const wsActions = {
  wsInit: (url: string) => ({ type: WS_CONNECTION_START, payload: { url } }),
  onOpen: { type: WS_CONNECTION_SUCCESS },
  onClose: { type: WS_CONNECTION_CLOSED },
  onError: { type: WS_CONNECTION_ERROR },
  onMessage: (msg: IGetOrdersResp) => ({ type: WS_GET_MESSAGE, payload: msg }),
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
  readonly payload: {
    url: string
  }
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
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

export type TWsObjActions = {
  wsInit: (url: string) => IWsConnectionStart
  onOpen: IWsConnectionSuccess
  onClose: IWsConnectionClosed
  onError: IWsConnectionError
  onMessage: (msg: IGetOrdersResp) => IWsGetMessage
}
export type TWsActions = IWsConnectionClosed | IWsConnectionError | IWsConnectionSuccess | IWsGetMessage | IWsConnectionStart
