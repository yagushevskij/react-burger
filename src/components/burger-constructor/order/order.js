import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { order } from '../../../services/actions/thunk/order'
import { conCardPropTypes } from '../../../utils/types'
import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Order = ({ items, bun }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const orderRequest = useSelector(state => state.order.request)
  const user = useSelector(state => state.user.data)
  const makeOrder = () => {
    const isAuth = Object.keys(user).length !== 0
    if (!isAuth) {
      navigate(`/login`, { state: { from: location } })
    }
    else if (!bun) {
      // navigate(`/error`, { state: { background: location, message: 'Нужно добавить хотя бы 1 булку' } })
    } else {
      dispatch(order(items))
    }
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
