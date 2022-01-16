import {
  GET_USER_REQUEST,
  GET_USER_REQUEST_SUCCESS,
  GET_USER_REQUEST_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST_FAILED,
  SET_USER,
} from '../actions/user'
import type { IUserData } from '../actions/user'
import { TAppActions } from '../actions'

interface IUserState {
  data: IUserData
  request: boolean
  failed: boolean
  errorMessage: null | string | undefined
}

export const initialState: IUserState = {
  data: {},
  request: false,
  failed: false,
  errorMessage: null,
}

const userReducer = (state = initialState, action: TAppActions): IUserState => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        errorMessage: null,
      }
    case GET_USER_REQUEST_SUCCESS:
    case UPDATE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        data: action.payload.user,
      }
    case GET_USER_REQUEST_FAILED:
    case UPDATE_USER_REQUEST_FAILED:
      return {
        ...state,
        failed: true,
        request: false,
        errorMessage: action.payload?.message,
      }
    case SET_USER:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state
  }
}

export default userReducer
