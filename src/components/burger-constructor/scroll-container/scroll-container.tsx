import ConstructorCard from '../constructor-card/constructor-card'
import { constrItemActions } from '../../../services/actions/constructor'
import scrollContainer from './scroll-container.module.css'
import { useCallback, FC, useRef } from 'react'
import { IConCardType } from '../../../utils/types'
import { TItemCallback } from '../burger-constructor'
import { useAppDispatch } from '../../../services/custom-hooks/redux-hooks'

type TScrollContainerProps = {
  items: IConCardType[]
  removeItem: TItemCallback
}
export type TMoveCardCallback = (dragIndex: number, hoverIndex: number) => void

const ScrollContainer: FC<TScrollContainerProps> = ({ items, removeItem }) => {
  const scrollContainerRef = useRef<HTMLUListElement | null>(null)
  const dispatch = useAppDispatch()

  const isScrollExist = (scrollContainerRef?.current) ? scrollContainerRef.current.scrollHeight > scrollContainerRef.current.clientHeight : null;

  const moveCard = useCallback<TMoveCardCallback>(
    (dragIndex, hoverIndex) => {
      const dragCard = items[dragIndex]
      const copyItems = [...items]
      copyItems.splice(dragIndex, 1)
      copyItems.splice(hoverIndex, 0, dragCard)
      dispatch(constrItemActions.updateItems(copyItems))
    },
    [items, dispatch],
  )
  return (
    <ul className={`${scrollContainer.list} ${scrollContainer.scroll}`} ref={scrollContainerRef} style={{ paddingRight: isScrollExist ? '8px' : '16px' }}>
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
