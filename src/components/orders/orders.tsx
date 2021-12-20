import styles from './orders.module.css'
import OrderCard from './order-card/order-card'
import { FC, useRef } from 'react'
import type { IOrder } from '../../services/actions/orders'
import useContainerHeight from '../../services/custom-hooks/use-container-height'
import { useAppSelector } from '../../services/custom-hooks/redux-hooks'

interface IOrders {
  readonly data: IOrder[];
}

const Orders: FC<IOrders> = ({data}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight] = useContainerHeight(containerRef)
  const ingredients = useAppSelector(state => state.ingredients.items)
  const isOrdersExist = !data || data.length > 0 

  return (
    <div className={`${styles.container} mt-10`} ref={containerRef} style={{maxHeight: `${containerHeight}px`}}>
      {isOrdersExist && [...data].reverse().map((el, i) => (
        <OrderCard data={el} ingredients={ingredients} key={i} />
      ))}
      {!isOrdersExist && <div className={`${styles.info} text text_type_main-medium`}>Заказы отсутствуют</div>}
    </div>
  )
}

export default Orders
