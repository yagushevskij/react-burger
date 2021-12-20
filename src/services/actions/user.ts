export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST'
export const GET_USER_REQUEST_SUCCESS: 'GET_USER_REQUEST_SUCCESS' = 'GET_USER_REQUEST_SUCCESS'
export const GET_USER_REQUEST_FAILED: 'GET_USER_REQUEST_FAILED' = 'GET_USER_REQUEST_FAILED'

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_REQUEST_SUCCESS: 'UPDATE_USER_REQUEST_SUCCESS' = 'UPDATE_USER_REQUEST_SUCCESS'
export const UPDATE_USER_REQUEST_FAILED: 'UPDATE_USER_REQUEST_FAILED' = 'UPDATE_USER_REQUEST_FAILED'

export const SET_USER: 'SET_USER' = 'SET_USER'

  export interface IUserData {
    email?: string;
    name?: string;
    password?: string;
  }

interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
  }
  interface IGetUserRequestSuccessAction {
    readonly type: typeof GET_USER_REQUEST_SUCCESS;
    readonly payload: {
        user: IUserData
    }
  }
  interface IGetUserRequestFailedAction {
    readonly type: typeof GET_USER_REQUEST_FAILED;
    readonly payload: {
        message: string
    }
  } 
  interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
  } 
  interface IUpdateUserRequestSuccessAction {
    readonly type: typeof UPDATE_USER_REQUEST_SUCCESS;
    readonly payload: {
        user: IUserData
    }
  } 
  interface IUpdateUserRequestFailedAction {
    readonly type: typeof UPDATE_USER_REQUEST_FAILED;
    readonly payload: {
        message: string
    }
  }
  interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly payload: {
        data: IUserData
    }
  } 

  export type TUserActions = IGetUserRequestAction | IGetUserRequestFailedAction | IGetUserRequestSuccessAction |
  IUpdateUserRequestAction | IUpdateUserRequestFailedAction | IUpdateUserRequestSuccessAction |
  ISetUserAction