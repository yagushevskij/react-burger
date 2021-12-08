import { useDispatch } from 'react-redux'
import ConstructorCard from '../constructor-card/constructor-card'
import { constrItemActions } from '../../../services/actions/constructor'
import scrollContainer from './scroll-container.module.css'
import { useCallback, FC } from 'react'
import { IConCardType } from '../../../utils/types'
import { TItemCallback } from '../burger-constructor'

type TScrollContainerProps = {
  items: IConCardType[],
  removeItem: TItemCallback
}
export type TMoveCardCallback = (dragIndex: number, hoverIndex: number) => void

const ScrollContainer: FC<TScrollContainerProps> = ({ items, removeItem }) => {
  const dispatch = useDispatch()

  const moveCard =
    useCallback <
    TMoveCardCallback >
    ((dragIndex, hoverIndex) => {
      const dragCard = items[dragIndex]
      const copyItems = [...items]
      copyItems.splice(dragIndex, 1)
      copyItems.splice(hoverIndex, 0, dragCard)
      dispatch(constrItemActions.updateItems(copyItems))
    },
    [items, dispatch])
  return (
    <ul className={`${scrollContainer.list} ${scrollContainer.scroll}`}>
      {items.map((item, index) => {
        if (item.type !== 'bun') {
          return <ConstructorCard key={item.key} id={item.key} data={item} handleRemove={removeItem} index={index} moveCard={moveCard} />
        }
        return null
      })}
    </ul>
  )
}

export default ScrollContainer
