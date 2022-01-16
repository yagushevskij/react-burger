import reducer from './auth'
import * as types from '../actions/auth'
import { GET_ITEMS_REQUEST } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './auth'

const requestState = {...initialState, request: true, failed: false,}

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: GET_ITEMS_REQUEST })).toEqual(initialState)
  })

  it('should handle AUTH_REQUEST || LOGOUT_REQUEST', () => {
    expect(reducer(initialState, { type: types.AUTH_REQUEST })).toEqual(requestState)

    expect(reducer(initialState, { type: types.LOGOUT_REQUEST })).toEqual(requestState)
  })

  it('should handle AUTH_REQUEST_SUCCESS || LOGOUT_REQUEST_SUCCESS', () => {
    expect(reducer(requestState, { type: types.AUTH_REQUEST_SUCCESS })).toEqual({
      ...requestState,
      request: false,
      failed: false,
    })

    expect(reducer(requestState, { type: types.LOGOUT_REQUEST_SUCCESS })).toEqual({
      ...requestState,
      request: false,
      failed: false,
    })
  })

  it('should handle AUTH_REQUEST_FAILED || LOGOUT_REQUEST_FAILED', () => {
    expect(reducer(requestState, { type: types.AUTH_REQUEST_FAILED })).toEqual({
      ...requestState,
      request: false,
      failed: true,
    })

    expect(reducer(requestState, { type: types.LOGOUT_REQUEST_FAILED })).toEqual({
      ...requestState,
      request: false,
      failed: true,
    })
  })
})
