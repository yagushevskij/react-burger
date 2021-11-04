import { API_URL } from '../../utils/config'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'
export const UPDATE_ITEMS = 'UPDATE_ITEMS'
export const INCREASE_ITEM_COUNT = 'INCREASE_ITEM_COUNT'
export const DECREASE_ITEM_COUNT = 'DECREASE_ITEM_COUNT'
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM'

export const itemActions = {
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

export const getItems = () => {
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
          items: resData.data.map(el => {
            return { ...el, qty: 0 }
          })
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
