import { API_URL } from '../../utils/config'

const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'
const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'

const UPDATE_ITEMS = 'UPDATE_ITEMS'
const INCREASE_ITEM_COUNT = 'INCREASE_ITEM_COUNT'
const DECREASE_ITEM_COUNT = 'DECREASE_ITEM_COUNT'

const ADD_CONSTR_ITEM = 'ADD_CONSTR_ITEM'
const REMOVE_CONSTR_ITEM = 'REMOVE_CONSTR_ITEM'
const UPDATE_CONSTR_ITEMS = 'UPDATE_CONSTR_ITEMS'

const ADD_ITEM_DATA = 'ADD_ITEM_DATA'
const REMOVE_ITEM_DATA = 'REMOVE_ITEM_DATA'

const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
const REMOVE_ORDER = 'REMOVE_ORDER'
const SET_CUSTOM_ERROR = 'SET_CUSTOM_ERROR'

const setCustomError = text => ({
  type: SET_CUSTOM_ERROR,
  payload: { text }
})

const itemActions = {
  updateItems: items => ({
    type: UPDATE_ITEMS,
    payload: {
      items
    }
  }),
  increaseItem: item => ({
    type: INCREASE_ITEM_COUNT,
    payload: {
      item
    }
  }),
  decreaseItem: item => ({
    type: DECREASE_ITEM_COUNT,
    payload: {
      item
    }
  })
}

const constrItemActions = {
  addItem: item => ({
    type: ADD_CONSTR_ITEM,
    payload: {
      item
    }
  }),
  removeItem: item => ({
    type: REMOVE_CONSTR_ITEM,
    payload: {
      item
    }
  }),
  updateItems: items => ({
    type: UPDATE_CONSTR_ITEMS,
    payload: {
      items
    }
  })
}

const getItems = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'ingredients')
      if (res && res.ok) {
        const resData = await res.json()
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: resData.data
        })
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ITEMS_FAILED
      })
      console.log(e)
    }
  }
}

const getOrder = ids => {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: ids })
      })
      if (res && res.ok) {
        const resData = await res.json()
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: resData.order.number
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
          payload: { text: 'Во время заказа произошла ошибка' }
        })
        dispatch(setCustomError('Во время заказа произошла ошибка'))
      }
    } catch (e) {
      dispatch({
        type: GET_ORDER_FAILED
      })
      dispatch(setCustomError('Во время заказа произошла ошибка'))
      console.log(e)
    }
  }
}

export {
  setCustomError,
  constrItemActions,
  itemActions,
  getItems,
  getOrder,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  ADD_ITEM_DATA,
  REMOVE_ITEM_DATA,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ADD_CONSTR_ITEM,
  REMOVE_CONSTR_ITEM,
  UPDATE_CONSTR_ITEMS,
  REMOVE_ORDER,
  UPDATE_ITEMS,
  INCREASE_ITEM_COUNT,
  DECREASE_ITEM_COUNT,
  SET_CUSTOM_ERROR
}
