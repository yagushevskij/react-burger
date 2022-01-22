import { API_URL } from '../../../utils/config'
import { orderActions } from '../order'
import { getCookie } from '../../../utils/helpers'
import { retriableFetch } from '../../../utils/api'
import type { IIngredientType } from '../../../utils/types'
import type { TAppDispatch } from '../../custom-hooks/redux-hooks'
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
    dispatch(orderActions.request)
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
      dispatch(orderActions.requestSuccess(res.order.number))
    } catch (e) {
      dispatch(orderActions.requestFailed('Ошибка при создании заказа. Пожалуйста, повторите позже.'))
      console.log(e)
    }
  }
}
