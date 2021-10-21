import PropTypes from 'prop-types';

import orderDetails from './order-details.module.css';
import doneIcon from '../../images/done.png'

const OrderDetails = (props) => {
  return (
    <div className={`${orderDetails.wrapper} pb-30`}>
      <span className={`${orderDetails.title} text text_type_digits-large mt-4`}>{props.orderNumber}</span>
      <span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
      <img className='mt-15' src={doneIcon} alt='Иконка'></img>
      <span className='text text_type_main-small mt-15'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-small text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired
}

export default OrderDetails;