import { GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAILED } from '../actions/orders-all'
import type { IOrdersState } from '../../utils/types'
import type { TOrdersAllActions } from '../actions/orders-all'

interface IOrdersAllState extends IOrdersState {
  readonly total: number | null,
  readonly totalToday: number | null
}

const initialState: IOrdersAllState = {
  data: [],
  request: false,
  failed: false,
  errorMessage: null,
  total: null,
  totalToday: null
}

const ordersAllReducer = (state = initialState, action: TOrdersAllActions): IOrdersAllState => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST: {
      return { ...initialState, request: true }
    }
    case GET_ALL_ORDERS_SUCCESS: {
      const { data, total, totalToday } = action.payload
      return { ...state, data, total, totalToday, request: false }
    }
    case GET_ALL_ORDERS_FAILED: {
      return { ...initialState, failed: true, errorMessage: action.payload?.message }
    }
    default: {
      return state
    }
  }
}

export default ordersAllReducer
