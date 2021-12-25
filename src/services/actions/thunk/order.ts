import { API_URL } from '../../../utils/config'
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../order'
import { getCookie } from '../../../utils/helpers'
import { retriableFetch } from '../../../utils/api'
import type { TAppDispatch, IIngredientType } from '../../../utils/types'
import type { IOrder } from '../../reducers/orders'

export interface IGetOrdersResp {
  orders: IOrder[]
  success: boolean
  total: number
  totalToday: number
}
interface IOrderResp {
  success: boolean
  message?: string
  order: IOrder
}

export const order = (items: IIngredientType[]) => {
  return async function (dispatch: TAppDispatch) {
    const token = getCookie('accessToken')
    dispatch({
      type: GET_ORDER_REQUEST,
    })
    try {
      const ids = items.map(el => el._id)
      const res = await retriableFetch<IOrderResp>(API_URL + 'orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ ingredients: ids }),
      })
      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: {
          orderNumber: res.order.number,
        },
      })
    } catch (e) {
      dispatch({
        type: GET_ORDER_FAILED,
        payload: { message: 'Ошибка при создании заказа. Пожалуйста, повторите позже.' },
      })
      console.log(e)
    }
  }
}
