import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import { useSelector } from 'react-redux'
import Loader from '../loader/loader'

const OrderDetailsModal = () => {
  const orderRequest = useSelector(state => state.order.request)
  const orderNumber = useSelector(state => state.order.number)

  if (orderRequest) return <Loader title={`Идёт оформление заказа, ожидайте`}/>
  if (!orderNumber) return null

  return (
    <Modal>
      <OrderDetails />
    </Modal>
  )
}

export default OrderDetailsModal
