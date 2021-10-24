import { useState, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { getOrder, REMOVE_ORDER } from '../../services/actions/cart';

const itemsInitialState = { total: 0 };

const itemsReducer = (state, action) => {
  const ingredientCost = (action.ingredient === 'bun') ? action.cost * 2 : action.cost;
  switch (action.type) {
    case 'add':
      return { total: state.total + ingredientCost };
    case 'remove':
      return { total: state.total - ingredientCost };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const data = useSelector(store => store.cart.items); //Заменить на store.cart.constrItems
  const [modal, setModal] = useState({
    isModalOpened: false
  });
  const [totalCost, totalCostDispatcher] = useReducer(itemsReducer, itemsInitialState);
  useEffect(() => {
    data.forEach((el) => {
      totalCostDispatcher({
        type: 'add',
        ingredient: el.type,
        cost: el.price
      })
    })
  }, [data])

  const handleCloseModal = () => {
    setModal({
      ...modal,
      isModalOpened: false
    })
    dispatch({ type: REMOVE_ORDER })
  }
  const handleOpenModal = () => {
    makeOrder();
    setModal({
      ...modal,
      isModalOpened: true,
    })
  }

  const makeOrder = () => {
    const idsArr = data.map((el) => el._id);
    dispatch(getOrder(idsArr))
  }

  const modalComp = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );
  const bun = data.find(el => el.type === 'bun');
  const ingredientsWithoutBun = data.filter(el => el.type !== 'bun');
  return (
    <>
      {modal.isModalOpened && modalComp}
      <section className={`${burgerConstructor.section} ml-10 pl-4 mt-25`}>
        <ul className={`${burgerConstructor.list}`}>
          {
            bun &&
            <li className='ml-8' key={'bun-top' + bun._id}>
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          }
          <ul className={`${burgerConstructor.list} ${burgerConstructor.scroll}`}>
            {
              ingredientsWithoutBun &&
              ingredientsWithoutBun.map((item, index) =>
                <li className={`${burgerConstructor.item}`} key={index}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              )
            }
          </ul>
          {
            bun &&
            <li className='ml-8' key={'bun-bottom' + bun._id}>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          }
        </ul>
        <div className={`${burgerConstructor.total} mt-10`}>
          <p className={`${burgerConstructor.total__cost} mr-10`}>
            <span className='text text_type_digits-medium mr-2'>{totalCost.total}</span>
            <CurrencyIcon type='primary' />
          </p>
          <Button type='primary' size='large' onClick={handleOpenModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}

export default BurgerConstructor;