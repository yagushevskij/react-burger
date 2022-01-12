import { combineReducers } from 'redux'
import orderReducer from './order'
import constructorReducer from './constructor'
import ingredientsReducer from './ingredients'
import authReducer from './auth'
import userReducer from './user'
import restorePassReducer from './restore-pass'
import resetPassReducer from './reset-pass'
import ordersReducer from './orders'

export const rootReducer = combineReducers({
  order: orderReducer,
  orders: ordersReducer,
  contructor: constructorReducer,
  ingredients: ingredientsReducer,
  auth: authReducer,
  user: userReducer,
  restorePass: restorePassReducer,
  resetPass: resetPassReducer,
})
