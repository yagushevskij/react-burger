import reducer from './ingredients'
import * as types from '../actions/ingredients'
import { initialState } from './ingredients'
import { AUTH_REQUEST } from '../actions/auth' //Экшн от другого редьюсера

const ingredients = [
  {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    name: 'Соус фирменный Space Sauce',
    price: 80,
    proteins: 50,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733cd',
    qty: 3,
  },
  {
    calories: 30,
    carbohydrates: 40,
    fat: 20,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    name: 'Соус Spicy-X',
    price: 90,
    proteins: 30,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733cc',
    qty: 0,
  },
]
const state = { ...initialState, items: ingredients }
const requestState = { ...initialState, itemsRequest: true, itemsRequestFailed: false }

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, { type: AUTH_REQUEST })).toEqual(initialState)
  })

  it('should handle GET_ITEMS_REQUEST', () => {
    expect(reducer(initialState, { type: types.GET_ITEMS_REQUEST })).toEqual(requestState)
  })

  it('should handle GET_ITEMS_SUCCESS', () => {
    expect(reducer(requestState, { type: types.GET_ITEMS_SUCCESS, payload: { items: ingredients } })).toEqual({
      ...requestState,
      itemsRequest: false,
      items: ingredients,
    })
  })

  it('should handle GET_ITEMS_FAILED', () => {
    expect(reducer({ ...requestState, itemsRequest: true }, { type: types.GET_ITEMS_FAILED })).toEqual({
      ...requestState,
      itemsRequest: false,
      itemsRequestFailed: true,
    })
  })

  it('should handle UPDATE_ITEMS', () => {
    expect(reducer(initialState, types.itemActions.updateItems(ingredients))).toEqual({ ...initialState, items: ingredients })
  })

  it('should handle INCREASE_ITEM_COUNT', () => {
    expect(reducer(state, types.itemActions.increaseItem('60d3b41abdacab0026a733cd', 1))).toEqual({
      ...state,
      items: [
        {
          calories: 14,
          carbohydrates: 11,
          fat: 22,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          name: 'Соус фирменный Space Sauce',
          price: 80,
          proteins: 50,
          type: 'sauce',
          __v: 0,
          _id: '60d3b41abdacab0026a733cd',
          qty: 4,
        },
        {
          calories: 30,
          carbohydrates: 40,
          fat: 20,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          name: 'Соус Spicy-X',
          price: 90,
          proteins: 30,
          type: 'sauce',
          __v: 0,
          _id: '60d3b41abdacab0026a733cc',
          qty: 0,
        },
      ],
    })
  })

  it('should handle DECREASE_ITEM_COUNT', () => {
    expect(reducer(state, types.itemActions.decreaseItem('60d3b41abdacab0026a733cd', 1))).toEqual({
      ...state,
      items: [
        {
          calories: 14,
          carbohydrates: 11,
          fat: 22,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          name: 'Соус фирменный Space Sauce',
          price: 80,
          proteins: 50,
          type: 'sauce',
          __v: 0,
          _id: '60d3b41abdacab0026a733cd',
          qty: 2,
        },
        {
          calories: 30,
          carbohydrates: 40,
          fat: 20,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          name: 'Соус Spicy-X',
          price: 90,
          proteins: 30,
          type: 'sauce',
          __v: 0,
          _id: '60d3b41abdacab0026a733cc',
          qty: 0,
        },
      ],
    })
  })
})
