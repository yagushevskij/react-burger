import constructorCard from './constructor-card.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux'
import { REMOVE_CONSTR_ITEM } from '../../../services/actions/cart'
import { conCardPropTypes } from '../../../utils/type'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

const ConstructorCard = props => {
  const { data, totalCostDispatcher, index } = props
  const dispatch = useDispatch()
  
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

  const getItemStyle = (isDragging, draggableStyle) => ({
    border: isDragging ? '1px solid #4C4CFF' : '1px solid transparent',
    ...draggableStyle
  })

  return (
    <Draggable key={data.key} draggableId={data.key} index={index}>
      {(provided, snapshot) => (
        <li
          className={`${constructorCard.item}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
          <DragIcon type='primary' />
          <ConstructorElement text={data.name} price={data.price} thumbnail={data.image} handleClose={removeCard} />
        </li>
      )}
    </Draggable>
  )
}

ConstructorCard.propTypes = {
  data: conCardPropTypes.isRequired,
  totalCostDispatcher: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}

export default ConstructorCard
