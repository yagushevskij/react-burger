import { API_URL } from '../../../utils/config'
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../order'

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
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
          payload: { message: 'Ошибка при создании заказа. Пожалуйста, повторите позже.' }
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ORDER_FAILED,
        payload: { message: 'Ошибка при создании заказа. Пожалуйста, повторите позже.' }
      })
      console.log(e)
    }
  }
}
