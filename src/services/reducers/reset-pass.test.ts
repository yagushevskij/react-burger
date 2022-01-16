import reducer from './reset-pass'
import * as types from '../actions/reset-pass'
import { GET_ITEMS_REQUEST } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './reset-pass'

const requestState = { ...initialState, request: true, failed: false }

describe('resetPass reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: GET_ITEMS_REQUEST })).toEqual(initialState)
  })

  it('should handle SET_INIT_STATE_RESET_PASS', () => {
    expect(reducer(requestState, { type: types.SET_INIT_STATE_RESET_PASS })).toEqual(initialState)
  })

  it('should handle RESET_PASS_REQUEST', () => {
    expect(reducer(initialState, { type: types.RESET_PASS_REQUEST })).toEqual(requestState)
  })

  it('should handle RESET_PASS_REQUEST_SUCCESS', () => {
    expect(reducer(requestState, { type: types.RESET_PASS_REQUEST_SUCCESS })).toEqual({ ...initialState, success: true })
  })

  it('should handle RESET_PASS_REQUEST_FAILED', () => {
    expect(reducer(requestState, { type: types.RESET_PASS_REQUEST_FAILED, payload: { message: 'error' } })).toEqual({
      ...initialState,
      failed: true,
      errorMessage: 'error',
    })
  })
})
