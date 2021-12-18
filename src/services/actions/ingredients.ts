import { IIngredientType } from '../../utils/types'
import { IMainCardType } from '../../utils/types'

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST'
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED'
export const UPDATE_ITEMS: 'UPDATE_ITEMS' = 'UPDATE_ITEMS'
export const INCREASE_ITEM_COUNT: 'INCREASE_ITEM_COUNT' = 'INCREASE_ITEM_COUNT'
export const DECREASE_ITEM_COUNT: 'DECREASE_ITEM_COUNT' = 'DECREASE_ITEM_COUNT'

export const itemActions = {
  updateItems: (items: IIngredientType[]) => ({
    type: UPDATE_ITEMS,
    payload: {
      items
    }
  }),
  increaseItem: (item: IIngredientType, qty: number) => ({
    type: INCREASE_ITEM_COUNT,
    payload: {
      item,
      qty
    }
  }),
  decreaseItem: (item: IIngredientType, qty: number) => ({
    type: DECREASE_ITEM_COUNT,
    payload: {
      item,
      qty
    }
  })
}

interface IUpdateItemsAction {
  readonly type: typeof UPDATE_ITEMS;
  payload: {
    items: IMainCardType[]
  }
}
interface IIncreaseItemAction {
  readonly type: typeof INCREASE_ITEM_COUNT
  payload: {
    item: IIngredientType
    qty: number
  }
}
interface IDecreaseItemAction {
  readonly type: typeof DECREASE_ITEM_COUNT
  payload: {
    item: IIngredientType
    qty: number
  }
}
interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  payload: {
    items: IMainCardType[]
  }
}
interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}
interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TIngredientActions = IUpdateItemsAction | IIncreaseItemAction | IDecreaseItemAction | IGetItemsRequestAction | IGetItemsSuccessAction | IGetItemsFailedAction