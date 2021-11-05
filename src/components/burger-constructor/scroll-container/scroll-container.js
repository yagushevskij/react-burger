import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import ConstructorCard from '../constructor-card/constructor-card'
import { constrItemActions } from '../../../services/actions/constructor'
import scrollContainer from './scroll-container.module.css'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/types'

const ScrollContainer = ({ items, removeItem }) => {
    const dispatch = useDispatch()
    const onDragEnd = result => {
        if (!result.destination) {
          return
        }
        const resultItems = reorder(items, result.source.index, result.destination.index)
        dispatch(constrItemActions.updateItems(resultItems))
      }
      const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
      }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId='droppable'>
      {(provided, snapshot) => (
        <ul className={`${scrollContainer.list} ${scrollContainer.scroll}`} {...provided.droppableProps} ref={provided.innerRef}>
          {items &&
            items.map((item, index) => {
              if (item.type !== 'bun') {
                return <ConstructorCard key={index} data={item} handleRemove={removeItem} index={index} />
              }
            })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  </DragDropContext>
  )
}

scrollContainer.propTypes = {
  items: ingredientPropTypes,
  removeItem: PropTypes.func.isRequired
}

export default ScrollContainer
