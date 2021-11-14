import { LOGIN_REQUEST, REGISTER_REQUEST, LOGIN_REQUEST_SUCCESS, REGISTER_REQUEST_SUCCESS, LOGIN_REQUEST_FAILED, REGISTER_REQUEST_FAILED } from '../actions/auth'

const initialState = {
  user: null,
  request: false,
  failed: false,
  errorMessage: null,
  tokenExpiration: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        errorMessage: null
      }
    case LOGIN_REQUEST_SUCCESS:
    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        user: action.payload.user,
        tokenExpiration: action.payload.tokenExpiration
      }
    case LOGIN_REQUEST_FAILED:
    case REGISTER_REQUEST_FAILED:
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
