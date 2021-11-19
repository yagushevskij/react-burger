import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ORDER_FAILED } from '../../../services/actions/order'
import { order } from '../../../services/actions/thunk/order'
import { conCardPropTypes } from '../../../utils/types'
import PropTypes from 'prop-types'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { getCookie } from '../../../utils/helpers'

const Order = ({ items, bun }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [madeOrder, setMadeOrder] = useState(false)
  const isAuth = JSON.parse(getCookie('isAuth'))
  const orderRequest = useSelector(state => state.order.request)
  // const user = useSelector(state => state.user.data)
  // const isAuth = Object.keys(user).length !== 0
  const makeOrder = () => {
    setMadeOrder(true)
    if (!bun) {
      dispatch({
        type: GET_ORDER_FAILED,
        payload: { message: 'Нужно добавить хотя бы 1 булку' }
      })
      return
    }
    dispatch(order(items))
  }

  console.log({isAith: isAuth})

  if (!isAuth && madeOrder) {
    return <Navigate replace to={'/login'} state={{ from: location }} />
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
