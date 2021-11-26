import { useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { constrItemActions } from '../../services/actions/constructor'
import { itemActions } from '../../services/actions/ingredients'
import { useDrop } from 'react-dnd'
import ScrollContainer from './scroll-container/scroll-container'
import Order from './order/order'
import { UPDATE_CONSTR_ITEMS } from '../../services/actions/constructor'
import { SET_INITIAL_ORDER_STATE } from '../../services/actions/order'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import Loader from '../loader/loader'

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const [totalCost, setTotalCost] = useState(0)
  const [{ border }, sectionTarget] = useDrop({
    accept: 'ingredient-card',
    drop(item) {
      handleDrop(item)
    },
    collect: monitor => ({
      border: monitor.isOver() ? '3px solid #4C4CFF' : '3px solid transparent'
    })
  })
  const constrItems = useSelector(state => state.contructor.items)
  const {number: orderNumber, request: isOrderRequest, errorMessage} = useSelector(state => state.order)

  useEffect(() => {
    setTotalCost(() =>
      constrItems.reduce((acc, item) => {
        return item.type === 'bun' ? acc + item.price * 2 : acc + item.price
      }, 0)
    )
  }, [constrItems])

  const bun = useMemo(() => constrItems.find(el => el.type === 'bun'), [constrItems])

  const handleDrop = item => {
    if (item.type === 'bun' && bun) {
      removeItem(bun)
    }
    addItem(item)
  }

  const addItem = useCallback(
    item => {
      const qty = item.type === 'bun' ? 2 : 1
      dispatch(constrItemActions.addItem(item))
      dispatch(itemActions.increaseItem(item, qty))
    },
    [dispatch]
  )

  const removeItem = useCallback(
    item => {
      const qty = item.type === 'bun' ? 2 : 1
      dispatch(constrItemActions.removeItem(item))
      dispatch(itemActions.decreaseItem(item, qty))
    },
    [dispatch]
  )

  const handleCloseOrderModal = () => {
    dispatch({ type: UPDATE_CONSTR_ITEMS, payload: { items: [] } })
    dispatch({ type: SET_INITIAL_ORDER_STATE })
  }
  const handleCloseErrorModal = () => {
    dispatch({ type: SET_INITIAL_ORDER_STATE })
  }

  return (
    <>
      {isOrderRequest && <Loader title={`Идёт оформление заказа, ожидайте`} />}
      {orderNumber && <Modal handleClose={handleCloseOrderModal}><OrderDetails /></Modal>}
      {errorMessage && <Modal title={errorMessage} handleClose={handleCloseErrorModal}></Modal>}
      <section className={`${burgerConstructor.section} ml-10 pl-4 mt-25`} ref={sectionTarget} style={{ border }}>
        {constrItems.length === 0 ? (
          <div className={`${burgerConstructor.info} text text_type_main-default`}>Перетащите в это окно ингредиенты чтобы собрать бургер</div>
        ) : (
          <>
            <ul className={`${burgerConstructor.list}`}>
              {bun && (
                <li className={`${burgerConstructor.item} pl-8 pr-5`} key={'bun-top' + bun._id}>
                  <ConstructorElement type='top' isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image} />
                </li>
              )}
              <ScrollContainer items={constrItems} removeItem={removeItem} />
              {bun && (
                <li className={`${burgerConstructor.item} pl-8 pr-5`} key={'bun-bottom' + bun._id}>
                  <ConstructorElement type='bottom' isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image} />
                </li>
              )}
            </ul>
            <div className={`${burgerConstructor.total} mt-10`}>
              <p className={`${burgerConstructor.total__cost} mr-10`}>
                <span className='text text_type_digits-medium mr-2'>{totalCost}</span>
                <CurrencyIcon type='primary' />
              </p>
              <Order items={constrItems} bun={bun} />
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default BurgerConstructor
