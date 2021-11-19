import styles from './orders.module.css'
import OrderCard from './order-card/order-card'
import { useEffect } from 'react'
import { getOrders } from '../../services/actions/thunk/order'
import { useDispatch, useSelector } from 'react-redux'

const Orders = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders())
  }, [])
  const orders = useSelector(state => state.orders.data)
  const {request: isOrdersRequest} = useSelector(state => state.orders)
  const isOrdersExist = orders.length > 0

  if (isOrdersRequest) {
    return null
  }

  return (
    <>
      {!isOrdersExist && <div className={`${styles.info} text text_type_main-medium`}>У вас нет созданных заказов</div>}
      {isOrdersExist && (
        <div className={`${styles.container} mt-10`}>
          {[...orders].reverse().map((el, i) => (
            <OrderCard props={el} key={i} />
          ))}
        </div>
      )}
    </>
  )
}

export default Orders
