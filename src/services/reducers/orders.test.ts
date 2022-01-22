import reducer from './orders'
import * as types from '../actions/websockets'
import { itemActions } from '../actions/ingredients' //Экшн от другого редьюсера
import { initialState } from './orders'
import type { TOrderStatus } from './orders'

const orders = [
  {
    createdAt: '2022-01-16T14:05:50.259Z',
    ingredients: ['60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733c7'],
    name: 'Space флюоресцентный бургер',
    number: 8278,
    status: 'done' as TOrderStatus,
    updatedAt: '2022-01-16T14:05:50.591Z',
    _id: '61e4263e6d7cd8001b2d0c54',
  },
  {
    createdAt: '2022-01-16T13:59:50.190Z',
    ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733cd'],
    name: 'Space spicy флюоресцентный бургер',
    number: 8277,
    status: 'done' as TOrderStatus,
    updatedAt: '2022-01-16T13:59:50.365Z',
    _id: '61e424d66d7cd8001b2d0c4a',
  },
]
const total = 500
const totalToday = 10

const connectedState = { ...initialState, wsConnected: true }

describe('orders reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, itemActions.request)).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(reducer(initialState, { type: types.WS_CONNECTION_SUCCESS })).toEqual(connectedState)
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(reducer(initialState, { type: types.WS_CONNECTION_ERROR })).toEqual({ ...initialState, wsConnected: false })
  })

  it('should handle WS_CONNECTION_ERROR || WS_CONNECTION_CLOSED', () => {
    expect(reducer(initialState, { type: types.WS_CONNECTION_ERROR })).toEqual({ ...initialState, wsConnected: false })
    expect(reducer(initialState, { type: types.WS_CONNECTION_CLOSED })).toEqual({ ...initialState, wsConnected: false })
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(reducer(connectedState, { type: types.WS_GET_MESSAGE, payload: { success: true, total, totalToday, orders } })).toEqual({
      ...connectedState,
      data: orders,
      total,
      totalToday,
    })
  })
})
