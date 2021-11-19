import {
  GET_USER_REQUEST,
  GET_USER_REQUEST_SUCCESS,
  GET_USER_REQUEST_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST_FAILED,
  SET_USER
} from '../actions/user'

const initialState = {
  data: {},
  request: false,
  failed: false,
  errorMessage: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        errorMessage: null
      }
    case GET_USER_REQUEST_SUCCESS:
    case UPDATE_USER_REQUEST_SUCCESS:
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
    case UPDATE_USER_REQUEST_FAILED:
      return {
        ...state,
        failed: true,
        errorMessage: action.payload.errorMessage
      }
    case SET_USER:
      console.log(action)
      return {
        ...initialState,
        data: action.payload.data
      }
    default:
      return state
  }
}

export default userReducer
