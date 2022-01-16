import reducer from './user'
import * as types from '../actions/user'
import { GET_ITEMS_REQUEST } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './user'

const user = {
  email: 'hokac@mailinator.com',
  name: 'Gay Lawrences',
}
const requestState = { ...initialState, request: true, failed: false }

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: GET_ITEMS_REQUEST })).toEqual(initialState)
  })

  it('should handle GET_USER_REQUEST || UPDATE_USER_REQUEST', () => {
    expect(reducer(initialState, { type: types.GET_USER_REQUEST })).toEqual(requestState)
    expect(reducer(initialState, { type: types.UPDATE_USER_REQUEST })).toEqual(requestState)
  })

  it('should handle GET_USER_REQUEST_SUCCESS || UPDATE_USER_REQUEST_SUCCESS', () => {
    expect(reducer(requestState, { type: types.GET_USER_REQUEST_SUCCESS, payload: { user } })).toEqual({
      ...requestState,
      request: false,
      data: user,
    })
    expect(reducer(requestState, { type: types.UPDATE_USER_REQUEST_SUCCESS, payload: { user } })).toEqual({
      ...requestState,
      request: false,
      data: user,
    })
  })

  it('should handle GET_USER_REQUEST_FAILED || UPDATE_USER_REQUEST_FAILED', () => {
    expect(reducer(requestState, { type: types.GET_USER_REQUEST_FAILED, payload: { message: 'error' } })).toEqual({
      ...initialState,
      failed: true,
      errorMessage: 'error',
    })
    expect(reducer(requestState, { type: types.UPDATE_USER_REQUEST_FAILED, payload: { message: 'error' } })).toEqual({
      ...initialState,
      failed: true,
      errorMessage: 'error',
    })
  })

  it('should handle SET_USER', () => {
    expect(reducer(initialState, { type: types.SET_USER, payload: { data: user } })).toEqual({ ...initialState, data: user })
  })
})
