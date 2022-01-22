import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, SET_INITIAL_ORDER_STATE } from '../actions/order'
import { TAppActions } from '../actions'

interface IOrderState {
  number: number | null
  request: boolean
  failed: boolean
  errorMessage: string | null | undefined
}

export const initialState: IOrderState = {
  number: null,
  request: false,
  failed: false,
  errorMessage: null,
}

const orderReducer = (state = initialState, action: TAppActions): IOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...initialState, request: true, failed: false }
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, number: action.payload.orderNumber, request: false }
    }
    case GET_ORDER_FAILED: {
      return { ...initialState, failed: true, errorMessage: action.payload?.message }
    }
    case SET_INITIAL_ORDER_STATE: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default orderReducer
