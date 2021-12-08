import styles from './orders.module.css'
// import OrderCard from './order-card/order-card.tsx.new'
import { FC } from 'react'
import useAppSelector from '../../services/customHooks/useAppSelector'

const Orders: FC = () => {
  const { request: isOrdersRequest, data: orders } = useAppSelector(state => state.orders)
  const isOrdersExist = orders.length > 0

  if (isOrdersRequest) return null
  if (!isOrdersExist) return <div className={`${styles.info} text text_type_main-medium`}>У вас нет созданных заказов</div>

  return null
  // <div className={`${styles.container} mt-10`}>
  //   {[...orders].reverse().map((el, i) => (
  //     <OrderCard props={el} key={i} />
  //   ))}
  // </div>
}

export default Orders
