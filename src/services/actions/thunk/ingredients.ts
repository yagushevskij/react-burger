import { API_URL } from '../../../utils/config'
import { itemActions } from '../ingredients'
import { checkReponse } from '../../../utils/helpers'
import type { IIngredientType } from '../../../utils/types'
import type { TAppDispatch } from '../../custom-hooks/redux-hooks'

interface IGetItemsResp {
  success: boolean
  data: IIngredientType[]
}

export const getItems = () => {
  return async function (dispatch: TAppDispatch) {
    dispatch(itemActions.request)
    try {
      const res = await fetch(API_URL + 'ingredients')
      const resData = await checkReponse<IGetItemsResp>(res)
      const items = resData.data.map(el => {
        return { ...el, qty: 0 }
      })
      dispatch(itemActions.requestSuccess(items))
    } catch (e) {
      dispatch(itemActions.requestFailed)
      console.log(e)
    }
  }
}
