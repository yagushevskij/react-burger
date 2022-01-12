import { ADD_CONSTR_ITEM, REMOVE_CONSTR_ITEM, UPDATE_CONSTR_ITEMS } from '../actions/constructor'
import { IConCardType } from '../../utils/types'
import { TConstructorActions } from '../actions/constructor'

interface IConstructorReducerState {
  items: IConCardType[]
}

const initialState: IConstructorReducerState = {
  items: [],
}

const constructorReducer = (state = initialState, action: TConstructorActions): IConstructorReducerState => {
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
        items: state.items.filter(el => el.key !== action.payload.item.key),
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
