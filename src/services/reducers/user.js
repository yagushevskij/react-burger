import { GET_USER_REQUEST, GET_USER_REQUEST_SUCCESS, GET_USER_REQUEST_FAILED } from '../actions/user'

const initialState = {
  data: {},
  request: false,
  failed: false,
  errorMessage: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        errorMessage: null
      }
    case GET_USER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        data: action.payload.user
      }
    case GET_USER_REQUEST_FAILED:
      return {
        ...initialState,
        failed: true,
        errorMessage: action.payload.errorMessage
      }
    default:
      return state
  }
}

export default userReducer