import { useEffect } from 'react'
import { useAppDispatch } from '../../../services/custom-hooks/redux-hooks'
import OrderInfo from '../order-info'
import { wsUrl } from '../../../utils/config'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../../services/actions/orders'
import { getCookie } from '../../../utils/helpers'

const OrderUserInfo = () => {
  const dispatch = useAppDispatch()
  const token = getCookie('accessToken')

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: { url: `${wsUrl}?token=${token}` } })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch, token])
  return <OrderInfo />
}

export default OrderUserInfo
