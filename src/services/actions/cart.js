import { API_URL } from "../../utils/config";

const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

const ADD_CONSTR_ITEM = 'ADD_CONSTR_ITEM';
const REMOVE_CONSTR_ITEM = 'REMOVE_CONSTR_ITEM';
const UPDATE_CONSTR_ITEMS = 'UPDATE_CONSTR_ITEMS';

const ADD_ITEM_DATA = 'ADD_ITEM_DATA';
const REMOVE_ITEM_DATA = 'REMOVE_ITEM_DATA';

const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const getItems = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    try {
      const res = await fetch(API_URL + 'ingredients');
      if (res && res.ok) {
        const resData = await res.json();
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: resData.data
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const getOrder = (idsArr) => {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    try {
      const res = await fetch(API_URL + 'orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: idsArr })
      });
      if (res && res.success) {
        const resData = await res.json();
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: resData.order.number
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export {
  getItems, getOrder,
  GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, ADD_ITEM_DATA,
  REMOVE_ITEM_DATA, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
  ADD_CONSTR_ITEM, REMOVE_CONSTR_ITEM, UPDATE_CONSTR_ITEMS
}