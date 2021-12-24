import { IOrder } from "../../utils/types"
import type { IGetOrdersResp } from '../actions/thunk/order'

export const GET_ORDERS_REQUEST: 'GET_ORDERS_REQUEST' = 'GET_ORDERS_REQUEST'
export const GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS' = 'GET_ORDERS_SUCCESS'
export const GET_ORDERS_FAILED: 'GET_ORDERS_FAILED' = 'GET_ORDERS_FAILED'
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
  onMessage: WS_GET_MESSAGE
}

interface IGetOrdersRequestAction {
    readonly type: typeof GET_ORDERS_REQUEST;
  }
  interface IGetOrdersSuccessAction {
    readonly type: typeof GET_ORDERS_SUCCESS;
    readonly payload: {
        data: IOrder[]
    }
  }
  interface IGetOrdersFailedAction {
    readonly type: typeof GET_ORDERS_FAILED;
    readonly payload?: {
        message: string
    }
  }
  interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
  }
  interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
  }
  interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
  }
  interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
  }
  interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IGetOrdersResp


  }

  export type TWsOrdersListActions = typeof WS_CONNECTION_START | typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_CLOSED | typeof WS_GET_MESSAGE
  export type TWsOrdersActions = IWsConnectionClosed | IWsConnectionError | IWsConnectionSuccess | IWsGetMessage | IWsConnectionStart
  export type TOrdersActions = IGetOrdersFailedAction | IGetOrdersRequestAction | IGetOrdersSuccessAction | TWsOrdersActions