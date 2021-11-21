import React from 'react'
import { mainCardPropTypes } from '../../../utils/types'
import ingredientCard from './ingredient-card.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { SET_CURRENT_ITEM } from '../../../services/actions/ingredients'
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'
import Modal from '../../modal/modal'
import IngredientDetails from '../../ingredient-details/ingredient-details'
import { useState } from 'react'

const IngredientCard = React.memo(({ data }) => {
  const dispatch = useDispatch()
  const { qty, ...restData } = data

  const [isModaOpened, setModalOpened] = useState(false)

  const [{ border }, dragRef] = useDrag({
    type: 'ingredient-card',
    item: restData,
    collect: monitor => ({
      border: monitor.isDragging() ? '1px solid #4C4CFF' : '1px solid transparent'
    })
  })

  const handleClick = () => {
    dispatch({
      type: SET_CURRENT_ITEM,
      payload: { item: data }
    })
    setModalOpened(true)
  }

  const handleCloseModal = () => {
    setModalOpened(false)
  }

  return (
    <>
      {isModaOpened && (
        <Modal title='Детали ингридиента' handleCloseModal={handleCloseModal} originalPath={`/`} fakePath={`/ingredients/${data._id}`}>
          <IngredientDetails data={data} />
        </Modal>
      )}
      <article className={ingredientCard.card} onClick={handleClick} ref={dragRef} style={{ border }}>
        <div className={`${ingredientCard.card__count}`}>{data.qty > 0 && <Counter count={data.qty} size='default' />}</div>
        <img className={`${ingredientCard.card__image} ml-4 mr-4`} src={data.image} alt=''></img>
        <div className={`${ingredientCard.card__price} mt-1`}>
          <p className='text text_type_digits-default mr-2'>{data.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <h3 className={`${ingredientCard.card__title} text text_type_main-default mt-1`}>{data.name}</h3>
      </article>
    </>
  )
})

ingredientCard.propTypes = {
  data: mainCardPropTypes.isRequired
}

export default IngredientCard
