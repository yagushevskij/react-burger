import styles from './orders.module.css'
import OrderCard from './order-card/order-card'
import { useEffect } from 'react'
import { getOrders } from '../../services/actions/thunk/order'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ru'

const Orders = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders())
  }, [])
  const orders = useSelector(state => state.orders.data)
  const {request: isOrdersRequest} = useSelector(state => state.orders)
console.log({isOrdersRequest})
  const isOrdersExist = orders.length > 0
  // moment.locale('ru')
  // var formats = {
  //   sameDay: '[Сегодня] hA',
  //   nextDay: '[Завтра]',
  //   lastDay: '[Вчера]',
  //   lastWeek: '[На прошлой неделе] dddd',
  //   sameElse: 'DD/MM/YYYY'
  // }
  // moment.defaultFormat = "DD.MM.YYYY HH:mm";
  // console.log(moment('2021-11-16T06:37:10.494Z').fromNow()); // 25 дек. 2021

  if (isOrdersRequest) {
    return null
  }

  return (
    <>
      {!isOrdersExist && <div className={`${styles.info} text text_type_main-medium`}>У вас нет созданных заказов</div>}
      {isOrdersExist && (
        <div className={`${styles.container} mt-10`}>
          {orders.map((el, i) => (
            <OrderCard props={el} key={i} />
          ))}
        </div>
      )}
    </>
  )
}

export default Orders
