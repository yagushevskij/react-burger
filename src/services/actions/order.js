import { API_URL } from '../../utils/config'

export const ADD_ITEM_DATA = 'ADD_ITEM_DATA'
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

export const getOrder = items => {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    try {
      const ids = items.map(el => el._id)
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
        return true
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
        return false
      }
    } catch (e) {
      dispatch({
        type: GET_ORDER_FAILED
      })
      console.log(e)
      return false
    }
  }
}
