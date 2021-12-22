import { IOrder } from "../../utils/types"

export const GET_ORDERS_REQUEST: 'GET_ORDERS_REQUEST' = 'GET_ORDERS_REQUEST'
export const GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS' = 'GET_ORDERS_SUCCESS'
export const GET_ORDERS_FAILED: 'GET_ORDERS_FAILED' = 'GET_ORDERS_FAILED'

interface IGetOrdersRequestAction {
    readonly type: typeof GET_ORDERS_REQUEST;
  }
  interface IGetOrdersSuccessAction {
    readonly type: typeof GET_ORDERS_SUCCESS;
    payload: {
        data: IOrder[]
    }
  }
  interface IGetOrdersFailedAction {
    readonly type: typeof GET_ORDERS_FAILED;
    payload?: {
        message: string
    }
  }

  export type TOrdersActions = IGetOrdersFailedAction | IGetOrdersRequestAction | IGetOrdersSuccessAction