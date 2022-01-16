import { RESET_PASS_REQUEST, RESET_PASS_REQUEST_SUCCESS, RESET_PASS_REQUEST_FAILED, SET_INIT_STATE_RESET_PASS } from '../actions/reset-pass'
import { TAppActions } from '../actions'

interface IResetPassState {
  request: boolean
  failed: boolean
  success: boolean
  errorMessage: null | string | undefined
}

export const initialState: IResetPassState = {
  request: false,
  failed: false,
  success: false,
  errorMessage: null,
}

const resetPassReducer = (state = initialState, action: TAppActions): IResetPassState => {
  switch (action.type) {
    case RESET_PASS_REQUEST:
      return {
        ...initialState,
        request: true,
        failed: false,
      }
    case RESET_PASS_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        success: true,
      }
    case RESET_PASS_REQUEST_FAILED:
      return {
        ...initialState,
        failed: true,
        errorMessage: action.payload?.message,
      }
    case SET_INIT_STATE_RESET_PASS: {
      return {
        ...initialState,
      }
    }
    default:
      return state
  }
}

export default resetPassReducer
