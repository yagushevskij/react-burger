import { IConCardType } from '../../utils/types'

export const ADD_CONSTR_ITEM: 'ADD_CONSTR_ITEM' = 'ADD_CONSTR_ITEM'
export const REMOVE_CONSTR_ITEM: 'REMOVE_CONSTR_ITEM' = 'REMOVE_CONSTR_ITEM'
export const UPDATE_CONSTR_ITEMS: 'UPDATE_CONSTR_ITEMS' = 'UPDATE_CONSTR_ITEMS'

export const constrItemActions = {
  addItem: (item: IConCardType) => ({
    type: ADD_CONSTR_ITEM,
    payload: { item },
  }),
  removeItem: (key: string) => ({
    type: REMOVE_CONSTR_ITEM,
    payload: {
      key,
    },
  }),
  updateItems: (items: IConCardType[]) => ({
    type: UPDATE_CONSTR_ITEMS,
    payload: { items },
  }),
}

interface IAddItemAction {
  readonly type: typeof ADD_CONSTR_ITEM
  payload: {
    item: IConCardType
  }
}
interface IRemoveItemAction {
  readonly type: typeof REMOVE_CONSTR_ITEM
  payload: {
    key: string
  }
}
interface IUpdateItemsAction {
  readonly type: typeof UPDATE_CONSTR_ITEMS
  payload: {
    items: IConCardType[]
  }
}

export type TConstructorActions = IAddItemAction | IRemoveItemAction | IUpdateItemsAction
