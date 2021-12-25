import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { order } from '../../../services/actions/thunk/order'
import React, { useCallback, FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GET_ORDER_FAILED } from '../../../services/actions/order'
import { IConCardType } from '../../../utils/types'
import { useAppSelector, useAppDispatch } from '../../../services/custom-hooks/redux-hooks'

type TOrderProps = {
  items: IConCardType[]
  bun?: IConCardType
}

const Order: FC<TOrderProps> = ({ items, bun }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const orderRequest = useAppSelector(state => state.order.request)
  const user = useAppSelector(state => state.user.data)

  const makeOrder = useCallback(() => {
    const isAuth = Object.keys(user).length !== 0
    if (!isAuth) {
      navigate(`/login`, { state: { from: location } })
    } else if (!bun) {
      dispatch({ type: GET_ORDER_FAILED, payload: { message: 'Нужно добавить хотя бы 1 булку' } })
    } else {
      dispatch(order(items))
    }
  }, [dispatch, bun, items, location, navigate, user])

  return (
    <Button type="primary" size="large" onClick={makeOrder} disabled={orderRequest}>
      Оформить заказ
    </Button>
  )
}

export default React.memo(Order)
