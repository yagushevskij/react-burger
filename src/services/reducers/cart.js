import {
  GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, ADD_ITEM_DATA,
  REMOVE_ITEM_DATA, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
  ADD_CONSTR_ITEM, REMOVE_CONSTR_ITEM, UPDATE_CONSTR_ITEMS, REMOVE_ORDER
} from '../actions/cart';
import { getKeyByGenerate } from '../../utils/helpers';

const initialState = {

  items: [],
  itemsRequest: false,
  itemsFailed: false,

  constrItems: [],

  currentItem: {},

  order: { number: null },
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
      return {
        ...state,
        constrItems: [...state.constrItems, {...action.item, key: getKeyByGenerate()}],
        items: [...state.items].map(el => el._id === action.item._id ? { ...el, qty: ++el.qty } : el)
      }
    }
    case REMOVE_CONSTR_ITEM: {
      return {
        ...state,
        constrItems: [...state.constrItems].filter(el => el.key !== action.item.key),
        items: [...state.items].map(el => el._id === action.item._id ? { ...el, qty: --el.qty } : el)
      }
    }
    case UPDATE_CONSTR_ITEMS: {
      return { ...state, constrItems: action.items };
    }
    case ADD_ITEM_DATA: {
      return { ...state, currentItem: action.item };
    }
    case REMOVE_ITEM_DATA: {
      return { ...state, currentItem: {} };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, order: { ...state.order, number: action.orderNumber}, orderRequest: false };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case REMOVE_ORDER: {
      return { ...state, order: { ...state.order, number: null} }
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;