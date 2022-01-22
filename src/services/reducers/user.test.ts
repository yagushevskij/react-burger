import reducer from './user'
import { userActions } from '../actions/user'
import { itemActions } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './user'

const user = {
  email: 'hokac@mailinator.com',
  name: 'Gay Lawrences',
}
const requestState = { ...initialState, request: true, failed: false }

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, itemActions.request)).toEqual(initialState)
  })

  it('should handle GET_USER_REQUEST || UPDATE_USER_REQUEST', () => {
    expect(reducer(initialState, userActions.getUserReq)).toEqual(requestState)
    expect(reducer(initialState, userActions.updateUserReq)).toEqual(requestState)
  })

  it('should handle GET_USER_REQUEST_SUCCESS || UPDATE_USER_REQUEST_SUCCESS', () => {
    expect(reducer(requestState, userActions.getUserReqSuccess(user))).toEqual({
      ...requestState,
      request: false,
      data: user,
    })
    expect(reducer(requestState, userActions.updateUserReqSuccess(user))).toEqual({
      ...requestState,
      request: false,
      data: user,
    })
  })

  it('should handle GET_USER_REQUEST_FAILED || UPDATE_USER_REQUEST_FAILED', () => {
    expect(reducer(requestState, userActions.getUserReqFailed('error'))).toEqual({
      ...initialState,
      failed: true,
      errorMessage: 'error',
    })
    expect(reducer(requestState, userActions.updateUserReqFailed('error'))).toEqual({
      ...initialState,
      failed: true,
      errorMessage: 'error',
    })
  })

  it('should handle SET_USER', () => {
    expect(reducer(initialState, userActions.setUser(user))).toEqual({ ...initialState, data: user })
  })
})
