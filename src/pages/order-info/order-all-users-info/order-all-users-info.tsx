import { useEffect } from 'react'
import { useAppDispatch } from '../../../services/custom-hooks/redux-hooks'
import OrderInfo from '../order-info'
import { wsUrl } from '../../../utils/config'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../../services/actions/websockets'

const OrderAllUsersInfo = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: { url: `${wsUrl}/all` } })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch])
  return <OrderInfo />
}

export default OrderAllUsersInfo
