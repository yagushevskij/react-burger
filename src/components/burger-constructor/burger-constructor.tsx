import { useCallback, useEffect, useState, useMemo, FC } from 'react'
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
import { useAppSelector, useAppDispatch } from '../../services/custom-hooks/redux-hooks'
import type { IConCardType } from '../../utils/types'
import { getKeyByGenerate } from '../../utils/helpers'

export type TItemCallback = (item: IConCardType) => void

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch()
  const [totalCost, setTotalCost] = useState<number>(0)
  const [{ border }, sectionTarget] = useDrop({
    accept: 'ingredient-card',
    drop(item: IConCardType) {
      handleDrop(item)
    },
    collect: monitor => ({
      border: monitor.isOver() ? '3px solid #4C4CFF' : '3px solid transparent',
    }),
  })
  const constrItems = useAppSelector(state => state.contructor.items)
  const { number: orderNumber, request: isOrderRequest, errorMessage } = useAppSelector(state => state.order)

  useEffect(() => {
    setTotalCost(() =>
      constrItems.reduce((acc: number, item: IConCardType) => {
        return item.type === 'bun' ? acc + item.price * 2 : acc + item.price
      }, 0),
    )
  }, [constrItems])

  const bun = useMemo(() => constrItems.find(el => el.type === 'bun'), [constrItems])

  const handleDrop = (item: IConCardType) => {
    if (item.type === 'bun' && bun) {
      removeItem(bun)
    }
    addItem(item)
  }

  const addItem = useCallback<TItemCallback>(
    item => {
      const qty = item.type === 'bun' ? 2 : 1
      const itemWithKey = {
        ...item,
        key: getKeyByGenerate(),
      }
      dispatch(constrItemActions.addItem(itemWithKey))
      dispatch(itemActions.increaseItem(item._id, qty))
    },
    [dispatch],
  )

  const removeItem = useCallback<TItemCallback>(
    item => {
      const qty = item.type === 'bun' ? 2 : 1
      dispatch(constrItemActions.removeItem(item.key))
      dispatch(itemActions.decreaseItem(item._id, qty))
    },
    [dispatch],
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
      {orderNumber && (
        <Modal handleClose={handleCloseOrderModal} dataCy='order-modal'>
          <OrderDetails />
        </Modal>
      )}
      {errorMessage && <Modal title={errorMessage} handleClose={handleCloseErrorModal} dataCy='error-modal'></Modal>}
      <section className={`${burgerConstructor.section} ml-10 pl-4 mt-25`} ref={sectionTarget} style={{ border }}>
        {constrItems.length === 0 ? (
          <div className={`${burgerConstructor.info} text text_type_main-default`}>Перетащите в это окно ингредиенты чтобы собрать бургер</div>
        ) : (
          <>
            <ul className={`${burgerConstructor.list}`}>
              {bun && (
                <li className={`${burgerConstructor.item} pl-8 pr-5`} key={'bun-top' + bun._id}>
                  <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image} />
                </li>
              )}
              <ScrollContainer items={constrItems} removeItem={removeItem} />
              {bun && (
                <li className={`${burgerConstructor.item} pl-8 pr-5`} key={'bun-bottom' + bun._id}>
                  <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image} />
                </li>
              )}
            </ul>
            <div className={`${burgerConstructor.total} mt-10`}>
              <p className={`${burgerConstructor.total__cost} mr-10`}>
                <span className="text text_type_digits-medium mr-2">{totalCost}</span>
                <CurrencyIcon type="primary" />
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
