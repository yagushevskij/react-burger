import orderDetails from './order-details.module.css'
import doneIcon from '../../images/done.png'
import { FC } from 'react'
import useAppSelector from '../../services/customHooks/useAppSelector'

const OrderDetails: FC = () => {
  const { number, request: orderRequest } = useAppSelector(state => state.order)

  return (
    <div className={`${orderDetails.wrapper} pb-15`}>
      <span className={`${orderDetails.title} text text_type_digits-large mt-4`}>{!orderRequest && number}</span>
      <span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
      <img className='mt-15' src={doneIcon} alt='Иконка'></img>
      <span className='text text_type_main-small mt-15'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-small text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
}

export default OrderDetails
