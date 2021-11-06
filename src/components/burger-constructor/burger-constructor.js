import { useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { SET_INITIAL_ORDER_STATE } from '../../services/actions/order'
import { constrItemActions } from '../../services/actions/constructor'
import { itemActions } from '../../services/actions/ingredients'
import { useDrop } from 'react-dnd'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import ScrollContainer from './scroll-container/scroll-container'
import Order from './order/order'

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
  const orderFailed = useSelector(state => state.order.failed)
  const constrItems = useSelector(state => state.contructor.items)
  const orderNumber = useSelector(state => state.order.number)

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
      dispatch(constrItemActions.addItem(item))
      dispatch(itemActions.increaseItem(item))
    },
    [dispatch]
  )

  const removeItem = useCallback(
    item => {
      dispatch(constrItemActions.removeItem(item))
      dispatch(itemActions.decreaseItem(item))
    },
    [dispatch]
  )

  const handleCloseOrderModal = () => {
    dispatch({ type: SET_INITIAL_ORDER_STATE })
    constrItems.forEach(el => removeItem(el))
  }

  const handleCloseErrorModal = () => {
    dispatch({ type: SET_INITIAL_ORDER_STATE })
  }

  return (
    <>
      {orderNumber && (
        <Modal handleCloseModal={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
      {orderFailed && <Modal handleCloseModal={handleCloseErrorModal} />}

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
