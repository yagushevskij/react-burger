import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ORDER_FAILED } from '../../../services/actions/order'
import { order } from '../../../services/actions/thunk/order'
import { conCardPropTypes } from '../../../utils/types'
import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCookie } from '../../../utils/helpers'

const Order = ({ items, bun }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const isAuth = JSON.parse(getCookie('isAuth'))
  const orderRequest = useSelector(state => state.order.request)
  const makeOrder = () => {
    !isAuth && navigate(`/login`, { state: {from: location} })
    if (!bun) {
      dispatch({
        type: GET_ORDER_FAILED,
        payload: { message: 'Нужно добавить хотя бы 1 булку' }
      })
      return
    }
    dispatch(order(items))
  }

  return (
    <Button type='primary' size='large' onClick={makeOrder} disabled={orderRequest}>
      Оформить заказ
    </Button>
  )
}

Order.propTypes = {
  bun: conCardPropTypes,
  items: PropTypes.arrayOf(conCardPropTypes)
}

export default React.memo(Order)
