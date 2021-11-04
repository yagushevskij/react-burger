import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, SET_INITIAL_ORDER_STATE } from '../actions/order'

const initialState = {
  number: null,
  request: false,
  failed: false,
  errorMessage: null
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...initialState, request: true }
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, number: action.orderNumber, request: false }
    }
    case GET_ORDER_FAILED: {
      return { ...initialState, failed: true, errorMessage: action.payload.message }
    }
    case SET_INITIAL_ORDER_STATE: {
      return { ...initialState }
    }
    default: {
      return state
    }
  }
}

export default orderReducer
