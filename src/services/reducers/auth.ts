import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_FAILED, LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILED } from '../actions/auth'
import type { TAuthActions } from '../actions/auth'

interface IAuthReducerState {
  request: boolean;
  failed: boolean;
}

const initialState: IAuthReducerState = {
  request: false,
  failed: false
}

const authReducer = (state = initialState, action: TAuthActions): IAuthReducerState => {
  switch (action.type) {
    case AUTH_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        request: true,
        failed: false
      }
    case AUTH_REQUEST_SUCCESS:
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        request: false
      }
    case AUTH_REQUEST_FAILED:
    case LOGOUT_REQUEST_FAILED:
      return {
        ...initialState,
        failed: true
      }
    default:
      return state
  }
}

export default authReducer
