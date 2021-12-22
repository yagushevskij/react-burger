import styles from './order-info-modal.module.css'
import Modal from '../modal/modal'
import { OrderInfo } from '../order-info/order-info'
import { useLocation, useNavigate } from 'react-router'
import { useCallback } from 'react'

const OrderInfoModal = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { ingredients, order, totalCost } = location.state
  const { number, ...rest } = order

  const back = useCallback(
    event => {
      event.stopPropagation()
      navigate(-1)
    },
    [navigate]
  )

  return (
    <Modal handleClose={back} text={`#${number}`}>
      <OrderInfo ingredients={ingredients} order={rest} totalCost={totalCost} />
    </Modal>
  )
}

export default OrderInfoModal
