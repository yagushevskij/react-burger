import { API_URL } from '../../../utils/config'
import { GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS } from '../ingredients'

export const getItems = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    })
    try {
      const res = await fetch(API_URL + 'ingredients')
      if (res && res.ok) {
        const resData = await res.json()
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: resData.data.map(el => {
            return { ...el, qty: 0 }
          })
        })
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        })
      }
    } catch (e) {
      dispatch({
        type: GET_ITEMS_FAILED
      })
      console.log(e)
    }
  }
}
