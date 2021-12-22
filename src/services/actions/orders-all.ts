import { IOrder } from "../../utils/types"

export const GET_ALL_ORDERS_REQUEST: 'GET_ALL_ORDERS_REQUEST' = 'GET_ALL_ORDERS_REQUEST'
export const GET_ALL_ORDERS_SUCCESS: 'GET_ALL_ORDERS_SUCCESS' = 'GET_ALL_ORDERS_SUCCESS'
export const GET_ALL_ORDERS_FAILED: 'GET_ALL_ORDERS_FAILED' = 'GET_ALL_ORDERS_FAILED'

interface IGetAllOrdersRequestAction {
    readonly type: typeof GET_ALL_ORDERS_REQUEST;
  }
  interface IGetAllOrdersSuccessAction {
    readonly type: typeof GET_ALL_ORDERS_SUCCESS;
    payload: {
        data: IOrder[]
    }
  }
  interface IGetAllOrdersFailedAction {
    readonly type: typeof GET_ALL_ORDERS_FAILED;
    payload?: {
        message: string
    }
  }

  export type TOrdersAllActions = IGetAllOrdersFailedAction | IGetAllOrdersRequestAction | IGetAllOrdersSuccessAction