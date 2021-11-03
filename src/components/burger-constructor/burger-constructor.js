import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getOrder, GET_ORDER_FAILED } from '../../services/actions/order'
import { openModal } from '../../services/actions/modal'
import { constrItemActions } from '../../services/actions/constructor'
import { itemActions } from '../../services/actions/ingredients'
import { useDrop } from 'react-dnd'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import ConstructorCard from './constructor-card/constructor-card'

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
  const orderRequest = useSelector(state => state.order.orderRequest)
  const orderFailed = useSelector(state => state.order.orderFailed)
  const wasModalClosed = useSelector(state => state.modal.wasClosed)
  const constrItems = useSelector(state => state.contructor.items)

  useEffect(() => {
    if (wasModalClosed && !orderFailed && !orderRequest) {
      constrItems.forEach(el => removeItem(el))
    }
  }, [wasModalClosed])

  useEffect(() => {
    setTotalCost(() =>
      constrItems.reduce((acc, item) => {
        return item.type === 'bun' ? acc + item.price * 2 : acc + item.price
      }, 0)
    )
  }, [constrItems])

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
  }

  const removeItem = useCallback(
    item => {
      dispatch(constrItemActions.removeItem(item))
      dispatch(itemActions.decreaseItem(item))
    },
    [dispatch]
  )

  const makeOrder = () => {
    if (!bun) {
      dispatch({
        type: GET_ORDER_FAILED
      })
      dispatch(openModal({ name: 'error', title: 'Нужно добавить хотя бы 1 булку' }))
      return
    }
    const ids = constrItems.map(el => el._id)
    dispatch(getOrder(ids)).then(res => {
      res ? dispatch(openModal({ name: 'orderDetails' })) : dispatch(openModal({ name: 'error', title: 'Во время заказа произошла ошибка' }))
    })
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
  return (
    <>
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
                <span className='text text_type_digits-medium mr-2'>{totalCost}</span>
                <CurrencyIcon type='primary' />
              </p>
              <Button type='primary' size='large' onClick={makeOrder} disabled={orderRequest}>
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
