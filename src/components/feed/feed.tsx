import styles from './feed.module.css'
import { FC } from 'react'
import type { IOrder, TOrderStatus } from '../../utils/types'
import { numberWithSpaces, getGrouppedItems } from '../../utils/helpers'

interface IFeed {
  readonly orders: IOrder[]
  readonly total: number | null
  readonly totalToday: number | null 
}

const Feed: FC<IFeed> = ({orders, total, totalToday}) => {
  const totalCostFormated = numberWithSpaces(total)

  const getOrdersToRender = (orders: IOrder[], status: TOrderStatus, size: number) => {
    const filtered = orders.filter((el) => el.status === status)
    return getGrouppedItems(filtered, size)
  }
  
  const ordersDone = getOrdersToRender(orders, 'done', 10)
  const ordersPending = getOrdersToRender(orders, 'pending', 10)

  return (
    <section className={styles.main}>
      <div className={styles.columns}>
        <div className={styles.wrapper}>
          <p className='text text_type_main-medium'>Готовы:</p>
            {ordersDone && ordersDone.map((arr, i) => (
              <ul className={`${styles.orders} ${styles.orders_ready} mt-6`} key={i}>
              {arr.map((el, i) => (<li className={`text text_type_digits-default`} key={i}>{el.number}</li>))}
              </ul>
            ))}
        </div>
        <div className={styles.wrapper}>
          <p className='text text_type_main-medium'>В работе:</p>
          {ordersPending && ordersPending.map((arr, i) => (
              <ul className={`${styles.orders} mt-6`} key={i}>
              {arr.map((el, i) => (<li className={`ext text_type_digits-default`} key={i}>{el.number}</li>))}
              </ul>
            ))}
        </div>
      </div>
      <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
      {totalCostFormated && <p className={`${styles.digit} text text_type_digits-large`}>{totalCostFormated}</p>}
      <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
      <p className={`${styles.digit} text text_type_digits-large`}>{totalToday}</p>
    </section>
  )
}

export default Feed
