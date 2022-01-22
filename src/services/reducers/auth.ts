import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILED,
} from '../actions/auth'
import type { TAppActions } from '../actions/index'

interface IAuthReducerState {
  request: boolean
  failed: boolean
  errorMessage: string | null | undefined
}

export const initialState: IAuthReducerState = {
  request: false,
  failed: false,
  errorMessage: null,
}

const authReducer = (state = initialState, action: TAppActions): IAuthReducerState => {
  switch (action.type) {
    case AUTH_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
      }
    case AUTH_REQUEST_SUCCESS:
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
      }
    case AUTH_REQUEST_FAILED:
    case LOGOUT_REQUEST_FAILED:
      return {
        ...initialState,
        failed: true,
        errorMessage: action.payload?.errorMessage
      }
    default:
      return state
  }
}

export default authReducer
