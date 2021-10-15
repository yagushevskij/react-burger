import { useState } from 'react';
import PropTypes from 'prop-types';

import ingridientPropTypes from '../../utils/type'
import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = (props) => {
  const [state, setState] = useState({
    isModalOpened: false
  });

  const handleCloseModal = () => {
    setState({
      ...state,
      isModalOpened: false
    })
  }
  const handleOpenModal = () => {
    setState({
      ...state,
      isModalOpened: true,
    })
  }

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );
  return (
    <>
      {state.isModalOpened && modal}
      <section className={`${burgerConstructor.section} ml-10 pl-4 mt-25`}>
        <ul className={`${burgerConstructor.list}`}>
          <li className='ml-8'>
            <ConstructorElement
              type='top'
              isLocked={true}
              text='Краторная булка N-200i (верх)'
              price={200}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
          <ul className={`${burgerConstructor.list} ${burgerConstructor.scroll}`}>
            {
              props.data.map((item, index) =>
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
          <li className='ml-8'>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text='Краторная булка N-200i (низ)'
              price={200}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
        </ul>
        <div className={`${burgerConstructor.total} mt-10`}>
          <p className={`${burgerConstructor.total__cost} mr-10`}>
            <span className='text text_type_digits-medium mr-2'>610</span>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
}

export default BurgerConstructor;