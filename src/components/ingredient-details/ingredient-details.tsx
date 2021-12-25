import ingredientDetails from './ingredient-details.module.css'
import { useParams } from 'react-router'
import { FC } from 'react'
import { useAppSelector } from '../../services/custom-hooks/redux-hooks'
import type { IMainCardType } from '../../utils/types'

const IngredientDetails: FC = () => {
  const ingredients = useAppSelector(state => state.ingredients.items)
  const { id } = useParams()
  const data = ingredients.find((el: IMainCardType) => el._id === id)
  const { image, name, calories, proteins, fat, carbohydrates } = data || {}

  return (
    <div className={`${ingredientDetails.wrapper}`}>
      <img className={ingredientDetails.image} src={image} alt={name} />
      <p className="text text_type_main-default mt-4">{name}</p>
      <div className={`${ingredientDetails.addition} text text_type_main-default text_color_inactive mt-8`}>
        <div className={`${ingredientDetails.addition__item} text`}>
          <span className="text_type_main-default">Калории, ккал</span>
          <span className="text_type_digits-default mt-2">{calories}</span>
        </div>
        <div className={`${ingredientDetails.addition__item}`}>
          <span className="text_type_main-default">Белки, г</span>
          <span className="text_type_digits-default mt-2">{proteins}</span>
        </div>
        <div className={`${ingredientDetails.addition__item}`}>
          <span className="text_type_main-default">Жиры, г</span>
          <span className="text_type_digits-default mt-2">{fat}</span>
        </div>
        <div className={`${ingredientDetails.addition__item}`}>
          <span className="text_type_main-default">Углеводы, г</span>
          <span className="text_type_digits-default mt-2">{carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails
