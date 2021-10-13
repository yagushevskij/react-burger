import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import burgerIngridients from './burger-ingredients.module.css';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card'
import Modal from '../modal/modal'

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

const BurgerIngridients = (props) => {
  const [state, setState] = useState({
    scrollContainerHeight: 0,
    isModalOpened: false
  });
  useEffect(() => {
    setState({
      ...state,
      scrollContainerHeight: getScrollContainerHeight()
    })
  }, []
  );
  const scrollContainer = useRef();

  const getScrollContainerHeight = () => {
    const windowHeight = window.innerHeight;
    const scrollContainerOffsetTop = scrollContainer.current.offsetTop;
    return windowHeight - scrollContainerOffsetTop;
  }
  const getGrouppedIngredients = () => {
    const filterArr = (good) => props.data.filter((el) => el.type === good)
    const mainArr = filterArr('main');
    const sauceArr = filterArr('sauce');
    const bunArr = filterArr('bun');
    return [
      { title: 'Булки', elems: bunArr },
      { title: 'Соусы', elems: sauceArr },
      { title: 'Начинки', elems: mainArr }
    ]
  }

  const handleCloseModal = () => {
    setState({
      ...state,
      isModalOpened: false
    })
  }
  const handleOpenModal = () => {
    setState({
      ...state,
      isModalOpened: true
    })
  }

  const modal = (
    <Modal title='Детали ингридиента' onClose={handleCloseModal}>
    </Modal>
  );
  return (
    <>
      <div style={{ overflow: 'hidden' }}>
        {state.isModalOpened && modal}
        <section className={burgerIngridients.section}>
          <h1 className='text text_type_main-large mt-10' id='test'>Соберите бургер</h1>
          <div className={`${burgerIngridients.tab} mt-5`}>
            <Tab value='one' active={true}>Булки</Tab>
            <Tab value='two' active={false}>Соусы</Tab>
            <Tab value='three' active={false}>Начинки</Tab>
          </div>
          <div className={`${burgerIngridients.content} mt-10`} style={{ maxHeight: state.scrollContainerHeight }}
            ref={scrollContainer}>

            {
              getGrouppedIngredients().map((group, index) => {
                return (
                  <div key={index}>
                    <h2 className='text text_type_main-medium'>{group.title}</h2>
                    <div className={`${burgerIngridients.cards} pt-6 pb-10 pl-4 pr-4`}>
                      {
                        group.elems.map((card, i) =>
                          <IngredientCard data={card} key={i} openModal={handleOpenModal} />
                        )
                      }
                    </div>
                  </div>
                )
              })
            }

          </div>
        </section>
      </div>
    </>
  );
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
}

export default BurgerIngridients;