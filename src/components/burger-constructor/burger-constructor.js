import PropTypes from 'prop-types';

import burgerConstructor from './burger-constructor.module.css';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const ingridientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number
});

const BurgerConstructor = (props) => {
  return (
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
        <Button type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
}

export default BurgerConstructor;