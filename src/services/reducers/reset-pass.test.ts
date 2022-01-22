import reducer from './reset-pass'
import { resetPassActions } from '../actions/reset-pass'
import { itemActions } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './reset-pass'

const requestState = { ...initialState, request: true, failed: false }

describe('resetPass reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, itemActions.request)).toEqual(initialState)
  })

  it('should handle SET_INIT_STATE_RESET_PASS', () => {
    expect(reducer(requestState, resetPassActions.setInitState)).toEqual(initialState)
  })

  it('should handle RESET_PASS_REQUEST', () => {
    expect(reducer(initialState, resetPassActions.request)).toEqual(requestState)
  })

  it('should handle RESET_PASS_REQUEST_SUCCESS', () => {
    expect(reducer(requestState, resetPassActions.requestSuccess)).toEqual({ ...initialState, success: true })
  })

  it('should handle RESET_PASS_REQUEST_FAILED', () => {
    expect(reducer(requestState, resetPassActions.requestFailed('error'))).toEqual({
      ...initialState,
      failed: true,
      errorMessage: 'error',
    })
  })
})
