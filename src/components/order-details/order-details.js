import PropTypes from 'prop-types'
import { useEffect } from 'react'
import orderDetails from './order-details.module.css'
import doneIcon from '../../images/done.png'
import { useSelector, useDispatch } from 'react-redux'
import { SET_INITIAL_ORDER_STATE } from '../../services/actions/order'

const OrderDetails = () => {
  const dispatch = useDispatch()
  const number = useSelector(state => state.order.number)
  const orderRequest = useSelector(state => state.order.request)

  useEffect(() => {
    return () => {
      dispatch({ type: SET_INITIAL_ORDER_STATE })
    }
  }, [dispatch])

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

OrderDetails.propTypes = {
  orderNumber: PropTypes.number
}

export default OrderDetails
