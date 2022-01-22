import { ADD_CONSTR_ITEM, REMOVE_CONSTR_ITEM, UPDATE_CONSTR_ITEMS } from '../actions/constructor'
import { IConCardType } from '../../utils/types'
import type { TAppActions } from '../actions/index'

interface IConstructorReducerState {
  items: IConCardType[]
}

export const initialState: IConstructorReducerState = {
  items: [],
}

const constructorReducer = (state = initialState, action: TAppActions): IConstructorReducerState => {
  switch (action.type) {
    case ADD_CONSTR_ITEM: {
      return {
        ...state,
        items: [...state.items, action.payload.item],
      }
    }
    case REMOVE_CONSTR_ITEM: {
      return {
        ...state,
        items: state.items.filter(el => el.key !== action.payload.key),
      }
    }
    case UPDATE_CONSTR_ITEMS: {
      return { ...state, items: action.payload.items }
    }
    default: {
      return state
    }
  }
}

export default constructorReducer
