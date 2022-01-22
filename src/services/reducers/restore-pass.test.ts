import reducer from './restore-pass'
import { restorePassActions } from '../actions/restore-pass'
import { itemActions } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './restore-pass'

const requestState = { ...initialState, request: true, failed: false }

describe('restorePass reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, itemActions.request)).toEqual(initialState)
  })

  it('should handle SET_INIT_STATE_RESTORE_PASS', () => {
    expect(reducer(requestState, restorePassActions.setInitState)).toEqual(initialState)
  })

  it('should handle RESTORE_PASS_REQUEST', () => {
    expect(reducer(initialState, restorePassActions.request)).toEqual(requestState)
  })

  it('should handle RESTORE_PASS_REQUEST_SUCCESS', () => {
    expect(reducer(requestState, restorePassActions.requestSuccess)).toEqual({ ...initialState, success: true })
  })

  it('should handle RESTORE_PASS_REQUEST_FAILED', () => {
    expect(reducer(requestState, restorePassActions.requestFailed('error'))).toEqual({
      ...initialState,
      failed: true,
      errorMessage: 'error',
    })
  })
})
