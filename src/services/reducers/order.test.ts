import reducer from './order'
import { orderActions } from '../actions/order'
import { itemActions } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './order'

const requestState = { ...initialState, request: true, failed: false }

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, itemActions.request)).toEqual(initialState)
  })

  it('should handle SET_INITIAL_ORDER_STATE', () => {
    expect(reducer(requestState, orderActions.setInitialState)).toEqual(initialState)
  })

  it('should handle GET_ORDER_REQUEST', () => {
    expect(reducer(initialState, orderActions.request)).toEqual(requestState)
  })

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(reducer(requestState, orderActions.requestSuccess(123))).toEqual({ ...requestState, request: false, number: 123 })
  })

  it('should handle GET_ORDER_FAILED', () => {
    expect(reducer(requestState, orderActions.requestFailed('error'))).toEqual({ ...requestState, request: false, failed: true, errorMessage: 'error' })
  })
})