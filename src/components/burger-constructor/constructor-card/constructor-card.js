import constructorCard from './constructor-card.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { conCardPropTypes } from '../../../utils/type'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

const ConstructorCard = ({ data, handleRemove, index }) => {
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
          <ConstructorElement text={data.name} price={data.price} thumbnail={data.image} handleClose={() => handleRemove(data)} />
        </li>
      )}
    </Draggable>
  )
}

ConstructorCard.propTypes = {
  data: conCardPropTypes.isRequired,
  handleRemove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}

export default ConstructorCard
