import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  UPDATE_ITEMS,
  INCREASE_ITEM_COUNT,
  DECREASE_ITEM_COUNT,
} from '../actions/ingredients'
import type { TAppActions } from '../actions/index'
import type { IMainCardType } from '../../utils/types'

interface IIngredientsState {
  items: IMainCardType[]
  itemsRequest: boolean
  itemsRequestFailed: boolean
}

export const initialState: IIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsRequestFailed: false,
}

const ingredientsReducer = (state = initialState, action: TAppActions): IIngredientsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return { ...state, itemsRequest: true, itemsRequestFailed: false }
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        items: action.payload.items,
      }
    }
    case GET_ITEMS_FAILED: {
      return { ...initialState, itemsRequest: false, itemsRequestFailed: true }
    }
    case UPDATE_ITEMS: {
      return { ...state, items: action.payload.items }
    }
    case INCREASE_ITEM_COUNT: {
      return { ...state, items: state.items.map(el => (el._id === action.payload.id ? { ...el, qty: el.qty + action.payload.qty } : el)) }
    }
    case DECREASE_ITEM_COUNT: {
      return { ...state, items: state.items.map(el => (el._id === action.payload.id ? { ...el, qty: el.qty - action.payload.qty } : el)) }
    }
    default: {
      return state
    }
  }
}

export default ingredientsReducer
