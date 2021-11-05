import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, UPDATE_ITEMS, INCREASE_ITEM_COUNT, DECREASE_ITEM_COUNT, SET_CURRENT_ITEM } from '../actions/ingredients'

const initialState = {
  items: [],
  itemsRequest: false,
  itemsRequestFailed: false,
  current: null
}

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return { ...state, itemsRequest: true, itemsRequestFailed: false }
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        items: action.items
      }
    }
    case GET_ITEMS_FAILED: {
      return { ...initialState, itemsRequestFailed: true }
    }
    case UPDATE_ITEMS: {
      return { ...state, items: action.payload.items }
    }
    case INCREASE_ITEM_COUNT: {
      return { ...state, items: [...state.items].map(el => (el._id === action.payload.item._id ? { ...el, qty: ++el.qty } : el)) }
    }
    case DECREASE_ITEM_COUNT: {
      return { ...state, items: [...state.items].map(el => (el._id === action.payload.item._id ? { ...el, qty: --el.qty } : el)) }
    }
    case SET_CURRENT_ITEM: {
      return { ...state, current: action.payload.item }
    }
    default: {
      return state
    }
  }
}

export default ingredientsReducer
