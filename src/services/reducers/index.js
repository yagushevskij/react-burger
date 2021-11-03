import { combineReducers } from 'redux'

import orderReducer from './order'
import modalReducer from './modal'
import constructorReducer from './constructor'
import ingredientsReducer from './ingredients'

export const rootReducer = combineReducers({
  order: orderReducer,
  modal: modalReducer,
  contructor: constructorReducer,
  ingredients: ingredientsReducer
})
