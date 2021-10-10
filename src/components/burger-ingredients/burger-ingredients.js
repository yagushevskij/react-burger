import React from 'react';
import PropTypes from 'prop-types';

import burgerIngridients from './burger-ingredients.module.css';
import {
  Tab, Counter, CurrencyIcon
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

class BurgerIngridients extends React.Component {
  state = { scrollContainerHeight: 0 }
  componentDidMount() {
    this.setState({ scrollContainerHeight: this.getScrollContainerHeight() });
  }
  filterArr = (good) => this.props.data.filter((el) => el.type === good)
  getScrollContainerHeight = () => {
    const windowHeight = window.innerHeight;
    const scrollContainerOffsetTop = this.scrollContainer.offsetTop;
    return windowHeight - scrollContainerOffsetTop;
  }
  render() {
    const mainArr = this.filterArr('main');
    const sauceArr = this.filterArr('sauce');
    const bunArr = this.filterArr('bun');
    const data = [
      { title: 'Булки', elems: bunArr },
      { title: 'Соусы', elems: sauceArr },
      { title: 'Начинки', elems: mainArr }
    ]
    return (
      <section className={burgerIngridients.section}>
        <h1 className='text text_type_main-large mt-10' id='test'>Соберите бургер</h1>
        <div className={`${burgerIngridients.tab} mt-5`}>
          <Tab value='one' active={true}>Булки</Tab>
          <Tab value='two' active={false}>Соусы</Tab>
          <Tab value='three' active={false}>Начинки</Tab>
        </div>
        <div className={`${burgerIngridients.content} mt-10`} style={{ maxHeight: this.state.scrollContainerHeight }} ref={(scrollContainer) => { this.scrollContainer = scrollContainer }}>

          {
            data.map((group, index) => {
              return (
                <div key={index}>
                  <h2 className='text text_type_main-medium'>{group.title}</h2>
                  <div className={`${burgerIngridients.cards} pt-6 pb-10 pl-4 pr-4`}>
                    {
                      group.elems.map((card) => {
                        return (
                          <article className={burgerIngridients.card} key={card._id}>
                            <div className={`${burgerIngridients.card__count}`}>
                              <Counter count={1} size='default' />
                            </div>
                            <img className={`${burgerIngridients.card__image} ml-4 mr-4`} src={card.image} alt=''></img>
                            <div className={`${burgerIngridients.card__price} mt-1`}>
                              <p className='text text_type_digits-default mr-2'>{card.price}</p>
                              <CurrencyIcon type='primary' />
                            </div>
                            <h3 className={`${burgerIngridients.card__title} text text_type_main-default mt-1`}>
                              {card.name}
                            </h3>
                          </article>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }

        </div>
      </section>
    );
  }
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(ingridientPropTypes.isRequired).isRequired
}

export default BurgerIngridients;