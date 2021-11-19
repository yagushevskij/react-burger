import styles from './ingredient-details-page.module.css'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/modal/modal'
import { SET_CURRENT_ITEM } from '../../services/actions/ingredients'

const IngredientDetailsPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  // console.log({ location })
  const { id } = useParams()
  const currentIngredient = useSelector(store => store.ingredients.current)

  const ingredients = useSelector(state => state.ingredients.items)
  const isIngredientsExist = ingredients.length > 0
  // const clickedIngredient = useSelector(state => state.ingredients.current)
  const isIngredientsRequest = useSelector(state => state.ingredients.itemsRequest)
  const getIngredientFromId = () => {
    return ingredients.find(el => el._id === id)
  }
  console.log({ currentIngredient })

  const handleCloseModal = () => {
    dispatch({
      type: SET_CURRENT_ITEM,
      payload: { item: null }
    })
  }

  // if (isIngredientsExist && location.state?.from.pathname !== '/') {
  //   console.log('1')
  //   return (
  //     <Modal title='Детали ингридиента' handleCloseModal={handleCloseModal}>
  //       <IngredientDetails data={getIngredientFromId()} />
  //     </Modal>
  //   )
  // }

  console.log({ bolshoiconsole: { ingredients, a: getIngredientFromId(), b: location === '/', isIngredientsRequest } })

  return (
    <>
      {location.state?.from.pathname !== '/' ? (
        <IngredientDetails id={id} />
      ) : (
        <Modal title='Детали ингридиента' handleCloseModal={handleCloseModal}>
          <IngredientDetails id={id} />
        </Modal>
      )}
    </>
  )
}

export default IngredientDetailsPage
