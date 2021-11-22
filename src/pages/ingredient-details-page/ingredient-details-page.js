import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_ITEM } from '../../services/actions/ingredients'
import { useEffect } from 'react'

const IngredientDetailsPage = () => {
  const location = useLocation()
  console.log({location})
  const dispatch = useDispatch()
  const { id } = useParams()
  const ingredients = useSelector(state => state.ingredients.items)
  const data = ingredients.find(el => el._id === id)

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_ITEM,
      payload: { item: data }
    })
  }, [data, dispatch])

  return <IngredientDetails />
}

export default IngredientDetailsPage
