import styles from './orders-feed.module.css'
import { FC } from 'react'
import Orders from '../../components/orders/orders'
import { useAppSelector } from '../../services/custom-hooks/redux-hooks'
import Feed from '../../components/feed/feed'

const OrdersFeed: FC = () => {
  const { data: orders, total, totalToday } = useAppSelector(state => state.ordersAll)
  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Orders data={orders} />
        </div>
        <div className={styles.wrapper}>
          <Feed orders={orders} total={total} totalToday={totalToday} />
        </div>
      </div>
    </main>
  )
}

export default OrdersFeed
