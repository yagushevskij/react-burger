import { useState, useReducer, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { getOrder, REMOVE_ORDER, constrItemActions, itemActions, setCustomError } from '../../services/actions/cart'
import { useDrop } from 'react-dnd'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import ConstructorCard from './constructor-card/constructor-card'

const totalCostInitialState = { total: 0 }
const totalCostReducer = (state, action) => {
  const ingredientCost = action.ingredient === 'bun' ? action.cost * 2 : action.cost
  switch (action.type) {
    case 'add':
      return { total: state.total + ingredientCost }
    case 'remove':
      return { total: state.total - ingredientCost }
    default:
      throw new Error(`Wrong type of action: ${action.type}`)
  }
}

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const [{ border }, sectionTarget] = useDrop({
    accept: 'ingredient-card',
    drop(item) {
      handleDrop(item)
    },
    collect: monitor => ({
      border: monitor.isOver() ? '3px solid #4C4CFF' : '3px solid transparent'
    })
  })
  const constrItems = useSelector(state => state.cart.constrItems)
  const orderRequest = useSelector(state => state.cart.orderRequest)
  const orderFailed = useSelector(state => state.cart.orderFailed)
  const customError = useSelector(state => state.cart.customError)

  const [modal, setModal] = useState({ isOpened: false })
  const [totalCost, totalCostDispatcher] = useReducer(totalCostReducer, totalCostInitialState)
  const bun = constrItems.find(el => el.type === 'bun')

  const handleDrop = item => {
    if (item.type === 'bun' && bun) {
      removeItem(bun)
    }
    addItem(item)
  }

  const addItem = item => {
    dispatch(constrItemActions.addItem(item))
    dispatch(itemActions.increaseItem(item))
    totalCostDispatcher({
      type: 'add',
      ingredient: item.type,
      cost: item.price
    })
  }

  const removeItem = useCallback(
    item => {
      dispatch(constrItemActions.removeItem(item))
      dispatch(itemActions.decreaseItem(item))
      totalCostDispatcher({
        type: 'remove',
        ingredient: item.type,
        cost: item.price
      })
    },
    [dispatch]
  )

  const handleCloseModal = () => {
    dispatch(setCustomError(null))
    closeModal()
  }

  const handleSuccessOrder = () => {
        dispatch({ type: REMOVE_ORDER })
    constrItems.forEach(el => removeItem(el))
  }

  const closeModal = () => {
    setModal({isOpened: false })
  }
  const openModal = () => {
    setModal({ isOpened: true })
  }

  const makeOrder = () => {
    if (!bun) {
      dispatch(setCustomError('Нужно добавить хотя бы 1 булочку'))
      openModal()
      return;
    }
    const ids = constrItems.map(el => el._id)
    dispatch(getOrder(ids))
    openModal()
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const items = reorder(constrItems, result.source.index, result.destination.index)
    dispatch(constrItemActions.updateItems(items))
  }

  const orderModal = (
    <Modal onCloseHandlers={[handleCloseModal, handleSuccessOrder]}>
      <OrderDetails />
    </Modal>
  )
  const createErrorModal = (text) => <Modal onCloseHandlers={[handleCloseModal]} errorText={text} />
  return (
    <>
      {modal.isOpened && customError && createErrorModal(customError)}
      {modal.isOpened && !orderRequest && !orderFailed && !customError && orderModal}
      {/* {modal.isOpened && orderFailed && !orderRequest && createInfoModal('При создании заказа возникла ошибка')} */}
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                  {(provided, snapshot) => (
                    <ul className={`${burgerConstructor.list} ${burgerConstructor.scroll}`} {...provided.droppableProps} ref={provided.innerRef}>
                      {constrItems &&
                        constrItems.map((item, index) => {
                          if (item.type !== 'bun') {
                            return <ConstructorCard key={index} data={item} handleRemove={removeItem} index={index} />
                          }
                        })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              {bun && (
                <li className={`${burgerConstructor.item} pl-8 pr-5`} key={'bun-bottom' + bun._id}>
                  <ConstructorElement type='bottom' isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image} />
                </li>
              )}
            </ul>
            <div className={`${burgerConstructor.total} mt-10`}>
              <p className={`${burgerConstructor.total__cost} mr-10`}>
                <span className='text text_type_digits-medium mr-2'>{totalCost.total}</span>
                <CurrencyIcon type='primary' />
              </p>
              <Button type='primary' size='large' onClick={makeOrder} disabled={orderRequest ? 'disabled' : null}>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default BurgerConstructor
