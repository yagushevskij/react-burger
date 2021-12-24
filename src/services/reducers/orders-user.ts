import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from '../actions/orders-user'
import type { IOrdersState } from '../../utils/types'
import type { TOrdersActions } from '../actions/orders-user'

const initialState: IOrdersState = {
  data: [],
  request: false,
  failed: false,
  errorMessage: null,
  wsConnected: false
}

const ordersUserReducer = (state = initialState, action: TOrdersActions): IOrdersState => {
  switch (action.type) {
    case GET_ORDERS_REQUEST: {
      return { ...initialState, request: true }
    }
    case GET_ORDERS_SUCCESS: {
      return { ...state, data: action.payload.data, request: false }
    }
    case GET_ORDERS_FAILED: {
      return { ...initialState, failed: true, errorMessage: action.payload?.message }
    }
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      }

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      }

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      }

    case WS_GET_MESSAGE:
      return {
        ...state,
        data: action.payload.orders
      }
    default: {
      return state
    }
  }
}

export default ordersUserReducer
