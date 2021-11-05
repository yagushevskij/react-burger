import { combineReducers } from 'redux'

import orderReducer from './order'
import constructorReducer from './constructor'
import ingredientsReducer from './ingredients'

export const rootReducer = combineReducers({
  order: orderReducer,
  contructor: constructorReducer,
  ingredients: ingredientsReducer
})
