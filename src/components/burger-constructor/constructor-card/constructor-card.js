import constructorCard from './constructor-card.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { conCardPropTypes } from '../../../utils/types'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import React from 'react'

const ConstructorCard = ({ data, handleRemove, index, moveCard, id }) => {
  const ref = useRef()

  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <li className={`${constructorCard.item}`} ref={ref} style={{ opacity }}>
      <DragIcon type='primary' />
      <ConstructorElement text={data.name} price={data.price} thumbnail={data.image} handleClose={() => handleRemove(data)} />
    </li>
  )
}

ConstructorCard.propTypes = {
  data: conCardPropTypes.isRequired,
  handleRemove: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
}

export default React.memo(ConstructorCard)
