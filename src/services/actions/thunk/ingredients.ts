import { API_URL } from '../../../utils/config'
import { GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS } from '../ingredients'
import { checkReponse } from '../../../utils/helpers'
import type { IIngredientType } from '../../../utils/types'

interface IGetItemsResp {
  success: boolean;
  data: IIngredientType[]
}

export const getItems = () => {
  return async function (dispatch: any) {
    dispatch({
      type: GET_ITEMS_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'ingredients')
      const resData = await checkReponse<IGetItemsResp>(res)
      dispatch({
        type: GET_ITEMS_SUCCESS,
        items: resData.data.map((el: IIngredientType) => {
          return { ...el, qty: 0 }
        })
      })
    } catch (e) {
      dispatch({
        type: GET_ITEMS_FAILED
      })
      console.log(e)
    }
  }
}
