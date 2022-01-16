import reducer from './order'
import * as types from '../actions/order'
import { GET_ITEMS_REQUEST } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './order'

const requestState = { ...initialState, request: true, failed: false }

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: GET_ITEMS_REQUEST })).toEqual(initialState)
  })

  it('should handle SET_INITIAL_ORDER_STATE', () => {
    expect(reducer(requestState, { type: types.SET_INITIAL_ORDER_STATE })).toEqual(initialState)
  })

  it('should handle GET_ORDER_REQUEST', () => {
    expect(reducer(initialState, { type: types.GET_ORDER_REQUEST })).toEqual(requestState)
  })

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(reducer(requestState, { type: types.GET_ORDER_SUCCESS, payload: { orderNumber: 123 } })).toEqual({ ...requestState, request: false, number: 123 })
  })

  it('should handle GET_ORDER_FAILED', () => {
    expect(reducer(requestState, { type: types.GET_ORDER_FAILED, payload: { message: 'error' } })).toEqual({ ...requestState, request: false, failed: true, errorMessage: 'error' })
  })
})