import {
  GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, ADD_ITEM_DATA,
  REMOVE_ITEM_DATA, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
  ADD_CONSTR_ITEM, REMOVE_CONSTR_ITEM, UPDATE_CONSTR_ITEMS
} from '../actions/cart';

const initialState = {

  items: [],
  itemsRequest: false,
  itemsFailed: false,

  constrItems: [],

  currentItem: {},

  order: {},
  orderRequest: false,
  orderFailed: false,

};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return { ...state, itemsRequest: true };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false, itemsRequest: false,
        items: action.items.map(el => {return {...el, qty: 0}})
      }
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case ADD_CONSTR_ITEM: {
      const isBunExist = !!state.constrItems.find((el) => el.type === 'bun');
      if (action.item.type === 'bun' && isBunExist) {
        return {
          ...state,
          constrItems: [...state.constrItems].map(item => item.type === 'bun' ? action.item : item)
        }
      }
      return {
        ...state,
        constrItems: [...state.constrItems, action.item],
        items: [...state.items].map(el => el._id === action._id ? { ...el, qty: ++el.qty } : el)
      }
    }
    case REMOVE_CONSTR_ITEM: {
      return {
        ...state,
        constrItems: [...state.constrItems].filter(el => el._id !== action.item._id),
        items: [...state.items].map(el => el._id === action._id ? { ...el, qty: --el.qty } : el)
      }
    }
    case UPDATE_CONSTR_ITEMS: {
      return; // Пока так
    }
    case ADD_ITEM_DATA: {
      return { ...state, currentItem: action.data };
    }
    case REMOVE_ITEM_DATA: {
      return { ...state, currentItem: {} };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, order: action.order, orderRequest: false };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;