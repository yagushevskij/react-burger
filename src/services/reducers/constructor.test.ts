import reducer from './constructor'
import { constrItemActions } from '../actions/constructor'
import { initialState } from './constructor'
import { itemActions} from '../actions/ingredients' //Экшн от другого редьюсера

const ingredient = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  key: '0Hhjns',
  name: 'Флюоресцентная булка R2-D3',
  price: 988,
  proteins: 44,
  type: 'bun',
  __v: 0,
  _id: '60d3b41abdacab0026a733c7',
}

const ingredients = [
  {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    key: 'QT2E0',
    name: 'Соус фирменный Space Sauce',
    price: 80,
    proteins: 50,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733cd',
  },
  {
    calories: 30,
    carbohydrates: 40,
    fat: 20,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    key: '0Hhjn',
    name: 'Соус Spicy-X',
    price: 90,
    proteins: 30,
    type: 'sauce',
    __v: 0,
    _id: '60d3b41abdacab0026a733cc',
  },
]

const state = { ...initialState, items: ingredients} //На вырост в случае добавление новых полей.

describe('contructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, itemActions.request)).toEqual(initialState)
  })

  it('should handle ADD_CONSTR_ITEM', () => {
    expect(reducer(initialState, constrItemActions.addItem(ingredient))).toEqual({ ...initialState, items: [ingredient] })
  })

  it('should handle REMOVE_CONSTR_ITEM', () => {
    expect(reducer(state, constrItemActions.removeItem('60d3b41abdacab0026a733c7'))).toEqual({ ...state, items: state.items.filter(el => el._id !== '60d3b41abdacab0026a733c7') })
  })

  it('should handle UPDATE_CONSTR_ITEMS', () => {
    expect(reducer(initialState, constrItemActions.updateItems(ingredients))).toEqual({ ...initialState, items: ingredients })
  })
})
