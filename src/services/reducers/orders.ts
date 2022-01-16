import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from '../actions/orders'
import { TAppActions } from '../actions'

export type TOrderStatus = 'created' | 'pending' | 'done'

export interface IOrder {
  _id: string
  ingredients: string[]
  status: TOrderStatus
  name: string
  createdAt: string
  updatedAt: string
  number: number
}

export interface IOrdersState {
  data: IOrder[]
  wsConnected: boolean
  total: null | number
  totalToday: null | number
}

export const initialState: IOrdersState = {
  data: [],
  total: null,
  totalToday: null,
  wsConnected: false,
}

const ordersReducer = (state = initialState, action: TAppActions): IOrdersState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      }

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      }

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      }

    case WS_GET_MESSAGE:
      const { orders, total, totalToday } = action.payload
      return {
        ...state,
        data: orders,
        total,
        totalToday,
      }
    default: {
      return state
    }
  }
}

export default ordersReducer
