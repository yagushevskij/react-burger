import reducer from './auth'
import { authActions, logoutActions } from '../actions/auth'
import { itemActions } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './auth'

const { request: authRequest, requestFailed: authRequestFailed, requestSuccess: authRequestSuccess } = authActions;
const { request: logoutRequest, requestFailed: logoutRequestFailed, requestSuccess: logoutRequestSuccess } = logoutActions;

const requestState = { ...initialState, request: true, failed: false }

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, itemActions.request)).toEqual(initialState)
  })

  it('should handle AUTH_REQUEST || LOGOUT_REQUEST', () => {
    expect(reducer(initialState, authRequest)).toEqual(requestState)

    expect(reducer(initialState, logoutRequest)).toEqual(requestState)
  })

  it('should handle AUTH_REQUEST_SUCCESS || LOGOUT_REQUEST_SUCCESS', () => {
    expect(reducer(requestState, authRequestSuccess)).toEqual({
      ...requestState,
      request: false,
      failed: false,
    })

    expect(reducer(requestState, logoutRequestSuccess)).toEqual({
      ...requestState,
      request: false,
      failed: false,
    })
  })

  it('should handle AUTH_REQUEST_FAILED || LOGOUT_REQUEST_FAILED', () => {
    expect(reducer(requestState, authRequestFailed('Ошибка'))).toEqual({
      ...requestState,
      request: false,
      failed: true,
      errorMessage: 'Ошибка',
    })

    expect(reducer(requestState, logoutRequestFailed('Ошибка'))).toEqual({
      ...requestState,
      request: false,
      failed: true,
      errorMessage: 'Ошибка',
    })
  })
})
