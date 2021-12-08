import React, { FC, useCallback } from 'react'
import ingredientCard from './ingredient-card.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { useNavigate, useLocation } from 'react-router-dom'
import { IMainCardType } from '../../../utils/types'

type TIngredientCard = {
  data: IMainCardType
}

const IngredientCard: FC<TIngredientCard> = ({ data }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { qty, ...restData } = data

  const [{ border }, dragRef] = useDrag({
    type: 'ingredient-card',
    item: restData,
    collect: (monitor: DragSourceMonitor) => ({
      border: monitor.isDragging() ? '1px solid #4C4CFF' : '1px solid transparent'
    })
  })

  const handleClick = useCallback(() => {
    navigate(`/ingredients/${data._id}`, { state: { background: location } })
  }, [data, location, navigate])

  return (
    <article className={ingredientCard.card} onClick={handleClick} ref={dragRef} style={{ border }}>
      <div className={`${ingredientCard.card__count}`}>{data.qty > 0 && <Counter count={data.qty} size='default' />}</div>
      <img className={`${ingredientCard.card__image} ml-4 mr-4`} src={data.image} alt=''></img>
      <div className={`${ingredientCard.card__price} mt-1`}>
        <p className='text text_type_digits-default mr-2'>{data.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className={`${ingredientCard.card__title} text text_type_main-default mt-1`}>{data.name}</h3>
    </article>
  )
}

export default React.memo(IngredientCard)
