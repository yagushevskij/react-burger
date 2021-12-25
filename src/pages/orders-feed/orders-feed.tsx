import styles from './orders-feed.module.css'
import { FC } from 'react'
import Orders from '../../components/orders/orders'
import { useAppDispatch, useAppSelector } from '../../services/custom-hooks/redux-hooks'
import Feed from '../../components/feed/feed'
import { useEffect } from 'react'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/orders'
import { wsUrl } from '../../utils/config'

const OrdersFeed: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: { url: `${wsUrl}/all` } })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch])

  const { data, total, totalToday } = useAppSelector(state => state.orders)
  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Orders data={data} />
        </div>
        <div className={styles.wrapper}>
          <Feed orders={data} total={total} totalToday={totalToday} />
        </div>
      </div>
    </main>
  )
}

export default OrdersFeed
