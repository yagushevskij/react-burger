import { API_URL } from '../../../utils/config'
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../order'
import { GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from '../orders'
import { getCookie } from '../../../utils/helpers'

let token = getCookie('accessToken')

export const order = items => {
  return async function (dispatch) {
    console.log(token)
    dispatch({
      type: GET_ORDER_REQUEST
    })
    try {
      const ids = items.map(el => el._id)
      const res = await fetch(API_URL + 'orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token
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

export const getOrders = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDERS_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      if (res && res.ok) {
        const resData = await res.json()
        dispatch({
          type: GET_ORDERS_SUCCESS,
          data: resData.orders
        })
      } else {
        dispatch({
          type: GET_ORDERS_FAILED,
          payload: { message: 'Ошибка при получении списка заказов. Пожалуйста, повторите позже.' }
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ORDERS_FAILED,
        payload: { message: 'Ошибка при получении списка заказов. Пожалуйста, повторите позже.' }
      })
      console.log(e)
    }
  }
}
