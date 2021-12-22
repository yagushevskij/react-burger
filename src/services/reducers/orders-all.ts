import { GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAILED } from '../actions/orders-all'
import type { IOrdersState } from '../../utils/types'
import type { TOrdersAllActions } from '../actions/orders-all'

const initialState: IOrdersState = {
  data: [],
  request: false,
  failed: false,
  errorMessage: null
}

const ordersAllReducer = (state = initialState, action: TOrdersAllActions): IOrdersState => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST: {
      return { ...initialState, request: true }
    }
    case GET_ALL_ORDERS_SUCCESS: {
      return { ...state, data: action.payload.data, request: false }
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
