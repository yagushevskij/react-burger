import constructorCard from './constructor-card.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, FC } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import React from 'react'
import { TMoveCardCallback } from '../scroll-container/scroll-container'
import { TItemCallback } from '../burger-constructor'
import { IConCardType } from '../../../utils/types'

type TConstructorCardProps = {
  data: IConCardType
  handleRemove: TItemCallback;
  index: number;
  moveCard: TMoveCardCallback;
  id: string;
}

interface IDragItem {
  index: number
  id: string
  type: string
}

const ConstructorCard: FC<TConstructorCardProps> = ({ data, handleRemove, index, moveCard, id }) => {
  const ref = useRef<HTMLLIElement>(null)

  const [, drop] = useDrop({
    accept: 'card',
    hover(item: IDragItem, monitor: DropTargetMonitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
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
    collect: (monitor) => ({
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

export default React.memo(ConstructorCard)
