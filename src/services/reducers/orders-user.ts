import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from '../actions/orders-user'
import type { IOrdersState } from '../../utils/types'
import type { TOrdersActions } from '../actions/orders-user'

const initialState: IOrdersState = {
  data: [],
  request: false,
  failed: false,
  errorMessage: null
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
    default: {
      return state
    }
  }
}

export default ordersUserReducer
