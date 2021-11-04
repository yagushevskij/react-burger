import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/order'

const initialState = {
  number: null,
  orderRequest: false,
  orderFailed: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true }
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, number: action.orderNumber, orderRequest: false }
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false, number: null }
    }
    default: {
      return state
    }
  }
}

export default orderReducer
