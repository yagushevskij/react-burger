import PropTypes from 'prop-types';

import ingredientCard from './ingredient-card.module.css';
import {
  Counter, CurrencyIcon
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

const IngredientCard = (props) => {
  return (
    <article className={ingredientCard.card}>
      <div className={`${ingredientCard.card__count}`}>
        <Counter count={1} size='default' />
      </div>
      <img className={`${ingredientCard.card__image} ml-4 mr-4`} src={props.data.image} alt=''></img>
      <div className={`${ingredientCard.card__price} mt-1`}>
        <p className='text text_type_digits-default mr-2'>{props.data.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className={`${ingredientCard.card__title} text text_type_main-default mt-1`}>
        {props.data.name}
      </h3>
    </article>
  )
}

ingredientCard.propTypes = {
  data: PropTypes.objectOf(ingridientPropTypes.isRequired).isRequired
}

export default IngredientCard ;