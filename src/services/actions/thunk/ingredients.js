import { API_URL } from '../../../utils/config'
import { GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS } from '../ingredients'
import { checkReponse } from '../../../utils/helpers'

export const getItems = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'ingredients')
      const resData = await checkReponse(res)
      dispatch({
        type: GET_ITEMS_SUCCESS,
        items: resData.data.map(el => {
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
