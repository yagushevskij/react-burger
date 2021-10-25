// import React from 'react';

import ingridientPropTypes from '../../../utils/type'
import constructorCard from './constructor-card.module.css';
import {
  ConstructorElement, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { REMOVE_CONSTR_ITEM } from '../../../services/actions/cart';

const ConstructorCard = (props) => {
  const dispatch = useDispatch();
  const { data, totalCostDispatcher } = props;
  const [{ border }, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
    collect: monitor => ({
      border: monitor.isDragging() ? '3px solid green' : 'none'
    })
  });
  const removeCard = () => {
    dispatch({
      type: REMOVE_CONSTR_ITEM,
      item: data
    })
    totalCostDispatcher({
      type: 'remove',
      ingredient: data.type,
      cost: data.price
    })
  }
  return (
    <li className={`${constructorCard.item}`} ref={dragRef} style={{ border }}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={removeCard}
      />
    </li>
  )
}

ConstructorCard.propTypes = {
  data: ingridientPropTypes.isRequired
}

export default ConstructorCard;