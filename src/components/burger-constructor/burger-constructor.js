import { useState, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import ingridientPropTypes from '../../utils/type'
import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { BasketContext, OrderContext } from '../../services/basket-context';
import { API_URL } from '../app/app'

const basketInitialState = { total: 0 };

const basketReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { total: state.total + action.cost };
    case 'remove':
      return { total: state.total + action.cost };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const { basket } = useContext(BasketContext);
  const [modal, setModal] = useState({
    isModalOpened: false
  });
  const [order, setOrder] = useState({ number: null });
  const [totalCost, totalCostDispatcher] = useReducer(basketReducer, basketInitialState);
  useEffect(() => {
    basket.forEach((el) => {
      totalCostDispatcher({
        type: 'add',
        cost: el.price
      })
    })
  }, [basket])

  const handleCloseModal = () => {
    setModal({
      ...modal,
      isModalOpened: false
    })
  }
  const handleOpenModal = () => {
    setModal({
      ...modal,
      isModalOpened: true,
    })
  }

  const makeOrder = async () => {
    try {
      const idsArr = basket.map((el) => el._id);
      setOrder({ ...order, loading: true });
      const res = await fetch(API_URL + 'orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: idsArr })
      });
      const resData = await res.json();
      setOrder({ number: resData.order.number, loading: false });
      resData.order.number && handleOpenModal();
    } catch (e) {
      console.log(e)
    }
  }

  const modalComp = (
    <OrderContext.Provider value={{ order }}>
      <Modal onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>
    </OrderContext.Provider>
  );
  const bun = basket.find(el => el.type === 'bun');
  const ingredientsWithoutBun = basket.filter(el => el.type !== 'bun');
  return (
    <>
      {modal.isModalOpened && modalComp}
      <section className={`${burgerConstructor.section} ml-10 pl-4 mt-25`}>
        <ul className={`${burgerConstructor.list}`}>
          {
            bun &&
            <li className='ml-8' key={bun._id}>
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
            <li className='ml-8' key={bun._id}>
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
          <Button type='primary' size='large' onClick={makeOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
}

export default BurgerConstructor;