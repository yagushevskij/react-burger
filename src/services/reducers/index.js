import { combineReducers } from 'redux'

import orderReducer from './order'
import constructorReducer from './constructor'
import ingredientsReducer from './ingredients'
import authReducer from './auth'

export const rootReducer = combineReducers({
  order: orderReducer,
  contructor: constructorReducer,
  ingredients: ingredientsReducer,
  auth: authReducer
})
