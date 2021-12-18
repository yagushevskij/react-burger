import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from '../actions/orders'
import type { IOrder } from '../actions/orders'
import type { TOrdersActions } from '../actions/orders'

interface IOrdersState {
  data: IOrder[]
  request: boolean,
  failed: boolean,
  errorMessage: null | string | undefined
}

const initialState: IOrdersState = {
  data: [],
  request: false,
  failed: false,
  errorMessage: null
}

const ordersReducer = (state = initialState, action: TOrdersActions): IOrdersState => {
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
    default: {
      return state
    }
  }
}

export default ordersReducer
