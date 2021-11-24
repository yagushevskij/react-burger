import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from '../actions/orders'

const initialState = {
  data: [],
  request: false,
  failed: false,
  errorMessage: null
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST: {
      return { ...initialState, request: true }
    }
    case GET_ORDERS_SUCCESS: {
      return { ...state, data: action.data, request: false }
    }
    case GET_ORDERS_FAILED: {
      return { ...initialState, failed: true, errorMessage: action.payload.message }
    }
    default: {
      return state
    }
  }
}

export default ordersReducer
