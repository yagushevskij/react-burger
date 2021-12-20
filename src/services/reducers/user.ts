import {
  GET_USER_REQUEST,
  GET_USER_REQUEST_SUCCESS,
  GET_USER_REQUEST_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST_FAILED,
  SET_USER
} from '../actions/user'
import type { TUserActions } from '../actions/user'
import type { IUserData } from '../actions/user'

interface IUserState {
  data: IUserData;
  request: boolean;
  failed: boolean;
  errorMessage: null | string | undefined;
}

const initialState: IUserState = {
  data: {},
  request: false,
  failed: false,
  errorMessage: null
}

const userReducer = (state = initialState, action: TUserActions): IUserState => {
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
        errorMessage: action.payload?.message
      }
    case UPDATE_USER_REQUEST_FAILED:
      return {
        ...state,
        failed: true,
        errorMessage: action.payload?.message
      }
    case SET_USER:
      return {
        ...initialState,
        data: action.payload.data
      }
    default:
      return state
  }
}

export default userReducer
