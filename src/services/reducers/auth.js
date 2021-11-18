import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_FAILED, LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILED } from '../actions/auth'

const initialState = {
  // user: null,
  request: false,
  failed: false,
  errorMessage: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        errorMessage: null
      }
    case AUTH_REQUEST_SUCCESS:
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        request: false
        // user: action.payload.user
      }
    case AUTH_REQUEST_FAILED:
    case LOGOUT_REQUEST_FAILED:
      return {
        ...initialState,
        failed: true,
        errorMessage: action.payload.errorMessage
      }
    default:
      return state
  }
}

export default authReducer
