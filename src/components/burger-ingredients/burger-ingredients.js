import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import burgerIngridients from './burger-ingredients.module.css';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getItems } from '../../services/actions/cart';

const BurgerIngridients = React.memo(
  () => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.cart.items);
    const [state, setState] = useState({
      scrollContainerHeight: 0,
      isModalOpened: false,
    });
    useEffect(() => {
      dispatch(getItems());
      setState({
        ...state,
        scrollContainerHeight: getScrollContainerHeight(),
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
      const filterArr = (good) => data.filter((el) => el.type === good)
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

    const handleOpenModal = (card) => {
      setState({
        ...state,
        isModalOpened: true,
        data: card
      })
    }

    const modal = (
      <Modal title='Детали ингридиента' onClose={handleCloseModal}>
        <IngredientDetails data={state.data} />
      </Modal>
    );
    return (
      <>
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
      </>
    );
  }
)

export default BurgerIngridients;