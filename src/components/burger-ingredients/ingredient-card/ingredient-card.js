import React from 'react';

import ingridientPropTypes from '../../../utils/type'
import ingredientCard from './ingredient-card.module.css';
import {
  Counter, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD_ITEM_DATA } from '../../../services/actions/cart';
import { useDispatch } from 'react-redux';

const IngredientCard = React.memo(
  (props) => {
    const dispatch = useDispatch();
    const { data } = props;
    const handleOpenModal = () => {
      dispatch({
        type: ADD_ITEM_DATA,
        item: data
      })
      props.openModal(data)
    }
    return (
      <article className={ingredientCard.card} onClick={handleOpenModal}>
        <div className={`${ingredientCard.card__count}`}>
          {data.qty > 0 && <Counter count={data.qty} size='default' />}
        </div>
        <img className={`${ingredientCard.card__image} ml-4 mr-4`} src={data.image} alt=''></img>
        <div className={`${ingredientCard.card__price} mt-1`}>
          <p className='text text_type_digits-default mr-2'>{data.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <h3 className={`${ingredientCard.card__title} text text_type_main-default mt-1`}>
          {data.name}
        </h3>
      </article>
    )
  }, (prevProps, nextProps) => prevProps.data === nextProps.data
)

ingredientCard.propTypes = {
  data: ingridientPropTypes.isRequired
}

export default IngredientCard ;